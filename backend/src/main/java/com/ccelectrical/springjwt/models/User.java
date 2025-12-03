package com.ccelectrical.springjwt.models;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
/**
 *  This is the user entity class
 */
@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email")
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  @Size(max = 20)
  private String username;
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;
  @NotBlank
  @Size(max = 120)
  private String password;
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "user_items",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "item_id"))
  private Set<Item> items = new HashSet<>();
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "user_services",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "service_id"))
  private Set<Service> services = new HashSet<>();
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "user_projects",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "project_id"))
  private Set<Project> projects = new HashSet<>();
  public User() {
  }
  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  public User(String name) {
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public Set<Role> getRoles() {
    return roles;
  }
  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
  public Set<Item> getItems() {
    return items;
  }
  public void setItems(Set<Item> items) {
    this.items = items;
  }
  public Set<Service> getServices() {
    return services;
  }
  public void setServices(Set<Service> services) {
    this.services = services;
  }
  public Set<Project> getProjects() {
    return projects;
  }
  public void setProjects(Set<Project> projects) {
    this.projects = projects;
  }
}