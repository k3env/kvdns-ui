import { Card, CardBody, CardFooter, CardHeader, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useStore } from 'effector-react';
import { Routes } from '../helpers/router';
import { recordAddRouteLoaded, recordEditRouteLoaded } from '../helpers/routes/recordsRoute';
import { $record } from '../stores/record';
import { fx_addRecord, fx_updateRecord } from '../stores/records';
import { $zone } from '../stores/zone';
import { AtomicLink } from './AtomicLink';
import { RecordsForm } from './RecordsForm';

export function RecordFormEditPage(props: {}) {
  const routeLoaded = useStore(recordEditRouteLoaded.$isOpened);
  const record = useStore($record);
  const zone = useStore($zone);
  console.log(record, routeLoaded, zone);
  return (
    <Skeleton isLoaded={routeLoaded} fadeDuration={3}>
      {zone && (
        <Card mb={4}>
          <CardHeader>
            <Heading size={'md'}>Zone "{zone.zone.name}"</Heading>
          </CardHeader>
          <CardBody>
            <Text>Primary NS: {zone.zone.authority.primary}</Text>
            <Text>Administrator: {zone.zone.authority.admin.replace('.', '@')}</Text>
          </CardBody>
        </Card>
      )}
      {zone && record && (
        <RecordsForm
          zone={zone}
          record={record}
          onConfirm={(f) =>
            fx_updateRecord({ recordId: record.id, record: f }).then((v) =>
              Routes.recordsRoute.open({ zoneId: v.record.zoneId }),
            )
          }
          onCancel={() => Routes.recordsRoute.open({ zoneId: zone.id })}
        />
      )}
    </Skeleton>
  );
}

export function RecordFormAddPage(props: {}) {
  const routeLoaded = useStore(recordAddRouteLoaded.$isOpened);
  const zone = useStore($zone);
  console.log(routeLoaded, zone);
  if (zone) {
    return (
      <Skeleton isLoaded={routeLoaded} fadeDuration={3}>
        {zone && (
          <Card mb={4}>
            <CardHeader>
              <Heading size={'md'}>Zone "{zone.zone.name}"</Heading>
            </CardHeader>
            <CardBody>
              <Text>Primary NS: {zone.zone.authority.primary}</Text>
              <Text>Administrator: {zone.zone.authority.admin.replace('.', '@')}</Text>
            </CardBody>
          </Card>
        )}
        <RecordsForm
          zone={zone}
          record={null}
          onConfirm={(f) =>
            fx_addRecord({ record: f }).then((v) => Routes.recordsRoute.open({ zoneId: v.record.zoneId }))
          }
          onCancel={() => Routes.recordsRoute.open({ zoneId: zone.id })}
        />
      </Skeleton>
    );
  } else {
    return <></>;
  }
}
