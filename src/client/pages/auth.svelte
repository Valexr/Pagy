<script>
    import * as data from "@api/data";

    let onAuth = false;
    const user = {
        email: "",
        password: "",
    };

    function addUser() {
        onAuth = true;
        const path = "/api/data/users";
        if (user.email) {
            data.db("users", "admin");
            data.add("admin", user).then((res) =>
                setTimeout(() => (onAuth = false), 1000)
            );
            // fetch(path, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(user),
            // })
            //     .then(async (res) => {
            //         const user = await res.json();
            //         // users = [...users, user];
            //         console.log("add: ", user);
            //         setTimeout(() => (onAuth = false), 3000);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         setTimeout(() => (onAuth = false), 3000);
            //     });
        } else {
            setTimeout(() => (onAuth = false), 500);
        }
    }
</script>

<div class="columns">
    <div class="column col-auto p-centered">
        <form on:submit|preventDefault={addUser}>
            <fieldset disabled={onAuth}>
                <div class="form-group">
                    <label class="form-label" for="newAuthor">Email</label>
                    <input
                        class="form-input"
                        type="email"
                        placeholder="Email"
                        bind:value={user.email}
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="newAuthor">Password</label>
                    <input
                        class="form-input"
                        type="password"
                        placeholder="Password"
                        bind:value={user.password}
                    />
                </div>
                <div class="form-group">
                    <label class="form-checkbox">
                        <input type="checkbox" required /><i
                            class="form-icon"
                        /> Remember me
                    </label>
                </div>
            </fieldset>
            <button class="btn btn-primary btn-block" class:loading={onAuth}>
                Submit
            </button>
        </form>
    </div>
</div>

<style lang="scss">
    form {
        min-width: 300px;
    }
</style>
