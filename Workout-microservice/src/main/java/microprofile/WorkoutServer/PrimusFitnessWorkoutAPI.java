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

package microprofile.WorkoutServer;


import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.conversions.Bson;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.jboss.weld.util.bytecode.ClassFileUtils;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.deploy.spi.DConfigBean;
import javax.json.*;
import javax.websocket.Decoder;
import javax.websocket.Encoder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.awt.*;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.image.renderable.RenderableImageProducer;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.List;

@RolesAllowed({"user"})
@Path("/workouts")
public class PrimusFitnessWorkoutAPI {
    // Creates the db-server address
    MongoClientURI uri = new MongoClientURI(
            "mongodb+srv://PrimusAdmin:Fitness101@primusfitnesscluster.t2eiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    //Connection
    MongoClient mongoClient = new MongoClient(uri);


    //Connects to the specific db we want;
    MongoDatabase database = mongoClient.getDatabase("Workout");
    //Workout collection
    MongoCollection<Document> workoutCollection = database.getCollection("workouts");


    //Posts a workout to the database
    @Path("/postWorkout")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response postingWorkout(JsonObject incoming) throws ParseException {
        //Parses all Json data into a document
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Document freshDoc = Document.parse(incoming.toString());
        //Replacing String dateTime with class dateTime
        Date date = dateFormat.parse(freshDoc.getString("dateCreated"));
        freshDoc.replace("dateCreated", date);
        workoutCollection.insertOne(freshDoc);
        mongoClient.close();
        return Response.ok().build();
    }

    //Gets a specified workout by the provided ID number
    @Path("/getWorkout/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response testingGet(@PathParam("id") String id){
        Document test = new Document("_id", new ObjectId(id));
        FindIterable<Document> found = workoutCollection.find(test);
        String send = found.cursor().next().toJson();
        mongoClient.close();
        return Response.ok(send, MediaType.APPLICATION_JSON).build();
    }

    //Gets a specific workout by the email and date provided
    //E.X: /email@email.com/Apr-19-2021
    @Path("/getWorkoutsByDate/{email}/{date}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getWorkoutByDate(@PathParam("email") String email, @PathParam("date") String year) throws ParseException{
        //Var declarations
        ArrayList<String> sendingList = new ArrayList<>();
        Document lookup = new Document("belongsTo", email);
        DateFormat formater = new SimpleDateFormat("MMM-dd-yyyy");


        lookup.append("dateCreated", formater.parse(year));
        FindIterable<Document> found = workoutCollection.find(lookup);
        for(Document d: found){
            sendingList.add(d.toJson());
        }
        mongoClient.close();
        return Response.ok(sendingList.toString(), MediaType.APPLICATION_JSON).build();
    }

    //Gets a specific workout by the email provided
    //E.X: /email@email.com
    @Path("/getWorkoutsByUser/{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPastWorkoutsByUser(@PathParam("email") String email) {
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        ArrayList<Integer> aList = new ArrayList<>();
        Document userEmail = new Document("belongsTo", email);
        FindIterable<Document> pastWorkouts = workoutCollection.find(userEmail);
        int currentYear;
        int prevousYear = 0;
        for (Document doc : pastWorkouts) {
            LocalDate localDate = doc.getDate("dateCreated").toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            currentYear = localDate.getYear();
            if (aList.isEmpty() || !aList.contains(currentYear)) {
                aList.add(localDate.getYear());
            }
        }

            for (int d : aList) {
                jArrayBuilder.add(d);
            }
            mongoClient.close();
            return Response.ok(jArrayBuilder.build(), MediaType.APPLICATION_JSON).build();
    }

    //Gets a list of workouts by the email and year provided that fall within the provided year
    //E.X: /email@email.com/2021
    @Path("/getWorkoutsByYear/{email}/{date}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getWorkoutByYear(@PathParam("email") String email, @PathParam("date") String year) throws ParseException{
        //Var declarations
        JsonArrayBuilder sendingList = Json.createArrayBuilder();
        Document lookup = new Document("belongsTo", email);
        DateFormat formater = new SimpleDateFormat("yyyy");
        Date dateYear = formater.parse(year);
        int intYear = Integer.parseInt(year);
        intYear++;
        Date yearPlus = formater.parse(Integer.toString(intYear));

        FindIterable<Document> found = workoutCollection.find(lookup);
        for(Document d: found){
            if(dateYear.before(d.getDate("dateCreated")) && yearPlus.after(d.getDate("dateCreated"))){
                sendingList.add(d.getDate("dateCreated").toString());
            }
        }
        mongoClient.close();
        return Response.ok(sendingList.build(), MediaType.APPLICATION_JSON).build();
    }

    //Gets a list of workouts by the email, month, and year provided that fall within the provided month and year
    //E.X: /email@email.com/Apr-2021
    @Path("/getWorkoutsByMonth/{email}/{date}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getWorkoutByMonth(@PathParam("email") String email, @PathParam("date") String monthYear) throws ParseException{
        //Var declarations
        JsonArrayBuilder sendingList = Json.createArrayBuilder();
        Document lookup = new Document("belongsTo", email);
        DateFormat formatter = new SimpleDateFormat("MMM-yyyy");
        DateFormat secondFormatter = new SimpleDateFormat("MM-yyyy");
        LocalDate month = formatter.parse(monthYear).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        String[] split = monthYear.split("-");
        int tempMonth = month.getMonthValue();
        int tempYear = Integer.parseInt(split[1]);
        if(tempMonth < 12) {
            tempMonth++;
        }
        else {
            tempMonth = 1;
            tempYear++;
        }
        split[0] =  tempMonth + "-" + tempYear;
        Date monthPlus = secondFormatter.parse(split[0]);
        //Date after
        FindIterable<Document> found = workoutCollection.find(lookup);
        for(Document d: found){
            if (monthPlus.after(d.getDate("dateCreated")) && month.isBefore(d.getDate("dateCreated").toInstant().atZone(ZoneId.systemDefault()).toLocalDate())) {
                sendingList.add(d.getDate("dateCreated").toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth());
            }
        }
        mongoClient.close();
        return Response.ok(sendingList.build(), MediaType.APPLICATION_JSON).build();
    }

    @Path("/updateNotes")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateNotes(JsonObject freshNote){
        Document workout = new Document("_id", new ObjectId(freshNote.getString("_id")));
        FindIterable<Document> iterable = workoutCollection.find(workout);
        Document workoutFound = iterable.cursor().next();
        List<String> notes = workoutFound.getList("notes", String.class);
        notes.add(freshNote.getString("addedNote"));
        workoutFound.replace("notes", notes);
        workoutCollection.replaceOne(workout, workoutFound);
        mongoClient.close();
        return Response.ok().build();
    }

}
