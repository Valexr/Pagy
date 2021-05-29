<script>
    export let actions = [],
        index = 0;
</script>

{#each actions as item}
    <button
        class="btn {item.class}"
        data-tooltip={item.tooltip}
        on:click|stopPropagation={item.action(index)}
    >
        {#if item.icon}
            <i class="icon icon-{item.icon}" />
        {:else if item.name}
            {item.name}
        {/if}
    </button>
{/each}
