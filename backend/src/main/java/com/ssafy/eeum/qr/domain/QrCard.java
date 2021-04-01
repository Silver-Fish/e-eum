package com.ssafy.eeum.qr.domain;

import com.ssafy.eeum.card.domain.Card;
import lombok.Getter;

import javax.persistence.*;

/**
 * com.ssafy.eeum.qr.domain
 * QrCard.java
 * @date    2021-03-30 오후 3:40
 * @author  이아영
 *
 * @변경이력
 **/

@Entity
@Getter
public class QrCard {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "qr_card_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qr_id")
    private QR qr;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private Card card;

    public static QrCard createQRCard(QR qr, Card card) {
        QrCard qrCard = new QrCard();
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