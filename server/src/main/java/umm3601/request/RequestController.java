package umm3601.request;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import java.util.ArrayList;
import java.util.List;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.UuidRepresentation;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;


public class RequestController {
  static final String ITEM_TYPE_KEY = "itemType";
  static final String FOOD_TYPE_KEY = "foodType";
  static final String SORT_ORDER_KEY = "sortorder";

  private static final String ITEM_TYPE_REGEX = "^(food|toiletries|other)$";
  private static final String FOOD_TYPE_REGEX = "^(/w+)$";

  private final JacksonMongoCollection<Request> requestCollection;

  public RequestController(MongoDatabase database){
    requestCollection = JacksonMongoCollection.builder().build(
      database,
      "requests",
      Request.class,
      UuidRepresentation.STANDARD);
  }

  /**
   * Set the JSON body of the response to be the single request
   * specified by the `id` parameter in the request
   *
   * @param ctx a Javalin HTTP context
   */
  public void getRequest(Context ctx) {
    String id = ctx.pathParam("id");
    Request request;

    try {
      request = requestCollection.find(eq("_id", new ObjectId(id))).first();
    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The desired request id wasn't a legal Mongo Object ID.");
    }
    if (request == null) {
      throw new NotFoundResponse("The desired request was not found");
    } else {
      ctx.json(request);
      ctx.status(HttpStatus.OK);
    }
  }

  /**
   * Set the JSON body of the response to be a list of all the requests returned from the database
   * that match any requested filters and ordering
   *
   * @param ctx a Javalin HTTP context
   */
  public void getRequests(Context ctx) {
    Bson combinedFilter = constructFilter(ctx);
    //Bson sortingOrder = constructSortingOrder(ctx);

    // All three of the find, sort, and into steps happen "in parallel" inside the
    // database system. So MongoDB is going to find the requests with the specified
    // properties, return those sorted in the specified manner, and put the
    // results into an initially empty ArrayList.
    ArrayList<Request> matchingRequests = requestCollection
      .find(combinedFilter)
      //.sort(sortingOrder)
      .into(new ArrayList<>());

    // Set the JSON body of the response to be the list of requests returned by the database.
    // According to the Javalin documentation (https://javalin.io/documentation#context),
    // this calls result(jsonString), and also sets content type to json
    ctx.json(matchingRequests);

    // Explicitly set the context status to OK
    ctx.status(HttpStatus.OK);
  }

  private Bson constructFilter(Context ctx) {
    List<Bson> filters = new ArrayList<>(); // start with a blank document
    if (ctx.queryParamMap().containsKey(ITEM_TYPE_KEY)) {
      String itemType = ctx.queryParamAsClass(ITEM_TYPE_KEY, String.class)
        .check(it -> it.matches(ITEM_TYPE_REGEX), "Request must contain valid item type")
        .get();
      filters.add(eq(ITEM_TYPE_KEY, itemType));
    }
    if (ctx.queryParamMap().containsKey(FOOD_TYPE_KEY)) {
      String foodType = ctx.queryParamAsClass(FOOD_TYPE_KEY, String.class)
        .check(it -> it.matches(FOOD_TYPE_REGEX), "Request must contain valid food type")
        .get();
      filters.add(eq(FOOD_TYPE_KEY, foodType));
    }


    // Combine the list of filters into a single filtering document.
    Bson combinedFilter = filters.isEmpty() ? new Document() : and(filters);

    return combinedFilter;
  }
/*
  private Bson constructSortingOrder(Context ctx) {
    // Sort the results. Use the `sortby` query param (default "name")
    // as the field to sort by, and the query param `sortorder` (default
    // "asc") to specify the sort order.
    String sortBy = Objects.requireNonNullElse(ctx.queryParam("sortby"), "name");
    String sortOrder = Objects.requireNonNullElse(ctx.queryParam("sortorder"), "asc");
    Bson sortingOrder = sortOrder.equals("desc") ?  Sorts.descending(sortBy) : Sorts.ascending(sortBy);
    return sortingOrder;
  }*/

}
