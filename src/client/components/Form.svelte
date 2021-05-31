<script>
    let editForm, updatePage;
</script>

<form class="form" on:submit|preventDefault>
    <div class="form-group">
        <label class="form-label" for="newTitle">Title</label>
        <input
            class="form-input"
            type="text"
            id="newTitle"
            bind:value={editForm}
            placeholder="page title"
        />
    </div>
    <div class="form-group">
        <label class="form-label" for="newAuthor">Author</label>
        <input
            class="form-input"
            type="text"
            id="newAuthor"
            bind:value={editForm}
            placeholder="page author"
        />
    </div>
    <div class="form-group">
        <label class="form-label" for="newDescription"> Description </label>
        <textarea
            class="form-input"
            rows="5"
            id="newDescription"
            bind:value={editForm}
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
            <i class="form-icon" /> Send me emails with news and tips
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
            on:click|preventDefault
        >
            Update
        </button>
        <button class="btn btn-link" on:click|preventDefault> Cancel </button>
    </div>
</form>

<style lang="scss"></style>
