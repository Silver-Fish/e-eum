package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.category.domain.CategoryCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryCardRepository extends JpaRepository<CategoryCard,Long> {
    List<CategoryCard> findByCardId(Long id);
}
