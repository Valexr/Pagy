<script>
    import { fade } from "svelte/transition";
    import { router } from "tinro";
    import { cmeta, cpath, chistory } from "@routes";
    import { items, filters } from "@stores/store";
    import { addopen } from "@stores/pages";
    import { DropDown } from "@cmp";
    import { media } from "svelte-match-media";

    let addLocale = {
            action: () => console.log("addLocale"),
            title: "Locale",
        },
        addMenu = { action: () => console.log("addMenu"), title: "Menu" },
        addRole = { action: () => console.log("addRole"), title: "Role" },
        localesOpen = false,
        menusOpen = false,
        searchOpen = false,
        regionsOpen = false;

    let addBookForm = {
        title: "",
        author: "",
        description: "",
    };

    function addtoggle() {
        initForm();
        // router.location.hash.set("modal-add");
        router.goto(`${$router.url}#modal-add`);
        // addopen = !addopen;
    }

    function initForm() {
        addBookForm.title = "";
        addBookForm.author = "";
        addBookForm.description = "";
    }
    // let roles = Object.entries($filters)[0];
    // $: console.log($filters, $chistory);
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
                    downbut={addMenu}
                    let:item
                >
                    <a
                        href={`${$router.path}?region=${item}`}
                        class:active={item === $router.query.region}
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
    </section>
    <section class="navbar-center ">
        <div class="column col-auto">
            <button
                class="btn btn-primary badge"
                class:btn-action={$media.xs}
                data-badge={$items.length}
                on:click|stopPropagation={addtoggle}
                ><i class="icon icon-plus" />
                <span class="text-capitalize hide-xs"
                    >{$cpath.alias.slice(0, -1)}</span
                >
            </button>
        </div>
    </section>
    <section class="navbar-section ">
        <div
            class="column"
            class:col-auto={(!$media.md && !$media.sm) || $media.xs}
        >
            {#if $media.xs}
                <DropDown
                    opener={searchOpen}
                    openbut={{
                        name: "",
                        icon: "icon-search",
                        class: "btn-primary btn-action",
                    }}
                    right="true"
                    downbut={null}
                    list={false}
                >
                    <slot slot="static">
                        <input
                            id="input-search"
                            type="text"
                            class="form-input"
                            placeholder="..."
                        />
                    </slot>
                    <!-- <a
                    href={`/pages/${$cmeta.params.locale}/${item}`}
                    class:active={item === $cmeta.params.menu}
                >
                    {item}
                    <button
                        class="btn btn-link btn-sm p-relative float-right sm-acts"
                        on:click|preventDefault|stopPropagation
                    >
                        <i class="icon icon-edit" />
                    </button>
                </a> -->
                </DropDown>
            {:else}
                <div class="input-group float-right">
                    <input
                        id="input-search"
                        type="text"
                        class="form-input"
                        placeholder="..."
                    />
                    <button class="btn btn-primary btn-action input-group-btn"
                        ><i class="icon icon-search" /></button
                    >
                </div>
            {/if}
        </div>
    </section>
</nav>

<style lang="scss">
    .navbar {
        z-index: 99;
        height: 4em;
        top: 0;
    }
    #input-search {
        max-width: 240px;
    }
</style>
