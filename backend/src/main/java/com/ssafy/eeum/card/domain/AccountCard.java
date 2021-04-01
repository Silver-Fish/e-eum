package com.ssafy.eeum.card.domain;

import com.ssafy.eeum.account.domain.Account;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

/**
 * com.ssafy.eeum.card.domain
 * AccountCard.java
 * @date    2021-03-19 오전 2:03
 * @author  이아영
 *
 * @변경이력
 **/

@Entity
@Getter
public class AccountCard {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "account_card_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private Card card;

    public static AccountCard createAccountCard(Account account, Card card) {
        AccountCard accountCard = new AccountCard();
        accountCard.setAccount(account);
        accountCard.setCard(card);
        return accountCard;
    }

    public void setAccount(Account account){
        this.account = account;
    }

    public void setCard(Card card){
        this.card = card;
    }
}