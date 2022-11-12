
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import MainTabNavigation from './MainTabNavigation';
import ContactsScreen from '../screens/ContactsScreen';

const Stack = createNativeStackNavigator();


const Navigator = () => {
  return (
    <NavigationContainer>
    
        <Stack.Navigator>
            <Stack.Screen name='Home' component={MainTabNavigation} options={{headerShown:false}} />
            
            <Stack.Screen name='Chat' component={ChatScreen} />
            <Stack.Screen name='Contacts' component={ContactsScreen} />
        </Stack.Navigator>
        
    </NavigationContainer>
  );
}

export default Navigator;
