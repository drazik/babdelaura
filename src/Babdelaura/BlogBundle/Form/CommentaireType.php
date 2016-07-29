<?php

namespace Babdelaura\BlogBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use EWZ\Bundle\RecaptchaBundle\Form\Type\RecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\True as RecaptchaTrue;

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
            ->add('auteur', TextType::class)
            ->add('email', EmailType::class, array('required' => false))
            ->add('site', TextType::class, array('required' => false))
            ->add('contenu', TextareaType::class);

        if (!$this->isAdmin) {
            $builder->add('recaptcha', RecaptchaType::class, array(
                'mapped'      => false,
                'constraints' => array(new RecaptchaTrue())
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
    public function getBlockPrefix()
    {
        return 'babdelaura_blogbundle_commentaire';
    }
}
