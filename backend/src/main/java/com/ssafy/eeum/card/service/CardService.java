package com.ssafy.eeum.card.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.card.dto.request.CardUpdateRequest;
import com.ssafy.eeum.card.dto.request.CardVoiceRequest;
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
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
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
@Transactional
public class CardService {

    @Value("${file.path}")
    private String filePath;

    @Value("${file.defaultpath}")
    private String defaultPath;

    @Value("${eeum.defaultemail}")
    private String defaultEmail;

    private final RestTemplate restTemplate;

    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;
    private final AccountCardRepository accountCardRepository;
    private final CategoryCardRepository categoryCardRepository;
    private final QrRepository qrRepository;
    private final QrCardRepository qrCardRepository;

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
                QR qr = findQR(typeId);
                qr.addQRCard(QrCard.createQRCard(qr, card));
                break;
        }

        // 음성 파일 처리
        CardVoiceRequest cardVoiceRequest = new CardVoiceRequest(card.getId().toString(), word + '.');
        byte[] voice = restTemplate.postForObject("http://ai.e-eum.kr:8088/tts", cardVoiceRequest, byte[].class);
        String voiceUrl = account.getId() + "/voice/" + card.getId() + ".wav";
        card.setVoiceUrl(voiceUrl);

        File folder = new File(filePath + account.getId() + "/voice");
        log.info(folder.mkdirs() ? "success make dir" : "fail make dir");

        File file = new File(filePath + voiceUrl);
        log.info(file.createNewFile() ? "success make file" : "fail make file");
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(voice);
        fos.close();

        AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(file);
        AudioFormat format = audioInputStream.getFormat();
        long audioFileLength = file.length();
        int frameSize = format.getFrameSize();
        float frameRate = format.getFrameRate();
        float voiceLength = (audioFileLength / (frameSize * frameRate));
        card.setVoiceLength(voiceLength);

        if (image != null && !image.isEmpty()) {
            String imageUrl = account.getId() + "/card/" + card.getId();
            card.setImageUrl(imageUrl);

            folder = new File(filePath + account.getId() + "/card");
            log.info(folder.mkdirs() ? "success make dir" : "fail make dir");

            file = new File(filePath + imageUrl);
            log.info(file.createNewFile() ? "success make file" : "fail make file");
            fos = new FileOutputStream(file);
            fos.write(image.getBytes());
            fos.close();
        } else {
            card.setImageUrl(defaultPath);
        }

        return card.getId();
    }

    @Transactional(readOnly = true)
    public List<CardResponse> findList(Account account, String type, Long typeId) {
        List<Card> cards = null;
        switch (type) {
            case "own":
                account = findAccount(account == null ? defaultEmail : account.getEmail());
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

    @Transactional(readOnly = true)
    public String findVoice(Account account, String word) throws Exception {
        File folder = new File(filePath + account.getId() + "/voice");
        log.info(folder.mkdirs() ? "success make dir" : "fail make dir");

        // temp로 시작하는 파일을 가져온다.
        File[] preFileList = folder.listFiles(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.startsWith("temp");
            }
        });

        // 현재 저장되어있는 음성과 새로 들어온 단어가 다른지 확인하기 위해 파일이름 용도의 단어로 변경경
        // 파일에는?가 못 들어가므로 여러 개의 물음표를 _qum(question_mark)로 바꿈
        String file_word = word.replaceAll("[?]{1,}", "_qum");
        log.info("word: " + word + " / file_word: " + file_word);

        String voiceUrl = "";
        if (preFileList.length == 0 || !file_word.equals(preFileList[0].getName().substring(5, preFileList[0].getName().length() - 4))) {
            log.info("voice remake");

            // 음성 파일 처리
            CardVoiceRequest cardVoiceRequest = new CardVoiceRequest("temp", word + '.');
            byte[] voice = restTemplate.postForObject("http://ai.e-eum.kr:8088/tts", cardVoiceRequest, byte[].class);
            voiceUrl = account.getId() + "/voice/temp_" + file_word + ".wav";

            File file = new File(filePath + voiceUrl);
            log.info(file.createNewFile() ? "success make voice" : "fail make voice");
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(voice);
            fos.close();

            // 기존 음성 삭제
            for (File prefile : preFileList) {
                if (prefile.exists()) {
                    log.info("file exist");
                    log.info(prefile.delete() ? "success voice delete" : "fail voice delete");
                } else {
                    log.info("file not exist");
                }
            }
        } else {
            log.info("voice not remake");
            // 같은 단어가 들어오면 음성을 새로 만들 필요없이 기존 음성으로 반환
            voiceUrl = account.getId() + "/voice/" + preFileList[0].getName();
        }
        return voiceUrl;
    }

    public void updateCard(Long id, CardUpdateRequest cardUpdateRequest) throws Exception {
        Card card = findCard(id);
        if (!card.getWord().equals(cardUpdateRequest.getWord())) {
            Card requestCard = cardUpdateRequest.toCard();
            card.update(requestCard);

            // 음성 파일 처리
            CardVoiceRequest cardVoiceRequest = new CardVoiceRequest(card.getId().toString(), card.getWord() + '.');
            byte[] voice = restTemplate.postForObject("http://ai.e-eum.kr:8088/tts", cardVoiceRequest, byte[].class);

            File file = new File(filePath + card.getVoiceUrl());
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(voice);
            fos.close();

            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(file);
            AudioFormat format = audioInputStream.getFormat();
            long audioFileLength = file.length();
            int frameSize = format.getFrameSize();
            float frameRate = format.getFrameRate();
            float voiceLength = (audioFileLength / (frameSize * frameRate));
            card.setVoiceLength(voiceLength);
        }
    }

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
        } else if (qrCards.size() != 0) {
            for (QrCard qrCard : qrCards) {
                qrCard.setCard(null);
                qrCard.getQr().deleteQrCard(qrCard);
                log.info("qr card delete");
            }
        }

        Card card = findCard(id);

        // 음성 삭제
        File file = new File(filePath + card.getVoiceUrl());
        if (file.exists()) {
            log.info("file exist");
            log.info(file.delete() ? "success voice delete" : "fail voice delete");
        } else {
            log.info("file not exist");
        }

        // 이미지 삭제
        file = new File(filePath + card.getImageUrl());
        if (file.exists()) {
            log.info("file exist");
            log.info(file.delete() ? "success image delete" : "fail image delete");
        } else {
            log.info("file not exist");
        }
        cardRepository.deleteById(id);
    }

    public List<CardResponse> searchCardByKeyword(Account account, String keyword) {
        account = findAccount(account == null ? defaultEmail : account.getEmail());
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

    private QR findQR(Long typeId) {
        return qrRepository.findById(typeId)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.QR_NOT_FOUND);
                });
    }
}
