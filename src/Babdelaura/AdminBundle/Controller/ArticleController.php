<?php

// src/Babdelaura/BlogBundle/Controller/ArticleController.php

namespace Babdelaura\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Babdelaura\BlogBundle\Entity\Tag;
use Babdelaura\BlogBundle\Entity\Article;
use Babdelaura\AdminBundle\Form\ArticleType;
use Babdelaura\BlogBundle\Entity\Commentaire;
use Babdelaura\BlogBundle\Form\CommentaireType;
use Babdelaura\BlogBundle\Form\ImageType;
use Doctrine\ORM\Tools\Pagination\Paginator;

class ArticleController extends Controller
{
    public function enregistrerArticleAction(Request $request, $slug = null){
        //on récupère l'entity manager
        $em = $this->getDoctrine()->getManager();

        if ($slug == null) {
            $article = new Article;
        }
        else {
            $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);
            $article->setImageTemp($article->getImage()->getId());
        }

        $form = $this->createForm(ArticleType::class, $article);
        $tagsChildren = $form->get('tags');

        // TODO : faire en sorte que tags soit une collection dans le constructeur de l'entité, et virer les ifs de merde
        if ($article->getTags() != null) {
            $tagsChildren->setData(implode(',', $article->getTags()->getValues()));
        }

        $uploadImageForm = $this->createForm(ImageType::class, null, array(
            'action' => $this->generateUrl('babdelaurablog_admin_uploaderImage')
        ));

        if($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if($form->isSubmitted() && $form->isValid()) {
                /*
                 * Gestion des tags
                 * - On récupère le contenu du champs non mappé "tags"
                 * - On le split sur les virgules pour obtenir un array
                 * (en prenant en compte le fait que si la valeur est null, il
                 * faut créer un tableau vide nous-même, merci PHP !)
                 * - On vide a collection actuelle des tags de l'article pour ne
                 * pas avoir à se soucier de merger les anciens avec les
                 * nouveaux à la main
                 * - On parcoure l'ensemble du tableau, et pour chaque tag, on
                 * le recherche dans la base de données
                 * - Si on le trouve pas, on le crée
                 * - Dans tous les cas, on l'ajoute à l'article
                 */
                $tagsChild = $form->get('tags');
                $tags = $tagsChild->getData();
                $tags = $tags == null ? [] : explode(',', $tags);

                $tagsRepository = $em->getRepository('BabdelauraBlogBundle:Tag');

                if ($article->getTags() != null) {
                    $article->getTags()->clear();
                }

                foreach ($tags as $t) {
                    $tag = $tagsRepository->findOneByNom($t);

                    if ($tag == null) {
                        $tag = new Tag();
                        $tag->setNom($t);

                        $em->persist($tag);
                    }

                    $article->addTag($tag);
                }

                $image = $em->getRepository('BabdelauraBlogBundle:Image')->findOneById($article->getImageTemp());
                $article->setImage($image);
                $em->persist($article);
                $em->flush();

                return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $article->getSlug())));
            }

        }

        return $this->render('BabdelauraAdminBundle:Article:enregistrerArticle.html.twig', array(
            'form' => $form->createView(),
            'article' => $article,
            'uploadImageForm' => $uploadImageForm->createView()
        ));
    }


    public function supprimerArticleAction(Request $request, $slug)
    {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression d'article contre cette faille
        $form = $this->createFormBuilder()->getForm();

        if ($request->getMethod() == 'POST') {
          $form->handleRequest($request);

          if ($form->isSubmitted() && $form->isValid()) {
            // On supprime l'article

            $em->remove($article);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'Article bien supprimé');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerArticles', array('numPage' => 1)));
          }
        }

        $path = $this->get('router')->generate('babdelaurablog_admin_supprimerArticle', array('slug' => $article->getSlug()));

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraBlogBundle:Admin:confirmationSuppression.html.twig', array(
          'entite' => $article,
          'form'    => $form->createView(),
          'path'    => $path
        ));
    }

    public function publierArticleAction($slug) {
        $em =  $this->getDoctrine()->getManager();

        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        $article->setPublication(!$article->getPublication());

        $em->persist($article);
        $em->flush();

        $session = $this->get('session');

        return $this->redirect($session->get('url'));
    }


    public function listerTousArticlesAdminAction(Request $request) {
        $form = $this->createFormBuilder()
                     ->add('categories', EntityType::class, array(
                        'class'    => 'BabdelauraBlogBundle:Categorie',
                        'choice_label' => 'nom',
                        'multiple' => false,
                        'required'    => false,
                        'placeholder' => 'Toutes',
                        'empty_data'  => null
                        ))
                     ->add('publication', ChoiceType::class, array(
                        'choices' => array(
                            'Publiés' => true,
                            'Brouillons' => false
                        ),
                        'choices_as_values' => true,
                        'required'    => false,
                        'placeholder' => 'Tous',
                        'empty_data'  => null
                        ))
                     ->getForm();


        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbElementsParPageAdmin');

        $session = $this->get('session');

        $numPage = $request->get('page') == '' ? 1 : $request->get('page');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerArticles') . '?page=' . $numPage);


        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            $data = $form->getData();
            // return new Response(var_dump($data));
            $publication = $data['publication'] === null ? null : (boolean) $data['publication'];
            $query = $repository->getArticlesPaginator($data['categories'], $publication, true);
        }
        else {
            $query = $repository->getArticlesPaginator(null, null, true);
        }
        $paginator  = $this->get('knp_paginator');
        $listeArticles = $paginator->paginate(
            $query,
            $request->query->get('page', 1),
            $nbArticlesParPage
        );
        $listeArticles->setTemplate('BabdelauraBlogBundle:Admin:sliding.html.twig');


        return $this->render('BabdelauraBlogBundle:Article:listerArticles.html.twig', array('listeArticles' => $listeArticles, 'form' => $form->createView()));

    }

    public function listerArticlesGrilleAdminAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Article');

        $nbArticlesParPage = $this->container->getParameter('nbArticlesParPage');
        $listeArticles = $repository->getArticles($nbArticlesParPage, true);


        return $this->render('BabdelauraBlogBundle:Article:listerArticlesGrille.html.twig', array(
            'listeArticles' => $listeArticles,
            'admin' => true
        ));
    }

    public function afficherArticleAdminAction($slug) {
        $repository = $this->getDoctrine()
                         ->getManager()
                         ->getRepository('BabdelauraBlogBundle:Article');

        $article = $repository->findOneBySlug($slug);

        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $slug)));


        $commentaire = new Commentaire();
        $commentaire->setAuteur('Laura');
        $commentaire->setEmail('bab-de-laura@hotmail.fr');
        $commentaire->setSite('http://www.bricabrac-de-laura.fr');
        $form = $this->createForm(CommentaireType::class , $commentaire);

        return $this->render('BabdelauraBlogBundle:Article:afficherArticle.html.twig',array('article' => $article,'form' => $form->createView()));
    }

    public function validerCommentairesAction($slug) {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('BabdelauraBlogBundle:Article')->findOneBySlug($slug);

        $article->validerCommentaires();
        $em->persist($article);
        $em->flush();

        return $this->redirect($this->generateUrl('babdelaurablog_admin_afficherArticle', array('slug' => $slug)));
    }

}
