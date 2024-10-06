import { AddExerciseButton } from '@/components/add-exercise-button'
import { ExerciseList } from '@/components/exercise-list'
import { Screen } from '@/components/screen'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'

export default function ExercisesScreen() {
  return (
    <Screen title="Exercises">
      <Box className="flex-row items-center justify-between mb-8">
        <Text size="xl">Exercises list</Text>

        <AddExerciseButton />
      </Box>

      <ExerciseList />
    </Screen>
  )
}
