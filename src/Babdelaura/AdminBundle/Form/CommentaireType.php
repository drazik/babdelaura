<?php

namespace Babdelaura\AdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;

class CommentaireType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('auteur', TextType::class)
            ->add('email', EmailType::class)
            ->add('site', TextType::class)
            ->add('contenu', TextareaType::class)
            ->add('parent', EntityType::class, array(
                'required' => false,
                'class' => 'BabdelauraBlogBundle:Commentaire',
                'choice_label' => 'id',
                'choices' => $options['comments']
            ));

        if ($options['recaptcha']) {
            $builder->add('recaptcha', EWZRecaptchaType::class, array(
                'mapped'      => false,
                'constraints' => array(
                    new RecaptchaTrue()
                )
            ));
        }
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Babdelaura\BlogBundle\Entity\Commentaire',
            'recaptcha' => false,
            'comments' => array()
        ));
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'babdelaura_adminbundle_commentaire';
    }
}
