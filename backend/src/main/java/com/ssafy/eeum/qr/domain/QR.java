package com.ssafy.eeum.qr.domain;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.card.domain.Card;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * com.ssafy.eeum.qr.domain
 * QR.java
 * @date    2021-04-07 오후 5:07
 * @author  차수연
 *
 * @변경이력
 **/

@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name = "qr")
public class QR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qr_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Account account;

    private String title;

    @Lob
    private String qrUrl;

    @OneToMany(mappedBy = "qr", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QrCard> qrCards = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;


    @Builder
    public QR(String title, Account account) {
        this.title = title;
        this.account = account;
        if (account != null) {
            account.addQr(this);
        }
    }

    public void setQrUrl(String qrUrl) {
        this.qrUrl = qrUrl;
    }

    public void update(QR requestQr) {
        this.title = requestQr.title;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Card> getCards() {
        return qrCards.stream()
                .map(QrCard::getCard)
                .collect(Collectors.toList());
    }

    public void addQRCard(QrCard qrCard) {
        qrCards.add(qrCard);
    }

    public void deleteQrCard(QrCard qrCard) {
        qrCards.remove(qrCard);
    }
}
