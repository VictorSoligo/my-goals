import { Tabs } from 'expo-router'

export default function AuthLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Exercícios',
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="sessions"
        options={{
          title: 'Sessões',
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
