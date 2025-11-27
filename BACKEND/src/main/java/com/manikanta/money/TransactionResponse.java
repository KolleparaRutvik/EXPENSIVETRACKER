package com.manikanta.money;

import java.time.LocalDateTime;

public class TransactionResponse {
    public Long id;
    public Long userId;
    public Double amount;
    public String type;
    public String category;
    public String description;
    public LocalDateTime createdAt;
}
