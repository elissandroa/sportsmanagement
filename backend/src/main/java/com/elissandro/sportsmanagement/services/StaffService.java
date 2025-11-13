package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.StaffDTO;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Staff;
import com.elissandro.sportsmanagement.repositories.StaffRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class StaffService {

	@Autowired
	private StaffRepository repository;

	@Transactional(readOnly = true)
	public StaffDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Staff not found"));
		return new StaffDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<StaffDTO> findAll(Pageable pageable) {
		var list = repository.findAll(pageable);
		return list.map(entity -> new StaffDTO(entity));
	}

	@Transactional
	public StaffDTO insert(StaffDTO dto) {
		Staff entity = new Staff();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new StaffDTO(entity);
	}

	@Transactional
	public StaffDTO update(Long id, StaffDTO dto) {
		Staff entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Staff not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new StaffDTO(entity);
	}

	private void copyDtoToEntity(StaffDTO dto, Staff entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setName(dto.getName());
		entity.setRole(dto.getRole());
		entity.setEmail(dto.getEmail());
		entity.setPhone(dto.getPhone());
		entity.setHireDate(dto.getHireDate());
		entity.setSalary(dto.getSalary());
		entity.setActive(dto.getActive());
		
		entity.getPermissions().clear();
		dto.getPermissions().forEach(permDto -> {
			var permission = new com.elissandro.sportsmanagement.entities.Permission();
			permission.setId(permDto.getId());
			entity.getPermissions().add(permission);
		});
		
		entity.getCategories().clear();
		dto.getCategories().forEach(catDto -> {
			var category = new Category();
			category.setId(catDto.getId());
			entity.getCategories().add(category);
		});
		

	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Staff not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Staff with id " + id);
		}
	}

}
