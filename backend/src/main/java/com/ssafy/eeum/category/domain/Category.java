package com.ssafy.eeum.category.domain;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
//@ToString
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Account account;

    private String word;

//    @ColumnDefault("") : 이미지 디폴트값 설정용 어노테이션
    private String categoryImageUrl;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryCard> categoryCards = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    public Category() {}

    @Builder
    public Category(String word, String categoryImageUrl) {
        this.word = word;
        this.categoryImageUrl = categoryImageUrl;
    }

    public Category update(Category category) {
        this.word = category.word;
        this.categoryImageUrl = category.categoryImageUrl;

        return this;
    }

    public List<Card> getCards(){
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
}
