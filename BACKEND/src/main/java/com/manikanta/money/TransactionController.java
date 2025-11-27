package com.manikanta.money;

import com.manikanta.money.TransactionRequest;
import com.manikanta.money.TransactionResponse;
import com.manikanta.money.Transaction;
import com.manikanta.money.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tx")
@CrossOrigin(origins = "${app.frontend.origin}")
public class TransactionController {
    private final TransactionService txService;

    public TransactionController(TransactionService txService) {
        this.txService = txService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTransaction(@RequestBody TransactionRequest req) {
        try {
            Transaction t = txService.addTransaction(req.userId, req.amount, req.type, req.category, req.description);
            return ResponseEntity.ok(toResponse(t));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<?> history(@PathVariable Long userId) {
        try {
            List<Transaction> txs = txService.getTransactionsForUser(userId);
            List<TransactionResponse> resp = txs.stream().map(this::toResponse).collect(Collectors.toList());
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/pie/{userId}")
    public ResponseEntity<?> pieData(@PathVariable Long userId) {
        try {
            Map<String, Double> data = txService.getExpenseSummaryByCategory(userId);
            return ResponseEntity.ok(data);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/balance/{userId}")
    public ResponseEntity<?> balance(@PathVariable Long userId) {
        try {
            Double bal = txService.getBalance(userId);
            return ResponseEntity.ok(Map.of("balance", bal));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    private TransactionResponse toResponse(Transaction t) {
        TransactionResponse r = new TransactionResponse();
        r.id = t.getId();
        r.userId = t.getUser().getId();
        r.amount = t.getAmount();
        r.type = t.getType();
        r.category = t.getCategory();
        r.description = t.getDescription();
        r.createdAt = t.getCreatedAt();
        return r;
    }
}
