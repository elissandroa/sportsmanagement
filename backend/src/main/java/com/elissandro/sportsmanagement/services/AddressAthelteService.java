package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AddressAthleteDTO;
import com.elissandro.sportsmanagement.entities.AddressAthlete;
import com.elissandro.sportsmanagement.repositories.AddressAthleteRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class AddressAthelteService {
	
	@Autowired	
	private AddressAthleteRepository repository;
	
	@Transactional(readOnly = true)
	public AddressAthleteDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Address not found"));
		return new AddressAthleteDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<AddressAthleteDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new AddressAthleteDTO(entity)).toList();
	}
	
	@Transactional
	public AddressAthleteDTO insert(AddressAthleteDTO dto) {
		AddressAthlete entity = new AddressAthlete();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AddressAthleteDTO(entity);
	}
	
	@Transactional
	public AddressAthleteDTO update(Long id, AddressAthleteDTO dto) {
		AddressAthlete entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Address not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AddressAthleteDTO(entity);
	}
	
	private void copyDtoToEntity(AddressAthleteDTO dto, AddressAthlete entity) {
		entity.setStreet(dto.getStreet());
		entity.setLocalNumber(dto.getLocalNumber());
		entity.setComplement(dto.getComplement());
		entity.setZipCode(dto.getZipCode());
		entity.setNeighborhood(dto.getNeighborhood());
		entity.setCity(dto.getCity());
		entity.setState(dto.getState());
		entity.setCountry(dto.getCountry());
	}
	
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Address not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Address with id " + id);
		}
	}

}
