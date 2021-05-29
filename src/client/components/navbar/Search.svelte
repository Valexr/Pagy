<script>
    import { query } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import { DropDown } from "@cmp";

    // let myQuery = '',prevParams = null,prevMyQuery = '';

    // $: {
    // if (prevParams !== $query.params) {
    // myQuery = Object.entries($query.params).reduce(…);
    // prevParams = $query.params;
    // }

    // if (prevMyQuery !== myQuery) {
    // $query = myQuery.split(' ').reduce(…);
    // prevMyQuery = myQuery;
    // }
    // }

    // $: qsearch = $query
    //     .slice(1)
    //     .split("&")
    //     .map((q) => {
    //         const s = q.split("=");
    //         return `${s[0]}:${s[1]}`;
    //     })
    //     .join("; ");

    // $: qs = Object.entries($query.params)
    //     .reduce((acc, [k, v], i) => [...acc, `${k}:${decodeURI(v)}`], [])
    //     .join("; ");

    function getQuery(q) {
        const qs = Object.entries(q.params)
            .reduce((a, [k, v]) => [...a, `${k}:${decodeURI(v)}`], [])
            .join("; ");
        return qs.includes("undefined") ? "" : qs;
    }

    function setQuery(e) {
        const q = e.target.value
            .split(";")
            .reduce((a, c) => [...a, c.trim().split(":").join("=")], [])
            .join("&");
        $query = q.includes("undefined") ? "" : encodeURI(`?${q}`);
    }
</script>

{#if $media.sm}
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
            placeholder="key:val,val... key:val..."
            value={getQuery($query)}
            on:change={setQuery}
        />
        <i
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
