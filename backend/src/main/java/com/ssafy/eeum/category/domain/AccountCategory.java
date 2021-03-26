package com.ssafy.eeum.category.domain;

import com.ssafy.eeum.account.domain.Account;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class AccountCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public static AccountCategory createAccountCategory(Account account, Category category) {
        AccountCategory accountCategory = new AccountCategory();
        accountCategory.setAccount(account);
        accountCategory.setCategory(category);
        return accountCategory;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public void setCategory(Category category) { this.category = category; }
}
