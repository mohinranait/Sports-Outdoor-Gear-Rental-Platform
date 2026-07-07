import { GearWhereInput } from "../../../generated/prisma/models";

export interface IGearQuery extends GearWhereInput {
  searchTerm?:string;
  page?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
  sortOrder?: 'asc' | 'desc';
  sortBy?:  'createdAt' | 'title';
} 