import { apiClient, BASE_URL } from "./apiClient";
import type { Lending, LendingAddForm } from "../types/Lending";

const LENDING_API_URL = `${BASE_URL}/lend`;


export const getAllLendings = async (): Promise<Lending[]> => {
  const response = await apiClient.get(`${LENDING_API_URL}/get`);
  return response.data;
};


export const add_lending = async (lendingData:LendingAddForm ) => {
  const response = await apiClient.post(`${LENDING_API_URL}/create`, lendingData);
  return response;
};


export const update_lending = async (_id: string, lendingData: Omit<Lending, "_id" | "lendDate">) => {
  const response = await apiClient.put(`${LENDING_API_URL}/update/${_id}`, lendingData);
  return response;
};


export const delete_lending = async (_id: string): Promise<void> => {
  await apiClient.delete(`${LENDING_API_URL}/delete/${_id}`);
};
