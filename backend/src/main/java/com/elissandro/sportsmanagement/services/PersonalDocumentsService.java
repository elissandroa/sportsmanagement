package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.PersonalDocumentsDTO;
import com.elissandro.sportsmanagement.entities.PersonalDocuments;
import com.elissandro.sportsmanagement.repositories.PersonalDocumentsRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class PersonalDocumentsService {
	
	@Autowired	
	private PersonalDocumentsRepository repository;
	
	@Transactional(readOnly = true)
	public PersonalDocumentsDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Personal Documents not found"));
		return new PersonalDocumentsDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<PersonalDocumentsDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new PersonalDocumentsDTO(entity)).toList();
	}
	
	@Transactional
	public PersonalDocumentsDTO insert(PersonalDocumentsDTO dto) {
		PersonalDocuments entity = new PersonalDocuments();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PersonalDocumentsDTO(entity);
	}
	
	@Transactional
	public PersonalDocumentsDTO update(Long id, PersonalDocumentsDTO dto) {
		PersonalDocuments entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Personal Documents not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PersonalDocumentsDTO(entity);
	}
	
	private void copyDtoToEntity(PersonalDocumentsDTO dto, PersonalDocuments entity) {
		entity.setCpf(dto.getCpf());
		entity.setRg(dto.getRg());
		entity.setRg(dto.getRg());
		entity.setPassport(dto.getPassport());
		entity.setBidCBF(dto.getBidCBF());
	}
	
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Personal Documents not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Personal Documents with id " + id);
		}
	}

}
