package com.ssafy.eeum.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
//        ErrorResponse response = ErrorResponse.of(ErrorCode.INVALID_INPUT_VALUE,
//                e.getBindingResult());
//        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
//    protected ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(
//            MethodArgumentTypeMismatchException e) {
//        ErrorResponse response = ErrorResponse.of(e);
//        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
//    protected ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
//            HttpRequestMethodNotSupportedException e) {
//        ErrorResponse response = ErrorResponse.of(ErrorCode.METHOD_NOT_ALLOWED);
//        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
//    }
//
//    @ExceptionHandler(BusinessException.class)
//    protected ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
//        ErrorCode errorCode = e.getErrorCode();
//        ErrorResponse response = ErrorResponse.of(errorCode);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getStatus()));
//    }
//
//    @ExceptionHandler(AuthenticationException.class)
//    protected ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e) {
//        log.warn(e.getMessage(), e);
//        ErrorResponse response = ErrorResponse.of(ErrorCode.AUTH_ERROR);
//        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(IllegalStateException.class)
//    protected ResponseEntity<ErrorResponse> handleIllegalStateException(IllegalStateException e) {
//        log.error(e.getMessage(), e);
//        ErrorResponse response = ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR);
//        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//    @ExceptionHandler(Exception.class)
//    protected ResponseEntity<ErrorResponse> handleException(Exception e) {
//        log.error(e.getMessage(), e);
//        ErrorResponse response = ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR);
//        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}