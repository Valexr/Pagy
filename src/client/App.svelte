<script>
    import { Head, Header, Footer, Modals, SideBars } from "@cmp";
    import { Router } from "@routes";
    import { media } from "svelte-match-media";

    $: keys = Object.entries($media).filter(([k, v]) => {
        if (v === true) return k;
    });
    $: document.body.id = keys && `${keys[0][0]} ${keys[keys.length - 1][0]}`;
    // $: console.log($media, keys);
</script>

<!-- <Head /> -->
<Header />
<Router />
<Footer />
<SideBars />

<!-- <Modals /> -->
<style lang="scss" global>
    @import "./global.scss";
</style>
