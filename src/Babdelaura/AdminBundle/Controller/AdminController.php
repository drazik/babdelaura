<?php

// src/Babdelaura/AdminBundle/Controller/AdminController.php

namespace Babdelaura\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{
    public function indexAction()  {
        // $repositoryArticle = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Article');
        // $nbArticlesTotal = $repositoryArticle->getNbArticles();
        // $nbArticlePublies = $repositoryArticle->getNbArticles(true);
        //
        // $repositoryCommentaire = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Commentaire');
        // $nbCommentairesTotal = $repositoryCommentaire->getNbCommentaires();
        // $nbCommentairesNonValides = $repositoryCommentaire->getNbCommentaires(false);

        return $this->render('BabdelauraAdminBundle::layout.html.twig');

  }
}
