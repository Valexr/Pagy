<script>
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
    import { DropDown } from "@cmp";

    let searchOpen = false;

    $: sq = $query.params.sq ? decodeURI($query.params.sq) : "";

    async function searchQuery(e) {}
</script>

{#if $media.xs}
    <DropDown
        opener={searchOpen}
        openbut={{
            name: "",
            icon: "icon-search",
            class: "btn-primary btn-action",
        }}
        right="true"
        downbut={null}
        list={false}
    >
        <slot slot="static">
            <input
                id="input-search"
                type="text"
                class="form-input"
                placeholder="...case insensitive"
                on:input={searchQuery}
                bind:value={$query.params.sq}
            />
        </slot>
        <!-- <a
                    href={`/pages/${$cmeta.params.locale}/${item}`}
                    class:active={item === $cmeta.params.menu}
                >
                    {item}
                    <button
                        class="btn btn-link btn-sm p-relative float-right sm-acts"
                        on:click|preventDefault|stopPropagation
                    >
                        <i class="icon icon-edit" />
                    </button>
                </a> -->
    </DropDown>
{:else}
    <div class="has-icon-right">
        <input
            class="form-input"
            type="text"
            placeholder="...case insensitive"
            on:change={searchQuery}
            bind:value={$query.params.sq}
        /><i
            class:text-primary={sq}
            class:text-gray={!sq}
            class="form-icon icon icon-search"
        />
    </div>
    <!-- <div class="input-group float-right">
                    <input
                        id="input-search"
                        type="text"
                        class="form-input"
                        placeholder="...case sensitive"
                        bind:value={sq}
                        on:input={searchQuery}
                    />
                    <button class="btn btn-primary btn-action input-group-btn"
                        ><i class="icon icon-search" /></button
                    >
                </div> -->
{/if}

<style lang="scss">
    // .sq {
    //     color: var(--primary-color);
    // }
    #input-search {
        max-width: 240px;
    }
    .has-icon-right .form-input {
        &:focus + i {
            color: var(--primary-color);
        }
    }
</style>
