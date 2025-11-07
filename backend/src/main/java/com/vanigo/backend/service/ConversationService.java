package com.vanigo.backend.service;

import com.vanigo.backend.dto.response.ConversationResponse;
import com.vanigo.backend.dto.response.MessageResponse;
import com.vanigo.backend.entity.Conversation;
import com.vanigo.backend.entity.User;
import com.vanigo.backend.exception.ResourceNotFoundException;
import com.vanigo.backend.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ConversationService {

    @Autowired
    private AIService aiService;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserService userService;

    public Conversation createConversation(UUID userId, String title) {
        try {
            User user = userService.getUserById(userId);

            Conversation conversation = new Conversation();
            conversation.setTitle(title);
            conversation.setUser(user);
            conversation.setActive(true);

            return conversationRepository.save(conversation);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create conversation: " + e.getMessage());
        }
    }

    public List<ConversationResponse> getUserConversations(UUID userId) {
        try {
            User user = userService.getUserById(userId);
            List<Conversation> conversations = conversationRepository.findByUserOrderByStartedAtDesc(user);

            return conversations.stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch conversations: " + e.getMessage());
        }
    }

    public ConversationResponse getConversationById(UUID conversationId, UUID userId) {
        try {
            Conversation conversation = conversationRepository.findById(conversationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

            if (!conversation.getUser().getId().equals(userId)) {
                throw new RuntimeException("Unauthorized access to conversation");
            }

            return convertToResponseWithMessages(conversation);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch conversation: " + e.getMessage());
        }
    }


    public Conversation endConversation(UUID conversationId, UUID userId, String summary) {
        try {
            Conversation conversation = conversationRepository.findById(conversationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

            if (!conversation.getUser().getId().equals(userId)) {
                throw new RuntimeException("Unauthorized access to conversation");
            }

            conversation.setActive(false);
            conversation.setEndedAt(LocalDateTime.now());

            if (summary == null || summary.trim().isEmpty()) {
                summary = aiService.generateSummary(conversation);
            }
            conversation.setSummary(summary);

            return conversationRepository.save(conversation);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to end conversation: " + e.getMessage());
        }
    }


    private ConversationResponse convertToResponse(Conversation conversation) {
        ConversationResponse response = new ConversationResponse();
        response.setId(conversation.getId());
        response.setTitle(conversation.getTitle());
        response.setSummary(conversation.getSummary());
        response.setActive(conversation.getActive());
        response.setStartedAt(conversation.getStartedAt());
        response.setEndedAt(conversation.getEndedAt());
        response.setMessageCount(conversation.getMessages().size());
        return response;
    }

    private ConversationResponse convertToResponseWithMessages(Conversation conversation) {
        ConversationResponse response = convertToResponse(conversation);
        List<MessageResponse> messages = conversation.getMessages().stream()
                .map(msg -> new MessageResponse(msg.getId(), msg.getContent(), msg.getSender(), msg.getCreatedAt()))
                .collect(Collectors.toList());
        response.setMessages(messages);
        return response;
    }
}