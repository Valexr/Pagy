<script>
    import { router } from "tinro";
    import { SideBar } from "@cmp";
</script>

{#if $router.hash === "sidebar"}
    <SideBar />
{/if}
