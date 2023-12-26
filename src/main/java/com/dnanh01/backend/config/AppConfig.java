package com.dnanh01.backend.config;

import java.util.Arrays;
import java.util.Collections;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableAutoConfiguration
public class AppConfig {

    // Configuration for the Spring Security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize -> Authorize
                        .requestMatchers("/api/products/**","https://shoes-shop-mvaa.vercel.app/**","/vnpay-payment/**").permitAll() // Permit access
                        // to
                        // without
                        // authentication
                        .requestMatchers("/api/**").authenticated() // Require authentication
                        // for other authorized
                        // requests
                        .anyRequest().permitAll()) // Permit all other requests without
                // authentication
                .addFilterBefore(
                        new JwtValidator(), BasicAuthenticationFilter.class // Add JwtValidator
                        // before
                        // BasicAuthenticationFilter
                ).csrf(csrf -> csrf // Disable Cross-Site Request Forgery (CSRF) protection
                        .disable())
                .cors(cors -> cors // Enable Cross-Origin Resource Sharing (CORS)
                        .configurationSource(
                                new CorsConfigurationSource() {

                                    @Override
                                    public CorsConfiguration getCorsConfiguration(
                                            HttpServletRequest request) {
                                        CorsConfiguration cfg = new CorsConfiguration();
                                        cfg.setAllowedOrigins(Arrays.asList(
                                                "http://localhost:3000",
                                                "http://localhost:4200",
                                                "http://localhost:5454",
                                                "https://pbl6-shoes-shop-production.up.railway.app",
                                                "https://pbl6-shoes-shop-production-9b7e.up.railway.app",
                                                "https://pbl6-shoes-shop-production-f927.up.railway.app",
                                                "https://study-fontend.vercel.app",
                                                "https://phong-van-cv-srsf.vercel.app",
                                                "https://sandbox.vnpayment.vn",
                                                "https://shoes-shop-mvaa.vercel.app",
                                                "https://www.facebook.com"));
                                        cfg.setAllowedMethods(Collections
                                                .singletonList("*"));
                                        cfg.setAllowCredentials(true);
                                        cfg.setAllowedHeaders(Collections
                                                .singletonList("*"));
                                        cfg.setExposedHeaders(Arrays.asList(
                                                "Authorization"));
                                        cfg.setMaxAge(3600L);
                                        return cfg;
                                    }

                                }))
                .httpBasic(withDefaults())
                .formLogin(withDefaults()); // Enable form-based authentication
        return http.build(); // Build and return the configured HttpSecurity object
    }

    // Bean definition for PasswordEncoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCryptPasswordEncoder for password encoding
    }
}
