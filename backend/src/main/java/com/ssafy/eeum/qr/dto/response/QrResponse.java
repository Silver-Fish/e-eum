package com.ssafy.eeum.qr.dto.response;

import com.ssafy.eeum.qr.domain.QR;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class QrResponse {
    private Long id;
    private String title;
    private String qr_url;

    public QrResponse(Long id, String title, String qr_url) {
        this.id = id;
        this.title = title;
        this.qr_url = qr_url;
    }

    public static QrResponse of(QR qr) {
        return new QrResponse(qr.getId(),qr.getTitle(),qr.getQrUrl());
    }

    public static List<QrResponse> listof(List<QR> qrs) {
        List<QrResponse> qrResponses = new ArrayList<>();

        for (QR qr : qrs) {
            qrResponses.add(of(qr));
        }
        return qrResponses;
    }
}
