package com.ccelectrical.springjwt.controllers;

import com.ccelectrical.springjwt.exceptions.FavouriteNFException;
import com.ccelectrical.springjwt.exceptions.UserNFException;
import com.ccelectrical.springjwt.models.Favourites;
import com.ccelectrical.springjwt.models.User;
import com.ccelectrical.springjwt.repository.FavouritesRepository;
import com.ccelectrical.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FavouritesController {

    @Autowired
    private FavouritesRepository favouritesRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/favourites")
    List<Favourites> getAllFavourites()
    {
        return favouritesRepository.findAll();
    }

    @GetMapping("/users")
    List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNFException(id));
    }


    @PostMapping("/favourites")
    Favourites newFavourite(@RequestBody Favourites newFavourite)
    {
        return favouritesRepository.save(newFavourite);
    }


    @GetMapping("/favourites/{id}")
    Favourites getFavouriteById(@PathVariable Long id) {
        return favouritesRepository.findById(id)
                .orElseThrow(() -> new FavouriteNFException(id));
    }

    @DeleteMapping("/favourites/{id}")
    String deleteFavourite(@PathVariable Long id){
        if(!favouritesRepository.existsById(id)){
            throw new FavouriteNFException(id);
        }
        favouritesRepository.deleteById(id);
        return  "Favourite with id "+id+" has been deleted success.";
    }
}
