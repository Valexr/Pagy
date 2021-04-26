<script>
    import { onMount } from "svelte";
    import { media } from "svelte-match-media";
    import { date } from "@utils";
    import * as data from "@api/data";
    // import { routes, path, curlocale } from "@routes";

    let users = [];

    onMount(async () => (users = await data.db("users", "admin")));

    $: console.log(users);
</script>

<table class="table table-striped table-hover" class:table-scroll={$media.md}>
    <thead>
        <tr>
            <th />
            <th>Id</th>
            <th>Email</th>
            <th>Password</th>
            <th>Create</th>
            <th>Update</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each users as user, i (user.id)}
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
                <td contenteditable="true" bind:textContent={user.email}>
                    {user.email}
                </td>
                <td>{user.password}</td>
                <td>{date(user.create)}</td>
                <td>{date(user.update)}</td>
                <td>
                    <button
                        class="btn btn-action tooltip"
                        data-tooltip="Edit book"
                        on:click|preventDefault
                    >
                        <i class="icon icon-edit" />
                    </button>
                    <button
                        class="btn btn-link btn-action tooltip"
                        data-tooltip="Copy book"
                        on:click|preventDefault
                    >
                        <i class="icon icon-copy" />
                    </button>
                    <button
                        class="btn btn-link btn-action text-error"
                        on:click|preventDefault
                    >
                        <i class="icon icon-delete" />
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

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
</style>
