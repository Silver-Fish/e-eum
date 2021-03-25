package com.ssafy.eeum.account.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.domain.UserAccount;
import com.ssafy.eeum.account.dto.request.PasswordRequest;
import com.ssafy.eeum.account.dto.request.SingupRequest;
import com.ssafy.eeum.account.dto.request.UpdatePwRequest;
import com.ssafy.eeum.account.service.AccountService;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * com.ssafy.eeum.account.controller
 * AccountController.java
 * @date    2021-03-16 오후 8:45
 * @author  이주희
 *
 * @변경이력
 **/

@Api(tags = {"1. Account"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService accountService;

    @ApiOperation(value = "회원 가입")
    @ApiResponse(code = 201, message = "created")
    @PostMapping("")
    public ResponseEntity<String> singup(final @Valid @RequestBody SingupRequest singup){
        accountService.createAccount(singup);
        return new ResponseEntity<String>("Created", HttpStatus.CREATED);
    }

    @ApiOperation(value = "이메일 중복 확인")
    @GetMapping("/check-dup")
    public ResponseEntity<Boolean> checkDuplicateEmail(@RequestParam String email) {
        boolean result = accountService.checkDuplicateEmail(email);
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "현재 로그인한 회원의 비밀번호 확인")
    @PostMapping("/check-pw")
    public ResponseEntity<Boolean> checkPassword(@RequestBody PasswordRequest passwordRequest,
                                                 @CurrentAccount Account account) {
        boolean result = accountService.checkPassword(passwordRequest, account);
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "비밀번호 변경")
    @PutMapping("/update-pw")
    public ResponseEntity<Void> updatePassword(@RequestBody UpdatePwRequest updatePwRequest,
                                               @CurrentAccount Account account) {
        accountService.updatePassword(updatePwRequest, account);
        return ResponseEntity.ok().build();
    }
}
