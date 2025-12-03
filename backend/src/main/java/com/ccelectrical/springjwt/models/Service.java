package com.ccelectrical.springjwt.models;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
/**
 *  This is the service entity class
 */
@Entity
public class Service {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    
    // No-args constructor
    public Service() {
    }
    
    // All-args constructor
    public Service(Long id, String name, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    
    // Constructor without id (for creating new services)
    public Service(String name, String description, String imageUrl) {
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
    public static ServiceBuilder builder() {
        return new ServiceBuilder();
    }
    
    public static class ServiceBuilder {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;
        
        ServiceBuilder() {
        }
        
        public ServiceBuilder id(Long id) {
            this.id = id;
            return this;
        }
        
        public ServiceBuilder name(String name) {
            this.name = name;
            return this;
        }
        
        public ServiceBuilder description(String description) {
            this.description = description;
            return this;
        }
        
        public ServiceBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }
        
        public Service build() {
            return new Service(id, name, description, imageUrl);
        }
    }
}