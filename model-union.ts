import { Model } from "effect/unstable/schema";

class Test extends Model.Class<Test>("Test")({
  createdAt: Model.DateTimeInsertFromDate,
  updatedAt: Model.DateTimeUpdate,
}) {}

class Test2 extends Model.Class<Test2>("Test2")({
  createdAt: Model.DateTimeInsertFromDate,
  updatedAt: Model.DateTimeUpdate,
}) {}

const x = Model.Union([Test, Test2]);
