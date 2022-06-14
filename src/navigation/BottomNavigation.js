import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Perfil from "../screens/Perfil";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";
import Cart from "../screens/Cart/Cart";
import { Badge, Text, View } from "native-base";
import { useNotifications } from "../hooks/useNotifications";
import { connect } from "react-redux";
import { loadNotifications } from "../Redux/Actions/notificationActions";

const Tab = createBottomTabNavigator();

const bottomRoutes = [
  {
    name: "HomeTab",
    component: Dashboard,
    requireAuth: true,
    Icon: ({ focused }) => (
      <Ionicons name="home" color={focused ? "#41634A" : "white"} size={24} />
    ),
  },
  {
    name: "Notifications",
    component: Notifications,
    requireAuth: true,
    Icon: ({ focused, notificationCount }) => (
      <View
        display="flex"
        flexDirection="row"
        alignItems="center"
        position="relative"
      >
        {notificationCount > 0 && (
          <Badge
            bgColor="#faa"
            style={{
              borderRadius: 50,
              position: "absolute",
              right: -10,
              top: -9,
              zIndex: 1,
              transform: [
                {
                  scale: 0.75,
                },
              ],
            }}
          >
            <Text>{notificationCount}</Text>
          </Badge>
        )}
        <Ionicons
          name="notifications"
          color={focused ? "#41634A" : "white"}
          size={24}
        />
      </View>
    ),
  },
  {
    name: "Cart",
    component: Cart,
    requireAuth: true,
    Icon: ({ focused }) => (
      <Ionicons name="cart" color={focused ? "#41634A" : "white"} size={24} />
    ),
  },
  {
    name: "Perfil",
    component: Perfil,
    requireAuth: true,
    Icon: ({ focused }) => (
      <Ionicons name="person" color={focused ? "#41634A" : "white"} size={24} />
    ),
  },
];

const BottomNavigation = ({ notificationItems = [], loadNotifications }) => {
  useNotifications(loadNotifications);

  const notificationNumber = notificationItems.filter((el) => el.unread).length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#DB7F50",
        },
        tabBarActiveTintColor: "#DB7F50",
      }}
    >
      {bottomRoutes.map(({ name, component, Icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarShowLabel: false,
            tabBarIcon:
              name !== "Notifications"
                ? Icon
                : (props) => (
                    <Icon {...props} notificationCount={notificationNumber} />
                  ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadNotifications: (notifications) =>
      dispatch(loadNotifications(notifications)),
  };
};

const mapStateToProps = (state) => {
  const { notificationItems } = state;
  return { notificationItems };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigation);

// export default BottomNavigation;
