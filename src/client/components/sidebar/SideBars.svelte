<script>
    import { fragment } from "svelte-pathfinder";
    import { SideBarEdit, SideBarFilters } from "@cmp";
</script>

{#if $fragment === "#sidebar-edit"}
    <SideBarEdit />
{:else if $fragment === "#sidebar-filters"}
    <SideBarFilters />
{/if}
