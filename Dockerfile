FROM openjdk:11
LABEL maintainer="greeenly.dev@gmail.com"
ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","/app.jar"]