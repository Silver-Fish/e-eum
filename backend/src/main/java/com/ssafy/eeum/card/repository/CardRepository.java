package com.ssafy.eeum.card.repository;

import com.ssafy.eeum.card.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * com.ssafy.eeum.card.repository
 * CardRepository.java
 * @date    2021-03-18 오후 3:17
 * @author  이아영
 *
 * @변경이력
 **/

public interface CardRepository extends JpaRepository<Card,Long> {

}
