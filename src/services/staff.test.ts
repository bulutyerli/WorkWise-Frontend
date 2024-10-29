import { describe, it, expect, vi } from 'vitest';

import axiosAuth from '../utils/axiosAuth';
import { AxiosResponse } from 'axios';
import {
  mockCategories,
  mockNewStaffData,
  mockStaffData,
  mockStaffDates,
  mockStaffList,
} from '../__mocks__/mockData';
import {
  createNewStaff,
  getAllCategories,
  getStaffById,
  getStaffDates,
  getStaffList,
} from './staff';

vi.mock('../utils/axiosAuth');

describe('Staff API functions', () => {
  it('getStaffList should fetch a list of staff', async () => {
    vi.spyOn(axiosAuth, 'get').mockResolvedValue({
      data: mockStaffList,
    } as AxiosResponse);

    const page = 1;
    const filters = {};
    const data = await getStaffList(page, filters);

    expect(data).toEqual(mockStaffList);
    expect(axiosAuth.get).toHaveBeenCalledWith('/staff', {
      params: new URLSearchParams({ page: '1' }),
    });
  });

  it('getStaffById should fetch staff details by ID', async () => {
    vi.spyOn(axiosAuth, 'get').mockResolvedValue({
      data: mockStaffData,
    } as AxiosResponse);

    const data = await getStaffById(1);

    expect(data).toEqual(mockStaffData);
    expect(axiosAuth.get).toHaveBeenCalledWith('/staff/1');
  });

  it('createNewStaff should post a new staff', async () => {
    vi.spyOn(axiosAuth, 'post').mockResolvedValue({
      data: mockNewStaffData,
    } as AxiosResponse);

    const data = await createNewStaff(mockNewStaffData);

    expect(data).toEqual(mockNewStaffData);
    expect(axiosAuth.post).toHaveBeenCalledWith('/staff/', mockNewStaffData);
  });

  it('getAllCategories should fetch categories', async () => {
    vi.spyOn(axiosAuth, 'get').mockResolvedValue({
      data: mockCategories,
    } as AxiosResponse);

    const data = await getAllCategories();

    expect(data).toEqual(mockCategories);
    expect(axiosAuth.get).toHaveBeenCalledWith('/categories');
  });

  it('getStaffDates should fetch staff dates', async () => {
    vi.spyOn(axiosAuth, 'get').mockResolvedValue({
      data: mockStaffDates,
    } as AxiosResponse);

    const data = await getStaffDates();

    expect(data).toEqual(mockStaffDates);
    expect(axiosAuth.get).toHaveBeenCalledWith('staff-dates');
  });
});
