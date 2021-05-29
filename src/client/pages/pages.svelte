<script>
    import { query, fragment } from "svelte-pathfinder";
    import * as db from "@api/db";
    import { items } from "@stores/store";
    import { Table, TableActions } from "@cmp";

    const keys = ["title", "author", "description", "create", "update"],
        actions = [
            {
                class: "btn-action tooltip",
                tooltip: "Edit",
                icon: "edit",
                action: (e) => edit(e),
            },
            {
                class: "btn-action btn-link tooltip",
                tooltip: "Copy",
                icon: "copy",
                action: (e) => copy(e),
            },
            {
                class: "btn-action btn-link text-error",
                icon: "delete",
                action: (e) => del(e),
            },
        ];

    function edit(id) {
        $fragment = `#sidebarEdit-${id}`;
    }
    async function copy(id) {
        const add = await db.get(`/pages/items${$query}&id=${id}`);
        $items = await db.add(`/pages/items${$query}`, add);
    }
    async function del(id) {
        $items = await db.del(`/pages/items${$query}&id=${id}`);
    }

    function sortby(items) {
        return items.sort((a, b) => {
            return b.id - a.id;
        });
    }
</script>

<h1 class="flex-centered">Pages</h1>

<section class="container">
    <Table {keys} items={$items} let:item>
        <TableActions slot="actions" {actions} index={item.id} />
    </Table>
</section>

<style lang="scss"></style>
