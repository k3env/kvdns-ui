import { RouteParams } from 'atomic-router';
import { NSRecord, NSZone, ZoneAssociation } from './SchemaV3';

export type RecordListRouteParams = RouteParams & {
  zoneId: string;
};

export type RecordEditRouteParams = RouteParams & {
  zoneId: string;
  recordId: string;
};

export type RecordAddRouteParams = RouteParams & {
  zoneId: string;
};

export type QueryRecordParams = { zoneId: string; recordId: string };
export type AddRecordParams = { record: NSRecord };
export type UpdateRecordParams = { record: Partial<NSRecord>; recordId: string };
export type DeleteRecordResponse = { id: string; status: string };
export type DeleteRecordParams = { recordId: string };

export type UpdateZoneParams = { zoneId: string; zone: Partial<NSZone> };
export type DeleteZoneResponse = { id: string; status: string };
