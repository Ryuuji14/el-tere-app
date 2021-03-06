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
import SingleProduct from "../screens/ConsultarProducto";
import { EditPerfil } from "../screens/EditPerfil";
import { YourDirections } from "../screens/YourDirections";
import { OrderDetail } from "../screens/OrderDetail";
import { YourSales } from "../screens/YourSales";
import ConfirmarPedido from "../screens/ConfirmarPedido";
import Cart from "../screens/Cart/Cart";
import RealizaPago from "../screens/RealizaPago"
import ConsultarEvento from "../screens/ConsultarEvento";
import ConsultarPromocion from "../screens/ConsultarPromocion";



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
  },
  {
    name: "Perfil",
    component: Perfil,
    requireAuth: true,
  },
  { 
    name: "ConsultarEvento",
    component: ConsultarEvento,
    requireAuth: true,
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
  },
  {
    name: "SingleProduct",
    component: SingleProduct,
    requireAuth: true,
  },
  {
    name: "YourOrders",
    component: YourSales,
    requireAuth: true,
  },
  {
    name: "ConfirmarPedido",
    component: ConfirmarPedido,
    requireAuth: true,
  },
  {
    name:"Cart",
    component: Cart,
    requireAuth: true,
  },
  {
    name:"Promocion",
    component: ConsultarPromocion,
    requireAuth: true,
  },
];

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
        .map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
