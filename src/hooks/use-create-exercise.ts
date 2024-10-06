import { createExercise } from '@/data/create-exercise'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateExercise() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createExercise,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })

  return mutation
}
