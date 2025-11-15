package com.elissandro.sportsmanagement.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AthleteDTO;
import com.elissandro.sportsmanagement.dtos.ContractDTO;
import com.elissandro.sportsmanagement.dtos.MedicalRecordDTO;
import com.elissandro.sportsmanagement.dtos.PenaltyDTO;
import com.elissandro.sportsmanagement.dtos.SubjectivePerceptionEffortDTO;
import com.elissandro.sportsmanagement.dtos.SubjectivePerceptionRecoveryDTO;
import com.elissandro.sportsmanagement.entities.AddressAthlete;
import com.elissandro.sportsmanagement.entities.AnthropometricData;
import com.elissandro.sportsmanagement.entities.Athlete;
import com.elissandro.sportsmanagement.entities.AthleteStatistics;
import com.elissandro.sportsmanagement.entities.Contract;
import com.elissandro.sportsmanagement.entities.MedicalRecord;
import com.elissandro.sportsmanagement.entities.Penalty;
import com.elissandro.sportsmanagement.entities.PersonalDocuments;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionEffort;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionRecovery;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.repositories.CategoryRepository;
import com.elissandro.sportsmanagement.repositories.PlayerPositionRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;
import com.elissandro.sportsmanagement.utils.EntityListSaver;
import com.elissandro.sportsmanagement.utils.ListUpdater;

@Service
public class AthleteService {

	@Autowired
	private AthleteRepository repository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private PlayerPositionRepository playerPositionRepository;

