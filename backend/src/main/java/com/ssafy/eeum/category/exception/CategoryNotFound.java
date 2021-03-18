package com.ssafy.eeum.category.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CategoryNotFound extends RuntimeException {
    public final String value = "카테고리를 찾을 수 없습니다.";
}
