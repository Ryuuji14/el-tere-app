import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Perfil from "../screens/Perfil";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";
import Cart from "../screens/Cart/Cart";

const Tab = createBottomTabNavigator();

const bottomRoutes = [
  {
    name: "HomeTab",
    component: Dashboard,
    requireAuth: true,
    Icon: ({ focused }) => (
      <Ionicons name="home" color={focused ? "green" : "white"} size={24} />
    ),
  },
  {
    name: "Notifications",
    component: Notifications,
    requireAuth: true,
    Icon: ({ focused }) => (
      <Ionicons
        name="notifications"
        color={focused ? "green" : "white"}
        size={24}
      />
    ),
  },
  {
    name: "Cart",
    component: Cart,
    requireAuth: true,
    Icon: ({ focused }) => (
      <Ionicons
        name="cart"
        color={focused ? "green" : "white"}
        size={24}
      />
    ),
  },
  {
    name: "Perfil",
    component: Perfil,
    requireAuth: true,
    Icon: ({ focused }) => (
      <Ionicons
        name="person"
        color={focused ? "green" : "white"}
        size={24}
      />
    ),
  },
];

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F96332",
        },
        tabBarActiveTintColor: "#41634A",
      }}
    >
      {bottomRoutes.map(({ name, component, Icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: Icon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
