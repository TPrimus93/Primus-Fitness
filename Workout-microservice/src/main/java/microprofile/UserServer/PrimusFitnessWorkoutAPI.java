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
import org.bson.Document;

import javax.annotation.security.RolesAllowed;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Path("/workouts")
public class PrimusFitnessWorkoutAPI {
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


    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public Response validateLogin(){

        return Response.ok().build();
    }


}
