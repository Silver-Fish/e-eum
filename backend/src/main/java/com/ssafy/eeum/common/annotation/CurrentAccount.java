package com.ssafy.eeum.common.annotation;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * com.ssafy.eeum.common.annotation
 * CurrentAccount.java
 * @date    2021-03-23 오후 10:08
 * @author  이주희
 *
 * @변경이력
 **/

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : account" )
public @interface CurrentAccount {
}
