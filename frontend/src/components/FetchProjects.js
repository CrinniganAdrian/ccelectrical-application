import axios from "axios";

// Production URL (AWS Elastic Beanstalk)
//export const ITEM_API_BASE_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/";
// Local Development URL
export const ITEM_API_BASE_URL = "http://localhost:8080/";

export const FetchProjects = async () => {
  try {
    return await axios.get(`${PROJECT_API_BASE_URL}/projects`);
  } catch (e) {
    return [];
  }
};