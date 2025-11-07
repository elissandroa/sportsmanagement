package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Opponent;

public interface OpponentRepository extends JpaRepository<Opponent, Long> {

}
