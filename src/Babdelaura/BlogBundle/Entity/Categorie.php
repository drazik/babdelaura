<?php

namespace Babdelaura\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Categorie
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Gedmo\Sortable\Entity\Repository\SortableRepository")
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
    * @ORM\OneToMany(targetEntity="Babdelaura\BlogBundle\Entity\Article", mappedBy="categorie")
    */
    private $articles;

    /**
     * @var integer
     * @Gedmo\SortablePosition()
     * @ORM\Column(type="integer",options={"default" : -1})
     */
    public $position;

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
     * Set position
     *
     * @param integer $position
     *
     * @return Categorie
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
     * Add article
     *
     * @param \Babdelaura\BlogBundle\Entity\Article $article
     *
     * @return Categorie
     */
    public function addArticle(\Babdelaura\BlogBundle\Entity\Article $article)
    {
        $this->articles[] = $article;

        return $this;
    }

    /**
     * Remove article
     *
     * @param \Babdelaura\BlogBundle\Entity\Article $article
     */
    public function removeArticle(\Babdelaura\BlogBundle\Entity\Article $article)
    {
        $this->articles->removeElement($article);
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
}
