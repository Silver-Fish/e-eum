package com.ssafy.eeum.qr.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import com.ssafy.eeum.qr.dto.request.QrInsertRequest;
import com.ssafy.eeum.qr.dto.request.QrUpdateRequest;
import com.ssafy.eeum.qr.dto.response.QrInfoResponse;
import com.ssafy.eeum.qr.dto.response.QrResponse;
import com.ssafy.eeum.qr.service.QrService;
import com.sun.istack.NotNull;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * com.ssafy.eeum.qr.controller
 * QrController.java
 * @date    2021-04-07 오후 5:07
 * @author  차수연
 *
 * @변경이력
 **/

@Api(tags = {"4. QR"})
@RestController
@RequiredArgsConstructor
@RequestMapping("qr")
public class QrController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final QrService qrService;

    @PostMapping("")
    @ApiOperation(value = "QR 등록",
            notes = "QR코드로 등록할 이름을 입력받아 QR을 등록한다")
    public ResponseEntity<Long> saveQr(@ApiIgnore @CurrentAccount Account account, @RequestBody @NotBlank QrInsertRequest qrInsertRequest) throws Exception {
        Long qrNo = null;
        qrNo = qrService.save(account, qrInsertRequest.getTitle());
        return ResponseEntity.ok().body(qrNo);
    }

    @GetMapping("")
    @ApiOperation(value = "QR 목록 조회", notes = "유저의 QR 전체 목록을 조회한다.")
    public ResponseEntity<List<QrResponse>> getQrList(@ApiIgnore @CurrentAccount Account account) {
        List<QrResponse> qrResponses = qrService.findList(account);
        return ResponseEntity.ok().body(qrResponses);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "QR 이미지 조회", notes = "QR id를 받아 해당 QR의 데이터와 유저명을 조회한다")
    public ResponseEntity<QrResponse> getQr(@PathVariable @NotNull Long id) {
        QrResponse qrResponse = qrService.find(id);
        return ResponseEntity.ok().body(qrResponse);
    }

    @GetMapping("/info/{id}")
    @ApiOperation(value = "QR 정보 조회", notes = "계정정보를 받아 해당 QR의 주인인지 여부를 반환하고, QR id를 받아 해당 QR의 제목을 조회한다")
    public ResponseEntity<QrInfoResponse> getQrInfo(@ApiIgnore @CurrentAccount Account account, @PathVariable @NotNull Long id){
        QrInfoResponse qrInfoResponse = qrService.findInfo(account, id);
        return ResponseEntity.ok().body(qrInfoResponse);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "QR 제목 수정", notes = "QR id를 받아 해당 QR의 제목을 수정한다")
    public ResponseEntity<Void> updateQr(@PathVariable @NotNull Long id, @RequestBody @Valid QrUpdateRequest qrUpdateRequest) {
        qrService.updateQr(id, qrUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "QR 삭제", notes = "QR id를 받아 해당 QR을 삭제한다")
    public ResponseEntity<Void> deleteQr(@PathVariable @NotNull Long id) {
        qrService.deleteQr(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/copy/{id}")
    @ApiOperation(value = "QR 복사", notes = "QR id를 받아 내 QR 목록으로 복사")
    public ResponseEntity<Long> copyQr(@ApiIgnore @CurrentAccount Account account, @PathVariable @NotNull Long id){
        long result = qrService.copyQr(account, id);
        return ResponseEntity.ok().body(result);
    }
}
