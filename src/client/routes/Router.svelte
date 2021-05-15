<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import {
        url,
        path,
        query,
        pattern,
        fragment,
        state,
        click,
        goto,
    } from "svelte-pathfinder";
    import Viewpoint from "svelte-viewpoint";
    import {
        page,
        authed,
        routes,
        history,
        Authguard,
        Transition,
    } from "@routes";
    import { session, refresh } from "@api/auth";
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

    $: if (!$authed) goto(`/auth`);

    $: if (!$path.substring(1, 4).includes("/"))
        $path = `/${$history.lang + $path}`;

    $: if ($page && $history) $history[$page.alias] = $url;

    onMount(() => {
        if (localStorage.session) {
            // console.log(localStorage.session);
            // session.update(localStorage);
            // session.save();
            // goto(`/${$history.lang}/users?role=admin`);
        }
    });

    // $: console.log(getLocaleFromPathname(/^\/(.*?)\//));
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
