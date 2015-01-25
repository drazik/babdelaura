<?php
// src/Babdelaura/BlogBundle/Repository/CommentaireRepository.php

namespace Babdelaura\BlogBundle\Repository;

use Doctrine\ORM\EntityRepository;


class CommentaireRepository extends EntityRepository {

    public function getNbCommentaires($valide = true) {
      $query = $this->createQueryBuilder('c')
                ->select('COUNT(c)');

      if (!$valide) {
        $query = $query->where('c.valide = false');
      }

      $query = $query->getQuery()
               ->getSingleScalarResult();

      return $query;
    }
}