package com.elissandro.sportsmanagement.enums;

public enum TrainingType {

    TECHNICAL("Focus on individual and collective fundamentals"),
    TACTICAL("Team organization and tactical movements"),
    PHYSICAL("Strength, endurance and power training"),
    REGENERATIVE("Recovery or light post-game training"),
    FINISHING("Shooting and goal-scoring exercises"),
    POSITIONAL("Positional play and spatial awareness"),
    GAME_SIMULATION("Simulated match or scrimmage"),
    ANALYTICAL("Specific and isolated drills"),
    GLOBAL("Integrated and game-like training"),
    VIDEO_ANALYSIS("Tactical video review and team briefing");

    private final String description;

    TrainingType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}