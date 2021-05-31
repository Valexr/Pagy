<script>
    import { tick } from "svelte";
    import { page, authed } from "@routes";
    import { Menu, Lang, User, Navbar, BreadCrumbs, Button } from "@cmp";
    import { session, logout } from "@api/auth";

    function logouts() {
        logout();
        // await tick();
        session.set({ username: $session.username });
    }
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
                    on:click={logouts}
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
