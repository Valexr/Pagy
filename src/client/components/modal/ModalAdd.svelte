<Modal
    id="modal-add"
    size="{'modal-lg'}"
    opener="{'add'}"
    title="Add a new page"
    action="{{ title: 'Add page', do: addPage }}"
>
    <form class="form-horizontal" slot="body">
        <div class="form-group">
            <div class="col-3 col-sm-12">
                <label class="form-label" for="newTitle">Title</label>
            </div>
            <div class="col-9 col-sm-12">
                <input
                    class="form-input"
                    type="text"
                    id="newTitle"
                    bind:value="{$addBookForm.title}"
                    placeholder="page title"
                />
            </div>
        </div>
        <div class="form-group">
            <div class="col-3 col-sm-12">
                <label class="form-label" for="newAuthor">Author</label>
            </div>
            <div class="col-9 col-sm-12">
                <input
                    class="form-input"
                    type="text"
                    id="newAuthor"
                    bind:value="{$addBookForm.author}"
                    placeholder="page author"
                />
            </div>
        </div>
        <div class="form-group">
            <div class="col-3 col-sm-12">
                <label class="form-label" for="newDescription">Description </label>
            </div>
            <div class="col-9 col-sm-12">
                <textarea
                    class="form-input"
                    rows="5"
                    id="newDescription"
                    bind:value="{$addBookForm.description}"
                    placeholder="page description"></textarea>
            </div>
        </div>
    </form>
</Modal>

<script lang="ts">
    import { onMount } from 'svelte';
    import { Modal } from '@cmp';
    import { addopen, addBookForm } from '@stores/pages';
    import { items } from '@stores/store';
    import * as db from '@api/db';
    import { query } from 'svelte-pathfinder';

    onMount(() => ($addBookForm = {}));

    async function addPage() {
        $items = await db.add('items', $addBookForm, $query);
        $addopen = !$addopen;
    }
</script>
