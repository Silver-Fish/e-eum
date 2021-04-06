package com.ssafy.eeum.category.domain;

import com.ssafy.eeum.card.domain.Card;
import lombok.Getter;

import javax.persistence.*;

/**
 * com.ssafy.eeum.category.domain
 * CategoryCard.java
 * @date    2021-03-19 오전 3:43
 * @author  이주희
 *
 * @변경이력
 **/

@Entity
@Getter
public class CategoryCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_card_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private Card card;

    public static CategoryCard createCategoryCard(Category category, Card card) {
        CategoryCard categoryCard = new CategoryCard();
        categoryCard.setCategory(category);
        categoryCard.setCard(card);
        return categoryCard;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setCard(Card card) {
        this.card = card;
    }

}
