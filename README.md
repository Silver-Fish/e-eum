# 이음

![](./image/header.gif)

보완대체의사소통(AAC)을 통해 언어 표현 및 이해에 어려움을 가진 사람들의 소통을 지원하는 서비스입니다.

AAC 서비스 제공자는 QR코드를 통해 AAC 사용자에게 지정된 의사소통 카드를 보여줄 수 있습니다.

<br>

<a href="https://e-eum.kr" style ="color:#8A9C3A">이음 사이트 링크 (모바일 권장)</a>

#### QR코드로 이음 서비스 체험하기

![](./image/QR샘플.png)

스마트폰으로 QR코드를 촬영하면 이음 사이트에 접속 가능합니다.

<br>

## 주요 기능

#### 1. QR코드를 통한 공유

* **직접 생성한 의사소통 카드 목록**을 QR코드를 통해 타인에게 보여줄 수 있습니다.

![](./image/QR1.gif)

* 타인의 카드 목록을 **QR코드를 통해 내 목록에 복사**할 수 있습니다.

![](./image/QR2.gif)

<br>

#### 2. 개인 맞춤형 

* **기본적인 의사소통을 위한 TTS카드**가 제공됩니다.
* 여러 카드의 **음성을 한번에 재생**할 수 있습니다.

* 로그인하면 **나만의 카드**를 생성할 수 있습니다.

![](./image/card.gif)

<br>

#### 3. 상황별로 분류해 편리한 의사소통

* 로그인하면 **나만의 카테고리를 생성**할 수 있습니다.

* **여러 카테고리의 카드를 동시에** 사용할 수 있습니다.
* 카드를 **상황(카테고리)별로 분류해 사용**할 수 있습니다.

![](./image/category.gif)

<br>

## 사용방법

#### Git

```bash
git clone "https://lab.ssafy.com/s04-ai-speech-sub3/s04p23b104.git"
```

<br>

#### Front End

* FE module install

```bash
npm i
```

* FE `.env` template

```
REACT_APP_API_URL=[해당 api 경로]
REACT_APP_IMG_PATH=[이미지 데이터 경로]
```

<br>

#### Back End

* `/backend/src/main/resiurces/application.properties` 추가
  * `application.properties` template

```java
#DB
spring.datasource.driverClassName=org.mariadb.jdbc.Driver
spring.datasource.url={DB_URL}
spring.datasource.username={DB_사용자_이름}
spring.datasource.password={DB_비밀번호}
server.port={port_번호}

#jpa
spring.jpa.hibernate.ddl-auto=update

#jpa query option
#spring.jpa.show-sql=true
#spring.jpa.properties.hibernate.format_sql=true

#spring.devtools.livereload.enabled=true
#spring.freemarker.cache=false
#spring.thymeleaf.cache=false
server.servlet.context-path=/api

#file path
file.path = {파일_저장_경로}
file.defaultpath = {사진_미등록_시_적용될_기본_사진_경로}

#default account
eeum.defaultemail = {미리_가입해놓은_기본_이메일}

# QR API
apiId={네이버_QR_API_ID}
apiPassword={네이버_QR_API_비밀번호}
```

<br>

* `/backend/src/main/java/com/ssafy/eeum/common/security/JwtProperties.java` 추가
  * JwtProperties template

```java
package com.ssafy.eeum.common.security;

public class JwtProperties {
    public static final String SECRET = "{JWT_SECRET}";
    public static final int EXPIRATION_TIME = {JWT_기간};
    public static final String TOKEN_PREFIX = "{JWT_Prefix}";
    public static final String HEADER_STRING = "{JWT_Header}";
}

```



#### 실행

* Front End 실행 스크립트

```bash
npm start
```

* Back End 실행 스크립트

```bash
cd ./backend
gradlew clean build
java -jar {생성된jar파일이름}
```



<br>

## 기술 스택

### Front End

