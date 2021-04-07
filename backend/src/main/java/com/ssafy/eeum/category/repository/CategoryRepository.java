package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * com.ssafy.eeum.category.repository
 * CategoryRepository.java
 * @date    2021-04-07 오후 5:11
 * @author  차수연
 *
 * @변경이력
 **/

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByAccount(Account account);

}
