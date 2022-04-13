<ul class="breadcrumb">
    <li class="breadcrumb-item">
        <a href="/"> <i class="icon icon-home"></i></a>
    </li>
    {#each crumbs as link}
        <li class="breadcrumb-item">
            <a href="/{link}">{link}</a>
        </li>
    {/each}
</ul>

<script lang="ts">
    import { url, path, pattern, query, fragment, click, state, back } from 'svelte-pathfinder';

    export let crumbs = [];
    $: crumbs = $path.split('/').filter(Boolean);
    // $: console.log(crumbs);
</script>

<style lang="scss">
    @import '../../sass/spectre/variables';
    .breadcrumb {
        list-style: none;
        margin: $unit-1 0;
        padding: $unit-1 0;

        .breadcrumb-item {
            color: $gray-color-dark;
            display: inline-block;
            margin: 0;
            padding: $unit-1 0;

            &:not(:last-child) {
                margin-right: $unit-1;
                a {
                    color: $gray-color-dark;
                }
            }

            &:not(:first-child) {
                &::before {
                    color: $gray-color-dark;
                    content: '/';
                    padding-right: $unit-2;
                }
            }
        }
    }
</style>
