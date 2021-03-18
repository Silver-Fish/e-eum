package com.ssafy.eeum.card.controller;

import com.ssafy.eeum.card.dto.request.CardInsertRequest;
import com.ssafy.eeum.card.repository.CardRepository;
import com.ssafy.eeum.card.service.CardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.validation.Valid;
import java.io.IOException;

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
    @ApiOperation(value = "카드 등록", notes = "이미지와 단어를 받아서 카드를 등록한다", response = ResponseEntity.class)
    public ResponseEntity<Long> saveCard(Authentication authentication, @RequestParam(value = "type") String type, @RequestParam(value = "word") String word, @RequestParam(value = "file", required = false) MultipartFile image) {
        Long cardNo = null;
        try {
            cardNo = cardService.save((String) (authentication.getPrincipal()), type, word, image);
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return ResponseEntity.ok().body(cardNo);
    }
}
