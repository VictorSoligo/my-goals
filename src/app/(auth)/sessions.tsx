import { AddSessionButton } from '@/components/add-session-button'
import { Screen } from '@/components/screen'
import { SessionList } from '@/components/session-list'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'

export default function SessionsScreen() {
  return (
    <Screen title="Sessions">
      <Box className="flex-row items-center justify-between mb-8">
        <Text size="xl">Sessions list</Text>

        <AddSessionButton />
      </Box>

      <SessionList />
    </Screen>
  )
}
