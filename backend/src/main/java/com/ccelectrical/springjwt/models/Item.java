package com.ccelectrical.springjwt.models;
import javax.persistence.*;
/**
 *  This is the item entity class
 */
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @Column(length = 2000)
    private String description;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String imageUrl;
    
    // No-args constructor
    public Item() {
    }
    
    // All-args constructor
    public Item(Long id, String name, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    
    // Constructor without id (for creating new items)
    public Item(String name, String description, String imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    // Builder pattern
    public static ItemBuilder builder() {
        return new ItemBuilder();
    }
    
    public static class ItemBuilder {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;
        
        ItemBuilder() {
        }
        
        public ItemBuilder id(Long id) {
            this.id = id;
            return this;
        }
        
        public ItemBuilder name(String name) {
            this.name = name;
            return this;
        }
        
        public ItemBuilder description(String description) {
            this.description = description;
            return this;
        }
        
        public ItemBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }
        
        public Item build() {
            return new Item(id, name, description, imageUrl);
        }
    }
}
