<script>
    import { router, meta } from "tinro";
    import { routes, chistory, cmeta, cpath } from "@routes";
    import { clickout } from "@utils";
    import { DropDown, Navbar, BreadCrumbs } from "@cmp";

    let menu = false,
        user = false,
        lang = false,
        langs = ["en", "ru"],
        urlmatch = $router.url.substring(3);

    $: links = routes
        .map((link) => {
            if (link.match.includes(":")) {
                const match =
                    link.alias in $chistory
                        ? $chistory[link.alias]
                        : link.default;
                return {
                    ...link,
                    match: match,
                };
            } else return link;
        })
        .filter((link) => link.menu);

    function changeLang(item) {
        lang = !lang;
        $chistory.lang = item;
        router.goto(`/${item}${urlmatch}`);
    }
    // $: console.log($router.path.match(/^\/(.*?)\//)[1]);
</script>

<header class="navbar container p-sticky bg-gray">
    <section class="navbar-section">
        <div class="column col-auto">
            <DropDown
                bind:opener={menu}
                openbut={{ name: "", icon: "icon-apps", class: "btn-link" }}
                items={links}
                downbut={null}
                let:item
            >
                <!-- <slot name="item">
                    {(item.title = item.props.title)}
                    {(item.href = item.match)}
                </slot> -->
                <a
                    href={item.match}
                    class:active={$chistory.url === item.match}
                    on:click={() => (menu = !menu)}
                >
                    {#if item.icon}
                        <i
                            class="icon icon-{item.icon} {$chistory.url ===
                            item.match
                                ? 'text-primary'
                                : 'text-gray'}"
                        />
                    {/if}
                    {item.props.title}
                </a>
            </DropDown>
        </div>
    </section>
    <section class="navbar-center ">
        <div class="column col-auto">
            <BreadCrumbs />
        </div>
    </section>
    <section class="navbar-section ">
        <!-- <div class="column col-auto">
            
        </div> -->
        <div class="column col-auto">
            <DropDown
                bind:opener={lang}
                openbut={{
                    name: $chistory.lang,
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
                    href
                    class:active={$chistory.lang === item}
                    on:click={changeLang(item)}
                    tinro-ignore
                >
                    {item}
                </a>
            </DropDown>
            <DropDown
                bind:opener={user}
                openbut={{
                    name: "",
                    icon: "icon-people",
                    class: "btn-link s-circle",
                }}
                items={links}
                downbut={null}
                right={true}
                let:item
            >
                <a
                    href={item.match}
                    class:active={$chistory.url === item.match}
                    on:click={() => (user = !user)}
                >
                    {item.props.title}
                </a>
            </DropDown>
        </div>
    </section>
</header>

{#if $cpath.navbar}
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
