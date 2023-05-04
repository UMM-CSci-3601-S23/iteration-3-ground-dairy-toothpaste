package umm3601.form;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;

import java.util.Map;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

public class FormController {
  static final String SORT_ORDER_KEY = "sortOrder";

  // private static final String SORT_ORDER_REGEX = "^(oldest|newest)$";


  private final JacksonMongoCollection<Document> requestCollection;


  public FormController(MongoDatabase database) {
    requestCollection = JacksonMongoCollection.builder().build(
      database,
      "forms",
      Document.class,
      UuidRepresentation.STANDARD);
  }

  /**foodType and itemType
   * Set the JSON body of the response to be a list of all the requests returned from the database
   * that match any requested filters and ordering
   *
   * @param ctx a Javalin HTTP context
   */
  public void getForms(Context ctx) {

    // All three of the find, sort, and into steps happen "in parallel" inside the
    // database system. So MongoDB is going to find the requests with the specified
    // properties, return those sorted in the specified manner, and put the
    // results into an initially empty ArrayList.
    FindIterable<Document> allForms = requestCollection.find();

    // Set the JSON body of the response to be the list of requests returned by the database.
    // According to the Javalin documentation (https://javalin.io/documentation#context),
    // this calls result(jsonString), and also sets content type to json
    ctx.json(allForms);

    // Explicitly set the context status to OK
    ctx.status(HttpStatus.OK);
  }

  public void addNewForm(Context ctx) {

    Document shoppingFormDocument = Document.parse(ctx.body().toString());

    requestCollection.insertOne(shoppingFormDocument);

    ctx.json(Map.of("id", shoppingFormDocument.getObjectId("_id")));
    // 201 is the HTTP code for when we successfully
    // create a new resource (a request in this case).
    // See, e.g., https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // for a description of the various response codes.
    ctx.status(HttpStatus.CREATED);
  }



}
