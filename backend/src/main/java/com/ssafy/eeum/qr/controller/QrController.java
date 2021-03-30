package com.ssafy.eeum.qr.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import com.ssafy.eeum.qr.dto.request.QrInsertRequest;
import com.ssafy.eeum.qr.service.QrService;
import com.sun.istack.NotNull;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;

@Api(tags = {"4. QR"})
@RestController
@RequiredArgsConstructor
@RequestMapping("qr")
public class QrController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final QrService qrService;

    @PostMapping
    @ApiOperation(value = "QR 등록",
            notes = "QR코드로 등록할 이름을 입력받아 QR을 등록한다", response = ResponseEntity.class)
    public ResponseEntity<Long> saveQr(@CurrentAccount Account account, @RequestBody @NotBlank QrInsertRequest qrInsertRequest) throws Exception {
        Long qrNo = null;
        qrNo = qrService.save(account, qrInsertRequest.getTitle());
        return ResponseEntity.ok().body(qrNo);
    }



}
