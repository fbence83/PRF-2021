package hu.szte.prf.prfpelda.models;

import java.util.List;

public interface TransactionService {
    void addTransaction(Transaction transaction);
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(int id);
    void deleteTransactionById(int id);
}
