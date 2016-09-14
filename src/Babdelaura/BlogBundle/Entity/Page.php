<?php

namespace Babdelaura\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Page
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Gedmo\Sortable\Entity\Repository\SortableRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Page implements DescriptionEntite
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @Gedmo\Slug(fields={"titre"})
     * @ORM\Column(length=128, unique=true)
     */
    private $slug;

    /**
     * @var string
     *
     * @Assert\Length(min=5, minMessage="Le titre doit faire au moins {{ limit }} caractères")
     * @ORM\Column(name="titre", type="string", length=255)
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="contenu", type="text", nullable=true)
     */
    private $contenu;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datePublication", type="datetime")
     */
    private $datePublication;

    /**
     * @var \DateTime
     *
     * @Assert\DateTime()
     * @ORM\Column(name="dateEdition", type="datetime", nullable=true)
     */
    private $dateEdition;

    /**
     * @var boolean
     *
     * @ORM\Column(name="publication", type="boolean")
     */
    private $publication;

    /**
     * @var boolean
     *
     * @ORM\Column(name="inMenu", type="boolean")
     */
    private $inMenu;

    /**
     * @var boolean
     *
     * @ORM\Column(name="inFooter", type="boolean")
     */
    private $inFooter;

    /**
     * @var integer
     * @Gedmo\SortablePosition()
     * @ORM\Column(type="integer", options={"default" : -1})
     */
    public $position;

    /**
     * @var boolean
     *
     * @ORM\Column(name="isExterne", type="boolean")
     */
    private $isExterne;

    /**
     * @var string
     *
     * @ORM\Column(name="lienExterne", type="string", length=255, nullable=true)
     */
    private $lienExterne;

     /**
     * @var boolean
     *
     * @ORM\Column(name="targetBlank", type="boolean")
     */
    private $targetBlank;

    public function __construct(){
        $this->datePublication = new \DateTime;
        $this->publication = false;
        $this->isExterne = false;
        $this->mettreEnAvant = false;
        $this->targetBlank = false;
    }
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="mettreEnAvant", type="boolean")
     */
    public $mettreEnAvant;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set slug
     *
     * @param string $slug
     * @return Page
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug
     *
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set titre
     *
     * @param string $titre
     * @return Page
     */
    public function setTitre($titre)
    {
        $this->titre = $titre;

        return $this;
    }

    /**
     * Get titre
     *
     * @return string
     */
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * Set contenu
     *
     * @param string $contenu
     * @return Page
     */
    public function setContenu($contenu)
    {
        $this->contenu = $contenu;

        return $this;
    }

    /**
     * Get contenu
     *
     * @return string
     */
    public function getContenu()
    {
        return $this->contenu;
    }

    /**
     * Set datePublication
     *
     * @param \DateTime $datePublication
     * @return Page
     */
    public function setDatePublication($datePublication)
    {
        $this->datePublication = $datePublication;

        return $this;
    }

    /**
     * Get datePublication
     *
     * @return \DateTime
     */
    public function getDatePublication()
    {
        return $this->datePublication;
    }

    /**
     * Set dateEdition
     *
     * @param \DateTime $dateEdition
     * @return Page
     */
    public function setDateEdition($dateEdition)
    {
        $this->dateEdition = $dateEdition;

        return $this;
    }

    /**
     * Get dateEdition
     *
     * @return \DateTime
     */
    public function getDateEdition()
    {
        return $this->dateEdition;
    }

    /**
    * @ORM\PreUpdate
    */
    public function updateDate()
    {
        $this->setDateEdition(new \Datetime());
    }

    /**
     * Set publication
     *
     * @param boolean $publication
     * @return Page
     */
    public function setPublication($publication)
    {
        $this->publication = $publication;

        return $this;
    }

    /**
     * Get publication
     *
     * @return boolean
     */
    public function getPublication()
    {
        return $this->publication;
    }


    public function getType() {
        return 'page';
    }

    public function getPathList() {
        return 'babdelaurablog_admin_listerPages';
    }

    public function getDescription() {
        return $this->titre;
    }

    public function getPrefixeType() {
        return "la ";
    }

    /**
     * Set inMenu
     *
     * @param boolean $inMenu
     *
     * @return Page
     */
    public function setInMenu($inMenu)
    {
        $this->inMenu = $inMenu;

        return $this;
    }

    /**
     * Get inMenu
     *
     * @return boolean
     */
    public function getInMenu()
    {
        return $this->inMenu;
    }

    /**
     * Set inFooter
     *
     * @param boolean $inFooter
     *
     * @return Page
     */
    public function setInFooter($inFooter)
    {
        $this->inFooter = $inFooter;

        return $this;
    }

    /**
     * Get inFooter
     *
     * @return boolean
     */
    public function getInFooter()
    {
        return $this->inFooter;
    }

    /**
     * Set position
     *
     * @param integer $position
     *
     * @return Page
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Get position
     *
     * @return integer
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Set isExterne
     *
     * @param boolean $isExterne
     *
     * @return Page
     */
    public function setIsExterne($isExterne)
    {
        $this->isExterne = $isExterne;

        return $this;
    }

    /**
     * Get isExterne
     *
     * @return boolean
     */
    public function getIsExterne()
    {
        return $this->isExterne;
    }

    /**
     * Set lienExterne
     *
     * @param string $lienExterne
     *
     * @return Page
     */
    public function setLienExterne($lienExterne)
    {
        $this->lienExterne = $lienExterne;

        return $this;
    }

    /**
     * Get lienExterne
     *
     * @return string
     */
    public function getLienExterne()
    {
        return $this->lienExterne;
    }

    /**
     * Set mettreEnAvant
     *
     * @param boolean $mettreEnAvant
     *
     * @return Page
     */
    public function setMettreEnAvant($mettreEnAvant)
    {
        $this->mettreEnAvant = $mettreEnAvant;

        return $this;
    }

    /**
     * Get mettreEnAvant
     *
     * @return boolean
     */
    public function getMettreEnAvant()
    {
        return $this->mettreEnAvant;
    }

    /**
     * Set targetBlank
     *
     * @param boolean $targetBlank
     *
     * @return Page
     */
    public function setTargetBlank($targetBlank)
    {
        $this->targetBlank = $targetBlank;

        return $this;
    }

    /**
     * Get targetBlank
     *
     * @return boolean
     */
    public function getTargetBlank()
    {
        return $this->targetBlank;
    }
}
