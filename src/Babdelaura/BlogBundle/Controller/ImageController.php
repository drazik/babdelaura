<?php

// src/Babdelaura/BlogBundle/Controller/ImageController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Babdelaura\BlogBundle\Entity\Image;

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


    public function uploadAction() {
        $uploaded = new UploadedFile(
            $_FILES['upload']['tmp_name'],
            $_FILES['upload']['name'],
            $_FILES['upload']['type'],
            $_FILES['upload']['size']
        );

        $image = new Image;
        // $image->setAlt('truc');
        $image->setFile($uploaded);

        $em = $this->getDoctrine()->getManager();

        $em->persist($image);
        $em->flush();

        return new Response('Image Chargée');
    }

}