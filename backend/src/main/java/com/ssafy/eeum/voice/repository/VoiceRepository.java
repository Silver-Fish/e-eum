package com.ssafy.eeum.voice.repository;

import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.voice.domain.Voice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoiceRepository extends JpaRepository<Voice, Long> {
    Optional<Voice> findByWord(String word);

    Boolean existsByWord(String word);
}
