<button
    class="btn btn-primary badge"
    class:btn-action="{$media.xs}"
    data-badge="{$items && $items.length}"
    on:click|stopPropagation="{addtoggle}"
>
    <i class="icon icon-plus"></i>
    <span class="text-capitalize hide-xs">
        {$page.alias.slice(0, -1)}
    </span>
</button>

<script lang="ts">
    import { fragment } from 'svelte-pathfinder';
    import { media } from '@stores/media';
    import { page } from '@routes';
    import { items, filters } from '@stores/store';

    function addtoggle() {
        $fragment = '#modal-add';
    }
</script>
