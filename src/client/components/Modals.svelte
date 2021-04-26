<script>
    import { cmeta } from "@routes";
    import { Modal } from "@cmp";
    import { addopen, addBookForm } from "@stores/pages";
    import { items } from "@stores/store";

    async function addPage() {
        $items = await data.add($cmeta.params.menu, $addBookForm);
        $addopen = !$addopen;
    }
</script>

<Modal
    id="modal-add"
    bind:opener={$addopen}
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
                bind:value={$addBookForm.title}
                placeholder="page title"
            />
        </div>
        <div class="form-group">
            <label class="form-label" for="newAuthor">Author</label>
            <input
                class="form-input"
                type="text"
                id="newAuthor"
                bind:value={$addBookForm.author}
                placeholder="page author"
            />
        </div>
        <div class="form-group">
            <label class="form-label" for="newDescription">Description </label>
            <textarea
                class="form-input"
                rows="5"
                id="newDescription"
                bind:value={$addBookForm.description}
                placeholder="page description"
            />
        </div>
    </form>
</Modal>
