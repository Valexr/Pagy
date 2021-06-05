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
    import { items, filters } from "@stores/store";
    import * as db from "@api/db";
    import { logout, session, cookie } from "@api/auth";
    import { Loader } from "@cmp";

    $: console.log($authed, $session, $state);

    $: getSession();

    beforeUpdate(() => {
        if (!$pattern("/:lang/*")) {
            path.set(`/${$history.lang}${$path}`);
        }
    });

    $: if ($page) {
        $history = { ...$history, prev: $url, [$page.alias]: $url };
        if ($authed && $pattern("/:lang/auth"))
            redirect($state.prev || $history.users);
    }

    async function getSession() {
        const auth = () =>
            !$pattern("/:lang/auth") &&
            redirect(`/auth`, { prev: $history.prev });
        try {
            const user = await cookie();
            if (user && user.userid) {
                session.set(user);
                state.set(user);
            } else auth();
        } catch (err) {
            console.log(err);
            auth();
        }
    }

    async function getData(query, page) {
        console.log(page.alias);
        if (query.length > 0)
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

<style lang="scss"></style>
