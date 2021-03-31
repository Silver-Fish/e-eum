package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.category.domain.CategoryCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryCardRepository extends JpaRepository<CategoryCard,Long> {
    List<CategoryCard> findByCardId(Long id);

    @Query("SELECT cc FROM CategoryCard cc WHERE cc.category.account = :account AND cc.card.word LIKE %:keyword%")
    List<CategoryCard> findByKeyword(String keyword, Account account);
}
