import { Model } from "effect/unstable/schema";
import { SqlSchema } from "effect/unstable/sql";
import { Effect } from "effect";

class Test extends Model.Class<Test>("Test")({
  createdAt: Model.DateTimeInsertFromDate,
  updatedAt: Model.DateTimeUpdate,
}) {}

const insertTest = SqlSchema.void({
  Request: Test.insert,
  execute: () => Effect.void,
});

insertTest({
  createdAt: undefined,
  updatedAt: undefined,
});
