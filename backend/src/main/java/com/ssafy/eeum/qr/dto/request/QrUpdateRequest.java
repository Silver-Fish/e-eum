package com.ssafy.eeum.qr.dto.request;

import com.ssafy.eeum.qr.domain.QR;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * com.ssafy.eeum.qr.dto.request
 * QrUpdateRequest.java
 * @date    2021-04-07 오후 5:11
 * @author  차수연
 *
 * @변경이력
 **/

@NoArgsConstructor
@Getter
@ApiModel(description = "QR 수정 모델")
public class QrUpdateRequest {
    @ApiModelProperty(value = "제목")
    @NotBlank
    @Length(max = 10, message = "제목의 최대 길이는 10자입니다.")
    private String title;

    public QR toQr() {
        return QR.builder()
                .title(title)
                .build();
    }
}
