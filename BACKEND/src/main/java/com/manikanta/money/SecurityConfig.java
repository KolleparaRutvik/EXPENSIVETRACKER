package com.manikanta.money;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, @Value("${app.frontend.origin}") String origin) throws Exception {
        http
            .csrf().disable()
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // allow H2 console if needed
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()   // allow your API endpoints
                .anyRequest().permitAll()
            )
            .httpBasic(Customizer.withDefaults()); // keep default disabled login page behavior

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
