package com.ssafy.eeum.qr.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import com.ssafy.eeum.qr.domain.AccountQr;
import com.ssafy.eeum.qr.domain.QR;
import com.ssafy.eeum.qr.domain.QrCard;
import com.ssafy.eeum.qr.dto.request.QrUpdateRequest;
import com.ssafy.eeum.qr.dto.response.QrResponse;
import com.ssafy.eeum.qr.repository.AccountQrRepository;
import com.ssafy.eeum.qr.repository.QrCardRepository;
import com.ssafy.eeum.qr.repository.QrRepository;
import com.ssafy.eeum.common.util.naverApiUtil;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * com.ssafy.eeum.qr.service
 * QrService.java
 * @date    2021-04-07 오후 4:48
 * @author  차수연
 *
 * @변경이력
 **/
@Slf4j
@Service
@RequiredArgsConstructor
public class QrService {

    @Value("${file.path}")
    private String filePath;

    @Value("${apiId}")
    private String id;

    @Value("${apiPassword}")
    private String password;


    private final QrRepository qrRepository;
    private final AccountRepository accountRepository;
    private final AccountQrRepository accountQrRepository;
    private final QrCardRepository qrCardRepository;

    // QR 생성
    @Transactional
    public Long save(Account account, String title) {
        QR qr = QR.builder().title(title).build();
        qrRepository.save(qr);

        account = findAccount(account.getEmail());
        account.addAccountQr(AccountQr.createAccountQr(account,qr));
        account.addQr(qr);

        String qrUrl = getQr(account.getId(), qr.getId());
        qr.setQrUrl(qrUrl);

        return qr.getId();
    }

    // QR 리스트 조회
    @Transactional(readOnly = true)
    public List<QrResponse> findList(Account account) {
        List<QR> qrs = null;
        account = findAccount(account.getEmail());
        qrs = account.getQrs();
        return QrResponse.listof(qrs);
    }

    // QR 단일 조회
    @Transactional(readOnly = true)
    public QrResponse find(Long id) {
        QR qr = findQr(id);
        return QrResponse.of(qr);
    }

    @Transactional
    public void updateQr(Long id, QrUpdateRequest qrUpdateRequest) {
        QR qr = findQr(id);
        QR requestQr = qrUpdateRequest.toQr();
        qr.update(requestQr);
    }

    // QR 삭제
    @Transactional
    public void deleteQr(Long id) {
        List<AccountQr> accountQrs = accountQrRepository.findByQrId(id);
        List<QrCard> qrCards = qrCardRepository.findByCardId(id);
        if (accountQrs.size() != 0) {
            for (AccountQr accountQr : accountQrs) {
                accountQr.setQr(null);
                accountQr.getAccount().deleteAccountQr(accountQr);
                log.info("account qr delete");
            }
        } else if (qrCards.size()!=0){
            for (QrCard qrCard : qrCards) {
                qrCard.setCard(null);
                qrCard.getQr().deleteQrCard(qrCard);
                log.info("qr card delete");
            }
        }
        qrRepository.deleteById(id);
    }

    private String getQr(Long userId, Long qrId) {
        String clientId = id;
        String clientSecret = password;

        String originalURL = "https://dev.e-eum.kr/" + userId + "/" + qrId;
        String apiURL = "https://openapi.naver.com/v1/util/shorturl?url=" + originalURL;

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        String responseBody = naverApiUtil.get(apiURL,requestHeaders);

        JSONParser parser = new JSONParser();
        Object obj = null;
        try {
            obj = parser.parse(responseBody);
        } catch (ParseException e) {
        }
        JSONObject jsonObj = (JSONObject) obj;
        JSONObject res = (JSONObject) jsonObj.get("result");
        JSONObject result = (JSONObject) res;
        String url = (String) result.get("url") + ".qr";
        return url;
    }

    private QR findQr(Long id) {
        return qrRepository.findById(id)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.QR_NOT_FOUND);
                });
    }

    private Account findAccount(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.USER_NOT_FOUND);
                });

    }
}
