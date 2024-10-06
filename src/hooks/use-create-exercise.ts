import { CreateExerciseUseCase } from '@/gym/application/use-cases/create-exercise'
import { DrizzleExercisesRepository } from '@/infra/database/drizzle/repositories/drizzle-exercises-repository'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateExercise() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const drizzleExercisesRepository = new DrizzleExercisesRepository()
      const createExerciseUseCase = new CreateExerciseUseCase(
        drizzleExercisesRepository,
      )

      await createExerciseUseCase.execute({ name })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })

  return mutation
}
