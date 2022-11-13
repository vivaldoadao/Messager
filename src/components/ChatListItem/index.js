import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {Auth} from 'aws-amplify';
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {

    const navigation = useNavigation();

  
    const [user , setUser] = useState(null);


    // Loop through the chat.users.items and find a user that is not us (Authenticated user)
    
    useEffect(()=>{

        const fetchUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser();
            const userItem = chat.users.items.find(item => item.user.id !== authUser.attributes.sub)
            setUser(userItem?.user)
       
        };

        fetchUser();



       
    })

    
   
    return (

        <Pressable onPress={() => navigation.navigate('Chat', {id: chat.id, name: user?.name})} style={styles.container}>
            <Image
                source={{ uri: user?.image }} 
                style={styles.image}
            
            />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>{user?.name}</Text>
                    
                    
                    {chat.LastMessage && ( <Text style={styles.subTitle}>{dayjs(chat.LastMessage?.createdAt).fromNow(true)}</Text>)}
                    
                   
                </View>
                <Text numberOfLines={2} style={styles.subTitle}>{chat.LastMessage?.text}</Text>
            </View>

           
        </Pressable>
      
       
    ) 
        
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical:5,
        height:70,
    },
    image: {
        width : 50,
        height:50,
        borderRadius: 30,
        marginRight:10,
    },
    content:{
        flex: 1,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'lightgrey',
    },
    name:{
        flex: 1,
        fontWeight: 'bold',
    },
    row:{
        flexDirection: 'row',
        marginBottom:8,
    },

    subTitle:{
        color: 'gray',
    },
});


export default ChatListItem;