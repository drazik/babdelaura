<?php

// src/Babdelaura/BlogBundle/Controller/ArticleController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Babdelaura\BlogBundle\Entity\Tag;
use Babdelaura\BlogBundle\Entity\Article;
use Babdelaura\BlogBundle\Entity\Commentaire;
use Babdelaura\BlogBundle\Form\CommentaireType;
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
}
