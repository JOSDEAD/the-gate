/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import React, { useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
window.navigator.userAgent = 'react-native';
import {io} from 'socket.io-client';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const appState = useRef(AppState.currentState);
  const socket = io('ws://192.168.0.6:8080', { transports: ["websocket"] });

  var interval = interval = BackgroundTimer.setInterval(()=>{
          console.log('connection status ', socket.connected);
          console.log(socket.disconnected);
          if(socket.disconnected){
            console.log('entro');
            socket.close();
            socket.open();
          } 
          socket.emit('online')
        },5000)
  useEffect(() => {
    // client-side
    socket.connect();
    console.log('entro');
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on('connect', () => {
      console.log('connected to socket server');
    });
    socket.on('call', call => {
      console.log('call', call);
      RNImmediatePhoneCall.immediatePhoneCall('0123456789');
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Button
          onPress={() => RNImmediatePhoneCall.immediatePhoneCall('0123456789')}
          title="Call"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
