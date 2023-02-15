import { Button, Input, Select, Stack, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { NSRecordFormData } from '../types/NSRecordFormData';
import { NSRecord, RecordAssociation, ZoneAssociation } from '../types/SchemaV3';

export interface RecordsFormProps {
  record: RecordAssociation | null;
  zone: ZoneAssociation;
  onConfirm: (record: NSRecord) => void;
  onCancel: () => void;
}

export function RecordsForm(props: RecordsFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NSRecordFormData>({ defaultValues: props.record?.record ?? {} });

  const onSubmit = (data: NSRecordFormData) => {
    const rec: NSRecord = {
      zoneId: props.zone.id,
      ...data,
      data: {
        ...data.data,
        class: 1,
      },
    };
    props.onConfirm(rec);
  };
  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Stack spacing={'2'}>
        <Text>{props.record === null ? 'Add new' : `Edit ${watch('name')}`} record</Text>
        <FormControl>
          <FormLabel>Record name</FormLabel>
          <Input {...register('name')} />
        </FormControl>
        <FormControl>
          <FormLabel>Record TTL</FormLabel>
          <Input {...register('ttl')} />
        </FormControl>
        <FormControl>
          <FormLabel>Record Type</FormLabel>
          <Select {...register('type')}>
            <option>Select record type</option>
            <option value="A">A</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
            <option value="NS">NS</option>
            <option value="SRV">SRV</option>
            <option value="CNAME">CNAME</option>
          </Select>
        </FormControl>
        {watch('type') === 'A' && (
          <FormControl>
            <FormLabel>IP Address</FormLabel>
            <Input {...register('data.address')} />
          </FormControl>
        )}
        {watch('type') === 'MX' && (
          <>
            <FormControl>
              <FormLabel>MX Server priority</FormLabel>
              <Input {...register('data.priority')} />
            </FormControl>
            <FormControl>
              <FormLabel>Canonical server name</FormLabel>
              <Input {...register('data.exchange')} />
            </FormControl>
          </>
        )}
        {watch('type') === 'TXT' && (
          <FormControl>
            <FormLabel>Text</FormLabel>
            <Input {...register('data.data')} />
          </FormControl>
        )}
        {watch('type') === 'NS' && (
          <FormControl>
            <FormLabel>Canonical server name</FormLabel>
            <Input {...register('data.ns')} />
          </FormControl>
        )}
        {watch('type') === 'SRV' && (
          <>
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <Input {...register('data.priority')} />
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input {...register('data.weight')} />
            </FormControl>
            <FormControl>
              <FormLabel>Port</FormLabel>
              <Input {...register('data.port')} />
            </FormControl>
            <FormControl>
              <FormLabel>Target</FormLabel>
              <Input {...register('data.target')} />
            </FormControl>
          </>
        )}
        {watch('type') === 'CNAME' && (
          <FormControl>
            <FormLabel>Canonical server name</FormLabel>
            <Input {...register('data.domain')} />
          </FormControl>
        )}
        <Button type="submit">Done</Button>
        <Button type="reset">Cancel</Button>
      </Stack>
    </form>
  );
}
