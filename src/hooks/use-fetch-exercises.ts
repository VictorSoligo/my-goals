import { fetchExercises } from '@/data/fetch-exercises'
import { useQuery } from '@tanstack/react-query'

export function useFetchExercises() {
  const query = useQuery({
    queryKey: ['exercises'],
    queryFn: () => fetchExercises(),
  })

  return query
}
