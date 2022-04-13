<button
    class="btn badge"
    class:btn-action="{$media.xs}"
    data-badge="{$filters && Object.keys($filters).length}"
    on:click|stopPropagation="{toggle}"
>
    <i class="icon icon-more-vert"></i>
    <span class="text-capitalize hide-xs"> Filters </span>
</button>

<script lang="ts">
    import { fragment } from 'svelte-pathfinder';
    import { media } from '@stores/media';
    import { page } from '@routes';
    import { items, filters } from '@stores/store';

    function toggle() {
        $fragment = $fragment === '#sidebarFilters' ? '' : '#sidebarFilters';
    }
</script>
