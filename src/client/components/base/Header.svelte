<script>
    import { router, meta } from "tinro";
    import { routes, chistory, cmeta, cpath } from "@routes";
    import { clickout } from "@utils";
    import { DropDown, Navbar, BreadCrumbs } from "@cmp";

    let menu = false,
        user = false;

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
</script>

<header class="navbar container p-sticky p-2 bg-gray">
    <section class="navbar-section">
        <div class="column col-auto">
            <DropDown
                bind:opener={menu}
                openbut={{ name: "", icon: "icon-apps" }}
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
                    class:active={$router.path === item.match}
                    on:click={() => (menu = !menu)}
                >
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
        <div class="column col-auto">
            <DropDown
                bind:opener={user}
                openbut={{
                    name: "",
                    icon: "icon-people",
                    class: "btn-action s-circle badge",
                    badge: "8",
                }}
                items={links}
                downbut={null}
                right={true}
                let:item
            >
                <a
                    href={item.match}
                    class:active={$router.path === item.match}
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
        top: -4em;
        .menu {
            .menu-item a {
                text-transform: capitalize;
            }
        }
    }
</style>
