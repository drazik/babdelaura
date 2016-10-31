<?php

// src/Babdelaura/BlogBundle/Controller/ArticleController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Babdelaura\BlogBundle\Entity\Tag;
use Babdelaura\BlogBundle\Entity\Article;
use Babdelaura\BlogBundle\Form\ArticleType;
use Babdelaura\BlogBundle\Entity\Commentaire;
use Babdelaura\BlogBundle\Form\CommentaireType;
use Babdelaura\BlogBundle\Form\ImageType;
use Doctrine\ORM\Tools\Pagination\Paginator;

class ArticleController extends Controller
{
    public function listerTousArticlesBlogAction(Request $request) {
        $page = $request->query->getInt('page', 1);

        if ($page === 1) {
            return new RedirectResponse($this->generateUrl('babdelaurablog_accueil'));
        }

        --$page;

        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');
        $offset = $this->container->getParameter('nbArticlesParPageHome');

        $query = $repository->getArticlesPaginator(null, true);
        $query->setFirstResult($offset + ($page - 1) * $nbArticlesParPage)
            ->setMaxResults($nbArticlesParPage);

        $articles = new Paginator($query);
        $nbPages = ceil((count($articles) - $offset) / $nbArticlesParPage);

        $pagination = [
            'isFirstPage' => false,
            'isLastPage' => $page == $nbPages,
            'route' => 'babdelaurablog_tousLesArticles',
            'page' => $page + 1
        ];

        return $this->render('BabdelauraBlogBundle:Article:liste.html.twig', array(
            'articles' => $articles,
            'pagination' => $pagination
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

        $page = $request->query->getInt('page', 1);
        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $articleRepository->getArticlesPaginator($categorie, true);
        $query->setFirstResult(($page - 1) * $nbArticlesParPage)
            ->setMaxResults($nbArticlesParPage);

        $articles = new Paginator($query);
        $nbPages = ceil(count($articles) / $nbArticlesParPage);

        $pagination = [
            'isFirstPage' => $page == 1,
            'isLastPage' => $page == $nbPages,
            'route' => 'babdelaurablog_categorie',
            'query' => ['slug' => $categorie->getSlug()],
            'page' => $page
        ];

        $title = 'Articles de la catégorie ' . $categorie->getNom();

        return $this->render('BabdelauraBlogBundle:Article:liste.html.twig', array(
            'articles' => $articles,
            'pagination' => $pagination,
            'title' => $title
        ));
    }

    public function listerArticlesTagAction(Request $request, $slug) {
        $tagRepository = $this->getDoctrine()
                                    ->getManager()
                                    ->getRepository('BabdelauraBlogBundle:Tag');

        $articleRepository = $this->getDoctrine()
                                  ->getManager()
                                  ->getRepository('BabdelauraBlogBundle:Article');

        $tag = $tagRepository->findOneBySlug($slug);

        if (!$tag) {
          throw $this->createNotFoundException('Le tag n\'existe pas');
        }

        $page = $request->query->getInt('page', 1);
        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $articleRepository->getArticlesPaginatorTag($tag, true);
        $query->setFirstResult(($page - 1) * $nbArticlesParPage)
            ->setMaxResults($nbArticlesParPage);

        $articles = new Paginator($query);
        $nbPages = ceil(count($articles) / $nbArticlesParPage);

        $pagination = [
            'isFirstPage' => $page == 1,
            'isLastPage' => $page == $nbPages,
            'route' => 'babdelaurablog_categorie',
            'query' => ['slug' => $tag->getSlug()],
            'page' => $page
        ];

        $title = 'Articles correspondant à ' . $tag->getNom();

        return $this->render('BabdelauraBlogBundle:Article:liste.html.twig', array(
            'articles' => $articles,
            'pagination' => $pagination,
            'title' => $title
        ));
    }

    public function listerArticlesDateAction(Request $request, $annee, $mois, $jour) {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $page = $request->query->getInt('page', 1);
        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->getArticlesDate($annee, $mois, $jour);
        $query->setFirstResult(($page - 1) * $nbArticlesParPage)
            ->setMaxResults($nbArticlesParPage);

        $articles = new Paginator($query);
        $nbArticles = count($articles);
        $nbPages = ceil($nbArticles / $nbArticlesParPage);

        if ($nbArticles === 0) {
            throw $this->createNotFoundException('Aucun article ne correspond à cette date');
        }

        $pagination = [
            'isFirstPage' => $page == 1,
            'isLastPage' => $page == $nbPages,
            'query' => [],
            'page' => $page
        ];

        if ($annee != null) {
            $pagination['route'] = 'babdelaurablog_articlesAnnee';
            $pagination['query']['annee'] = $annee;

            if ($mois != null) {
                $pagination['route'] = 'babdelaurablog_articlesMois';
                $pagination['query']['mois'] = $mois;

                if ($jour != null) {
                    $pagination['route'] = 'babdelaurablog_articlesJour';
                    $pagination['query']['jour'] = $jour;
                }
            }
        }

        $title = 'Articles ';

        if ($mois == null && $jour == null) {
            $title .= 'de l\'année ' . $annee;
        } elseif ($jour == null) {
            $title .= 'du ' . $mois . '/' . $annee;
        } else {
            $title .= 'du ' . $jour . '/' . $mois . '/' . $annee;
        }

        return $this->render('BabdelauraBlogBundle:Article:liste.html.twig', array(
            'articles' => $articles,
            'pagination' => $pagination,
            'title' => $title
        ));
    }

    public function rechercherAction(Request $request) {
        $motsCles = $request->query->get('motscles');

        $repository = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Article');

        $page = $request->query->getInt('page', 1);
        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $query = $repository->rechercher($motsCles);
        $query->setFirstResult(($page - 1) * $nbArticlesParPage)
            ->setMaxResults($nbArticlesParPage);

        $articles = new Paginator($query);
        $nbPages = ceil(count($articles) / $nbArticlesParPage);

        $pagination = [
            'isFirstPage' => $page == 1,
            'isLastPage' => $page == $nbPages,
            'route' => 'babdelaurablog_recherche',
            'query' => ['motscles' => $motsCles],
            'page' => $page
        ];

        $title = 'Recherche "' . $motsCles . '"';

        return $this->render('BabdelauraBlogBundle:Article:liste.html.twig', array(
            'articles' => $articles,
            'pagination' => $pagination,
            'title' => $title
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

        $articlesSimilaires = $repository->getArticlesSimilaires($article);

        $form = $this->createForm(CommentaireType::class, new Commentaire(), array(
            'action' => $this->generateUrl('babdelaurablog_ajouterCommentaire', array(
                'slug' => $article->getSlug(),
                'annee' => $article->getDatePublication()->format('Y'),
                'mois' => $article->getDatePublication()->format('m'),
                'jour' => $article->getDatePublication()->format('d')
            )),
            'recaptcha' => true,
            'comments' => $article->getRootCommentairesValides()
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
        $tagsChildren = $form->get('tags');
        
        if ($article->getTags() != null) {
            $tagsChildren->setData(implode(',', $article->getTags()->getValues()));
        }

        $uploadImageForm = $this->createForm(ImageType::class, null, array(
            'action' => $this->generateUrl('babdelaurablog_admin_uploaderImage')
        ));

        if($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if($form->isValid()) {
                /*
                 * Gestion des tags
                 * - On récupère le contenu du champs non mappé "tags"
                 * - On le split sur les virgules pour obtenir un array
                 * (en prenant en compte le fait que si la valeur est null, il
                 * faut créer un tableau vide nous-même, merci PHP !)
                 * - On vide a collection actuelle des tags de l'article pour ne
                 * pas avoir à se soucier de merger les anciens avec les
                 * nouveaux à la main
                 * - On parcoure l'ensemble du tableau, et pour chaque tag, on
                 * le recherche dans la base de données
                 * - Si on le trouve pas, on le crée
                 * - Dans tous les cas, on l'ajoute à l'article
                 */
                $tagsChild = $form->get('tags');
                $tags = $tagsChild->getData();
                $tags = $tags == null ? [] : explode(',', $tags);

                $tagsRepository = $em->getRepository('BabdelauraBlogBundle:Tag');

                $article->getTags()->clear();

                foreach ($tags as $t) {
                    $tag = $tagsRepository->findOneByNom($t);

                    if ($tag == null) {
                        $tag = new Tag();
                        $tag->setNom($t);

                        $em->persist($tag);
                    }

                    $article->addTag($tag);
                }

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
