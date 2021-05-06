<script>
    import { fade } from "svelte/transition";
    import { router } from "tinro";
    import { cmeta, cpath, chistory } from "@routes";
    import { items, filters } from "@stores/store";
    import { addopen } from "@stores/pages";
    import { DropDown, Search, Add } from "@cmp";
    import { media } from "svelte-match-media";

    let addLocale = {
            action: () => console.log("addLocale"),
            title: "Locale",
        },
        addMenu = { action: () => console.log("addMenu"), title: "Menu" },
        addRole = { action: () => console.log("addRole"), title: "Role" },
        localesOpen = false,
        menusOpen = false,
        regionsOpen = false;

    $: console.log($items);
</script>

<nav class="navbar container p-sticky bg-light" in:fade={{ duration: 500 }}>
    <section class="navbar-section ">
        {#if $router.query.role}
            <div class="column col-auto">
                <DropDown
                    opener={localesOpen}
                    openbut={{ name: $router.query.role }}
                    items={$filters.role}
                    downbut={addRole}
                    let:item
                >
                    <a
                        href={`${$router.path}?role=${item}`}
                        class:active={item === $router.query.role}
                    >
                        {item}
                        <button
                            class="btn btn-link btn-sm p-relative float-right sm-acts"
                            on:click|preventDefault|stopPropagation
                        >
                            <i class="icon icon-edit" />
                        </button>
                    </a>
                </DropDown>
            </div>
        {/if}
        {#if $router.query.locale}
            <div class="column col-auto">
                <DropDown
                    opener={localesOpen}
                    openbut={{ name: $router.query.locale.toUpperCase() }}
                    items={$filters.locale}
                    downbut={addLocale}
                    let:item
                >
                    <a
                        href={`${$router.path}?locale=${item}&menu=${$router.query.menu}`}
                        class:active={item === $router.query.locale}
                    >
                        {item.toUpperCase()}
                        <button
                            class="btn btn-link btn-sm p-relative float-right sm-acts"
                            on:click|preventDefault|stopPropagation
                        >
                            <i class="icon icon-edit" />
                        </button>
                    </a>
                </DropDown>
            </div>
        {/if}
        {#if $router.query.menu}
            <div class="column col-auto">
                <DropDown
                    opener={menusOpen}
                    openbut={{ name: $router.query.menu }}
                    items={$filters.menu}
                    downbut={addMenu}
                    let:item
                >
                    <a
                        href={`${$router.path}?locale=${$router.query.locale}&menu=${item}`}
                        class:active={item === $router.query.menu}
                    >
                        {item}
                        <button
                            class="btn btn-link btn-sm p-relative float-right sm-acts"
                            on:click|preventDefault|stopPropagation
                        >
                            <i class="icon icon-edit" />
                        </button>
                    </a>
                </DropDown>
            </div>
        {/if}
        {#if $router.query.region}
            <div class="column col-auto">
                <DropDown
                    opener={regionsOpen}
                    openbut={{ name: $router.query.region }}
                    items={$filters.region}
                    downbut={false}
                    auto
                    let:item
                >
                    <a
                        href={`${$router.path}?region=${item}`}
                        class:active={item === $router.query.region}
                    >
                        {item}
                        <!-- <button
                            class="btn btn-link btn-sm p-relative float-right sm-acts"
                            on:click|preventDefault|stopPropagation
                        >
                            <i class="icon icon-edit" />
                        </button> -->
                    </a>
                </DropDown>
            </div>
        {/if}
    </section>
    <section class="navbar-center ">
        <div class="column col-auto">
            <Add />
        </div>
    </section>
    <section class="navbar-section ">
        <div
            class="column"
            class:col-auto={(!$media.md && !$media.sm) || $media.xs}
        >
            <Search />
        </div>
    </section>
</nav>

<style lang="scss">
    .navbar {
        z-index: 99;
        height: 4em;
        top: 0;
    }
</style>
