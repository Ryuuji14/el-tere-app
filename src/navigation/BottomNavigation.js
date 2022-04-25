import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";

const Tab = createBottomTabNavigator();

const bottomRoutes =  [
  {
    name: "HomeTab",
    component: Dashboard,
    requireAuth: true,
    Icon: <Ionicons name="home" color="white" size={24} />,
  },
  {
    name: "Notifications",
    component: Notifications,
    requireAuth: true,
    Icon: <Ionicons name="notifications" color="white" size={24} />,
  },
];

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F96332'
        },
        tabBarActiveTintColor: '#41634A'
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
