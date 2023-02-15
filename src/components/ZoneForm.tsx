import {
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Heading,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { $zone } from '../stores/zone';
import { Routes } from '../helpers/router';
import { NSZone, ZoneAssociation } from '../types/SchemaV3';
import { fx_addZone, fx_updateZone } from '../stores/zones';
import { zoneEditRouteLoaded, zonesRoute } from '../helpers/routes/zonesRoute';

export function ZoneEditFormPage(props: {}) {
  const zoneLoaded = useStore(zoneEditRouteLoaded.$isOpened);
  const zone = useStore($zone);

  const onSubmit = (form: NSZone) => {
    if (zone) {
      fx_updateZone({ zoneId: zone.id, zone: form }).then((r) => zonesRoute.open());
    }
  };
  return (
    <Skeleton isLoaded={zoneLoaded} fadeDuration={3}>
      <ZoneForm za={zone} onSubmit={(f) => onSubmit(f)} onCancel={() => zonesRoute.open()} />
    </Skeleton>
  );
}

export function ZoneNewFormPage(props: {}) {
  const onSubmit = (zone: NSZone) => {
    fx_addZone(zone).then((r) => zonesRoute.open());
  };
  return <ZoneForm za={null} onSubmit={(f) => onSubmit(f)} onCancel={() => zonesRoute.open()} />;
}

export function ZoneForm(props: {
  za: ZoneAssociation | null;
  onSubmit: (form: NSZone) => void;
  onCancel: () => void;
}) {
  const isNew = props.za === null;

  const zoneDefaults: NSZone = {
    name: '',
    authority: {
      serial: 100000,
      admin: '',
      expiration: 3600,
      minimum: 3600,
      primary: '',
      refresh: 3600,
      retry: 3600,
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NSZone>({ defaultValues: props.za?.zone ?? zoneDefaults, reValidateMode: 'onBlur' });
  const onSubmit = (data: NSZone) => {
    props.onSubmit(data);
  };
  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onCancel();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Stack spacing={'2'}>
        <Heading>{!isNew ? `Zone: ${props.za?.zone?.name}` : 'New zone'}</Heading>
        <FormControl isRequired isInvalid={errors.name?.type === 'required'}>
          <FormLabel>Zone name</FormLabel>
          <Input {...register('name', { required: { value: true, message: 'Field must be filled' } })} />
          <FormErrorMessage>{errors.name?.message ?? ''}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Zone administrator</FormLabel>
          <Input {...register('authority.admin', { required: true })} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Zone primary NS</FormLabel>
          <Input {...register('authority.primary')} />
        </FormControl>
        <Grid templateColumns="repeat(2,1fr)" gap="2">
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Expiration</FormLabel>
              <Input {...register('authority.expiration')} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Refresh</FormLabel>
              <Input {...register('authority.refresh')} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isRequired>
              <FormLabel>Retry</FormLabel>
              <Input {...register('authority.retry')} />
            </FormControl>
          </GridItem>
        </Grid>
        <FormControl isRequired={isNew} isReadOnly={!isNew}>
          <FormLabel>Serial (auto increments on change)</FormLabel>
          <Input {...register('authority.serial')} />
        </FormControl>
        <HStack>
          <Button type="submit" colorScheme={'green'}>
            Done
          </Button>
          <Button type="reset">Cancel</Button>
        </HStack>
      </Stack>
    </form>
  );
}
