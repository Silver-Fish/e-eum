package com.ssafy.eeum.account.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.domain.UserRole;
import com.ssafy.eeum.account.dto.reponse.AccountSimpleResponse;
import com.ssafy.eeum.account.dto.request.*;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
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

    public AccountSimpleResponse findAccount(Account account) {
        Account result = getAccount(account.getEmail());
        return AccountSimpleResponse.of(result);
    }

    public boolean checkDuplicateEmail(String email) {
        return !accountRepository.findByEmail(email).isEmpty();
    }

    public boolean checkPassword(PasswordRequest passwordRequest, Account account) {
        return passwordEncoder.matches(passwordRequest.getPassword(), account.getPassword());
    }

    public void updatePassword(UpdatePwRequest updatePwRequest, Account account) {
        if (!passwordEncoder.matches(updatePwRequest.getCurrentPw(), account.getPassword()))
            throw new NotMatchException(ErrorCode.NOT_MATCH_PW);
        Account result = getAccount(account.getEmail());
        result.setPassword(passwordEncoder.encode(updatePwRequest.getNewPw()));
        accountRepository.save(result);
    }


    public void checkAcount(AccountRequest accountRequest) {
        Account account = getAccount(accountRequest.getEmail());
        if (!account.getName().equals(accountRequest.getName()))
            throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
    }

    public void resetPassword(LoginRequest loginRequest) {
        Account account = getAccount(loginRequest.getEmail());
        account.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        accountRepository.save(account);
    }

    private Account getAccount(String email) {
        Account account = accountRepository.findByEmail(email).orElseThrow(
                () -> {
                    return new NotFoundException(ErrorCode.USER_NOT_FOUND);
                }
        );
        return account;
    }
}
