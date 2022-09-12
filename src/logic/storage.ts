import { useStorageLocal } from '~/composables/useStorageLocal'
import { storage } from 'webextension-polyfill'
import { TabItem } from '~/types/Tab'
import { SpiderRule } from '~/types/MatchSpider';

const registeredArr = <TabItem[]>[];
const sbSpider = <SpiderRule>{
    league: {
        first: '',
        second: '',
    },
    leagueName: '',
    match: {
        first: '',
        second: '',
    },
    matchName: {
        home: '',
        away: '',
    },
    odd: {
        first: '',
        second: '',
    },
    matchTime: '',
    matchScore: {
        home: '',
        away: '',
    },
    oddOu: {
        first: {
            home: '',
            away: '',
        },
        second: {
            home: '',
            away: '',
        },
    },
    event: '',
};
export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo', { listenToStorageChanges: true })
export const registeredWindows = useStorageLocal('webext-registered-tab', registeredArr, { listenToStorageChanges: true })
export const testSpiderObj = useStorageLocal('webext-sb-spider', sbSpider, { listenToStorageChanges: true })

export function clearStorage(key: string) {
    storage.local.remove(key);
}

export function resetRegistered() {
    storage.local.remove('webext-registered-tab');
    storage.local.remove('webext-sb-spider');
}