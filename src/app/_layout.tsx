import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { client } from '@/lib/drizzle'
import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { Stack } from 'expo-router'
import { Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import migrations from '../../drizzle/migrations/migrations'
import '../styles/global.css'

export default function RootLayout() {
  const { success, error } = useMigrations(client, migrations)

  if (error) {
    return <Text>Migration errror</Text>
  }

  if (!success) {
    return <Text>Migrating...</Text>
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />

            <Stack.Screen
              name="add-exercise"
              options={{ headerShown: false }}
            />
          </Stack>

          <StatusBar style="light" backgroundColor="#303956" />
        </GluestackUIProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
