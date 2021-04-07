package com.ssafy.eeum.qr.repository;

import com.ssafy.eeum.qr.domain.AccountQr;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * com.ssafy.eeum.qr.repository
 * AccountQrRepository.java
 * @date    2021-04-07 오후 4:47
 * @author  차수연
 *
 * @변경이력
 **/
public interface AccountQrRepository extends JpaRepository<AccountQr, Long> {
    List<AccountQr> findByQrId(Long id);
}
