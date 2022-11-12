import { View, TextInput , StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import { useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../graphql/mutations';

const InputBox = ({chatroom}) => {

    const [text , setText] = useState('');

    const onSend = async () => {

        const authUser = await Auth.currentAuthenticatedUser();
        const newMessage = {
          chatroomID: chatroom.id,
          text: text,
          userID: authUser.attributes.sub,
        };

        

        
       const newMessageData =  await API.graphql(graphqlOperation(createMessage, {input: newMessage}));
        setText('');


        // set the new message as LastMessage of the chatRoom

        await API.graphql(graphqlOperation(updateChatRoom,{input: {
          _version: chatroom._version,
          chatRoomLastMessageId: newMessageData.data.createMessage.id ,
          id: chatroom.id,
        }}))






    };
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      {/* Icon */}
        <AntDesign name='plus' size={20} color='royalblue' />


      {/* Text Input */}
        <TextInput value={text} onChangeText={setText} placeholder='Escreva a sua mensagem' style={styles.input}/>

      {/* Icon */}
      <MaterialIcons onPress={onSend} name='send' size={18} color='white'style={styles.send} />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor:'whitesmoke',
        padding: 5,
        paddingHorizontal:10,
        alignItems: 'center',
    },

    input:{
        flex: 1,
        backgroundColor:'white',
        padding:5,
        borderRadius: 50,
        paddingHorizontal:10,
        borderColor:'lightgrey',
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal:10,
        
    },
    send:{
        backgroundColor:'royalblue',
        padding:7,
        borderRadius:15,
        overflow: 'hidden',

    },
});

export default InputBox;
