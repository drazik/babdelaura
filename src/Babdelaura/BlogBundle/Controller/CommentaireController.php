<?php

// src/Babdelaura/BlogBundle/Controller/CommentaireController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Babdelaura\BlogBundle\Entity\Commentaire;
use Babdelaura\BlogBundle\Form\CommentaireType;

class CommentaireController extends Controller
{
    public function enregistrerCommentaireAction(Request $request, $slug) {
        $commentaire = new Commentaire();

        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('BabdelauraBlogBundle:Article');
        $article = $repository->findOneBySlug($slug);

        $form = $this->createForm(CommentaireType::class, $commentaire, array(
            'recaptcha' => true,
            'comments' => $article->getRootCommentairesValides()
        ));

        $form->handleRequest($request);

        $isValid = $form->isSubmitted() && $form->isValid();

        $responseData = [
            'success' => $isValid,
            'errors' => $this->getErrorMessages($form)
        ];

        if ($isValid) {
            if ($commentaire->getSite()) {
                if (!preg_match('#^http://#', $commentaire->getSite())) {
                    $commentaire->setSite('http://' . $commentaire->getSite());
                }
            }

            $article->addCommentaire($commentaire);

            $em->persist($article);
            $em->flush();

            $responseData['message'] = 'Merci pour votre commentaire ' . $commentaire->getAuteur() . '. Celui-ci est en cours de validation et apparaitra bientôt.';

            $mailer = $this->get('mailer');
            $message = $mailer->createMessage()
                ->setSubject('Un nouveau commentaire a été posté')
                ->setFrom($this->container->getParameter('mail_notifications'))
                ->setTo($this->container->getParameter('mail_contact'))
                ->setBody(
                    $this->renderView(
                        'BabdelauraBlogBundle:Mail:nouveauCommentaire.html.twig',
                        array('commentaire' => $commentaire, 'article' => $article)
                    ),
                    'text/html'
            );
            $mailer->send($message);
        }

        return new JsonResponse($responseData);
    }

    private function getErrorMessages(\Symfony\Component\Form\Form $form)
    {
        $errors = array();

        foreach ($form->getErrors() as $key => $error) {
            $errors[] = $error->getMessage();
        }

        foreach ($form->all() as $child) {
            if (!$child->isValid()) {
                $errors[$child->getName()] = $this->getErrorMessages($child);
            }
        }

        return $errors;
    }
}
