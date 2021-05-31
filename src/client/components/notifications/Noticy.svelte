<script>
    import { flip } from "svelte/animate";
    import { fly, fade } from "svelte/transition";
    import { noticy } from "./noticy.js";

    let timered = [];

    function checkTimeout(notice) {
        if (notice.timeout > 0) timered = [...timered, notice.id];
    }
</script>

<section class="noticy container p-absolute" on:click={() => noticy.clear()}>
    {#each $noticy as notice (notice.id)}
        <div
            animate:flip
            style={notice.timeout && `--timeout: ${notice.timeout}ms`}
            class:timeout={timered.includes(notice.id)}
            class="toast {!notice.type.default
                ? `toast-${notice.type}`
                : ''} my-1"
            on:introstart={checkTimeout(notice)}
            in:fly={{ y: -48 }}
            out:fade
        >
            {#if notice.close}
                <button
                    class="btn btn-clear float-right c-hand"
                    on:click|stopPropagation={noticy.close(notice.id)}
                />
            {/if}
            {#if notice.title}<h6>{notice.title}</h6>{/if}
            <p>{notice.message}</p>
            {#if notice.icon}<i class={notice.icon} />{/if}
        </div>
    {/each}
</section>

<style lang="scss">
    .noticy {
        z-index: 99;
        top: 3.45em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .toast {
        max-width: 300px;
        position: relative;
        &::after {
            content: "";
            display: flex;
            opacity: 0.69;
            position: absolute;
            left: -1px;
            right: -1px;
            bottom: -1px;
            height: 4.5px;
            transform: scaleX(1);
            transition: transform var(--timeout);
        }
        &.timeout::after {
            background: #fff;
            transform: scaleX(0);
            transform-origin: bottom right;
        }
        p {
            white-space: pre-line;
        }
    }
</style>
