<?php

namespace Babdelaura\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Commentaire
 *
 * @ORM\Table()
 *
 * @ORM\Entity(repositoryClass="Babdelaura\BlogBundle\Repository\CommentaireRepository")
 *
 */
class Commentaire implements DescriptionEntite
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
     * @ORM\Column(name="auteur", type="string", length=255)
     * @Assert\NotBlank(message="Un nom doit être renseigné")
     */
    private $auteur;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="site", type="string", length=255, nullable=true)
     */
    private $site;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datePublication", type="datetime")
     */
    private $datePublication;

    /**
     * @var string
     *
     * @ORM\Column(name="contenu", type="text")
     * @Assert\NotBlank(message="Le commentaire ne doit pas être vide")
     */
    private $contenu;

    /**
     * @var boolean
     *
     * @ORM\Column(name="valide", type="boolean")
     */
    private $valide;

    /**
     * @ORM\ManyToOne(targetEntity="Babdelaura\BlogBundle\Entity\Article", inversedBy="commentaires")
     * @ORM\JoinColumn(nullable=false)
     */
    private $article;

    public function __construct(){
        $this->datePublication = new \DateTime;
        $this->valide = false;

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
     * Set auteur
     *
     * @param string $auteur
     * @return Commentaire
     */
    public function setAuteur($auteur)
    {
        $this->auteur = $auteur;

        return $this;
    }

    /**
     * Get auteur
     *
     * @return string
     */
    public function getAuteur()
    {
        return $this->auteur;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return Commentaire
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set site
     *
     * @param string $site
     * @return Commentaire
     */
    public function setSite($site)
    {
        $this->site = $site;

        return $this;
    }

    /**
     * Get site
     *
     * @return string
     */
    public function getSite()
    {
        return $this->site;
    }

    /**
     * Set datePublication
     *
     * @param \DateTime $datePublication
     * @return Commentaire
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
     * Set contenu
     *
     * @param string $contenu
     * @return Commentaire
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
     * Set article
     *
     * @param \BabdeLaura\BlogBundle\Entity\Article $article
     * @return Commentaire
     */
    public function setArticle(\BabdeLaura\BlogBundle\Entity\Article $article)
    {
        $this->article = $article;

        return $this;
    }

    /**
     * Get article
     *
     * @return \BabdeLaura\BlogBundle\Entity\Article
     */
    public function getArticle()
    {
        return $this->article;
    }

    /**
     * Set valide
     *
     * @param boolean $valide
     * @return Commentaire
     */
    public function setValide($valide)
    {
        $this->valide = $valide;

        return $this;
    }

    /**
     * Get valide
     *
     * @return boolean
     */
    public function getValide()
    {
        return $this->valide;
    }

    public function getType() {
        return 'commentaire';
    }

    public function getPathList() {
        return 'babdelaurablog_admin_listerCommentairesNonValides';
    }

    public function getDescription() {
        return $this->contenu;
    }

    public function getPrefixeType() {
        return "le ";
    }
}
