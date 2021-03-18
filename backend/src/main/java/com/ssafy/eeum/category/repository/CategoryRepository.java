package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByOrderByIdDesc(Pageable page);
}
