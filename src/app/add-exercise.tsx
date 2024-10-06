import { Screen } from '@/components/screen'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input, InputField } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useCreateExercise } from '@/hooks/use-create-exercise'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export default function AddExerciseScreen() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  const router = useRouter()
  const { mutateAsync } = useCreateExercise()

  async function handleSubmit() {
    if (!name) {
      return
    }

    await mutateAsync({ name, category })

    router.dismiss()

    setName('')
    setCategory('')
  }

  return (
    <Screen dismiss title="Add exercise">
      <Box className="flex gap-4">
        <Input variant="outline">
          <InputField
            autoFocus
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </Input>

        <Input variant="outline">
          <InputField
            placeholder="Category"
            value={category}
            onChangeText={(value) => setCategory(value)}
          />
        </Input>

        <Button onPress={handleSubmit} className="bg-background-header">
          <Text>Add</Text>
        </Button>
      </Box>
    </Screen>
  )
}
