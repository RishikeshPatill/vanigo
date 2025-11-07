package com.vanigo.backend.service;

import com.vanigo.backend.client.GroqClient;
import com.vanigo.backend.entity.Conversation;
import com.vanigo.backend.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    @Autowired
    private GroqClient groqClient;

    public String generateResponse(String userMessage) {
        try {
            return groqClient.generateResponse(userMessage);
        } catch (Exception e) {
            return "I apologize, but I'm having trouble generating a response right now. Error: " + e.getMessage();
        }
    }

    public String generateSummary(Conversation conversation) {
        try {
            if (conversation.getMessages() == null || conversation.getMessages().isEmpty()) {
                return "No messages to summarize";
            }

            String conversationText = conversation.getMessages().stream()
                    .map(msg -> msg.getSender() + ": " + msg.getContent())
                    .collect(Collectors.joining("\n"));

            return groqClient.generateSummary(conversationText);
        } catch (Exception e) {
            return "Summary generation failed: " + e.getMessage();
        }
    }

    public String analyzeConversations(String query, List<Conversation> conversations) {
        try {
            StringBuilder historyBuilder = new StringBuilder();

            for (Conversation conv : conversations) {
                historyBuilder.append("Conversation: ").append(conv.getTitle()).append("\n");
                if (conv.getSummary() != null) {
                    historyBuilder.append("Summary: ").append(conv.getSummary()).append("\n");
                }
                historyBuilder.append("\n");
            }

            String conversationHistory = historyBuilder.toString();

            if (conversationHistory.trim().isEmpty()) {
                return "No conversation history available to analyze.";
            }

            return groqClient.analyzeConversation(query, conversationHistory);
        } catch (Exception e) {
            return "Analysis failed: " + e.getMessage();
        }
    }
}