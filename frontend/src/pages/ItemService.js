import axios from 'axios';

// Production URL (AWS Elastic Beanstalk)
//const ITEM_API_BASE_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/items";
// Local Development URL
const ITEM_API_BASE_URL = "http://localhost:8080/items";

class ItemService {

    getItems(){
        return axios.get(ITEM_API_BASE_URL);
    }

    newItem(item){
        return axios.post(ITEM_API_BASE_URL, item);
    }

    getItemById(itemId){
        return axios.get(ITEM_API_BASE_URL + '/' + itemId);
    }

    updateItem(item, itemId){
        return axios.put(ITEM_API_BASE_URL + '/' + itemId, item);
    }

    deleteItem(itemId){
        return axios.delete(ITEM_API_BASE_URL + '/' + itemId);
    }
}

export default new ItemService()