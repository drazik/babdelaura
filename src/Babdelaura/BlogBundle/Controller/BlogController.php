<?php

// src/Babdelaura/BlogBundle/Controller/BlogController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $listeArticles = $repository->getArticles($nbArticlesParPage);

        return $this->render('BabdelauraBlogBundle:Blog:index.html.twig', array('listeArticles' => $listeArticles));
    }

    public function mainMenuAction() {
        $em = $this->getDoctrine()
                   ->getManager();

        $repositoryCategorie = $em->getRepository('BabdelauraBlogBundle:Categorie');
        $listeCategories = $repositoryCategorie->findBy(array('visible' => true, 'parent' => null));

        $repositoryPage = $em->getRepository('BabdelauraBlogBundle:Page');
        $listePages = $repositoryPage->findBy(array('publication' => true, 'inMenu' => true));

        return $this->render('BabdelauraBlogBundle:Blog:mainMenu.html.twig', array('listeCategories' => $listeCategories, 'listePages' => $listePages));

    }

    public function footerAction() {
        $em = $this->getDoctrine()
                   ->getManager();

       $repositoryPage = $em->getRepository('BabdelauraBlogBundle:Page');
       $listePages = $repositoryPage->findBy(array('publication' => true, 'inFooter' => true));

       return $this->render('BabdelauraBlogBundle:Blog:footer.html.twig', array('listePages' => $listePages));
    }

    public function formulaireRechercheAction() {
        $recherche = new Recherche;
        $form = $this->createForm(new RechercheType, $recherche);

        return $this->render('BabdelauraBlogBundle:Blog:formulaireRecherche.html.twig', array('form' => $form->createView()));
    }

    public function rechercherAction(){
        $request = $this->get('request');

        $motsCles = $request->query->get('motscles');

        $repository = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Article');
        // $listeArticles = $repository->rechercher($motsCles);


        // return $this->render('BabdelauraBlogBundle:Article:resultatsRecherche.html.twig', array('listeArticles' => $listeArticles, 'motsCles' =>$motsCles));


        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->rechercher($motsCles);
        $paginator  = $this->get('knp_paginator');
        $listeArticles = $paginator->paginate(
            $query,
            $this->get('request')->query->get('page', 1),
            $nbArticlesParPage
        );
        $listeArticles->setTemplate('BabdelauraBlogBundle:Article:slidingArticle.html.twig');


        return $this->render('BabdelauraBlogBundle:Article:resultatsRecherche.html.twig', array('listeArticles' => $listeArticles, 'motsCles' =>$motsCles));


    }

    public function feedRssAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $listeArticles = $repository->getArticles($nbArticlesParPage);

        return $this->render('BabdelauraBlogBundle:Blog:feed.rss.twig', array('listeArticles' => $listeArticles));

    }

    public function contactAction(){
        $form = $this->createForm(new ContactType);
        $request = $this->get('request');

        if($request->getMethod() == 'POST') {
            $form->bind($request);

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
                $form = $this->createForm(new ContactType);
            }

        }
        return $this->render('BabdelauraBlogBundle:Blog:formContact.html.twig', array('form' => $form->createView()));
    }
}
