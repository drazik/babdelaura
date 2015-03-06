<?php

namespace Babdelaura\BlogBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\True;

class CommentaireType extends AbstractType
{
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
            ->add('contenu','textarea')
            ->add('recaptcha', 'ewz_recaptcha', array(
                  'mapped'      => false,
                  'constraints' => array(
                    new True()
                    )
                ));

    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
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
