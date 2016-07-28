<?php

namespace Babdelaura\BlogBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ArticleType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('titre','text')
            ->add('contenu', 'textarea')
            ->add('publication', 'checkbox', array('required' => false))
            ->add('imageTemp', 'text',array('attr' => array('class' =>'hidden-image-path')))
            ->add('categories', 'entity', array(
                  'class'    => 'BabdelauraBlogBundle:Categorie',
                  'choice_label' => 'nom',
                  'multiple' => true))
            ->add('datePublication','datetime')
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
    public function getName()
    {
        return 'babdelaura_blogbundle_article';
    }
}
