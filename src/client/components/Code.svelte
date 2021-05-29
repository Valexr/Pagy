<script>
    export let data = {},
        lang = "JSON";
</script>

<pre
    class="code"
    data-lang={lang}>
    <code contenteditable="true">{JSON.stringify(data, 0, 2)}</code>
</pre>
