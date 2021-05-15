<script>
    import { onMount } from "svelte";
    import { routes, history } from "@routes";
    import { navbar } from "@stores/store";
    import Sortable from "sortablejs";
    let pagelist = {},
        pagelist1 = {},
        options = {
            fallbackOnBody: true,
            invertSwap: true,
            sort: true,
            animation: 200,
            group: {
                name: "shared",
                // pull: "clone",
                // revertClone: true,
            },
        };
    onMount(() => {
        var els = document.querySelectorAll(".nav");
        els.forEach((el) => Sortable.create(el, options));
        // Sortable.create(pagelist, options);
        // Sortable.create(pagelist1, options);
        // $navbar = false;
    });

    let locales = ["ru", "en", "fr", "de"],
        menus = ["header", "main", "footer"];

    async function changeLocale(locale) {
        $history.locale = locale;
        pages = await data.db("pages", $history.locale, $history.menu);
    }
    async function changeMenu(menu) {
        $history.menu = menu;
        pages = await data.get($history.menu);
    }
</script>

<section class="container">
    <h1 class="text-center">Plugins</h1>

    <div class="docs-demo columns">
        <div class="column">
            <div class="off-canvas off-canvas-sidebar-show">
                <a
                    class="off-canvas-toggle btn btn-primary btn-action"
                    href="#sidebar-demo"><i class="icon icon-menu" /></a
                >
                <div class="off-canvas-sidebar container" id="sidebar-demo">
                    <div class="columns">
                        <div class="column col-auto">
                            <div class="dropdown">
                                <button
                                    class="btn btn-link dropdown-toggle text-uppercase"
                                    tabindex="0"
                                >
                                    {$history.locale}<i
                                        class="icon icon-caret"
                                    />
                                </button>
                                <ul class="menu">
                                    {#each locales as locale}
                                        <li class="menu-item">
                                            <a
                                                href={`/pages/${locale}/${$history.menu}`}
                                                on:click={() =>
                                                    changeLocale(locale)}
                                                class:active={locale ===
                                                    $history.locale}
                                            >
                                                {locale.toUpperCase()}
                                                <button
                                                    on:click|stopPropagation|preventDefault
                                                    class="btn btn-action btn-sm p-relative float-right sm-acts"
                                                >
                                                    <i class="icon icon-edit" />
                                                </button>
                                            </a>
                                        </li>
                                    {/each}
                                    <li class="divider" />
                                    <li class="menu-item">
                                        <button
                                            class="btn btn-primary btn-block text-light"
                                        >
                                            <i class="icon icon-plus" /> Locale
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="column col-auto">
                            <div class="dropdown">
                                <button
                                    class="btn btn-link dropdown-toggle text-capitalize"
                                    tabindex="0"
                                    >{$history.menu}<i
                                        class="icon icon-caret"
                                    /></button
                                >
                                <ul class="menu">
                                    {#each menus as menu}
                                        <li class="menu-item  text-capitalize">
                                            <a
                                                href={`/pages/${$history.locale}/${menu}`}
                                                on:click={() =>
                                                    changeMenu(menu)}
                                                class:active={menu ===
                                                    $history.menu}
                                                >{menu}
                                                <button
                                                    on:click|stopPropagation|preventDefault
                                                    class="btn btn-action btn-sm p-relative float-right sm-acts"
                                                    ><i
                                                        class="icon icon-edit"
                                                    /></button
                                                ></a
                                            >
                                        </li>
                                    {/each}
                                    <li class="divider" />
                                    <li class="menu-item">
                                        <button
                                            class="btn btn-primary btn-block text-light"
                                            ><i class="icon icon-plus" /> Menu</button
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul id="pagelist" class="nav" bind:this={pagelist}>
                        <li class="nav-item">
                            <a href="/#">Elements</a>
                        </li>
                        <li class="nav-item active">
                            <a href="/#">Layout</a>
                            <ul class="nav" bind:this={pagelist1}>
                                <li class="nav-item">
                                    <a href="/#">Flexbox grid</a>
                                </li>
                                <li class="nav-item">
                                    <a href="/#">Responsive</a>
                                </li>
                                <li class="nav-item">
                                    <a href="/#">Navbar</a>
                                </li>
                                <li class="nav-item">
                                    <a href="/#">Empty states</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="/#">Components</a>
                        </li>
                        <li class="nav-item">
                            <a href="/#">Utilities</a>
                        </li>
                    </ul>
                </div>
                <a class="off-canvas-overlay" href="#close"> &nbsp;</a>
                <div class="off-canvas-content">
                    <div class="content">
                        <h4>Lorem ipsum</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Praesent risus leo, dictum in vehicula sit
                            amet, feugiat tempus tellus. Duis quis sodales
                            risus. Etiam euismod ornare consequat.
                        </p>
                        <p>
                            Climb leg rub face on everything give attitude nap
                            all day for under the bed. Chase mice attack feet
                            but rub face on everything hopped up on goofballs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .off-canvas-sidebar {
        width: 15rem;
    }
</style>
