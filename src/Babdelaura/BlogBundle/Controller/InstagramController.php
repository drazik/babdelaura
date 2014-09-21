<?php

// src/Babdelaura/BlogBundle/Controller/InstagramController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class InstagramController extends Controller
{
    public function chargerFluxAction() {
        $query = '504309617';

        $api = $this->get('instaphp');
        $response = $api->Users->Recent($query, array('count' => 8));
        $results = $response->data;

        return $this->render('BabdelauraBlogBundle:Instagram:chargerFlux.html.twig', array('results' => $results));
    }
}