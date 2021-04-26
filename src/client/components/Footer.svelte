<script>
    import { router, meta } from "tinro";
    import { routes, chistory, cmeta, cpath } from "@routes";

    const log = {
        router: $router,
        cmeta: $cmeta,
        cpath: $cpath,
        chistory: $chistory,
    };
    $: console.log(log);
</script>

<footer class="container navbar p-fixed bg-gray">
    <pre
        class="code hide-xs"
        data-lang="JSON">
            <code>router: {JSON.stringify($router, 0, 2)}</code>
            <code>cpath: {JSON.stringify($cpath, 0, 2)}</code>
            <code>cmeta: {JSON.stringify($cmeta, 0, 2)}</code>
            <code>chistory: {JSON.stringify($chistory, 0, 2)}</code>
    </pre>
    <section class="navbar-section" />
    <section class="navbar-center">
        <copy>&copy; {new Date().getFullYear()}</copy>
    </section>
    <section class="navbar-section" />
</footer>

<style lang="scss">
    :global(body#xs) {
        color: red;
        // footer {
        //     height: 2.5rem;
        // }
    }
    footer {
        z-index: 100;
        bottom: 0;
        // height: 2.5rem;

        pre {
            display: flex;
            justify-content: space-around;
            position: absolute;
            top: auto;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
        }
    }
</style>
