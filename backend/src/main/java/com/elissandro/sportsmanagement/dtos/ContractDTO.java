package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;

import com.elissandro.sportsmanagement.entities.Contract;
import com.elissandro.sportsmanagement.enums.ContractType;

public class ContractDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Boolean hasContract;
	private Double salary;
	private String duration;
	private LocalDate startDate;
	private LocalDate endDate;
	private String contractPdf;
	private ContractType contractType;
	
	public ContractDTO() {
	}	
	
	public ContractDTO(Long id, Boolean hasContract, Double salary, String duration, LocalDate startDate,
			LocalDate endDate, String contractPdf, ContractType contractType) {
		this.id = id;
		this.hasContract = hasContract;
		this.salary = salary;
		this.duration = duration;
		this.startDate = startDate;
		this.endDate = endDate;
		this.contractPdf = contractPdf;
		this.contractType = contractType;
	}
	
	public ContractDTO(Contract entity) {
		this.id = entity.getId();
		this.hasContract = entity.getHasContract();
		this.salary = entity.getSalary();
		this.duration = entity.getDuration();
		this.startDate = entity.getStartDate();
		this.endDate = entity.getEndDate();
		this.contractPdf = entity.getContractPdf();
		this.contractType = entity.getContractType();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getHasContract() {
		return hasContract;
	}

	public void setHasContract(Boolean hasContract) {
		this.hasContract = hasContract;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getContractPdf() {
		return contractPdf;
	}

	public void setContractPdf(String contractPdf) {
		this.contractPdf = contractPdf;
	}

	public ContractType getContractType() {
		return contractType;
	}

	public void setContractType(ContractType contractType) {
		this.contractType = contractType;
	}

}
