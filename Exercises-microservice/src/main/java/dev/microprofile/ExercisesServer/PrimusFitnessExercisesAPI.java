// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

package dev.microprofile.ExercisesServer;

import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Consumer;

@RequestScoped
@RolesAllowed({"user"})
@Path("/exercises")
public class PrimusFitnessExercisesAPI {

    // Creates the db-server address
    MongoClientURI uri = new MongoClientURI(
            "mongodb+srv://PrimusAdmin:Fitness101@primusfitnesscluster.t2eiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    //Connection
    MongoClient mongoClient = new MongoClient(uri);


    //Connects to the specific db we want;
    MongoDatabase database = mongoClient.getDatabase("Exercises");
    //ExerciseTree collection
    MongoCollection<Document> tree = database.getCollection("ExerciseTree");

    //Adds a branch node to any location based on the json input
    //Trainer locked
    @RolesAllowed({"trainer"})
    @Path("/addExerciseBranch")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addExercises(JsonObject freshNode) {
        String nodeType = freshNode.get("nodeType").toString().replace("\"", "");
        if(nodeType.equals("root")){
            Document branch  = new Document();
            branch.append("branchName", freshNode.get("branchName").toString().replace("\"", ""));
            branch.append("childrenType", freshNode.get("childrenType").toString().replace("\"", ""));
            branch.append("children", new ArrayList<ObjectId>());
            branch.append("nodeType", "root");
            branch.append("parentNode", "null");
            tree.insertOne(branch);

        } else {
            //Grab just the id number
            ObjectId parentId = new ObjectId(freshNode.get("parentNode").toString().subSequence(10, 34).toString());
            Document oldParentNode = new Document();
            oldParentNode.append("_id", parentId);
            FindIterable<Document> parentFound = tree.find(oldParentNode);
            Document parentNode = parentFound.cursor().next();

            if(parentNode.getList("children", Object.class).isEmpty()){
                Document freshBranch = new Document();
                freshBranch.append("branchName", freshNode.get("branchName").toString().replace("\"", ""));
                parentNode.replace("childrenType", "branch");
                freshBranch.append("childrenType", freshNode.get("childrenType").toString().replace("\"", ""));
                freshBranch.append("children", new ArrayList<ObjectId>());
                freshBranch.append("nodeType", freshNode.get("nodeType").toString().replace("\"", ""));
                freshBranch.append("parentNode", parentNode.get("_id", ObjectId.class));
                tree.insertOne(freshBranch);
                FindIterable<Document> yanked = tree.find(freshBranch);
                String freshBranchID = yanked.cursor().next().get("_id").toString();
                ObjectId branchId = new ObjectId(freshBranchID);
                ArrayList<ObjectId> freshObjectIdList = new ArrayList<>();
                freshObjectIdList.add(branchId);
                parentNode.replace("children", freshObjectIdList);
                tree.findOneAndReplace(oldParentNode, parentNode);
            } else {
                List<ObjectId> childrenBranches = parentNode.getList("children", ObjectId.class);
                //create fresh document for new branch
                Document freshBranch = new Document();
                freshBranch.append("branchName", freshNode.get("branchName").toString().replace("\"", ""));
                freshBranch.append("childrenType", freshNode.get("childrenType").toString().replace("\"", ""));
                freshBranch.append("children", new ArrayList<ObjectId>());
                freshBranch.append("nodeType", freshNode.get("nodeType").toString().replace("\"", ""));
                freshBranch.append("parentNode", parentNode.get("_id", ObjectId.class));
                tree.insertOne(freshBranch);
                FindIterable<Document> yanked = tree.find(freshBranch);
                String freshBranchID = yanked.cursor().next().get("_id").toString();
                ObjectId fBchildren = new ObjectId(freshBranchID);
                childrenBranches.add(fBchildren);
                parentNode.replace("children", childrenBranches);
                tree.findOneAndReplace(oldParentNode, parentNode);
            }
        }
        //mongoClient.close();
        return Response.ok().build();
     }

    //Adds a Exercise node to any location based on the json input
    //Trainer locked
     @RolesAllowed({"trainer"})
     @Path("/addExercise")
     @POST
     @Produces(MediaType.APPLICATION_JSON)
     public Response addExercise(JsonObject freshExercise){
        Document foundParent = new Document("_id", new ObjectId(freshExercise.get("parentNode").toString().subSequence(10, 34).toString()));
        Document freshDoc = new Document("exerciseName", freshExercise.getString("exerciseName"));
        //freshDoc.append("gif", freshExercise.get("gif").toString().replace("\"", ""));
        freshDoc.append("description", freshExercise.getString("description"));
        freshDoc.append("base64", freshExercise.getString("base64"));
        freshDoc.append("parentNode", foundParent.get("_id", ObjectId.class));

        FindIterable<Document> found = tree.find(foundParent);
        Document freshParent = found.cursor().next();

         if(freshParent.getList("children", Object.class).isEmpty()) {
             tree.insertOne(freshDoc);
             freshParent.replace("childrenType","workout");
             FindIterable<Document> yanked = tree.find(freshDoc);
             String freshExerciseID = yanked.cursor().next().get("_id").toString();
             ObjectId exerciseId = new ObjectId(freshExerciseID);
             ArrayList<ObjectId> freshObjectIdList = new ArrayList<>();
             freshObjectIdList.add(exerciseId);
             freshParent.replace("children", freshObjectIdList);
             tree.findOneAndReplace(foundParent, freshParent);
         }else {
            List<ObjectId> siblings = freshParent.getList("children", ObjectId.class);
            tree.insertOne(freshDoc);
            FindIterable<Document> yanked = tree.find(freshDoc);
            String freshBranchID = yanked.cursor().next().get("_id").toString();
            ObjectId foundSiblings = new ObjectId(freshBranchID);
            siblings.add(foundSiblings);
            freshParent.replace("children", siblings);
            tree.findOneAndReplace(foundParent, freshParent);
         }
         //mongoClient.close();
        return Response.ok().build();
     }

    //Retrieves all the root level starting nodes
    @Path("/allRoots")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response allBodyWeightBranches(){
        //Variable decelerations
        ArrayList<String> toplevel = new ArrayList<>();
        Document roots = new Document("nodeType", "root");
        FindIterable<Document> document = tree.find(roots);
        //Iterate through each db hit and amend it to an array list
        for (Document doc: document){
            toplevel.add(doc.toJson());
        }
        //mongoClient.close();
        //Return response in the for of a string
        return Response.ok(toplevel.toString(), MediaType.APPLICATION_JSON).build();
    }

    //Tree traversal by node ID
    @Path("/descending/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response descending(@PathParam("id") String stringId){
        //Variable decelerations
        ArrayList<String> childrenDocs = new ArrayList<>();
        ObjectId id = new ObjectId(stringId);
        Document branchId = new Document("_id", id);
        FindIterable<Document> document = tree.find(branchId);
        //Iterate through each db hit and amend it to an array list
        Document parentFound = document.cursor().next();
        List<ObjectId> children = parentFound.getList("children", ObjectId.class);
        Document tempDoc = new Document();
        for (ObjectId s: children) {
            tempDoc.append("_id", s);
            FindIterable<Document> test = tree.find(tempDoc);
            tempDoc = test.cursor().next();
            childrenDocs.add(tempDoc.toJson());
            tempDoc.clear();
        }
        //Return response in the for of a string
        mongoClient.close();
        return Response.ok(childrenDocs.toString(), MediaType.APPLICATION_JSON).build();
    }

    @Path("/ascending/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response ascending(@PathParam("id") String childId){
        Document child = new Document("_id", new ObjectId(childId));
        FindIterable<Document> tempChild = tree.find(child);
        Document childFound = tempChild.cursor().next();
        if(childFound.get("parentNode").equals("null")){
            //mongoClient.close();
            return Response.ok("roots").build();
        } else {
            ObjectId parentId = childFound.get("parentNode", ObjectId.class);
            //mongoClient.close();
            return Response.ok(parentId.toString(), MediaType.APPLICATION_JSON).build();
        }
    }

}
