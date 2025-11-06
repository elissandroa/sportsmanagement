package com.elissandro.sportsmanagement.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.UserDTO;
import com.elissandro.sportsmanagement.entities.User;
import com.elissandro.sportsmanagement.repositories.UserRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<User> list = userRepository.findAll(pageable);
		return list.map(user -> new UserDTO(user));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = userRepository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO insert(UserDTO user) {
		User entity = new User();
		entity.setFirstName(user.getFirstName());
		entity.setLastName(user.getLastName());
		entity.setEmail(user.getEmail());
		entity = userRepository.save(entity);
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO update(Long id, UserDTO userDTO) {
		User entity = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		entity.setFirstName(userDTO.getFirstName());
		entity.setLastName(userDTO.getLastName());
		entity.setEmail(userDTO.getEmail());
		entity = userRepository.save(entity);
		return new UserDTO(entity);
	}
	
	@Transactional
	public void delete(Long id) {
		User entity = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		try {
			userRepository.delete(entity);
		} catch (Exception e) {
			throw new DatabaseException("Integrity violation - Cannot delete user");
		}
	}
}
