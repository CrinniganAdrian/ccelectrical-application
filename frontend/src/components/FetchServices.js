import axios from "axios";

// Production URL (AWS Elastic Beanstalk)
//export const ITEM_API_BASE_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/";
// Local Development URL
export const ITEM_API_BASE_URL = "http://localhost:8082/";

export const FetchServices = async () => {
  try {
    return await axios.get(`${SERVICE_API_BASE_URL}/ccservices`);
  } catch (e) {
    return [];
  }
};