{#if $fragment.includes('#sidebarEdit')}
    <SideBarEdit />
{:else if $fragment === '#sidebarFilters'}
    <SideBarFilters />
{/if}

<script lang="ts">
    import { fragment } from 'svelte-pathfinder';
    import { SideBarEdit, SideBarFilters } from '@cmp';
</script>
