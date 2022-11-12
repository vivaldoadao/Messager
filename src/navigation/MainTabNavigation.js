import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons , Entypo} from '@expo/vector-icons';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import SettingsScreens from '../screens/SettingsScreens';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';


const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
    
    
  return (
    
    <Tab.Navigator initialRouteName='Chats' screenOptions={{
        tabBarStyle: { backgroundColor: "whitesmoke" },
        headerStyle: { backgroundColor: "whitesmoke" },
      }}>
        <Tab.Screen name="Status" component={NotImplementedScreen} options={{tabBarIcon:({color, size}) => (<Ionicons name="logo-whatsapp" size={size} color={color} />),}} />
        <Tab.Screen name="Calls" component={NotImplementedScreen} options={{tabBarIcon:({color, size}) => (<Ionicons name="call-outline" size={size} color={color} />),}} />
        <Tab.Screen name="Camera" component={NotImplementedScreen} options={{tabBarIcon:({color, size}) => (<Ionicons name="camera-outline" size={size} color={color} />),}} />
        <Tab.Screen name="Chats" component={ChatsScreen} 
        options={({navigation})=>({tabBarIcon:({color, size}) => (<Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />),
        headerRight: () => (
            <Entypo 
              onPress={() => navigation.navigate('Contacts')}
              name="new-message"
              size={18}
              color={"royalblue"}
              style={{ marginRight: 15 }}
            />
          ),
    
    })}
         />
        <Tab.Screen name="Settings" component={SettingsScreens} options={{tabBarIcon:({color, size}) => (<Ionicons name="settings-outline" size={size} color={color} />),}} />
    </Tab.Navigator>
   
  );
}

export default MainTabNavigation;
