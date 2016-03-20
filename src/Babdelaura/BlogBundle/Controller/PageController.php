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

    public function publierPageAction($slug) {
        $em =  $this->getDoctrine()->getManager();

        $page = $em->getRepository('BabdelauraBlogBundle:Page')->findOneBySlug($slug);

        $page->setPublication(!$page->getPublication());

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

        $numPage = $request->get('page') == '' ? 1 : $request->get('page');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerPages') . '?page=' . $numPage);

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

    public function supprimerPageAction($slug)
    {

        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository('BabdelauraBlogBundle:Page')->findOneBySlug($slug);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression de page contre cette faille
        $form = $this->createFormBuilder()->getForm();

        $request = $this->getRequest();
        if ($request->getMethod() == 'POST') {
          $form->bind($request);

          if ($form->isValid()) {
            // On supprime la page

            $em->remove($page);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'Page bien supprimée');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerPages', array('numPage' => 1)));
          }
        }

        $path = $this->get('router')->generate('babdelaurablog_admin_supprimerPage', array('slug' => $page->getSlug()));

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraBlogBundle:Admin:confirmationSuppression.html.twig', array(
          'entite' => $page,
          'form'    => $form->createView(),
          'path'    => $path
        ));
    }

}