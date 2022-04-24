import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import { AntDesign } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";

const Tab = createBottomTabNavigator();

const bottomRoutes = [
  {
    name: "HomeTab",
    component: Dashboard,
    requireAuth: true,
    Icon: <AntDesign name="home" color="black" size={24} />,
  },
  {
    name: "Notifications",
    component: Notifications,
    requireAuth: true,
    Icon: <AntDesign name="home" color="black" size={24} />,
  },
];

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {bottomRoutes.map(({ name, component, Icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => Icon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
