<script>
    import { onMount, tick } from "svelte";
    import { aoviSvelte } from "aovi-svelte";
    import { t } from "svelte-intl-precompile";
    import { noticy } from "@cmp";
    import { login, refresh, session, cookie } from "@api/auth";
    // import { login } from "@api/login";
    import { date, time } from "@utils";
    import { history, authed } from "@routes";
    import {
        url,
        path,
        query,
        pattern,
        fragment,
        state,
        click,
        goto,
    } from "svelte-pathfinder";

    const form = aoviSvelte({
        username: "",
        password: "",
        remember: false,
    });

    let onAuth = false,
        isPassvis = false,
        username = null,
        password = null;

    $: submitable =
        !$good_username ||
        !$good_password ||
        $form.err.username ||
        $form.err.password;

    onMount(async () => {
        $form.valid = false;
        const res = await cookie();
        if (res.ok) {
            const user = await res.json();
            noticy.warning($t("authenticate-please"), 0, $t("jwt-expired"));
            $form.username = user.username;
            $form.remember = true;
            if (password && !password.value) {
                $form.err.password = $t("authenticate-please");
                password.focus();
            }
        } else if ($session.username) {
            noticy.error($t("authenticate-please"), 0, $t("jwt-expired"));
            $form.username = $session.username;
            if (password && !password.value) {
                $form.err.password = $t("authenticate-please");
                password.focus();
            }
        } else {
            noticy.primary($t("login-please"), 0, $t("welcome-to-pagy"));
            username.focus();
        }
    });

    async function submit() {
        // patch("items");
        form.aovi
            .check("username")
            .required("Email?")
            .match(/[^@]+@[^\.]+\...+/, "E-Mail is invalid")
            .minLength(6, "не менее 6 символов")
            .check("password")
            .required()
            .match(/[a-zA-Z0-9#?!@$%^&*-]/)
            .minLength(8, "Password should be at least 8 symbols length").end;
        // .is((v) => v === true, "Вы согласны отправить личные данные?");

        if ($form.valid) {
            onAuth = true;
            login(form.get())
                .then((res) => {
                    onAuth = false;
                    switch (res.status) {
                        case 400:
                            noticy.error($t("user-not-found"), 5000);
                            $form.err.username = $t("user-not-found");
                            username.focus();
                            break;
                        case 401:
                            noticy.error($t("invalid-password"), 5000);
                            $form.err.password = $t("invalid-password");
                            password.focus();
                            break;
                        case 200:
                            noticy.success(
                                $form.username,
                                2500,
                                $t("expires") + time(res.user.exp * 1000)
                            );
                            goto(`/users?role=admin`);
                            break;
                    }
                })
                .catch((err) => {
                    onAuth = false;
                    console.log("err: ", err);
                });
        } else {
            noticy.default(
                JSON.stringify(
                    $form.err
                        .toArray()
                        .filter((e) => e)
                        .toString()
                ),
                5000
            );
            setTimeout(() => (onAuth = false), 500);
        }
    }
    const good_username = form.checker("username", (aovi) =>
        aovi.minLength(6).match(/[^@]+@[^\.]+\...+/)
    );
    const good_password = form.checker("password", (aovi) =>
        aovi.minLength(8).match(/[a-zA-Z0-9#?!@$%^&*-]/)
    );
</script>

<form on:submit|preventDefault={submit}>
    <fieldset disabled={onAuth}>
        <div
            class="form-group"
            class:has-error={$form.err.username}
            class:has-success={$good_username}
        >
            <label class="form-label" for="newAuthor">{$t("email")}</label>
            <input
                aria-label="username"
                aria-required="true"
                autocorrect="off"
                autocapitalize="off"
                autocomplete="username"
                id="username"
                class="form-input"
                type="email"
                placeholder="Email"
                bind:this={username}
                bind:value={$form.username}
                on:input={() => ($form.err.username = false)}
            />
            {#if $form.err.username}
                <span class="form-input-hint">{$form.err.username}</span>
                <!-- {:else if $good_username}
                <span class="form-input-hint">Good email!</span> -->
            {/if}
        </div>
        <div
            class="form-group"
            class:has-error={$form.err.password}
            class:has-success={$good_password}
        >
            <label class="form-label" for="newAuthor">{$t("password")}</label>
            {#if isPassvis}
                <div class="has-icon-right">
                    <input
                        aria-label="password"
                        aria-required="true"
                        autocorrect="off"
                        autocapitalize="off"
                        autocomplete="current-password"
                        id="password"
                        class="form-input"
                        type="text"
                        placeholder="Password"
                        bind:value={$form.password}
                        on:input={() => ($form.err.password = false)}
                    />
                    <i
                        class="form-icon icon icon-emoji text-primary c-hand"
                        on:click={(e) => (isPassvis = !isPassvis)}
                    />
                </div>
            {:else}
                <div class="has-icon-right">
                    <input
                        aria-label="password"
                        aria-required="true"
                        autocorrect="off"
                        autocapitalize="off"
                        autocomplete="current-password"
                        id="password"
                        class="form-input"
                        type="password"
                        placeholder="Password"
                        bind:this={password}
                        bind:value={$form.password}
                        on:input={() => ($form.err.password = false)}
                    />
                    <i
                        class="form-icon icon icon-emojis text-gray c-hand"
                        on:click={(e) => (isPassvis = !isPassvis)}
                    />
                </div>
            {/if}
            {#if $form.err.password}
                <span class="form-input-hint">{$form.err.password}</span>
            {/if}
        </div>
        <div
            class="form-group"
            class:has-error={$form.err.remember}
            class:has-success={$form.remember}
        >
            <label
                class="form-checkbox tooltip"
                data-tooltip={$t("uses-cookies")}
            >
                <input
                    type="checkbox"
                    bind:checked={$form.remember}
                    on:focus={() => ($form.err.remember = false)}
                /><i class="form-icon" />
                {$t("remember-me")}
            </label>
            {#if $form.err.remember}
                <span class="form-input-hint">{$form.err.remember}</span>
            {/if}
        </div>
    </fieldset>
    <button
        aria-keyshortcuts="Enter"
        disabled={submitable}
        class="btn btn-primary btn-block"
        class:c-not-allowed={submitable}
        class:loading={onAuth}
    >
        {$t("sign-in")}
    </button>
</form>

<style lang="scss">
    form {
        min-width: 300px;
    }
</style>
