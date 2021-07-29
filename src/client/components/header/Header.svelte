<script>
    import { page, authed } from "@routes";
    import { logout } from "@api/auth";
    import { Menu, Lang, User, Navbar, BreadCrumbs } from "@cmp";
    import { Button } from "@svectre";
</script>

<header class="navbar container p-sticky">
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
                <h5 class="text-primary my-1">Pagy</h5>
            {/if}
        </div>
    </section>
    <section class="navbar-section ">
        <div class="column col-auto">
            <Lang />
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
        height: 3em;
    }
</style>
