<!-- <script context="module">
    import * as db from "@api/db";

    export async function preload({ alias, query, res }) {
        // const data = await db.get(`/${alias}/items${query.split("&id")[0]}`);
        const data = await res;
        return { data };
    }
</script> -->
<script>
    import { onMount } from "svelte";
    import { media } from "svelte-match-media";
    import { items, filters } from "@stores/store";
    import { query, fragment } from "svelte-pathfinder";

    export let data;
    console.log(data);
    // $items = data.items;
    // $filters = data.filters;

    function edit(id) {
        // $query.params.id = locale.id;
        $fragment = `#sidebarEdit-${id}`;
    }
</script>

<h1 class="flex-centered">Locales</h1>
<section class="container">
    <table
        class="table table-striped table-hover"
        class:table-scroll={$media.md}
    >
        <thead>
            <tr>
                <th />
                <th>Id</th>
                <th>Region</th>
                <th>Subegion</th>
                <th>Flag</th>
                <th>Name</th>
                <th>Capital</th>
                <th>languages</th>
                <th>alpha2Code</th>
                <!-- <th>callingCodes</th> -->
                <th width="140">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each $items as locale, i (locale.id)}
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
                    <td contenteditable="true" bind:textContent={locale.region}>
                        {locale.region}
                    </td>
                    <td>
                        {locale.subregion}
                    </td>
                    <td>
                        <figure class="avatar avatar mr-2">
                            <img src={locale.flag} alt={locale.name} />
                        </figure>
                    </td>
                    <td>
                        {locale.name}
                    </td>
                    <td>{locale.capital}</td>
                    <td>
                        {#each locale.languages
                            .map((l) => l.name)
                            .join(", ") as lang}
                            {lang}
                        {/each}
                    </td>
                    <td>{locale.alpha2Code}</td>
                    <!-- <td>{locale.callingCodes}</td> -->
                    <td>
                        <button
                            class="btn btn-action tooltip"
                            data-tooltip="Edit"
                            on:click|stopPropagation={edit(locale.id)}
                        >
                            <i class="icon icon-edit" />
                        </button>
                        <button
                            class="btn btn-link btn-action tooltip"
                            data-tooltip="Copy"
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
</section>

<style lang="scss">
    .avatar img {
        object-fit: cover;
    }
</style>
