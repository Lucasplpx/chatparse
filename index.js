import { AppRegistry } from 'react-native';
import './src/config/chatConfig';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
