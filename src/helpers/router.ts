import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import { ZoneList, RecordsList, ZoneEditFormPage, ZoneNewFormPage } from '@components';

import * as Routes from './routes/_index';
import { RecordFormAddPage, RecordFormEditPage } from '../components/RecordForm';

const RoutesView = createRoutesView({
  routes: [
    { route: Routes.zonesRoute, view: ZoneList },
    { route: Routes.zoneAddRoute, view: ZoneNewFormPage },
    { route: Routes.zoneEditRoute, view: ZoneEditFormPage },
    { route: Routes.recordsRoute, view: RecordsList },
    { route: Routes.recordEditRoute, view: RecordFormEditPage },
    { route: Routes.recordAddRoute, view: RecordFormAddPage },
  ],
});

const routes = [
  { path: '/', route: Routes.zonesRoute },
  { path: '/zone/new', route: Routes.zoneAddRoute },
  { path: '/zone/:zoneId', route: Routes.recordsRoute },
  { path: '/zone/:zoneId/edit', route: Routes.zoneEditRoute },
  { path: '/zone/:zoneId/record/new', route: Routes.recordAddRoute },
  { path: '/zone/:zoneId/record/:recordId/edit', route: Routes.recordEditRoute },
];

const history = createBrowserHistory();
const router = createHistoryRouter({
  routes: routes,
});
router.setHistory(history);

export { RoutesView, router, Routes };
