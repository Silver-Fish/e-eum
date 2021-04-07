package com.ssafy.eeum.qr.service;


import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.card.repository.CardRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import com.ssafy.eeum.common.util.ImageUtil;
import com.ssafy.eeum.qr.domain.QR;
import com.ssafy.eeum.qr.domain.QrCard;
import com.ssafy.eeum.qr.dto.request.QrUpdateRequest;
import com.ssafy.eeum.qr.dto.response.QrInfoResponse;
import com.ssafy.eeum.qr.dto.response.QrResponse;
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

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class QrService {

    @Value("${file.path}")
    private String filePath;

    @Value("${file.defaultpath}")
    private String defaultPath;

    @Value("${apiId}")
    private String id;

    @Value("${apiPassword}")
    private String password;

    @Value("${eeum.serverUrl}")
    private String serverUrl;

    private final QrRepository qrRepository;
    private final AccountRepository accountRepository;
    private final CardRepository cardRepository;

    // QR 생성
    public Long save(Account account, String title) {
        account = findAccount(account.getEmail());
        QR qr = QR.builder().title(title).account(account).build();
        qrRepository.save(qr);

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

    @Transactional(readOnly = true)
    public QrInfoResponse findInfo(Account account, Long id) {
        QR qr = findQr(id);
        return new QrInfoResponse(qr.getTitle(), account != null ? qr.getAccount().getId() == account.getId() : false);
    }

    public void updateQr(Long id, QrUpdateRequest qrUpdateRequest) {
        QR qr = findQr(id);
        QR requestQr = qrUpdateRequest.toQr();
        qr.update(requestQr);
    }

    // QR 삭제
    public void deleteQr(Long id) {
        QR qr = findQr(id);

        Account account = qr.getAccount();
        account.deleteQR(qr);

        qr.getCards().stream().forEach(card -> {
            ImageUtil.deleteFile(filePath, card.getImageUrl());
        });

        qrRepository.deleteById(id);
    }

    // QR 복사
    public Long copyQr(Account account, Long id) {
        QR originQr = findQr(id);
        account = findAccount(account.getEmail());

        Long copiedQrId = save(account, originQr.getTitle());
        QR copiedQr = findQr(copiedQrId);

        originQr.getCards().stream().forEach(originCard -> {
            Card card = Card.builder().word(originCard.getWord()).voice(originCard.getVoice()).build();
            copiedQr.addQRCard(QrCard.createQRCard(copiedQr, card));
            cardRepository.save(card);

            if (originCard.getImageUrl().equals(defaultPath)) {
                card.setImageUrl(defaultPath);
                return;
            }

            boolean copyResult = ImageUtil.copyFile(filePath + originCard.getImageUrl(), filePath + copiedQr.getAccount().getId() + "/card", card.getId().toString());
            if (!copyResult)
                card.setImageUrl(defaultPath);
            else
                card.setImageUrl(copiedQr.getAccount().getId() + "/card/" + card.getId());
        });

        return copiedQr.getId();
    }

    private String getQr(Long userId, Long qrId) {
        String clientId = id;
        String clientSecret = password;

        String originalURL = serverUrl+ qrId;
        String apiURL = "https://openapi.naver.com/v1/util/shorturl?url=" + originalURL;

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        String responseBody = naverApiUtil.get(apiURL, requestHeaders);

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
