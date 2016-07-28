<?php

namespace Babdelaura\BlogBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\True;

class CommentaireType extends AbstractType
{
    private $isAdmin;

    public function __construct($isAdmin = false) {
        $this->isAdmin = $isAdmin;
    }

        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('auteur','text')
            ->add('email','email', array('required' => false))
            ->add('site','text', array('required' => false))
            ->add('contenu','textarea');

        if (!$this->isAdmin) {
            $builder->add('recaptcha', 'ewz_recaptcha', array(
                'mapped'      => false,
                'constraints' => array(
                    new True() )
            ));
        }

    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Babdelaura\BlogBundle\Entity\Commentaire'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'babdelaura_blogbundle_commentaire';
    }
}
