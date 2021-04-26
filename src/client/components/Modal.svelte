<script>
    import { onMount } from "svelte";
    import { router } from "tinro";

    export let id = "modal",
        size = "",
        opener = "",
        title = "Title",
        action = {
            title: "Action",
            do: "",
        },
        cancel = {
            title: "Cancel",
            do: "",
        };

    const close = () => {
        // router.location.hash.clear();
        // router.location.query.clear();
        router.goto($router.path);
    };
</script>

<div
    class="modal {size} {`modal-${opener}`}"
    class:active={$router.hash === `modal-${opener}`}
>
    <a href={$router.path} class="modal-overlay" aria-label="Close">&nbsp;</a>
    <div class="modal-container">
        <div class="modal-header">
            <slot name="header">
                <button
                    class="btn btn-clear float-right"
                    aria-label="Close"
                    on:click={close}
                />
                <div class="modal-title h5">{title}</div>
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
                    on:click={action.do}>{action.title}</button
                >
                <button class="btn btn-link" on:click={close}
                    >{cancel.title}</button
                >
            </slot>
        </div>
    </div>
</div>
