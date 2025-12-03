import axios from "axios";

// Production URL (AWS Elastic Beanstalk)
//const API_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/api/auth/";
// Local Development URL
const API_URL = "http://localhost:8080/api/auth/";

// Production URL (AWS Elastic Beanstalk)
//const USER_API_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/users/";
// Local Development URL
const USER_API_URL = "http://localhost:8080/users/";

const ITEMS_API_URL = "/items/";
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  deleteUserItem(userId,itemName){
    return axios.delete(USER_API_URL + userId + ITEMS_API_URL + itemName);
  }

  deleteUserService(serviceId){
    return axios.delete(USER_API_URL + '/' + serviceId);
  }

  deleteUserProject(projectId){
    return axios.delete(USER_API_URL + '/' + projectId);
  }
}
export default new AuthService();
