<?php

// src/Babdelaura/BlogBundle/Controller/ImageController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;

use Babdelaura\BlogBundle\Entity\Image;
use Babdelaura\BlogBundle\Form\ImageType;

class ImageController extends Controller
{
    public function listerImagesAction() {
        $request = $this->get('request');
        $query = $request->query;

        $form = $this->createForm(new ImageType());

        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Image');


        $items = $repository->findBy(array(), array('id' => 'desc'));
        $nbImagesParPage = $this->container->getParameter('nbImagesParPageGallerie');

        $paginator  = $this->get('knp_paginator');
        $listeImages = $paginator->paginate(
            $items,
            $query->get('page', 1),
            $nbImagesParPage
        );
        $listeImages->setTemplate('BabdelauraBlogBundle:Admin:sliding.html.twig');

        return $this->render('BabdelauraBlogBundle:Admin/Image:listerImages.html.twig', array(
          'listeImages' => $listeImages,
          'form' => $form->createView()
        ));
    }

    public function uploadAction() {
        $request = $this->get('request');
        $file = $request->files->get('babdelaura_blogbundle_image')['file'];
        $watermark = isset($request->request->get('babdelaura_blogbundle_image')['watermark']);

        $response = array('success' => $file->isValid());

        if ($response['success']) {
            $image = new Image($file, $watermark);
            $em = $this->getDoctrine()->getManager();
            $em->persist($image);
            $em->flush();

            $response['image'] = array(
                'id' => $image->getId(),
                'path' => $request->getScheme() . '://' . $request->getHttpHost() . '/' . $image->getWebPath(),
                'width' => $image->getWidth(),
                'height' => $image->getHeight()
            );
        } else {
            $response['error'] = $this->getErrorMessage($file);
        }

        return new JsonResponse($response);
    }

    private function getErrorMessage($file) {
        switch($file->getError()) {
            case UPLOAD_ERR_OK:
                return false;

            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                return "Le fichier uploadé est trop gros (max. " . $file->getMaxFilesize() . " octets)";

            case UPLOAD_ERR_PARTIAL:
                return "L'upload du fichier n'a pas été terminé";

            case UPLOAD_ERR_NO_FILE:
                return "Tentative d'upload de fichier vide";

            default:
                return 'Erreur inconnue';
        }
    }
}
