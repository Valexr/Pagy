<script>
    export let id = "modal",
        size = "",
        opener = false,
        title = "Title",
        action = {
            title: "Action",
            do: "",
        },
        cancel = {
            title: "Cancel",
            do: "",
        };
    $: console.log("opener", opener);
</script>

<div class="modal {size}" class:active={opener} {id}>
    <div
        class="modal-overlay"
        aria-label="Close"
        on:click={() => (opener = !opener)}
    />
    <div class="modal-container">
        <div class="modal-header">
            <slot name="header">
                <button
                    class="btn btn-clear float-right"
                    aria-label="Close"
                    on:click={() => (opener = !opener)}
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
                <button class="btn btn-link" on:click={() => (opener = !opener)}
                    >{cancel.title}</button
                >
            </slot>
        </div>
    </div>
</div>
