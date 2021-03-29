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
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

package microprofile.UserServer;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.BsonValue;
import org.bson.Document;

import javax.enterprise.context.RequestScoped;
import javax.json.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.google.gson.Gson;
import org.bson.conversions.Bson;

import java.net.URI;
import java.util.ArrayList;

@RequestScoped
//@RolesAllowed({"oswego.edu"})
@Path("/user")
public class PrimusFitnessUserAPI {
    // Creates login username and password

    // Creates the db-server address
    MongoClientURI uri = new MongoClientURI(
            "mongodb+srv://PrimusAdmin:Fitness101@primusfitnesscluster.t2eiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    //Connection
    MongoClient mongoClient = new MongoClient(uri);


    //Connects to the specific db we want;
    MongoDatabase database = mongoClient.getDatabase("Users");
    //Users collection
    MongoCollection<Document> users = database.getCollection("users");

    //Dumps whole db (Testing purposes)
    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response dbDump(){
        ArrayList<String> documents = new ArrayList<>();
        //Gathers the specific collection we want
        System.out.println("Check one");
        FindIterable<Document> document = users.find();
        System.out.println("Check two");
        //Iterate through each db hit and amend it to a string
        for (Document doc: document){
            documents.add(doc.toJson());
        }

        System.out.println(documents);
        mongoClient.close();
        return Response.ok(documents.toString(), MediaType.APPLICATION_JSON).build();
    }

    @Path("/createUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addExercises(JsonObject test){
        System.out.println(test.toString());
        //check user bf doing anything here
        Document doc = Document.parse(test.toString());
        users.insertOne(doc);
        return Response.ok().build();
    }

    @Path("/loginAttempt/{userName}/{password}")
    @GET

    public Response validateLogin(@PathParam("userName") String userName, @PathParam("password") String password){
        //Create an empty document to store look up var's
        Document lookUp = new Document();
        lookUp.append("userName", userName);
        lookUp.append("password", password);
        System.out.println(lookUp.toJson());
        FindIterable<Document> findUser = users.find(lookUp);
        //Find the user that matches that userName and password combination;
        if(findUser.cursor().hasNext()){
            return Response.temporaryRedirect(URI.create("http://www.google.com/")).build();
        }else {
            return Response.status(401).build();
        }

    }

}
