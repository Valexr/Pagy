<script>
    import { router } from "tinro";
    import { media } from "svelte-match-media";
    import { cmeta, cpath, chistory } from "@routes";
    import { items, filters } from "@stores/store";

    function addtoggle() {
        router.location.hash.set("modal-add");
        // router.goto(`${$router.url}#modal-add`);
        // addopen = !addopen;
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
        {$cpath.alias.slice(0, -1)}
    </span>
</button>
