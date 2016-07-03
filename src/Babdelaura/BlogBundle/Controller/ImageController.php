<?php

// src/Babdelaura/BlogBundle/Controller/ImageController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Babdelaura\BlogBundle\Entity\Image;
use Imagine\Gd\Imagine;
use Imagine\Image\Point;

class ImageController extends Controller
{
    public function listerImagesAction() {
        $request = $this->get('request');

        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Image');


        $items = $repository->findBy(array(),array('id'=>'desc'));
        $query = $request->query;

        if ($query->get('CKEditor') !== null) {
            $templateName = 'BabdelauraBlogBundle:Image:listerImages.html.twig';
            $nbImagesParPage = $this->container->getParameter('nbImagesParPage');
        }
        else {
            $templateName = 'BabdelauraBlogBundle:Admin/Image:listerImages.html.twig';
            $nbImagesParPage = $this->container->getParameter('nbImagesParPageGallerie');
        }

        $paginator  = $this->get('knp_paginator');
        $listeImages = $paginator->paginate(
            $items,
            $query->get('page', 1),
            $nbImagesParPage
        );
        $listeImages->setTemplate('BabdelauraBlogBundle:Admin:sliding.html.twig');

        return $this->render($templateName, array(
          'listeImages' => $listeImages));
    }


    public function uploadAction($addWatermark) {
        $imagine = new Imagine();
        $addWatermark = $addWatermark === 'false' ? false : true;
        $request = $this->get('request');
        $formInputName = $request->isXmlHttpRequest() && !$addWatermark ? 'mainImageFile' : 'upload';
        $file = $_FILES[$formInputName];
        $error = $this->handleError($file);

        if ($error) {
            if ($request->isXmlHttpRequest()) {
                return new JsonResponse(array(
                    'success' => false,
                    'message' => $error
                ));
            } else {
                return new Response($error);
            }
        }

        $uploaded = new UploadedFile(
            $_FILES[$formInputName]['tmp_name'],
            $_FILES[$formInputName]['name'],
            $_FILES[$formInputName]['type'],
            $_FILES[$formInputName]['size']
        );

        $imageSource = $imagine->open($_FILES[$formInputName]['tmp_name']);
        $imageSourceSize = $imageSource->getSize();

        if ($addWatermark) {
            $watermark = $imagine->open(__DIR__.'/../../../../web/images/watermark.png');

            $watermarkSize = $watermark->getSize();
            $offset = 2;

            $bottomRight = new Point($imageSourceSize->getWidth() - $watermarkSize->getWidth() - $offset, $imageSourceSize->getHeight() - $watermarkSize->getHeight() - $offset);

            $imageSource->paste($watermark, $bottomRight);
            $imageSource->save($_FILES[$formInputName]['tmp_name'] . '.' . $uploaded->guessExtension(), array('jpeg_quality' => 100));
        }

        $image = new Image;
        $image->setWidth($imageSourceSize->getWidth());
        $image->setHeight($imageSourceSize->getHeight());
        $image->setFile($uploaded);

        $em = $this->getDoctrine()->getManager();

        $em->persist($image);
        $em->flush();

        if ($request->isXmlHttpRequest()) {
            return new JsonResponse(array(
                'success' => true,
                'image' => array(
                    'id' => $image->getId(),
                    'url' => $this->generateUrl('babdelaurablog_accueil', array(), true) . $image->getWebPath()
                )
            ));
        } else {
            return new Response('Image Chargée');
        }
    }

    private function handleError($file) {
        $message = 'Error uploading file';

        switch($file['error']) {
            case UPLOAD_ERR_OK:
                $message = false;
                break;

            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $message .= ' - file too large';
                break;

            case UPLOAD_ERR_PARTIAL:
                $message .= ' - file upload was not completed.';
                break;

            case UPLOAD_ERR_NO_FILE:
                $message .= ' - zero-length file uploaded.';
                break;

            default:
                $message .= ' - internal error #'.$_FILES['newfile']['error'];
                break;
        }

        if (!$message && !is_uploaded_file($file['tmp_name'])) {
            $message = 'Error uploading file - unknown error.';
        }

        return $message;
    }

    public function reparerTaillesAction() {
        // récupérer toutes les images
        // pour chaque image :
        // - lire l'image avec Imagine
        // - récupérer les dimensions de l'image
        // - les stocker en base

        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        $repository = $em->getRepository('BabdelauraBlogBundle:Image');
        $images = $repository->findAll();
        $nbImagesTotal = count($images);
        $nbImagesChanged = 0;
        $imagine = new Imagine();

        foreach ($images as $image) {
            $img = $imagine->open($image->getWebPath());
            $size = $img->getSize();

            $image->setWidth($size->getWidth());
            $image->setHeight($size->getHeight());

            $em->persist($image);

            ++$nbImagesChanged;
        }

        $em->flush();

        return new Response("Images traitées : $nbImagesChanged / $nbImagesTotal");
    }
}
