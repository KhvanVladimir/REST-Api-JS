package com.example.pp_3_1_4.configs;

import com.example.pp_3_1_4.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final SuccessUserHandler successUserHandler;
    private UserServiceImpl userService;

    @Autowired
    public void setUserService2(UserServiceImpl userService) {
        this.userService = userService;
    }

    @Autowired
    public WebSecurityConfig(SuccessUserHandler successUserHandler) {
        this.successUserHandler = successUserHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //удалить
                .csrf().disable()
                //

                .authorizeRequests()
                .antMatchers("/admin/**").hasRole("ADMIN")

                //удалить
                //.permitAll()
                //

                .antMatchers("/user/**").hasAnyRole("USER", "ADMIN").and()

                //удалить
                //.permitAll().and()
                //

                .formLogin().successHandler(successUserHandler)
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }

    // аутентификация inMemory
//    @Bean
//    @Override
//    public UserDetailsService userDetailsService() {
//        UserDetails user =
//                User.withDefaultPasswordEncoder()
//                        .username("user")
//                        .password("user")
//                        .roles("USER")
//                        .build();
//
//        return new InMemoryUserDetailsManager(user);
//    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder());
        authenticationProvider.setUserDetailsService(userService);
        return authenticationProvider;
    }
}