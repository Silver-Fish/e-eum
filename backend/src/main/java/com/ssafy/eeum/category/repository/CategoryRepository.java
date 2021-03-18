package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
//    Optional<Category> findById(Long cursorId);
}
