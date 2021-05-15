<script>
    import { tick } from "svelte";
    import {
        url,
        path,
        pattern,
        query,
        fragment,
        click,
        state,
    } from "svelte-pathfinder";
    import { page, routes, history, authed } from "@routes";
    import { DropDown, Navbar, BreadCrumbs, Button } from "@cmp";
    import { session } from "@api/auth";

    let menu = false,
        user = false,
        lang = false,
        langs = ["en", "ru"];

    // $: links = routes
    //     .map((link) => {
    //         if (link.match.includes(":")) {
    //             const match =
    //                 link.alias in $history
    //                     ? $history[link.alias]
    //                     : link.default;
    //             return {
    //                 ...link,
    //                 match: match,
    //             };
    //         } else return link;
    //     })
    //     .filter((link) => link.menu);

    function changeLang(item) {
        lang = !lang;
        $history.lang = item;
        $path.params.lang = item;
    }
</script>

<header class="navbar container p-sticky bg-gray">
    <section class="navbar-section">
        <div class="column col-auto">
            {#if $authed}
                <DropDown
                    bind:opener={menu}
                    openbut={{ name: "", icon: "icon-apps", class: "btn-link" }}
                    items={$routes.filter((r) => r.menu)}
                    downbut={null}
                    let:item
                >
                    <a
                        href={$history[item.alias] || item.default}
                        class="columns"
                        class:active={$pattern(item.match)}
                        on:click={() => tick().then(() => (menu = !menu))}
                    >
                        {#if item.icon}
                            <i
                                class="
                                menu-icon 
                                icon 
                                icon-{item.icon} 
                                {$pattern(item.match)
                                    ? 'text-primary'
                                    : 'text-gray'}
                                "
                            />
                        {/if}
                        <span class="px-1">{item.props.title}</span>
                    </a>
                </DropDown>
            {/if}
        </div>
    </section>
    <section class="navbar-center ">
        <div class="column col-auto">
            {#if $authed}
                <BreadCrumbs />
            {:else}
                Pagy
            {/if}
        </div>
    </section>
    <section class="navbar-section ">
        <div class="column col-auto">
            <DropDown
                bind:opener={lang}
                openbut={{
                    name: $history.lang,
                    icon: "icon-location",
                    class: "btn-link",
                }}
                items={langs}
                downbut={null}
                right={true}
                auto={true}
                let:item
            >
                <a
                    href={`/${item}${$url.substring(3)}`}
                    class:active={$history.lang === item}
                    on:click={changeLang(item)}
                >
                    {item}
                </a>
            </DropDown>
            {#if $authed}
                <Button
                    but={{ class: "btn-link s-circle", icon: "shutdown" }}
                    on:click={session.set({ username: $session.username })}
                />
                <!-- <DropDown
                bind:opener={user}
                openbut={{
                    name: "",
                    icon: "icon-people",
                    class: "btn-link s-circle",
                }}
                downbut={{
                    action: () => ($session = { username: $session.username }),
                    title: "Logout",
                    icon: "shutdown",
                }}
                right={true}
                let:item
            >
                <slot slot="static">
                    <a
                        href
                        class="btn btn-link"
                        on:click={() => (user = !user)}
                    >
                        {$session.username}
                    </a>
                </slot>
            </DropDown> -->
            {/if}
        </div>
    </section>
</header>

{#if $page.navbar}
    <Navbar />
{/if}

<style lang="scss">
    header {
        z-index: 100;
        top: -3em;
        .menu {
            .menu-item a {
                text-transform: capitalize;
            }
        }
    }
</style>
