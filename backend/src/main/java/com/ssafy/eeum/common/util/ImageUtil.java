package com.ssafy.eeum.common.util;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.boot.Metadata;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;

/**
 * com.ssafy.eeum.common.util
 * ImageUtil.java
 *
 * @author 이아영
 * @date 2021-04-05 오후 2:16
 * @변경이력
 **/

@Slf4j
public class ImageUtil {
    static final int maxWidth = 900;

    public static void save(String path, MultipartFile image) throws Exception {
        File file = new File(path);
        log.info(file.createNewFile() ? "success make file" : "fail make file");
        BufferedImage bufferedImage = ImageIO.read(image.getInputStream());
        ImageIO.write(resize(1, bufferedImage), "png", file);
    }

    private static BufferedImage resize(int orientation, BufferedImage image) throws Exception {
        int newWidth = image.getWidth(null);
        int newHeigt = image.getHeight(null);

        if (newWidth > maxWidth) {
            log.info("resize image");
            newWidth = maxWidth;
            newHeigt = maxWidth * newWidth / newHeigt;
        }

        // 이미지 리사이즈
        // Image.SCALE_DEFAULT : 기본 이미지 스케일링 알고리즘 사용
        // Image.SCALE_FAST    : 이미지 부드러움보다 속도 우선
        // Image.SCALE_REPLICATE : ReplicateScaleFilter 클래스로 구체화 된 이미지 크기 조절 알고리즘
        // Image.SCALE_SMOOTH  : 속도보다 이미지 부드러움을 우선
        // Image.SCALE_AREA_AVERAGING  : 평균 알고리즘 사용

        Image resizeImage = image.getScaledInstance(newWidth, newHeigt, Image.SCALE_SMOOTH);
        BufferedImage newImage = new BufferedImage(newWidth, newHeigt, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = newImage.createGraphics();

        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setRenderingHint(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_ENABLE);
        g.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);

        g.drawImage(resizeImage, 0, 0, null);
        g.dispose();

        return newImage;
    }

    public static void deleteFile(String path, String url) {
        File file = new File(path + url);
        if (file.exists() && !url.equals("0/default.svg")) {
            file.delete();
        } else {
            log.info("file not exist or default image");
        }
    }
}
