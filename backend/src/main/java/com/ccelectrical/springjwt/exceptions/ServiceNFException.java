package com.ccelectrical.springjwt.exceptions;

public class ServiceNFException extends RuntimeException{
    public ServiceNFException(Long id){
        super("Could not find the cervice with id "+ id);
    }
}
