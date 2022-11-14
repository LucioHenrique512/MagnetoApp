import React, {useRef} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const {width: ScreenWidth} = Dimensions.get('screen');

const App: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const spin = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const spinArrow = (deg: number) => {
    Animated.timing(animatedValue, {
      toValue: deg,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onButtonPress = () => {
    const random = Math.floor(Math.random() * 360);
    spinArrow(random);
  };

  return (
    <React.Fragment>
      <StatusBar backgroundColor={'#000000'} barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>MagnetoApp</Text>
          <Text style={styles.appSubtitle}>Dispositivo não conectado!</Text>
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
          <Button onPress={onButtonPress} title="Connectar" />
        </View>
      </SafeAreaView>
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
