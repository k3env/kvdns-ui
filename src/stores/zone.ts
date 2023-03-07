/*
  Store used only for zone add/edit form
*/

import { createEffect, restore } from 'effector';
import { ZoneAssociation } from '../types/SchemaV3';
import { $currentServer } from './servers';

const fx_getZone = createEffect<string, ZoneAssociation>((zoneId: string) =>
  fetch(`${$currentServer.getState()}/api/v2/zone/${zoneId}`).then((r) => r.json()),
);

const $zone = restore(fx_getZone, null);
$zone.on(fx_getZone.doneData, (s, p) => p);

export { $zone, fx_getZone };
