import { merge } from "lodash";
import userResolvers from "./user";
import eventResolvers from "./event";

// https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/

export default merge(userResolvers, eventResolvers);
