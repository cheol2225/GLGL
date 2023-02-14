import { AssertionError } from 'assert';
import React, {useState} from 'react';
import {StatusBar, Image} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Assert.fromModule(image).downloadAsync();
    }
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    const imageAssets = cacheImages([require('../assets/splash.png')]);
    const fontAssets = cacheFonts([]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
    </ThemeProvider>
  ) : (
    // eslint-disable-next-line react/jsx-no-undef
    <AppLoading
      startAsync={_loadAssets}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
};

export default App;
