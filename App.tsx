import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Button } from '@/components/ui/button'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { client } from '@/lib/drizzle'
import migrations from './drizzle/migrations/migrations'
import './src/styles/global.css'

export default function App() {
  const { success, error } = useMigrations(client, migrations)

  if (error) {
    return <Text>Migration errror</Text>
  }

  if (!success) {
    return <Text>Migrating...</Text>
  }

  return (
    <GluestackUIProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <Button variant="outline">
          <Text>Login</Text>
        </Button>

        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  )
}
