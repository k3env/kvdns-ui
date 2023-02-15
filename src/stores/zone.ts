/*
  Store used only for zone add/edit form
*/

import { createEffect, restore } from 'effector';
import { ZoneAssociation } from '../types/SchemaV3';

const fx_getZone = createEffect<string, ZoneAssociation>((zoneId: string) =>
  fetch(`${import.meta.env.VITE_API_URL}/api/v2/zone/${zoneId}`).then((r) => r.json()),
);

const $zone = restore(fx_getZone, null);
$zone.on(fx_getZone.doneData, (s, p) => p);

export { $zone, fx_getZone };
