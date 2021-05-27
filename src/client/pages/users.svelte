<script>
    import { onMount } from "svelte";
    import { query, fragment } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import * as db from "@api/db";
    import { date } from "@utils";
    import { items, filters } from "@stores/store";
    // import { history } from "@routes";
    // import { Table } from "svelte-tabular-table";
    // import { TableCmps } from "@cmp";

    // $: getData($query);

    // async function getData(q) {
    //     const data = await db.get(`/users/items${q.split("&id")[0]}`);
    //     $items = data.items;
    //     $filters = data.filters;
    //     const all = await db.get("/users/all");
    //     console.log(all);
    // }

    function editUser(id) {
        $fragment = `#sidebarEdit-${id}`;
    }

    async function copyUser(user) {
        const url = `/users/items${$query}&id=${user.id}`;
        const add = await db.get(url);
        $items = await db.add(url, add);
    }

    async function deleteUser(user) {
        $items = await db.del(`/users/items${$query}&id=${user.id}`);
    }

    // $: config = $items.length && {
    //     id: "users",
    //     class: "table table-striped table-hover",
    //     init: {
    //         keys: ["id", "username", "create", "update", "actions"],
    //         index: "id",
    //         data: $items,
    //         nodiv: true,
    //     },
    //     features: {
    //         sortable: {
    //             key: "id",
    //         },
    //         rearrangeable: (from, to) => alert(`from ${from} to ${to}`),
    //     },
    //     dimensions: {
    //         // widths: [30, 50, "auto", "auto", "auto", "auto", "auto"],
    //     },
    //     callbacks: {
    //         render: {
    //             cell: TableCmps,
    //             key: TableCmps,
    //         },
    //     },
    // };
</script>

<h1 class="flex-centered">Users</h1>

<!-- {#await $items}
    <div class="docs-demo columns">
        <div class="column col-12 text-center">
            <div class="loading loading-lg" />
        </div>
    </div>
{:then items} -->
<section class="container">
    <!-- {#if items}
            <Table {...config} />
        {/if} -->

    <table
        class="table table-striped table-hover"
        class:table-scroll={$media.md}
    >
        <thead>
            <tr>
                <th />
                <th>Id</th>
                <th>Username</th>
                <!-- <th>Password</th> -->
                <th>Create</th>
                <th>Update</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each $items as user, i (user.id)}
                <tr>
                    <td>
                        <button
                            class="btn btn-link btn-action tooltip c-move"
                            data-tooltip="Sub set"
                            on:click|preventDefault
                        >
                            <i class="icon icon-more-vert" />
                        </button>
                    </td>
                    <td>{i}</td>
                    <td contenteditable="true" bind:textContent={user.username}>
                        {user.username}
                    </td>
                    <!-- <td>{user.password}</td> -->
                    <td>{date(user.create)}</td>
                    <td>{date(user.update)}</td>
                    <td>
                        <button
                            class="btn btn-action tooltip"
                            data-tooltip="Edit book"
                            on:click|stopPropagation={editUser(user.id)}
                        >
                            <i class="icon icon-edit" />
                        </button>
                        <button
                            class="btn btn-link btn-action tooltip"
                            data-tooltip="Copy book"
                            on:click={copyUser(user)}
                        >
                            <i class="icon icon-copy" />
                        </button>
                        <button
                            class="btn btn-link btn-action text-error"
                            on:click={deleteUser(user)}
                        >
                            <i class="icon icon-delete" />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<!-- {/await} -->
<style lang="scss">
    @import "../../../node_modules/spectre.css/src/variables";
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
    h1 {
        text-transform: capitalize;
    }
</style>
