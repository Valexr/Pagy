<script>
    import { fragment } from "svelte-pathfinder";
    import { SideBarEdit, SideBarFilters } from "@cmp";
</script>

{#if $fragment.includes("#sidebarEdit")}
    <SideBarEdit />
{:else if $fragment === "#sidebarFilters"}
    <SideBarFilters />
{/if}
