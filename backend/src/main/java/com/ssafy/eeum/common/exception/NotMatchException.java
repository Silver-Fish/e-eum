package com.ssafy.eeum.common.exception;

/**
 * com.ssafy.eeum.common.exception
 * NotMatchException.java
 * @date    2021-03-23 오후 10:38
 * @author  이주희
 *
 * @변경이력
 **/

public class NotMatchException extends BusinessException {

    public NotMatchException(ErrorCode errorCode) {
        super(errorCode);
    }

}
