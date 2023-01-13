package com.example.pp_3_1_4.service;

import com.example.pp_3_1_4.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleService extends JpaRepository<Role, Long> {

}
