<?php

// src/Babdelaura/BlogBundle/Controller/PageController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Babdelaura\BlogBundle\Entity\Page;
use Babdelaura\BlogBundle\Form\PageInterneType;
use Babdelaura\BlogBundle\Form\PageExterneType;

class PageController extends Controller
{
    public function afficherPageAction($slug) {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Page');

        $page = $repository->findOneBySlug($slug);

        return $this->render('BabdelauraBlogBundle:Page:afficherPage.html.twig', array('page' => $page));
    }
}
