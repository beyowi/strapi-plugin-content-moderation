import { has, get, omit } from "lodash";

const moderatedPath = ["pluginOptions", "moderation", "moderated"];

const mutateCTBContentTypeSchema = (nextSchema, prevSchema) => {
  // Don't perform mutations components
  if (!has(nextSchema, moderatedPath)) {
    return nextSchema;
  }

  const isNextSchemaModerated = get(nextSchema, moderatedPath, false);
  const isPrevSchemaModerated = get(
    prevSchema,
    ["schema", ...moderatedPath],
    false
  );

  // No need to perform modification on the schema, if moderation feature was not changed
  // at the ct level
  if (isNextSchemaModerated && isPrevSchemaModerated) {
    return nextSchema;
  }

  // Remove moderation object from the pluginOptions
  if (!isNextSchemaModerated) {
    const pluginOptions = omit(nextSchema.pluginOptions, "moderation");

    return { ...nextSchema, pluginOptions };
  }

  return nextSchema;
};
export default mutateCTBContentTypeSchema;
