import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
        headerStyle: {
          backgroundColor: '#121212'
        },
        headerTintColor: '#fff'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Daily Guess'
        }}
      />
    </Tabs>
  )
}
