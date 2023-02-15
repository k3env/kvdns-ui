import { ChakraProvider, ColorModeScript, Container, createLocalStorageManager } from '@chakra-ui/react';
import { RouterProvider } from 'atomic-router-react';
import './App.css';
import { router, RoutesView } from './helpers/router';
import theme from './helpers/theme';
import { Header } from './components/Header';

function App() {
  const storMgr = createLocalStorageManager('theme');
  return (
    <ChakraProvider theme={theme} colorModeManager={storMgr}>
      <ColorModeScript initialColorMode="dark" type="localStorage" storageKey="theme" />
      <RouterProvider router={router}>
        <Container maxW={'container.sm'}>
          <Header />
          <RoutesView />
        </Container>
      </RouterProvider>
    </ChakraProvider>
  );
}

export default App;
