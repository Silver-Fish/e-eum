package com.ssafy.eeum.card.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.card.dto.response.CardResponse;
import com.ssafy.eeum.card.service.CardService;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.List;

/**
 * com.ssafy.eeum.card.controller
 * CardController.java
 * @date 2021-03-18 오후 5:04
 * @author 이아영
 *
 * @변경이력
 **/

@Api(tags = {"2. Card"})
@RestController
@RequiredArgsConstructor
@RequestMapping("card")
public class CardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CardService cardService;

    @PostMapping
    @ApiOperation(value = "카드 등록", notes = "타입(own, category, qr), 이미지, 단어를 받아서 카드를 등록한다", response = ResponseEntity.class)
    public ResponseEntity<Long> saveCard(@CurrentAccount Account account, @RequestParam(value = "type") String type, @RequestParam(value = "typeId", required = false) Long typeId, @RequestParam(value = "word") String word, @RequestParam(value = "file", required = false) MultipartFile image) throws Exception{
        Long cardNo = null;
        cardNo = cardService.save(account, type, typeId, word, image);
        return ResponseEntity.ok().body(cardNo);
    }

    @GetMapping()
    @ApiOperation(value = "개별 카드 리스트 조회", notes = "카드 id를 받아 카드리스트를 조회한다.", response = ResponseEntity.class)
    public ResponseEntity<CardResponse> getCard(@RequestParam @NotNull Long id) {
        CardResponse cardResponse = cardService.find(id);
        return ResponseEntity.ok().body(cardResponse);
    }

    @GetMapping("/{type}")
    @ApiOperation(value = "카드 리스트 조회", notes = "타입(own, category, qr)과 타입의 번호(ex.category_id)를 받아 카드리스트를 조회. own의 경우 타입번호 미입력", response = ResponseEntity.class)
    public ResponseEntity<List<CardResponse>> getCardList(@CurrentAccount Account account, @PathVariable String type, @RequestParam(required = false) Long typeId) {
        List<CardResponse> cardResponses = cardService.findList(account,type, typeId);
        return ResponseEntity.ok().body(cardResponses);
    }


}
