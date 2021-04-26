import { client } from './db'

export function card() {
    let setSize = 20;

    client.sadd("key", "member1");
    client.sadd("key", "member2");

    while (setSize > 0) {
        client.sadd("key", "member" + setSize);
        setSize -= 1;
    }
    // chain commands
    client
        .multi()
        .scard("key")
        .smembers("key")
        .keys("*")
        .dbsize()
        .exec(function (err, replies) {
            console.log("MULTI got " + replies.length + " replies");
            replies.forEach(function (reply, index) {
                console.log("REPLY  @ index " + index + ": " + reply.toString());
            });
        });
}
