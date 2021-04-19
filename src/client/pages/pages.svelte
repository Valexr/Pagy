<script>
    import { onMount } from "svelte";

    let books = [],
        addBookForm = {
            title: "",
            author: "",
            description: "",
        },
        editForm = {
            id: "",
            title: "",
            author: "",
            description: "",
        },
        type = "all";

    $: console.log(books, type);
    onMount(() => getAll("books"));

    function getAll(tp) {
        fetch(`/api/${tp}`).then(async (res) => {
            books = await res.json();
            type = tp;
        });
    }

    function addBook() {
        const payload = {
            title: addBookForm.title,
            author: addBookForm.author,
            description: addBookForm.description,
        };
        const path = "/api/books";
        fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(async (res) => {
                const item = await res.json();
                books = [...books, item];
                console.log("add: ", item);
                // getAll("books")
            })
            .catch((error) => {
                console.log(error);
                getAll("books");
            });
    }

    async function copyBook(book) {
        addBookForm = await fetch(`/api/books/${book.id}`).then((res) =>
            res.json()
        );
        addBookForm && addBook();
    }

    async function editBook(book) {
        // editForm = book;
        editForm = await fetch(`/api/books/${book.id}`).then((res) =>
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
        const path = `/api/books/${editForm.id}`;
        fetch(path, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(async (res) => {
                const item = await res.json();
                const index = books.findIndex((el) => el.id === item.id);
                books[index] = item;
                console.log("update: ", item, index);
                // getAll("books");
            })
            .catch((error) => {
                console.error(error);
                getAll("books");
            });
        updatetoggle();
    }

    function removeBook(book) {
        const path = `/api/books/${book.id}`;
        fetch(path, { method: "DELETE" })
            .then(async (res) => {
                const diff = await res.json();
                const ids = diff.map((i) => i.id);
                books = books.filter((el) => !ids.includes(el.id));
                console.log("delete: ", diff, ids, books);
                // getAll("books");
            })
            .catch((error) => {
                console.error(error);
                getAll("books");
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
            return b.id - a.id;
        });
        console.log("sort");
    }

    const sortList = (ev) => {
        books = ev.detail;
    };
    let sub = false;
</script>

<header class="navbar container p-sticky">
    <section class="navbar-section">
        <button class="btn btn-primary" on:click={addtoggle}>Add Book</button>
    </section>
    <section class="navbar-center">
        <h3>{books.length} pages</h3>
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
                class:btn-primary={type === "books"}
                on:click={() => getAll("books")}>Books</button
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
            <button
                class="btn"
                class:btn-primary={type === "animal"}
                on:click={() => (getAll("animal*"), (type = "animal"))}
                >Animal</button
            >
        </nav>
    </section>
</header>

<main class="container">
    <section class="column col-12">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th />
                    <th on:click={sortby}>Id</th>
                    <th on:click={sortby}>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Create</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each books as book, i (book.id)}
                    <tr>
                        <td
                            ><button
                                class="btn btn-link btn-action tooltip"
                                data-tooltip="Sub set"
                                on:click={(e) => (sub = !sub)}
                                ><i
                                    class="icon icon-more-vert c-move"
                                /></button
                            ></td
                        >
                        <td>{i}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                        <td>{new Date(book.create).toLocaleString("ru")}</td>
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
                    {#if sub}
                        <tr>
                            <td colspan="7">
                                SubSet SvelteJS + Spectre client, Derver BFF
                                server
                            </td>
                        </tr>
                    {/if}
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
