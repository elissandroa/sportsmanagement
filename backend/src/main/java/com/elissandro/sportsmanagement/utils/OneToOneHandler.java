package com.elissandro.sportsmanagement.utils;

import java.util.function.BiConsumer;
import java.util.function.Supplier;

public class OneToOneHandler<E> {

    public E handle(
            E existing,
            E incoming,
            Supplier<E> creator,
            BiConsumer<E, E> copier
    ) {

        if (incoming == null) {
            return null;
        }

        if (existing == null) {
            existing = creator.get();
        }

        copier.accept(existing, incoming);
        return existing;
    }
}
