<?php

// src/Babdelaura/BlogBundle/Controller/ArticleController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Babdelaura\BlogBundle\Entity\Article;
use Babdelaura\BlogBundle\Form\ArticleType;
use Babdelaura\BlogBundle\Entity\Commentaire;
use Babdelaura\BlogBundle\Form\CommentaireType;
use Babdelaura\BlogBundle\Form\ImageType;

class ArticleController extends Controller
{
    public function listerTousArticlesBlogAction(Request $request) {

        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->getArticlesPaginator(null, true);
        $paginator  = $this->get('knp_paginator');
        $articles = $paginator->paginate(
            $query,
            $request->query->get('page', 1),
            $nbArticlesParPage
        );
        $articles->setTemplate('BabdelauraBlogBundle:Components/article:pagination.html.twig');


        return $this->render('BabdelauraBlogBundle:Article:listerArticles.html.twig', array(
            'articles' => $articles
        ));
    }

    public function listerArticlesCategorieAction(Request $request, $slug) {
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
        $articles = $paginator->paginate(
            $query,
            $request->query->get('page', 1),
            $nbArticlesParPage
        );
        $articles->setTemplate('BabdelauraBlogBundle:Components/article:pagination.html.twig');


        return $this->render('BabdelauraBlogBundle:Article:listerArticles.html.twig', array(
            'articles' => $articles
        ));
    }

    public function listerArticlesDateAction(Request $request, $annee, $mois, $jour) {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->getArticlesDate($annee, $mois, $jour);
        $paginator  = $this->get('knp_paginator');
        $articles = $paginator->paginate(
            $query,
            $request->query->get('page', 1),
            $nbArticlesParPage
        );

        $articles->setTemplate('BabdelauraBlogBundle:Components/article:pagination.html.twig');

        $nbArticles = $articles->getTotalItemCount();

        if ($nbArticles == 0) {
            throw $this->createNotFoundException('Aucun article ne correspond à cette date');
        }

        return $this->render('BabdelauraBlogBundle:Article:listerArticles.html.twig', array(
            'articles' => $articles
        ));
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
        $urlArticlePrecedent = null;

        if ($articlePrecedent != null) {
            $urlArticlePrecedent = $this->generateUrl('babdelaurablog_article', array(
                'slug' => $articlePrecedent->getSlug(),
                'annee' => $articlePrecedent->getDatePublication()->format('Y'),
                'mois' => $articlePrecedent->getDatePublication()->format('m'),
                'jour' => $articlePrecedent->getDatePublication()->format('d')
            ));
        }

        $articleSuivant = $repository->getSuivant($article->getId());
        $articleSuivant = array_shift($articleSuivant);
        $urlArticleSuivant = null;

        if ($articleSuivant != null) {
            $urlArticleSuivant = $this->generateUrl('babdelaurablog_article', array(
                'slug' => $articleSuivant->getSlug(),
                'annee' => $articleSuivant->getDatePublication()->format('Y'),
                'mois' => $articleSuivant->getDatePublication()->format('m'),
                'jour' => $articleSuivant->getDatePublication()->format('d')
            ));
        }

        // TODO remplacer ce tableau par les vrais articles similaires
        $articlesSimilaires = array($article, $article, $article, $article);

        $form = $this->createForm(CommentaireType::class, new Commentaire(), array(
            'recaptcha' => true
        ));

        return $this->render('BabdelauraBlogBundle:Article:afficherArticle.html.twig',array(
          'article' => $article,
          'form' => $form->createView(),
          'urlArticlePrecedent' => $urlArticlePrecedent,
          'urlArticleSuivant' => $urlArticleSuivant,
          'articlesSimilaires' => $articlesSimilaires
        ));
    }

    // ADMIN

    public function enregistrerArticleAction(Request $request, $slug = null){
        //on récupère l'entity manager
        $em = $this->getDoctrine()->getManager();

        if ($slug == null) {
            $article = new Article;
        }
        else {
            $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);
            $article->setImageTemp($article->getImage()->getId());
        }

        $form = $this->createForm(ArticleType::class, $article);
        $uploadImageForm = $this->createForm(ImageType::class, null, array(
            'action' => $this->generateUrl('babdelaurablog_admin_uploaderImage')
        ));

        if($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if($form->isValid()) {

                $image = $em->getRepository('BabdelauraBlogBundle:Image')->findOneById($article->getImageTemp());
                $article->setImage($image);
                $em->persist($article);
                $em->flush();

                return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $article->getSlug())));
            }

        }

        return $this->render('BabdelauraBlogBundle:Admin/Article:enregistrerArticle.html.twig', array(
            'form' => $form->createView(),
            'article' => $article,
            'uploadImageForm' => $uploadImageForm->createView()
        ));
    }


    public function supprimerArticleAction(Request $request, $slug)
    {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression d'article contre cette faille
        $form = $this->createFormBuilder()->getForm();

        if ($request->getMethod() == 'POST') {
          $form->handleRequest($request);

          if ($form->isValid()) {
            // On supprime l'article

            $em->remove($article);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'Article bien supprimé');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerArticles', array('numPage' => 1)));
          }
        }

        $path = $this->get('router')->generate('babdelaurablog_admin_supprimerArticle', array('slug' => $article->getSlug()));

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraBlogBundle:Admin:confirmationSuppression.html.twig', array(
          'entite' => $article,
          'form'    => $form->createView(),
          'path'    => $path
        ));
    }

    public function publierArticleAction($slug) {
        $em =  $this->getDoctrine()->getManager();

        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        $article->setPublication(!$article->getPublication());

        $em->persist($article);
        $em->flush();

        $session = $this->get('session');

        return $this->redirect($session->get('url'));
    }


    public function listerTousArticlesAdminAction(Request $request) {
        $form = $this->createFormBuilder()
                     ->add('categories', EntityType::class, array(
                        'class'    => 'BabdelauraBlogBundle:Categorie',
                        'choice_label' => 'nom',
                        'multiple' => false,
                        'required'    => false,
                        'placeholder' => 'Toutes',
                        'empty_data'  => null
                        ))
                     ->add('publication', ChoiceType::class, array(
                        'choices' => array(
                            'Publiés' => true,
                            'Brouillons' => false
                        ),
                        'choices_as_values' => true,
                        'required'    => false,
                        'placeholder' => 'Tous',
                        'empty_data'  => null
                        ))
                     ->getForm();


        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbElementsParPageAdmin');

        $session = $this->get('session');

        $numPage = $request->get('page') == '' ? 1 : $request->get('page');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerArticles') . '?page=' . $numPage);


        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
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

    public function listerArticlesGrilleAdminAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');
        $listeArticles = $repository->getArticles($nbArticlesParPage, true);


        return $this->render('BabdelauraBlogBundle:Admin/Article:listerArticlesGrille.html.twig', array(
            'listeArticles' => $listeArticles,
            'admin' => true
        ));
    }

    public function afficherArticleAdminAction($slug) {
        $repository = $this->getDoctrine()
                         ->getManager()
                         ->getRepository('BabdelauraBlogBundle:Article');

        $article = $repository->findOneBySlug($slug);

        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $slug)));


        $commentaire = new Commentaire();
        $commentaire->setAuteur('Laura');
        $commentaire->setEmail('bab-de-laura@hotmail.fr');
        $commentaire->setSite('http://www.bricabrac-de-laura.fr');
        $form = $this->createForm(CommentaireType::class , $commentaire);

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
