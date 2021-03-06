<?php

// src/Babdelaura/Admin/Controller/PageController.php

namespace Babdelaura\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Babdelaura\BlogBundle\Entity\Page;
use Babdelaura\AdminBundle\Form\PageInterneType;
use Babdelaura\AdminBundle\Form\PageExterneType;

class PageController extends Controller
{
    public function enregistrerPageInterneAction(Request $request, $slug = null) {
        //on récupère l'entity manager
        $em = $this->getDoctrine()->getManager();

        if ($slug == null) {
          $page = new Page;
        }
        else {
          $page = $em->getRepository('BabdelauraBlogBundle:Page')->findOneBySlug($slug);
        }

        $form = $this->createForm(PageInterneType::class, $page);

        if($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if($form->isSubmitted() && $form->isValid()) {
                $page->setDatePublication(new \DateTime());

                $em->persist($page);
                $em->flush();

                return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherPage', array('slug' => $page->getSlug())));
            }

        }

        return $this->render('BabdelauraAdminBundle:Page:enregistrerPageInterne.html.twig', array('form' => $form->createView()));
    }

    public function enregistrerPageExterneAction(Request $request, $slug = null) {
      //on récupère l'entity manager
      $em = $this->getDoctrine()->getManager();

      if ($slug == null) {
        $page = new Page;
      }
      else {
        $page = $em->getRepository('BabdelauraBlogBundle:Page')->findOneBySlug($slug);
      }

      $form = $this->createForm(PageExterneType::class, $page);

      if($request->getMethod() == 'POST') {
          $form->handleRequest($request);

          if($form->isSubmitted() && $form->isValid()) {
              $page->setDatePublication(new \DateTime());
              $page->setIsExterne(true);

              $em->persist($page);
              $em->flush();

              return $this->redirect($this->generateUrl('babdelaurablog_admin_listerPages'));
          }

      }

      return $this->render('BabdelauraAdminBundle:Page:enregistrerPageExterne.html.twig', array('form' => $form->createView()));
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


        return $this->render('BabdelauraAdminBundle:Page:afficherPage.html.twig',array('page' => $page));
    }

    public function listerToutesPagesAdminAction(Request $request) {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Page');

        $query = $repository->findBy(array(),array('position' => 'ASC'));

        $session = $this->get('session');

        $numPage = $request->query->get('page') == '' ? 1 : $request->query->get('page');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerPages') . '?page=' . $numPage);

        $nbPagesParPage = $this->container->getParameter('nbElementsParPageAdmin');
        $paginator  = $this->get('knp_paginator');
        $listePages = $paginator->paginate(
            $query,
            $request->query->get('page', 1),
            $nbPagesParPage
        );
        $listePages->setTemplate('BabdelauraAdminBundle::sliding.html.twig');

        return $this->render('BabdelauraAdminBundle:Page:listerPages.html.twig', array(
          'listePages' => $listePages
        ));

    }

    public function supprimerPageAction(Request $request, $slug)
    {
        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository('BabdelauraBlogBundle:Page')->findOneBySlug($slug);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression de page contre cette faille
        $form = $this->createFormBuilder()->getForm();

        if ($request->getMethod() == 'POST') {
          $form->handleRequest($request);

          if ($form->isSubmitted() && $form->isValid()) {
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
        return $this->render('BabdelauraAdminBundle::confirmationSuppression.html.twig', array(
          'entite'  => $page,
          'form'    => $form->createView(),
          'path'    => $path
        ));
    }

}
