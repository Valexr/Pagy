<h1 class="flex-centered">Users</h1>

<section class="container">
    <Table keys="{keys}" items="{$items}" let:item>
        <!-- <figure class="avatar avatar mr-2" slot="img">
            <img src={item.flag} alt={item.name} />
        </figure> -->
        <TableActions slot="actions" actions="{actions}" index="{item.id}" />
    </Table>
</section>

<script lang="ts">
    import { query, fragment } from 'svelte-pathfinder';
    import * as db from '@api/db';
    import { items } from '@stores/store';
    import { Table, TableActions } from '@/client/components';

    const keys = ['username', 'create', 'update'],
        actions = [
            {
                class: 'btn-action tooltip',
                tooltip: 'Edit',
                icon: 'edit',
                action: (e) => edit(e),
            },
            {
                class: 'btn-action btn-link tooltip',
                tooltip: 'Copy',
                icon: 'copy',
                action: (e) => copy(e),
            },
            {
                class: 'btn-action btn-link text-error',
                icon: 'delete',
                action: (e) => del(e),
            },
        ];

    function edit(id) {
        $fragment = `#sidebarEdit-${id}`;
    }

    async function copy(id) {
        const url = `/users/items${$query}&id=${id}`;
        const add = await db.get(url);
        $items = await db.add(url, add);
    }

    async function del(id) {
        $items = await db.del(`/users/items${$query}&id=${id}`);
    }
</script>

<style lang="scss"></style>
