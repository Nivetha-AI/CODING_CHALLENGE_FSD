package com.hexaware.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.hexaware.app.Entity.Books;
import com.hexaware.app.Exception.IDnotfoundException;
import com.hexaware.app.Service.LibraryService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/user") 
public class LibraryController {
	@Autowired
	LibraryService linbSer;
//Retrieve all books.
	 @GetMapping("/getallbooks")
	    public ResponseEntity<List<Books> >getBook(){
	    	List<Books> users= linbSer.getBook();
			if(users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);	
			}
			
			return new ResponseEntity<>(users,HttpStatus.OK);
	    }
	// Add a new book.
	 @PostMapping("/addbooks")
	    public ResponseEntity<Books> savebook(@Valid @RequestBody Books b) {
		 Books b2=linbSer.addbook(b);
			if(b2==null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);	
				}
			else {
				return new ResponseEntity<>(b2,HttpStatus.CREATED);
			} 
	    }
	 // Retrieve a single book by its ISBN.
	 @GetMapping("/getbooksbyisbn/{isbn}")
	    public ResponseEntity<Books> getBookbyId(@PathVariable int isbn) {
		 Books b2=linbSer.getBookbyid(isbn);
	    	try {
			return new ResponseEntity<>( b2,HttpStatus.OK);
			}
			catch(RuntimeException e) {
				return new ResponseEntity<>( HttpStatus.NOT_FOUND);
			}
	    }
	 //Update an existing book.
	 @PutMapping("/updatebook/{isbn}")
		public ResponseEntity<String> Updatebook(@PathVariable int isbn, @RequestParam String title,@RequestParam String author,		
				@RequestParam String pubYear) {

			String k = linbSer.Updatebook(isbn,title,author,pubYear);
			if (k == null) {
				return new ResponseEntity<>(k, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				return new ResponseEntity<>(k, HttpStatus.CREATED);
			}
		}
	 
	 
	 // Delete a book by its ISBN
	 @DeleteMapping("/removebook/{isbn}")
		public Books removebook(@PathVariable int isbn) throws IDnotfoundException {
		 Books s2=linbSer.removebook(isbn);
			return s2;
		}
}
