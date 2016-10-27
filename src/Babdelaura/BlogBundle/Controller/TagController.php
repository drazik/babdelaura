<?php


namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Babdelaura\BlogBundle\Entity\Tag;
use Babdelaura\BlogBundle\Form\TagType;

class TagController extends Controller
{
    public function enregistrerTagAction(Request $request, $slug = null) {
        $em = $this->getDoctrine()->getManager();

        if ($slug == null) {
            $tag = new Tag;
        }
        else {
            $tag = $em->getRepository('BabdelauraBlogBundle:Tag')->findOneBySlug($slug);
        }

        $form = $this->createForm(TagType::class, $tag);

        if($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if($form->isValid()) {
                $em->persist($tag);
                $em->flush();

                return $this->redirect($this->generateUrl('babdelaurablog_admin_listerTags'));
            }

        }

        return $this->render('BabdelauraBlogBundle:Admin/Tag:enregistrerTag.html.twig', array('form' => $form->createView()));

    }

    public function listerTousTagsAction() {
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Tag');



        $listeTags = $repository->findAll();

        $session = $this->get('session');
        $session->set('url', $this->generateUrl('babdelaurablog_admin_listerTags'));

        return $this->render('BabdelauraBlogBundle:Admin/Tag:listerTags.html.twig', array(
          'listeTags' => $listeTags
        ));
    }

        public function supprimerTagAction(Request $request, $slug)
    {

        $em = $this->getDoctrine()->getManager();
        $tag = $em->getRepository('BabdelauraBlogBundle:Tag')->findOneBySlug($slug);

        // On crée un formulaire vide, qui ne contiendra que le champ CSRF
        // Cela permet de protéger la suppression de tag contre cette faille
        $form = $this->createFormBuilder()->getForm();

        if ($request->getMethod() == 'POST') {
          $form->handleRequest($request);

          if ($form->isValid()) {
            // On supprime le tag

            $em->remove($tag);
            $em->flush();

            // On définit un message flash
            $this->get('session')->getFlashBag()->add('info', 'Le tag a bien été supprimé');


            return $this->redirect($this->generateUrl('babdelaurablog_admin_listerTags', array('numPage' => 1)));
          }
        }

        $path = $this->get('router')->generate('babdelaurablog_admin_supprimerTag', array('slug' => $tag->getSlug()));

        // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
        return $this->render('BabdelauraBlogBundle:Admin:confirmationSuppression.html.twig', array(
          'entite' => $tag,
          'form'    => $form->createView(),
          'path'    => $path
        ));
    }

    public function getTagsAction(Request $request) {
        $input = $request->get('input');

        if ($input == null) {
            return $this->createNotFoundException('No input');
        }

        $repository = $this->getDoctrine()->getManager()->getRepository('BabdelauraBlogBundle:Tag');
        $tags = $repository->findByPartialName($input);

        return new JsonResponse($tags);
    }
 }
