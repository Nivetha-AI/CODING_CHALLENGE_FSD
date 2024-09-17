package com.hexaware.app.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.app.Entity.Books;



public interface LibraryRepo extends JpaRepository <Books,Integer>{

}
