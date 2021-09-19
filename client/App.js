import React, { useEffect } from 'react';
window.navigator.userAgent = 'react-native';
import {io} from 'socket.io-client';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
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

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1 
  };
  const socket = io('ws://192.168.0.6:8080', {transports: ['websocket']});

  useEffect(() => {
    // client-side
    socket.connect();
    console.log('entro');
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on('online', () => {
      console.log('El porton esta en linea');
    });
  }, [socket]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
        <Button onPress={() => socket.emit('call')} title="Abrir" />
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
