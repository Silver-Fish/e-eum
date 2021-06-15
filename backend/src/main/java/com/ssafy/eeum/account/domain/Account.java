package com.ssafy.eeum.account.domain;

import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.card.domain.Card;
import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.qr.domain.QR;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * com.ssafy.eeum.account.domain
 * Account.java
 * @date    2021-03-16 오후 8:45
 * @author  이주희
 *
 * @변경이력
 **/

@Entity
@Getter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_GUEST;

    @CreationTimestamp
    private LocalDateTime createDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval=true)
    private List<AccountCard> accountCards = new ArrayList<>();

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval=true)
    private List<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval=true)
    private List<QR> qrs = new ArrayList<>();

    public Account() {}

    @Builder
    public Account(@NotNull @Email String email, @NotNull String password, @NotNull String name, @NotNull UserRole role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public List<Card> getCards(){
        return accountCards.stream()
                .map(AccountCard::getCard)
                .collect(Collectors.toList());
    }

    public void addAccountCard(AccountCard accountCard){
        accountCards.add(accountCard);
    }
                
    public void addCategory(Category category) {
        categories.add(category);
        category.setAccount(this);
    }

    public void addQr(QR qr) {
        qrs.add(qr);
        qr.setAccount(this);
    }

    public void deleteAccountCard(AccountCard accountCard){accountCards.remove(accountCard);}

    public void deleteCategory(Category category) {
        categories.remove(category);
    }

    public void deleteQR(QR qr) {
        qrs.remove(qr);
    }
}
