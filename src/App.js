import React, { useEffect } from 'react';
import RootNavigator from './Navigation/Navigator';
import HeadlessWorkManager from 'react-native-headless-work-manager';

const App = () => {
  useEffect(() => {
    try {
			HeadlessWorkManager.enqueue({
				workRequestType: HeadlessWorkManager.PERIODIC_WORK_REQUEST,
				taskKey: 'ShowNotification',
				isUnique: true,
				existingWorkPolicy: HeadlessWorkManager.REPLACE,
				timeout: 2000,
				interval: 15,
				timeUnit: HeadlessWorkManager.MINUTES,
				data: {
          message: "This app is running in background"
        }
			});

			HeadlessWorkManager.getWorkInfosForUniqueWork('ShowNotification');
		} catch(err) {
			console.error(err);
		}
  })
  return (
    <RootNavigator />
  );
};

export default App;
