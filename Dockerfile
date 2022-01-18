FROM openjdk:11-jre-slim
LABEL maintainer="greeenly.dev@gmail.com"
VOLUME /tmp
ARG JAR_FILE=./build/libs/*.jar
ADD ${JAR_FILE} app.jar
EXPOSE 8761
ENTRYPOINT ["java", "-Djava.security.egd=file:dev/./uuradom", "-jar","/app.jar"]