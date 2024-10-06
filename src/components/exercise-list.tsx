import { useFetchExercises } from '@/hooks/use-fetch-exercises'
import { FlatList } from 'react-native'
import { Box } from './ui/box'
import { Card } from './ui/card'
import { Text } from './ui/text'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export function ExerciseList() {
  const { data } = useFetchExercises()

  const exercises = data?.exercises

  return (
    <Box className="pb-52">
      <FlatList
        data={exercises ?? []}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>Vazio</Text>}
        ItemSeparatorComponent={() => <Box className="h-4" />}
        renderItem={({ item }) => (
          <Card
            variant="outline"
            size="sm"
            className="flex-row justify-between items-center"
          >
            <Box>
              <Text size="md">{item.name}</Text>

              <Text size="sm" className="text-typography-600">
                {item.category}
              </Text>
            </Box>

            <FontAwesome6 name="dumbbell" size={24} color="#fff" />
          </Card>
        )}
      />
    </Box>
  )
}
