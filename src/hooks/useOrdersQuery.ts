import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { OrderDataResponse } from "types/order";
import { apiBaseUrl } from "config";

const fetchSales = async (
  page: number,
  perPage: number,
  search: string,
  sortOrder: string
): Promise<OrderDataResponse> => {
  const response = await axios.get(
    `${apiBaseUrl}/orders/list?page=${page+1}&perPage=${perPage}&search=${search}&sortBy=created_at&order=${sortOrder}`
  );
  return response.data;
};

export const useOrdersQuery = (
  page: number,
  perPage: number,
  search: string,
  sortOrder: string
): UseQueryResult<OrderDataResponse> => {
  return useQuery(["sales", page, perPage, search, sortOrder], () =>
    fetchSales(page, perPage, search, sortOrder)
  );
};
