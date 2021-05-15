<script>
    import {
        url,
        path,
        pattern,
        query,
        fragment,
        click,
        state,
    } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import { page } from "@routes";
    import { items, filters } from "@stores/store";

    function addtoggle() {
        $fragment = "modal-add";
    }
</script>

<button
    class="btn btn-primary badge"
    class:btn-action={$media.xs}
    data-badge={$items.length}
    on:click|stopPropagation={addtoggle}
>
    <i class="icon icon-plus" />
    <span class="text-capitalize hide-xs">
        {$page.alias.slice(0, -1)}
    </span>
</button>
