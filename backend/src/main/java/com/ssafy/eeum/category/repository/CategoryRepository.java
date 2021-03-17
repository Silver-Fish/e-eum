package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
