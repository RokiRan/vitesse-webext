import { useStorageLocal } from '~/composables/useStorageLocal'

export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo', { listenToStorageChanges: true })
export const storageActiveTab = useStorageLocal('webext-active-tab', 0, { listenToStorageChanges: true })
