package com.ssafy.eeum.account.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.domain.UserRole;
import com.ssafy.eeum.account.dto.reponse.AccountSimpleResponse;
import com.ssafy.eeum.account.dto.request.*;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.card.repository.CardRepository;
import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.category.domain.CategoryCard;
import com.ssafy.eeum.category.repository.CategoryRepository;
import com.ssafy.eeum.category.service.CategoryService;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import com.ssafy.eeum.common.exception.NotMatchException;
import com.ssafy.eeum.common.util.ImageUtil;
import com.ssafy.eeum.qr.service.QrService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * com.ssafy.eeum.account.service
 * AccountService.java
 * @date    2021-03-16 오후 8:44
 * @author  이주희
 *
 * @변경이력
 **/

@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final QrService qrService;
    private final CategoryService categoryService;

    @Value("${eeum.defaultemail}")
    private String defaultemail;
    @Value("${file.path}")
    private String filePath;
    @Value("${file.defaultpath}")
    private String defaultPath;

    private final Long OWN = 0L;

    public Account createAccount(SingupRequest singup) {
        Account account = Account.builder()
                .email(singup.getEmail())
                .password(passwordEncoder.encode(singup.getPassword()))
                .name(singup.getName())
                .role(UserRole.ROLE_USER)
                .build();
        Account saved = this.accountRepository.save(account);

        accountRepository.findByEmail(defaultemail).ifPresent(def -> {
            copyData(saved, def);
        });

        return saved;
    }

    private void copyData(Account account, Account defAccount) {
        defAccount.getCards().stream().forEach(card -> {
            saveCard(account, defAccount, card, OWN);
        });
        defAccount.getCategories().stream().forEach(category -> {
            Long categoryId = saveCategory(account, defAccount, category);
            category.getCards().stream().forEach(card -> {
                saveCard(account, defAccount, card, categoryId);
            });
        });
    }

    private Long saveCategory(Account account, Account defAccount, Category defCategory) {
        Category category = Category.builder().word(defCategory.getWord()).build();
        account.addCategory(category);
        categoryRepository.save(category);

        if (defCategory.getCategoryImageUrl().equals(defaultPath)) {
            category.setCategoryImageUrl(defaultPath);
            return category.getId();
        }


        categoryRepository.save(category);
        boolean copyResult = ImageUtil.copyFile(filePath + defCategory.getCategoryImageUrl(),
                filePath + account.getId() + "/category", category.getId().toString());
        if (!copyResult)
            category.setCategoryImageUrl(defaultPath);
        else
            category.setCategoryImageUrl(account.getId() + "/category/" + category.getId());

        return category.getId();
    }

    private void saveCard(Account account, Account defAccount, Card defCard, Long type) {
        Card card = Card.builder().word(defCard.getWord()).voice(defCard.getVoice()).build();
        cardRepository.save(card);
        if (type == OWN) {
            account.addAccountCard(AccountCard.createAccountCard(account, card));
        } else {
            Category category = getCategory(type);
            category.addCategoryCard(CategoryCard.createCategoryCard(category, card));
        }

        if (defCard.getImageUrl().equals(defaultPath)) {
            card.setImageUrl(defaultPath);
            return;
        }

        cardRepository.save(card);
        boolean copyResult = ImageUtil.copyFile(filePath + defCard.getImageUrl(),
                filePath + account.getId() + "/card", card.getId().toString());
        if (!copyResult)
            card.setImageUrl(defaultPath);
        else
            card.setImageUrl(account.getId() + "/card/" + card.getId());
    }

    @Transactional(readOnly = true)
    public AccountSimpleResponse findAccount(Account account) {
        Account result = getAccount(account.getEmail());
        return AccountSimpleResponse.of(result);
    }

    @Transactional(readOnly = true)
    public boolean checkDuplicateEmail(String email) {
        return !accountRepository.findByEmail(email).isEmpty();
    }

    @Transactional(readOnly = true)
    public boolean checkPassword(PasswordRequest passwordRequest, Account account) {
        return passwordEncoder.matches(passwordRequest.getPassword(), account.getPassword());
    }

    public void updatePassword(UpdatePwRequest updatePwRequest, Account account) {
        if (!passwordEncoder.matches(updatePwRequest.getCurrentPw(), account.getPassword()))
            throw new NotMatchException(ErrorCode.NOT_MATCH_PW);
        Account result = getAccount(account.getEmail());
        result.setPassword(passwordEncoder.encode(updatePwRequest.getNewPw()));
        accountRepository.save(result);
    }

    @Transactional(readOnly = true)
    public void checkAcount(AccountRequest accountRequest) {
        Account account = getAccount(accountRequest.getEmail());
        if (!account.getName().equals(accountRequest.getName()))
            throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
    }

    public void resetPassword(LoginRequest loginRequest) {
        Account account = getAccount(loginRequest.getEmail());
        account.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        accountRepository.save(account);
    }

    public void deleteAccount(Account account) {
        account = getAccount(account.getEmail());
        account.getAccountCards().stream().forEach(accountCard -> {
            ImageUtil.deleteFile(filePath, accountCard.getCard().getImageUrl());
        });
        account.getCategories().stream().forEach(category -> {
            ImageUtil.deleteFile(filePath, category.getCategoryImageUrl());
            category.getCards().stream().forEach(card -> {
                ImageUtil.deleteFile(filePath, card.getImageUrl());
            });
        });
        account.getQrs().stream().forEach(qr -> {
            qr.getCards().stream().forEach(card -> {
                ImageUtil.deleteFile(filePath, card.getImageUrl());
            });
        });

        accountRepository.delete(account);
    }

    private Account getAccount(String email) {
        Account account = accountRepository.findByEmail(email).orElseThrow(
                () -> {
                    return new NotFoundException(ErrorCode.USER_NOT_FOUND);
                }
        );
        return account;
    }

    private Category getCategory(Long type) {
        return categoryRepository.findById(type).orElseThrow(
                () -> {
                    return new NotFoundException(ErrorCode.CATEGORY_NOT_FOUND);
                });
    }

}
