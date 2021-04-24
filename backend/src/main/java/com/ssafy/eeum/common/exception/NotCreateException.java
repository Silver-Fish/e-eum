package com.ssafy.eeum.common.exception;

public class NotCreateException extends BusinessException {
    public NotCreateException(ErrorCode errorCode) {
        super(errorCode);
    }
}
