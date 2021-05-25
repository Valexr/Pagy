<script>
    import { url, path, query, pattern, click, goto } from "svelte-pathfinder";
    import Viewpoint from "svelte-viewpoint";
    import { page, authed, history, Transition } from "@routes";
    import { items, filters } from "@stores/store";
    import * as db from "@api/db";
    import Auth from "@pages/auth.svelte";
    import {
        init,
        register,
        addMessages,
        getLocaleFromPathname,
        getLocaleFromNavigator,
    } from "svelte-intl-precompile";
    import en from "@lang/en.json";
    import ru from "@lang/ru.json";

    $: if ($page) {
        addMessages("en", en);
        addMessages("ru", ru);
        init({
            fallbackLocale: "en",
            initialLocale: $history.lang,
        });
        // async function registerLang(lang) {
        //     await register("en", () => import("@lang/en.json"));
        //     await register("ru", () => import("@lang/ru.json"));
        //     init({
        //         fallbackLocale: "en",
        //         initialLocale: lang,
        //     });
        // }
        // registerLang($history.lang);
    }

    // async function getData(query, page) {
    //     // $items = db.get(`/users/items${$query.split("&id")[0]}`);
    //     // $filters = await db.get("/users/filters");
    //     const res = await db.get(
    //         `/${page.alias}/items${query.split("&id")[0]}`
    //     );
    //     console.log(res);
    //     $items = res.items;
    //     $filters = res.filters;
    //     const all = await db.get("/users/all");
    //     console.log(all);
    // }

    // $: $page && getData($query, $page);

    $: !$authed && goto(`/auth`);

    $: if (!$pattern("/:lang/*")) $path = `/${$history.lang + $path}`;

    $: if ($page && $history) $history[$page.alias] = $url;
</script>

<svelte:window on:click={click} />

<Transition>
    {#if !$authed}<Auth />{:else}
        <Viewpoint
            delay={500}
            timeout={500}
            {...$page}
            query={$query}
            path={$path}
        >
            <svelte:fragment slot="loading">
                <div class="columns">
                    <div class="column col-12 text-center">
                        <div class="loading loading-lg" />
                    </div>
                </div>
            </svelte:fragment>
        </Viewpoint>
    {/if}
</Transition>

<style lang="scss"></style>
