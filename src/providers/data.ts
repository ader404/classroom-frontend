import { BaseRecord, DataProvider, GetListParams, GetListResponse, GetOneParams, GetOneResponse } from "@refinedev/core"
import { MOCK_SUBJECTS } from "../constants/mockData";


export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource === "subjects") return { data: MOCK_SUBJECTS as unknown as TData[], total: MOCK_SUBJECTS.length };

    return { data: [], total: 0 };

  },
  getOne: async () => {
    throw new Error("Not implemented");
  },
  create: async () => {
    throw new Error("Not implemented");
  },
  update: async () => {
    throw new Error("Not implemented");
  },
  deleteOne: async () => {
    throw new Error("Not implemented");
  },



  getApiUrl: () => '',

}