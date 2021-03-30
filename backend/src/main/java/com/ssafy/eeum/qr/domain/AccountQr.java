package com.ssafy.eeum.qr.domain;

import com.ssafy.eeum.account.domain.Account;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class AccountQr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_qr_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qr_id")
    private QR qr;

    public static AccountQr createAccountQr(Account account, QR qr) {
        AccountQr accountQr = new AccountQr();
        accountQr.setAccount(account);
        accountQr.setQr(qr);
        return accountQr;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public void setQr(QR qr) { this.qr = qr; }
}
