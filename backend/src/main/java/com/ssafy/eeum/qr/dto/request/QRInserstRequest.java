package com.ssafy.eeum.qr.dto.request;

import com.ssafy.eeum.qr.domain.QR;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@Getter
@ApiModel(description = "QR 등록 모델")
public class QRInserstRequest {
    @ApiModelProperty(value="제목")
    @NotBlank
    @Length(max = 10,message = "제목의 최대 길이는 10자입니다.")
    private String title;

    public QRInserstRequest(@NotBlank @Length(max = 10, message = "제목의 최대 길이는 10자입니다.") String title) {
        this.title = title;
    }

    public QR toQR(){
        return QR.builder()
                .title(title)
                .build();
    }
}
