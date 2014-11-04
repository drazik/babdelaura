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
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

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

                $this->get('session')->getFlashBag()->add(
                            'notice',
                            'Merci '.$commentaire->getAuteur().'. Votre commentaire est en cours de validation.'
                );

                return $this->redirect($this->generateUrl('babdelaurablog_article', array('slug' => $slug, 'annee' => $article->getDatePublication()->format("Y"), 'mois' => $article->getDatePublication()->format("m"),'jour'=> $article->getDatePublication()->format("d"))));
            }

            return $this->render('BabdelauraBlogBundle:Article:afficherArticle.html.twig', array('article' => $article, 'form' => $form->createView()));
        }

    }

    public function enregistrerCommentaireAdminAction($slug) {
        $commentaire = new Commentaire;
        $commentaire->setValide(true);

        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

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

                return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $slug)));
            }

            return $this->render('BabdelauraBlogBundle:Admin/Article:afficherArticle.html.twig', array('article' => $article, 'form' => $form->createView()));
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

}