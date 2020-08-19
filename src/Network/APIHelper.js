import AppUtilities from './../Utilities/AppUtilities';
import NetInfo from "@react-native-community/netinfo";
export default class APIHelper {
    static END_POINT = "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98";
    static DEFAULT_MESSAGE = "'Something went wrong. Please try again.'";
    static NETWORK_CONNECTION_ERROR = "You must have a working internet connection in order to perform this action";

    static instance = APIHelper.instance || new APIHelper()

    getLatestNews(successBlock, errorBlock) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        console.log('getLatestNews called')
        fetch(APIHelper.END_POINT)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Resonse responseJson = ', responseJson)
                this.handleResponse(responseJson, successBlock);
            })
            .catch((error) => {
                console.log('Resonse = ', error)
                NetInfo.isConnected.fetch().then(isConnected => {
                    if (isConnected) {
                        if (errorBlock) {
                            errorBlock(error)
                        } else {
                            AppUtilities.showAlert(APIHelper.DEFAULT_MESSAGE)
                        }
                    } else {
                        AppUtilities.showAlert(APIHelper.NETWORK_CONNECTION_ERROR)
                    }
                });
            });
    }

    handleResponse(responseJson, successBlock) {
        if (responseJson.status == 'error') {
          AppUtilities.showAlert(responseJson.message, 'Ok')
        } else if (successBlock && successBlock != undefined) {
          successBlock(responseJson)
        }
      }

}