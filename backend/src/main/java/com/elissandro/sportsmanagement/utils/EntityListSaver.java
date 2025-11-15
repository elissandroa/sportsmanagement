package com.elissandro.sportsmanagement.utils;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.stream.Collectors;

public class EntityListSaver {

    /**
     * 🔹 Salva ou atualiza uma lista (1:N):
     *    - Atualiza entidades existentes
     *    - Cria novas entidades
     *    - Remove itens que não estão mais na lista do DTO
     * 
     * @param dtos Lista recebida no DTO
     * @param current Lista atual da entidade (gerenciada pelo JPA)
     * @param repository Repositório JPA da entidade filha
     * @param getId Função que retorna o ID do DTO
     * @param creator Função que cria uma nova entidade
     * @param updater Função para atualizar dados da entidade baseada no DTO
     */
    public static <D, E> List<E> saveList(
            List<D> dtos,
            List<E> current,
            JpaRepository<E, Long> repository,
            Function<D, Long> getId,
            Function<D, E> creator,
            BiConsumer<D, E> updater
    ) {

        // Mapa de entidades atuais pela PK
        Map<Long, E> existingMap = current.stream()
                .filter(e -> getIdFromEntity(e) != null)
                .collect(Collectors.toMap(
                        EntityListSaver::getIdFromEntity,
                        e -> e
                ));

        List<E> result = new ArrayList<>();

        for (D dto : dtos) {
            Long dtoId = getId.apply(dto);
            E entity;

            // Atualizando entidade existente
            if (dtoId != null && existingMap.containsKey(dtoId)) {
                entity = existingMap.get(dtoId);
            }
            // Criando entidade nova
            else {
                entity = creator.apply(dto);
            }

            updater.accept(dto, entity);
            result.add(entity);
        }

        // Limpa a coleção atual
        current.clear();
        current.addAll(result);

        // Deletando no banco quem foi removido
        Set<Long> updatedIds = result.stream()
                .map(EntityListSaver::getIdFromEntity)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        for (Long oldId : existingMap.keySet()) {
            if (!updatedIds.contains(oldId)) {
                repository.deleteById(oldId);
            }
        }

        return current;
    }

    // -------------------------
    // Métodos auxiliares extras
    // -------------------------

    private static Long getIdFromEntity(Object entity) {
        try {
            return (Long) entity.getClass().getMethod("getId").invoke(entity);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Mantive exatamente como estava:
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

    public static <E> E findById(Long id, JpaRepository<E, Long> repository) {
        return repository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Entidade não encontrada para o ID: " + id)
        );
    }

    public static <E> List<E> findAll(JpaRepository<E, Long> repository) {
        return repository.findAll();
    }

    public static <E> Page<E> findAll(JpaRepository<E, Long> repository, Pageable pageable) {
        return repository.findAll(pageable);
    }

    public static <E> void deleteById(Long id, JpaRepository<E, Long> repository) {
        repository.deleteById(id);
    }
}
