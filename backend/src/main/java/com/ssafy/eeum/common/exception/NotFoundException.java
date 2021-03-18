package com.ssafy.eeum.common.exception;

/**
 * com.ssafy.eeum.common.exception
 * NotFoundException.java
 * @date    2021-03-18 오후 9:30
 * @author  이주희
 *
 * @변경이력
 **/

public class NotFoundException extends BusinessException {

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }

}
