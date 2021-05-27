<script>
    import { fragment } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import { page } from "@routes";
    import { items, filters } from "@stores/store";

    function toggle() {
        $fragment = "#sidebarFilters";
    }
</script>

<button
    class="btn btn-primary badge"
    class:btn-action={$media.xs}
    data-badge={$filters && Object.keys($filters).length}
    on:click|stopPropagation={toggle}
>
    <i class="icon icon-more-vert" />
    <span class="text-capitalize hide-xs"> Filters </span>
</button>
