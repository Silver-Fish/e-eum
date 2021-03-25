package com.ssafy.eeum.card.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.card.dto.response.CardResponse;
import com.ssafy.eeum.card.repository.CardRepository;
import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.category.domain.CategoryCard;
import com.ssafy.eeum.category.repository.CategoryRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

/**
 * com.ssafy.eeum.card.service
 * CardService.java
 *
 * @author 이아영
 * @date 2021-03-18 오후 3:16
 * @변경이력
 **/

@Slf4j
@Service
@RequiredArgsConstructor
public class CardService {
    @Value("${file.path}")
    private String filePath;

    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public Long save(Account account, String type, Long typeId, String word, MultipartFile image) throws Exception {
        Card card = Card.builder().word(word).build();
        cardRepository.save(card);
        switch (type){
            case "own":
                account.addAccountCard(AccountCard.createAccountCard(account,card));
                break;
            case "category":
                Category category = findCategory(typeId);
                category.addCategoryCard(CategoryCard.createCategoryCard(category,card));
                break;
            case "qr":
                break;
        }
        String imageUrl = account.getId() + "/card/" + card.getId();
        card.setImageUrl(imageUrl);
        cardRepository.save(card);

        File folder = new File(filePath+account.getId() + "/card");
        log.info(folder.mkdirs() ? "success make dir" : "fail make dir");

        File file = new File(filePath+imageUrl);
        log.info(file.createNewFile()?"success make file":"fail make file");
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(image.getBytes());
        fos.close();

        return card.getId();
    }

    private Category findCategory(Long typeId){
        return categoryRepository.findById(typeId)
                .orElseThrow(()->{return new NotFoundException(ErrorCode.CATEGORY_NOT_FOUND);});
    }

    public List<CardResponse> findList(Account account, String type, Long typeId){
        List<Card> cards = null;
        switch(type){
            case "own":
                cards = account.getCards();
                break;
            case "category":
                Category category = findCategory(typeId);
                cards = category.getCards();
                break;
            case "qr":
                break;
        }
        return CardResponse.listOf(cards);
    }

    public CardResponse find(Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> {return new NotFoundException(ErrorCode.CARD_NOT_FOUND);});
        return CardResponse.of(card);
    }


}
