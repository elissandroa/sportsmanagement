package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
