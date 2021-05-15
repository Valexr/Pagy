<script>
    import { flip } from "svelte/animate";
    import { fly, fade } from "svelte/transition";
    import { noticy } from "./noticy.js";

    // $: console.log($noticy);
</script>

<section class="noticy container p-absolute" on:click={() => noticy.clear()}>
    {#each $noticy as notice (notice.id)}
        <div
            animate:flip
            class="toast {!notice.type.default
                ? `toast-${notice.type}`
                : ''} my-1"
            in:fly={{ y: -48 }}
            out:fade
        >
            {#if notice.close}
                <button
                    class="btn btn-clear float-right c-hand"
                    on:click={(e) => noticy.close(notice.id)}
                />
            {/if}
            {#if notice.title}<h6>{notice.title}</h6>{/if}
            <p>{notice.message}</p>
            {#if notice.icon}<i class={notice.icon} />{/if}
        </div>
    {/each}
</section>

<style>
    .noticy {
        /* position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0;*/
        z-index: 99;
        top: 3.45em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .toast {
        max-width: 300px;
    }
</style>
