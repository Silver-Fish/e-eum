package com.ssafy.eeum.qr.dto.response;

import lombok.Getter;

@Getter
public class QrInfoResponse {
    private String title;
    private boolean owner;

    public QrInfoResponse(String title, boolean owner) {
        this.title = title;
        this.owner = owner;
    }
}
