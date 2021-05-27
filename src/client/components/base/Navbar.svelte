<script>
    import { fade } from "svelte/transition";
    import { path, query } from "svelte-pathfinder";
    import { filters, items } from "@stores/store";
    import { DropDown, Search, Add, Filters } from "@cmp";
    import { media } from "svelte-match-media";

    $: downbut = {
        role: { action: () => console.log("addRole"), title: "Role" },
        menu: { action: () => console.log("addMenu"), title: "Menu" },
        locale: { action: () => console.log("addLocale"), title: "Locale" },
    };

    $: filterLink = (key, val, item, query) => {
        function qpath() {
            const path = Object.entries($filters).map(([k, v], i) => {
                return key === k ? `${k}=${item}` : `${k}=${qsub(k, v)}`;
            });
            return path.join("&");
        }
        function qsub(k, v) {
            // if (query[k] !== v) query[k] = v;
            return Object.values(query).filter((q) => v.some((v) => v === q));
        }
        return `${$path}?${qpath()}`;
    };
</script>

<nav class="navbar container p-sticky bg-light" in:fade={{ duration: 500 }}>
    <section class="navbar-section ">
        <div class="column col-auto">
            <Filters />
        </div>
        <!-- {#each Object.entries($filters) as [k, v]}
            <div class="column col-auto">
                <DropDown
                    openbut={{
                        name: $query.params[k] ? $query.params[k] : k,
                    }}
                    items={v}
                    downbut={downbut[k]}
                    auto
                    let:item
                >
                    <a
                        href={filterLink(k, v, item, $query.params)}
                        class="no-wrap"
                        class:active={item === $query.params[k]}
                        on:click={() => ($query.params[k] = item)}
                    >
                        {item}
                    </a>
                </DropDown>
            </div>
        {/each} -->
    </section>
    <section class="navbar-center ">
        <div class="column col-auto">
            <Add />
        </div>
    </section>
    <section class="navbar-section ">
        <div
            class="column"
            class:col-12={(!$media.md && !$media.sm) || $media.xs}
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
        .no-wrap {
            white-space: nowrap;
        }
    }
</style>
