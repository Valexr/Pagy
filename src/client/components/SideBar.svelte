<script>
    import { onDestroy } from "svelte";
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { router } from "tinro";
    import { clickout } from "@utils";
    import { cmeta } from "@routes";
    import { editForm } from "@stores/pages";
    import { items } from "@stores/store";
    import * as data from "@api/data";

    let aside = null,
        form = null,
        right = true;

    onDestroy(() => {
        console.log("onDestroy");
        // form.reset()
        $editForm = {
            id: "",
            title: "",
            author: "",
            description: "",
        };
    });

    $: console.log($editForm);

    const close = () => router.goto($router.path);

    async function updatePage() {
        close();
        $items = await data.set($cmeta.params.menu, $editForm, $editForm.id);
    }
</script>

<aside
    class="container p-fixed"
    transition:fly={{
        delay: 0,
        duration: 500,
        x: right ? aside.clientWidth : -aside.clientWidth,
        y: 0,
        opacity: 1,
        easing: quintOut,
    }}
    bind:this={aside}
    use:clickout={aside}
    on:clickout={close}
    style={right ? "right: 0" : ""}
>
    <div class="columns">
        <div class="column col-12">
            <h1>Sidebar</h1>
            <button
                class="btn btn-clear"
                aria-label="Close"
                id="close"
                on:click={close}
            />
        </div>
        <div class="column col-12">
            <form
                class="form-horizontal"
                on:submit|preventDefault={updatePage}
                bind:this={form}
            >
                <div class="form-group">
                    <label class="form-label" for="newTitle">Title</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newTitle"
                        bind:value={$editForm.title}
                        placeholder="page title"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="newAuthor">Author</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newAuthor"
                        bind:value={$editForm.author}
                        placeholder="page author"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="newDescription">
                        Description
                    </label>
                    <textarea
                        class="form-input"
                        rows="5"
                        id="newDescription"
                        bind:value={$editForm.description}
                        placeholder="page description"
                    />
                </div>
                <div class="form-group">
                    <button
                        class="btn btn-primary"
                        aria-keyshortcuts="Enter"
                        type="submit"
                        on:click={updatePage}
                    >
                        Update
                    </button>
                    <button class="btn btn-link" on:click={close}>Cancel</button
                    >
                </div>
            </form>
        </div>
    </div>
</aside>

<style lang="scss">
    aside {
        top: 0;
        bottom: 0;
        width: auto;
        max-width: 400px;
        z-index: 400;
        box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
        background: white;
        overflow-y: auto;
        padding: 1.6rem;
        button#close {
            position: absolute;
            top: 1.6rem;
            right: 1.6rem;
        }
    }
</style>
