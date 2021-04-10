<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    var books = [];
    var addBookForm = {
        title: "",
        author: "",
        description: "",
    };
    var editForm = {
        _id: "",
        title: "",
        author: "",
        description: "",
    };
    let redisactive = true,
        currentdb = "redis";
    function setRedis() {
        books = [];
        redisactive = true;
        currentdb = "redis";
        getBooks();
    }

    function getBooks() {
        fetch(`/books/${currentdb}`).then(
            async (res) => (books = await res.json())
        );
        // books = await fetch(`/books/${currentdb}`).json();
        // .then((data) => {
        // 	books = data;
        // });
        // axios.get(`/books/${currentdb}`).then((res) => {
        // 	books = res.data;
        // });
    }
    $: console.log(books);

    function removeBook(bookID) {
        const path = `/books/${currentdb}/${bookID.book._id}`;
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
                getBooks();
            })
            .catch((error) => {
                console.error(error);
                getBooks();
            });
    }

    function addBook() {
        const payload = {
            title: addBookForm.title,
            author: addBookForm.author,
            description: addBookForm.description,
        };
        const path = `/books/${currentdb}`;
        fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            // 	.then((response) => response.json())
            // 	.then((data) => {
            // 		console.log("Success:", data);
            // 	})
            // 	.catch((error) => {
            // 		console.error("Error:", error);
            // 	});
            // axios
            // 	.post(path, payload)
            .then(() => {
                getBooks();
            })
            .catch((error) => {
                console.log(error);
                getBooks();
            });
        addtoggle();
    }

    function editBook(book) {
        updatetoggle();
        editForm = book.book;
    }

    function updateBook() {
        const payload = {
            title: editForm.title,
            author: editForm.author,
            description: editForm.description,
        };
        const path = `/books/${currentdb}/${editForm._id}`;
        fetch(path, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            // axios
            // .put(path, payload)
            .then(() => {
                getBooks();
            })
            .catch((error) => {
                console.error(error);
                getBooks();
            });
        updatetoggle();
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
    onMount(getBooks);
    let addopen = false;

    function addtoggle() {
        // initForm();
        addopen = !addopen;
    }
    let updateopen = false;

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

<header class="navbar container">
    <section class="navbar-section">
        <button class="btn btn-primary" on:click={addtoggle}>Add Book</button>
    </section>
    <section class="navbar-center">
        <h1>Books</h1>
    </section>
    <section class="navbar-section">
        <button class="btn" on:click={setRedis}>Redis</button>
    </section>
</header>

<main class="container">
    <section class="column col-12">
        <table class="table table-striped table-hover table-scroll">
            <thead>
                <tr>
                    <th />
                    <th on:click={sortby}>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each books as book (book._id)}
                    <tr transition:fly={{ y: 48, duration: 200 }}>
                        <td><i class="icon icon-more-vert c-move" /></td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                        <td>
                            <button
                                class="btn btn-primary btn-action tooltip"
                                data-tooltip="Edit book"
                                on:click={editBook({ book })}
                                ><i class="icon icon-edit" /></button
                            >
                            <button
                                class="btn btn-link text-error"
                                on:click={removeBook({ book })}
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
            <button class="btn btn-primary" on:click={addBook}>Add book</button>
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
