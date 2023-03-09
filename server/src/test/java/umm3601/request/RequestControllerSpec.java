package umm3601.request;

import static com.mongodb.client.model.Filters.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import io.javalin.validation.Validator;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;

/**
 * Tests the logic of the UserController
 *
 * @throws IOException
 */
// The tests here include a ton of "magic numbers" (numeric constants).
// It wasn't clear to me that giving all of them names would actually
// help things. The fact that it wasn't obvious what to call some
// of them says a lot. Maybe what this ultimately means is that
// these tests can/should be restructured so the constants (there are
// also a lot of "magic strings" that Checkstyle doesn't actually
// flag as a problem) make more sense.
@SuppressWarnings({ "MagicNumber" })
class RequestControllerSpec {

  // An instance of the controller we're testing that is prepared in
  // `setupEach()`, and then exercised in the various tests below.
  private RequestController requestController;

  // A Mongo object ID that is initialized in `setupEach()` and used
  // in a few of the tests. It isn't used all that often, though,
  // which suggests that maybe we should extract the tests that
  // care about it into their own spec file?
  private ObjectId samsId;

  // The client and database that will be used
  // for all the tests in this spec file.
  private static MongoClient mongoClient;
  private static MongoDatabase db;

  // Used to translate between JSON and POJOs.
  //private static JavalinJackson javalinJackson = new JavalinJackson();

  @Mock
  private Context ctx;

  @Captor
  private ArgumentCaptor<ArrayList<Request>> requestArrayListCaptor;

  @Captor
  private ArgumentCaptor<Request> requestCaptor;

  @Captor
  private ArgumentCaptor<Map<String, String>> mapCaptor;

