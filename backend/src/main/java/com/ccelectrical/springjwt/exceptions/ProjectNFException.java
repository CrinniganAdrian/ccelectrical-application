package com.ccelectrical.springjwt.exceptions;

public class ProjectNFException extends RuntimeException{
    public ProjectNFException(Long id){
        super("Could not find the project with id "+ id);
    }
}