![React](https://img.shields.io/badge/React-17.0.1-61DAFB?Style=flat&logo=React&logoColor=61DAFB)


#### 📚사용된 라이브러리   ----------------------

![Axios](https://img.shields.io/badge/Axios-0.21.1-61DAFB?Style=flat&logo=React&logoColor=61DAFB)
![ClassNames](https://img.shields.io/badge/ClassNames-2.2.6-61DAFB?Style=flat&logo=React&logoColor=61DAFB)

<br>

### Back End

![Gradle](https://img.shields.io/badge/Gradle-6.8.3-02303A?Style=flat&logo=Gradle&logoColor=02303A)
![JAVA ](https://img.shields.io/badge/JAVA_JDK-11-007396?Style=flat&logo=Java&logoColor=007396)
![SpringBoot](https://img.shields.io/badge/SpringBoot-2.4.4-6DB33F?Style=flat&logo=Spring&logoColor=6DB33F)
![MariaDB](https://img.shields.io/badge/MariaDB(AWS_RDS)-10.4.6-61DAFB?Style=flat&logo=MariaDB&logoColor=61DAFB)

#### 📚사용된 라이브러리   ----------------------
![Lombok](https://img.shields.io/badge/Lombok-1.18.18-BC4521?Style=flat)
![spring-jpa](https://img.shields.io/badge/Spring_jpa-2.4.4-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![spring-validation](https://img.shields.io/badge/Spring_validation-2.4.4-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![Swagger](https://img.shields.io/badge/Swagger-2.9.2-85EA2D?Style=flat&logo=Swagger&logoColor=85EA2D)
![spring-security](https://img.shields.io/badge/Spring_security-2.4.4-6DB33F?Style=flat&logo=Spring&logoColor=85EA2D)
![Zxing Core](https://img.shields.io/badge/Zxing_Core-3.3.3-4285F4?Style=flat&logo=Google&logoColor=4285F4)
![MariaDB Java Client](https://img.shields.io/badge/MariaDB_Java_Client-2.7.2-61DAFB?Style=flat&logo=MariaDB&logoColor=61DAFB)
![java-jwt](https://img.shields.io/badge/JAVA_JWT-3.4.1-000000?Style=flat&logo=Json-Web-Tokens&logoColor=000000)

<br>

### 🌏인프라

#### ⚙️기술스택   ----------------------

![Docker](https://img.shields.io/badge/Docker-gray?Style=flat&logo=Docker&logoColor=2496ED)
![Nginx](https://img.shields.io/badge/Nginx-gray?Style=flat&logo=Nginx&logoColor=269539)
![Jenkins](https://img.shields.io/badge/Jenkins-gray?Style=flat&logo=Jenkins&logoColor=D24939)
![GitLab](https://img.shields.io/badge/GitLab-gray?Style=flat&logo=GitLab&logoColor=FCA121)
![Mattermost](https://img.shields.io/badge/Mattermost-gray?Style=flat&logo=Mattermost&logoColor=0072C6)


#### 📚사용된 라이브러리   ----------------------
![Apache Ant](https://img.shields.io/badge/Apache_Ant-1.11-A81C7D?Style=flat&logo=Apache-Ant&logoColor=A81C7D)
![Credentials](https://img.shields.io/badge/Credentials-2.3.15-D24939?Style=flat&logo=Jenkins&logoColor=D24939)
![Gradle Plugin](https://img.shields.io/badge/Gradle_Plugin-1.36-C71A36?Style=flat&logo=Gradle&logoColor=C71A36)
![Node.js](https://img.shields.io/badge/Node.js-15.11.0-339933?Style=flat&logo=Node.js&logoColor=339933)
![GitLab Plugin](https://img.shields.io/badge/GitLab_Plugin-1.5.19-FCA121?Style=flat&logo=GitLab&logoColor=FCA121)
![Mattermost Notification](https://img.shields.io/badge/Mattermost_Notification-3.1.1-0072C6?Style=flat&logo=Mattermost&logoColor=0072C6)
![Publish Over SSH](https://img.shields.io/badge/Publish_Over_SSH-1.22-D24939?Style=flat&logo=Jenkins&logoColor=D24939)

<br>

### AI

#### 기술스택
![PyTorch](https://img.shields.io/badge/PyTorch-gray?Style=flat&logo=PyTorch&logoColor=EE4C2C)
![Flask](https://img.shields.io/badge/Flask-gray?Style=flat&logo=Flask&logoColor=000000)

#### 사용한 모델
![Tacotron2 + griffin lim](https://img.shields.io/badge/Tacotron2+griffin_lim-gray?Style=flat&logo=Python&logoColor=3776AB)


<br>

#### 배포 플로우

![](./image/배포플로우.png)

<br>

## 팀 소개

#### 만든 사람들

| <a href="https://github.com/dmscjf21" style ="color:#8A9C3A">AgFe</a> | <a href="https://github.com/Dong-gri-dong" style ="color:#8A9C3A">동그리동동신동</a> | <a href="https://github.com/LeeA0" style ="color:#8A9C3A">A0</a> | <a href="https://github.com/juheegg" style ="color:#8A9C3A">Dev G</a> | <a href="https://github.com/roywogur" style ="color:#8A9C3A">NetJH</a> | <a href="https://github.com/pepprbell" style ="color:#8A9C3A">피망</a> |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](./image/T1.jpg)                                          | ![](./image/T2.jpg)                                          | ![](./image/T4.jpg)                                          | ![](./image/T5.jpg)                                          | ![](./image/T3.jpg)                                          | ![](./image/T6.jpg)                                          |
| 팀장, Front End                                              | CTO, Front End                                               | Back End                                                     | Back End                                                     | Front End                                                    | Back End                                                     |

