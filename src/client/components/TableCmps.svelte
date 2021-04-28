<script>
    import { date } from "@utils";

    export let id;
    export let item;
    export let key;
    export let value;
    export let index;
    export let type;

    let arr = [];
    $: arr = [...arr, item];
    $: console.log(value, index, id);
</script>

{#if type == "key"}
    <b class="th">{value}</b>
{:else if key == "actions"}
    <nav class="action-buttons">
        <button
            class="btn btn-action tooltip"
            data-tooltip="Edit book"
            on:click|preventDefault
        >
            <i class="icon icon-edit" />
        </button>
        <button
            class="btn btn-link btn-action tooltip"
            data-tooltip="Copy book"
            on:click|preventDefault
        >
            <i class="icon icon-copy" />
        </button>
        <button
            class="btn btn-link btn-action text-error"
            on:click|preventDefault
        >
            <i class="icon icon-delete" />
        </button>
    </nav>
{:else if key == "create"}
    {date(value)}
{:else if key == "update"}
    {date(value)}
{:else if key == "id"}
    {index}
{:else if key == "latitude" || key == "longitude"}
    <code>{value}</code>
{:else}
    {value}
{/if}

<style lang="scss">
    .th {
        border-bottom-width: 0.1rem;
        text-transform: capitalize;
    }
    .action-buttons {
        box-sizing: border-box;
    }
</style>
