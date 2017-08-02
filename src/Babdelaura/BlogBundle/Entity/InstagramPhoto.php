<?php

namespace Babdelaura\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * InstagramPhoto
 *
 * @ORM\Table(name="instagram_photo")
 * @ORM\Entity(repositoryClass="Babdelaura\BlogBundle\Repository\InstagramPhotoRepository")
 */
class InstagramPhoto
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="sourceUrl", type="string", length=1024)
     */
    private $sourceUrl;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=1024)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="caption", type="text")
     */
    private $caption;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set sourceUrl
     *
     * @param string $sourceUrl
     *
     * @return InstagramPhoto
     */
    public function setSourceUrl($sourceUrl)
    {
        $this->sourceUrl = $sourceUrl;

        return $this;
    }

    /**
     * Get sourceUrl
     *
     * @return string
     */
    public function getSourceUrl()
    {
        return $this->sourceUrl;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return InstagramPhoto
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set caption
     *
     * @param string $caption
     *
     * @return InstagramPhoto
     */
    public function setCaption($caption)
    {
        $this->caption = $caption;

        return $this;
    }

    /**
     * Get caption
     *
     * @return string
     */
    public function getCaption()
    {
        return $this->caption;
    }
}

