package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AthleteDTO;
import com.elissandro.sportsmanagement.dtos.CategoryDTO;
import com.elissandro.sportsmanagement.entities.AddressAthlete;
import com.elissandro.sportsmanagement.entities.Athlete;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.PersonalDocuments;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class AthleteService {
	
	@Autowired	
	private AthleteRepository repository;
	
	@Transactional(readOnly = true)
	public AthleteDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Athlete not found"));
		return new AthleteDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<AthleteDTO> findAll(Pageable pageable) {
		Page<Athlete> page = repository.findAll(pageable);
		return page.map(entity -> new AthleteDTO(entity));
	}
	
	@Transactional
	public AthleteDTO insert(AthleteDTO dto) {
		Athlete entity = new Athlete();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AthleteDTO(entity);
	}
	
	@Transactional
	public AthleteDTO update(Long id, AthleteDTO dto) {
		Athlete entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Athlete not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AthleteDTO(entity);
	}
	
	private void copyDtoToEntity(AthleteDTO dto, Athlete entity) {
		AddressAthlete address = entity.getAddress();
		if (address == null) {
			address = new AddressAthlete();
			entity.setAddress(address);
		}
		PersonalDocuments personalDocuments = entity.getPersonalDocuments();
		if (personalDocuments == null) {
			personalDocuments = new PersonalDocuments();
			entity.setPersonalDocuments(personalDocuments);
		}
		entity.setName(dto.getName());
		entity.setPhoto(dto.getPhoto());
		entity.setBirthDate(dto.getBirthDate());
		entity.setJerseyNumber(dto.getJerseyNumber());
		entity.setHeight(dto.getHeight());
		entity.setWeight(dto.getWeight());
		entity.setPreferredFoot(dto.getPreferredFoot());
		entity.setActive(dto.isActive());
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setAddress(address);
		entity.setPersonalDocuments(personalDocuments);
		entity.getCategories().clear();
		for (CategoryDTO catDto : dto.getCategories()) {
			Category category = new Category();
			category.setId(catDto.getId());
			entity.getCategories().add(category);
		}
		entity.getPlayerPositions().clear();
		for (var posDto : dto.getPlayerPositions()) {
			var position = new com.elissandro.sportsmanagement.entities.PlayerPosition();
			position.setId(posDto.getId());
			entity.getPlayerPositions().add(position);
		}
		entity.getContracts().clear();
		for (var contDto : dto.getContracts()) {
			var contract = new com.elissandro.sportsmanagement.entities.Contract();
			contract.setId(contDto.getId());
			entity.getContracts().add(contract);
		}
		
	}
	
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Athlete not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Athlete with id " + id);
		}
	}

}
