package dev.microprofile.ExercisesServer;


import org.bson.types.ObjectId;
import java.util.ArrayList;

public class BranchNode {

    //Variable decelerations
    private ObjectId _id;
    public String branchName;
    private String type;

    //Class consturctor
    public BranchNode(String name, String t, ArrayList children){
        branchName = name;
        type = t;
        if(type.equals("branch")){
            ArrayList<ObjectId> branchChildren = children;
        }else{
            ArrayList<ObjectId> exercises = children;
        }
    }
    

}
