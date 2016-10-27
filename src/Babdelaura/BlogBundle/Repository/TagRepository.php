<?php
// src/Babdelaura/BlogBundle/Repository/TagRepository.php

namespace Babdelaura\BlogBundle\Repository;

use Doctrine\ORM\EntityRepository;

class TagRepository extends EntityRepository
{
    public function findByPartialName($partialName) {
        $queryBuilder = $this->createQueryBuilder('t');
        $queryBuilder->where(
            $queryBuilder->expr()->like(
                't.nom',
                $queryBuilder->expr()->literal('%' . $partialName . '%'))
        );

        $query = $queryBuilder->getQuery();
        $results = $query->getArrayResult();

        return $results;
    }
}
