{#each actions as item}
    <button class="btn {item.class}" data-tooltip="{item.tooltip}" on:click|stopPropagation="{item.action(index)}">
        {#if item.icon}
            <i class="icon icon-{item.icon}"></i>
        {:else if item.name}
            {item.name}
        {/if}
    </button>
{/each}

<script lang="ts">
    export let actions = [],
        index = 0;
</script>
