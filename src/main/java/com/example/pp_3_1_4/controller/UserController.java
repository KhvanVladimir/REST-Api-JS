package com.example.pp_3_1_4.controller;

import com.example.pp_3_1_4.model.User;
import com.example.pp_3_1_4.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping
public class UserController {
    UserServiceImpl userService;
    public UserController() {
    }
    @Autowired
    public UserController(UserServiceImpl userService) {
    this.userService = userService;
    }
    @GetMapping("/user")
    public ModelAndView getUserPage(ModelAndView modelAndView) {
        modelAndView.setViewName("user");
        return modelAndView;
    }

    @GetMapping("/user/information")
    public User getCurrentUser(Principal principal) {
        return userService.findUserByName(principal.getName());
    }

    @GetMapping("/admin")
    public ModelAndView getAdminPage(ModelAndView modelAndView) {
        modelAndView.setViewName("users");
        return modelAndView;
    }
    @GetMapping("/admin/users")
    public List<User> getUsers() {
        return userService.listUsers();
    }

    @GetMapping("/admin/users/{id}")
    public User getUser(@PathVariable("id") int id) {
        return userService.getUser(id);
    }

    @PostMapping("/admin/users")
    public User create(@RequestBody User user) {
        userService.add(user);
        return user;
    }

    @PutMapping("/admin/users")
    public User change(@RequestBody User user) {
        userService.update(user, user.getPassword().equals(userService.getUser(Math.toIntExact(user.getId())).getPassword()));
        return user;
    }

    @DeleteMapping("/admin/users/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userService.getUser(id).setRoles(null);
        userService.delete(id);
        return String.format("User with ID: " + id + " was deleted");
    }
}

