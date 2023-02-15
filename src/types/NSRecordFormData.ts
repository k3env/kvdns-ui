import {
  NSRecordType,
  NSRecordDataA,
  NSRecordDataMX,
  NSRecordDataCNAME,
  NSRecordDataNS,
  NSRecordDataSRV,
  NSRecordDataTXT,
} from './SchemaV3';

export type NSRecordDataType =
  | NSRecordDataA
  | NSRecordDataMX
  | NSRecordDataCNAME
  | NSRecordDataNS
  | NSRecordDataSRV
  | NSRecordDataTXT;

export interface NSRecordFormData {
  name: string;
  type: NSRecordType;
  ttl: number;
  data: NSRecordDataType;
}
