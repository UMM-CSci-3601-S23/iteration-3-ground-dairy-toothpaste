package umm3601.form;

import static com.mongodb.client.model.Filters.eq;
import java.util.ArrayList;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import org.bson.UuidRepresentation;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;
import java.util.Map;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;

public class FormController {
  static final String SORT_ORDER_KEY = "sortOrder";

  // private static final String SORT_ORDER_REGEX = "^(oldest|newest)$";


  private final JacksonMongoCollection<Form> requestCollection;


  public FormController(MongoDatabase database) {
    requestCollection = JacksonMongoCollection.builder().build(
      database,
      "forms",
      Form.class,
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
    ArrayList<Form> matchingRequests = requestCollection.find().into(new ArrayList<>());

    // Set the JSON body of the response to be the list of requests returned by the database.
    // According to the Javalin documentation (https://javalin.io/documentation#context),
    // this calls result(jsonString), and also sets content type to json
    System.out.println(matchingRequests);
    ctx.json(matchingRequests);

    // Explicitly set the context status to OK
    ctx.status(HttpStatus.OK);
  }


  public void addNewForm(Context ctx) {
    Form newRequest = ctx.bodyAsClass(Form.class);

    requestCollection.insertOne(newRequest);

    ctx.json(Map.of("id", newRequest._id));
    // 201 is the HTTP code for when we successfully
    // create a new resource (a request in this case).
    // See, e.g., https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // for a description of the various response codes.
    ctx.status(HttpStatus.CREATED);
  }


  /**
   * Delete the form specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */

  public void deleteForm(Context ctx) {
    String id = ctx.pathParam("id");
    DeleteResult deleteResult = requestCollection.deleteOne(eq("_id", new ObjectId(id)));
    if (deleteResult.getDeletedCount() != 1) {
      ctx.status(HttpStatus.NOT_FOUND);
      throw new NotFoundResponse(
        "Was unable to delete ID "
          + id
          + "; perhaps illegal ID or an ID for an item not in the system?");
    }
    ctx.status(HttpStatus.OK);
  }



}
