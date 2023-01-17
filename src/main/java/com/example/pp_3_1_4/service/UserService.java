package com.example.pp_3_1_4.service;


import com.example.pp_3_1_4.model.User;
import java.util.List;

public interface UserService {
    void add(User user);
    List<User> listUsers();
    public User getUser(int id);
    void update(User user, boolean samePassword);
    void delete(int id);
    User findUserByName(String name);
}
