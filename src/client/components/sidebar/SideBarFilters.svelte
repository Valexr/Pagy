<script>
    import { onDestroy, onMount, tick } from "svelte";
    import { path, query, fragment } from "svelte-pathfinder";
    import { page } from "@routes";
    import { items, filters } from "@stores/store";
    import * as db from "@api/db";
    import { SideBar } from "@cmp";

    let form = null,
        editForm = {
            id: "",
            title: "",
            author: "",
            description: "",
        };

    async function getPage() {
        await tick();
        if ($page.alias === "locales")
            editForm = await db.get(`/locales/items${$query}`);
        else if ($page.alias === "users")
            editForm = await db.get(`/users/items${$query}`);
        else editForm = await db.get(`/pages/items${$query}`);
    }

    async function updatePage() {
        $items = await db.set(`/pages/items${$query}`, editForm);
        $fragment = "";
    }

    $: filterLink = (key, val, item, query) => {
        function qpath() {
            const path = Object.entries($filters).map(([k, v], i) => {
                return key === k
                    ? `${k}=${item}`
                    : `${k}=${qsub(k, v) || v[0]}`;
            });
            return [...new Set(path)].join("&");
        }
        function qsub(k, v) {
            // if (query[k] !== v) query[k] = v;
            return Object.values(query).filter((q) => v.some((v) => v === q));
        }
        return `${$path}?${qpath()}${$fragment}`;
    };
</script>

<SideBar backdrop={false}>
    {#await $filters}
        <div class="docs-demo columns">
            <div class="column col-12 text-center">
                <div class="loading loading-lg" />
            </div>
        </div>
    {:then filters}
        <div class="columns">
            <div class="column col-12">
                <h3>Filters</h3>
            </div>
            <div class="column col-12">
                {#each Object.entries(filters) as [k, v]}
                    <ul class="menu">
                        <li class="divider" data-content={k.toUpperCase()} />
                        {#each v as link}
                            <li class="menu-item">
                                <a
                                    href={filterLink(k, v, link, $query.params)}
                                    class:active={link === $query.params[k]}
                                >
                                    <!-- <i class="icon icon-link" /> -->
                                    {link}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/each}
                <pre
                    class="code hide-xs"
                    data-lang="JSON">
                <code>{JSON.stringify(filters, 0, 2)}</code>
            </pre>
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
                            bind:this={form}
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
                            <code contenteditable="true">{JSON.stringify(editForm, 0, 2)}</code>
                        </pre>
                    </div>
                </details> -->
            </div>
        </div>
    {/await}
</SideBar>

<style lang="scss">
    .menu {
        box-shadow: none;
        padding: 0;
    }
    // aside {
    //     top: 0;
    //     bottom: 0;
    //     width: 100%;
    //     max-width: 490px;
    //     z-index: 400;
    //     box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
    //     background: white;
    //     overflow-y: auto;
    //     padding: 1.6rem;
    //     button#close {
    //         position: absolute;
    //         top: 1.6rem;
    //         right: 1.6rem;
    //     }
    //     &.right {
    //         right: 0;
    //     }
    // }
    // .aside-backdrop {
    //     background: rgba(247, 248, 249, 0.75);
    //     bottom: 0;
    //     cursor: default;
    //     display: block;
    //     left: 0;
    //     position: fixed;
    //     right: 0;
    //     top: 0;
    //     z-index: 300;
    // }
    // .accordion .accordion-body {
    //     overflow: auto;
    // }
</style>
