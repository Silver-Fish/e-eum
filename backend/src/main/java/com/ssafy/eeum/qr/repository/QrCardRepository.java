package com.ssafy.eeum.qr.repository;

import com.ssafy.eeum.qr.domain.QrCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * com.ssafy.eeum.qr.repository
 * QrCardRepository.java
 * @date    2021-04-07 오후 4:47
 * @author  차수연
 *
 * @변경이력
 **/
public interface QrCardRepository extends JpaRepository<QrCard,Long> {
    List<QrCard> findByCardId(long id);
}
