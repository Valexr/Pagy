<script>
    import { slide } from "svelte/transition";
    import { media } from "svelte-match-media";
    import { date, longpress } from "@utils";
    import { contextMenu } from "@stores/store";
    import { ContextMenu } from "@cmp";

    export let keys = [],
        items = [],
        menu = [];

    function oncontextMenu(e, item) {
        console.log(item, e);
        $contextMenu = {
            isOpen: true,
            item: item,
            pos: { x: e.pageX, y: e.pageY },
        };
    }
    function onlongPress(e, item) {
        console.log(item, e);
        $contextMenu = {
            isOpen: true,
            item: item,
            pos: { x: e.detail.X, y: e.detail.Y },
        };
    }
    $: sub = Array.from(Array(items.length).keys());
    function openSub(i) {
        console.log(sub, i);
        sub[i] = sub[i] === i ? true : i;
    }
    let p =
        "The responsive layout also provides fixed-width containers. Use grid-xs(480px), grid-sm(600px), grid-md(840px), grid-lg(960px) or grid-xl(1280px) to the container for a fixed-width container with the specific max-width.";
</script>

<table class="table table-hover table-scroll" class:table-scroll={$media.md}>
    <thead>
        <tr>
            <th />
            <th>id</th>
            {#each keys as key}
                <th>{key}</th>
            {/each}
            <th width="140">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each items as item, i (item.id)}
            <tr
                on:contextmenu|preventDefault={(e) => oncontextMenu(e, item)}
                use:longpress
                on:longpress|preventDefault={(e) => onlongPress(e, item)}
            >
                <td>
                    <button
                        class="btn btn-link btn-action tooltip c-move"
                        data-tooltip="Sub set"
                        on:click={openSub(i)}
                    >
                        <i class="icon icon-more-vert" />
                    </button>
                </td>
                <td>{i}</td>
                {#each keys as key}
                    <!-- {typeof item[key]} -->
                    {#if `${item[key]}`.includes("https:")}
                        <td><slot name="img" {item} /></td>
                    {:else if Array.isArray(item[key])}
                        <td>
                            {item[key].join(", ")}
                        </td>
                    {:else if typeof item[key] === "number"}
                        <td>
                            {date(item[key])}
                        </td>
                    {:else}
                        <td contenteditable="true" bind:textContent={item[key]}>
                            {item[key]}
                        </td>
                    {/if}
                {/each}
                <td>
                    <slot name="actions" {item} />
                </td>
            </tr>
            {#if sub[i] === true}
                <tr
                    transition:slide
                    class="sub bg-gray"
                    class:sub-open={sub[i] === true}
                >
                    <td colspan="8">
                        <div class="columns">
                            <div class="column col-5">
                                <p>{p}</p>
                            </div>
                            <div class="column col-2">
                                <img
                                    src="/favicon.png"
                                    alt="favicon"
                                    width="100px"
                                />
                            </div>
                            <div class="column col-5">
                                <p>{p}</p>
                            </div>
                        </div>
                    </td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>

{#if $contextMenu.isOpen === true}
    <ContextMenu {menu} />
{/if}

<style lang="scss">
    .sub {
        height: 0;
        transition: height 500ms ease 500ms;
        // display: none;
        &.sub-open {
            height: 300px;
            // display: table-row;
        }
    }
    @import "../../../../node_modules/spectre.css/src/variables";
    table {
        td {
            &:focus-visible {
                outline-color: $primary-color;
                outline-style: dotted;
                outline-width: 2px;
            }
            &:focus {
                outline-color: $primary-color;
                outline-style: dotted;
                outline-width: 2px;
            }
            &:-webkit-direct-focus {
                outline-color: $primary-color;
                outline-style: dotted;
                outline-width: 2px;
            }
        }
    }
</style>
