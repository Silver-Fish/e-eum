package com.ssafy.eeum.common.exception;

/**
 * com.ssafy.eeum.common.exception
 * CustomFileException.java
 * @date    2021-04-05 오후 3:06
 * @author  이주희
 *
 * @변경이력
 **/

public class CustomFileException extends BusinessException {

    public CustomFileException(ErrorCode errorCode) {
        super(errorCode);
    }

}
