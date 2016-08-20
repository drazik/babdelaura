<?php

// src/Babdelaura/BlogBundle/Controller/BlogController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Babdelaura\BlogBundle\Entity\Recherche;
use Babdelaura\BlogBundle\Form\RechercheType;
use Babdelaura\BlogBundle\Form\ContactType;

class BlogController extends Controller
{
    public function indexAction()  {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPageHome');

        $articles = $repository->getArticles($nbArticlesParPage);

        return $this->render('BabdelauraBlogBundle:Blog:index.html.twig', array('articles' => $articles));
    }

    public function mainMenuAction() {
        $em = $this->getDoctrine()
                   ->getManager();

        $repositoryCategorie = $em->getRepository('BabdelauraBlogBundle:Categorie');
        $categories = $repositoryCategorie->findBy(array('visible' => true),array('position' => 'ASC'));

        $repositoryPage = $em->getRepository('BabdelauraBlogBundle:Page');
        $pages = $repositoryPage->findBy(array('publication' => true, 'inMenu' => true),array('position' => 'ASC'));

        return $this->render('BabdelauraBlogBundle:Layout:navigation.html.twig', array(
            'categories' => $categories,
            'pages' => $pages
        ));
    }

    public function footerAction() {
        $em = $this->getDoctrine()
                   ->getManager();

       $repositoryPage = $em->getRepository('BabdelauraBlogBundle:Page');
       $pages = $repositoryPage->findBy(array('publication' => true, 'inFooter' => true),array('position' => 'ASC'));

       return $this->render('BabdelauraBlogBundle:Layout:footer.html.twig', array(
           'pages' => $pages
       ));
    }

    public function rechercherAction(Request $request) {
        $motsCles = $request->query->get('motscles');

        $repository = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->rechercher($motsCles);
        $paginator  = $this->get('knp_paginator');
        $articles = $paginator->paginate(
            $query,
            $request->query->get('page', 1),
            $nbArticlesParPage
        );
        $articles->setTemplate('BabdelauraBlogBundle:Components/article:pagination.html.twig');


        return $this->render('BabdelauraBlogBundle:Article:resultatsRecherche.html.twig', array(
            'articles' => $articles,
            'motsCles' => $motsCles
        ));
    }

    public function feedRssAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $listeArticles = $repository->getArticles($nbArticlesParPage);

        return $this->render('BabdelauraBlogBundle:Blog:feed.rss.twig', array('listeArticles' => $listeArticles));

    }

    public function contactAction(Request $request) {
        $form = $this->createForm(ContactType::class);

        if($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if($form->isValid()) {

                $data = $form->getData();
                $mailer = $this->get('mailer');
                $messageAdmin = $mailer->createMessage()
                    ->setSubject('Nouveau message reçu de '.$data['nom'])
                    ->setFrom(array($data['email'] => $data['nom']))
                    ->setTo($this->container->getParameter('mail_contact'))
                    ->setBody(
                        $this->renderView(

                            'BabdelauraBlogBundle:Mail:mailContactAdmin.html.twig',
                            array('data' => $data)
                        ),
                        'text/html'
                );
                $mailer->send($messageAdmin);

                $messageUser = $mailer->createMessage()
                    ->setSubject('Confirmation de l\'envoi de votre message')
                    ->setFrom($this->container->getParameter('mail_notifications'))
                    ->setTo($data['email'])
                    ->setBody(
                        $this->renderView(

                            'BabdelauraBlogBundle:Mail:mailContactUser.html.twig',
                            array('data' => $data)
                        ),
                        'text/html'
                );
                $mailer->send($messageUser);

                 $this->get('session')->getFlashBag()->add(
                            'notice',
                            'Votre message a été envoyé. Vous recevrez une confirmation par mail.'
                );
                $form = $this->createForm(ContactType::class);
            }

        }
        return $this->render('BabdelauraBlogBundle:Blog:formContact.html.twig', array('form' => $form->createView()));
    }
}
