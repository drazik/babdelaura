<?php

// src/Babdelaura/BlogBundle/Controller/ArticleController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Babdelaura\BlogBundle\Entity\Article;
use Babdelaura\BlogBundle\Form\ArticleType;
use Babdelaura\BlogBundle\Entity\Commentaire;
use Babdelaura\BlogBundle\Form\CommentaireType;



class ArticleController extends Controller
{
    public function listerTousArticlesBlogAction() {

        $repository = $this->getDoctrine()
                           ->getManager()
                            ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->getArticlesPaginator(null, true);
        $paginator  = $this->get('knp_paginator');
        $listeArticles = $paginator->paginate(
            $query,
            $this->get('request')->query->get('page', 1),
            $nbArticlesParPage
        );
        $listeArticles->setTemplate('BabdelauraBlogBundle:Article:slidingArticle.html.twig');


        return $this->render('BabdelauraBlogBundle:Article:listerArticles.html.twig', array('listeArticles' => $listeArticles));
    }

    public function listerArticlesCategorieAction($slug) {

        $categorieRepository = $this->getDoctrine()
                                    ->getManager()
                                    ->getRepository('BabdelauraBlogBundle:Categorie');

        $articleRepository = $this->getDoctrine()
                                  ->getManager()
                                  ->getRepository('BabdelauraBlogBundle:Article');

        $categorie = $categorieRepository->findOneBySlug($slug);

        if (!$categorie) {
          throw $this->createNotFoundException('La catégorie n\'existe pas');
        }

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $articleRepository->getArticlesPaginator($categorie, true);
        $paginator  = $this->get('knp_paginator');
        $listeArticles = $paginator->paginate(
            $query,
            $this->get('request')->query->get('page', 1),
            $nbArticlesParPage
        );
        $listeArticles->setTemplate('BabdelauraBlogBundle:Article:slidingArticle.html.twig');


        return $this->render('BabdelauraBlogBundle:Article:listerArticles.html.twig', array(
            'listeArticles' => $listeArticles,
            'categorie' => $categorie
            ));

    }

    public function listerArticlesDateAction($annee, $mois, $jour) {

        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->getArticlesDate($annee, $mois, $jour);
        $paginator  = $this->get('knp_paginator');
        $listeArticles = $paginator->paginate(
            $query,
            $this->get('request')->query->get('page', 1),
            $nbArticlesParPage
        );
        $listeArticles->setTemplate('BabdelauraBlogBundle:Article:slidingArticle.html.twig');

        $countArticle = $listeArticles->getTotalItemCount();
        if ($countArticle == 0) {
            throw $this->createNotFoundException('Aucun article ne correspond à cette date');
        }

        return $this->render('BabdelauraBlogBundle:Article:listerArticles.html.twig', array('listeArticles' => $listeArticles));
    }


    public function afficherArticleAction($annee, $mois, $jour, $slug) {
        $repository = $this->getDoctrine()
                         ->getManager()
                         ->getRepository('BabdelauraBlogBundle:Article');

        $article = $repository->getArticle($slug);
        $article = array_shift($article);

        if (!$article) {
          throw $this->createNotFoundException('L\'article n\'existe pas');
        }

        $articlePrecedent = $repository->getPrecedent($article->getId());
        $articlePrecedent = array_shift($articlePrecedent);

        $articleSuivant = $repository->getSuivant($article->getId());
        $articleSuivant = array_shift($articleSuivant);

        $form = $this->createForm(new CommentaireType, new Commentaire);

        return $this->render('BabdelauraBlogBundle:Article:afficherArticle.html.twig',array(
          'article' => $article,
          'form' => $form->createView(),
          'articlePrecedent' => $articlePrecedent,
          'articleSuivant' => $articleSuivant
        ));
    }

    // ADMIN

    public function enregistrerArticleAction($slug = null){
        //on récupère l'entity manager
        $em = $this->getDoctrine()->getManager();

        if ($slug == null) {
            $article = new Article;
        }
        else {
            $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);
            $article->setImageTemp($article->getImage()->getId());
        }

