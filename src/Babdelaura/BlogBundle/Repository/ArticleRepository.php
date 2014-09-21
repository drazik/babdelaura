<?php
// src/Babdelaura/BlogBundle/Repository/ArticleRepository.php

namespace Babdelaura\BlogBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

use Babdelaura\BlogBundle\Entity\Categorie;

class ArticleRepository extends EntityRepository {

    public function getArticlesPaginator(Categorie $categorie = null, $publication = null) {
        $query = $this->createQueryBuilder('a')
                      ->leftJoin('a.image', 'i')
                      ->addSelect('i');

        if ($categorie) {
            $query = $query->innerJoin('a.categories', 'cat', 'WITH', 'cat=:categorie')
                           ->setParameter('categorie', $categorie);
        } else {
            $query = $query->innerJoin('a.categories', 'cat')
                           ->addSelect('cat');
        }

        if($publication === true) {
            $query = $query->where('a.publication = true');
        }
        elseif($publication === false) {
            $query = $query->where('a.publication = false');
        }

        $query = $query->orderBy('a.id','DESC')
                       ->getQuery();

        return $query;

    }

    public function rechercher($motsCles) {

        $tab = explode(" ", $motsCles);

        $query = $this->createQueryBuilder('a');

        foreach ($tab as $index => $motCle) {

            $query = $query->orwhere('a.titre LIKE :word')
                           ->orwhere('a.contenu LIKE :word')
                           ->setParameter('word', '%'.$motCle.'%');
        }
        $query = $query->andwhere('a.publication = true');


        $query = $query->orderBy('a.id','DESC');

        return $query->getQuery()->getResult();
    }

    public function getPrecedent($id) {
        $query = $this->createQueryBuilder('a')
                      ->where('a.id < :id')
                      ->setParameter('id', $id)
                      ->andwhere('a.publication = true')
                      ->orderBy('a.id','DESC')
                      ->setMaxResults(1)
                      ->getQuery();

        return $query->getResult();
    }

    public function getSuivant($id) {
        $query = $this->createQueryBuilder('a')
                      ->where('a.id > :id')
                      ->setParameter('id', $id)
                      ->andwhere('a.publication = true')
                      ->orderBy('a.id','ASC')
                      ->setMaxResults(1)
                      ->getQuery();

        return $query->getResult();

    }

    public function getArticlesDate($annee, $mois = null, $jour = null) {
        $query = $this->createQueryBuilder('a')
                      ->leftJoin('a.image', 'i')
                      ->addSelect('i');
        $query = $query->where('a.publication = true')
                       ->andwhere('YEAR(a.datePublication) = :annee')
                        ->setParameter('annee', $annee);

        if ($mois != null) {
            $query = $query ->andwhere('MONTH(a.datePublication) = :mois')
                            ->setParameter('mois', $mois);
            if ($jour != null) {
                $query = $query ->andwhere('DAY(a.datePublication) = :jour')
                                ->setParameter('jour', $jour);
            }
        }


        $query = $query->orderBy('a.id','DESC')
                       ->getQuery();

        return $query;

    }
}
