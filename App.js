import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Accueil from './Ecrans/Accueil';
import Liste from './Ecrans/Liste';
import Recette from './Ecrans/Recette';
import Details from './Ecrans/Details';
import Rappel from './Ecrans/Rappel';
import Fav from './Ecrans/Fav';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Fav"
          component={Fav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Liste"
          component={Liste}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recette"
          component={Recette}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Rappel"
          component={Rappel}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
