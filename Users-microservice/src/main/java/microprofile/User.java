package microprofile;

public class User {
    //Global variable initialization
    private String firstName;
    private String lastName;
    private String dob;
    private String userName;
    private String password;

    //Constructor

    public User(String fName, String lName, String dofb, String uName, String pword){
        firstName = fName;
        lastName = lName;
        dob = dofb;
        userName = uName;
        password = pword;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getDob() {
        return dob;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
