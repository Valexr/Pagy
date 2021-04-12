<script>
    import { onMount } from "svelte";

    let books = [],
        addBookForm = {
            title: "",
            author: "",
            description: "",
        },
        editForm = {
            _id: "",
            title: "",
            author: "",
            description: "",
        },
        type = "all";

    $: console.log(books);
    onMount(() => getAll("*"));

    async function getAll(type) {
        books = await fetch(`/api/${type}`).then((res) => res.json());
    }

    function addBook() {
        const payload = {
            title: addBookForm.title,
            author: addBookForm.author,
            description: addBookForm.description,
        };
        const path = "/api/book:";
        fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(() => {
                getAll("*");
            })
            .catch((error) => {
                console.log(error);
                getAll("*");
            });
    }

    async function editBook(book) {
        // editForm = book;
        editForm = await fetch(`/api/books/${book._id}`).then((res) =>
            res.json()
        );
        updatetoggle();
    }

    function updateBook() {
        const payload = {
            title: editForm.title,
            author: editForm.author,
            description: editForm.description,
        };
        const path = `/api/books/${editForm._id}`;
        fetch(path, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(() => {
                getAll("*");
            })
            .catch((error) => {
                console.error(error);
                getAll("*");
            });
        updatetoggle();
    }

    async function copyBook(book) {
        addBookForm = await fetch(`/api/books/${book._id}`).then((res) =>
            res.json()
        );
        addBook();
    }

    function removeBook(bookID) {
        const path = `/api/books/${bookID._id}`;
        fetch(path, {
            method: "DELETE",
            // headers: {
            // 	"Content-Type": "application/json",
            // },
            // body: JSON.stringify(payload),
        })
            // axios
            // .delete(path)
            .then(() => {
                getAll("*");
            })
            .catch((error) => {
                console.error(error);
                getAll("*");
            });
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
        books = books.sort((a, b) => {
            return b._id - a._id;
        });
        console.log("sort");
    }
</script>

<header class="navbar container p-sticky">
    <section class="navbar-section">
        <button class="btn btn-primary" on:click={addtoggle}>Add Book</button>
    </section>
    <section class="navbar-center">
        <h1>Pagy</h1>
    </section>
    <section class="navbar-section">
        <nav class="btn-group btn-group-block">
            <button
                class="btn"
                class:btn-primary={type === "all"}
                on:click={() => (getAll("*"), (type = "all"))}>All</button
            >
            <button
                class="btn"
                class:btn-primary={type === "book"}
                on:click={() => (getAll("book*"), (type = "book"))}
                >Books</button
            >
            <button
                class="btn"
                class:btn-primary={type === "user"}
                on:click={() => (getAll("user*"), (type = "user"))}>User</button
            >
            <button
                class="btn"
                class:btn-primary={type === "role"}
                on:click={() => (getAll("role*"), (type = "role"))}>Role</button
            >
        </nav>
    </section>
</header>

<main class="container">
    <section class="column col-12">
        <table class="table table-hover table-scroll">
            <thead>
                <tr>
                    <th />
                    <th on:click={sortby}>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Create</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each books as book (book._id)}
                    <tr>
                        <td><i class="icon icon-more-vert c-move" /></td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                        <td>{new Date(book.create).toLocaleString()}</td>
                        <td>
                            <button
                                class="btn btn-primary btn-action tooltip"
                                data-tooltip="Edit book"
                                on:click={editBook(book)}
                                ><i class="icon icon-edit" /></button
                            >
                            <button
                                class="btn btn-action tooltip"
                                data-tooltip="Copy book"
                                on:click={copyBook(book)}
                                ><i class="icon icon-copy" /></button
                            >
                            <button
                                class="btn btn-link text-error"
                                on:click={removeBook(book)}
                                ><i class="icon icon-delete" /></button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </section>
</main>

<div class="modal" class:active={addopen} id="modal-add">
    <div class="modal-overlay" aria-label="Close" on:click={addtoggle} />
    <div class="modal-container">
        <div class="modal-header">
            <button
                class="btn btn-clear float-right"
                aria-label="Close"
                on:click={addtoggle}
            />
            <div class="modal-title h5">Add a new book</div>
        </div>
        <div class="modal-body">
            <div class="content">
                <div class="form-group">
                    <label class="form-label" for="newTitle">Title</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newTitle"
                        bind:value={addBookForm.title}
                        placeholder="book title"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="newAuthor">Author</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newAuthor"
                        bind:value={addBookForm.author}
                        placeholder="book author"
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
                        bind:value={addBookForm.description}
                        placeholder="book description"
                    />
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button
                class="btn btn-primary"
                on:click={() => (addBook(), addtoggle())}>Add book</button
            >
            <button class="btn btn-link" on:click={addtoggle}>Cancel</button>
        </div>
    </div>
</div>
<div class="modal" class:active={updateopen} id="modal-update">
    <div class="modal-overlay" aria-label="Close" on:click={updatetoggle} />
    <div class="modal-container">
        <div class="modal-header">
            <button
                class="btn btn-clear float-right"
                aria-label="Close"
                on:click={updatetoggle}
            />
            <div class="modal-title h5">Update book</div>
        </div>
        <div class="modal-body">
            <div class="content">
                <div class="form-group">
                    <label class="form-label" for="newTitle">Title</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newTitle"
                        bind:value={editForm.title}
                        placeholder="book title"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="newAuthor">Author</label>
                    <input
                        class="form-input"
                        type="text"
                        id="newAuthor"
                        bind:value={editForm.author}
                        placeholder="book author"
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
                        placeholder="book description"
                    />
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" on:click={updateBook}>Update</button
            >
            <button class="btn btn-link" on:click={updatetoggle}>Cancel</button>
        </div>
    </div>
</div>

<style lang="scss" global>
    @import "./global.scss";
</style>
