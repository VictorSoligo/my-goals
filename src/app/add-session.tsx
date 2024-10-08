import { Screen } from '@/components/screen'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input, InputField } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useFetchExercises } from '@/hooks/use-fetch-exercises'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useCreateSession } from '@/hooks/use-create-session'
import { useRouter } from 'expo-router'

interface Exercise {
  weight: string
  reps: string
  exerciseId: string
}

export default function AddSessionScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { reps: '', weight: '', exerciseId: '' },
  ])

  const { data } = useFetchExercises()

  const userExercises = data?.exercises ?? []

  const router = useRouter()
  const { mutateAsync } = useCreateSession()

  function onExerciseChange(
    exerciseIndex: number,
    field: string,
    value: string,
  ) {
    const newExercises = [...exercises]

    newExercises[exerciseIndex] = {
      ...newExercises[exerciseIndex],
      [field]: value,
    }

    setExercises(newExercises)
  }

  function handleAddExercise() {
    setExercises([...exercises, { reps: '', weight: '', exerciseId: '' }])
  }

  function handleRemoveExercise(exerciseIndex: number) {
    const newExercises = exercises.filter((_, index) => index !== exerciseIndex)

    setExercises(newExercises)
  }

  async function handleSubmit() {
    if (exercises.length === 0) {
      return
    }

    if (exercises.some((exercise) => !exercise.exerciseId)) {
      return
    }

    await mutateAsync({
      exercises: exercises.map((exercise) => {
        return {
          exerciseId: exercise.exerciseId,
          reps: Number(exercise.reps),
          weight: Number(exercise.weight),
        }
      }),
    })

    setExercises([{ reps: '', weight: '', exerciseId: '' }])

    router.dismiss()
  }

  return (
    <Screen title="Add session" dismiss>
      {exercises.map((exercise, exerciseIndex) => {
        return (
          <Box className="gap-4 mb-4" key={exerciseIndex}>
            <Box className="border border-white rounded-md">
              <Picker
                selectedValue={exercise.exerciseId}
                onValueChange={(value) =>
                  onExerciseChange(exerciseIndex, 'exerciseId', value)
                }
                dropdownIconColor="#fff"
                style={{
                  color: '#fff',
                }}
              >
                <Picker.Item label="Select an exercise" value="" />

                {userExercises.map((exercise) => {
                  return (
                    <Picker.Item
                      key={exercise.id}
                      label={exercise.name}
                      value={exercise.id}
                    />
                  )
                })}
              </Picker>
            </Box>

            <Input variant="outline">
              <InputField
                placeholder="Reps"
                value={String(exercise.reps)}
                onChangeText={(value) =>
                  onExerciseChange(exerciseIndex, 'reps', value)
                }
              />
            </Input>

            <Input variant="outline">
              <InputField
                placeholder="Weight"
                value={String(exercise.weight)}
                onChangeText={(value) =>
                  onExerciseChange(exerciseIndex, 'weight', value)
                }
              />
            </Input>

            {exerciseIndex !== exercises.length - 1 && (
              <Box className="h-0.5 bg-background-header" />
            )}
          </Box>
        )
      })}

      <Box className="mb-4 flex-row justify-end gap-4">
        <Button
          variant="outline"
          onPress={() => handleRemoveExercise(exercises.length - 1)}
        >
          <Text>Remove last exercise</Text>
        </Button>

        <Button variant="outline" onPress={handleAddExercise}>
          <Text>Add exercise</Text>
        </Button>
      </Box>

      <Button onPress={handleSubmit} className="bg-background-header">
        <Text>Save session</Text>
      </Button>
    </Screen>
  )
}
