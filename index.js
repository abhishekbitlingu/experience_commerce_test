/**
 * @format
 */
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import RNLocalNotifications from 'react-native-local-notifications';
import { name as appName } from './app.json';
import App from './src/App';

AppRegistry.registerHeadlessTask('ShowNotification', () => async data => {
    console.log('Notification data = ' + data.message)
    var m = new Date();
    m.setMinutes(m.getMinutes() + 1)
    var dateString =
        m.getFullYear() + "-" +
        ("0" + (m.getMonth() + 1)).slice(-2) + "-" +
        ("0" + m.getDate()).slice(-2) + " " +
        ("0" + m.getHours()).slice(-2) + ":" +
        ("0" + m.getMinutes()).slice(-2);
    console.log(dateString);
    RNLocalNotifications.createNotification(1, data.message, dateString, 'default');
});
AppRegistry.registerComponent(appName, () => App);
