import { VariantSchema } from "effect/unstable/schema";

const y = VariantSchema.make({
  variants: ["test", "test2"],
  defaultVariant: "test",
});

y.Union([]);
