package com.ccelectrical.springjwt.controllers;

import com.ccelectrical.springjwt.exceptions.ItemNFException;
import com.ccelectrical.springjwt.models.Item;
import com.ccelectrical.springjwt.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/items")
    public Item newItem(@RequestBody Item newItem)
    {
        return itemRepository.save(newItem);
    }

    @GetMapping("/items")
    public List<Item> getAllItems()
    {
        return itemRepository.findAll();
    }

    @GetMapping("/items/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNFException(id));
    }

    @PutMapping("/items/{id}")
    public Item updateItem(@RequestBody Item newItem, @PathVariable Long id) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(newItem.getName());
                    item.setDescription(newItem.getDescription());
                    item.setImageUrl(newItem.getImageUrl());
                    return itemRepository.save(item);
                }).orElseThrow(() -> new ItemNFException(id));
    }

    /*
    @DeleteMapping("/items/{id}")
    public String deleteItem(@PathVariable Long id){
        if(!itemRepository.existsById(id)){
            throw new ItemNFException(id);
        }
        itemRepository.deleteById(id);
        return  "Item with id "+id+" has been deleted success.";
    }
     */


    @DeleteMapping(value = "items/{id}")
    public void deleteItemById(@PathVariable(value = "id") Long itemId) throws ChangeSetPersister.NotFoundException {
        if (!itemRepository.findById(itemId).isPresent()) {
            throw new ChangeSetPersister.NotFoundException();
        }
        itemRepository.deleteById(itemId);
    }



}
