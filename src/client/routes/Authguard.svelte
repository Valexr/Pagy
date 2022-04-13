{#if $session.store.refresh_token && $session.store.refresh_token !== 'undefined'}
    <slot />
{:else}
    <slot name="unauthed" />
{/if}

<script lang="ts">
    import { session } from '@api/auth';
</script>
