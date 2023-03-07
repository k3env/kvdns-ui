import { createEffect, restore } from 'effector';
import { buildJsonReqInit } from '../helpers/helpers';
import { QueryRecordParams } from '../types/router-types';
import { RecordAssociation } from '../types/SchemaV3';
import { $currentServer } from './servers';

const fx_getRecord = createEffect<QueryRecordParams, RecordAssociation>(async (p) => {
  console.log(`${$currentServer.getState()}/api/v2/record/${p.recordId}`);
  const r = await fetch(`${$currentServer.getState()}/api/v2/record/${p.recordId}?zoneId=${p.zoneId}`);
  return await r.json();
});

const $record = restore(fx_getRecord, null);
$record.on(fx_getRecord.doneData, (s, p) => p);

export { $record, fx_getRecord };
