<?php

// src/Babdelaura/BlogBundle/Controller/ImageController.php

namespace Babdelaura\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;

use Babdelaura\BlogBundle\Entity\Image;
use Babdelaura\BlogBundle\Form\ImageType;

class ImageController extends Controller
{
    public function afficherGallerieAction() {
        $form = $this->createForm(new ImageType());

        return $this->render('BabdelauraBlogBundle:Admin/Image:gallerie.html.twig', array(
          'form' => $form->createView(),
        ));
    }

    public function getImagesAction(Request $request) {
        $page = $request->query->getInt('page', 1);
        $nbImagesParPage = $this->container->getParameter('nbImagesParPageGallerie');
        $firstResult = ($page - 1) * $nbImagesParPage;
        $lastResult = $page * $nbImagesParPage;

        $repository = $this->getDoctrine()
                           ->getManager()
                           ->getRepository('BabdelauraBlogBundle:Image');
        $nbImagesTotal = count($repository->findAll());
        $images = $repository->findBy(array(), array('id' => 'desc'), $lastResult, $firstResult);

        $data = array(
            'pagination' => array(
                'currentPage' => $page,
                'hasPreviousResults' => $page > 1,
                'hasNextResults' => $lastResult < $nbImagesTotal
            ),
            'images' => array()
        );

        foreach ($images as $image) {
            $data['images'][] = array(
                'id' => $image->getId(),
                'src' => $request->getScheme() . '://' . $request->getHttpHost() . '/' . $image->getWebPath()
            );
        }

        return new JsonResponse($data);
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
