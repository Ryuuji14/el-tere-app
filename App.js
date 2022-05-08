import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StackNavigation from "./src/navigation/StackNavigation";
import { AuthProvider } from "./src/context/AuthContext";

import { Provider } from "react-redux";
import store from "./src/Redux/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider>
            <AuthProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <StackNavigation />
              </SafeAreaView>
            </AuthProvider>
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
