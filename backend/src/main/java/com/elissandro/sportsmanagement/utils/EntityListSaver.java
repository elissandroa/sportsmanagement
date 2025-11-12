package com.elissandro.sportsmanagement.utils;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Function;

public class EntityListSaver {

    /**
     * Salva uma lista de DTOs convertendo-os em entidades, reaproveitando registros existentes.
     */
    public static <D, E> List<E> saveAll(
            List<D> dtos,
            JpaRepository<E, Long> repository,
            Function<D, E> entitySupplier,
            BiConsumer<D, E> entityUpdater
    ) {
        List<E> entities = new ArrayList<>();

        if (dtos == null || dtos.isEmpty()) {
            return entities;
        }

        for (D dto : dtos) {
            E entity = entitySupplier.apply(dto);
            entityUpdater.accept(dto, entity);
            entity = repository.save(entity);
            entities.add(entity);
        }

        return entities;
    }

    /**
     * Busca uma entidade pelo ID.
     */
    public static <E> E findById(Long id, JpaRepository<E, Long> repository) {
        return repository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Entidade não encontrada para o ID: " + id)
        );
    }

    /**
     * Busca todas as entidades sem paginação.
     */
    public static <E> List<E> findAll(JpaRepository<E, Long> repository) {
        return repository.findAll();
    }

    /**
     * Busca todas as entidades com paginação.
     */
    public static <E> Page<E> findAll(JpaRepository<E, Long> repository, Pageable pageable) {
        return repository.findAll(pageable);
    }

    /**
     * Deleta uma entidade pelo ID.
     */
    public static <E> void deleteById(Long id, JpaRepository<E, Long> repository) {
        repository.deleteById(id);
    }
}
