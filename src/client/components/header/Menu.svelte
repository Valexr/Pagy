<DropDown
    bind:opener="{menu}"
    openbut="{{ name: '', icon: 'icon-apps', class: 'btn-link' }}"
    items="{routes.filter((r) => r.menu)}"
    downbut="{null}"
    li="{{ class: 'text-capitalize' }}"
    let:item
>
    <a
        href="{$history[item.alias] || item.default}"
        class="columns"
        class:active="{$pattern(item.match)}"
        on:click="{() => tick().then(() => (menu = !menu))}"
    >
        {#if item.icon}
            <i class="menu-icon icon icon-{item.icon}"></i>
        {/if}
        <span class="px-1">{item.props.title}</span>
    </a>
</DropDown>

<script lang="ts">
    import { tick } from 'svelte';
    import { pattern } from 'svelte-pathfinder';
    import { media } from '@stores/media';
    import { DropDown } from '@/client/components';
    import { routes, history } from '@routes';

    let menu = false;
</script>
