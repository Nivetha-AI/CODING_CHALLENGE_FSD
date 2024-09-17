package com.hexaware.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.app.Dao.LibraryRepo;

import com.hexaware.app.Entity.Books;
import com.hexaware.app.Exception.IDnotfoundException;

import jakarta.validation.Valid;

@Service
public class LibraryService {
	@Autowired
	LibraryRepo libRep;

	public List<Books> getBook() {
		List<Books> l=(List)libRep.findAll();
		return l;
	}

	public Books addbook(@Valid Books b) {
		if (libRep.findById(b.getIsbn()).isPresent()) {
			return null;
		}
		Books s2=libRep.save(b);
		return s2;
	}

	public Books getBookbyid(int isbn) {
		return libRep.findById(isbn).orElseThrow(() -> new RuntimeException("Book not found with ISBN number: " + isbn));

	}

	public String Updatebook(int isbn, String title, String author, String pubYear) {
		Books b=	libRep.findById(isbn).orElse(null);
		b.setTitle(title);
		b.setAuthor(author);
		b.setPubYear(pubYear);
		
		
		libRep.save(b);
		return "updated";
	}

	public Books removebook(int isbn) throws IDnotfoundException {
		Books s=	libRep.findById(isbn).orElseThrow(()->new IDnotfoundException("Book with ISBN number " + isbn + " not found."));
		
		libRep.delete(s);
	
	return s;
	}

}
