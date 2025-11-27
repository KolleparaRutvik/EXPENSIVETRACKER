package com.manikanta.money;

import com.manikanta.money.Transaction;
import com.manikanta.money.User;
import com.manikanta.money.TransactionRepository;
import com.manikanta.money.UserRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository txRepo;
    private final UserRepository userRepo;

    public TransactionService(TransactionRepository txRepo, UserRepository userRepo) {
        this.txRepo = txRepo;
        this.userRepo = userRepo;
    }

    public Transaction addTransaction(Long userId, Double amount, String type, String category, String description) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Transaction t = new Transaction(user, amount, type, category, description);
        return txRepo.save(t);
    }

    public List<Transaction> getTransactionsForUser(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return txRepo.findByUserOrderByCreatedAtDesc(user);
    }

    public Map<String, Double> getExpenseSummaryByCategory(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Object[]> rows = txRepo.sumExpensesByCategory(user);
        Map<String, Double> map = new HashMap<>();
        for (Object[] r : rows) {
            String cat = r[0] == null ? "Uncategorized" : r[0].toString();
            Double sum = r[1] == null ? 0.0 : ((Number) r[1]).doubleValue();
            map.put(cat, sum);
        }
        return map;
    }

    public Double getBalance(Long userId) {
        List<Transaction> txs = getTransactionsForUser(userId);
        double bal = 0.0;
        for (Transaction t : txs) {
            if ("INCOME".equalsIgnoreCase(t.getType())) bal += t.getAmount();
            else bal -= t.getAmount();
        }
        return bal;
    }
}
