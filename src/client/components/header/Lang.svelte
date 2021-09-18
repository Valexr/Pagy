<script>
    import { onMount, tick } from "svelte";
    import { url } from "svelte-pathfinder";
    import { media } from "svelte-match-media";
    import { init, addMessages, register } from "svelte-intl-precompile";
    import { history, page, authed } from "@routes";
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
        const lng = langs.find((l) => l.name === lang);
        const dict = await lng.dict();
        addMessages(lang, dict);
        // register(lang, lng.dict);
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
        icon: "icon-flag",
        class: "btn-link",
    }}
    items={langs}
    downbut={null}
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
