<DropDown
    openbut="{{
        name: !$media.sm ? $session.username : '',
        icon: $media.sm ? 'icon-people' : '',
        class: 'btn-link',
    }}"
    downbut="{{
        action: () => logout(),
        title: 'Logout',
        icon: 'shutdown',
        class: 'btn-primary',
    }}"
    right="{true}"
    auto="{true}"
    let:item
>
    <slot slot="static">
        <a href="{`users?role=${$session.role}#sidebarEdit-${$session.userid}`}" class="btn btn-link">
            {$session.username}
        </a>
    </slot>
</DropDown>

<script lang="ts">
    import { url, path, goto } from 'svelte-pathfinder';
    import { media } from '@stores/media';
    import { DropDown } from '@cmp';
    import { session, logout } from '@api/auth';
</script>
