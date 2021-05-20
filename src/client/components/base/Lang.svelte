<script>
    import { url, path } from "svelte-pathfinder";
    import { DropDown } from "@cmp";
    import { history } from "@routes";

    let lang = false,
        langs = ["en", "ru"];

    function changeLang(item) {
        lang = !lang;
        $history.lang = item;
        // $path.params.lang = item;
    }
</script>

<DropDown
    bind:opener={lang}
    openbut={{
        name: $history.lang,
        icon: "icon-location",
        class: "btn-link",
    }}
    items={langs}
    downbut={null}
    right={true}
    auto={true}
    let:item
>
    <a
        href={`/${item}${$url.substring(3)}`}
        class:active={$history.lang === item}
        on:click={changeLang(item)}
    >
        {item}
    </a>
</DropDown>
