package com.manikanta.money;

import com.manikanta.money.Transaction;
import com.manikanta.money.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserOrderByCreatedAtDesc(User user);

    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t WHERE t.user = :user AND t.type = 'EXPENSE' GROUP BY t.category")
    List<Object[]> sumExpensesByCategory(User user);
}
