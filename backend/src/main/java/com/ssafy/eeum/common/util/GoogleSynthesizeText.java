package com.ssafy.eeum.common.util;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.texttospeech.v1.*;
import com.google.common.collect.Lists;
import com.google.protobuf.ByteString;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotCreateException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.IOException;

@Component
public class GoogleSynthesizeText {
    public static String apiPath;

    @Value("${tts.api.key}")
    public void setApiPath(String value) {
        apiPath = value;
    }

    public static ByteString synthesizeText(String text) {
        // credential setting
        GoogleCredentials credentials;
        try {
            credentials = GoogleCredentials.fromStream(new FileInputStream(apiPath))
                    .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"));
        } catch (IOException e) {
            throw new NotCreateException(ErrorCode.CREDENTIAL_FILE_NOT_FOUND);
        }

        // Instantiates a client
        try{
            TextToSpeechSettings settings = TextToSpeechSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(credentials)).build();
            TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(settings);
            // Set the text input to be synthesized
            SynthesisInput input = SynthesisInput.newBuilder().setText(text).build();

            // 음성 : https://cloud.google.com/text-to-speech/docs/voices?hl=ko
            // Build the voice request
            VoiceSelectionParams voice =
                    VoiceSelectionParams.newBuilder()
                            .setLanguageCode("ko-KR")
                            .setSsmlGender(SsmlVoiceGender.FEMALE)
                            .setName("ko-KR-Wavenet-A")
                            .build();

            // Select the type of audio file you want returned
            AudioConfig audioConfig =
                    AudioConfig.newBuilder()
                            .setAudioEncoding(AudioEncoding.MP3) // MP3 audio.
                            .build();

            // Perform the text-to-speech request
            SynthesizeSpeechResponse response =
                    textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

            // Get the audio contents from the response
            ByteString audioContents = response.getAudioContent();

            return audioContents;
        } catch (Exception e) {
            System.out.println(e);
            throw new NotCreateException(ErrorCode.CLIENT_NOT_CREATE);
        }
    }
}
