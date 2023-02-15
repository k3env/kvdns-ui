import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  HStack,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import { $records, fx_deleteRecord } from '../stores/records';
import { Routes } from '../helpers/router';
import {
  NSRecordDataA,
  NSRecordDataCNAME,
  NSRecordDataMX,
  NSRecordDataNS,
  NSRecordDataSRV,
  NSRecordDataTXT,
  NSRecordType,
  RecordAssociation,
  ZoneAssociation,
} from '../types/SchemaV3';
import { AtomicLink } from '@components';
import { $zone } from '../stores/zone';
import { recordsRouteLoaded, recordsLoaded } from '../helpers/routes/recordsRoute';
import { useRef, useState } from 'react';
import { fx_deleteZone } from '../stores/zones';

export function RecordsList(props: {}): JSX.Element {
  const records = useStore($records);
  const zone = useStore($zone);
  const routeLoaded = useStore(recordsRouteLoaded.$isOpened);
  const zoneLoaded = useStore(recordsLoaded.$isOpened);
  const [record, selectRecord] = useState<RecordAssociation | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getDataView = (
    data: NSRecordDataA | NSRecordDataMX | NSRecordDataCNAME | NSRecordDataNS | NSRecordDataSRV | NSRecordDataTXT,
    type: NSRecordType,
  ) => {
    switch (type) {
      case 'A':
        return (data as NSRecordDataA).address;
      case 'MX':
        const mx = data as NSRecordDataMX;
        return `${mx.priority} ${mx.exchange}`;
      case 'NS':
        return (data as NSRecordDataNS).ns;
      case 'SRV':
        const srv = data as NSRecordDataSRV;
        return `${srv.priority} ${srv.weight} ${srv.port} ${srv.target}`;
      case 'TXT':
        return (data as NSRecordDataTXT).data;
      case 'CNAME':
        return (data as NSRecordDataCNAME).domain;
      default:
        break;
    }
  };
  if (zone !== null) {
    return (
      <Box>
        <Card mb={4}>
          <CardHeader>
            <Heading size={'md'}>Zone "{zone.zone.name}"</Heading>
          </CardHeader>
          <CardBody>
            <Text>Primary NS: {zone.zone.authority.primary}</Text>
            <Text>Administrator: {zone.zone.authority.admin.replace('.', '@')}</Text>
          </CardBody>
          <CardFooter gap={2}>
            <AtomicLink to={Routes.zonesRoute}>To zones list</AtomicLink>
            <AtomicLink to={Routes.recordAddRoute} params={{ zoneId: zone.id }}>
              Add new record
            </AtomicLink>
            <AtomicLink to={Routes.zoneEditRoute} params={{ zoneId: zone.id }}>
              Edit zone
            </AtomicLink>
          </CardFooter>
        </Card>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>TTL</Th>
                <Th>Data</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((ra) => (
                <Tr key={ra.id}>
                  <Td>{ra.record.name}</Td>
                  <Td>{ra.record.type}</Td>
                  <Td>{ra.record.ttl}</Td>
                  <Td>{getDataView(ra.record.data, ra.record.type)}</Td>
                  <Td>
                    <HStack gap={2}>
                      <AtomicLink to={Routes.recordEditRoute} params={{ recordId: ra.id, zoneId: ra.record.zoneId }}>
                        Edit
                      </AtomicLink>
                      <Link
                        onClick={() => {
                          selectRecord(ra);
                          onOpen();
                        }}
                      >
                        Delete
                      </Link>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <RecordDeleteModal isOpen={isOpen} onClose={onClose} ra={record} />
      </Box>
    );
  } else {
    return <></>;
  }
}
function RecordDeleteModal(props: { isOpen: boolean; onClose: () => void; ra: RecordAssociation | null }): JSX.Element {
  const cancelRef = useRef(null);
  if (props.ra !== null) {
    const onConfirm = (ra: RecordAssociation) => {
      fx_deleteRecord({ recordId: ra.id }).then((v) => props.onClose());
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
          <AlertDialogHeader>Delete record {props.ra.record.name}?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Action is irreversible</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => onConfirm(props.ra!)}>
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
