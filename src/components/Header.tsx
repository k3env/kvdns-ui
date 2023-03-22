import {
  HStack,
  Heading,
  Image,
  Switch,
  useDisclosure,
  useColorMode,
  Button,
  Select,
  SelectField,
} from '@chakra-ui/react';
import { createEffect, createStore, restore } from 'effector';
import { useStore } from 'effector-react';
import Logo from '../assets/logo.svg';
import Sun from '../assets/sun-regular.svg';
import Moon from '../assets/moon-regular.svg';
import { $currentServer, $servers, fx_useServer } from '../stores/servers';

export function Header(props: {}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const servers = useStore($servers);
  const current = useStore($currentServer);
  return (
    <HStack pb={12} pt={4} justifyContent={'space-between'}>
      <HStack>
        <Image w="48px" h="48px" src={Logo} />
        <Heading size={'lg'}>KV:53 UI</Heading>
      </HStack>
      <HStack>
        <Button onClick={toggleColorMode}>
          {colorMode === 'dark' ? (
            <img src={Moon} width="24px" height="24px" color="#ffff00" />
          ) : (
            <img src={Sun} width="24px" height="24px" />
          )}
        </Button>
        <Select value={current} onChange={(e) => fx_useServer(e.target.value)}>
          {servers.map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </Select>
      </HStack>
    </HStack>
  );
}