        $form = $this->createForm(new ArticleType, $article);
        $request = $this->get('request');

        if($request->getMethod() == 'POST') {
            $form->bind($request);

            if($form->isValid()) {

                $image = $em->getRepository('BabdelauraBlogBundle:Image')->findOneById($article->getImageTemp());
                $article->setImage($image);
                $em->persist($article);
                $em->flush();

                return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $article->getSlug())));
            }

        }

        return $this->render('BabdelauraBlogBundle:Admin/Article:enregistrerArticle.html.twig', array('form' => $form->createView(), 'article' => $article));
    }


    public function supprimerArticleAction($slug)
    {

        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression d'article contre cette faille
        $form = $this->createFormBuilder()->getForm();

        $request = $this->getRequest();
        if ($request->getMethod() == 'POST') {
          $form->bind($request);

          if ($form->isValid()) {
            // On supprime l'article

            $em->remove($article);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'Article bien supprimé');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerArticles', array('numPage' => 1)));
          }
        }

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraBlogBundle:Admin/Article:supprimerArticle.html.twig', array(
          'article' => $article,
          'form'    => $form->createView()
        ));
    }

    public function depublierArticleAction($slug) {
        $em =  $this->getDoctrine()->getManager();

        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        $article->setPublication(false);

        $em->persist($article);
        $em->flush();

        $session = $this->get('session');

        return $this->redirect($session->get('url'));
    }


    public function listerTousArticlesAdminAction() {

        $form = $this->createFormBuilder()
                     ->add('categories', 'entity', array(
                        'class'    => 'BabdelauraBlogBundle:Categorie',
                        'property' => 'nom',
                        'multiple' => false,
                        'required'    => false,
                        'empty_value' => 'Toutes',
                        'empty_data'  => null
                        ))
                     ->add('publication', 'choice', array(
                         'choices' => array(
                             true => 'Publiés',
                             false => 'Brouillons'
                         ),
                         'required'    => false,
                         'empty_value' => 'Tous',
                         'empty_data'  => null
                         ))
                     ->getForm();


        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbElementsParPageAdmin');

        $request = $this->get('request');

        $session = $this->get('session');

        $numPage = $request->get('page') == '' ? 1 : $request->get('page');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerArticles') . '?page=' . $numPage);


        if ($request->isMethod('POST')) {
            $form->bind($request);
            $data = $form->getData();
            // return new Response(var_dump($data));
            $publication = $data['publication'] === null ? null : (boolean) $data['publication'];
            $query = $repository->getArticlesPaginator($data['categories'], $publication, true);
        }
        else {
            $query = $repository->getArticlesPaginator(null, null, true);
        }
        $paginator  = $this->get('knp_paginator');
        $listeArticles = $paginator->paginate(
            $query,
            $request->query->get('page', 1),
            $nbArticlesParPage
        );
        $listeArticles->setTemplate('BabdelauraBlogBundle:Admin:sliding.html.twig');


        return $this->render('BabdelauraBlogBundle:Admin/Article:listerArticles.html.twig', array('listeArticles' => $listeArticles, 'form' => $form->createView()));

    }

    public function afficherArticleAdminAction($slug) {
        $repository = $this->getDoctrine()
                         ->getManager()
                         ->getRepository('BabdelauraBlogBundle:Article');

        $article = $repository->findOneBySlug($slug);

        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $slug)));


        $commentaire = new Commentaire;
        $commentaire->setAuteur('Laura');
        $commentaire->setEmail('bab-de-laura@hotmail.fr');
        $commentaire->setSite('http://www.bricabrac-de-laura.fr');
        $form = $this->createForm(new CommentaireType, $commentaire);

        return $this->render('BabdelauraBlogBundle:Admin/Article:afficherArticle.html.twig',array('article' => $article,'form' => $form->createView()));
    }

    public function validerCommentairesAction($slug) {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        $article->validerCommentaires();
        $em->persist($article);
        $em->flush();

        return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $slug)));
    }

}