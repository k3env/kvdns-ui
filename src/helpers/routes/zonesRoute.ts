import { chainRoute, createRoute, RouteParams } from 'atomic-router';
import { fx_getZone } from '../../stores/zone';
import { fx_getZones } from '../../stores/zones';

const zonesRoute = createRoute();
const zoneEditRoute = createRoute<RouteParams>();
const zoneAddRoute = createRoute();

const zonesRouteLoaded = chainRoute({
  route: zonesRoute,
  beforeOpen: {
    effect: fx_getZones,
    mapParams: () => {},
  },
});

const zoneEditRouteLoaded = chainRoute({
  route: zoneEditRoute,
  beforeOpen: {
    effect: fx_getZone,
    mapParams: ({ params }) => params.zoneId,
  },
});

export { zonesRoute, zoneAddRoute, zoneEditRoute, zonesRouteLoaded, zoneEditRouteLoaded };
