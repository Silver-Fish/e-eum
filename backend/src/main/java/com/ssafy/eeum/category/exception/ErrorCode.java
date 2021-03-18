package com.ssafy.eeum.category.exception;

public enum ErrorCode {
    CATEGORY_NOT_FOUND(500, "CA_001", "요청하신 카테고리가 존재하지 않습니다");

    private final String code;
    private final String message;
    private final int status;

    ErrorCode(int status, String code, String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public String getCode() {
        return code;
    }

    public int getStatus() {
        return status;
    }
}
