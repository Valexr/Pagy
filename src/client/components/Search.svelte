<script>
    import { query } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import { DropDown } from "@cmp";
</script>

{#if $media.xs}
    <DropDown
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
                bind:value={$query.params.q}
            />
        </slot>
    </DropDown>
{:else}
    <div class="has-icon-right">
        <input
            class="form-input"
            type="text"
            placeholder="...case insensitive"
            bind:value={$query.params.q}
        /><i
            class="form-icon icon icon-search text-{$query.params.q
                ? 'primary'
                : 'gray'}"
        />
    </div>
{/if}

<style lang="scss">
    #input-search {
        max-width: 240px;
    }
    .has-icon-right .form-input {
        &:focus + i {
            color: var(--primary-color);
        }
    }
</style>
