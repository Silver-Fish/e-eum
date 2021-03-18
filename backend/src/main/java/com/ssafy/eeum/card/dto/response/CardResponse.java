package com.ssafy.eeum.card.dto.response;

import com.ssafy.eeum.card.domain.Card;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class CardResponse {
    private Long id;
    private String word;

    public CardResponse(Long id, String word) {
        this.id = id;
        this.word = word;
    }

    public static CardResponse of(Card card){
        return new CardResponse(card.getId(),card.getWord());
    }

    public static List<CardResponse> listOf(List<Card> cards){
        List<CardResponse> cardResponses = new ArrayList<>();

        for (Card card : cards){
            cardResponses.add(of(card));
        }
        return cardResponses;
    }
}
