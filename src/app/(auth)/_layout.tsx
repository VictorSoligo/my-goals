import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: '#303956',
        tabBarInactiveBackgroundColor: '#303956',
        tabBarActiveTintColor: '#fff',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Exercícios',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="dumbbell" size={16} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sessions"
        options={{
          title: 'Sessões',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sports-martial-arts" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
