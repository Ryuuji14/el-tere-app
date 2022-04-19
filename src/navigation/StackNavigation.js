import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";

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
];

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[0].name}
      screenOptions={{
        headerShown: false,
      }}
    >
      {stackRoutes.map(({ name, component }) => (
        <Stack.Screen name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
