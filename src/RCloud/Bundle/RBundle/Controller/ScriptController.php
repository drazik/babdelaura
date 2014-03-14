<?php

namespace RCloud\Bundle\RBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

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
}
