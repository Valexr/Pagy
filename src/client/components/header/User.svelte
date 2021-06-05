<script>
    import { url, path, goto } from "svelte-pathfinder";
    import { DropDown } from "@cmp";
    import { session, logout } from "@api/auth";
</script>

<DropDown
    openbut={{
        name: "",
        icon: "icon-people",
        class: "btn-link s-circle",
    }}
    downbut={{
        action: () => logout(),
        title: "Logout",
        icon: "shutdown",
    }}
    right={true}
    let:item
>
    <slot slot="static">
        <a
            href={`users?role=${$session.role}#sidebarEdit-${$session.userid}`}
            class="btn btn-link"
        >
            {$session.username}
        </a>
    </slot>
</DropDown>
