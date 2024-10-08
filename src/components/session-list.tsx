import { useFetchSessions } from '@/hooks/use-fetch-sessions'
import { FlatList } from 'react-native'
import { Box } from './ui/box'
import { Card } from './ui/card'
import { Text } from './ui/text'
import dayjs from 'dayjs'

export function SessionList() {
  const { data } = useFetchSessions()

  const sessions = data?.sessions

  return (
    <Box className="pb-52">
      <FlatList
        data={sessions ?? []}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>Create new sessions</Text>}
        ItemSeparatorComponent={() => <Box className="h-4" />}
        renderItem={({ item }) => (
          <Card variant="outline" size="sm">
            <Text>{dayjs(item.createdAt).format('MMMM DD, YYYY')}</Text>

            <Box className="flex-row justify-between items-center mt-4 mb-4">
              <Text>Exercise</Text>
              <Text>Weight / Reps</Text>
            </Box>

            <Box>
              {item.exercises.map(
                ({ exerciseId, reps, exerciseName, weight }) => (
                  <Box
                    key={exerciseId}
                    className="flex-row justify-between items-center mb-2 bg-background-700 rounded-sm p-2"
                  >
                    <Text>{exerciseName}</Text>

                    <Text>
                      {weight} kg x {reps}
                    </Text>
                  </Box>
                ),
              )}
            </Box>
          </Card>
        )}
      />
    </Box>
  )
}
