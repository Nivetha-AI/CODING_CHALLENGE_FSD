package com.hexaware.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.app.Dao.LibraryRepo;

import com.hexaware.app.Entity.Books;



@SpringBootTest
class ApplicationTests {
	@Autowired
	LibraryRepo libRep;
	@Test
	void saveTest() {
		Books b= new Books ( "React","sam",3,"2018");
		libRep.save(b);
	}
	@Test
	void removeTest() {
		int isbn=3;
		libRep.deleteById(isbn);
	}
	@Test
	void updateTest() {
		int isbn=2;
		Books b=libRep.findById(isbn).orElse(null);
		b.setTitle("Angular");
		b.setAuthor("shetty");
		b.setPubYear("2023");
		libRep.save(b);
		
	}	
	@Test
	void getAccountTest() throws Exception{
	int isbn=1;
	Books s=	libRep.findById(isbn).orElseThrow(()->new Exception("not found"+isbn));;
	Books s1 = new Books( "Java","Josh",1,"2018");
		assertEquals(s, s1);
		
	}
}
