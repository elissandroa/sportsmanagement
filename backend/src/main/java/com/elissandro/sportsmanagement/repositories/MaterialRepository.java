package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {

}
