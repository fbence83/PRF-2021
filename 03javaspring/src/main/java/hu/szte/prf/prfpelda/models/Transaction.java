package hu.szte.prf.prfpelda.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "product_id")
    private int productId;
    private Date transdate;
    private int amount;
    
    public Transaction() {
    }

    public Transaction(int id, int productId, Date transdate, int amount) {
        this.id = id;
        this.productId = productId;
        this.transdate = transdate;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Date getTransdate(){
        return transdate;
    }

    public void setTransdate(Date transdate){
        this.transdate = transdate;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", productId=" + productId + ", transdate=" + transdate + ", amount=" + amount + "]";
    }
    
}
