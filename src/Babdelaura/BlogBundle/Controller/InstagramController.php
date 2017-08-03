<?php

// src/Babdelaura/BlogBundle/Controller/InstagramController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Babdelaura\BlogBundle\Entity\InstagramPhoto;

class InstagramController extends Controller
{
    public function getLastPhotosAction() {
        $repository = $this
            ->getDoctrine()
            ->getRepository("BabdelauraBlogBundle:InstagramPhoto");

        $lastPhotos = $repository->findBy([], ["id" => "DESC"], 9, 0);

        return $this->render(
            'BabdelauraBlogBundle:Layout:instagram.html.twig',
            [
                'photos' => $lastPhotos
            ]
        );
    }

    public function addPhotoAction(Request $request) {
        $sourceURL = $request->request->get("sourceURL");
        $url = $request->request->get("url");
        $caption = $request->request->get("caption");

        $instagramPhoto = new InstagramPhoto();
        $instagramPhoto->setUrl($url);
        $instagramPhoto->setCaption($caption);
        $instagramPhoto->setSourceUrl($sourceURL);

        $em = $this->getDoctrine()->getManager();
        $em->persist($instagramPhoto);
        $em->flush();

        return new JsonResponse([
            "sourceURL" => $sourceURL,
            "url" => $url,
            "caption" => $caption,
        ]);
    }
}
