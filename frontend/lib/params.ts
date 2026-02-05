import qs from "qs";
import { QueryObject } from "./models";

export const buildMediaQueryParams = (query?: QueryObject) => {
  const q = createQueryObject(query);
  return qs.stringify(q, { skipNulls: true });
};

export function createQueryObject(query?: QueryObject): QueryObject {
  const MAX_PAGE_SIZE = 100;

  // Start with safe defaults
  const defaults: QueryObject = {
    pageNumber: 1,
    pageSize: 10,
  };

  if (!query) {
    return defaults;
  }

  // Take everything from input + apply defaults + clamp pageSize
  return {
    ...defaults,
    ...query, // ← spread takes care of all fields
    pageSize: Math.min(
      (query.pageSize ?? defaults.pageSize) || 1,
      MAX_PAGE_SIZE,
    ),
    pageNumber: query.pageNumber ?? defaults.pageNumber,
  };
}
