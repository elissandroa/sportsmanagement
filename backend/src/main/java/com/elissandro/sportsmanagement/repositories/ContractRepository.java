package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long> {

}
