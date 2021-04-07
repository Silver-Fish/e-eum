package com.ssafy.eeum.qr.repository;

import com.ssafy.eeum.qr.domain.QR;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * com.ssafy.eeum.qr.repository
 * QrRepository.java
 * @date    2021-04-07 오후 4:47
 * @author  차수연
 *
 * @변경이력
 **/
public interface QrRepository extends JpaRepository<QR,Long> {
}
