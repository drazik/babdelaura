<?php

namespace Babdelaura\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\HttpFoundation\File\UploadedFile;

use Imagine\Gd\Imagine;
use Imagine\Image\Point;

/**
 * Image
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class Image
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
     * @ORM\Column(name="extension", type="string", length=255)
     */
    private $extension;

    /**
     * @var string
     *
     * @ORM\Column(name="alt", type="string", length=255, nullable=true)
     */
    private $alt;

    /**
     * @var integer
     *
     * @ORM\Column(name="width", type="integer")
     */
    private $width;

    /**
     * @var integer
     *
     * @ORM\Column(name="height", type="integer")
     */
    private $height;

    private $file;

    private $tempFilename;

    /**
    * @ORM\OneToMany(targetEntity="Babdelaura\BlogBundle\Entity\Article", mappedBy="image")
    */
    private $articles;

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
     * Set extension
     *
     * @param string $extension
     * @return Image
     */
    public function setExtension($extension)
    {
        $this->extension = $extension;

        return $this;
    }

    /**
     * Get extension
     *
     * @return string
     */
    public function getExtension()
    {
        return $this->extension;
    }

    /**
     * Set alt
     *
     * @param string $alt
     * @return Image
     */
    public function setAlt($alt)
    {
        $this->alt = $alt;

        return $this;
    }

    /**
     * Get alt
     *
     * @return string
     */
    public function getAlt()
    {
        return $this->alt;
    }

    //Upload d'un fichier lorsqu'il en existe déjà un autre
    public function setFile(UploadedFile $file)
    {
        $this->file = $file;

        // On vérifie si on avait déjà un fichier pour cette entité
        if (null !== $this->extension) {
          // On sauvegarde l'extension du fichier pour le supprimer plus tard
          $this->tempFilename = $this->extension;

          // On réinitialise les valeurs des attributs extension et alt
          $this->extension = null;
          $this->alt = null;
        }
    }

    public function getFile()
    {
        return $this->file;
    }

    /**
    * @ORM\PrePersist()
    * @ORM\PreUpdate()
    */
    public function preUpload()
    {
        // Si jamais il n'y a pas de fichier (champ facultatif)
        if (null === $this->file) {
          return;
        }

        // Le nom du fichier est son id, on doit stocker également son extension
        $this->extension = $this->file->guessExtension();
    }

    /**
    * @ORM\PostPersist()
    * @ORM\PostUpdate()
    */
    public function upload()
    {
    // Si jamais il n'y a pas de fichier (champ facultatif)
        if (null === $this->file) {
          return;
        }

        // Si on avait un ancien fichier, on le supprime
        if (null !== $this->tempFilename) {
          $oldFile = $this->getUploadRootDir().'/'.$this->id.'.'.$this->tempFilename;
          if (file_exists($oldFile)) {
            unlink($oldFile);
          }
        }

        // On déplace le fichier envoyé dans le répertoire de notre choix
        /*$this->file->move(
          $this->getUploadRootDir(), // Le répertoire de destination
          $this->id.'.'.$this->extension   // Le nom du fichier à créer, ici « id.extension »
        );

        if ($this->watermark) {

        }*/
        $path = $this->getUploadRootDir() . '/' . $this->id . '.' . $this->extension;
        $this->image->save($path, array('jpeg_quality' => 100));
    }

    /**
    * @ORM\PreRemove()
    */
    public function preRemoveUpload()
    {
        // On sauvegarde temporairement le nom du fichier, car il dépend de l'id
        $this->tempFilename = $this->getUploadRootDir().'/'.$this->id.'.'.$this->extension;
    }

    /**
    * @ORM\PostRemove()
    */
    public function removeUpload()
    {
        // En PostRemove, on n'a pas accès à l'id, on utilise notre nom sauvegardé
        if (file_exists($this->tempFilename)) {
          // On supprime le fichier
          unlink($this->tempFilename);
        }
    }

    public function getUploadDir()
    {
        // On retourne le chemin relatif vers l'image pour un navigateur
        return 'uploads/img';
    }

    protected function getUploadRootDir()
    {
        // On retourne le chemin relatif vers l'image pour notre code PHP
        return __DIR__.'/../../../../web/'.$this->getUploadDir();
    }

    public function getWebPath()
    {
        return $this->getUploadDir().'/'.$this->getId().'.'.$this->getExtension();
    }
    /**
     * Constructor
     */
    public function __construct($file, $watermark = false)
    {
        $this->WATERMARK_PATH = dirname(__FILE__) . '/../../../../web/images/watermark.png';
        $this->WATERMARK_OFFSET = 2;
        $this->articles = new \Doctrine\Common\Collections\ArrayCollection();
        $this->watermark = $watermark;

        $this->setFile($file);

        $this->imagine = new Imagine();

        $this->image = $this->imagine->open($this->file->getRealPath());
        $imageSourceSize = $this->image->getSize();

        $this->setWidth($imageSourceSize->getWidth());
        $this->setHeight($imageSourceSize->getHeight());

        if ($watermark) {
            $this->addWatermark();
        }
    }

    public function addWatermark() {
        $watermark = $this->imagine->open($this->WATERMARK_PATH);
        $watermarkSize = $watermark->getSize();
        $bottomRight = new Point($this->getWidth() - $watermarkSize->getWidth() - $this->WATERMARK_OFFSET, $this->getHeight() - $watermarkSize->getHeight() - $this->WATERMARK_OFFSET);

        $this->image->paste($watermark, $bottomRight);
    }

    /**
     * Add articles
     *
     * @param \Babdelaura\BlogBundle\Entity\Article $articles
     * @return Image
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
     * Set width
     *
     * @param integer $width
     *
     * @return Image
     */
    public function setWidth($width)
    {
        $this->width = $width;

        return $this;
    }

    /**
     * Get width
     *
     * @return integer
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * Set height
     *
     * @param integer $height
     *
     * @return Image
     */
    public function setHeight($height)
    {
        $this->height = $height;

        return $this;
    }

    /**
     * Get height
     *
     * @return integer
     */
    public function getHeight()
    {
        return $this->height;
    }
}
