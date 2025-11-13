package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Permission;

public interface PermissionService extends JpaRepository<Permission, Long> {

}
