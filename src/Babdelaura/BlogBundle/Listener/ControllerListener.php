<?php

namespace Babdelaura\BlogBundle\Listener;

use Symfony\Component\HttpKernel\Event\FilterControllerEvent;

class ControllerListener
{
    public function __construct()
    {
    }

    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();

        if (isset($controller[0])) {
            $controller = $controller[0];
            if (method_exists($controller, 'initialize')) {
                $controller->initialize();
            }
        }
    }
}
