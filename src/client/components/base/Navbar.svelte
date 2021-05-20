<script>
    import { fade } from "svelte/transition";
    import { path, query } from "svelte-pathfinder";
    import { filters } from "@stores/store";
    import { DropDown, Search, Add } from "@cmp";
    import { media } from "svelte-match-media";

    let addLocale = { action: () => console.log("addLocale"), title: "Locale" },
        addMenu = { action: () => console.log("addMenu"), title: "Menu" },
        addRole = { action: () => console.log("addRole"), title: "Role" };
</script>

<nav class="navbar container p-sticky bg-light" in:fade={{ duration: 500 }}>
    <section class="navbar-section ">
        {#if $query.params.role}
            <div class="column col-auto">
                <DropDown
                    openbut={{ name: $query.params.role }}
                    items={$filters.role}
                    downbut={addRole}
                    let:item
                >
                    <a
                        href={`${$path}?role=${item}`}
                        class:active={item === $query.params.role}
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
        {#if $query.params.locale}
            <div class="column col-auto">
                <DropDown
                    openbut={{ name: $query.params.locale.toUpperCase() }}
                    items={$filters.locale}
                    downbut={addLocale}
                    let:item
                >
                    <a
                        href={`${$path}?locale=${item}&menu=${$query.params.menu}`}
                        class:active={item === $query.params.locale}
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
        {#if $query.params.menu}
            <div class="column col-auto">
                <DropDown
                    openbut={{ name: $query.params.menu }}
                    items={$filters.menu}
                    downbut={addMenu}
                    let:item
                >
                    <a
                        href={`${$path}?locale=${$query.params.locale}&menu=${item}`}
                        class:active={item === $query.params.menu}
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
        {#if $query.params.region}
            <div class="column col-auto">
                <DropDown
                    openbut={{ name: $query.params.region }}
                    items={$filters.region}
                    downbut={false}
                    auto
                    let:item
                >
                    <a
                        href={`${$path}?region=${item}`}
                        class:active={item === $query.params.region}
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
