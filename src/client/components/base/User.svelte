<script>
    import { url, path } from "svelte-pathfinder";
    import { DropDown } from "@cmp";
    import { session } from "@api/auth";

    let user = false;
</script>

<DropDown
    bind:opener={user}
    openbut={{
        name: "",
        icon: "icon-people",
        class: "btn-link s-circle",
    }}
    downbut={{
        action: () => ($session = { username: $session.username }),
        title: "Logout",
        icon: "shutdown",
    }}
    right={true}
    let:item
>
    <slot slot="static">
        <a
            href={`users?role=admin&id=${$session.id}#sidebar`}
            class="btn btn-link"
            on:click={() => (user = !user)}
        >
            {$session.username}
        </a>
    </slot>
</DropDown>
