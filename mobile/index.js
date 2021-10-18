/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

//YellowBox.ignoreWarnings(['Remote debugger']);
LogBox.ignoreLogs(['Warning: [mobx.array]', 'Warning: VirtualizedLists'])
LogBox.ignoreAllLogs(true);
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
