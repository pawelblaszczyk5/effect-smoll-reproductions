import { Schema, ServiceMap } from "effect";
import {
  HttpApi,
  HttpApiClient,
  HttpApiEndpoint,
  HttpApiError,
  HttpApiGroup,
  HttpApiMiddleware,
  HttpApiSecurity,
} from "effect/unstable/httpapi";

class CurrentSession extends ServiceMap.Service<
  CurrentSession,
  { userId: string }
>()("CurrentSession") {}

class AuthenticatedOnly extends HttpApiMiddleware.Service<
  AuthenticatedOnly,
  { provides: CurrentSession }
>()("AuthenticatedOnly", {
  error: HttpApiError.Unauthorized,
  security: {
    sessionToken: HttpApiSecurity.bearer,
  },
}) {}

class ExampleGroup extends HttpApiGroup.make("ExampleGroup")
  .add(
    HttpApiEndpoint.get("foo", "/foo", {
      success: Schema.Number,
    }),
  )
  .middleware(AuthenticatedOnly) {}

class ExampleApi extends HttpApi.make("ExampleApi")
  .add(ExampleGroup)
  .prefix("/api") {}

const urlBuilder = HttpApiClient.urlBuilder(ExampleApi, {
  baseUrl: "https://example.com",
});

console.log(urlBuilder.ExampleGroup.foo());
