import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RecoverPassword from "../screens/RecoverPassword";
import BottomNavigation from "./BottomNavigation";

const Stack = createNativeStackNavigator();

const stackRoutes = [
  {
    name: "Onboarding",
    component: Onboarding,
    requireAuth: false,
  },
  {
    name: "Login",
    component: Login,
    requireAuth: false,
  },
  {
    name: "Register",
    component: Register,
    requireAuth: true,
  },
  {
    name: "RecoverPassword",
    component: RecoverPassword,
    requireAuth: false,
  },
  {
    name: "Home",
    component: BottomNavigation,
  },
];

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[1].name}
      screenOptions={{
        headerShown: false,
      }}
    >
      {stackRoutes.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
