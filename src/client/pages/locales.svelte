<script>
    import { onMount } from "svelte";
    import { media } from "svelte-match-media";
    import { date } from "@utils";
    import * as data from "@api/data";
    import * as locales from "@api/locales";
    import { items, filters } from "@stores/store";
    import { chistory } from "@routes";
    import { router } from "tinro";

    async function get() {
        $items = await locales.get("locales", $chistory.query.split("&id")[0]);
        $filters = await locales.get("filters");
    }
    $: get($router.query);

    // let locales = [];

    // onMount(async () => (locales = await data.db("locales", "locales")));

    // function sortby() {
    //     $items = locales.sort((a, b) => a.region - b.region);
    //     // console.log("sort");
    // }

    // $: console.log([
    //     ...new Set(
    //         locales.map((l) => l.subregion).filter(Boolean)
    //         // .flat()
    //         // .sort()
    //     ),
    // ]);
</script>

{#await $items}
    <!-- Loading locales... -->
    <div class="docs-demo columns">
        <div class="column col-12 text-center">
            <div class="loading loading-lg" />
        </div>
    </div>
{:then items}
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
                    <th>Flag</th>
                    <th>Name</th>
                    <!-- <th>Languages</th> -->
                    <th>alpha2Code</th>
                    <th>callingCodes</th>
                    <th width="140">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each items as locale, i}
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
                        <td
                            contenteditable="true"
                            bind:textContent={locale.region}
                        >
                            {locale.region}
                        </td>
                        <td>
                            <figure class="avatar avatar mr-2">
                                <img src={locale.flag} alt={locale.name} />
                            </figure>
                        </td>
                        <td>
                            {locale.name}
                        </td>
                        <!-- <td>
                            {#each locale.languages
                                .map((l) => l.name)
                                .join(", ") as lang}
                                {lang}
                            {/each}
                        </td> -->
                        <td>{locale.alpha2Code}</td>
                        <td>{locale.callingCodes}</td>
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
    </section>
    <!-- <svelte:component this={Cmp.default} router={$router} meta={$cmeta} /> -->
{/await}
