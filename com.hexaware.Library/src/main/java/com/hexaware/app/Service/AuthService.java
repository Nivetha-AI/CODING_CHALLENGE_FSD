package com.hexaware.app.Service;

import com.hexaware.app.Entity.SignupRequest;
import com.hexaware.app.Entity.User;

public interface AuthService {
	User createUser(SignupRequest signupRequest);

	boolean hasCustomerWithEmail(String email);

	
}
