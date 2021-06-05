<script>
    import { onMount } from "svelte";
    import { url } from "svelte-pathfinder";
    import { init, addMessages } from "svelte-intl-precompile";
    import { history } from "@routes";
    import { DropDown } from "@cmp";

    let lang = false,
        langs = [
            { name: "en", dict: () => import("@lang/en.json") },
            { name: "ru", dict: () => import("@lang/ru.json") },
        ];

    onMount(() => {
        registerLang($history.lang);
    });

    async function registerLang(lang) {
        const lg = langs.find((l) => l.name === lang);
        addMessages(lang, await lg.dict());
        init({
            fallbackLocale: "en",
            initialLocale: lang,
        });
    }

    function changeLang(item) {
        registerLang(item);
        $history.lang = item;
        lang = !lang;
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
        href={`/${item.name}${$url.substring(3)}`}
        class:active={$history.lang === item.name}
        on:click={changeLang(item.name)}
    >
        {item.name}
    </a>
</DropDown>
