<?php

namespace Babdelaura\AdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class PageInterneType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('titre', TextType::class)
            ->add('contenu', TextareaType::class)
            ->add('publication', CheckboxType::class, array('required' => false))
            ->add('inMenu', CheckboxType::class, array('required' => false))
            ->add('inFooter', CheckboxType::class, array('required' => false))
            ->add('position', IntegerType::class, array('required' => false))
            ->add('mettreEnAvant', CheckboxType::class, array('required' => false))
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
    public function getBlockPrefix()
    {
        return 'babdelaura_adminbundle_page';
    }
}
