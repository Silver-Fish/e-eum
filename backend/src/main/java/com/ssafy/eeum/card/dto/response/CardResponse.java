package com.ssafy.eeum.card.dto.response;

import com.ssafy.eeum.card.domain.Card;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class CardResponse {
    private Long id;
    private String word;
    private String imageUrl;

    public CardResponse(Long id, String word, String imageUrl) {
        this.id = id;
        this.word = word;
        this.imageUrl = imageUrl;
    }

    public static CardResponse of(Card card){
        return new CardResponse(card.getId(),card.getWord(),card.getImageUrl());
    }

    public static List<CardResponse> listOf(List<Card> cards){
        List<CardResponse> cardResponses = new ArrayList<>();

        for (Card card : cards){
            cardResponses.add(of(card));
        }
        return cardResponses;
    }
}
