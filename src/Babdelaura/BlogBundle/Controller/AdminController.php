<?php

// src/Babdelaura/BlogBundle/Controller/AdminController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{
    public function indexAction()  {
        $repositoryArticle = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Article');
        $nbArticlesTotal = $repositoryArticle->getNbArticles();
        $nbArticlePublies = $repositoryArticle->getNbArticles(true);

        $repositoryCommentaire = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Commentaire');
        $nbCommentairesTotal = $repositoryCommentaire->getNbCommentaires();
        $nbCommentairesNonValides = $repositoryCommentaire->getNbCommentaires(false);

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');

        $listeArticles = $repositoryArticle->getArticles($nbArticlesParPage);

        return $this->render('BabdelauraBlogBundle:Admin:index.html.twig',
                      array('nbArticlesTotal' => $nbArticlesTotal,
                          'nbArticlePublies' => $nbArticlePublies,
                          'nbCommentairesTotal' => $nbCommentairesTotal,
                          'nbCommentairesNonValides' => $nbCommentairesNonValides,
                          'listeArticles' => $listeArticles
                      ));

  }
}