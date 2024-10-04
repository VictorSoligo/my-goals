import { StatusBar } from 'expo-status-bar'
import { Text, TextInput, View } from 'react-native'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Button } from '@/components/ui/button'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { client } from '@/lib/drizzle'
import migrations from './drizzle/migrations/migrations'
import './src/styles/global.css'
import { CreateExerciseUseCase } from '@/gym/application/use-cases/create-exercise'
import { DrizzleExercisesRepository } from '@/infra/database/drizzle/repositories/drizzle-exercises-repository'
import { useState } from 'react'
import { exercises } from './drizzle/schema'

export default function App() {
  const [name, setName] = useState('')

  const { success, error } = useMigrations(client, migrations)

  if (error) {
    return <Text>Migration errror</Text>
  }

  if (!success) {
    return <Text>Migrating...</Text>
  }

  async function handlePress() {
    const drizzleExercisesRepository = new DrizzleExercisesRepository()

    const createExerciseUseCase = new CreateExerciseUseCase(
      drizzleExercisesRepository,
    )

    await createExerciseUseCase.execute({ name })

    setName('')

    const list = client.select().from(exercises).all()

    console.log(list)
  }

  return (
    <GluestackUIProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <TextInput
          placeholder="Name"
          className="border p-2 w-[200px] mb-4"
          value={name}
          onChangeText={(v) => setName(v)}
        />

        <Button variant="outline" onPress={handlePress}>
          <Text>Cadastrar</Text>
        </Button>

        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  )
}
