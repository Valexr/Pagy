<ul
    class="menu"
    style="top: {y}px; left: {x}px;"
    in:fade="{{ duration: 250 }}"
    use:clickout="{cmenu}"
    on:clickout="{close}"
    bind:this="{cmenu}"
>
    <li class="divider" data-content="{$contextMenu.item.name}"></li>
    {#each menu as link}
        <li class="menu-item">
            <a href="#_" on:click|preventDefault|stopPropagation="{(link.action(index), close)}">
                <i class="menu-icon icon icon-{link.icon} {link.class}"></i>
                <span class="px-2">{link.name}</span>
            </a>
        </li>
    {/each}
    <li class="divider"></li>
    <li class="menu-item">
        <a href="#menus" on:click|preventDefault="{() => ($contextMenu.isOpen = false)}">
            <i class="menu-icon icon icon-cross text-gray"></i>
            <span class="px-2">Cancel</span>
        </a>
    </li>
</ul>

<script lang="ts">
    import { fade } from 'svelte/transition';
    import { url } from 'svelte-pathfinder';
    import { contextMenu } from '@stores/store';
    import { clickout } from '@utils';

    export let menu = [],
        index = $contextMenu.item.id;

    let cmenu = null;

    $: x = $contextMenu.pos.x + 200 > window.innerWidth ? $contextMenu.pos.x - 150 : $contextMenu.pos.x;
    $: y = $contextMenu.pos.y + 200 > window.innerHeight ? $contextMenu.pos.y - 150 : $contextMenu.pos.y;

    const close = () => ($contextMenu.isOpen = false);
</script>

<style lang="scss">
    .menu {
        position: absolute;
        width: auto;
    }
</style>
