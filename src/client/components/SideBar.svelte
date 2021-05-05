<script>
    import { onDestroy, onMount, tick } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { router } from "tinro";
    import { clickout } from "@utils";
    import { cmeta, chistory } from "@routes";
    // import { editForm } from "@stores/pages";
    import { items } from "@stores/store";
    import * as pages from "@api/pages";

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
        width = 0;

    const close = () =>
        router.goto($router.from ? $router.from : $router.url.split("&id")[0]);

    async function getPage() {
        await tick();
        editForm = await pages.get("items", $chistory.query);
    }

    async function updatePage() {
        $items = await pages.set("items", editForm, $chistory.query);
        close();
    }
    // $: if (aside && isOpen) width = aside.clientWidth;
    // $: isOpen && getPage();
    $: console.log(editForm, $cmeta, width);
</script>

<aside
    class="container p-fixed"
    transition:fly={{
        delay: 0,
        duration: 500,
        x: right ? 480 : -480,
        y: 0,
        opacity: 1,
        easing: quintOut,
    }}
    on:introend={() => (isOpen = true)}
    on:outrostart={() => (isOpen = false)}
    bind:this={aside}
    use:clickout={aside}
    on:clickout={close}
    class:right
    style="width: {isOpen ? aside.clientWidth : ''}px;"
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
                <div class="accordion">
                    <input
                        type="checkbox"
                        id="accordion-1"
                        name="accordion-checkbox"
                        hidden
                        checked
                    />
                    <label class="accordion-header" for="accordion-1">
                        <i class="icon icon-arrow-right mr-1" />
                        Title
                    </label>
                    <div class="accordion-body column">
                        <!-- Accordions content -->
                        <form
                            class="form"
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
                            <!-- form select control -->
                            <div class="form-group">
                                <select class="form-select">
                                    <option>Choose an option</option>
                                    <option>Slack</option>
                                    <option>Skype</option>
                                    <option>Hipchat</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-select" multiple>
                                    <option>Choose an option</option>
                                    <option>Slack</option>
                                    <option>Skype</option>
                                    <option>Hipchat</option>
                                </select>
                            </div>
                            <!-- form radio control -->
                            <div class="form-group">
                                <legend class="form-label">Gender</legend>
                                <label class="form-radio">
                                    <input type="radio" name="gender" checked />
                                    <i class="form-icon" /> Male
                                </label>
                                <label class="form-radio">
                                    <input type="radio" name="gender" />
                                    <i class="form-icon" /> Female
                                </label>
                            </div>
                            <!-- form switch control -->
                            <div class="form-group">
                                <label class="form-switch">
                                    <input type="checkbox" />
                                    <i class="form-icon" /> Send me emails with news
                                    and tips
                                </label>
                            </div>
                            <!-- form checkbox control -->
                            <div class="form-group">
                                <label class="form-checkbox">
                                    <input type="checkbox" />
                                    <i class="form-icon" /> Remember me
                                </label>
                            </div>
                            <div class="form-group">
                                <button
                                    class="btn btn-primary"
                                    aria-keyshortcuts="Enter"
                                    type="submit"
                                    on:click|preventDefault={updatePage}
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
                </div>
                <details class="accordion" open>
                    <summary class="accordion-header">
                        <i class="icon icon-arrow-right mr-1" />
                        Title
                    </summary>
                    <div class="accordion-body">
                        <pre
                            class="code"
                            data-lang="JSON">
                            <code>{JSON.stringify(editForm, 0, 2)}</code>
                        </pre>
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
        padding: 1.6rem;
        button#close {
            position: absolute;
            top: 1.6rem;
            right: 1.6rem;
        }
        &.right {
            right: 0;
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
