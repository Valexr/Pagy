<script>
    export let but = {
        class: "",
        badge: "",
        initial: "",
        title: "",
        icon: "",
        tooltip: "",
    };
</script>

<button
    class="btn {but.class}"
    data-badge={but.badge}
    data-initial={but.initial}
    data-tooltip={but.tooltip}
    on:click
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
    {but.title ? but.title : ""}
    {#if but.icon}
        <i class="icon icon-{but.icon}" />
    {/if}
</button>
