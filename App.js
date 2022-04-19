import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StackNavigation from "./src/navigation/StackNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StackNavigation />
          </SafeAreaView>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
