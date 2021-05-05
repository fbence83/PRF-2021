package hu.szte.prf.prfpelda.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.prf.prfpelda.models.Product;
import hu.szte.prf.prfpelda.models.ProductService;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class ProductController {

    ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public String helloWorld() {
        return "Hello World!";
    }

    @PostMapping(path="/product", consumes = "application/json")
    public Product newProduct(@RequestBody Product product) {
        try {
            this.productService.addProduct(product);
            return product;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        try {
            return this.productService.getAllProducts();
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/product")
    public Product getProductById(@RequestParam int id) {
        try {
            return this.productService.getProductById(id);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/product_by_name")
    public Product getProductByName(@RequestParam String name) {
        try {
            return this.productService.getProductByName(name);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @DeleteMapping("/product")
    public String deleteProductById(@RequestParam int id) {
        try {
            this.productService.deleteProductById(id);
            return "Delete Successful";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during deletion";
        }
    }
    
}
