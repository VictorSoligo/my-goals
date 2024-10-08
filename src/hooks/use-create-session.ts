import { createSession } from '@/data/create-session'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateSession() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['sessions'],
      })
    },
  })

  return mutation
}
