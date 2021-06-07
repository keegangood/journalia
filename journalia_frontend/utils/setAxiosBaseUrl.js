import axios from "axios";

const setAxiosBaseUrl = (url) => {
  axios.defaults.baseURL = url;
};

export default setAxiosBaseUrl;