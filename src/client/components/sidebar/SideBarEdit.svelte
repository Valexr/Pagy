<script>
    import { onDestroy, onMount, tick } from "svelte";
    import { fade } from "svelte/transition";
    import { query, fragment } from "svelte-pathfinder";
    import { page } from "@routes";
    import { items } from "@stores/store";
    import * as db from "@api/db";
    import { SideBar, Code, Form } from "@cmp";

    let editForm = { title: "" },
        atab = Code,
        tabs = [
            { name: "JSON", comp: Code },
            { name: "Form", comp: Form },
        ];

    $: id = $fragment.split("-")[1];

    async function getForm(items) {
        // await tick();
        // await db.get(
        //     `/${$page.alias}/items${$query}#sidebarEdit-1620236307611`
        // );
        editForm = await items.find((i) => i.id === +id);
    }

    async function updatePage() {
        $items = await db.set(`/pages/items${$query}&id=${id}`, editForm);
        $fragment = "";
    }
</script>

<SideBar right="true" data={getForm($items)}>
    {#if editForm}
        <div class="columns">
            <div class="column col-12">
                <h3>{Object.values(editForm)[0]}</h3>
            </div>
            <div class="column col-12">
                <ul class="tab tab-block">
                    {#each tabs as tab}
                        <li class="tab-item" class:active={atab == tab.comp}>
                            <a
                                href="#_"
                                on:click|preventDefault={() =>
                                    (atab = tab.comp)}
                            >
                                {tab.name}
                            </a>
                        </li>
                    {/each}
                </ul>
                {#key atab}
                    <div in:fade>
                        <svelte:component this={atab} data={editForm} />
                    </div>
                {/key}
                <!-- <div class="accordion">
                    <input
                        type="checkbox"
                        id="accordion-1"
                        name="accordion-checkbox"
                        hidden
                    />
                    <label class="accordion-header" for="accordion-1">
                        <i class="icon icon-arrow-right mr-1" />
                        Title
                    </label>
                    <div class="accordion-body column">
                        <form
                            class="form"
                            on:submit|preventDefault={updatePage}
                        >
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
                                <select class="form-select" multiple>
                                    <option>Choose an option</option>
                                    <option>Slack</option>
                                    <option>Skype</option>
                                    <option>Hipchat</option>
                                </select>
                            </div>
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
                            <div class="form-group">
                                <label class="form-switch">
                                    <input type="checkbox" />
                                    <i class="form-icon" /> Send me emails with news
                                    and tips
                                </label>
                            </div>
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
                                    on:click|preventDefault={() =>
                                        ($fragment = "")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div> -->
                <!-- <details class="accordion" open>
                    <summary class="accordion-header">
                        <i class="icon icon-arrow-right mr-1" />
                        Title
                    </summary>
                    <div class="accordion-body">
                    </div>
                </details> -->
            </div>
        </div>
    {/if}
</SideBar>

<style lang="scss">
    // .accordion .accordion-body {
    //     overflow: auto;
    // }
</style>
