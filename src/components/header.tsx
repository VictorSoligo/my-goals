import { useRouter } from 'expo-router'
import { Box } from './ui/box'
import { Button, ButtonIcon } from './ui/button'
import { Text } from './ui/text'
import AntDesign from '@expo/vector-icons/AntDesign'

interface HeaderProps {
  title: string
  dismiss: boolean
}

export function Header({ title, dismiss = false }: HeaderProps) {
  const router = useRouter()

  return (
    <Box className="bg-background-header p-4 flex-row justify-between items-center">
      <Box>
        {dismiss && (
          <Button variant="link" onPress={() => router.dismiss(1)}>
            <ButtonIcon>
              <AntDesign name="arrowleft" size={24} color="white" />
            </ButtonIcon>
          </Button>
        )}
      </Box>

      <Text size="lg" className="text-typography-white">
        {title}
      </Text>

      <Box></Box>
    </Box>
  )
}
