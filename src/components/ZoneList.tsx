import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
  HStack,
  Link,
  useDisclosure,
  Text,
  defineStyle,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import { useRef, useState } from 'react';
import { $zones, fx_deleteZone } from '../stores/zones';
import { ZoneAssociation } from '../types/SchemaV3';
import { AtomicLink as AtomicButton } from './AtomicLink';
import { Routes } from '../helpers/router';

export function ZoneList(props: {}) {
  const zones = useStore($zones);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [zone, selectZone] = useState<ZoneAssociation | null>(null);

  const buttonLike = defineStyle({
    border: '1px',
  });

  return (
    <Box maxWidth={'4xl'} alignItems={'start'}>
      <Heading size={'md'} pb={'2'}>
        Managed zones
      </Heading>
      <Text>
        Click arrow icon for expand zone info and actions or{' '}
        <AtomicButton to={Routes.zoneAddRoute} inline>
          add new zone
        </AtomicButton>
      </Text>
      <Accordion allowToggle pt={3} pb={5}>
        {zones.map((z) => (
          <AccordionItem key={z.id}>
            <h1>
              <AccordionButton>
                <Box as="h2" flex={1} textAlign="left">
                  {z.zone.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h1>
            <AccordionPanel pb={4} textAlign={'left'}>
              <p>Primary NS: {z.zone.authority.primary}</p>
              <p>Zone admin: {z.zone.authority.admin.replace('.', '@')}</p>
              <HStack pt={4}>
                <AtomicButton to={Routes.zoneEditRoute} params={{ zoneId: z.id }}>
                  Edit zone
                </AtomicButton>
                <AtomicButton to={Routes.recordsRoute} params={{ zoneId: z.id }}>
                  Show records
                </AtomicButton>
                <Link
                  onClick={() => {
                    selectZone(z);
                    onOpen();
                  }}
                >
                  Delete zone
                </Link>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <ZoneDeleteModal isOpen={isOpen} onClose={onClose} za={zone} />
      <HStack>
        <AtomicButton to={Routes.zoneAddRoute} size={'2xl'} color={'twitter'}>
          Add new zone
        </AtomicButton>
      </HStack>
    </Box>
  );
}

function ZoneDeleteModal(props: { isOpen: boolean; onClose: () => void; za: ZoneAssociation | null }): JSX.Element {
  const cancelRef = useRef(null);
  if (props.za !== null) {
    const onConfirm = (za: ZoneAssociation) => {
      fx_deleteZone(za.id).then((v) => props.onClose());
    };
    return (
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        isOpen={props.isOpen}
        isCentered
        closeOnEsc
        closeOnOverlayClick
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete zone {props.za.zone.name}?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Action is irreversible</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => onConfirm(props.za!)}>
              {/* Как же ты заебал, выше проверка на Null */}
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return <></>;
  }
}
