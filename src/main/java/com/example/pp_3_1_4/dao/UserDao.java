package com.example.pp_3_1_4.dao;

import com.example.pp_3_1_4.model.User;

import java.util.List;

public interface UserDao {
    void add(User user);
    List<User> listUsers();
    void update(User user, boolean samePassword);
    User getUser(int id);
    void delete(int id);
    User findUserByName(String name);
}
