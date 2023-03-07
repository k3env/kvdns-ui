import { createEffect, restore } from 'effector';
import { useStore } from 'effector-react';
import { buildJsonReqInit } from '../helpers/helpers';
import {
  QueryRecordParams,
  AddRecordParams,
  UpdateRecordParams,
  DeleteRecordParams,
  DeleteRecordResponse,
} from '../types/router-types';
import { RecordAssociation } from '../types/SchemaV3';
import { $currentServer } from './servers';

const fx_getRecords = createEffect<string, RecordAssociation[]>((zoneId: string) =>
  fetch(`${$currentServer.getState()}/api/v2/zone/${zoneId}/record`).then((r) => r.json()),
);
const fx_addRecord = createEffect<AddRecordParams, RecordAssociation>((p: AddRecordParams) =>
  fetch(`${$currentServer.getState()}/api/v2/record`, buildJsonReqInit(p, 'POST')).then((r) => r.json()),
);
const fx_updateRecord = createEffect<UpdateRecordParams, RecordAssociation>((p: UpdateRecordParams) =>
  fetch(`${$currentServer.getState()}/api/v2/record`, buildJsonReqInit(p, 'PATCH')).then((r) => r.json()),
);
const fx_deleteRecord = createEffect<DeleteRecordParams, DeleteRecordResponse>((p) =>
  fetch(`${$currentServer.getState()}/api/v2/record`, buildJsonReqInit(p, 'DELETE')).then((r) => r.json()),
);

const $records = restore(fx_getRecords, []);
$records.on(fx_getRecords.doneData, (s, p) => p);
$records.on(fx_addRecord.doneData, (s, p) => console.log(p));
$records.on(fx_updateRecord.doneData, (s, p) => console.log(p));
$records.on(fx_deleteRecord.doneData, (s, p) => s.filter((r) => r.id !== p.id));

export { $records, fx_getRecords, fx_addRecord, fx_updateRecord, fx_deleteRecord };
