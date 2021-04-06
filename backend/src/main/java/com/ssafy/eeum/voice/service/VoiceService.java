package com.ssafy.eeum.voice.service;

import com.ssafy.eeum.card.dto.request.CardVoiceRequest;
import com.ssafy.eeum.common.exception.CustomFileException;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import com.ssafy.eeum.voice.domain.Voice;
import com.ssafy.eeum.voice.repository.VoiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class VoiceService {
    @Value("${file.path}")
    private String filePath;

    private final VoiceRepository voiceRepository;

    private final RestTemplate restTemplate;

    // 음성 경로 반환
    public String find(String word) {
        word = word.replaceAll("[?]{1,}","?");
        return voiceRepository.findByWord(word).orElseThrow(() -> {
            return new NotFoundException(ErrorCode.VOICE_NOT_FOUND);
        }).getVoiceUrl();
    }

    // 음성 등록
    public Voice findAndSave(String word) {
        word = word.replaceAll("[?]{1,}","?");
        Optional<Voice> voice = voiceRepository.findByWord(word);
        return voice.isEmpty()? save(word):voice.get();
    }

    // 음성 저장
    public Voice save(String word) {
        Voice voice = Voice.builder().word(word).build();
        voiceRepository.save(voice);
        String voiceUrl = "voice/" + voice.getId() + ".wav";
        voice.setVoiceUrl(voiceUrl);

        CardVoiceRequest cardVoiceRequest = new CardVoiceRequest("temp", word + "..........");
        byte[] voice_byte = restTemplate.postForObject("http://ai.e-eum.kr:8088/tts", cardVoiceRequest, byte[].class);

        File folder = new File(filePath + "voice");
        log.info(folder.mkdirs() ? "success make voice dir" : "fail make voice dir");

        try {
            File file = new File(filePath + voiceUrl);
            log.info(file.createNewFile() ? "success make voice" : "fail make voice");
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(voice_byte);
            fos.close();

            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(file);
            AudioFormat format = audioInputStream.getFormat();
            long audioFileLength = file.length();
            int frameSize = format.getFrameSize();
            float frameRate = format.getFrameRate();
            float voiceLength = (audioFileLength / (frameSize * frameRate));
            voice.setVoiceLength(voiceLength);
        } catch (Exception e) {
            throw new CustomFileException(ErrorCode.VOICE_FILE_NOT_SAVE);
        }

        return voice;
    }
}
