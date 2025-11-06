package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.ContractDTO;
import com.elissandro.sportsmanagement.entities.Contract;
import com.elissandro.sportsmanagement.repositories.ContractRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class ContractService {
	
	@Autowired	
	private ContractRepository repository;
	
	@Transactional(readOnly = true)
	public ContractDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
		return new ContractDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<ContractDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new ContractDTO(entity)).toList();
	}
	
	@Transactional
	public ContractDTO insert(ContractDTO dto) {
		Contract entity = new Contract();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ContractDTO(entity);
	}
	
	@Transactional
	public ContractDTO update(Long id, ContractDTO dto) {
		Contract entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ContractDTO(entity);
	}
	
	private void copyDtoToEntity(ContractDTO dto, Contract entity) {
		entity.setHasContract(dto.getHasContract());
		entity.setSalary(dto.getSalary());
		entity.setDuration(dto.getDuration());
		entity.setStartDate(dto.getStartDate());
		entity.setEndDate(dto.getEndDate());
		entity.setContractPdf(dto.getContractPdf());
		entity.setContractType(dto.getContractType());
	}
	
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Contract not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Contract with id " + id);
		}
	}

}
