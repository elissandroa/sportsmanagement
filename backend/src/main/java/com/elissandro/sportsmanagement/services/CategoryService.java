package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.CategoryDTO;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.repositories.CategoryRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {
	
	@Autowired	
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
		return new CategoryDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new CategoryDTO(entity)).toList();
	}
	
	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		Category entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Category not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Category with id " + id);
		}
	}

}
