package com.ssafy.eeum.account.domain;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

/**
 * com.ssafy.eeum.account.domain
 * UserAccount.java
 * @date    2021-03-16 오후 8:45
 * @author  이주희
 *
 * @변경이력
 **/

public class UserAccount extends User {
    private Account account;

    public UserAccount(Account account) {
        super(account.getEmail(), account.getPassword(), List.of(new SimpleGrantedAuthority(account.getRole().toString())));
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }
}
