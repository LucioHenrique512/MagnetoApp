import {PermissionsAndroid} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const connectBle = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Bluetooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    const isBluetoothEnable = await RNBluetoothClassic.isBluetoothEnabled();

    if (!isBluetoothEnable) {
      console.log('Ble desligado');
      return;
    }
    //C8:C9:A3:D0:CA:AE
    RNBluetoothClassic.onDeviceRead('C8:C9:A3:D0:CA:AE', event => {
      console.log(event);
    });
  } catch (error) {
    // error
    console.log(error);
  }
};
