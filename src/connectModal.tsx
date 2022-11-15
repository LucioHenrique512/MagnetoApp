import React, {useState} from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import Icon from 'react-native-vector-icons/AntDesign';

type IProps = {
  onConnectPress: (device: BluetoothDevice) => void;
  onClosePress: () => void;
  deviceList?: BluetoothDevice[];
};

export const ConnectModal: React.FC<IProps> = ({
  onConnectPress,
  onClosePress,
  deviceList,
}) => {
  const renderItem: ListRenderItem<BluetoothDevice> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onConnectPress(item)}
        style={styles.listItem}>
        <Text style={styles.listItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClosePress}>
            <Icon name="close" size={27} color={'#000000'} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {/* <TextInput
            style={styles.textInput}
            placeholder="Insira o address"
            placeholderTextColor={'#828385'}
            onChangeText={setText}
            value={text}
          /> */}
          <FlatList
            style={styles.flatList}
            data={deviceList}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: 15,
    width: '80%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  textInput: {
    backgroundColor: '#dee0e3',
    borderBottomWidth: 2,
    borderBottomColor: '#325ea8',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: 'black',
    marginBottom: 25,
  },
  flatList: {
    maxHeight: 200,
    marginBottom: 25,
  },
  listItem: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  listItemText: {
    color: 'black',
  },
});
