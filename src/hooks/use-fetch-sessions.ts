import { fetchSessions } from '@/data/fetch-sessions'
import { useQuery } from '@tanstack/react-query'

export function useFetchSessions() {
  const query = useQuery({
    queryKey: ['sessions'],
    queryFn: () => fetchSessions(),
  })

  return query
}
