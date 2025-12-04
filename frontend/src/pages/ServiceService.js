import axios from 'axios';

// Production URL (AWS Elastic Beanstalk)
//const PROJECT_API_BASE_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/ccservices";
// Local Development URL
const PROJECT_API_BASE_URL = "http://localhost:8082/ccservices";

class ServiceService {

    getServices(){
        return axios.get(PROJECT_API_BASE_URL);
    }

    newService(service){
        return axios.post(PROJECT_API_BASE_URL, service);
    }

    getServiceById(serviceId){
        return axios.get(PROJECT_API_BASE_URL + '/' + serviceId);
    }

    updateService(service, serviceId){
        return axios.put(PROJECT_API_BASE_URL + '/' + serviceId, service);
    }

    deleteService(serviceId){
        return axios.delete(PROJECT_API_BASE_URL + '/' + serviceId);
    }
}

export default new ServiceService()