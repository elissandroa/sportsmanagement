package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
