<?php

// src/Babdelaura/BlogBundle/Controller/ArticleController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Babdelaura\BlogBundle\Entity\Categorie;
use Babdelaura\BlogBundle\Form\CategorieType;

class CategorieController extends Controller
{
     public function enregistrerCategorieAction($slug = null){

        $em = $this->getDoctrine()->getManager();

        if ($slug == null) {
            $categorie = new Categorie;
        }
        else {
            $categorie = $em->getRepository('BabdelauraBlogBundle:Categorie')->findOneBySlug($slug);
        }

        $form = $this->createForm(new CategorieType, $categorie);

        $request = $this->get('request');

        if($request->getMethod() == 'POST') {
            $form->bind($request);

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



        $listeCategories = $repository->findAll();

        return $this->render('BabdelauraBlogBundle:Admin/Categorie:listerCategories.html.twig', array(
          'listeCategories' => $listeCategories
        ));
    }


 }