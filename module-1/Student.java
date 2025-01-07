import java.util.Scanner;
public class Student {

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String name;
        int age;
        float cgpa;
        char grd;
        name=sc.next();
        age=sc.nextInt();
        cgpa=sc.nextFloat();
        grd=sc.next().charAt(0);
        System.out.println("name" +name );
        System.out.println("age" +age );
        System.out.println("cgpa" +cgpa );
        System.out.println("grd" +grd );
        

    }
}