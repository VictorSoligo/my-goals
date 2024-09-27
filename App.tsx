import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white-600">
      <Text>My Goals</Text>

      <StatusBar style="auto" />
    </View>
  );
}


