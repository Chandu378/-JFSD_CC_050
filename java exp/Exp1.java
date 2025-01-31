class base{
    public void show(){
        System.out.println("This is a father class");
        }}
        class child extends base{
            public void display(){
                System.out.println("This is a child class");
            }
        }
                public class Exp1 {
    public static void main(String[] args) {
        
        child obj = new child();
        obj.show();
        obj.display();
    }
}