import AsyncStorage from '@react-native-community/async-storage';
import Parse from 'parse/react-native';
import {
  PARSE_APPLICATION_ID,
  PARSE_HOST_URL,
  PARSE_JAVASCRIPT_ID,
} from '@env';

function chatConfig() {
  Parse.setAsyncStorage(AsyncStorage);
  Parse.serverURL = PARSE_HOST_URL;
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_ID);
}

export default chatConfig();
