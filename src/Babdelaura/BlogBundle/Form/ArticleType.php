<?php

namespace Babdelaura\BlogBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class ArticleType extends AbstractType
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
            ->add('imageTemp', TextType::class, array('attr' => array('class' =>'hidden-image-path')))
            ->add('categories', EntityType::class, array(
                  'class'    => 'BabdelauraBlogBundle:Categorie',
                  'choice_label' => 'nom',
                  'multiple' => true))
            ->add('datePublication', DateTimeType::class)
            ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Babdelaura\BlogBundle\Entity\Article'
        ));
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'babdelaura_blogbundle_article';
    }
}
