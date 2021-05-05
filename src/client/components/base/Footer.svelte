<script>
    import { router, meta } from "tinro";
    import { routes, chistory, cmeta, cpath } from "@routes";
    import { t } from "svelte-intl-precompile";
    import slugify from "@sindresorhus/slugify";

    const log = {
        router: $router,
        cmeta: $cmeta,
        cpath: $cpath,
        chistory: $chistory,
    };

    let logopen = true;

    $: console.log(log);
</script>

<footer class="container navbar p-fixed bg-gray p-2">
    {#if logopen}
        <pre
            class="code hide-xs"
            data-lang="JSON">
            <code>router: {JSON.stringify($router, 0, 2)}</code>
            <code>cpath: {JSON.stringify($cpath, 0, 2)}</code>
            <code>cmeta: {JSON.stringify($cmeta, 0, 2)}</code>
            <code>chistory: {JSON.stringify($chistory, 0, 2)}</code>
    </pre>
    {/if}
    <section class="navbar-section">
        <div class="column col-auto">
            <button
                class="btn btn-action btn-sm"
                on:click={() => (logopen = !logopen)}
            >
                <i class="icon icon-arrow-{logopen ? 'down' : 'up'}" />
            </button>
        </div>
    </section>
    <section class="navbar-center">
        <div class="column col-auto">
            <copy>&copy; {new Date().getFullYear()}</copy>
            {$t("footer")}
            {$t("menu")}
            {slugify($t("time", { values: { time: 123 } }))}
        </div>
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
