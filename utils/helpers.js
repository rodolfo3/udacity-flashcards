import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';


const NOTIFICATION_KEY = 'Flashcards:notifications';


function createNotification () {
  return {
    title: "Let's study",
    body: "You need to study today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}


function clearLocalNotification () {
  console.log('clearLocalNotification');
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}


export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        console.log('setLocalNotification');
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              .catch(err => console.error('Error setting notification:', err));

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}


export function updateLocalNotification() {
  return clearLocalNotification()
    .catch(e => null) // ignore errors
    .then(() => setLocalNotification());
}
