package com.ssafy.eeum.category.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
//@ToString
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Table(name="category")
public class Category {
    @Id
    @GeneratedValue
    private Long id;

//    @ManyToOne  :  유저
//    @JoinColumn(name = "user_no")
//    private Users user;

    private String word;

//    @ColumnDefault("") : 이미지 디폴트값 설정용 어노테이션
    private String categoryImageUrl;

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
}
