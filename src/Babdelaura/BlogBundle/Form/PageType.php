<?php

namespace Babdelaura\BlogBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('titre', 'text')
            ->add('contenu', 'textarea')
            ->add('publication', 'checkbox', array('required' => false))
            ->add('inMenu', 'checkbox', array('required' => false))
            ->add('inFooter', 'checkbox', array('required' => false))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Babdelaura\BlogBundle\Entity\Page'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'babdelaura_blogbundle_page';
    }
}
