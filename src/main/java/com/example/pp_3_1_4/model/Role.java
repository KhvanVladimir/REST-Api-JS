package com.example.pp_3_1_4.model;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  id;
    private String name;

    public Role() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name.substring(5);
    }
}
