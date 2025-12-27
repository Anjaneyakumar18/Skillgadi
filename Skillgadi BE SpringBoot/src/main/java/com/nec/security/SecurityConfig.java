package com.nec.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth

                // ✅ CORS
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers("/payments/notes/**").hasRole("USER")

                // ✅ PUBLIC
                .requestMatchers(
                    "/auth/**",
                    "/mail/**"
                ).permitAll()

                // 🔒 ADMIN ONLY (THIS WAS MISSING) ---
                .requestMatchers("/admin/**").hasRole("ADMIN")

                // 🔒 USER ONLY
                .requestMatchers("/quiz/enrolled/**").hasRole("USER")

                // 🔒 EVERYTHING ELSE
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
