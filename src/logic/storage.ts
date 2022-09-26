import { useStorageLocal } from '~/composables/useStorageLocal'
import { storage } from 'webextension-polyfill'
import { TabItem } from '~/types/Tab'
import { PlatformLayout } from '~/types/MatchSpider';

const registeredArr = <TabItem[]>[];
const sbSpider = <PlatformLayout>{
    leagueNameFirst: '',
    leagueNameSecond: '',
    matchNameHomeFirst: '',
    matchNameAwayFirst: '',
    matchNameHomeSecond: '',
    matchScoreHome: '',
    matchScoreAway: '',
    matchTime: '',
    odd: {
        OU: {
            whole: {
                home: '',
    away: '',
    pk: '',
            },
            half: {
                home: '',
    away: '',
    pk: '',
            },
        }
    },
    oddIndex: '',
};
export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo', { listenToStorageChanges: true })
export const registeredWindows = useStorageLocal('webext-registered-tab', registeredArr, { listenToStorageChanges: true })
export const testSpiderObj = useStorageLocal('webext-sb-spider', sbSpider, { listenToStorageChanges: true })

export function clearStorage(key: string) {
    storage.local.remove(key);
}
export function clearBaseStorage() {
    storage.local.remove('webext-sb-spider');
}


export function resetRegistered() {
    storage.local.remove('webext-registered-tab');
    // storage.local.remove('webext-sb-spider');
}