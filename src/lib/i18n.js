import {
    writable
} from 'svelte/store'

const slugsContent = [{
    en: 'legal-notice',
    fr: 'mentions-légales'
}]


export const slugs = writable(slugsContent)