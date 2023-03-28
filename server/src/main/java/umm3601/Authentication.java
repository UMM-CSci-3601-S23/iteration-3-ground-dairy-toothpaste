package umm3601;

import io.javalin.http.Context;
import io.javalin.http.ForbiddenResponse;
import io.javalin.http.HttpStatus;

public class Authentication {
  private boolean BYPASS_AUTH = false;

  public Authentication() {}

  public Authentication(boolean bypass) {
    BYPASS_AUTH = bypass;
  }

  /**
   * Check the authentication of a connection to make requests which requires a volunteer role
   * @param ctx
   */
  public void authenticate(Context ctx) throws ForbiddenResponse {
    if (BYPASS_AUTH || ctx.cookie("auth_token").equals("TOKEN")) {

    }
    else {
      ctx.status(HttpStatus.FORBIDDEN);
        throw new ForbiddenResponse("Client not authenticated");
    }
  }
}
