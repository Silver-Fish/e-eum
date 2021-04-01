package com.ssafy.eeum.card.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * com.ssafy.eeum.card.dto.request
 * CardVoiceRequest.java
 * @date    2021-04-01 오후 4:41
 * @author  이아영
 *
 * @변경이력
 **/

@NoArgsConstructor
@Getter
@ApiModel(description = "카드 음성 요청 모델")
public class CardVoiceRequest {
    private String path;
    private String word;

    public CardVoiceRequest(String path, String word) {
        this.path = path;
        this.word = word;
    }
}
