<div
    class="dropdown"
    class:dropdown-right="{right}"
    class:float-right="{right}"
    class:dropdown-auto="{auto}"
    class:active="{opener}"
>
    <button
        class="btn {openbut.class}"
        data-badge="{openbut.badge}"
        data-initial="{openbut.initial}"
        on:click|stopPropagation="{toggle}"
    >
        {openbut.name}
        <i class="icon {openbut.icon ? openbut.icon : 'icon-caret'}"></i>
    </button>
    {#if opener}
        <ul
            class="menu {ul.class}"
            bind:this="{ul.node}"
            use:clickout="{ul.node}"
            on:clickout="{() => (opener = !opener)}"
        >
            {#if items.length}
                {#each items as item}
                    <li class="menu-item {li.class}">
                        <slot item="{item}">
                            <a href="{item.href}" on:click="{item.action}" class:active="{item.active}">
                                {item.title}
                                {#if item.button}
                                    <button
                                        class="btn btn-action btn-sm p-relative float-right sm-acts"
                                        on:click|preventDefault|stopPropagation
                                    >
                                        <i class="icon icon-edit"></i>
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
                <li class="divider"></li>
                <li class="menu-item">
                    <button class="btn btn-block {downbut.class}" on:click="{downbut.action}">
                        <i class="icon icon-{downbut.icon ? downbut.icon : 'plus'}"></i>
                        {downbut.title}
                    </button>
                </li>
            {/if}
        </ul>
    {/if}
</div>

<script context="module">
    const list = new Set();
    function closeAll() {
        list.forEach((fn) => fn());
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    import { clickout } from '@utils';
    import { media } from '@stores/media';

    export let ul = { node: null, class: '' },
        li = { class: '' },
        opener = false,
        openbut = {
            name: 'Open',
            icon: 'icon-caret',
            class: '',
            badge: '',
            initial: '',
        },
        items = [],
        downbut = false,
        right = false,
        auto = false;

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

<style lang="scss">
    .badge.btn::after {
        transform: translate(30%, -30%);
    }
</style>
