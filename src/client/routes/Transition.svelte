<script>
    import { fade } from "svelte/transition";
    import { page } from "@routes";

    export let duration = 250;
</script>

{#key $page}
    <main
        id={$page.alias}
        class="container"
        in:fade={{ duration: duration, delay: 100 }}
    >
        <slot />
    </main>
{/key}

<style lang="scss">
    main {
        padding-bottom: 5em;
        &#auth {
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            overflow-y: auto;
            padding: 3em 0;
        }
    }
</style>
