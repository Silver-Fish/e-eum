package com.ssafy.eeum.voice.controller;

import com.ssafy.eeum.voice.dto.request.VoiceInsertRequest;
import com.ssafy.eeum.voice.service.VoiceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Api(tags = {"5. Voice"})
@RestController
@RequestMapping("voice")
@RequiredArgsConstructor
public class VoiceController {

    private final VoiceService voiceService;

    @PostMapping
    @ApiOperation(value = "미리듣기 음성 생성, http://localhost:8080/api/voice", notes = "단어를 받아 음성을 반환한다.")
    public ResponseEntity<String> getVoice(@RequestBody @Valid VoiceInsertRequest voiceInsertRequest){
        voiceService.findAndSave(voiceInsertRequest.getWord());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{word}")
    @ApiOperation(value = "미리듣기 음성 조회, http://localhost:8080/api/voice/{word:단어}", notes = "단어를 받아 음성을 반환한다.")
    public ResponseEntity<String> findVoice(@PathVariable
                                                @NotBlank @Length(max = 10, message = "단어의 최대 길이는 10자입니다.")
                                                @Pattern(regexp = "^[a-zA-Z0-9가-힣?]*$",message = "단어는 영어 대소문자,숫자,한글,?만 가능합니다.")
                                                @Valid String word){
        String voiceUrl = voiceService.find(word);
        return ResponseEntity.ok().body(voiceUrl);
    }
}
