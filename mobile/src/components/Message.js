import React from 'react';
import styles from '../assets/styles';

import { Text, View, Image } from 'react-native';
import UserAvatar from './UserAvatar';

const Message = ({ image, lastMessage, name, time, avatar, messageType }) => {
  return (
    <View style={styles.containerMessage}>
      <UserAvatar avatar={avatar} />
      {
        // image && <Image source={image} style={styles.avatar} />
      }

      <View style={styles.content}>

        <Text>{name}</Text>

        {(lastMessage && typeof lastMessage == 'string') ?
          <Text numberOfLines={1} style={styles.message}>{lastMessage}</Text>
          :
          null
        }

        <Text style={styles.messageTime}>{time}</Text>
      </View>
      {
        // time &&
        // <View style={{
        //   flex: 1,
        //   flexDirection: 'row',
        //   alignItems: 'center',
        //   justifyContent: "flex-end",
        // }}>
        //   <Text style={styles.message}>{time}</Text>
        // </View>
      }

    </View>
  );
};

export default Message;
