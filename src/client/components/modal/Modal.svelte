<section class="modal {size} {`modal-${opener}`}" class:active="{$fragment === `#modal-${opener}`}">
    <div class="modal-overlay" aria-label="Close" on:click="{close}">&nbsp;</div>
    <div class="modal-container" bind:this="{modal}" use:clickout="{modal}" on:clickout="{close}">
        <div class="modal-header">
            <slot name="header">
                <button class="btn btn-clear float-right" aria-label="Close" on:click="{close}"></button>
                <div class="modal-title h1">{title}</div>
            </slot>
        </div>
        <div class="modal-body">
            <slot name="body" />
        </div>
        <div class="modal-footer">
            <slot name="footer">
                <button
                    class="btn btn-primary"
                    aria-keyshortcuts="Enter"
                    type="submit"
                    on:click="{() => (action.do(), close())}"
                >
                    {action.title}
                </button>
                <button class="btn btn-link" on:click="{close}">{cancel.title}</button>
            </slot>
        </div>
    </div>
</section>

<script lang="ts">
    import { onMount } from 'svelte';
    import { fragment } from 'svelte-pathfinder';
    import { clickout } from '@utils';

    export let // id = "modal",
        size = '',
        opener = '',
        title = 'Title',
        action = {
            title: 'Action',
            do: '',
        },
        cancel = {
            title: 'Cancel',
            do: '',
        },
        modal = null;

    const close = () => ($fragment = '');
</script>
