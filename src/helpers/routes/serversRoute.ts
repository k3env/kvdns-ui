import { createRoute, chainRoute } from 'atomic-router';
// import { fx_getServers } from '../../stores/servers';

const serversRoute = createRoute();
// const serversRouteLoaded = chainRoute({
//   route: serversRoute,
//   beforeOpen: {
//     effect: fx_getServers,
//     mapParams: () => {},
//   },
// });

export { serversRoute };
