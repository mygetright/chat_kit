import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Home extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {
      this.setState({
        messages: [
          {
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
          }
        ]
      });
    }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    console.log("Message:", messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
    );
  }
}

module.exports = Home;

//<GiftedChat />
/*<View style={styles.container}>
  <Text>Replace screen</Text>
  <Text>Prop from dynamic method: {this.props.homeProp}</Text>
  <Button onPress={Actions.pop}>Back</Button>
</View>
*/
//name: "React Native",
//avatar: "https://placeimg.com/140/140/any"
