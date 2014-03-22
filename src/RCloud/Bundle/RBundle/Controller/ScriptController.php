<?php

namespace RCloud\Bundle\RBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

use RCloud\Bundle\RBundle\Entity\Script;

class ScriptController extends Controller
{
    /**
     * @Route("/script/run", name="run_script_ajax")
     * @Method({"POST"})
     * @Template()
     */
    public function runAction(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $script = $request->request->get('script');

            $fileName = uniqid();
            $scriptFile = fopen('upload/scripts/' . $fileName . '.R', 'a');

            fputs($scriptFile, $script);

            fclose($scriptFile);

            exec('Rscript --vanilla upload/scripts/' . $fileName . '.R > upload/scripts/' . $fileName . '.res 2> upload/scripts/' . $fileName . '.res');

            $resultFile = fopen('upload/scripts/' . $fileName . '.res', 'r');

            $result = '';

            while ($line = fgets($resultFile)) {
                $result .= nl2br($line);
            }

            fclose($resultFile);

            unlink('upload/scripts/' . $fileName . '.R');
            unlink('upload/scripts/' . $fileName . '.res');

            return array(
                'result' => $result
            );
        } else {
            throw new MethodNotAllowedException(array('XHR'));
        }
    }

    /**
     * @Route("/script/new/save", name="save_new_script_ajax")
     * @Method({"POST"})
     */
    public function saveNewScript(Request $request)
    {
        $scriptName = $request->request->get('scriptName');
        $scriptContent = $request->request->get('scriptContent');
        $user = $this->get('security.context')->getToken()->getUser();

        $script = new Script();
        $script->setName($scriptName);
        $script->setContent($scriptContent);
        $script->setOwner($user);

        $em = $this->getDoctrine()->getManager();
        $em->persist($script);
        $em->flush();

        return new Response($script->getId());
    }

    /**
     * @Route("script/existing/save", name="save_existing_script_ajax")
     * @Method({"POST"})
     */
    public function saveExistingScript(Request $request)
    {
        $scriptId = $request->request->get('scriptId');
        $scriptContent = $request->request->get('scriptContent');

        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('RCloudRBundle:Script');

        $script = $repository->find($scriptId);

        $script->setContent($scriptContent);

        $em->flush();

        return new Response('ok');
    }

    /**
     * @Route("/scripts/", name="scripts_list")
     * @Method({"GET"})
     * @Template()
     */
    public function listAction()
    {
        $user = $this->get('security.context')->getToken()->getUser();

        $scripts = $user->getScripts();

        return array(
            'scripts' => $scripts
        );
    }
}
