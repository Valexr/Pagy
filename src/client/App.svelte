<Head name="{name}" />
<Header />
<Router />
<Footer />
<SideBars />
<Modals />
<Noticys />

<script lang="ts">
    import { Head, Header, Footer, Modals, SideBars, Noticys } from '@/client/components';
    import { Router } from '@routes';
    import { media } from '@stores/media';

    export let name;

    $: keys = Object.entries($media).filter(([k, v]) => {
        if (v === true) return k;
    });
    $: document.body.id =
        keys &&
        `${keys[0][0]} ${keys
            .flat()
            .filter((k) => k.length > 3)
            .join(' ')}`;
</script>

<style lang="scss" global>
    @import './sass/global.scss';
</style>
