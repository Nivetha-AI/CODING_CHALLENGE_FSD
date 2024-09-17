package com.hexaware.app.Entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Books {
	
	@NotNull
	String title;
	String  author;
	@Id
	int isbn ;
	String pubYear;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	
	public int getIsbn() {
		return isbn;
	}
	public void setIsbn(int isbn) {
		this.isbn = isbn;
	}
	public String getPubYear() {
		return pubYear;
	}
	public void setPubYear(String pubYear) {
		this.pubYear = pubYear;
	}
	public Books( @NotNull String title, String author, int isbn, String pubYear) {
		super();
		
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.pubYear = pubYear;
	}
	public Books() {
		super();
	}
	@Override
	public String toString() {
		return "Books [ title=" + title + ", author=" + author + ", iSBN=" + isbn + ", pubYear=" + pubYear
				+ "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(author, isbn, pubYear, title);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Books other = (Books) obj;
		return Objects.equals(author, other.author) && isbn == other.isbn && Objects.equals(pubYear, other.pubYear)
				&& Objects.equals(title, other.title);
	}
	
}
