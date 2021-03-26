package com.ssafy.eeum.account.dto.reponse;

import com.ssafy.eeum.account.domain.Account;
import lombok.Getter;

/**
 * com.ssafy.eeum.account.dto.reponse
 * AccountSimpleResponse.java
 * @date    2021-03-25 오후 6:23
 * @author  이주희
 *
 * @변경이력
 **/

@Getter
public class AccountSimpleResponse {
    private Long id;
    private String email;
    private String name;

    public AccountSimpleResponse(Long id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public static AccountSimpleResponse of(Account account) {
        return new AccountSimpleResponse(account.getId(), account.getEmail(), account.getName());
    }
}
