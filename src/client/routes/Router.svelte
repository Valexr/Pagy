<script>
    import { url, path, query, pattern, click, goto } from "svelte-pathfinder";
    import Viewpoint from "svelte-viewpoint";
    import { page, authed, history, Transition } from "@routes";
    import { items, filters } from "@stores/store";
    import * as db from "@api/db";
    import Auth from "@pages/auth.svelte";
    import { Loader } from "@cmp";
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

    async function getData(query, page) {
        try {
            const data = await db.get(
                `/${page.alias}/items${query.split("&id")[0]}`
            );
            $items = data.items;
            $filters = data.filters;
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    // $: async () => await getData($query, $page);

    $: !$authed && goto(`/auth`);

    $: if (!$pattern("/:lang/*")) $path = `/${$history.lang + $path}`;

    $: if ($page && $history) $history[$page.alias] = $url;
</script>

<svelte:window on:click={click} />

{#if !$authed}<Auth />{:else}
    {#await $page.component()}
        <Loader />
    {:then Cmp}
        {#await getData($query, $page)}
            <Loader />
        {:then data}
            <Transition>
                <svelte:component this={Cmp.default} {data} />
            </Transition>
        {/await}
    {/await}
    <!-- <Viewpoint
            delay={0}
            timeout={500}
            {...$page}
            query={$query}
            path={$path}
            res={getData($query, $page)}
        >
            <Loader slot="loading" />
            <Loader slot="waiting" />
        </Viewpoint> -->
{/if}

<style lang="scss"></style>
