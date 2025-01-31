import java.util.Scanner;
import java.util.InputMismatchException;

interface Billing {
    void calculateBill(int units);
    void printBill();
}

class Prepaid implements Billing {
    private int units;
    private int bill;

    public void calculateBill(int units) {
        this.units = units;
        if (units <= 100) {
            bill = units * 5;
        } else if (units <= 200) {
            bill = 100 * 5 + (units - 100) * 6;
        } else {
            bill = 100 * 5 + 100 * 6 + (units - 200) * 7;
        }
    }

    public void printBill() {
        System.out.println("Prepaid Bill: " + bill);
    }

    public int getBill() {
        return bill;
    }
}

class Postpaid implements Billing {
    private int units;
    private int bill;

    public void calculateBill(int units) {
        this.units = units;
        if (units <= 100) {
            bill = units * 4;
        } else if (units <= 200) {
            bill = 100 * 4 + (units - 100) * 5;
        } else {
            bill = 100 * 4 + 100 * 5 + (units - 200) * 6;
        }
    }

    public void printBill() {
        System.out.println("Postpaid Bill: " + bill);
    }

    public int getBill() {
        return bill;
    }
}

class Customer {
    private String name;
    private String phoneNumber;
    private Billing billing;

    public Customer(String name, String phoneNumber, Billing billing) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.billing = billing;
    }

    public void generateBill(int units) {
        billing.calculateBill(units);
        billing.printBill();
        System.out.println("------------------------------------------------------");
        System.out.println("Bill generated successfully.");
        System.out.println("------------------------------------------------------");

        System.out.println("Customer Name: " + name);
        System.out.println("Customer Phone Number: " + phoneNumber);
        System.out.println("Total Bill Amount: " + (billing instanceof Prepaid ? ((Prepaid) billing).getBill() : ((Postpaid) billing).getBill()));
        System.out.println("---------------------Thanks----------------------------");
    }
}

public class ElectricityBillingSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = "";
        String phoneNumber = "";
        String type = "";
        int units = 0;

        try {
            System.out.println("Enter customer name: ");
            name = sc.nextLine();

            while (true) {
                System.out.println("Enter customer phone number: ");
                phoneNumber = sc.nextLine();
                if (phoneNumber.matches("\\d+")) {
                    break;
                } else {
                    System.out.println("Invalid phone number. Please enter only numeric values.");
                }
            }

            while (true) {
                System.out.println("Enter the type of connection (prepaid/postpaid): ");
                type = sc.nextLine().toLowerCase();
                if (type.equals("prepaid") || type.equals("postpaid")) {
                    break;
                } else {
                    System.out.println("Invalid connection type. Please enter 'prepaid' or 'postpaid'.");
                }
            }

            while (true) {
                try {
                    System.out.println("Enter the number of units consumed: ");
                    units = sc.nextInt();
                    break;
                } catch (InputMismatchException e) {
                    System.out.println("Invalid input. Please enter numeric values for units.");
                    sc.next(); 
                }
            }

            Billing billing;
            if (type.equals("prepaid")) {
                billing = new Prepaid();
            } else {
                billing = new Postpaid();
            }

            Customer customer = new Customer(name, phoneNumber, billing);
            customer.generateBill(units);

        } catch (Exception e) {
            System.out.println("An unexpected error occurred: " + e.getMessage());
        } finally {
            sc.close();
        }
    }
}