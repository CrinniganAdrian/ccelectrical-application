import axios from 'axios';

// Production URL (AWS Elastic Beanstalk)
//const PROJECT_API_BASE_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/projects";
// Local Development URL
const PROJECT_API_BASE_URL = "http://localhost:8080/projects";

class ProjectService {

    getProjects(){
        return axios.get(PROJECT_API_BASE_URL);
    }

    newProject(project){
        return axios.post(PROJECT_API_BASE_URL, project);
    }

    getProjectById(projectId){
        return axios.get(PROJECT_API_BASE_URL + '/' + projectId);
    }

    updateProject(project, projectId){
        return axios.put(PROJECT_API_BASE_URL + '/' + projectId, project);
    }

    deleteProject(projectId){
        return axios.delete(PROJECT_API_BASE_URL + '/' + projectId);
    }
}

export default new ProjectService()