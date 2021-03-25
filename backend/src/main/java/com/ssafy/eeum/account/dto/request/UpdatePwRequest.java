package com.ssafy.eeum.account.dto.request;

import lombok.Getter;
import lombok.Setter;

/**
 * com.ssafy.eeum.account.dto.request
 * UpdatePwRequest.java
 * @date    2021-03-23 오후 10:34
 * @author  이주희
 *
 * @변경이력
 **/

@Getter
@Setter
public class UpdatePwRequest {

    private String currentPw;
    private String newPw;

}
