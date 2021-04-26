<script context="module">
    export async function preload({ router, meta }) {
        let db = router.path.split("/").filter(Boolean)[0];
        pages = await data.db(db, meta.params.locale, meta.params.menu);
        return { pages, router, meta };
    }
</script>

<script>
    import { onMount, onDestroy } from "svelte";
    import { router } from "tinro";
    import { slide } from "svelte/transition";
    import { date } from "@utils";
    import * as data from "@api/data";
    import { media } from "svelte-match-media";
    import { Modal } from "@cmp";
    import { items } from "@stores/store";

    onMount(() => ($items = pages));

    export let pages = [],
        meta = {};

    let addBookForm = {
            title: "",
            author: "",
            description: "",
        },
        editForm = {
            id: "",
            title: "",
            author: "",
            description: "",
        };

    async function addPage() {
        pages = await data.add(meta.params.menu, addBookForm);
        addtoggle();
    }
    async function copyPage(page) {
        addBookForm = await data.get(meta.params.menu, page.id);
        pages = await data.add(meta.params.menu, addBookForm);
    }
    async function editPage(page) {
        updatetoggle();
        editForm = await data.get(meta.params.menu, page.id);
        router.location.query.set("page", page.id);
    }
    async function updatePage() {
        pages = await data.set(meta.params.menu, editForm, editForm.id);
        updatetoggle();
    }
    async function deletePage(page) {
        pages = await data.del(meta.params.menu, page.id);
    }

    function initForm() {
        addBookForm.title = "";
        addBookForm.author = "";
        addBookForm.description = "";
        editForm._id = "";
        editForm.title = "";
        editForm.author = "";
        editForm.description = "";
    }
    let addopen = false,
        updateopen = false;

    function addtoggle() {
        initForm();
        addopen = !addopen;
    }

    function updatetoggle() {
        // initForm();
        updateopen = !updateopen;
    }

    function sortby(items) {
        pages = pages.sort((a, b) => {
            return b.id - a.id;
        });
        console.log("sort");
    }

    const sortList = (ev) => {
        pages = ev.detail;
    };

    $: sub = Array.from(Array(pages.length).keys());
    function openSub(i) {
        console.log(sub, i);
        sub[i] = sub[i] === i ? true : i;
    }
    let p =
        "The responsive layout also provides fixed-width containers. Use grid-xs(480px), grid-sm(600px), grid-md(840px), grid-lg(960px) or grid-xl(1280px) to the container for a fixed-width container with the specific max-width.";
</script>

<section class="container">
    <table class="table table-hover" class:table-scroll={$media.md}>
        <thead>
            <tr>
                <th />
                <th on:click={sortby}>Id</th>
                <th on:click={sortby}>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Create</th>
                <th>Update</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each pages as page, i (page.id)}
                <tr class:bg-secondary={sub[i] === true}>
                    <td>
                        <button
                            class="btn btn-link btn-action btn-sm tooltip"
                            data-tooltip="Sub set"
                            on:click={openSub(i)}
                            ><i class="icon icon-more-vert c-move" /></button
                        >
                    </td>
                    <td>{i}</td>
                    <td>{page.title}</td>
                    <td>{page.author}</td>
                    <td>{page.description}</td>
                    <td>{date(page.create)}</td>
                    <td>{date(page.update)}</td>
                    <td>
                        <button
                            class="btn btn-action  btn-sm tooltip"
                            data-tooltip="Edit page"
                            on:click={editPage(page)}
                            tinro-ignore><i class="icon icon-edit" /></button
                        >
                        <button
                            class="btn btn-link btn-action btn-sm tooltip"
                            data-tooltip="Copy page"
                            on:click={copyPage(page)}
                            ><i class="icon icon-copy" /></button
                        >
                        <button
                            class="btn btn-link btn-action btn-sm text-error"
                            on:click={deletePage(page)}
                            ><i class="icon icon-delete" /></button
                        >
                    </td>
                </tr>
                {#if sub[i] === true}
                    <tr
                        transition:slide
                        class="sub bg-gray"
                        class:sub-open={sub[i] === true}
                    >
                        <td colspan="8">
                            <div class="columns">
                                <div class="column col-5">
                                    <p>
                                        {p}
                                    </p>
                                </div>
                                <div class="column col-2">
                                    <img
                                        src="/favicon.png"
                                        alt="favicon"
                                        width="100px"
                                    />
                                </div>
                                <div class="column col-5">
                                    <p>
                                        {p}
                                    </p>
                                </div>
                            </div>
                            <!-- <Cards /> -->
                        </td>
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</section>

<Modal
    id="modal-add"
    bind:opener={addopen}
    title="Add a new page"
    action={{ title: "Add page", do: addPage }}
>
    <form class="form-horizontal" slot="body">
        <div class="form-group">
            <label class="form-label" for="newTitle">Title</label>
            <input
                class="form-input"
                type="text"
                id="newTitle"
                bind:value={addBookForm.title}
                placeholder="page title"
            />
        </div>
        <div class="form-group">
            <label class="form-label" for="newAuthor">Author</label>
            <input
                class="form-input"
                type="text"
                id="newAuthor"
                bind:value={addBookForm.author}
                placeholder="page author"
            />
        </div>
        <div class="form-group">
            <label class="form-label" for="newDescription"> Description </label>
            <textarea
                class="form-input"
                rows="5"
                id="newDescription"
                bind:value={addBookForm.description}
                placeholder="page description"
            />
        </div>
    </form>
</Modal>

<Modal
    id="modal-update"
    bind:opener={updateopen}
    title="Update page"
    action={{ title: "Update", do: updatePage }}
>
    <form
        class="form-horizontal"
        slot="body"
        on:submit|preventDefault={updatePage}
    >
        <div class="form-group">
            <label class="form-label" for="newTitle">Title</label>
            <input
                class="form-input"
                type="text"
                id="newTitle"
                bind:value={editForm.title}
                placeholder="page title"
            />
        </div>
        <div class="form-group">
            <label class="form-label" for="newAuthor">Author</label>
            <input
                class="form-input"
                type="text"
                id="newAuthor"
                bind:value={editForm.author}
                placeholder="page author"
            />
        </div>
        <div class="form-group">
            <label class="form-label" for="newDescription"> Description </label>
            <textarea
                class="form-input"
                rows="5"
                id="newDescription"
                bind:value={editForm.description}
                placeholder="page description"
            />
        </div>
    </form>
</Modal>

<style lang="scss">
    @import "../../../node_modules/spectre.css/src/variables";
    .sub {
        height: 0;
        transition: height 500ms ease 500ms;
        // display: none;
        &.sub-open {
            height: 300px;
            // display: table-row;
        }
    }
</style>
