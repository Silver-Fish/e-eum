package com.ssafy.eeum.card.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.card.dto.response.CardResponse;
import com.ssafy.eeum.card.repository.CardRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * com.ssafy.eeum.card.service
 * CardService.java
 *
 * @author 이아영
 * @date 2021-03-18 오후 3:16
 * @변경이력
 **/

@Service
@RequiredArgsConstructor
public class CardService {
    @Value("${file.path}")
    private String filePath;

    private final CardRepository cardRepository;
    private final AccountRepository accountRepository;

    public Long save(String email, String type, String typeId, String word, MultipartFile image) throws IOException {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> {return new NotFoundException(ErrorCode.USER_NOT_FOUND);});
        Card card = Card.builder().word(word).build();
        cardRepository.save(card);
        switch (type){
            case "own":
                account.addAccountCard(AccountCard.createAccountCard(account,card));
                break;
            case "category":
                break;
            case "qr":
                break;
        }
        String imageUrl = "card/" + card.getId();
        card.setImageUrl(imageUrl);
        cardRepository.save(card);

        File file = new File(filePath+imageUrl);
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(image.getBytes());
        fos.close();
        return card.getId();
    }

    public List<CardResponse> findList(String email, String type, String typeId){
        List<Card> cards = null;
        switch(type){
            case "own":
                Account account = accountRepository.findByEmail(email)
                        .orElseThrow(() -> {return new NotFoundException(ErrorCode.USER_NOT_FOUND);});
                cards = account.getCards();
                break;
            case "category":
                break;
            case "qr":
                break;
        }
        return CardResponse.listOf(cards);
    }
}
