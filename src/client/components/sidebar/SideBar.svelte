<script>
    import { onDestroy, onMount, tick } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { query, fragment } from "svelte-pathfinder";
    import { clickout } from "@utils";
    import { media } from "svelte-match-media";

    export let right = false,
        backdrop = true;

    let aside = null,
        form = null,
        editForm = {
            id: "",
            title: "",
            author: "",
            description: "",
        },
        isOpen = false,
        width = 0;

    const close = () => (($query = $query.split("&id")[0]), ($fragment = ""));

    $: if (aside && isOpen) width = aside.clientWidth;
</script>

<aside
    class="container p-fixed"
    class:w90={$media.xs}
    transition:fly={{
        delay: 0,
        duration: 500,
        x: right ? 490 : -490,
        y: 0,
        opacity: 1,
        // easing: quintOut,
    }}
    on:introend={() => (isOpen = true)}
    on:outrostart={() => (isOpen = false)}
    bind:this={aside}
    use:clickout={aside}
    on:clickout={close}
    class:right
>
    <button
        class="btn btn-clear"
        aria-label="Close"
        id="close"
        on:click={close}
    />
    <slot />
</aside>

{#if backdrop}
    <div class="aside-backdrop" transition:fade />
{/if}

<style lang="scss">
    .w90 {
        width: 90%;
    }
    aside {
        top: 0;
        bottom: 0;
        width: auto;
        max-width: 490px;
        z-index: 400;
        box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
        background: white;
        overflow-y: auto;
        padding: 3em 1.6rem;
        button#close {
            position: absolute;
            top: 1.6rem;
            right: 1.6rem;
        }
        &.right {
            right: 0;
        }
    }
    .aside-backdrop {
        background: rgba(247, 248, 249, 0.75);
        bottom: 0;
        cursor: default;
        display: block;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 300;
    }
    .accordion .accordion-body {
        overflow: auto;
    }
</style>
