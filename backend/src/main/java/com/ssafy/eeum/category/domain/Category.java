package com.ssafy.eeum.category.domain;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.card.domain.Card;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * com.ssafy.eeum.category.domain
 * Category.java
 * @date    2021-04-07 오후 5:06
 * @author  차수연
 *
 * @변경이력
 **/

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Account account;

    private String word;

    @Lob
    private String categoryImageUrl;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryCard> categoryCards = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    @Builder
    public Category(String word, Account account) {
        this.word = word;
        this.account = account;
        if (account != null) {
            account.addCategory(this);
        }
    }

    public void update(Category category) {
        this.word = category.word;
    }

    public List<Card> getCards() {
        return categoryCards.stream()
                .map(CategoryCard::getCard)
                .collect(Collectors.toList());
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public void setCategoryImageUrl(String categoryImageUrl) {
        this.categoryImageUrl = categoryImageUrl;
    }

    public void addCategoryCard(CategoryCard categoryCard) {
        categoryCards.add(categoryCard);
    }

    public void deleteCategoryCard(CategoryCard categoryCard) {
        categoryCards.remove(categoryCard);
    }
}
