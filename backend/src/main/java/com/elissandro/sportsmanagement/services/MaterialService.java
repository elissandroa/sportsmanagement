package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.MaterialDTO;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Material;
import com.elissandro.sportsmanagement.repositories.MaterialRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class MaterialService {

	@Autowired
	private MaterialRepository repository;

	@Transactional(readOnly = true)
	public MaterialDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Material not found"));
		return new MaterialDTO(entity, entity.getCategories());
	}

	@Transactional(readOnly = true)
	public Page<MaterialDTO> findAll(Pageable pageable) {
		var list = repository.findAll(pageable);
		return list.map(entity -> new MaterialDTO(entity, entity.getCategories()));
	}

	@Transactional
	public MaterialDTO insert(MaterialDTO dto) {
		Material entity = new Material();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MaterialDTO(entity, entity.getCategories());
	}

	@Transactional
	public MaterialDTO update(Long id, MaterialDTO dto) {
		Material entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Material not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MaterialDTO(entity, entity.getCategories());
	}

	private void copyDtoToEntity(MaterialDTO dto, Material entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setName(dto.getName());
		entity.setType(dto.getType());
		entity.setQuantity(dto.getQuantity());
		entity.setSize(dto.getSize());
		entity.setCondition(dto.getCondition());
		entity.setPurchaseDate(dto.getPurchaseDate());
		entity.setCost(dto.getCost());
		entity.setSupplier(dto.getSupplier());
		entity.setIsAvailable(dto.getIsAvailable());
		
		
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
			throw new ResourceNotFoundException("Material not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Material with id " + id);
		}
	}

}
