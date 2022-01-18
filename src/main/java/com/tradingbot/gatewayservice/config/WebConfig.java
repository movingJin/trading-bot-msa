package com.tradingbot.gatewayservice.config;

import com.google.common.collect.ImmutableList;
import io.netty.handler.codec.http.HttpMethod;
import org.springframework.cloud.gateway.config.GlobalCorsProperties;
import org.springframework.cloud.gateway.handler.FilteringWebHandler;
import org.springframework.cloud.gateway.handler.RoutePredicateHandlerMapping;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfig implements WebFluxConfigurer {
    @Bean
    CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(List.of(
                "http://118.32.227.130:3000",
                "http://118.32.227.130:22732"
        ));

        corsConfig.setMaxAge(8000L);

        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedMethod("PUT");
        corsConfig.addAllowedMethod("GET");
        corsConfig.addAllowedMethod("OPTIONS");
        corsConfig.addAllowedMethod("DELETE");
        corsConfig.addAllowedMethod("POST");
        corsConfig.addAllowedMethod("PATCH");

        corsConfig.setExposedHeaders(ImmutableList.of(
                "Authorization",
                "X-CSRF-TOKEN"
        ));
        corsConfig.setAllowedHeaders(ImmutableList.of(
                "Access-Control-Allow-Headers",
                "Access-Control-Expose-Headers",
                "Access-control-allow-credentials",
                "Accept",
                "X-Requested-With",
                "Authorization",
                "Cache-Control",
                "Content-Type",
                "Expires",
                "Last-Modified",
                "Content-Language",
                "Pragma",
                "Baeldung-Allowed",
                "Credential",
                "X-AUTH-TOKEN",
                "X-CSRF-TOKEN"
        ));

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}
