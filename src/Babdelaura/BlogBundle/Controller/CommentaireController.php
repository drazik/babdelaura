<?php

// src/Babdelaura/BlogBundle/Controller/CommentaireController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Babdelaura\BlogBundle\Entity\Commentaire;
use Babdelaura\BlogBundle\Form\CommentaireType;

class CommentaireController extends Controller
{
    public function enregistrerCommentaireAction($slug) {
        $commentaire = new Commentaire;

        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('BabdelauraBlogBundle:Article');
        $article = $repository->findOneBySlug($slug);

        $form = $this->createForm(new CommentaireType, $commentaire);
        $request = $this->get('request');

        if ($request->getMethod() == 'POST') {
            $form->bind($request);

            if($form->isValid()) {
                if($commentaire->getSite()){
                    if(!preg_match('#^http://#', $commentaire->getSite())) {
                        $commentaire->setSite('http://'.$commentaire->getSite());
                    }
                }
                $article->addCommentaire($commentaire);
                $em->persist($article);

                $em->flush();

                $mailer = $this->get('mailer');
                $message = $mailer->createMessage()
                    ->setSubject('Un nouveau commentaire a été posté')
                    ->setFrom('notifications@bricabrac-de-laura.fr')
                    ->setTo('contact@bricabrac-de-laura.fr')
                    ->setBody(
                        $this->renderView(                            
                            'BabdelauraBlogBundle:Mail:nouveauCommentaire.html.twig',
                            array('commentaire' => $commentaire, 'article' => $article)
                        ),
                        'text/html'
                );                    
                $mailer->send($message);

                $this->get('session')->getFlashBag()->add(
                            'notice',
                            'Merci '.$commentaire->getAuteur().'. Votre commentaire est en cours de validation.'
                );
                $form = $this->createForm(new CommentaireType, new Commentaire);

            }

            $articlePrecedent = $repository->getPrecedent($article->getId());
            $articlePrecedent = array_shift($articlePrecedent);

            $articleSuivant = $repository->getSuivant($article->getId());
            $articleSuivant = array_shift($articleSuivant);

            return $this->render('BabdelauraBlogBundle:Article:afficherArticle.html.twig', array(
                'article' => $article,
                'form' => $form->createView(),
                'articlePrecedent' => $articlePrecedent,
                'articleSuivant' => $articleSuivant));
        }

    }

    public function enregistrerCommentaireAdminAction($slug) {
        $commentaire = new Commentaire;
        $commentaire->setValide(true);

        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        $form = $this->createForm(new CommentaireType(true), $commentaire);
        $request = $this->get('request');

        if ($request->getMethod() == 'POST') {
            $form->bind($request);

            if($form->isValid()) {
                if($commentaire->getSite()){
                    if(!preg_match('#^http://#', $commentaire->getSite())) {
                        $commentaire->setSite('http://'.$commentaire->getSite());
                    }
                }
                $article->addCommentaire($commentaire);
                $em->persist($article);

                $em->flush();
                $form = $this->createForm(new CommentaireType(true), new Commentaire);
            }

            return $this->render('BabdelauraBlogBundle:Admin/Article:afficherArticle.html.twig', array(
                'article' => $article,
                'form' => $form->createView()));
        }

    }

    public function validerCommentaireAction($slug, $idCom) {
        $em = $this->getDoctrine()->getManager();
        $commentaire = $em->getRepository('BabdelauraBlogBundle:Commentaire')->findOneById($idCom);

        $commentaire->setValide(true);
        $em->persist($commentaire);
        $em->flush();

        $session = $this->get('session');

        return $this->redirect($session->get('url'));

    }

    public function listerCommentairesNonValidesAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Commentaire');

        $query = $repository->findBy(array('valide' => false),array('datePublication' => 'desc'));

        $request = $this->get('request')->query;
        $session = $this->get('session');

        $numPage = $request->get('page') == '' ? 1 : $request->get('page');

        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerCommentairesNonValides') . '?page=' . $numPage);

        $nbCommentairesParPage = $this->container->getParameter('nbElementsParPageAdmin');
        $paginator  = $this->get('knp_paginator');
        $listeCommentaires = $paginator->paginate(
            $query,
            $request->get('page', 1),
            $nbCommentairesParPage
        );
        $listeCommentaires->setTemplate('BabdelauraBlogBundle:Admin:sliding.html.twig');

        return $this->render('BabdelauraBlogBundle:Admin/Commentaire:listerCommentairesNonValides.html.twig', array('listeCommentaires' => $listeCommentaires));
    }

    public function supprimerCommentaireAction($idCom)
    {

        $em = $this->getDoctrine()->getManager();
        $commentaire = $em->getRepository('BabdelauraBlogBundle:Commentaire')->findOneById($idCom);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression de commentaire contre cette faille
        $form = $this->createFormBuilder()->getForm();

        $request = $this->getRequest();
        if ($request->getMethod() == 'POST') {
          $form->bind($request);

          if ($form->isValid()) {
            // On supprime le commentaire

            $em->remove($commentaire);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'Commentaire bien supprimé');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerCommentairesNonValides', array('numPage' => 1)));
          }
        }

        $path = $this->get('router')->generate('babdelaurablog_admin_supprimerCommentaire', array('idCom' => $commentaire->getId()));

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraBlogBundle:Admin:confirmationSuppression.html.twig', array(
          'entite' => $commentaire,
          'form'    => $form->createView(),
          'path'    => $path
        ));
    }

}