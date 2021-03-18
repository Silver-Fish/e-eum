package com.ssafy.eeum.account.controller;

import com.ssafy.eeum.account.dto.request.SingupRequest;
import com.ssafy.eeum.account.service.AccountService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin(origins = {"*"})
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
}
