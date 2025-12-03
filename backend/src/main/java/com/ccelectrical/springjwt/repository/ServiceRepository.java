package com.ccelectrical.springjwt.repository;

import com.ccelectrical.springjwt.models.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service,Long> {

}
