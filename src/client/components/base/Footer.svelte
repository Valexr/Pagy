<footer class="container navbar p-fixed p-2">
    <section class="navbar-section">
        <div class="column col-auto">
            <button class="btn btn-sm" on:click="{() => (logopen = !logopen)}">
                <i class="icon icon-arrow-{logopen ? 'down' : 'up'}"></i>
            </button>
        </div>
    </section>
    <section class="navbar-center">
        <div class="column col-auto">
            <copy>&copy; {new Date().getFullYear()}</copy>
            {$t('footer')}
        </div>
    </section>
    <section class="navbar-section"></section>
    {#if logopen}
        <pre transition:slide class="code hide-xs" data-lang="JSON">
            <code>routing: {JSON.stringify(log, 0, 2)}</code>
            <code>page: {JSON.stringify($page, 0, 2)}</code>
            <!-- <code>query: {JSON.stringify($query, 0, 2)}</code> -->
            <code>history: {JSON.stringify($history, 0, 2)}</code>
        </pre>
    {/if}
</footer>

<script lang="ts">
    import { slide } from 'svelte/transition';
    import { url, path, pattern, query, fragment, click, state } from 'svelte-pathfinder';
    import { media } from '@stores/media';
    import { t } from 'svelte-intl-precompile';
    import slugify from '@sindresorhus/slugify';
    import { history, page } from '@routes';
    import { session } from '@api/auth';

    $: log = {
        url: $url,
        path: $path,
        query: $query,
        fragment: $fragment,
        session: $session,
    };

    let logopen = false;

    // $: console.dir(log);
</script>

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
