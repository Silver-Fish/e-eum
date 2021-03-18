package com.ssafy.eeum.account.dto.request;

import lombok.Getter;
import lombok.Setter;

/**
 * com.ssafy.eeum.account.dto.request
 * LoginRequest.java
 * @date    2021-03-16 오후 8:45
 * @author  이주희
 *
 * @변경이력
 **/

@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
}
