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
        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Image');


        $query = $repository->findBy(array(),array('id'=>'desc'));

        $request = $this->get('request')->query;
        $nbImagesParPage = $this->container->getParameter('nbImagesParPage');
        $paginator  = $this->get('knp_paginator');
        $listeImages = $paginator->paginate(
            $query,
            $request->get('page', 1),
            $nbImagesParPage
        );
        $listeImages->setTemplate('BabdelauraBlogBundle:Admin:sliding.html.twig');

         return $this->render('BabdelauraBlogBundle:Image:listerImages.html.twig', array(
          'listeImages' => $listeImages));
    }


    public function uploadAction($addWatermark) {
        $addWatermark = $addWatermark === 'false' ? false : true;
        $request = $this->get('request');

        if ($request->isXmlHttpRequest()) {
            $uploaded = new UploadedFile(
                $_FILES['mainImageFile']['tmp_name'],
                $_FILES['mainImageFile']['name'],
                $_FILES['mainImageFile']['type'],
                $_FILES['mainImageFile']['size']);
        } else {
            $uploaded = new UploadedFile(
                $_FILES['upload']['tmp_name'],
                $_FILES['upload']['name'],
                $_FILES['upload']['type'],
                $_FILES['upload']['size']
            );
        }

        $image = new Image;
        $image->setFile($uploaded);

        $em = $this->getDoctrine()->getManager();

        $em->persist($image);
        $em->flush();

        if($addWatermark){
            $imagine = new Imagine();

            $imageSource = $imagine->open($image->getWebPath());
            $watermark = $imagine->open(__DIR__.'/../../../../web/images/watermark.png');

            $imageSourceSize = $imageSource->getSize();
            $watermarkSize = $watermark->getSize();
            $offset = 2;

            $bottomRight = new Point($imageSourceSize->getWidth() - $watermarkSize->getWidth() - $offset, $imageSourceSize->getHeight() - $watermarkSize->getHeight() - $offset);

            $imageSource->paste($watermark, $bottomRight);
            $imageSource->save($image->getWebPath());
        }
        
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
}