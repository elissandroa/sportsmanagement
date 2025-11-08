package com.elissandro.sportsmanagement.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.CategoryDTO;
import com.elissandro.sportsmanagement.dtos.CompetitionDTO;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Competition;
import com.elissandro.sportsmanagement.entities.Match;
import com.elissandro.sportsmanagement.repositories.CompetitionRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class CompetitionService {

	@Autowired
	private CompetitionRepository repository;

	@Transactional(readOnly = true)
	public CompetitionDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Competition not found"));
		return new CompetitionDTO(entity, entity.getMatches(), entity.getCategories());
	}

	@Transactional(readOnly = true)
	public Page<CompetitionDTO> findAll(Pageable pageable) {
		var list = repository.findAll(pageable);
		return list.map(entity -> new CompetitionDTO(entity,  entity.getMatches(), entity.getCategories()));
	}

	@Transactional
	public CompetitionDTO insert(CompetitionDTO dto) {
		Competition entity = new Competition();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new CompetitionDTO(entity, entity.getMatches(), entity.getCategories());
	}

	@Transactional
	public CompetitionDTO update(Long id, CompetitionDTO dto) {
		Competition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Competition not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new CompetitionDTO(entity, entity.getMatches(), entity.getCategories());
	}

	private void copyDtoToEntity(CompetitionDTO dto, Competition entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setName(dto.getName());
		entity.setStartDate(dto.getStartDate());
		entity.setEndDate(dto.getEndDate());
		entity.setType(dto.getType());
		entity.setRegulations(dto.getRegulations());
		entity.setActive(dto.getActive());
		if(entity.getCreatedAt() == null) {
			entity.setCreatedAt(LocalDateTime.now());
		} else {
			entity.setUpdatedAt(LocalDateTime.now());
		}
		
		entity.getCategories().clear();
		if (dto.getCategories() != null) {
			for (CategoryDTO catDTO : dto.getCategories()) {
				Category category = new Category();
				category.setId(catDTO.getId());
				entity.getCategories().add(category);
			}
		}
		
		entity.getMatches().clear();
		if (dto.getMatches() != null) {
			for (var matchDTO : dto.getMatches()) {
				var match = new Match();
				match.setId(matchDTO.getId());
				entity.getMatches().add(match);
			}
		}
		
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Competition not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Competition with id " + id);
		}
	}

}
