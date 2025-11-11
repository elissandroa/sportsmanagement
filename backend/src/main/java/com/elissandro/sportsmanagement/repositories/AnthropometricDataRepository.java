package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.AnthropometricData;

public interface AnthropometricDataRepository extends JpaRepository<AnthropometricData, Long> {

}
