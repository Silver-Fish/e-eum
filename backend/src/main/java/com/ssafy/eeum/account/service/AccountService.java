package com.ssafy.eeum.account.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.domain.UserRole;
import com.ssafy.eeum.account.dto.request.PasswordRequest;
import com.ssafy.eeum.account.dto.request.SingupRequest;
import com.ssafy.eeum.account.dto.request.UpdatePwRequest;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotMatchException;
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

    public boolean checkDuplicateEmail(String email) {
        return !accountRepository.findByEmail(email).isEmpty();
    }

    public boolean checkPassword(PasswordRequest passwordRequest, Account account) {
        return passwordEncoder.matches(passwordRequest.getPassword(), account.getPassword());
    }

    public void updatePassword(UpdatePwRequest updatePwRequest, Account account) {
        if(!passwordEncoder.matches(updatePwRequest.getCurrentPw(), account.getPassword()))
            throw new NotMatchException(ErrorCode.NOT_MATCH_PW);

        account.setPassword(passwordEncoder.encode(updatePwRequest.getNewPw()));
    }
}
