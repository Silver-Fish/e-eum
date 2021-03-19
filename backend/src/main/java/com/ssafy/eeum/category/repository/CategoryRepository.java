package com.ssafy.eeum.category.repository;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByAccount(Account account);

}
