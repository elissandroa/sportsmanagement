package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.AthleteStatistics;

public interface AthleteStatisticsRepository extends JpaRepository<AthleteStatistics, Long> {

}
