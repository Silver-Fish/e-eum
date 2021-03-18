package com.ssafy.eeum.account.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.domain.UserRole;
import com.ssafy.eeum.account.dto.request.SingupRequest;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.common.exception.DuplicateException;
import com.ssafy.eeum.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * com.ssafy.eeum.account.service
 * AccountService.java
 * @date    2021-03-16 오후 8:44
 * @author  이주희
 *
 * @변경이력
 **/

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public Account createAccount(SingupRequest singup) {
        Account account = Account.builder()
                .email(singup.getEmail())
                .password(passwordEncoder.encode(singup.getPassword()))
                .name(singup.getName())
                .role(UserRole.ROLE_USER)
                .build();
        return this.accountRepository.save(account);
    }

    public void checkDuplicateEmail(String email) {
        accountRepository.findByEmail(email).ifPresent(account -> {
            throw new DuplicateException(ErrorCode.DUPLICATED_EMAIL);
        });
    }

}
