<script>
    import { onMount } from "svelte";
    import * as db from "@api/db";

    let keys, langs;
    onMount(async () => {
        langs = await db.get("/translation/all");
        console.log(langs);
    });
</script>

<h1 class="flex-centered">Translation</h1>

<section class="container">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>num</th>
                <th>key</th>
                <th>translation</th>
            </tr>
        </thead>
        <tbody>
            {#await db.get("/translation/en") then lang}
                {#each Object.entries(lang) as [k, v], i}
                    <tr>
                        <td>{i}</td>
                        <td>{k}</td>
                        <td>{v}</td>
                    </tr>
                {/each}
            {/await}
        </tbody>
    </table>
</section>
