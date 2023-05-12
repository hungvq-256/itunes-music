import ApiClient from "./ApiClient";

export const getSongList = async (querySearch = "") => {
  const { data } = await ApiClient.get(
    "/search",
    querySearch && { term: querySearch }
  );
  return data;
};
