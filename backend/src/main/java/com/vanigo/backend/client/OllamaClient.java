package com.vanigo.backend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Component
public class OllamaClient {

    private final WebClient webClient;
    private final String model;

    public OllamaClient(
            @Value("${ollama.base-url}") String baseUrl,
            @Value("${ollama.model}") String model
    ) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();
        this.model = model;
    }

    public String generateResponse(String prompt) {
        try {
            Map<String, Object> request = new HashMap<>();
            request.put("model", model);
            request.put("prompt", prompt);
            request.put("stream", false);

            Map<String, Object> response = webClient.post()
                    .uri("/api/generate")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("response")) {
                return response.get("response").toString();
            }

            return "Sorry, I couldn't generate a response.";
        } catch (Exception e) {
            throw new RuntimeException("Failed to communicate with Ollama: " + e.getMessage());
        }
    }

    public String generateSummary(String conversationText) {
        String prompt = "Summarize the following conversation in 2-3 sentences:\n\n" + conversationText;
        return generateResponse(prompt);
    }

    public String analyzeConversation(String query, String conversationHistory) {
        String prompt = "Based on this conversation history:\n\n" + conversationHistory +
                "\n\nAnswer this question: " + query;
        return generateResponse(prompt);
    }
}