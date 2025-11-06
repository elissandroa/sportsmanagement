package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;

import com.elissandro.sportsmanagement.entities.AddressAthlete;

public class AddressAthleteDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String street;
	private String localNumber;
	private String complement;
	private String zipCode;
	private String neighborhood;
	private String city;
	private String state;
	private String country;
	
	public AddressAthleteDTO() {
	}
	
	public AddressAthleteDTO(Long id, String street, String localNumber, String complement, String zipCode, String neighborhood,
			String city, String state, String country) {
		this.id = id;
		this.street = street;
		this.localNumber = localNumber;
		this.complement = complement;
		this.zipCode = zipCode;
		this.neighborhood = neighborhood;
		this.city = city;
		this.state = state;
		this.country = country;
	}
	
	public AddressAthleteDTO(AddressAthlete entity) {
		this.id = entity.getId();
		this.street = entity.getStreet();
		this.localNumber = entity.getLocalNumber();
		this.complement = entity.getComplement();
		this.zipCode = entity.getZipCode();
		this.neighborhood = entity.getNeighborhood();
		this.city = entity.getCity();
		this.state = entity.getState();
		this.country = entity.getCountry();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getLocalNumber() {
		return localNumber;
	}

	public void setLocalNumber(String localNumber) {
		this.localNumber = localNumber;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
}
