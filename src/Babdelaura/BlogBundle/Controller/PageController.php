<?php

// src/Babdelaura/BlogBundle/Controller/PageController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Babdelaura\BlogBundle\Entity\Page;
use Babdelaura\BlogBundle\Form\PageType;

class PageController extends Controller
{
     public function enregistrerPageAction($slug = null){
        //on récupère l'entity manager
      $em = $this->getDoctrine()->getManager();

      if ($slug == null) {
        $page = new Page;
      }
      else {
        $page = $em->getRepository('BabdelauraBlogBundle:Page')->findOneBySlug($slug);
      }

      $form = $this->createForm(new PageType, $page);
      $request = $this->get('request');

      if($request->getMethod() == 'POST') {
          $form->bind($request);

          if($form->isValid()) {


              $page->setDatePublication(new \DateTime());

              $em->persist($page);
              $em->flush();

              return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherPage', array('slug' => $page->getSlug())));
          }

        }

         return $this->render('BabdelauraBlogBundle:Admin/Page:enregistrerPage.html.twig', array('form' => $form->createView()));
    }

    public function depublierPageAction($slug) {
        $em =  $this->getDoctrine()->getManager();

        $page = $em->getRepository('BabdelauraBlogBundle:Page')->findOneBySlug($slug);

        $page->setPublication(false);

        $em->persist($page);
        $em->flush();

        $session = $this->get('session');

        return $this->redirect($session->get('url'));
    }

    public function afficherPageAdminAction($slug) {
        $repository = $this->getDoctrine()
                         ->getManager()
                         ->getRepository('BabdelauraBlogBundle:Page');

        $page = $repository->findOneBySlug($slug);

        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_afficherPage', array('slug' => $slug)));


        return $this->render('BabdelauraBlogBundle:Admin/Page:afficherPage.html.twig',array('page' => $page));
    }

    public function listerToutesPagesAdminAction() {

        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Page');

        $query = $repository->findAll();

        $request = $this->get('request')->query;
        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerPages') . '?page=' . $request->get('page'));

        $nbPagesParPage = $this->container->getParameter('nbElementsParPageAdmin');
        $paginator  = $this->get('knp_paginator');
        $listePages = $paginator->paginate(
            $query,
            $request->get('page', 1),
            $nbPagesParPage
        );
        $listePages->setTemplate('BabdelauraBlogBundle:Admin:sliding.html.twig');

        return $this->render('BabdelauraBlogBundle:Admin/Page:listerPages.html.twig', array(
          'listePages' => $listePages
        ));

    }

    public function afficherPageAction($slug) {
        $repository = $this->getDoctrine()
                         ->getManager()
                         ->getRepository('BabdelauraBlogBundle:Page');

        $page = $repository->findOneBySlug($slug);

        return $this->render('BabdelauraBlogBundle:Page:afficherPage.html.twig', array('page' => $page));
    }

}