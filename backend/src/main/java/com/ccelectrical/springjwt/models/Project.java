package com.ccelectrical.springjwt.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
/**
 *  This is the project entity class
 */
@Entity
public class Project {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    
    @Column(length = 2000)
    private String description;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String imageUrl;
    
    // No-args constructor
    public Project() {
    }
    
    // All-args constructor
    public Project(Long id, String name, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    
    // Constructor without id (for creating new projects)
    public Project(String name, String description, String imageUrl) {
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
    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }
    
    public static class ProjectBuilder {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;
        
        ProjectBuilder() {
        }
        
        public ProjectBuilder id(Long id) {
            this.id = id;
            return this;
        }
        
        public ProjectBuilder name(String name) {
            this.name = name;
            return this;
        }
        
        public ProjectBuilder description(String description) {
            this.description = description;
            return this;
        }
        
        public ProjectBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }
        
        public Project build() {
            return new Project(id, name, description, imageUrl);
        }
    }
}