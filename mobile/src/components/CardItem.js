import React from 'react';
import styles from '../assets/styles';

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import AntDesign from '../../node_modules/react-native-vector-icons/AntDesign';

import { colors } from '../constants'

const CardItem = ({
  actions,
  description,
  image,
  matches,
  name,
  onPressLeft,
  onPressRight,
  status,
  variant,
  home
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? 170 : 350,
      margin: variant ? 0 : 20
    }
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30
    }
  ];

  const iconSize = 30

  //  <Text style={styles.descriptionCardItem}>{description.replace(/^\s+|\s+$/g, "")}</Text>

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      {
        image
          ?
          <Image source={image} style={imageStyle} />
          :
          null
      }


      {/* NAME */}
      {name ?
        <Text style={nameStyle}>{name}</Text>
        :
        null
      }

      {/* DESCRIPTION */}
      {description ?
        <Text numberOfLines={home ? 3 : undefined} style={styles.descriptionCardItem}>{description}</Text>
        :
        null
      }

      {/* STATUS */}
      {status && (
        <View style={styles.status}>
          <View style={status === 'Online' ? styles.online : styles.offline} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()} >
            <Text style={styles.dislike}>
              <Ionicons name="ios-heart-dislike" size={iconSize} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPressRight()}>
            <Text style={styles.like}>
              <Ionicons name="ios-heart" color={colors.heartFill} size={iconSize} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;
