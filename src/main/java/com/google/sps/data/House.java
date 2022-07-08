package com.google.sps.data;

public class House {
    private final long id;
    private final String name;
    private final String description;
    private final String cost;
    private final long timestamp;
  
    public House(long id, String name, String description, String cost, long timestamp) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.cost = cost;
      this.timestamp = timestamp;
    }
}
