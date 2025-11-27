package com.manikanta.money;

public class TransactionRequest {
    public Long userId;
    public Double amount;
    public String type; // "INCOME" or "EXPENSE"
    public String category;
    public String description;
}
