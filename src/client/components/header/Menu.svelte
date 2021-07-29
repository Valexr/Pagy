<script>
    import { tick } from "svelte";
    import { pattern } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import { DropDown } from "@cmp";
    import { routes, history } from "@routes";

    let menu = false;
</script>

<DropDown
    bind:opener={menu}
    openbut={{ name: "", icon: "icon-apps", class: "btn-link" }}
    items={routes.filter((r) => r.menu)}
    downbut={null}
    ul={$media.dark && { class: "bg-dark" }}
    li={{ class: "text-capitalize" }}
    let:item
>
    <a
        href={$history[item.alias] || item.default}
        class="columns"
        class:active={$pattern(item.match)}
        on:click={() => tick().then(() => (menu = !menu))}
    >
        {#if item.icon}
            <i class="menu-icon icon icon-{item.icon}" />
        {/if}
        <span class="px-1">{item.props.title}</span>
    </a>
</DropDown>
