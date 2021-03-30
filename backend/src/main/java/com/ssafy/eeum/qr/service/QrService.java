package com.ssafy.eeum.qr.service;


import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.qr.domain.QR;
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
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class QrService {

    @Value("D:/")
    private String filePath;

    @Value("${apiId}")
    private String id;

    @Value("${apiPassword}")
    private String password;


    private final QrRepository qrRepository;

    @Transactional
    public Long save(Account account, String title) {
        QR qr = QR.builder().title(title).build();
        qrRepository.save(qr);

        String qrUrl = getQr(account.getId(), qr.getId());
        qr.setQrUrl(qrUrl);

        return qr.getId();
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
}
