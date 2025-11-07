package com.vanigo.backend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Component
public class GroqClient {

    private final WebClient webClient;
    private final String model;

    public GroqClient(
            @Value("${groq.api.key}") String apiKey,
            @Value("${groq.api.url}") String apiUrl,
            @Value("${groq.model}") String model
    ) {
        this.webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        this.model = model;
    }

    public String generateResponse(String prompt) {
        try {
            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            Map<String, Object> request = new HashMap<>();
            request.put("model", model);
            request.put("messages", List.of(message));
            request.put("temperature", 0.7);
            request.put("max_tokens", 1024);

            Map<String, Object> response = webClient.post()
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> firstChoice = choices.get(0);
                    Map<String, Object> messageObj = (Map<String, Object>) firstChoice.get("message");
                    return messageObj.get("content").toString();
                }
            }

            return "Sorry, I couldn't generate a response.";
        } catch (Exception e) {
            throw new RuntimeException("Failed to communicate with Groq AI: " + e.getMessage());
        }
    }

    public String generateSummary(String conversationText) {
        String prompt = "Summarize the following conversation in 2-3 concise sentences. Focus on key topics and outcomes:\n\n" + conversationText;
        return generateResponse(prompt);
    }

    public String analyzeConversation(String query, String conversationHistory) {
        String prompt = "You are an AI assistant helping users understand their past conversations.\n\n" +
                "Conversation History:\n" + conversationHistory +
                "\n\nUser Question: " + query +
                "\n\nProvide a helpful and accurate answer based on the conversation history above.";
        return generateResponse(prompt);
    }
}