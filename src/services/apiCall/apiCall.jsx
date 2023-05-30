import axios from "axios";

function apiCall (url) {

  async function call (urlToCall) {
    try {
      const response = await axios.get(urlToCall);
      // console.log("API call response:");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("API error:");
      console.log(error);
    }
  }
  return call (url);

}

export default apiCall;