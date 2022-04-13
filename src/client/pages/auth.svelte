<section class="flex-centered">
    <form on:submit|preventDefault="{submit}">
        <fieldset disabled="{onAuth}">
            <div class="form-group" class:has-error="{$form.err.username}" class:has-success="{$good_username}">
                <label class="form-label" for="newAuthor">{$t('email')}</label>
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
                    bind:this="{username}"
                    bind:value="{$form.username}"
                    on:input="{() => ($form.err.username = false)}"
                />
                {#if $form.err.username}
                    <span class="form-input-hint">{$form.err.username}</span>
                    <!-- {:else if $good_username}
                        <span class="form-input-hint">Good email!</span> -->
                {/if}
            </div>
            <div class="form-group" class:has-error="{$form.err.password}" class:has-success="{$good_password}">
                <label class="form-label" for="newAuthor">{$t('password')}</label>
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
                            bind:value="{$form.password}"
                            on:input="{() => ($form.err.password = false)}"
                        />
                        <i
                            class="form-icon icon icon-emoji text-primary c-hand"
                            on:click="{(e) => (isPassvis = !isPassvis)}"></i>
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
                            bind:this="{password}"
                            bind:value="{$form.password}"
                            on:input="{() => ($form.err.password = false)}"
                        />
                        <i
                            class="form-icon icon icon-emojis text-gray c-hand"
                            on:click="{(e) => (isPassvis = !isPassvis)}"></i>
                    </div>
                {/if}
                {#if $form.err.password}
                    <span class="form-input-hint">{$form.err.password}</span>
                {/if}
            </div>
            <div class="form-group" class:has-error="{$form.err.remember}" class:has-success="{$form.remember}">
                <label class="form-checkbox tooltip" data-tooltip="{$t('uses-cookies')}">
                    <input
                        type="checkbox"
                        bind:checked="{$form.remember}"
                        on:focus="{() => ($form.err.remember = false)}"
                    /><i class="form-icon"></i>
                    {$t('remember-me')}
                </label>
                {#if $form.err.remember}
                    <span class="form-input-hint">{$form.err.remember}</span>
                {/if}
            </div>
        </fieldset>
        <button
            aria-keyshortcuts="Enter"
            disabled="{submitable}"
            class="btn btn-primary btn-block"
            class:c-not-allowed="{submitable}"
            class:loading="{onAuth}"
        >
            {$t('sign-in')}
        </button>
        <button class="btn btn-link btn-block">{$t('forget-password')}</button>
    </form>
</section>

<script lang="ts">
    import { onMount, beforeUpdate, tick } from 'svelte';
    import { redirect, pattern, path } from 'svelte-pathfinder';
    import { media } from '@stores/media';
    import { aoviSvelte } from 'aovi-svelte';
    import { t } from 'svelte-intl-precompile';
    import { login, session } from '@api/auth';
    import { date } from '@utils';
    import { noticy } from '@cmp';

    const form = aoviSvelte({
        username: '',
        password: '',
        remember: false,
    });

    let onAuth = false,
        isPassvis = false,
        username = null,
        password = null;

    $: submitable = !$good_username || !$good_password || $form.err.username || $form.err.password;

    onMount(() => {
        $form.valid = false;
        if ($session.username) {
            noticy.warning($t('authenticate-please'), 5000, $t('session-logout'));
            $form.username = $session.username;
            $form.remember = true;

            if (password && !password.value) {
                $form.err.password = $t('authenticate-please');
                password.focus();
            }
        } else if ($pattern('/:lang/auth') && $path.length > 5) {
            noticy.primary($t('login-please'), 5000, $t('welcome-to-pagy'));
            // tick().then(() => username.focus());
            username.focus();
        }
    });

    async function submit() {
        form.aovi
            .check('username')
            .required('Email?')
            .match(/[^@]+@[^\.]+\...+/, 'E-Mail is invalid')
            .minLength(6, 'не менее 6 символов')
            .check('password')
            .required()
            .match(/[a-zA-Z0-9#?!@$%^&*-]/)
            .minLength(8, 'Password should be at least 8 symbols length').end;
        // .is((v) => v === true, "Вы согласны отправить личные данные?");

        if ($form.valid) {
            onAuth = true;
            login(form.get())
                .then((res) => {
                    console.log(res);
                    onAuth = false;
                    switch (res.status) {
                        case 400:
                            noticy.error($t('user-not-found'), 5000);
                            $form.err.username = $t('user-not-found');
                            username.focus();
                            break;
                        case 401:
                            noticy.error($t('invalid-password'), 5000);
                            $form.err.password = $t('invalid-password');
                            password.focus();
                            break;
                        case 200:
                            const exp = res.user.maxAge ? date(res.user.maxAge * 1000 + Date.now()) : 'Session';
                            noticy.success($form.username, 5000, $t('expires') + exp);
                            redirect(`/users?role=${res.user.role}`);
                            break;
                    }
                })
                .catch((err) => {
                    onAuth = false;
                    console.log('err: ', err);
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
    const good_username = form.checker('username', (aovi) => aovi.minLength(6).match(/[^@]+@[^\.]+\...+/));
    const good_password = form.checker('password', (aovi) => aovi.minLength(8).match(/[a-zA-Z0-9#?!@$%^&*-]/));
</script>

<style lang="scss">
    form {
        min-width: 300px;
    }
</style>
