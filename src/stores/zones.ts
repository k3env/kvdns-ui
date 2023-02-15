import { createEffect, forward, restore } from 'effector';
import { UpdateZoneParams, DeleteZoneResponse } from '../types/router-types';
import { NSZone, ZoneAssociation } from '../types/SchemaV3';

const fx_getZones = createEffect<void, ZoneAssociation[]>(() =>
  fetch(`${import.meta.env.VITE_API_URL}/api/v2/zone`).then((v) => v.json()),
);
const fx_addZone = createEffect<NSZone, ZoneAssociation>((zone: NSZone) =>
  fetch(`${import.meta.env.VITE_API_URL}/api/v2/zone`, {
    method: 'POST',
    body: JSON.stringify({ zone }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((v) => v.json()),
);
const fx_updateZone = createEffect<UpdateZoneParams, ZoneAssociation>((params: UpdateZoneParams) =>
  fetch(`${import.meta.env.VITE_API_URL}/api/v2/zone`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json()),
);
const fx_deleteZone = createEffect<string, DeleteZoneResponse>((zone: string) =>
  fetch(`${import.meta.env.VITE_API_URL}/api/v2/zone`, {
    method: 'DELETE',
    body: JSON.stringify({ id: zone }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json()),
);

const $zones = restore(fx_getZones, []);
$zones.on(fx_getZones.doneData, (s, p) => p);
$zones.on(fx_addZone.doneData, (s, p) => console.log(p));
$zones.on(fx_updateZone.doneData, (s, p) => console.log(p));
$zones.on(fx_deleteZone.doneData, (s, p) => s.filter((_) => _.id !== p.id));

export { $zones, fx_getZones, fx_addZone, fx_updateZone, fx_deleteZone };
