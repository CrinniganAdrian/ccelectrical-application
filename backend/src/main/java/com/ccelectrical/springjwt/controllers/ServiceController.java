package com.ccelectrical.springjwt.controllers;

import com.ccelectrical.springjwt.exceptions.ServiceNFException;
import com.ccelectrical.springjwt.models.Service;
import com.ccelectrical.springjwt.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping("/ccservices")
    Service newService(@RequestBody Service newService) {
        return serviceRepository.save(newService);
    }

    @GetMapping("/ccservices")
    List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @GetMapping("/ccservices/{id}")
    Service getServiceById(@PathVariable Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ServiceNFException(id));
    }

    @PutMapping("/ccservices/{id}")
    Service updateService(@RequestBody Service newService, @PathVariable Long id) {
        return serviceRepository.findById(id)
                .map(service -> {
                    service.setName(newService.getName());
                    service.setDescription(newService.getDescription());
                    service.setImageUrl(newService.getImageUrl());
                    return serviceRepository.save(service);
                }).orElseThrow(() -> new ServiceNFException(id));
    }

    /*
    @DeleteMapping("/ccservices/{id}")
    String deleteService(@PathVariable Long id){
        if(!serviceRepository.existsById(id)){
            throw new ServiceNFException(id);
        }
        serviceRepository.deleteById(id);
        return  "Service with id "+id+" has been deleted success.";
    }

     */


    @DeleteMapping(value = "ccservices/{id}")
    public void deleteServiceById(@PathVariable(value = "id") Long serviceId) throws ChangeSetPersister.NotFoundException {
        if (!serviceRepository.findById(serviceId).isPresent()) {
            throw new ChangeSetPersister.NotFoundException();
        }
        serviceRepository.deleteById(serviceId);
    }

}
