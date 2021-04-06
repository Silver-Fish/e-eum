package com.ssafy.eeum.card.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.card.dto.request.CardUpdateRequest;
import com.ssafy.eeum.card.dto.response.CardResponse;
import com.ssafy.eeum.card.service.CardService;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * com.ssafy.eeum.card.controller
 * CardController.java
 *
 * @author 이아영
 * @date 2021-03-18 오후 5:04
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
    @ApiOperation(value = "카드 등록, http://localhost:8080/api/card, data={type:타입, typeId:타입의 id, word:단어, file:이미지파일}", notes = "타입(own, category, qr), 이미지, 단어를 받아서 카드를 등록한다")
    public ResponseEntity<Long> saveCard(@ApiIgnore @CurrentAccount Account account, @RequestParam(value = "type") @NotBlank String type, @RequestParam(value = "typeId", required = false) Long typeId, @RequestParam(value = "word") @NotBlank String word, @RequestParam(value = "file", required = false) MultipartFile image) throws Exception {
        Long cardNo = null;
        cardNo = cardService.save(account, type, typeId, word, image);
        return ResponseEntity.ok().body(cardNo);
    }

    @GetMapping()
    @ApiOperation(value = "개별 카드 리스트 조회, http://localhost:8080/api/card/{id:카드아이디}", notes = "카드 id를 받아 카드리스트를 조회한다.")
    public ResponseEntity<CardResponse> getCard(@RequestParam @NotNull Long id) {
        CardResponse cardResponse = cardService.find(id);
        return ResponseEntity.ok().body(cardResponse);
    }

    @GetMapping("/{type}")
    @ApiOperation(value = "카드 리스트 조회, http://localhost:8080/api/card/{type:타입}?typeId={typeId:타입의 id}", notes = "타입(own, category, qr)과 타입의 번호(ex.category_id)를 받아 카드리스트를 조회. own의 경우 타입번호 미입력")
    public ResponseEntity<List<CardResponse>> getCardList(@ApiIgnore @CurrentAccount Account account, @PathVariable @NotBlank String type, @RequestParam(required = false) Long typeId) {
        List<CardResponse> cardResponses = cardService.findList(account, type, typeId);
        return ResponseEntity.ok().body(cardResponses);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "카드 수정, http://localhost:8080/api/card/{id:카드아이디}, data={word:단어}", notes = "카드 id를 받아 카드리스트를 수정한다.")
    public ResponseEntity<Void> updateCard(@PathVariable @NotNull Long id, @RequestBody @Valid CardUpdateRequest cardUpdateRequest) throws Exception{
        cardService.updateCard(id, cardUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "카드 삭제, http://localhost:8080/api/card/{id:카드아이디}", notes = "카드 id를 받아 카드리스트를 삭제한다.")
    public ResponseEntity<Void> deleteCard(@PathVariable @NotNull Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/{keyword}")
    @ApiOperation(value = "카드 검색, http://localhost:8080/api/card/search/{keyword:검색할 키워드}", notes = "keyword를 받아 나만의 이음과 상황별 이음에 있는 카드를 검색하여 반환한다.")
    public ResponseEntity<List<CardResponse>> searchByKeyword(@ApiIgnore @CurrentAccount Account account, @PathVariable @NotNull String keyword) {
        List<CardResponse> cardResponses = cardService.searchCardByKeyword(account, keyword);
        return ResponseEntity.ok().body(cardResponses);
    }
}
