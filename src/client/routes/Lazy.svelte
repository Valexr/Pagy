<script>
	export let component;
</script>

{#await component.then ? component : component()}
	Loading component...
{:then Cmp}
	<svelte:component this={Cmp.default} />
{/await}
