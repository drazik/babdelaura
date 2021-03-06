<?php

namespace Babdelaura\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Article
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Babdelaura\BlogBundle\Repository\ArticleRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Article implements DescriptionEntite
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
    * @Gedmo\Slug(fields={"titre"})
    * @ORM\Column(length=128, unique=true)
    */
    private $slug;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=255)
     * @Assert\Length(min=5, minMessage="Le titre doit faire au moins {{ limit }} caractères")
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="contenu", type="text")
     * @Assert\NotBlank(message="Le contenu de l'article ne peut pas être vide")
     */
    private $contenu;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datePublication", type="datetime")
     * @Assert\DateTime()
     */
    private $datePublication;

    /**
     * @var \DateTime
     *
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
    * @ORM\ManyToOne(targetEntity="Babdelaura\BlogBundle\Entity\Image", inversedBy="articles")
    * @ORM\JoinColumn(nullable=true)
    * @Assert\Valid()
    */
    private $image;

    /**
    * @ORM\ManyToOne(targetEntity="Babdelaura\BlogBundle\Entity\Categorie", cascade={"persist"}, inversedBy="articles")
    *
    */
    private $categorie;

    /**
    * @ORM\ManyToMany(targetEntity="Babdelaura\BlogBundle\Entity\Tag", cascade={"persist"}, inversedBy="articles")
    *
    */
    private $tags;

    /**
    * @ORM\OneToMany(targetEntity="Babdelaura\BlogBundle\Entity\Commentaire", cascade={"persist"}, mappedBy="article")
    */
    private $commentaires;

    private $imageTemp;

    public function __construct(){
        $this->datePublication = new \DateTime;
        $this->publication = false;
        $this->commentaires = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set slug
     *
     * @param string $slug
     * @return Article
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
     * @return Article
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
     * @return Article
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
     * @return Article
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
     * @return Article
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
    public function updateDateEdition()
    {
        $this->setDateEdition(new \Datetime());
    }

    /**
     * Set publication
     *
     * @param boolean $publication
     * @return Article
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

    /**
     * Set image
     *
     * @param \Babdelaura\BlogBundle\Entity\Image $image
     * @return Article
     */
    public function setImage(\Babdelaura\BlogBundle\Entity\Image $image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return \Babdelaura\BlogBundle\Entity\Image
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Add commentaires
     *
     * @param \Babdelaura\BlogBundle\Entity\Commentaire $commentaires
     * @return Article
     */
    public function addCommentaire(\Babdelaura\BlogBundle\Entity\Commentaire $commentaires)
    {
        $this->commentaires[] = $commentaires;
        $commentaires->setArticle($this);
        return $this;
    }

    /**
     * Remove commentaires
     *
     * @param \Babdelaura\BlogBundle\Entity\Commentaire $commentaires
     */
    public function removeCommentaire(\Babdelaura\BlogBundle\Entity\Commentaire $commentaires)
    {
        $this->commentaires->removeElement($commentaires);
    }

    /**
     * Get commentaires
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCommentaires()
    {
        return $this->commentaires;
    }

    public function getRootCommentairesValides()
    {
        $commentaires = array();

        foreach ($this->commentaires as $commentaire) {
            if ($commentaire->getValide() && $commentaire->getParent() == null) {
                $commentaires[] = $commentaire;
            }
        }

        return $commentaires;
    }


    public function getNbCommentaires($valide = null)
    {
        $compteur = 0;
        if($valide === null) {
            $compteur = $this->commentaires->count();
        }
        else {
            foreach ($this->commentaires as $commentaire) {
                if($commentaire->getValide() === $valide) {
                    $compteur++;
                }
            }
        }
        return $compteur;
    }


    // TODO simplifier ça en utilisant la méthode getNbCommentaires()
    public function getNbCommentairesNonValides()
    {
        $compteur = 0;
        foreach ($this->commentaires as $commentaire) {
            if($commentaire->getValide() == false) {
                $compteur++;
            }
        }
        return $compteur;
    }

    public function validerCommentaires()
    {
        foreach ($this->commentaires as $commentaire) {
            if($commentaire->getValide() == false ) {
                $commentaire->setValide(true);
            }
        }
    }

    public function getImageTemp() {
        return $this->imageTemp;
    }

    public function setImageTemp($img) {
        $this->imageTemp = $img;
        return $this;
    }


    public function getType() {
        return 'article';
    }

    public function getPathList() {
        return 'babdelaurablog_admin_listerArticles';
    }

    public function getDescription() {
        return $this->titre;
    }

    public function getPrefixeType() {
        return "l'";
    }

    /**
     * Set categorie
     *
     * @param \Babdelaura\BlogBundle\Entity\Categorie $categorie
     *
     * @return Article
     */
    public function setCategorie(\Babdelaura\BlogBundle\Entity\Categorie $categorie = null)
    {
        $this->categorie = $categorie;

        return $this;
    }

    /**
     * Get categorie
     *
     * @return \Babdelaura\BlogBundle\Entity\Categorie
     */
    public function getCategorie()
    {
        return $this->categorie;
    }

    /**
     * Add tag
     *
     * @param \Babdelaura\BlogBundle\Entity\Tag $tag
     *
     * @return Article
     */
    public function addTag(\Babdelaura\BlogBundle\Entity\Tag $tag)
    {
        $this->tags[] = $tag;
        $tag->addArticle($this);

        return $this;
    }

    /**
     * Remove tag
     *
     * @param \Babdelaura\BlogBundle\Entity\Tag $tag
     */
    public function removeTag(\Babdelaura\BlogBundle\Entity\Tag $tag)
    {
        $this->tags->removeElement($tag);
        $tag->removeArticle(null);
    }

    /**
     * Get tags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTags()
    {
        return $this->tags;
    }
}
