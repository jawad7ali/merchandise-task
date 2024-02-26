import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { currentUserState } from "../../../store";
import api from "../../../lib/services";
// import constants from "../../../config/constants";
import apiEndpoints from "../../../config/apiEndpoints";
import { Item } from "@/types/item.type";

// Auth operation and save
const useCustomHook = () => {
  const { CREATE_ITEM, UPDATE_ITEM, GET_ITEMS } = apiEndpoints;

  const createItem = async (body: Item): Promise<Item> => {
    const data = await api.post(CREATE_ITEM, body);
    return data;
  };

  const updateItem = async (id: number, body: Item): Promise<Item> => {
    const updateUrl = `${UPDATE_ITEM}/${id}`;
    const data = await api.put(updateUrl, body);
    return data;
  }

  const getItems = async (): Promise<any> => {
    const data = await api.get(GET_ITEMS);
    return data?.data || [];
  }

  const getItemById = async (id: string): Promise<Item> => {
    const getItemUrl = `${CREATE_ITEM}/${id}`;
    const { data } = await api.get(getItemUrl);
    return data;
  }

  const deleteItem = async (id: number): Promise<Item> => {
    const deleteUrl = `${UPDATE_ITEM}/${id}`;
    const { data } = await api.delete(deleteUrl);
    return data;
  }

  return {
    createItem,
    updateItem,
    getItems,
    getItemById,
    deleteItem
  };
};

export default useCustomHook;
