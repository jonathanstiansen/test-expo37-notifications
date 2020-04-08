import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

export default function App () {
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      console.warn('Device', Constants.isDevice)
      if (Constants.isDevice) {
        const {status: existingStatus} = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        )
        console.warn('Got')
        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
          console.warn('1', existingStatus)
          const {status} = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          )
          console.warn('Getting')
          finalStatus = status
        }

        console.warn('Onward', finalStatus)

        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          console.warn('finalStatus', finalStatus)
          return
        }

        console.warn('Test')
        console.warn(Notifications)
        // const a =
        //   {
        //     '_setInitialNotification': [Function _setInitialNotification],
        //     'addListener': [Function addListener],
        //     'cancelAllScheduledNotificationsAsync': [Function cancelAllScheduledNotificationsAsync],
        //     'cancelScheduledNotificationAsync': [Function cancelScheduledNotificationAsync],
        //     'createCategoryAsync': [Function createCategoryAsync],
        //     'createChannelAndroidAsync': [Function createChannelAndroidAsync],
        //     'deleteCategoryAsync': [Function deleteCategoryAsync],
        //     'deleteChannelAndroidAsync': [Function deleteChannelAndroidAsync],
        //     'dismissAllNotificationsAsync': [Function dismissAllNotificationsAsync],
        //     'dismissNotificationAsync': [Function dismissNotificationAsync],
        //     'getBadgeNumberAsync': [Function getBadgeNumberAsync],
        //     'getDevicePushTokenAsync': [Function getDevicePushTokenAsync],
        //     'getExpoPushTokenAsync': [Function getExpoPushTokenAsync],
        //     'presentLocalNotificationAsync': [Function presentLocalNotificationAsync],
        //     'scheduleLocalNotificationAsync': [Function scheduleLocalNotificationAsync],
        //     'scheduleNotificationWithCalendarAsync': [Function scheduleNotificationWithCalendarAsync],
        //     'scheduleNotificationWithTimerAsync': [Function scheduleNotificationWithTimerAsync],
        //     'setBadgeNumberAsync': [Function setBadgeNumberAsync]
        //   }

        let token = await Notifications.getExpoPushTokenAsync()
        let token1 = await Notifications.getDevicePushTokenAsync()
        console.warn("Token", JSON.stringify(token))
        console.warn("Token1", JSON.stringify(token1))
      } else {
        alert('Must use physical device for Push Notifications')
      }
    }
    registerForPushNotificationsAsync()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
