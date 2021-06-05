<script>
    import { page, authed } from "@routes";
    import { logout } from "@api/auth";
    import { Menu, Lang, User, Navbar, BreadCrumbs, Button } from "@cmp";
</script>

<header class="navbar container p-sticky bg-gray">
    <section class="navbar-section">
        <div class="column col-auto">
            {#if $authed}
                <Menu />
            {/if}
        </div>
    </section>
    <section class="navbar-center ">
        <div class="column col-auto">
            {#if $authed}
                <BreadCrumbs />
            {:else}
                <h5 class="text-primary my-1">Pg</h5>
            {/if}
        </div>
    </section>
    <section class="navbar-section ">
        <div class="column col-auto">
            {#if $authed}
                <Button
                    but={{
                        class: "btn-link s-circle float-right",
                        icon: "shutdown",
                    }}
                    on:click={logout}
                />
                <User />
            {/if}
            <Lang />
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
    }
</style>
