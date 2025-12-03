package com.ccelectrical.springjwt.repository;

import com.ccelectrical.springjwt.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {

}
