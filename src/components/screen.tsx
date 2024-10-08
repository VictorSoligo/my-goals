import { ReactNode } from 'react'
import { Box } from './ui/box'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from './header'
import { ScrollView } from 'react-native'

interface ScreenProps {
  title: string
  dismiss?: boolean
  children: ReactNode
}

export function Screen({ title, dismiss = false, children }: ScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="bg-background-dark flex-1">
        <Header dismiss={dismiss} title={title} />

        <ScrollView>
          <Box className="p-4">{children}</Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}
