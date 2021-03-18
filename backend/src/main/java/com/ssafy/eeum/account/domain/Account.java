package com.ssafy.eeum.account.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

/**
 * com.ssafy.eeum.account.domain
 * Account.java
 * @date    2021-03-16 오후 8:45
 * @author  이주희
 *
 * @변경이력
 **/

@Entity
@Getter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_GUEST;


    public Account() {}

    @Builder
    public Account(@NotNull @Email String email, @NotNull String password, @NotNull String name, @NotNull UserRole role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }
}
