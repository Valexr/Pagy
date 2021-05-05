// src/i18n.js
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('@locales/en.json'));
register('en-US', () => import('./en-US.json'));
register('pt', () => import('./pt.json'));
// en, en-US and pt are not available yet

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
});
// starts loading 'en-US' and 'en'