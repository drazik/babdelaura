<?php

// src/Babdelaura/BlogBundle/Controller/InstagramController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Babdelaura\BlogBundle\Entity\InstagramPhoto;

class InstagramController extends Controller
{
    public function chargerFluxAction() {
        $query = '504309617';

        $api = $this->get('instaphp');
        $response = $api->Users->Recent($query, array('count' => 8));
        $results = $response->data;

        return $this->render('BabdelauraBlogBundle:Instagram:chargerFlux.html.twig', array('results' => $results));
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
