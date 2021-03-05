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

package dev.microprofile.ExercisesServer;

import com.mongodb.*;
import com.mongodb.client.MongoDatabase;
import org.bson.types.ObjectId;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Collections;

@RequestScoped
//@RolesAllowed({"oswego.edu"})
@Path("/exercises")
public class PrimusFitnessExercisesDbInfo {
    // Creates login username and password

    // Creates the db-server address which  is locally hosted currently (Unable to access with outside machine (working))
    MongoClientURI uri = new MongoClientURI(
            "mongodb+srv://PrimusAdmin:Fitness101@primusfitnesscluster.t2eiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    //
    MongoClient mongoClient = new MongoClient(uri);


    //Connects to the specific db we want;
    MongoDatabase database = mongoClient.getDatabase("test");

    //Dumps whole db
   // @Path("/all")
   // @GET
   // @Produces(MediaType.APPLICATION_JSON)
   // public Response dbDump(){
   //     //Variable decelerations
   //     String dbInfo="[";
   //     //Gathers the specific collection we want
   //     DBCollection collection = database.getCollection("courses");
   //     DBCursor cursor = collection.find();
   //     //Iterate through each db hit and amend it to a string
   //     while (cursor.hasNext()) {
   //         dbInfo = dbInfo.concat(cursor.next().toString());
   //         if (cursor.hasNext()){
   //             dbInfo = dbInfo.concat(",");
   //         }
   //     }
   //     dbInfo = dbInfo.concat("]");
   //     mongoClient.close();
   //     return Response.ok(dbInfo, MediaType.APPLICATION_JSON).build();
   // }

}