	@Transactional(readOnly = true)
	public AthleteDTO findById(Long id) {
		var entity = EntityListSaver.findById(id, repository);
		return new AthleteDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<AthleteDTO> findAll(Pageable pageable) {
		return EntityListSaver.findAll(repository, pageable).map(entity -> new AthleteDTO(entity, true));
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

	@Transactional
	public void copyDtoToEntity(AthleteDTO dto, Athlete entity) {

		// ======================
		// 🔹 Dados básicos
		// ======================
		entity.setName(dto.getName());
		entity.setPhoto(dto.getPhoto());
		entity.setPosition(dto.getPosition());
		entity.setBirthDate(dto.getBirthDate());
		entity.setJerseyNumber(dto.getJerseyNumber());
		entity.setHeight(dto.getHeight());
		entity.setWeight(dto.getWeight());
		entity.setPreferredFoot(dto.getPreferredFoot());
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setActive(dto.isActive());

		// ======================
		// 🔹 Endereço
		// ======================
		if (dto.getAddress() != null) {

			AddressAthlete address = entity.getAddress();
			if (address == null)
				address = new AddressAthlete();

			address.setStreet(dto.getAddress().getStreet());
			address.setLocalNumber(dto.getAddress().getLocalNumber());
			address.setComplement(dto.getAddress().getComplement());
			address.setZipCode(dto.getAddress().getZipCode());
			address.setNeighborhood(dto.getAddress().getNeighborhood());
			address.setCity(dto.getAddress().getCity());
			address.setState(dto.getAddress().getState());
			address.setCountry(dto.getAddress().getCountry());
			address.setAthlete(entity);

			entity.setAddress(address);
		}

		// ======================
		// 🔹 Documentos pessoais
		// ======================
		if (dto.getPersonalDocuments() != null) {

			PersonalDocuments docs = entity.getPersonalDocuments();
			if (docs == null)
				docs = new PersonalDocuments();

			docs.setCpf(dto.getPersonalDocuments().getCpf());
			docs.setRg(dto.getPersonalDocuments().getRg());
			docs.setPassport(dto.getPersonalDocuments().getPassport());
			docs.setBidCBF(dto.getPersonalDocuments().getBidCBF());
			docs.setAthlete(entity);

			entity.setPersonalDocuments(docs);
		}

		// ======================
		// 🔹 Dados antropométricos
		// ======================
		if (dto.getAnthropometricData() != null) {

			AnthropometricData data = entity.getAnthropometricData();
			if (data == null)
				data = new AnthropometricData();

			data.setWeight(dto.getAnthropometricData().getWeight());
			data.setHeight(dto.getAnthropometricData().getHeight());
			data.setBodyFat(dto.getAnthropometricData().getBodyFat());
			data.setLeanMass(dto.getAnthropometricData().getLeanMass());

			double bmi = dto.getAnthropometricData().getWeight() / Math.pow(dto.getAnthropometricData().getHeight(), 2);

			data.setBmi(Math.round(bmi * 10.0) / 10.0);

			data.setMeasurementDate(dto.getAnthropometricData().getMeasurementDate());
			data.setAthlete(entity);

			entity.setAnthropometricData(data);
		}

		// ======================
		// 🔹 Estatísticas
		// ======================
		if (dto.getAthleteStatistics() != null) {

			AthleteStatistics stats = entity.getAthleteStatistics();
			if (stats == null)
				stats = new AthleteStatistics();

			stats.setMatchesPlayed(dto.getAthleteStatistics().getMatchesPlayed());
			stats.setMinutesPlayed(dto.getAthleteStatistics().getMinutesPlayed());
			stats.setGoalsScored(dto.getAthleteStatistics().getGoalsScored());
			stats.setAssists(dto.getAthleteStatistics().getAssists());
			stats.setYellowCards(dto.getAthleteStatistics().getYellowCards());
			stats.setRedCards(dto.getAthleteStatistics().getRedCards());
			stats.setInjuries(dto.getAthleteStatistics().getInjuries());
			stats.setAveragePse(dto.getAthleteStatistics().getAveragePse());
			stats.setAveragePsr(dto.getAthleteStatistics().getAveragePsr());
			stats.setAthlete(entity);

			entity.setAthleteStatistics(stats);
		}

		// ======================
		// 🔹 Contratos
		// ======================
		ListUpdater<Contract> updaterContract = new ListUpdater<>();

		List<Contract> updatedContract = updaterContract.update(entity.getContracts(),
				dto.getContracts().stream().map(ContractDTO::toEntity).toList(), entity.getId(),
				(entityItem, dtoItem) -> {
					entityItem.setStartDate(dtoItem.getStartDate());
					entityItem.setEndDate(dtoItem.getEndDate());
					entityItem.setSalary(dtoItem.getSalary());
					entityItem.setContractPdf(dtoItem.getContractPdf());
					entityItem.setContractType(dtoItem.getContractType());
					entityItem.setHasContract(dtoItem.getHasContract());
					entityItem.setDuration(dtoItem.getDuration());
				}, item -> item.setAthlete(entity));

		entity.getContracts().clear();
		entity.getContracts().addAll(updatedContract);

		// ======================
		// 🔹 Penalidades
		// ======================
		ListUpdater<Penalty> updaterPenalty = new ListUpdater<>();

		List<Penalty> updatedPenalties = updaterPenalty.update(entity.getPenalties(),
				dto.getPenalties().stream().map(PenaltyDTO::toEntity).toList(), entity.getId(),
				(oldEntity, newEntity) -> {
					oldEntity.setDate(newEntity.getDate());
					oldEntity.setServed(newEntity.getServed());
					oldEntity.setSuspentionGames(newEntity.getSuspentionGames());
					oldEntity.setType(newEntity.getType());
					oldEntity.setReason(newEntity.getReason());
				}, item -> item.setAthlete(entity));

		entity.getPenalties().clear();
		entity.getPenalties().addAll(updatedPenalties);

		// ======================
		// 🔹 Registros Médicos
		// ======================
		ListUpdater<MedicalRecord> updaterMr = new ListUpdater<>();

		List<MedicalRecord> updatedMr = updaterMr.update(entity.getMedicalRecords(),
				dto.getMedicalRecords().stream().map(MedicalRecordDTO::toEntity).toList(), entity.getId(),
				(oldE, newE) -> {
					oldE.setType(newE.getType());
					oldE.setBodyPart(newE.getBodyPart());
					oldE.setBodyPartCoordinates(newE.getBodyPartCoordinates());
					oldE.setDescription(newE.getDescription());
					oldE.setInjuryDate(newE.getInjuryDate());
					oldE.setExpectedReturn(newE.getExpectedReturn());
					oldE.setActualReturn(newE.getActualReturn());
					oldE.setStatus(newE.getStatus());
					oldE.setTreatment(newE.getTreatment());
					oldE.setSeverity(newE.getSeverity());
					oldE.setDaysOut(newE.getDaysOut());
					oldE.setRemainingDays(newE.getRemainingDays());
				}, item -> item.setAthlete(entity));

		entity.getMedicalRecords().clear();
		entity.getMedicalRecords().addAll(updatedMr);

		// ======================
		// 🔹 PSE
		// ======================
		ListUpdater<SubjectivePerceptionEffort> updaterPse = new ListUpdater<>();

		List<SubjectivePerceptionEffort> updatedPse = updaterPse.update(
						entity.getSubjectivePerceptionEfforts(), dto.getSubjectivePerceptionEfforts().stream()
								.map(SubjectivePerceptionEffortDTO::toEntity).toList(),
						entity.getId(), (oldPse, newE) -> {
							oldPse.setDate(newE.getDate());
							oldPse.setDuration(newE.getDuration());
							oldPse.setPseValue(newE.getPseValue());
							oldPse.setRecordedBy(newE.getRecordedBy());
							oldPse.setObservations(newE.getObservations());
							oldPse.setRecordedAt(LocalDate.now());
							oldPse.setValid(newE.isValid());
						}, item -> item.setAthlete(entity));

		entity.getSubjectivePerceptionEfforts().clear();
		entity.getSubjectivePerceptionEfforts().addAll(updatedPse);

		// ======================
		// 🔹 PSR
		// ======================
		ListUpdater<SubjectivePerceptionRecovery> updaterPsr = new ListUpdater<>();

		List<SubjectivePerceptionRecovery> updatedPsr = updaterPsr.update(
						entity.getSubjectivePerceptionRecoveries(), dto.getSubjectivePerceptionRecoveries().stream()
								.map(SubjectivePerceptionRecoveryDTO::toEntity).toList(),
						entity.getId(), (oldPsr, newE) -> {
							oldPsr.setAppetiteLevel(newE.getAppetiteLevel());
							oldPsr.setDate(newE.getDate());
							oldPsr.setFatiqueLevel(newE.getFatiqueLevel());
							oldPsr.setHydrationLevel(newE.getHydrationLevel());
							oldPsr.setMotivationLevel(newE.getMotivationLevel());
							oldPsr.setMuscleAching(newE.getMuscleAching());
							oldPsr.setPsrValue(newE.getPsrValue());
							oldPsr.setSleepHours(newE.getSleepHours());
							oldPsr.setSleepQuality(newE.getSleepQuality());
							oldPsr.setStressLevel(newE.getStressLevel());
							oldPsr.setType(newE.getType());
							oldPsr.setRecordedBy(newE.getRecordedBy());
							oldPsr.setNotes(newE.getNotes());
							oldPsr.setObservations(newE.getObservations());
							oldPsr.setIsValid(newE.getIsValid());
						}, item -> item.setAthlete(entity));

		entity.getSubjectivePerceptionRecoveries().clear();
		entity.getSubjectivePerceptionRecoveries().addAll(updatedPsr);

		// ======================
		// 🔹 Categorias e Posições
		// ======================
		entity.getCategories().clear();
		dto.getCategories()
				.forEach(cat -> entity.getCategories().add(categoryRepository.getReferenceById(cat.getId())));

		entity.getPlayerPositions().clear();
		dto.getPlayerPositions().forEach(
				pos -> entity.getPlayerPositions().add(playerPositionRepository.getReferenceById(pos.getId())));

	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Athlete not found");
		}
		try {
			EntityListSaver.deleteById(id, repository);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Athlete with id " + id);
		}
	}

}
