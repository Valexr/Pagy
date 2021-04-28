<script>
    import { clickout } from "@utils";

    export let ul = null,
        opener = false,
        openbut = {
            name: "Open",
            icon: "",
            class: "",
            badge: "",
            initial: "",
        },
        items = [],
        downbut = {},
        right = false,
        list = true;
</script>

<div class="dropdown {right ? 'dropdown-right' : ''}" class:active={opener}>
    <button
        class="btn text-capitalize {openbut.class}"
        data-badge={openbut.badge}
        data-initial={openbut.initial}
        on:click|stopPropagation|preventDefault={() => (opener = !opener)}
    >
        <!-- <slot name="img">
            <figure
                class="avatar badge column col-auto"
                data-badge="8"
                data-initial="YZ"
            >
                <i class="icon icon-people" />
                <img src="favicon.png" alt="YZ" />
            </figure>
        </slot> -->
        {openbut.name}
        <i class="icon {openbut.icon ? openbut.icon : 'icon-caret'}" />
    </button>
    {#if opener}
        <ul
            class="menu"
            bind:this={ul}
            use:clickout={ul}
            on:clickout={() => (opener = false)}
        >
            {#if list}
                {#each items as item}
                    <li class="menu-item text-capitalize">
                        <slot {item}>
                            <a
                                href={item.href}
                                on:click={item.action}
                                class:active={item.active}
                            >
                                {item.title}
                                {#if item.button}
                                    <button
                                        class="btn btn-action btn-sm p-relative float-right sm-acts"
                                        on:click|preventDefault|stopPropagation
                                    >
                                        <i class="icon icon-edit" />
                                    </button>
                                {/if}
                            </a>
                        </slot>
                    </li>
                {/each}
            {:else}
                <li>
                    <slot name="static" />
                </li>
            {/if}
            {#if downbut}
                <li class="divider" />
                <li class="menu-item">
                    <button
                        class="btn btn-primary btn-block text-light"
                        on:click={downbut.action}
                    >
                        <i class="icon icon-plus" />
                        {downbut.title}
                    </button>
                </li>
            {/if}
        </ul>
    {/if}
</div>

<style lang="scss">
    .badge.btn::after {
        transform: translate(30%, -30%);
    }
</style>
