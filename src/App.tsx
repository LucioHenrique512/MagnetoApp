import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ConnectModal} from './connectModal';
//import {connectBle} from './utils/bleUtils';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const {width: ScreenWidth} = Dimensions.get('screen');

const App: React.FC = () => {
  const [device, setDevice] = useState<BluetoothDevice>();
  const [deviceList, setDeviceList] = useState<BluetoothDevice[]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const spin = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // const spinArrow = (deg: number) => {
  //   Animated.timing(animatedValue, {
  //     toValue: deg,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const onConnectPress = async (bleDevice: BluetoothDevice) => {
    try {
      setModalVisible(false);
      setDevice(bleDevice);
    } catch (error) {
      console.log(error);
    }
  };

  const onButtonPress = async () => {
    //connectBle();
    try {
      const devices = await RNBluetoothClassic.getBondedDevices();
      setDeviceList(devices);
      setModalVisible(true);
    } catch (error) {
      console.log('Não consegui buscar os devices');
    }
  };

  const onClosePress = () => setModalVisible(false);

  useEffect(() => {
    if (!device) {
      return;
    }

    try {
      RNBluetoothClassic.isBluetoothAvailable();
      RNBluetoothClassic.connectToDevice(device.address);
      RNBluetoothClassic.onDeviceRead(device.address, event =>
        console.log(event),
      );
    } catch (error) {
      console.log(error);
    }
  }, [device]);

  return (
    <React.Fragment>
      <StatusBar backgroundColor={'#000000'} barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>MagnetoApp</Text>
          <Text style={styles.appSubtitle}>Connected: {device?.name}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <AnimatedIcon
            style={{transform: [{rotateZ: spin}]}}
            name="arrowup"
            size={250}
            color={'#FFFFFF'}
          />
        </View>
        <View style={styles.buttomContainer}>
          <Button onPress={onButtonPress} title="Add device" />
        </View>
      </SafeAreaView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onDismiss={onClosePress}
        transparent>
        <ConnectModal
          onConnectPress={onConnectPress}
          onClosePress={onClosePress}
          deviceList={deviceList}
        />
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    padding: 19,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  appTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 25,
  },
  appSubtitle: {
    color: '#a83232',
    marginTop: 10,
  },
  arrowContainer: {
    width: ScreenWidth - 100,
    height: ScreenWidth - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttomContainer: {
    width: '100%',
  },
});

export default App;
