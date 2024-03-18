package com.contiq.fileservice.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;


@Slf4j
public class Helper {
    @Autowired
    private RestTemplate restTemplate;
    public String extractTextFromPDF(byte[] pdfData) throws IOException {
        try (PDDocument document = PDDocument.load(pdfData)) {
            PDFTextStripper pdfTextStripper = new PDFTextStripper();
            return pdfTextStripper.getText(document);
        } catch (Exception e) {
            log.error("error {}",e.getMessage());
            return null;
        }

        }

//    public String sanitizeId(String userId) {
////        String apiUrl = "http://localhost:USER-SERVICE/api/users/" + userId;
////        UserDto userDto = restTemplate.getForObject(apiUrl, UserDto.class);
//
//        if (userDto != null) {
//            String desiredField = userDto.getId();
//            return desiredField;
//        } else {
//
//            return null;
//        }
//    }

}

