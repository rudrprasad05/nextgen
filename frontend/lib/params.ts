import qs from "qs";
import { QueryObject } from "./models";

export const buildMediaQueryParams = (query?: QueryObject) => {
  const q = createQueryObject(query);
  return qs.stringify(q, { skipNulls: true });
};

export function createQueryObject(query?: QueryObject): QueryObject {
  const MAX_PAGE_SIZE = 100;

  if (!query) return {};

  return {
    sortBy: query.sortBy,
    pageNumber: query.pageNumber ?? 1,
    pageSize: Math.min(query.pageSize ?? 10, MAX_PAGE_SIZE),
    showInGallery: query.showInGallery,
    isDeleted: query.isDeleted,
    uuid: query.uuid,
  };
}
