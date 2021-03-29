package com.ssafy.eeum.qr.repository;

import com.ssafy.eeum.qr.domain.QR;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QrRepository extends JpaRepository<QR,Long> {
}
