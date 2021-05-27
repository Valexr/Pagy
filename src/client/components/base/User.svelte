<script>
    import { url, path } from "svelte-pathfinder";
    import { DropDown } from "@cmp";
    import { session } from "@api/auth";

    let user = false;

    // function parseJwt(token) {
    //     var base64Url = token.split(".")[1];
    //     var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    //     var jsonPayload = decodeURIComponent(
    //         atob(base64)
    //             .split("")
    //             .map(function (c) {
    //                 return (
    //                     "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    //                 );
    //             })
    //             .join("")
    //     );

    //     return JSON.parse(jsonPayload);
    // }

    // const parseJwt = (token) =>
    //     JSON.parse(Buffer.from(token.split(".")[1], "base64url"));

    function jwtDecode(jwt) {
        function b64DecodeUnicode(str) {
            return decodeURIComponent(
                atob(str).replace(/(.)/g, function (m, p) {
                    var code = p.charCodeAt(0).toString(16).toUpperCase();
                    if (code.length < 2) {
                        code = "0" + code;
                    }
                    return "%" + code;
                })
            );
        }

        function decode(str) {
            var output = str.replace(/-/g, "+").replace(/_/g, "/");
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += "==";
                    break;
                case 3:
                    output += "=";
                    break;
                default:
                    throw "Illegal base64url string!";
            }

            try {
                return b64DecodeUnicode(output);
            } catch (err) {
                return atob(output);
            }
        }

        var jwtArray = jwt.split(".");

        return {
            header: decode(jwtArray[0]),
            payload: decode(jwtArray[1]),
            signature: decode(jwtArray[2]),
        };
    }

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    const jwt64 =
            "eyJpZCI6MTcxMjMyLCJlbWFpbCI6InNkc2RmZHNAd3NzZGYuc2RmIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0yMVQwODoyNTozMy4zNTVaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yMVQwODoyNTozMy4zNjFaIiwidXNlcm5hbWUiOiJhcXdyZXF3d3FlIiwiYmlvIjpudWxsLCJpbWFnZSI6bnVsbCwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVGN4TWpNeUxDSjFjMlZ5Ym1GdFpTSTZJbUZ4ZDNKbGNYZDNjV1VpTENKbGVIQWlPakUyTWpZM05qazFNek45LnlyUkIzSG5KMHBINldtWktKY2IxQ0FWZWk1Zl9LZkxxZEk4VkYwYVNkRmsifQ==",
        jwt =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTcxMjMyLCJ1c2VybmFtZSI6ImFxd3JlcXd3cWUiLCJleHAiOjE2MjY3Njk1MzN9.yrRB3HnJ0pH6WmZKJcb1CAVei5f_KfLqdI8VF0aSdFk";
    $: console.log(
        JSON.parse(atob(jwt64)),
        parseJwt(jwt)
        // jwtDecode(jwt)
        // JSON.parse(Buffer.from(jwt, "base64").toString("utf-8"))
    );
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
            href={`users?role=admin#sidebarEdit-${$session.id}`}
            class="btn btn-link"
            on:click={() => (user = !user)}
        >
            {$session.username}
        </a>
    </slot>
</DropDown>
