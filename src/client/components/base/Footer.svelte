<script>
    import { slide } from "svelte/transition";
    import {
        url,
        path,
        pattern,
        query,
        fragment,
        click,
        state,
    } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import { t } from "svelte-intl-precompile";
    import slugify from "@sindresorhus/slugify";
    import { history, page } from "@routes";
    import { session } from "@api/auth";

    $: log = {
        url: $url,
        path: $path,
        query: $query,
        fragment: $fragment,
        session: $session,
    };

    let logopen = true;

    // $: console.dir(log);
</script>

<footer class="container navbar p-fixed p-2">
    <section class="navbar-section">
        <div class="column col-auto">
            <button
                class="btn btn-sm"
                class:bg-dark={$media.dark}
                class:text-gray={$media.dark}
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
        </div>
    </section>
    <section class="navbar-section" />
    {#if logopen}
        <pre
            transition:slide
            class="code hide-xs"
            class:bg-dark={$media.dark}
            class:text-gray={$media.dark}
            data-lang="JSON">
            <code class:bg-dark={$media.dark}>routing: {JSON.stringify(log, 0, 2)}</code>
            <code class:bg-dark={$media.dark}>page: {JSON.stringify($page, 0, 2)}</code>
            <!-- <code>query: {JSON.stringify($query, 0, 2)}</code> -->
            <code class:bg-dark={$media.dark}>history: {JSON.stringify($history, 0, 2)}</code>
        </pre>
    {/if}
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
