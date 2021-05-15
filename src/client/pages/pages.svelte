<script>
    import { onMount, onDestroy } from "svelte";
    import { slide } from "svelte/transition";
    import {
        url,
        path,
        pattern,
        query,
        fragment,
        click,
        state,
        back,
        goto,
    } from "svelte-pathfinder";
    import { date } from "@utils";
    import * as db from "@api/db";
    import { media } from "svelte-match-media";
    import { items, filters } from "@stores/store";

    onMount(async () => {
        $filters = await db.get("pages/filters");
        // db.del(`pages/items${$query}&prop=undefined`);
        // pages.del("items", "?prop=sq");
        // pages.patch("items", "", "?patch=sq");
    });

    async function get() {
        $items = await db.get(`pages/items${$query.split("&id")[0]}`);
    }
    $: get($query);

    function editPage(page) {
        $query.params.id = page.id;
        $fragment = "#sidebar";
    }
    async function copyPage(page) {
        const add = await db.get(`pages/items${$query}&id=${page.id}`);
        $items = await db.add(`pages/items${$query}`, add);
    }
    async function deletePage(page) {
        $items = await db.del(`pages/items${$query}&id=${page.id}`);
    }

    function sortby(items) {
        return items.sort((a, b) => {
            return b.id - a.id;
        });
    }

    $: sub = Array.from(Array($items.length).keys());
    function openSub(i) {
        console.log(sub, i);
        sub[i] = sub[i] === i ? true : i;
    }
    let p =
        "The responsive layout also provides fixed-width containers. Use grid-xs(480px), grid-sm(600px), grid-md(840px), grid-lg(960px) or grid-xl(1280px) to the container for a fixed-width container with the specific max-width.";
</script>

<h1 class="flex-centered">Pages</h1>

{#await $items}
    <div class="docs-demo columns">
        <div class="column col-12 text-center">
            <div class="loading loading-lg" />
        </div>
    </div>
{:then items}
    <section class="container">
        <table class="table table-hover" class:table-scroll={$media.md}>
            <thead>
                <tr>
                    <th />
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Create</th>
                    <th>Update</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each items as page, i (page.id)}
                    <tr class:bg-secondary={sub[i] === true}>
                        <td>
                            <button
                                class="btn btn-link btn-action btn-sm tooltip"
                                data-tooltip="Sub set"
                                on:click={openSub(i)}
                            >
                                <i class="icon icon-more-vert c-move" />
                            </button>
                        </td>
                        <td>{i}</td>
                        <td>{page.title}</td>
                        <td>{page.author}</td>
                        <td>{page.description}</td>
                        <td>{date(page.create)}</td>
                        <td>{date(page.update)}</td>
                        <td>
                            <button
                                class="btn btn-action tooltip"
                                class:btn-sm={$media.md}
                                data-tooltip="Edit page"
                                on:click|stopPropagation={editPage(page)}
                            >
                                <i class="icon icon-edit" />
                            </button>
                            <button
                                class="btn btn-link btn-action tooltip"
                                class:btn-sm={$media.md}
                                data-tooltip="Copy page"
                                on:click={copyPage(page)}
                            >
                                <i class="icon icon-copy" />
                            </button>
                            <button
                                class="btn btn-link btn-action text-error"
                                class:btn-sm={$media.md}
                                on:click={deletePage(page)}
                            >
                                <i class="icon icon-delete" />
                            </button>
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
                                        <p>
                                            {p}
                                        </p>
                                    </div>
                                    <div class="column col-2">
                                        <img
                                            src="/favicon.png"
                                            alt="favicon"
                                            width="100px"
                                        />
                                    </div>
                                    <div class="column col-5">
                                        <p>
                                            {p}
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </section>
{/await}

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
</style>
