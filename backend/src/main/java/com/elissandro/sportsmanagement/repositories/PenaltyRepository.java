package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Penalty;

public interface PenaltyRepository extends JpaRepository<Penalty, Long> {

}
