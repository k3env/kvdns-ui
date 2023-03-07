import { createEffect, createStore, forward, restore } from 'effector';
import connectLocalStorage from 'effector-localstorage/sync';
import { fx_getRecords } from './records';
import { fx_getZones } from './zones';

const fx_saveServers = createEffect<void, string[]>('save-servers');

// const fx_getServers = createEffect<void, string[]>(() => {
//   const kvls = JSON.parse(localStorage.getItem('servers') ?? '[]');
//   return kvls;
// });

const fx_addServer = createEffect((server: string) => {
  if (server !== '') {
    return server;
  } else {
    throw new Error('Empty strings not allowed');
  }
});

const fx_deleteServer = createEffect((server: string) => {
  if (server !== '') {
    return server;
  } else {
    throw new Error('Empty strings not allowed');
  }
});

const fx_useServer = createEffect((server: string) => {
  return server;
});

const ls_serverList = connectLocalStorage('servers').onChange(fx_saveServers);
const ls_currentServer = connectLocalStorage('currentServer').onChange(fx_useServer);

// const $servers = restore<string[]>(fx_getServers, []);
const $servers = createStore<string[]>(ls_serverList.init([]));
const $currentServer = createStore<string>(ls_currentServer.init(''));

$servers.on(fx_saveServers.doneData, (s, p) => p);
$servers.on(fx_addServer.doneData, (s, p) => [...s, p]);
$servers.on(fx_deleteServer.doneData, (s, p) => s.filter((v) => v !== p));

$currentServer.on(fx_useServer.doneData, (s, p) => p);

$currentServer.watch(ls_currentServer);

$servers.watch(ls_serverList);

forward({ from: fx_useServer, to: [fx_getZones] });

export { $servers, fx_addServer, fx_deleteServer, $currentServer, fx_useServer };
