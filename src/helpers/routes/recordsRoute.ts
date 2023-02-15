import { createRoute, RouteParams, chainRoute } from 'atomic-router';
import { Store } from 'effector';
import { $record, fx_getRecord } from '../../stores/record';
import { fx_getRecords } from '../../stores/records';
import { $zone, fx_getZone } from '../../stores/zone';
import { RecordListRouteParams, RecordEditRouteParams, RecordAddRouteParams } from '../../types/router-types';
import { RecordAssociation } from '../../types/SchemaV3';

const recordsRoute = createRoute<RouteParams>();
const recordEditRoute = createRoute<RouteParams>();
const recordAddRoute = createRoute<RouteParams>();

const recordsRouteLoaded = chainRoute({
  route: recordsRoute,
  beforeOpen: {
    effect: fx_getZone,
    mapParams: ({ params }) => (params as RecordListRouteParams).zoneId,
  },
});
const recordEditRouteLoaded = chainRoute({
  route: recordEditRoute,
  beforeOpen: {
    effect: fx_getRecord,
    mapParams: ({ params }) => params as RecordEditRouteParams,
  },
});
const recordAddRouteLoaded = chainRoute({
  route: recordAddRoute,
  beforeOpen: {
    effect: fx_getZone,
    mapParams: ({ params }) => (params as RecordAddRouteParams).zoneId,
  },
});

const recordsLoaded = chainRoute({
  route: recordsRouteLoaded,
  beforeOpen: {
    effect: fx_getRecords,
    // source: $zone,
    mapParams: ({ params }) => params.zoneId,
    // пример из доки [ссылка](https://atomic-router.github.io/examples/data-fetching.html)
    // ошибка приведения типов.
  },
});

export {
  recordsRoute,
  recordEditRoute,
  recordAddRoute,
  recordsRouteLoaded,
  recordsLoaded,
  recordEditRouteLoaded,
  recordAddRouteLoaded,
};
