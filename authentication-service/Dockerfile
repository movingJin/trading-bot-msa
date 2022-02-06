FROM openjdk:11-jre-slim
LABEL maintainer="greeenly.dev@gmail.com"
ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar"]