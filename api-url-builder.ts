import { Schema } from "effect";
import {
  HttpApi,
  HttpApiClient,
  HttpApiEndpoint,
  HttpApiGroup,
} from "effect/unstable/httpapi";

class ExampleGroup extends HttpApiGroup.make("ExampleGroup")
  .add(
    HttpApiEndpoint.get("foo", "/foo", {
      success: Schema.Number,
    }),
  )
  .prefix("/example") {}

class ExampleApi extends HttpApi.make("ExampleApi")
  .add(ExampleGroup)
  .prefix("/api") {}

const urlBuilder = HttpApiClient.urlBuilder<typeof ExampleApi>({
  baseUrl: "https://example.com",
});

console.log(urlBuilder("ExampleGroup", "GET /example/foo"));
