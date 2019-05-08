import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f413bd96-3491-44fb-88b5-a3ed367b6667/token';
const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:f413bd96-3491-44fb-88b5-a3ed367b6667';
const CHATKIT_ROOM_ID = '19430493';
const CHATKIT_USER_NAME = 'user2';

const styles = StyleSheet.create({

});

class Chat2 extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider,
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
      this.setState({
        messages: [
          /*{
            _id: 1,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
              _id: 2,
            }
          },
          {
            _id: 2,
            text: "Hello test",
            createdAt: new Date(),
            user: {
              _id: 1,
            }
          }*/
        ]
      });
    }

  onReceive = data => {
    console.log(data);
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
      },
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }));
  };

  onSend = (messages = []) => {
    messages.forEach(message => {
      this.currentUser
        .sendMessage({
          text: message.text,
          roomId: CHATKIT_ROOM_ID,
        })
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    });
  };

  renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#FF0000"
          }
        }}
      />
    )
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: CHATKIT_USER_NAME
        }}
        renderBubble={this.renderBubble}
        renderAvatar={null}
      />
    );
  }
}

module.exports = Chat2;

//<GiftedChat />
/*<View style={styles.container}>
  <Text>Replace screen</Text>
  <Text>Prop from dynamic method: {this.props.homeProp}</Text>
  <Button onPress={Actions.pop}>Back</Button>
</View>
*/
//name: "React Native",
//avatar: "https://placeimg.com/140/140/any"
