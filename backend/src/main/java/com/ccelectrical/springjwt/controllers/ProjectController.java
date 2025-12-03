package com.ccelectrical.springjwt.controllers;

import com.ccelectrical.springjwt.exceptions.ProjectNFException;
import com.ccelectrical.springjwt.models.Project;
import com.ccelectrical.springjwt.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/projects")
    Project newProject(@RequestBody Project newProject) {
        return projectRepository.save(newProject);
    }

    @GetMapping("/projects")
    List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/projects/{id}")
    Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNFException(id));
    }

    @PutMapping("/projects/{id}")
    Project updateProject(@RequestBody Project newProject, @PathVariable Long id) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setName(newProject.getName());
                    project.setDescription(newProject.getDescription());
                    project.setImageUrl(newProject.getImageUrl());
                    return projectRepository.save(project);
                }).orElseThrow(() -> new ProjectNFException(id));
    }

    /*
    @DeleteMapping("/projects/{id}")
    String deleteProject(@PathVariable Long id){
        if(!projectRepository.existsById(id)){
            throw new ProjectNFException(id);
        }
        projectRepository.deleteById(id);
        return  "Project with id "+id+" has been deleted success.";
    }

     */


    @DeleteMapping(value = "projects/{id}")
    public void deleteProjectById(@PathVariable(value = "id") Long projectId) throws ChangeSetPersister.NotFoundException {
        if (!projectRepository.findById(projectId).isPresent()) {
            throw new ChangeSetPersister.NotFoundException();
        }
        projectRepository.deleteById(projectId);
    }

}
