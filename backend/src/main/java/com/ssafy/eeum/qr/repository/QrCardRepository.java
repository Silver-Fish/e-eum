package com.ssafy.eeum.qr.repository;

import com.ssafy.eeum.qr.domain.QR;
import com.ssafy.eeum.qr.domain.QrCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QrCardRepository extends JpaRepository<QrCard,Long> {
    List<QrCard> findByCardId(long id);
}
