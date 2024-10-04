import { Button } from '@/components/ui/button'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { CreateExerciseUseCase } from '@/gym/application/use-cases/create-exercise'
import { FetchExercisesUseCase } from '@/gym/application/use-cases/fetch-exercises'
import { DrizzleExercisesDao } from '@/infra/database/drizzle/daos/drizzle-exercises-dao'
import { DrizzleExercisesRepository } from '@/infra/database/drizzle/repositories/drizzle-exercises-repository'
import { client } from '@/lib/drizzle'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import migrations from './drizzle/migrations/migrations'
import './src/styles/global.css'

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

    const drizzleExercisesDao = new DrizzleExercisesDao()
    const fetchExercisesUseCase = new FetchExercisesUseCase(drizzleExercisesDao)

    const result = await fetchExercisesUseCase.execute({ page: 1, perPage: 10 })

    console.log(result.value)
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
