import axios from "axios";

// Production URL (AWS Elastic Beanstalk)
//export const ITEM_API_BASE_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/";
// Local Development URL
export const ITEM_API_BASE_URL = "http://localhost:8080/";

export const FetchItems = async () => {
  try {
    return await axios.get(`${ITEM_API_BASE_URL}/items`);
  } catch (e) {
    return [];
  }
};