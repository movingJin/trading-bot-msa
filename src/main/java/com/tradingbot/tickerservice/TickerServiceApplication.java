package com.tradingbot.tickerservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import reactor.blockhound.BlockHound;

@EnableScheduling
@SpringBootApplication
public class TickerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TickerServiceApplication.class, args);
	}
}
