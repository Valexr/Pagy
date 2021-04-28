<script>
    import { onDestroy, onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { router } from "tinro";
    import { clickout } from "@utils";
    import { cmeta } from "@routes";
    // import { editForm } from "@stores/pages";
    import { items } from "@stores/store";
    import * as data from "@api/data";

    let aside = null,
        form = null,
        right = true,
        editForm = {
            id: "",
            title: "",
            author: "",
            description: "",
        },
        isOpen = false,
        width = null;

    // onMount(() => getPage());

    const close = () => router.goto($router.path);

    async function getPage() {
        editForm = await data.get($cmeta.params.menu, $router.query.page);
    }

    async function updatePage() {
        close();
        $items = await data.set($cmeta.params.menu, editForm, editForm.id);
    }
    $: if (aside && editForm) width = aside.offsetWidth;
    // $: isOpen && getPage();
    $: console.log(editForm, $cmeta, width);
</script>

<aside
    class="container p-fixed"
    transition:fly|local={{
        delay: 0,
        duration: 500,
        x: right ? 480 : -480,
        y: 0,
        opacity: 1,
        easing: quintOut,
    }}
    on:introend={() => (isOpen = true)}
    bind:this={aside}
    use:clickout={aside}
    on:clickout={close}
    style={right ? "right: 0" : ""}
>
    {#await getPage()}
        <div class="docs-demo columns">
            <div class="column col-12 text-center">
                <div class="loading loading-lg" />
            </div>
        </div>
    {:then}
        <div class="columns">
            <div class="column col-12">
                <h3>{editForm.title}</h3>
                <button
                    class="btn btn-clear"
                    aria-label="Close"
                    id="close"
                    on:click={close}
                />
            </div>
            <div class="column col-12">
                <details class="accordion" open>
                    <summary class="accordion-header">
                        <i class="icon icon-arrow-right mr-1" />
                        Title
                    </summary>
                    <div class="accordion-body">
                        <!-- Accordions content -->
                        <form
                            class="form-horizontal"
                            on:submit|preventDefault={updatePage}
                            bind:this={form}
                        >
                            <!-- {#if editForm.title} -->
                            <div class="form-group">
                                <label class="form-label" for="newTitle"
                                    >Title</label
                                >
                                <input
                                    class="form-input"
                                    type="text"
                                    id="newTitle"
                                    bind:value={editForm.title}
                                    placeholder="page title"
                                />
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="newAuthor"
                                    >Author</label
                                >
                                <input
                                    class="form-input"
                                    type="text"
                                    id="newAuthor"
                                    bind:value={editForm.author}
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
                                    bind:value={editForm.description}
                                    placeholder="page description"
                                />
                            </div>
                            <div class="form-group">
                                <select class="form-select">
                                    <option>Choose an option</option>
                                    <option>Slack</option>
                                    <option>Skype</option>
                                    <option>Hipchat</option>
                                </select>
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
                                <button
                                    class="btn btn-link"
                                    on:click|preventDefault={close}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </details>
            </div>
        </div>
    {/await}
</aside>
<div class="aside-backdrop" transition:fade />

<style lang="scss">
    aside {
        top: 0;
        bottom: 0;
        width: auto;
        max-width: 480px;
        z-index: 400;
        box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
        background: white;
        overflow-y: auto;
        padding: 1.6rem 3.2rem;
        button#close {
            position: absolute;
            top: 1.6rem;
            right: 1.6rem;
        }
    }
    .aside-backdrop {
        background: rgba(247, 248, 249, 0.75);
        bottom: 0;
        cursor: default;
        display: block;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 300;
    }
</style>
