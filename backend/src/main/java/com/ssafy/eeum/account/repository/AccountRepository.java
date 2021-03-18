package com.ssafy.eeum.account.repository;

import com.ssafy.eeum.account.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * com.ssafy.eeum.account.repository
 * AccountRepository.java
 * @date    2021-03-16 오후 8:44
 * @author  이주희
 *
 * @변경이력
 **/

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByEmail(String email);
}
