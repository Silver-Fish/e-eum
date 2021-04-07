package com.ssafy.eeum.qr.dto.response;

import lombok.Getter;

/**
 * com.ssafy.eeum.qr.dto.response
 * QrInfoResponse.java
 * @date    2021-04-07 오후 5:11
 * @author  차수연
 *
 * @변경이력
 **/

@Getter
public class QrInfoResponse {
    private String title;
    private boolean owner;

    public QrInfoResponse(String title, boolean owner) {
        this.title = title;
        this.owner = owner;
    }
}
