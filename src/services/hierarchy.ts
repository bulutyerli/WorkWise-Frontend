import axios, { AxiosResponse } from 'axios';
import { HierarchyType } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getHierarchy(): Promise<HierarchyType> {
  const url = `${API_URL}/hierarchy`;

  const response: AxiosResponse<HierarchyType> = await axios.get(url);
  return response.data;
}
