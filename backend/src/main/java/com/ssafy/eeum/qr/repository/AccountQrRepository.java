package com.ssafy.eeum.qr.repository;

import com.ssafy.eeum.qr.domain.AccountQr;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountQrRepository extends JpaRepository<AccountQr, Long> {
    List<AccountQr> findByQrId(Long id);
}
