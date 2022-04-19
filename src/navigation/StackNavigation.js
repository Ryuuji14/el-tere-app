import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import BottomNavigation from "./BottomNavigation";

const Stack = createNativeStackNavigator();

const stackRoutes = [
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
    name: "Home",
    component: BottomNavigation,
  },
];

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[2].name}
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
