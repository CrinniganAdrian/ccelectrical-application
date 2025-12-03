package com.ccelectrical.springjwt.repository;

import com.ccelectrical.springjwt.models.Favourites;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavouritesRepository extends JpaRepository <Favourites,Long>  {

}
