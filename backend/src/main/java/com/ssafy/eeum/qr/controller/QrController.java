package com.ssafy.eeum.qr.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import com.ssafy.eeum.qr.dto.request.QrInsertRequest;
import com.ssafy.eeum.qr.dto.request.QrUpdateRequest;
import com.ssafy.eeum.qr.dto.response.QrResponse;
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

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Api(tags = {"4. QR"})
@RestController
@RequiredArgsConstructor
@RequestMapping("qr")
public class QrController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final QrService qrService;

    @PostMapping("")
    @ApiOperation(value = "QR 등록",
            notes = "QR코드로 등록할 이름을 입력받아 QR을 등록한다", response = ResponseEntity.class)
    public ResponseEntity<Long> saveQr(@CurrentAccount Account account, @RequestBody @NotBlank QrInsertRequest qrInsertRequest) throws Exception {
        Long qrNo = null;
        qrNo = qrService.save(account, qrInsertRequest.getTitle());
        return ResponseEntity.ok().body(qrNo);
    }

    @GetMapping("")
    @ApiOperation(value = "QR 목록 조회", notes = "유저의 QR 전체 목록을 조회한다", response = ResponseEntity.class)
    public ResponseEntity<List<QrResponse>> getQrList(@CurrentAccount Account account) {
        List<QrResponse> qrResponses = qrService.findList(account);
        return ResponseEntity.ok().body(qrResponses);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "QR 이미지 조회", notes = "QR id를 받아 해당 QR의 데이터와 유저명을 조회한다", response = ResponseEntity.class)
    public ResponseEntity<QrResponse> getQr(@PathVariable @NotNull Long id) {
        QrResponse qrResponse = qrService.find(id);
        return ResponseEntity.ok().body(qrResponse);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "QR 제목 수정", notes = "QR id를 받아 해당 QR의 제목을 수정한다", response = ResponseEntity.class)
    public ResponseEntity<Void> updateQr(@PathVariable @NotNull Long id, @RequestBody @Valid QrUpdateRequest qrUpdateRequest) {
        qrService.updateQr(id, qrUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "QR 삭제", notes = "QR id를 받아 해당 QR을 삭제한다", response = ResponseEntity.class)
    public ResponseEntity<Void> deleteQr(@PathVariable @NotNull Long id) {
        qrService.deleteQr(id);
        return ResponseEntity.noContent().build();
    }
}
