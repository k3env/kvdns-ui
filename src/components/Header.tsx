import { HStack, Heading, Image, Switch, useDisclosure, useColorMode, Button } from '@chakra-ui/react';
import { createEffect, createStore, restore } from 'effector';
import { useStore } from 'effector-react';
import Logo from '../assets/logo.svg';

export function Header(props: {}) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack pb={12} pt={4} justifyContent={'space-around'}>
      <HStack>
        <Image w={'48px'} h={'48px'} src={Logo} />
        <Heading size={'lg'}>KV:53 UI</Heading>
      </HStack>
      <Button onClick={toggleColorMode}>{colorMode === 'dark' ? 'Dark' : 'Light'} Theme</Button>
    </HStack>
  );
}
