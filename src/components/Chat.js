import React, { useState, useCallback, useEffect } from 'react';
import Parse from 'parse/react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_ID,
  SERVER_URL,
} from '@env';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = new Parse.LiveQueryClient({
      applicationId: PARSE_APPLICATION_ID,
      serverURL: SERVER_URL,
      javascriptKey: PARSE_JAVASCRIPT_ID,
    });
    client.open();

    const query = new Parse.Query('Message');
    query.ascending('createdAt');
    query.limit(1);
    const subscription = client.subscribe(query);

    subscription.on('create', (messageParse) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: messageParse.id,
          text: messageParse.get('content'),
          createdAt: new Date(),
          user: {
            _id: '12345',
            name: 'Back4app',
            avatar: 'https://placeimg.com/140/140/any',
          },
        }),
      );
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

    const Message = Parse.Object.extend('Message');
    const message = new Message();

    message.set('content', messages[0].text);
    message.save();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chat;
