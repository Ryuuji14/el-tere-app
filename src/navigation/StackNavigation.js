import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RecoverPassword from "../screens/RecoverPassword";
import NewPassword from "../screens/NewPassword";
import BottomNavigation from "./BottomNavigation";
import Dashboard from "../screens/Dashboard";
import Comercio from "../screens/Comercio";
import useAuthContext from "../hooks/useAuthContext";
import Perfil from "../screens/Perfil";
import FilterRubros from "../screens/FilterRubros";

import SingleProduct from "../screens/ConsultarProducto";
import { EditPerfil } from "../screens/EditPerfil";
import { YourDirections } from "../screens/YourDirections";
import { OrderDetail } from "../screens/OrderDetail";
import { YourSales } from "../screens/YourSales";
import ConfirmarPedido from "../screens/ConfirmarPedido";
import Cart from "../screens/Cart/Cart";
import RealizaPago from "../screens/RealizaPago";
import ConsultarEvento from "../screens/ConsultarEvento";
import ConsultarPromocion from "../screens/ConsultarPromocion";
import { HStack, Icon, IconButton } from "native-base";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderFinished } from "../screens/OrderFinished";
import { DetalleProductosFinalizados } from "../screens/DetalleProductosFinalizados";



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
    name: "NewPassword",
    component: NewPassword,
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
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "Perfil",
    component: Perfil,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "ConsultarEvento",
    component: ConsultarEvento,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "RealizaPago",
    component: RealizaPago,
    requireAuth: true,
  },
  {
    name: "EditPerfil",
    component: EditPerfil,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "YourDirections",
    component: YourDirections,
    requireAuth: true,
  },
  {
    name: "OrderDetail",
    component: OrderDetail,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "SingleProduct",
    component: SingleProduct,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "YourOrders",
    component: YourSales,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "ConfirmarPedido",
    component: ConfirmarPedido,
    requireAuth: true,
  },
  {
    name: "Cart",
    component: Cart,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "Promocion",
    component: ConsultarPromocion,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "OrderFinished",
    component: OrderFinished,
    requireAuth: true,
    showHeader: true,
  },
  {
    name: "ProductosFinalizados",
    component: DetalleProductosFinalizados,
    requireAuth: true,
    showHeader: true,
  },
];

const HOC = (Component) => {
  return (props) => (
    <SafeAreaView style={{ flex: 1 }}>
      <Component {...props} />
    </SafeAreaView>
  );
};

const StackNavigation = () => {
  const {
    state: { isAuthenticated },
  } = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      {stackRoutes
        .filter(({ requireAuth }) => requireAuth === isAuthenticated)
        .map(({ name, component, showHeader }, index) => (
          <Stack.Screen
            key={index.toString()}
            name={name}
            component={showHeader ? component : HOC(component)}
            options={
              showHeader &&
              (({ navigation }) => ({
                headerShown: showHeader,

                headerStyle: {
                  backgroundColor: "#DB7F50",
                },
                title: "",
                headerLeft: () => (
                  <IconButton
                    _pressed={{
                      backgroundColor: "#fff2",
                    }}
                    onPress={() => navigation.goBack()}
                    icon={
                      <Icon
                        as={Entypo}
                        name="chevron-left"
                        color="#fff"
                        size="2xl"
                        left={-6}
                      />
                    }
                  />
                ),
                headerRight: () => (
                  <HStack>
                    <IconButton
                      _pressed={{
                        backgroundColor: "#fff2",
                      }}
                      onPress={() => navigation.navigate("Notifications")}
                      icon={
                        <Icon
                          as={MaterialCommunityIcons}
                          name="bell"
                          color="#fff"
                          size="xl"
                        />
                      }
                    />
                    <IconButton
                      _pressed={{
                        backgroundColor: "#fff2",
                      }}
                      onPress={() => navigation.navigate("Cart")}
                      icon={
                        <Icon
                          as={MaterialIcons}
                          name="shopping-cart"
                          color="#fff"
                          size="xl"
                        />
                      }
                    />
                  </HStack>
                ),
              }))
            }
          />
        ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
