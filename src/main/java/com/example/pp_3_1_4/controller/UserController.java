package com.example.pp_3_1_4.controller;

import com.example.pp_3_1_4.model.Role;
import com.example.pp_3_1_4.model.User;
import com.example.pp_3_1_4.service.RoleService;
import com.example.pp_3_1_4.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping
public class UserController {
    @Autowired
    UserServiceImpl a;

    @Autowired
    RoleService r;

    public UserController() {
    }

    @GetMapping ("/user")
    public ModelAndView getUserPage(ModelAndView modelAndView, Principal principal){
        modelAndView.setViewName("user");
        return modelAndView;
    }

    @GetMapping ("/user/information")
    public User getCurrentUser (Principal principal){
        return a.findUserByName(principal.getName());
    }

    @GetMapping ("/admin")
    public ModelAndView getAdminPage(ModelAndView modelAndView, Principal principal){
        modelAndView.setViewName("users");
        return modelAndView;
    }

    String getRoles(String name) {
        String roles = "";
        for (Role role : a.findUserByName(name).getRoles()) {
            roles += role.getName() + " ";
        }
        return roles;
    }

    @GetMapping ("/admin/users")
    public List<User> getUsers(Model model){
        return a.listUsers();
    }

    @GetMapping ("/admin/users/{id}")
    public User getUser(@PathVariable("id") int id){
        return a.getUser(id);
    }

    @PostMapping("/admin/users")
    public User create(@RequestBody User user){
        a.add(user);
        return user;
    }

    @PutMapping("/admin/users")
    public User change(@RequestBody User user){
        a.update(user);
        return user;
    }

    @DeleteMapping ("/admin/users/{id}")
    public String deleteUser(@PathVariable("id") int id){
        a.getUser(id).setRoles(null);
        a.delete(id);
        return String.format("User with ID: " + id + " was deleted");
    }
}

