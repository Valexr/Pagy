<script>
    import { beforeUpdate } from "svelte";
    import {
        url,
        path,
        query,
        pattern,
        click,
        redirect,
        state,
    } from "svelte-pathfinder";
    import { page, authed, history, Transition } from "@routes";
    import { logout, session, cookie } from "@api/auth";
    import { items, filters } from "@stores/store";
    import * as db from "@api/db";
    import { Loader } from "@cmp";

    $: console.log($authed, $session, $state);

    beforeUpdate(() => {
        setLang();
        setHistory();
        setRedirect();
    });

    function setLang() {
        !$pattern("/:lang/*") && path.set(`/${$history.lang}${$path}`);
    }

    function setHistory() {
        // if ($page.alias !== "404")
        $history = { ...$history, [$page.alias]: $url.substring(3) };
    }

    function setRedirect() {
        if ($authed) {
            $pattern("/:lang/auth") && redirect($history.users);
            $path.length <= 4 && redirect("/home");
        }
    }

    async function getSession() {
        const auth = () => !$pattern("/:lang/auth") && redirect(`/auth`);
        const users = () =>
            ($pattern("/:lang/auth") || $path.length <= 4) &&
            redirect($history.users);
        if (!$session.userid) {
            try {
                const user = await cookie();
                if (user && user.userid) {
                    session.set(user);
                    users();
                    return user;
                } else auth();
            } catch (err) {
                console.log(err);
                auth();
            }
        }
    }

    async function getData(query, page) {
        console.log(page.alias);
        // if (query.length > 0)
        if (page.alias !== "auth" && page.alias !== "404")
            try {
                const path = `/${page.alias}/items${query.split("&id")[0]}`;
                const data = await db.get(path);
                if (data.status === 400) {
                    await logout();
                } else {
                    $items = Array.isArray(data) ? data : data.items;
                    $filters = Array.isArray(data)
                        ? await db.get(`/${page.alias}/filters`)
                        : data.filters;
                    return data;
                }
            } catch (err) {
                console.log(err);
            }
    }
</script>

<svelte:window on:click={click} on:beforeunload={!$session.maxAge && logout} />

{#await getSession() then session}
    {#await getData($query, $page)}
        <Loader />
    {:then data}
        {#await $page.component() then { default: Route }}
            <Transition>
                <Route {data} {session} />
                <!-- <svelte:component this={Route.default} {data} {session} /> -->
            </Transition>
        {/await}
    {/await}
{/await}

<style lang="scss"></style>
