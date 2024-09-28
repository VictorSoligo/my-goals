import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Button } from '@/components/ui/button'
import './src/styles/global.css'

export default function App() {
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
