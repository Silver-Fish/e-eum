package com.ssafy.eeum.common.exception;

import lombok.Getter;

/**
 * com.ssafy.eeum.common.exception
 * BusinessException.java
 * @date    2021-03-18 오후 9:27
 * @author  이주희
 *
 * @변경이력
 **/

@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
