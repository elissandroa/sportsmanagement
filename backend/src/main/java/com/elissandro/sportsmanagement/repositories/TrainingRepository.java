package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Training;

public interface TrainingRepository extends JpaRepository<Training, Long> {

}
