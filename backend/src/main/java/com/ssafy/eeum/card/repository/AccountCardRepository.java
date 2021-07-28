package com.ssafy.eeum.card.repository;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.card.domain.AccountCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountCardRepository extends JpaRepository<AccountCard,Long> {
    AccountCard findByCardId(Long id);

    @Query("SELECT ac FROM AccountCard ac WHERE ac.account = :account AND ac.card.word LIKE %:keyword%")
    List<AccountCard> findByKeyword(String keyword, Account account);
}
