package com.elissandro.sportsmanagement.utils;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class ListUpdater<E extends Identifiable<Long>> {

    public List<E> update(
            List<E> existing,
            List<E> incoming,
            Long parentId,
            BiConsumer<E, E> copyProperties,
            Consumer<E> setParent
    ) {

        Map<Long, E> existingMap = existing.stream()
                .filter(e -> e.getId() != null)
                .collect(Collectors.toMap(Identifiable::getId, e -> e));

        List<E> result = new ArrayList<>();

        for (E incomingItem : incoming) {

            E item;

            if (incomingItem.getId() != null && existingMap.containsKey(incomingItem.getId())) {
                item = existingMap.get(incomingItem.getId());
            } else {
                item = incomingItem;
                setParent.accept(item);
            }

            copyProperties.accept(item, incomingItem);
            result.add(item);
        }

        return result;
    }
}
