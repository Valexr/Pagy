<script>
    import { router } from "tinro";
    import { media } from "svelte-match-media";
    import { DropDown } from "@cmp";

    let searchOpen = false;

    $: sq = $router.query.sq && decodeURI($router.query.sq);

    async function searchQuery(e) {
        router.location.query.set("sq", e.target.value);
        // const itms = await $items
        // if (e.target.blur()) router.location.query.set("sq", "");
        // $items.filter((i) => i.title.includes(e.target.value));
    }
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
                placeholder="...case sensitive"
                on:input={searchQuery}
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
            placeholder="...case sensitive"
            on:input={searchQuery}
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
    #input-search {
        max-width: 240px;
    }
    .has-icon-right .form-input {
        &:focus + i {
            color: blue;
        }
    }
</style>
