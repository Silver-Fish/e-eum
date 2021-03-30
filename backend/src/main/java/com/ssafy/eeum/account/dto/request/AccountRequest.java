package com.ssafy.eeum.account.dto.request;

import lombok.Getter;
import lombok.Setter;

/**
 * com.ssafy.eeum.account.dto.request
 * AccountRequest.java
 * @date    2021-03-25 오후 6:23
 * @author  이주희
 *
 * @변경이력
 **/

@Getter
@Setter
public class AccountRequest {
    private String email;
    private String name;
}
