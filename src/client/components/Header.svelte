<script>
    import { active } from "tinro";
    import { routes } from "@routes";
</script>

<header class="navbar container p-sticky">
    <section class="navbar-section">
        <button class="btn btn-primary">Add Book</button>
    </section>
    <section class="navbar-center">
        <h1>Pagy</h1>
    </section>
    <section class="navbar-section">
        <nav class="btn-group btn-group-block">
            {#each routes.filter((route) => route.menu) as route}
                <a class="btn" href={route.match} use:active exact
                    >{route.props.title}</a
                >
            {/each}
        </nav>
    </section>
</header>

<style lang="scss"></style>
