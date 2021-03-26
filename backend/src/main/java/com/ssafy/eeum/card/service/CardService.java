package com.ssafy.eeum.card.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.card.dto.request.CardUpdateRequest;
import com.ssafy.eeum.card.dto.response.CardResponse;
import com.ssafy.eeum.card.repository.AccountCardRepository;
import com.ssafy.eeum.card.repository.CardRepository;
import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.category.domain.CategoryCard;
import com.ssafy.eeum.category.repository.CategoryCardRepository;
import com.ssafy.eeum.category.repository.CategoryRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import com.sun.xml.bind.v2.TODO;
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
    private final AccountRepository accountRepository;
    private final AccountCardRepository accountCardRepository;
    private final CategoryCardRepository categoryCardRepository;

    @Transactional
    public Long save(Account account, String type, Long typeId, String word, MultipartFile image) throws Exception {
        Card card = Card.builder().word(word).build();
        cardRepository.save(card);
        switch (type) {
            case "own":
                account = findAccount(account.getEmail());
                account.addAccountCard(AccountCard.createAccountCard(account, card));
                break;
            case "category":
                Category category = findCategory(typeId);
                category.addCategoryCard(CategoryCard.createCategoryCard(category, card));
                break;
            case "qr":
                break;
        }

        if (image != null) {
            String imageUrl = account.getId() + "/card/" + card.getId();
            card.setImageUrl(imageUrl);
            cardRepository.save(card);

            File folder = new File(filePath + account.getId() + "/card");
            log.info(folder.mkdirs() ? "success make dir" : "fail make dir");

            File file = new File(filePath + imageUrl);
            log.info(file.createNewFile() ? "success make file" : "fail make file");
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(image.getBytes());
            fos.close();
        }

        return card.getId();
    }

    @Transactional(readOnly = true)
    public List<CardResponse> findList(Account account, String type, Long typeId) {
        List<Card> cards = null;
        switch (type) {
            case "own":
                account = findAccount(account.getEmail());
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

    @Transactional(readOnly = true)
    public CardResponse find(Long id) {
        Card card = findCard(id);
        return CardResponse.of(card);
    }

    @Transactional
    public void updateCard(Long id, CardUpdateRequest cardUpdateRequest) {
        Card card = findCard(id);
        Card requestCard = cardUpdateRequest.toCard();
        card.update(requestCard);
    }

    @Transactional
    public void deleteCard(Long id) {
        //TODO:계정 확인 로직 구현?
        List<AccountCard> accountCards = accountCardRepository.findByCardId(id);
        List<CategoryCard> categoryCards = categoryCardRepository.findByCategoryId(id);
        if (accountCards.size() != 0) {
            for (AccountCard accountCard : accountCards) {
                accountCard.setCard(null);
                accountCard.getAccount().deleteAccountCard(accountCard);
                log.info("account card delete");
            }
        } else if (categoryCards.size() != 0) {
            for (CategoryCard categoryCard : categoryCards) {
                categoryCard.setCard(null);
                categoryCard.getCategory().deleteCategoryCard(categoryCard);
                log.info("category card delete");
            }
        }
        Card card = findCard(id);
        File file = new File(filePath + card.getImageUrl());
        if(file.exists()) {
            log.info("file exist");
            log.info(file.delete() ? "success image delete" : "fail image delete");
        }else{
            log.info("file not exist");
        }
        cardRepository.deleteById(id);
    }

    private Card findCard(Long id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.CARD_NOT_FOUND);
                });
    }

    private Category findCategory(Long typeId) {
        return categoryRepository.findById(typeId)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.CATEGORY_NOT_FOUND);
                });
    }

    private Account findAccount(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.USER_NOT_FOUND);
                });
    }
}
