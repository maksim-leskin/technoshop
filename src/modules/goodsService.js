import {API_URI} from "./var";

export const getGoods = ({page}) => {
  const url = new URL(`${API_URI}api/goods`)

  if (page) url.searchParams.append('page', page);

  return fetch(url).then(response => response.json())
}
