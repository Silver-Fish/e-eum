#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/e-eum/backend
cd $REPOSITORY

sudo ls -td1 *.jar | tail -n +2 | xargs rm -f
# e-eum폴더로 이동
cd ..
# 도커 컴포즈 내림
sudo docker-compose down
# 새로운 스프링 파일 빌드
sudo docker build -t eeum:latest .
# 쓸모없는 <none>:<none>이미지 삭제
sudo docker rmi $(docker images -f "dangling=true" -q)
# 도커 컴포즈 올림
sudo docker-compose up -d