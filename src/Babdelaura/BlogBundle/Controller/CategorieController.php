<?php

// src/Babdelaura/BlogBundle/Controller/ArticleController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

use Babdelaura\BlogBundle\Entity\Categorie;
use Babdelaura\BlogBundle\Form\CategorieType;

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

            if($form->isValid()) {
                $em->persist($categorie);
                $em->flush();

                return $this->redirect($this->generateUrl('babdelaurablog_admin_listerCategories'));
            }

        }

         return $this->render('BabdelauraBlogBundle:Admin/Categorie:enregistrerCategorie.html.twig', array('form' => $form->createView()));

     }

     public function listerToutesCategoriesAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Categorie');



        $listeAllCategories = $repository->findAll();

        $listeCategories = $this->listerEnfants(null, 0, $listeAllCategories);

        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerCategories'));

        return $this->render('BabdelauraBlogBundle:Admin/Categorie:listerCategories.html.twig', array(
          'listeCategories' => $listeCategories
        ));
    }

    private function listerEnfants($parent, $niveau, $listeCategories) {
        $result = array();
        foreach ($listeCategories as $categorie) {
           if ($parent == $categorie->getParent()) {
              $result[] = array(
                 'categorie' => $categorie,
                 'niveau' => $niveau,
                 'enfants' => $this->listerEnfants($categorie, $niveau + 1, $listeCategories)
              );
           }
        }
        return $result;
    }

    public function supprimerCategorieAction(Request $request, $slug)
    {

        $em = $this->getDoctrine()->getManager();
        $categorie = $em->getRepository('BabdelauraBlogBundle:Categorie')->findOneBySlug($slug);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression de categorie contre cette faille
        $form = $this->createFormBuilder()->getForm();

        if ($request->getMethod() == 'POST') {
          $form->handleRequest($request);

          if ($form->isValid()) {
            // On supprime la categorie

            $em->remove($categorie);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'Catégorie bien supprimée');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerCategories', array('numPage' => 1)));
          }
        }

        $path = $this->get('router')->generate('babdelaurablog_admin_supprimerCategorie', array('slug' => $categorie->getSlug()));

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraBlogBundle:Admin:confirmationSuppression.html.twig', array(
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
