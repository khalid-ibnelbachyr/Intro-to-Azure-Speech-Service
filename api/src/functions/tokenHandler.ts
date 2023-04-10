import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";

export async function tokenHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION;

  context.log(speechKey)
  context.log(speechRegion)
  
  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    );
    return {
      jsonBody: { token: tokenResponse.data, region: speechRegion },
      status: 200,
    };
  } catch (err) {
    return {
      status: 401,
      body: "There was an error authorizing your speech key.",
    };
  }
}

app.http("tokenHandler", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: tokenHandler,
});
