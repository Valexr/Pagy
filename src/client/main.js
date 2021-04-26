import App from './App.svelte';
import { setup } from 'svelte-match-media'

setup({
    xs: 'screen and (max-width: 480px)',
    sm: 'screen and (max-width: 600px)',
    md: 'screen and (max-width: 840px)',
    lg: 'screen and (max-width: 960px)',
    xl: 'screen and (max-width: 1280px)',
    xxl: 'screen and (min-width: 1281px)',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)'
})

const app = new App({
    target: document.body,
    props: {
        name: 'Pagy'
    }
});

export default app;
