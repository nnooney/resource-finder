package com.google.sps.data;

public class House {
    private final long id;
    private final String name;
    private final String description;
    private final String address;
    private final String school;
    private final String cost;
    private final long timestamp;
  
    public House(long id, String name, String description, String address, String school, String cost, long timestamp) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.address = address;
      this.school = school;
      this.cost = cost;
      this.timestamp = timestamp;
    }
}
