<?php

namespace Babdelaura\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Categorie
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Categorie implements DescriptionEntite
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
     * @ORM\Column(name="nom", type="string", length=255)
     */
    private $nom;


    /**
     * @var boolean
     *
     * @ORM\Column(name="visible", type="boolean")
     */
    private $visible;


    /**
    * @Gedmo\Slug(fields={"nom"})
    * @ORM\Column(length=128, unique=true)
    */
    private $slug;

    /**
    * @ORM\ManyToMany(targetEntity="Babdelaura\BlogBundle\Entity\Article", mappedBy="categories")
    */
    private $articles;

    /**
    * @ORM\ManyToOne(targetEntity="Babdelaura\BlogBundle\Entity\Categorie", inversedBy="enfants")
    * @ORM\JoinColumn(nullable=true)
    */
    private $parent;

    /**
    * @ORM\OneToMany(targetEntity="Babdelaura\BlogBundle\Entity\Categorie", mappedBy="parent")
    */
    private $enfants;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->articles = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set nom
     *
     * @param string $nom
     * @return Categorie
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom
     *
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Set visible
     *
     * @param boolean $visible
     * @return Categorie
     */
    public function setVisible($visible)
    {
        $this->visible = $visible;

        return $this;
    }

    /**
     * Get visible
     *
     * @return boolean
     */
    public function getVisible()
    {
        return $this->visible;
    }

    /**
     * Add articles
     *
     * @param \Babdelaura\BlogBundle\Entity\Article $articles
     * @return Categorie
     */
    public function addArticle(\Babdelaura\BlogBundle\Entity\Article $articles)
    {
        $this->articles[] = $articles;

        return $this;
    }

    /**
     * Remove articles
     *
     * @param \Babdelaura\BlogBundle\Entity\Article $articles
     */
    public function removeArticle(\Babdelaura\BlogBundle\Entity\Article $articles)
    {
        $this->articles->removeElement($articles);
    }

    /**
     * Get articles
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getArticles()
    {
        return $this->articles;
    }

    /**
     * Set slug
     *
     * @param string $slug
     * @return Categorie
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

    public function getType() {
        return 'categorie';
    }

    public function getPathList() {
        return 'babdelaurablog_admin_listerCategories';
    }

    public function getDescription() {
        return $this->nom;
    }

    public function getPrefixeType() {
        return "la ";
    }

    /**
     * Set parent
     *
     * @param \Babdelaura\BlogBundle\Entity\Categorie $parent
     * @return Categorie
     */
    public function setParent(\Babdelaura\BlogBundle\Entity\Categorie $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \Babdelaura\BlogBundle\Entity\Categorie
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Add enfants
     *
     * @param \Babdelaura\BlogBundle\Entity\Categorie $enfants
     * @return Categorie
     */
    public function addEnfant(\Babdelaura\BlogBundle\Entity\Categorie $enfants)
    {
        $this->enfants[] = $enfants;

        return $this;
    }

    /**
     * Remove enfants
     *
     * @param \Babdelaura\BlogBundle\Entity\Categorie $enfants
     */
    public function removeEnfant(\Babdelaura\BlogBundle\Entity\Categorie $enfants)
    {
        $this->enfants->removeElement($enfants);
    }

    /**
     * Get enfants
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEnfants()
    {
        return $this->enfants;
    }
}
