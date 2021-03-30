package com.ssafy.eeum.qr.domain;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.qr.dto.request.QrInsertRequest;
import lombok.Getter;

import javax.persistence.*;

/**
 * com.ssafy.eeum.qr.domain
 * QRCard.java
 * @date    2021-03-30 오후 3:40
 * @author  이아영
 *
 * @변경이력
 **/

@Entity
@Getter
public class QRCard {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "qr_card_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qr_id")
    private QR qr;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    public static QRCard createQRCard(QR qr, Card card) {
        QRCard qrCard = new QRCard();
        qrCard.setQR(qr);
        qrCard.setCard(card);
        return qrCard;
    }

    public void setQR(QR qr){
        this.qr = qr;
    }

    public void setCard(Card card){
        this.card = card;
    }
}