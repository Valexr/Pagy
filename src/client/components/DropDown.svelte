<script context="module">
    const list = new Set();
    function closeAll() {
        list.forEach((fn) => fn());
    }
</script>

<script>
    import { onMount } from "svelte";
    import { clickout } from "@utils";
    import { media } from "svelte-match-media";

    export let ul = null,
        opener = false,
        openbut = {
            name: "Open",
            icon: "icon-caret",
            class: "",
            badge: "",
            initial: "",
        },
        items = [],
        downbut = false,
        right = false,
        auto = false;
    // const open = () => (opener = !opener);
    onMount(() => {
        const fn = () => (opener = false);
        list.add(fn);
        return () => list.delete(fn);
    });

    function toggle() {
        if (opener) return (opener = false);
        closeAll();
        opener = true;
    }
</script>

<div
    class="dropdown"
    class:dropdown-right={right}
    class:dropdown-auto={auto}
    class:active={opener}
>
    <button
        class="btn text-capitalize {openbut.class}"
        data-badge={openbut.badge}
        data-initial={openbut.initial}
        on:click|stopPropagation={toggle}
    >
        {openbut.name}
        <i class="icon {openbut.icon ? openbut.icon : 'icon-caret'}" />
    </button>
    {#if opener}
        <ul
            class="menu"
            bind:this={ul}
            use:clickout={ul}
            on:clickout={() => (opener = !opener)}
        >
            {#if items.length}
                {#each items as item}
                    <li class="menu-item text-capitalize">
                        <slot {item}>
                            <a
                                href={item.href}
                                on:click={item.action}
                                class:active={item.active}
                            >
                                {item.title}
                                {#if item.button}
                                    <button
                                        class="btn btn-action btn-sm p-relative float-right sm-acts"
                                        on:click|preventDefault|stopPropagation
                                    >
                                        <i class="icon icon-edit" />
                                    </button>
                                {/if}
                            </a>
                        </slot>
                    </li>
                {/each}
            {:else}
                <li>
                    <slot name="static" />
                </li>
            {/if}
            {#if downbut}
                <li class="divider" />
                <li class="menu-item">
                    <button
                        class="btn btn-primary btn-block text-light"
                        on:click={downbut.action}
                    >
                        <i
                            class="icon icon-{downbut.icon
                                ? downbut.icon
                                : 'plus'}"
                        />
                        {downbut.title}
                    </button>
                </li>
            {/if}
        </ul>
    {/if}
</div>

<style lang="scss">
    .badge.btn::after {
        transform: translate(30%, -30%);
    }
</style>
