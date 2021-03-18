package com.ssafy.eeum.common.security;

/**
 * com.ssafy.eeum.common.security
 * JwtProperties.java
 * @date    2021-03-16 오후 8:44
 * @author  이주희
 *
 * @변경이력
 **/

public class JwtProperties {
    public static final String SECRET = "eeumsince210302eeum";
    public static final int EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "eeum ";
    public static final String HEADER_STRING = "Authorization";
}
