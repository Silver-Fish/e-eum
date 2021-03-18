package com.ssafy.eeum.image.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.nio.file.Files;

@Api(tags = {"6. Image"})
@RestController
@RequiredArgsConstructor
@RequestMapping("image")
public class ImageController {
    @Value("${file.path}")
    private String filePath;

    @GetMapping("/{type}/{id}")
    public ResponseEntity<?> getImage(@PathVariable("type") String type, @PathVariable("id") String id) throws Exception {
        File image = new File(filePath + type+ "/" + id);
        HttpHeaders header = new HttpHeaders();
        header.add("Content-Type", Files.probeContentType(image.toPath()));
        byte[] imagearr = FileCopyUtils.copyToByteArray(image);
        return new ResponseEntity<>(imagearr, header, HttpStatus.OK);
    }
}
