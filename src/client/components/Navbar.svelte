<script>
    import { fade } from "svelte/transition";
    import { router } from "tinro";
    import { cmeta, cpath } from "@routes";
    import { items } from "@stores/store";
    import { addopen } from "@stores/pages";
    import { DropDown } from "@cmp";
    import { media } from "svelte-match-media";

    let locales = ["ru", "en", "fr", "de"],
        addLocale = {
            action: () => console.log("addLocale"),
            title: "Locale",
        },
        menus = ["header", "main", "footer"],
        addMenu = { action: () => console.log("addMenu"), title: "Menu" },
        localesOpen = false,
        menusOpen = false,
        searchOpen = false;

    let addBookForm = {
        title: "",
        author: "",
        description: "",
    };

    function addtoggle() {
        initForm();
        router.location.hash.set("modal-add");
        // addopen = !addopen;
    }

    function initForm() {
        addBookForm.title = "";
        addBookForm.author = "";
        addBookForm.description = "";
    }
</script>

<nav class="navbar container p-sticky p-2" in:fade={{ duration: 500 }}>
    <section class="navbar-section ">
        {#if $cmeta.params.locale}
            <div class="column col-auto">
                <DropDown
                    opener={localesOpen}
                    openbut={{ name: $cmeta.params.locale.toUpperCase() }}
                    items={locales}
                    downbut={addLocale}
                    let:item
                >
                    <a
                        href={`/pages/${item}/${$cmeta.params.menu}`}
                        class:active={item === $cmeta.params.locale}
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
        <div class="column col-auto">
            <DropDown
                opener={menusOpen}
                openbut={{ name: $cmeta.params.menu }}
                items={menus}
                downbut={addMenu}
                let:item
            >
                <a
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
                </a>
            </DropDown>
        </div>
    </section>
    <section class="navbar-center ">
        <div class="column col-auto">
            <button
                class="btn btn-primary btn-lg badge"
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
                    <button class="btn btn-primary input-group-btn"
                        ><i class="icon icon-search" /></button
                    >
                </div>
            {/if}
        </div>
    </section>
</nav>

<style lang="scss">
    @import "../../../node_modules/spectre.css/src/variables";
    .navbar {
        z-index: 99;
        height: 4.5em;
        // position: fixed;
        top: 0;
        background: $light-color;
    }
    #input-search {
        max-width: 240px;
    }
</style>
