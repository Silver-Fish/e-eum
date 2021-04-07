package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.category.domain.CategoryCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * com.ssafy.eeum.category.repository
 * CategoryCardRepository.java
 * @date    2021-04-07 오후 5:11
 * @author  차수연
 *
 * @변경이력
 **/

public interface CategoryCardRepository extends JpaRepository<CategoryCard,Long> {
    List<CategoryCard> findByCardId(Long id);

    @Query("SELECT cc FROM CategoryCard cc WHERE cc.category.account = :account AND cc.card.word LIKE %:keyword%")
    List<CategoryCard> findByKeyword(String keyword, Account account);
}