  /**
   * Sets up (the connection to the) DB once; that connection and DB will
   * then be (re)used for all the tests, and closed in the `teardown()`
   * method. It's somewhat expensive to establish a connection to the
   * database, and there are usually limits to how many connections
   * a database will support at once. Limiting ourselves to a single
   * connection that will be shared across all the tests in this spec
   * file helps both speed things up and reduce the load on the DB
   * engine.
   */
  @BeforeAll
  static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
        MongoClientSettings.builder()
            .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
            .build()
    );
    db = mongoClient.getDatabase("test");
  }

  @AfterAll
  static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @BeforeEach
  void setupEach() throws IOException {
    // Reset our mock context and argument captor (declared with Mockito annotations @Mock and @Captor)
    MockitoAnnotations.openMocks(this);

    // Setup database
    MongoCollection<Document> requestDocuments = db.getCollection("requests");
    requestDocuments.drop();
    List<Document> testRequests = new ArrayList<>();
    testRequests.add(
        new Document()
            .append("itemType", "food")
            .append("description", "apple")
            .append("foodType", "fruit"));
    testRequests.add(
        new Document()
            .append("itemType", "other")
            .append("description", "Paper Plate")
            .append("foodType", ""));
    testRequests.add(
        new Document()
            .append("itemType", "toiletries")
            .append("description", "tooth paste")
            .append("foodType", ""));

    samsId = new ObjectId();
    Document sam = new Document()
        .append("_id", samsId)
        .append("itemType", "food")
        .append("description", "steak")
        .append("foodType", "meat");

    requestDocuments.insertMany(testRequests);
    requestDocuments.insertOne(sam);

    requestController = new RequestController(db);
  }

  @Test
  void canGetAllRequests() throws IOException {
    // When something asks the (mocked) context for the queryParamMap,
    // it will return an empty map (since there are no query params in this case where we want all users)
    when(ctx.queryParamMap()).thenReturn(Collections.emptyMap());

    // Now, go ahead and ask the userController to getUsers
    // (which will, indeed, ask the context for its queryParamMap)
    requestController.getRequests(ctx);

    // We are going to capture an argument to a function, and the type of that argument will be
    // of type ArrayList<User> (we said so earlier using a Mockito annotation like this):
    // @Captor
    // private ArgumentCaptor<ArrayList<User>> userArrayListCaptor;
    // We only want to declare that captor once and let the annotation
    // help us accomplish reassignment of the value for the captor
    // We reset the values of our annotated declarations using the command
    // `MockitoAnnotations.openMocks(this);` in our @BeforeEach

    // Specifically, we want to pay attention to the ArrayList<User> that is passed as input
    // when ctx.json is called --- what is the argument that was passed? We capture it and can refer to it later
    verify(ctx).json(requestArrayListCaptor.capture());
    verify(ctx).status(HttpStatus.OK);

    // Check that the database collection holds the same number of documents as the size of the captured List<User>
    assertEquals(db.getCollection("requests").countDocuments(), requestArrayListCaptor.getValue().size());
  }

  @Test
  void canGetRequestsWithItemType() throws IOException {
    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put(RequestController.ITEM_TYPE_KEY, Arrays.asList(new String[] {"food"}));
    queryParams.put(RequestController.SORT_ORDER_KEY, Arrays.asList(new String[] {"desc"}));
    when(ctx.queryParamMap()).thenReturn(queryParams);
    when(ctx.queryParamAsClass(RequestController.ITEM_TYPE_KEY, String.class))
      .thenReturn(Validator.create(String.class, "food", RequestController.ITEM_TYPE_KEY));

    requestController.getRequests(ctx);

    verify(ctx).json(requestArrayListCaptor.capture());
    verify(ctx).status(HttpStatus.OK);

    // Confirm that all the requests passed to `json` work for food.
    for (Request request : requestArrayListCaptor.getValue()) {
      assertEquals("food", request.itemType);
    }
  }
  @Test
  void canGetRequestsWithFoodType() throws IOException {
    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put(RequestController.FOOD_TYPE_KEY, Arrays.asList(new String[] {"meat"}));
    queryParams.put(RequestController.SORT_ORDER_KEY, Arrays.asList(new String[] {"desc"}));
    when(ctx.queryParamMap()).thenReturn(queryParams);
    when(ctx.queryParamAsClass(RequestController.FOOD_TYPE_KEY, String.class))
      .thenReturn(Validator.create(String.class, "meat", RequestController.FOOD_TYPE_KEY));

    requestController.getRequests(ctx);

    verify(ctx).json(requestArrayListCaptor.capture());
    verify(ctx).status(HttpStatus.OK);

    // Confirm that all the requests passed to `json` work for food.
    for (Request request : requestArrayListCaptor.getValue()) {
      assertEquals("meat", request.foodType);
    }
  }
  /*
  @Test
  public void canGetRequestWithItemTypeUppercase() throws IOException {
    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put(RequestController.ITEM_TYPE_KEY, Arrays.asList(new String[] {"FOOD"}));
    when(ctx.queryParamMap()).thenReturn(queryParams);
    when(ctx.queryParamAsClass(RequestController.ITEM_TYPE_KEY, String.class))
      .thenReturn(Validator.create(String.class, "FOOD", RequestController.ITEM_TYPE_KEY));

    requestController.getRequests(ctx);

    verify(ctx).json(requestArrayListCaptor.capture());
    verify(ctx).status(HttpStatus.OK);

    for (Request request : requestArrayListCaptor.getValue()) {
      assertEquals("FOOD", request.itemType);
    }
  } */

  @Test
  void getRequestByItemTypeAndFoodType() throws IOException {
    Map<String, List<String>> queryParams = new HashMap<>();
    queryParams.put(RequestController.ITEM_TYPE_KEY, Arrays.asList(new String[] {"food"}));
    queryParams.put(RequestController.FOOD_TYPE_KEY, Arrays.asList(new String[] {"fruit"}));
    when(ctx.queryParamMap()).thenReturn(queryParams);
    when(ctx.queryParamAsClass(RequestController.ITEM_TYPE_KEY, String.class))
      .thenReturn(Validator.create(String.class, "food", RequestController.ITEM_TYPE_KEY));
    when(ctx.queryParamAsClass(RequestController.FOOD_TYPE_KEY, String.class))
      .thenReturn(Validator.create(String.class, "fruit", RequestController.FOOD_TYPE_KEY));

    requestController.getRequests(ctx);

    verify(ctx).json(requestArrayListCaptor.capture());
    verify(ctx).status(HttpStatus.OK);
    assertEquals(1, requestArrayListCaptor.getValue().size());
    for (Request request : requestArrayListCaptor.getValue()) {
      assertEquals("food", request.itemType);
      assertEquals("fruit", request.foodType);
    }
  }

  @Test
  void getRequestByID() throws IOException {
    String id = samsId.toHexString();
    when(ctx.pathParam("id")).thenReturn(id);

    requestController.getRequest(ctx);

    verify(ctx).json(requestCaptor.capture());
    verify(ctx).status(HttpStatus.OK);
    assertEquals("food", requestCaptor.getValue().itemType);
    assertEquals("steak", requestCaptor.getValue().description);
    assertEquals("meat", requestCaptor.getValue().foodType);

  }



  /*
  @Test
  void getUserWithExistentId() throws IOException {
    String id = samsId.toHexString();
    when(ctx.pathParam("id")).thenReturn(id);

    userController.getUser(ctx);

    verify(ctx).json(userCaptor.capture());
    verify(ctx).status(HttpStatus.OK);
    assertEquals("Sam", userCaptor.getValue().name);
    assertEquals(samsId.toHexString(), userCaptor.getValue()._id);
  }

  @Test
  void getUserWithBadId() throws IOException {
    when(ctx.pathParam("id")).thenReturn("bad");

    Throwable exception = assertThrows(BadRequestResponse.class, () -> {
      userController.getUser(ctx);
    });

    assertEquals("The requested user id wasn't a legal Mongo Object ID.", exception.getMessage());
  }

  @Test
  void getUserWithNonexistentId() throws IOException {
    String id = "588935f5c668650dc77df581";
    when(ctx.pathParam("id")).thenReturn(id);

    Throwable exception = assertThrows(NotFoundResponse.class, () -> {
      userController.getUser(ctx);
    });

    assertEquals("The requested user was not found", exception.getMessage());
  }

  @Test
  void addUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"Test User\","
        + "\"age\": 25,"
        + "\"company\": \"testers\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    userController.addNewUser(ctx);
    verify(ctx).json(mapCaptor.capture());

    // Our status should be 201, i.e., our new user was successfully created.
    verify(ctx).status(HttpStatus.CREATED);

    //Verify that the user was added to the database with the correct ID
    Document addedUser = db.getCollection("users")
      .find(eq("_id", new ObjectId(mapCaptor.getValue().get("id")))).first();

    // Successfully adding the user should return the newly generated, non-empty MongoDB ID for that user.
    assertNotEquals("", addedUser.get("_id"));
    assertEquals("Test User", addedUser.get("name"));
    assertEquals(25, addedUser.get(UserController.AGE_KEY));
    assertEquals("testers", addedUser.get(UserController.COMPANY_KEY));
    assertEquals("test@example.com", addedUser.get("email"));
    assertEquals("viewer", addedUser.get(UserController.ROLE_KEY));
    assertNotNull(addedUser.get("avatar"));
  }

  @Test
  void addInvalidEmailUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"Test User\","
        + "\"age\": 25,"
        + "\"company\": \"testers\","
        + "\"email\": \"invalidemail\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });

    // Our status should be 400, because our request contained information that didn't validate.
    // However, I'm not yet sure how to test the specifics about validation problems encountered.
    // verify(ctx).status(HttpStatus.BAD_REQUEST);
  }

  @Test
  void addInvalidAgeUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"Test User\","
        + "\"age\": \"notanumber\","
        + "\"company\": \"testers\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void add0AgeUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"Test User\","
        + "\"age\": 0,"
        + "\"company\": \"testers\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void add150AgeUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"Test User\","
        + "\"age\": 150,"
        + "\"company\": \"testers\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void addNullNameUser() throws IOException {
    String testNewUser = "{"
        + "\"age\": 25,"
        + "\"company\": \"testers\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void addInvalidNameUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"\","
        + "\"age\": 25,"
        + "\"company\": \"testers\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void addInvalidRoleUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"Test User\","
        + "\"age\": 25,"
        + "\"company\": \"testers\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"invalidrole\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void addNullCompanyUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"Test User\","
        + "\"age\": 25,"
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void addInvalidCompanyUser() throws IOException {
    String testNewUser = "{"
        + "\"name\": \"\","
        + "\"age\": 25,"
        + "\"company\": \"\","
        + "\"email\": \"test@example.com\","
        + "\"role\": \"viewer\""
        + "}";
    when(ctx.bodyValidator(User.class))
      .then(value -> new BodyValidator<User>(testNewUser, User.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  void deleteFoundUser() throws IOException {
    String testID = samsId.toHexString();
    when(ctx.pathParam("id")).thenReturn(testID);

    // User exists before deletion
    assertEquals(1, db.getCollection("users").countDocuments(eq("_id", new ObjectId(testID))));

    userController.deleteUser(ctx);

    verify(ctx).status(HttpStatus.OK);

    // User is no longer in the database
    assertEquals(0, db.getCollection("users").countDocuments(eq("_id", new ObjectId(testID))));
  }

  @Test
  void tryToDeleteNotFoundUser() throws IOException {
    String testID = samsId.toHexString();
    when(ctx.pathParam("id")).thenReturn(testID);

    userController.deleteUser(ctx);
    // User is no longer in the database
    assertEquals(0, db.getCollection("users").countDocuments(eq("_id", new ObjectId(testID))));

    assertThrows(NotFoundResponse.class, () -> {
      userController.deleteUser(ctx);
    });

    verify(ctx).status(HttpStatus.NOT_FOUND);

    // User is still not in the database
    assertEquals(0, db.getCollection("users").countDocuments(eq("_id", new ObjectId(testID))));
  }

}
 */

 @Test
 void deleteFoundRequest() throws IOException {
   String testID = samsId.toHexString();
   when(ctx.pathParam("id")).thenReturn(testID);

   // Request exists before deletion
   assertEquals(1, db.getCollection("requests").countDocuments(eq("_id", new ObjectId(testID))));

   requestController.deleteRequest(ctx);

   verify(ctx).status(HttpStatus.OK);

   // Request is no longer in the database
   assertEquals(0, db.getCollection("requests").countDocuments(eq("_id", new ObjectId(testID))));
 }

 @Test
 void tryToDeleteNotFoundRequest() throws IOException {
   String testID = samsId.toHexString();
   when(ctx.pathParam("id")).thenReturn(testID);

   requestController.deleteRequest(ctx);
   // Request is no longer in the database
   assertEquals(0, db.getCollection("requests").countDocuments(eq("_id", new ObjectId(testID))));

   assertThrows(NotFoundResponse.class, () -> {
     requestController.deleteRequest(ctx);
   });

   verify(ctx).status(HttpStatus.NOT_FOUND);

   // Request is still not in the database
   assertEquals(0, db.getCollection("requests").countDocuments(eq("_id", new ObjectId(testID))));
 }
}
