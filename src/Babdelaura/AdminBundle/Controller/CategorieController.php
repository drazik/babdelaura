<?php

// src/Babdelaura/AdminBundle/Controller/ArticleController.php

namespace Babdelaura\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Babdelaura\BlogBundle\Entity\Categorie;
use Babdelaura\AdminBundle\Form\CategorieType;

class CategorieController extends Controller
{
     public function enregistrerCategorieAction(Request $request, $slug = null) {
        $em = $this->getDoctrine()->getManager();

        if ($slug == null) {
            $categorie = new Categorie;
        }
        else {
            $categorie = $em->getRepository('BabdelauraBlogBundle:Categorie')->findOneBySlug($slug);
        }

        $form = $this->createForm(CategorieType::class, $categorie);

        if($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if($form->isSubmitted() && $form->isValid()) {
                $em->persist($categorie);
                $em->flush();

                return $this->redirect($this->generateUrl('babdelaurablog_admin_listerCategories'));
            }

        }

         return $this->render('BabdelauraAdminBundle:Categorie:enregistrerCategorie.html.twig', array('form' => $form->createView()));

     }

     public function listerToutesCategoriesAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Categorie');



        $listeCategories = $repository->findBy(array(),array('position' => 'ASC'));

        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerCategories'));

        return $this->render('BabdelauraAdminBundle:Categorie:listerCategories.html.twig', array(
          'listeCategories' => $listeCategories
        ));
    }

    public function supprimerCategorieAction(Request $request, $slug)
    {

        $em = $this->getDoctrine()->getManager();
        $categorie = $em->getRepository('BabdelauraBlogBundle:Categorie')->findOneBySlug($slug);

        if (!$categorie->getArticles()->isEmpty()) {
            $this->get('session')->getFlashBag()
                ->add('error', 'Impossible de supprimer : la catégorie est liée à des articles');
            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerCategories', array('numPage' => 1)));
        }

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression de categorie contre cette faille
        $form = $this->createFormBuilder()->getForm();

        if ($request->getMethod() == 'POST') {
          $form->handleRequest($request);

          if ($form->isSubmitted() && $form->isValid()) {
            // On supprime la categorie

            $em->remove($categorie);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'La catégorie a bien été supprimée');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerCategories', array('numPage' => 1)));
          }
        }

        $path = $this->get('router')->generate('babdelaurablog_admin_supprimerCategorie', array('slug' => $categorie->getSlug()));

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraAdminBundle::confirmationSuppression.html.twig', array(
          'entite' => $categorie,
          'form'    => $form->createView(),
          'path'    => $path
        ));
    }

    public function changerVisibiliteCategorieAction($slug) {
        $em =  $this->getDoctrine()->getManager();

        $categorie = $em->getRepository('BabdelauraBlogBundle:Categorie')->findOneBySlug($slug);

        $categorie->setVisible(!$categorie->getVisible());

        $em->persist($categorie);
        $em->flush();

        $session = $this->get('session');

        return $this->redirect($session->get('url'));
    }


 }
