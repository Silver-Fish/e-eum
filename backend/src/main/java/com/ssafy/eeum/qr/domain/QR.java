package com.ssafy.eeum.qr.domain;

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
    public QR(String title, String qrUrl) {
        this.title = title;
        this.qrUrl = qrUrl;
    }

    public void setQrUrl(String qrUrl) {
        this.qrUrl = qrUrl;
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
