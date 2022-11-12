
import { View, Text , StyleSheet} from 'react-native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth} from 'aws-amplify';
import { useEffect, useState } from 'react';
dayjs.extend(relativeTime);



const Message = ({message}) => {
  const [isMe , setIsMe] = useState(false);

    useEffect(()=>{
      const isMyyMessage = async () => {
        const    authUser = await Auth.currentAuthenticatedUser();
          setIsMe(message.user?.id === authUser.attribute.sub);
       };
    },[])




   
  return (
    <View style={[styles.container, 
       {
        backgroundColor:isMe ? '#dcf8c5' : 'white',
        alignSelf:isMe ? 'flex-end' : 'flex-start'
       } 
    
    
    
    ]}>
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
       
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:1,
        },
        shadowOpacity: 0.18,
        shadowRadius:1.0,
        elevation: 1,
        
    },
    time:{
        color:'gray',
        alignSelf:'flex-end',
    }
})

export default Message;
