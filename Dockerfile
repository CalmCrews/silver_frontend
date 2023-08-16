# Node.js 18 이미지를 사용하여 애플리케이션 빌드
FROM node:18 AS build

# 작업 디렉토리 생성 및 설정
WORKDIR /app

# 애플리케이션 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# Nginx 이미지 사용하여 정적 파일 호스팅
FROM nginx:alpine

# Nginx 설정 파일을 컨테이너에 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 애플리케이션 파일을 Nginx로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 컨테이너 실행 시 Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
