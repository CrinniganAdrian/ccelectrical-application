import axios from 'axios';
const instance = axios.create({
    // Production URL (AWS Elastic Beanstalk)
    //baseURL: 'http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/'
    // Local Development URL
    baseURL: 'http://localhost:8082/'
});
export default instance;