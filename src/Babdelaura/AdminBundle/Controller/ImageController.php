<?php

// src/Babdelaura/AdminBundle/Controller/ImageController.php

namespace Babdelaura\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;

use Babdelaura\BlogBundle\Entity\Image;
use Babdelaura\AdminBundle\Form\ImageType;

class ImageController extends Controller
{
    public function afficherGalerieAction() {
        $form = $this->createForm(ImageType::class, null, [
            'action' => $this->generateUrl('babdelaurablog_admin_uploaderImage')
        ]);

        return $this->render('BabdelauraAdminBundle:Image:galerie.html.twig', array(
          'form' => $form->createView(),
        ));
    }

    public function getImagesAction(Request $request) {
        $page = $request->query->getInt('page', 1);
        $nbImagesParPage = $this->container->getParameter('nbImagesParPageGalerie');
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
                'src' => $request->getScheme() . '://' . $request->getHttpHost() . '/' . $image->getWebPath() . '?width=' . $image->getWidth() . '&height=' . $image->getHeight()
            );
        }

        return new JsonResponse($data);
    }

    public function uploadAction(Request $request) {
        $files = $request->files->get('babdelaura_blogbundle_image')['file'];
        $watermark = isset($request->request->get('babdelaura_blogbundle_image')['watermark']);

        $response = [
            "success" => true,
            "items" => [],
        ];

        foreach ($files as $file) {
            $success = $file->isValid();

            $item = ["success" => $success];

            if ($success) {
                $image = new Image($file, $watermark);
                $em = $this->getDoctrine()->getManager();
                $em->persist($image);
                $em->flush();

                $item["image"] = [
                    'id' => $image->getId(),
                    'path' => $request->getScheme() . '://' . $request->getHttpHost() . '/' . $image->getWebPath(),
                    'width' => $image->getWidth(),
                    'height' => $image->getHeight()
                ];
            } else {
                $item["error"] = $this->getErrorMessage($file);
            }

            $response[] = $item;
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
