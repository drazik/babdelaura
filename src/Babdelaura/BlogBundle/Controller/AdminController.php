<?php

// src/Babdelaura/BlogBundle/Controller/AdminController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{
    public function indexAction()  {

        return $this->render('BabdelauraBlogBundle:Admin:index.html.twig');

  }
}