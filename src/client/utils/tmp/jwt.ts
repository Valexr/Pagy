import { atob } from '$lib/utils';

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
                    code = '0' + code;
                }
                return '%' + code;
            })
        );
    }

    function decode(str) {
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }

        try {
            return b64DecodeUnicode(output);
        } catch (err) {
            return atob(output);
        }
    }

    var jwtArray = jwt.split('.');

    return {
        header: decode(jwtArray[0]),
        payload: decode(jwtArray[1]),
        signature: decode(jwtArray[2]),
    };
}

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const jwt64 =
        'eyJpZCI6MTcxMjMyLCJlbWFpbCI6InNkc2RmZHNAd3NzZGYuc2RmIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0yMVQwODoyNTozMy4zNTVaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yMVQwODoyNTozMy4zNjFaIiwidXNlcm5hbWUiOiJhcXdyZXF3d3FlIiwiYmlvIjpudWxsLCJpbWFnZSI6bnVsbCwidG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVGN4TWpNeUxDSjFjMlZ5Ym1GdFpTSTZJbUZ4ZDNKbGNYZDNjV1VpTENKbGVIQWlPakUyTWpZM05qazFNek45LnlyUkIzSG5KMHBINldtWktKY2IxQ0FWZWk1Zl9LZkxxZEk4VkYwYVNkRmsifQ==',
    jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxODkxNDgzNzkzNSwicGFzcyI6IiQyYSQwOSR3bnJtelQ3WEtKNFMxSEhKajdJWGVPenRaUmFodkNuay9lRUxiWE03Lm9aeTRaUzlvbWFUcSIsImlhdCI6MTYyMjI2NzEzOSwiZXhwIjoxNjIyMjcwNzM5fQ.0HVFYKmI6ODrzzhh5pzzntfIdQNWeQs85H3qMO7m6zw';
$: console.log(
    JSON.parse(atob(jwt64)),
    parseJwt(jwt),
    jwt.split('.').map((t, i) => (i < 2 ? atob(t) : t))
    // jwtDecode(jwt)
    // JSON.parse(Buffer.from(jwt, "base64").toString("utf-8"))
);
