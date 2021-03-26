package com.ssafy.eeum.card.repository;

import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountCardRepository extends JpaRepository<AccountCard,Long> {
    List<AccountCard> findByCardId(Long id);
}
