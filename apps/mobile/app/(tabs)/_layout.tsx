import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import React from 'react'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6036a2',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: '#333'
        },
        headerStyle: {
          backgroundColor: '#121212'
        },
        headerTintColor: '#fff'
      }}
    >
      <Tabs.Screen
        name="daily-guess"
        options={{
          title: 'Daily Guess',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="gamepad" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null // Hide the default index tab
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null // Hide the demo tab
        }}
      />
    </Tabs>
  )
}
