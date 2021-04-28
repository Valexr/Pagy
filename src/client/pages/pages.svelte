<script>
    import { onMount, onDestroy } from "svelte";
    import { router } from "tinro";
    import { slide } from "svelte/transition";
    import { date } from "@utils";
    import * as data from "@api/data";
    import { media } from "svelte-match-media";
    import { Modal } from "@cmp";
    import { items } from "@stores/store";
    import { editForm } from "@stores/pages";

    onMount(() => {
        // pages = await data.db("pages", meta.params.locale, meta.params.menu);
        // $items = pages;
    });
    // $: data.db("pages", meta.params.locale, meta.params.menu).then((res) => {
    //     $items = res;
    //     // $items = pages;
    // });

    export let meta = {};

    let addBookForm = {
        title: "",
        author: "",
        description: "",
    };

    async function addPage() {
        $items = await data.add(meta.params.menu, addBookForm);
        addtoggle();
    }
    async function copyPage(page) {
        addBookForm = await data.get(meta.params.menu, page.id);
        $items = await data.add(meta.params.menu, addBookForm);
    }
    async function editPage(page) {
        router.location.query.set("page", page.id);
        // router.location.hash.set("modal-update");
        router.location.hash.set("sidebar");
        // $editForm = await data.get(meta.params.menu, page.id);
    }
    async function updatePage() {
        router.goto($router.path);
        $items = await data.set(meta.params.menu, $editForm, editForm.id);
        updatetoggle();
    }
    async function deletePage(page) {
        $items = await data.del(meta.params.menu, page.id);
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

    // function sortby(items) {
    //     $items = items.sort((a, b) => {
    //         return b.id - a.id;
    //     });
    //     console.log("sort");
    // }

    // const sortList = (ev) => {
    //     $items = ev.detail;
    // };

    $items = data.db("pages", meta.params.locale, meta.params.menu);

    $: sub = Array.from(Array($items.length).keys());
    function openSub(i) {
        console.log(sub, i);
        sub[i] = sub[i] === i ? true : i;
    }
    let p =
        "The responsive layout also provides fixed-width containers. Use grid-xs(480px), grid-sm(600px), grid-md(840px), grid-lg(960px) or grid-xl(1280px) to the container for a fixed-width container with the specific max-width.";
</script>

<h1 class="flex-centered">Pages</h1>

{#await $items}
    <div class="docs-demo columns">
        <div class="column col-12 text-center">
            <div class="loading loading-lg" />
        </div>
    </div>
{:then items}
    <section class="container">
        <table class="table table-hover" class:table-scroll={$media.md}>
            <thead>
                <tr>
                    <th />
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Create</th>
                    <th>Update</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each items as page, i (page.id)}
                    <tr class:bg-secondary={sub[i] === true}>
                        <td>
                            <button
                                class="btn btn-link btn-action btn-sm tooltip"
                                data-tooltip="Sub set"
                                on:click={openSub(i)}
                                ><i
                                    class="icon icon-more-vert c-move"
                                /></button
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
                                class="btn btn-action tooltip"
                                class:btn-sm={$media.md}
                                data-tooltip="Edit page"
                                on:click|stopPropagation={() => editPage(page)}
                                ><i class="icon icon-edit" /></button
                            >
                            <button
                                class="btn btn-link btn-action tooltip"
                                class:btn-sm={$media.md}
                                data-tooltip="Copy page"
                                on:click={copyPage(page)}
                                ><i class="icon icon-copy" /></button
                            >
                            <button
                                class="btn btn-link btn-action text-error"
                                class:btn-sm={$media.md}
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
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </section>
{/await}

<!-- <Modal
    id="modal-add"
    opener="add"
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
    opener="update"
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
            <label class="form-label" for="newDescription"> Description </label>
            <textarea
                class="form-input"
                rows="5"
                id="newDescription"
                bind:value={$editForm.description}
                placeholder="page description"
            />
        </div>
    </form>
</Modal> -->
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
