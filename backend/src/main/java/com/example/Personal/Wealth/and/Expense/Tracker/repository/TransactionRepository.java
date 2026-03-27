package com.example.Personal.Wealth.and.Expense.Tracker.repository;

import com.example.Personal.Wealth.and.Expense.Tracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
