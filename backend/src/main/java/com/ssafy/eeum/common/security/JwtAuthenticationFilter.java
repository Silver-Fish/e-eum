package com.ssafy.eeum.common.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.eeum.account.domain.UserAccount;
import com.ssafy.eeum.account.dto.request.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

/**
 * com.ssafy.eeum.common.security
 * JwtAuthenticationFilter.java
 * @date    2021-03-16 오후 8:42
 * @author  이주희
 *
 * @변경이력
 **/

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // Trigger whenPOST request to /login
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // Grab credentials and map them to login viewmodel
        LoginRequest credentials = null;
        try {
            credentials = new ObjectMapper().readValue(request.getInputStream(), LoginRequest.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Create login token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                credentials.getEmail(),
                credentials.getPassword(),
                new ArrayList<>());

        // Authenticate user
        Authentication auth = authenticationManager.authenticate(authenticationToken);

        return auth;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // Grab principal
        UserAccount account = (UserAccount) authResult.getPrincipal();

        // Create JWT Token
        String token = JWT.create()
                .withSubject(account.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()));

        // Add token in response
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + token);
    }
}
