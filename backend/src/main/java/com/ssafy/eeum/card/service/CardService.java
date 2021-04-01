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
import com.ssafy.eeum.qr.domain.QR;
import com.ssafy.eeum.qr.domain.QrCard;
import com.ssafy.eeum.qr.repository.QrCardRepository;
import com.ssafy.eeum.qr.repository.QrRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Value("${file.defaultpath}")
    private String defaultPath;

    @Value("${eeum.defaultemail}")
    private String defaultEmail;

    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;
    private final AccountCardRepository accountCardRepository;
    private final CategoryCardRepository categoryCardRepository;
    private final QrRepository qrRepository;
    private final QrCardRepository qrCardRepository;

    @Transactional
    public Long save(Account account, String type, Long typeId, String word, MultipartFile image) throws Exception {
        Card card = Card.builder().word(word).build();
        cardRepository.save(card);
        switch (type) {
            case "own":
                account = findAccount(account == null ? defaultEmail : account.getEmail());
                account.addAccountCard(AccountCard.createAccountCard(account, card));
                break;
            case "category":
                Category category = findCategory(typeId);
                category.addCategoryCard(CategoryCard.createCategoryCard(category, card));
                break;
            case "qr":
                QR qr = findQR(typeId);
                qr.addQRCard(QrCard.createQRCard(qr,card));
                break;
        }

        if (image != null && !image.isEmpty()) {
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
        } else {
            card.setImageUrl(defaultPath);
        }


        card.setVoiceUrl("2/voice/2.wav");

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
                QR qr = findQR(typeId);
                cards = qr.getCards();
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
        List<CategoryCard> categoryCards = categoryCardRepository.findByCardId(id);
        List<QrCard> qrCards = qrCardRepository.findByCardId(id);
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
        } else if (qrCards.size()!=0){
            for (QrCard qrCard : qrCards) {
                qrCard.setCard(null);
                qrCard.getQr().deleteQrCard(qrCard);
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

    public List<CardResponse> searchCardByKeyword(Account account, String keyword) {
        account = findAccount(account.getEmail());
        List<Card> cards = new ArrayList<>();
        Set<String> words = new HashSet<>();
        accountCardRepository.findByKeyword(keyword, account).stream().filter(accountCard ->
                !words.contains(accountCard.getCard().getWord()) && cards.size() < 4
        ).forEach(accountCard -> {
            words.add(accountCard.getCard().getWord());
            cards.add(accountCard.getCard());
        });
        categoryCardRepository.findByKeyword(keyword, account).stream().filter(categoryCard ->
                !words.contains(categoryCard.getCard().getWord()) && cards.size() < 4
        ).forEach(categoryCard -> {
            words.add(categoryCard.getCard().getWord());
            cards.add(categoryCard.getCard());
        });
        return CardResponse.listOf(cards);
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

    private QR findQR(Long typeId){
        return qrRepository.findById(typeId)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.QR_NOT_FOUND);
                });
    }
}
