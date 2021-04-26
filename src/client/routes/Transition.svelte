<!-- Transition.svelte -->
<script>
    import { fade } from "svelte/transition";
    import { path } from "@routes";
</script>

{#key $path.alias}
    <main class="container {$path.alias}" in:fade={{ duration: 700 }}>
        <slot />
    </main>
{/key}

<style lang="scss">
    main {
        padding-top: 5em;
        &.auth {
            padding-top: 0;
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }
</style>
