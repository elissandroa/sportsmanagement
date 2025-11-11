package com.elissandro.sportsmanagement.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AthleteDTO;
import com.elissandro.sportsmanagement.dtos.CategoryDTO;
import com.elissandro.sportsmanagement.dtos.ContractDTO;
import com.elissandro.sportsmanagement.entities.AddressAthlete;
import com.elissandro.sportsmanagement.entities.AnthropometricData;
import com.elissandro.sportsmanagement.entities.Athlete;
import com.elissandro.sportsmanagement.entities.AthleteStatistics;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Contract;
import com.elissandro.sportsmanagement.entities.PersonalDocuments;
import com.elissandro.sportsmanagement.entities.PlayerPosition;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionEffort;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionRecovery;
import com.elissandro.sportsmanagement.repositories.AddressAthleteRepository;
import com.elissandro.sportsmanagement.repositories.AnthropometricDataRepository;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.repositories.AthleteStatisticsRepository;
import com.elissandro.sportsmanagement.repositories.ContractRepository;
import com.elissandro.sportsmanagement.repositories.PersonalDocumentsRepository;
import com.elissandro.sportsmanagement.repositories.SubjectivePerceptionEffortRepository;
import com.elissandro.sportsmanagement.repositories.SubjectivePerceptionRecoveryRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class AthleteService {

	@Autowired
	private AthleteRepository repository;

	@Autowired
	private AddressAthleteRepository addressRepository;

	@Autowired
	private PersonalDocumentsRepository personalDocumentsRepository;

	@Autowired
	private ContractRepository contractRepository;
	
	@Autowired
	private AthleteStatisticsRepository athleteStatisticsRepository;
	
	@Autowired
	private AnthropometricDataRepository anthropometricDataRepository;
	
	@Autowired
	private SubjectivePerceptionEffortRepository subjectivePerceptionEffortRepository;
	
	@Autowired
	private SubjectivePerceptionRecoveryRepository subjectivePerceptionRecoveryRepository;

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
		AddressAthlete address = new AddressAthlete();
		if (dto.getAddress() != null && dto.getAddress().getId() != null) {
		    address.setId(dto.getAddress().getId());
		}
		address.setStreet(dto.getAddress().getStreet());
		address.setCity(dto.getAddress().getCity());
		address.setState(dto.getAddress().getState());
		address.setZipCode(dto.getAddress().getZipCode());
		address.setComplement(dto.getAddress().getComplement());
		address.setCountry(dto.getAddress().getCountry());
		address.setLocalNumber(dto.getAddress().getLocalNumber());
		address.setNeighborhood(dto.getAddress().getNeighborhood());
		address = addressRepository.save(address);
		
		PersonalDocuments personalDocuments = new PersonalDocuments();
		if (dto.getPersonalDocuments() != null && dto.getPersonalDocuments().getId() != null) {
		    personalDocuments.setId(dto.getPersonalDocuments().getId());
		}
		personalDocuments.setCpf(dto.getPersonalDocuments().getCpf());
		personalDocuments.setRg(dto.getPersonalDocuments().getRg());
		personalDocuments.setPassport(dto.getPersonalDocuments().getPassport());
		personalDocuments.setBidCBF(dto.getPersonalDocuments().getBidCBF());
		personalDocuments = personalDocumentsRepository.save(personalDocuments);
		
		AnthropometricData anthropometricData = new AnthropometricData();
		if (dto.getAnthropometricData() != null && dto.getAnthropometricData().getId() != null) {
		    anthropometricData.setId(dto.getAnthropometricData().getId());
		}
		
		
		
		Double bmiValue = calculateBmi(dto.getAnthropometricData().getWeight(), dto.getAnthropometricData().getHeight());
		
		
		anthropometricData.setBmi(bmiValue);
		anthropometricData.setBodyFat(dto.getAnthropometricData().getBodyFat());
		anthropometricData.setHeight(dto.getAnthropometricData().getHeight());
		anthropometricData.setLeanMass(dto.getAnthropometricData().getLeanMass());
		anthropometricData.setMeasurementDate(dto.getAnthropometricData().getMeasurementDate());
		anthropometricData.setWeight(dto.getAnthropometricData().getWeight());
		anthropometricData = anthropometricDataRepository.save(anthropometricData);
		
		AthleteStatistics athleteStatistics = new AthleteStatistics();
		if (dto.getAthleteStatistics() != null && dto.getAthleteStatistics().getId() != null) {
		    athleteStatistics.setId(dto.getAthleteStatistics().getId());
		}		
		athleteStatistics.setAveragePse(dto.getAthleteStatistics().getAveragePse());
		athleteStatistics.setAveragePsr(dto.getAthleteStatistics().getAveragePsr());
		athleteStatistics.setAssists(dto.getAthleteStatistics().getAssists());
		athleteStatistics.setGoalsScored(dto.getAthleteStatistics().getGoalsScored());
		athleteStatistics.setInjuries(dto.getAthleteStatistics().getInjuries());
		athleteStatistics.setMinutesPlayed(dto.getAthleteStatistics().getMinutesPlayed());
		athleteStatistics.setMatchesPlayed(dto.getAthleteStatistics().getMatchesPlayed());
		athleteStatistics.setRedCards(dto.getAthleteStatistics().getRedCards());
		athleteStatistics.setYellowCards(dto.getAthleteStatistics().getYellowCards());
		athleteStatistics.setLastUpdated(LocalDateTime.now());
		athleteStatistics = athleteStatisticsRepository.save(athleteStatistics);
		
		for(var speDTO : dto.getSubjectivePerceptionEfforts()) {
			SubjectivePerceptionEffort spe = new SubjectivePerceptionEffort();
			
			if(speDTO.getId() != null) {
				spe.setId(speDTO.getId());
			}
			
			spe.setDate(dto.getBirthDate());
			spe.setDuration(dto.getSubjectivePerceptionEfforts().get(0).getDuration());
			spe.setPseValue(dto.getSubjectivePerceptionEfforts().get(0).getPseValue());
			spe.setObservations(dto.getSubjectivePerceptionEfforts().get(0).getObservations());
			spe.setRecordedBy(dto.getSubjectivePerceptionEfforts().get(0).getRecordedBy());
			spe.setRecordedAt(dto.getSubjectivePerceptionEfforts().get(0).getRecordedAt());
			spe.setValid(dto.getSubjectivePerceptionEfforts().get(0).isValid());
			spe = subjectivePerceptionEffortRepository.save(spe);
			entity.getSubjectivePerceptionEfforts().add(spe);
		}
		
		SubjectivePerceptionRecovery spr = new SubjectivePerceptionRecovery();
		
		for(var sprDTO : dto.getSubjectivePerceptionRecoveries()) {
			if(sprDTO.getId() != null) {
				spr.setId(sprDTO.getId());
			}
			
			spr.setAppetiteLevel(dto.getSubjectivePerceptionRecoveries().get(0).getAppetiteLevel());
			spr.setCreatedAt(dto.getSubjectivePerceptionRecoveries().get(0).getCreatedAt());
			spr.setDate(dto.getBirthDate());
			spr.setHydrationLevel(dto.getSubjectivePerceptionRecoveries().get(0).getHydrationLevel());
			spr.setFatiqueLevel(dto.getSubjectivePerceptionRecoveries().get(0).getFatiqueLevel());
			spr.setMotivationLevel(dto.getSubjectivePerceptionRecoveries().get(0).getMotivationLevel());
			spr.setRecordedBy(dto.getSubjectivePerceptionRecoveries().get(0).getRecordedBy());
			spr.setSleepQuality(dto.getSubjectivePerceptionRecoveries().get(0).getSleepQuality());
			spr.setPsrValue(dto.getSubjectivePerceptionRecoveries().get(0).getPsrValue());
			spr.setObservations(dto.getSubjectivePerceptionRecoveries().get(0).getObservations());
			spr.setIsValid(dto.getSubjectivePerceptionRecoveries().get(0).getIsValid());
			spr.setMuscleAching(dto.getSubjectivePerceptionRecoveries().get(0).getMuscleAching());
			spr.setSleepHours(dto.getSubjectivePerceptionRecoveries().get(0).getSleepHours());
			spr.setStressLevel(dto.getSubjectivePerceptionRecoveries().get(0).getStressLevel());
			spr.setNotes(dto.getSubjectivePerceptionRecoveries().get(0).getNotes());
			spr.setType(dto.getSubjectivePerceptionRecoveries().get(0).getType());
			spr = subjectivePerceptionRecoveryRepository.save(spr);
			
			entity.getSubjectivePerceptionRecoveries().add(spr);
		}
		
		

		entity.setName(dto.getName());
		entity.setPhoto(dto.getPhoto());
		entity.setPosition(dto.getPosition());
		entity.setBirthDate(dto.getBirthDate());
		entity.setJerseyNumber(dto.getJerseyNumber());
		entity.setHeight(dto.getHeight());
		entity.setWeight(dto.getWeight());
		entity.setPreferredFoot(dto.getPreferredFoot());
		entity.setActive(dto.isActive());
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setAddress(address);
		entity.setPersonalDocuments(personalDocuments);
		entity.setAthleteStatistics(athleteStatistics);
		entity.setAnthropometricData(anthropometricData);

		entity.getCategories().clear();
		for (CategoryDTO catDto : dto.getCategories()) {
			Category category = new Category();
			category.setId(catDto.getId());
			entity.getCategories().add(category);
		}
		
		entity.getContracts().clear();
		for(ContractDTO contDTO : dto.getContracts()) {
			Contract contract = new Contract();
			if(contDTO.getId() != null) {
				contract.setId(contDTO.getId());
			}
			contract.setContractType(contDTO.getContractType());
			contract.setStartDate(contDTO.getStartDate());
			contract.setEndDate(contDTO.getEndDate());
			contract.setDuration(contDTO.getDuration());
			contract.setHasContract(contDTO.getHasContract());
			contract.setSalary(contDTO.getSalary());
			contract.setContractPdf(contDTO.getContractPdf());
			entity.getContracts().add(contract);
			contractRepository.save(contract);
		}
		
		entity.getPlayerPositions().clear();
		for (var posDto : dto.getPlayerPositions()) {
			var position = new PlayerPosition();
			position.setId(posDto.getId());
			entity.getPlayerPositions().add(position);
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
	
	private Double calculateBmi(Double weight, Double height) {
		if (weight != null && height != null && height > 0) {
			Double bmi = weight / (height * height);
			return Math.round(bmi * 10.0) / 10.0;
		}
		return null;
		
	}
	
	

}
