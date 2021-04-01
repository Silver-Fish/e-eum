package com.ssafy.eeum.card.domain;

import com.ssafy.eeum.category.domain.CategoryCard;
import com.ssafy.eeum.qr.domain.QrCard;
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

/**
 * com.ssafy.eeum.card.domain
 * Card.java
 * @date    2021-03-18 오후 3:05
 * @author  이아영
 *
 * @변경이력
 **/

@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name="card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="card_id")
    private Long id;

    private String word;

    @Lob
    private String imageUrl;

    @Lob
    private String voiceUrl;

    private Float voiceLength;

    @CreationTimestamp
    private LocalDateTime createDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    @OneToMany(mappedBy = "card")
    private List<AccountCard> accountCards = new ArrayList<>();

    @OneToMany(mappedBy = "card")
    private List<CategoryCard> categoryCards = new ArrayList<>();

    @OneToMany(mappedBy = "card")
    private List<QrCard> qrCards = new ArrayList<>();

    @Builder
    public Card(String word) {
        this.word = word;
    }

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }

    public void setVoiceUrl(String voiceUrl){
        this.voiceUrl = voiceUrl;
    }

    public void setVoiceLength(Float voiceLength){ this.voiceLength = voiceLength; }

    public void update(Card requestCard) {
        this.word = requestCard.word;
    }
}
