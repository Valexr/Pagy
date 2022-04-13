<h1 class="flex-centered">Locales</h1>

<section class="container">
    <Table keys="{keys}" items="{$items}" menu="{menu}" let:item>
        <figure class="avatar avatar mr-2" slot="img">
            <img src="{item.flag}" alt="{item.name}" />
        </figure>
        <TableActions slot="actions" actions="{actions}" index="{item.id}" />
    </Table>
</section>

<script lang="ts">
    import { fragment } from 'svelte-pathfinder';
    import { items } from '@stores/store';
    import { Table, TableActions } from '@cmp';

    // export let data = {};

    const keys = ['region', 'subregion', 'flag', 'name', 'capital', 'language', 'alpha2Code'],
        actions = [
            {
                class: 'btn-action tooltip',
                tooltip: 'Edit',
                action: (e) => edit(e),
                icon: 'edit',
            },
            {
                class: 'btn-action btn-link tooltip',
                tooltip: 'Copy',
                icon: 'copy',
            },
            {
                class: 'btn-action btn-link text-error',
                icon: 'delete',
            },
        ],
        menu = [
            {
                icon: 'edit',
                name: 'Edit',
                class: 'text-primary',
                action: (e) => edit(e),
            },
            {
                icon: 'copy',
                name: 'Copy',
                class: 'text-gray',
                action: (e) => console.log(e),
            },
            {
                icon: 'delete',
                name: 'Delete',
                class: 'text-error',
                action: (e) => console.log(e),
            },
        ];
    console.log($items.reduce((a, c, i) => Object.keys(c), []));

    function edit(id) {
        $fragment = `#sidebarEdit-${id}`;
    }
</script>

<style lang="scss">
    .avatar img {
        object-fit: cover;
    }
</style>
