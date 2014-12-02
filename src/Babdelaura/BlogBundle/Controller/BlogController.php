<?php

// src/Babdelaura/BlogBundle/Controller/BlogController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Babdelaura\BlogBundle\Entity\Recherche;
use Babdelaura\BlogBundle\Form\RechercheType;

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
        $listeCategories = $repositoryCategorie->findBy(array('visible' => true));

        $repositoryPage = $em->getRepository('BabdelauraBlogBundle:Page');
        $listePages = $repositoryPage->findBy(array('publication' => true));

        return $this->render('BabdelauraBlogBundle:Blog:mainMenu.html.twig', array('listeCategories' => $listeCategories, 'listePages' => $listePages));

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
}