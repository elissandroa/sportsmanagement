package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Athlete;

public interface AthleteRepository extends JpaRepository <Athlete, Long> {

}
