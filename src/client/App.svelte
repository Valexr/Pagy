<script>
    import { Head, Header, Footer, Modals, SideBars } from "@cmp";
    import { Router } from "@routes";
    import { media } from "svelte-match-media";

    export let name;

    $: keys = Object.entries($media).filter(([k, v]) => {
        if (v === true) return k;
    });
    $: document.body.id =
        keys &&
        `${keys[0][0]} ${keys
            .flat()
            .filter((k) => k.length > 3)
            .join(" ")}`;
    // $: console.log($media, keys);
</script>

<Head {name} />
<Header />
<Router />
<Footer />
<SideBars />
<Modals />

<style lang="scss" global>
    @import "./global.scss";
</style>
