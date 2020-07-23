import axios from "axios";

const url = "http://localhost:3001/members";
export const fetchData = async () => {
  const { data } = await axios.get(url);
  return data;
};
