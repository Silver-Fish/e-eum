package com.ssafy.eeum.voice.domain;

import com.ssafy.eeum.account.domain.Account;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "voice")
public class Voice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_id")
    private Long id;

    @Column(unique = true)
    private String word;

    @Lob
    private String voiceUrl;

    private Float voiceLength;

    @Builder
    public Voice(String word, String voiceUrl, Float voiceLength) {
        this.word = word;
        this.voiceUrl = voiceUrl;
        this.voiceLength = voiceLength;
    }

    public void setVoiceUrl(String voiceUrl) {
        this.voiceUrl = voiceUrl;
    }
    public void setVoiceLength(Float voiceLength){
        this.voiceLength = voiceLength;
    }
}
