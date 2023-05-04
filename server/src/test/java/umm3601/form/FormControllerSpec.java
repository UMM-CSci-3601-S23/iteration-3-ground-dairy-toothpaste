package umm3601.form;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
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

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

/**
 * Tests the logic of the FormController
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
class FormControllerSpec {

  // An instance of the controller we're testing that is prepared in
  // `setupEach()`, and then exercised in the various tests below.
  private FormController formController;

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

  @Mock
  private Context ctx;

  @Captor
  private ArgumentCaptor<ArrayList<Form>> formArrayListCaptor;

  @Captor
  private ArgumentCaptor<Form> formCaptor;

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

  @AfterAll/**
  * Tests the logic of the FormController
  *
  * @throws IOException
  */
  static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @BeforeEach
  void setupEach() throws IOException {
    // Reset our mock context and argument captor (declared with Mockito annotations @Mock and @Captor)
    MockitoAnnotations.openMocks(this);

    // Setup database
    MongoCollection<Document> formDocuments = db.getCollection("forms");
    formDocuments.drop();
    List<Document> testForms = new ArrayList<>();

    List<String> selections1 = Arrays.asList("Fruit", "more Fruit", "and fruit");
    List<String> selections2 = Arrays.asList("Diapers");
    testForms.add(
        new Document()
            .append("name", "Greg")
            .append("timeSubmitted", "")
            .append("diaperSize", "")
            .append("selections", selections1));
    testForms.add(
        new Document()
        .append("timeSubmitted", "")
            .append("diaperSize", "2")
            .append("name", "Ryan")
            .append("selections", selections2));

    samsId = new ObjectId();
    Document sam = new Document()
        .append("_id", samsId)
        .append("timeSubmitted", "03-06-2023")
        .append("diaperSize", "2")
        .append("name", "Mat")
        .append("selections", selections1);

    formDocuments.insertMany(testForms);
    formDocuments.insertOne(sam);

    formController = new FormController(db);
  }

  @Test
  void getAllFormRequests() throws IOException {
    formController.getForms(ctx);

    verify(ctx).status(HttpStatus.OK);
  }

  @Test
  void canAddNewForm() throws IOException {
    String testNewForm = "{}";
    when(ctx.body()).then(value -> testNewForm);

    formController.addNewForm(ctx);
    verify(ctx).json(mapCaptor.capture());

    // Our status should be 201, i.e., our new user was successfully created.
    verify(ctx).status(HttpStatus.CREATED);
  }

  // @Test
  // void tryToDeleteNotFoundRequest() throws IOException {
  //   String testID = samsId.toHexString();
  //   when(ctx.pathParam("id")).thenReturn(testID);

  //   formController.deleteForm(ctx);
  //   // Request is no longer in the database
  //   assertEquals(0, db.getCollection("forms").countDocuments(eq("_id", new ObjectId(testID))));

  //   assertThrows(NotFoundResponse.class, () -> {
  //     formController.deleteForm(ctx);
  //   });

  //   verify(ctx).status(HttpStatus.NOT_FOUND);

  //   // Request is still not in the database
  //   assertEquals(0, db.getCollection("forms").countDocuments(eq("_id", new ObjectId(testID))));
  // }

}
