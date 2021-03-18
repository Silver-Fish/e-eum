package com.ssafy.eeum.common.exception;

/**
 * com.ssafy.eeum.common.exception
 * DuplicateException.java
 * @date    2021-03-18 오후 9:30
 * @author  이주희
 *
 * @변경이력
 **/

public class DuplicateException extends BusinessException {

    public DuplicateException(ErrorCode errorCode) {
        super(errorCode);
    }
}
