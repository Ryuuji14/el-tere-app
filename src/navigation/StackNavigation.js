import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RecoverPassword from "../screens/RecoverPassword";
import BottomNavigation from "./BottomNavigation";
import Dashboard from "../screens/Dashboard";
import Comercio from "../screens/Comercio";
import useAuthContext from "../hooks/useAuthContext";

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
    requireAuth: false,
  },
  {
    name: "RecoverPassword",
    component: RecoverPassword,
    requireAuth: false,
  },
  {
    name: "Home",
    component: BottomNavigation,
    requireAuth: true,
  },
  {
    name: "Dashboard",
    component: Dashboard,
  },
  {
    name: "Comercio",
    component: Comercio,
  },
];

const StackNavigation = () => {
  const {
    state: { isAuthenticated },
  } = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[5].name}
      screenOptions={{
        headerShown: false,
      }}
    >
      {stackRoutes
        .filter(({ requireAuth }) => requireAuth === isAuthenticated)
        .map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
