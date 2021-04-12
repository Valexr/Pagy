(() => {
  var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);

  // fakecss:/Users/valexr/Desktop/RICHWOOD/www/api.domrichwood.ru/src/client/App.esbuild-svelte-fake-css
  var require_ = __commonJS((exports, module) => {
    module.exports = {};
  });

  // node_modules/.pnpm/svelte@3.37.0/node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function add_location(element2, file2, line, column, char) {
    element2.__svelte_meta = {
      loc: {file: file2, line, column, char}
    };
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var tasks = new Set();
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function toggle_class(element2, name, toggle) {
    element2.classList[toggle ? "add" : "remove"](name);
  }
  function custom_event(type, detail) {
    const e = document.createEvent("CustomEvent");
    e.initCustomEvent(type, false, false, detail);
    return e;
  }
  var active_docs = new Set();
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  var flushing = false;
  var seen_callbacks = new Set();
  function flush() {
    if (flushing)
      return;
    flushing = true;
    do {
      for (let i = 0; i < dirty_components.length; i += 1) {
        const component = dirty_components[i];
        set_current_component(component);
        update(component.$$);
      }
      set_current_component(null);
      dirty_components.length = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  var outroing = new Set();
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
  function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
  }
  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
      old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
      const child_ctx = get_context(ctx, list, i);
      const key = get_key(child_ctx);
      let block = lookup.get(key);
      if (!block) {
        block = create_each_block2(key, child_ctx);
        block.c();
      } else if (dynamic) {
        block.p(child_ctx, dirty);
      }
      new_lookup.set(key, new_blocks[i] = block);
      if (key in old_indexes)
        deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert2(block) {
      transition_in(block, 1);
      block.m(node, next);
      lookup.set(block.key, block);
      next = block.first;
      n--;
    }
    while (o && n) {
      const new_block = new_blocks[n - 1];
      const old_block = old_blocks[o - 1];
      const new_key = new_block.key;
      const old_key = old_block.key;
      if (new_block === old_block) {
        next = new_block.first;
        o--;
        n--;
      } else if (!new_lookup.has(old_key)) {
        destroy(old_block, lookup);
        o--;
      } else if (!lookup.has(new_key) || will_move.has(new_key)) {
        insert2(new_block);
      } else if (did_move.has(old_key)) {
        o--;
      } else if (deltas.get(new_key) > deltas.get(old_key)) {
        did_move.add(new_key);
        insert2(new_block);
      } else {
        will_move.add(old_key);
        o--;
      }
    }
    while (o--) {
      const old_block = old_blocks[o];
      if (!new_lookup.has(old_block.key))
        destroy(old_block, lookup);
    }
    while (n)
      insert2(new_blocks[n - 1]);
    return new_blocks;
  }
  function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
      const key = get_key(get_context(ctx, list, i));
      if (keys.has(key)) {
        throw new Error("Cannot have duplicate keys in a keyed each");
      }
      keys.add(key);
    }
  }
  var boolean_attributes = new Set([
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]);
  function mount_component(component, target, anchor, customElement) {
    const {fragment, on_mount, on_destroy, after_update} = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
          on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance2, create_fragment2, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : options.context || []),
      callbacks: blank_object(),
      dirty,
      skip_bound: false
    };
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode: "open"});
      }
      connectedCallback() {
        const {on_mount} = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr2, _oldValue, newValue) {
        this[attr2] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
  var SvelteComponent = class {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
  function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({version: "3.37.0"}, detail)));
  }
  function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", {target, node});
    append(target, node);
  }
  function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", {target, node, anchor});
    insert(target, node, anchor);
  }
  function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", {node});
    detach(node);
  }
  function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
      modifiers.push("preventDefault");
    if (has_stop_propagation)
      modifiers.push("stopPropagation");
    dispatch_dev("SvelteDOMAddEventListener", {node, event, handler, modifiers});
    const dispose = listen(node, event, handler, options);
    return () => {
      dispatch_dev("SvelteDOMRemoveEventListener", {node, event, handler, modifiers});
      dispose();
    };
  }
  function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
      dispatch_dev("SvelteDOMRemoveAttribute", {node, attribute});
    else
      dispatch_dev("SvelteDOMSetAttribute", {node, attribute, value});
  }
  function set_data_dev(text2, data) {
    data = "" + data;
    if (text2.wholeText === data)
      return;
    dispatch_dev("SvelteDOMSetData", {node: text2, data});
    text2.data = data;
  }
  function validate_each_argument(arg) {
    if (typeof arg !== "string" && !(arg && typeof arg === "object" && "length" in arg)) {
      let msg = "{#each} only iterates over array-like objects.";
      if (typeof Symbol === "function" && arg && Symbol.iterator in arg) {
        msg += " You can use a spread to convert this iterable into an array.";
      }
      throw new Error(msg);
    }
  }
  function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
      if (!~keys.indexOf(slot_key)) {
        console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
      }
    }
  }
  var SvelteComponentDev = class extends SvelteComponent {
    constructor(options) {
      if (!options || !options.target && !options.$$inline) {
        throw new Error("'target' is a required option");
      }
      super();
    }
    $destroy() {
      super.$destroy();
      this.$destroy = () => {
        console.warn("Component was already destroyed");
      };
    }
    $capture_state() {
    }
    $inject_state() {
    }
  };

  // node_modules/.pnpm/svelte@3.37.0/node_modules/svelte/easing/index.mjs
  function cubicOut(t) {
    const f = t - 1;
    return f * f * f + 1;
  }

  // node_modules/.pnpm/svelte@3.37.0/node_modules/svelte/transition/index.mjs
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  function fly(node, {delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0} = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === "none" ? "" : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
      delay,
      duration,
      easing,
      css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
    };
  }

  // src/client/App.svelte
  var {console: console_1} = globals;
  var file = "src/client/App.svelte";
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[27] = list[i];
    return child_ctx;
  }
  function create_each_block(key_1, ctx) {
    let tr;
    let td0;
    let i0;
    let t0;
    let td1;
    let t1_value = ctx[27].title + "";
    let t1;
    let t2;
    let td2;
    let t3_value = ctx[27].author + "";
    let t3;
    let t4;
    let td3;
    let t5_value = ctx[27].description + "";
    let t5;
    let t6;
    let td4;
    let t7_value = new Date(ctx[27].create).toLocaleString() + "";
    let t7;
    let t8;
    let td5;
    let button0;
    let i1;
    let t9;
    let button1;
    let i2;
    let t10;
    let button2;
    let i3;
    let t11;
    let mounted;
    let dispose;
    const block = {
      key: key_1,
      first: null,
      c: function create() {
        tr = element("tr");
        td0 = element("td");
        i0 = element("i");
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        td3 = element("td");
        t5 = text(t5_value);
        t6 = space();
        td4 = element("td");
        t7 = text(t7_value);
        t8 = space();
        td5 = element("td");
        button0 = element("button");
        i1 = element("i");
        t9 = space();
        button1 = element("button");
        i2 = element("i");
        t10 = space();
        button2 = element("button");
        i3 = element("i");
        t11 = space();
        attr_dev(i0, "class", "icon icon-more-vert c-move");
        add_location(i0, file, 187, 28, 5075);
        add_location(td0, file, 187, 24, 5071);
        add_location(td1, file, 188, 24, 5145);
        add_location(td2, file, 189, 24, 5191);
        add_location(td3, file, 190, 24, 5238);
        add_location(td4, file, 191, 24, 5290);
        attr_dev(i1, "class", "icon icon-edit");
        add_location(i1, file, 197, 33, 5628);
        attr_dev(button0, "class", "btn btn-primary btn-action tooltip");
        attr_dev(button0, "data-tooltip", "Edit book");
        add_location(button0, file, 193, 28, 5397);
        attr_dev(i2, "class", "icon icon-copy");
        add_location(i2, file, 203, 33, 5942);
        attr_dev(button1, "class", "btn btn-action tooltip");
        attr_dev(button1, "data-tooltip", "Copy book");
        add_location(button1, file, 199, 28, 5723);
        attr_dev(i3, "class", "icon icon-delete");
        add_location(i3, file, 208, 33, 6202);
        attr_dev(button2, "class", "btn btn-link text-error");
        add_location(button2, file, 205, 28, 6037);
        add_location(td5, file, 192, 24, 5364);
        add_location(tr, file, 186, 20, 5042);
        this.first = tr;
      },
      m: function mount(target, anchor) {
        insert_dev(target, tr, anchor);
        append_dev(tr, td0);
        append_dev(td0, i0);
        append_dev(tr, t0);
        append_dev(tr, td1);
        append_dev(td1, t1);
        append_dev(tr, t2);
        append_dev(tr, td2);
        append_dev(td2, t3);
        append_dev(tr, t4);
        append_dev(tr, td3);
        append_dev(td3, t5);
        append_dev(tr, t6);
        append_dev(tr, td4);
        append_dev(td4, t7);
        append_dev(tr, t8);
        append_dev(tr, td5);
        append_dev(td5, button0);
        append_dev(button0, i1);
        append_dev(td5, t9);
        append_dev(td5, button1);
        append_dev(button1, i2);
        append_dev(td5, t10);
        append_dev(td5, button2);
        append_dev(button2, i3);
        append_dev(tr, t11);
        if (!mounted) {
          dispose = [
            listen_dev(button0, "click", function() {
              if (is_function(ctx[8](ctx[27])))
                ctx[8](ctx[27]).apply(this, arguments);
            }, false, false, false),
            listen_dev(button1, "click", function() {
              if (is_function(ctx[10](ctx[27])))
                ctx[10](ctx[27]).apply(this, arguments);
            }, false, false, false),
            listen_dev(button2, "click", function() {
              if (is_function(ctx[11](ctx[27])))
                ctx[11](ctx[27]).apply(this, arguments);
            }, false, false, false)
          ];
          mounted = true;
        }
      },
      p: function update2(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 1 && t1_value !== (t1_value = ctx[27].title + ""))
          set_data_dev(t1, t1_value);
        if (dirty & 1 && t3_value !== (t3_value = ctx[27].author + ""))
          set_data_dev(t3, t3_value);
        if (dirty & 1 && t5_value !== (t5_value = ctx[27].description + ""))
          set_data_dev(t5, t5_value);
        if (dirty & 1 && t7_value !== (t7_value = new Date(ctx[27].create).toLocaleString() + ""))
          set_data_dev(t7, t7_value);
      },
      d: function destroy(detaching) {
        if (detaching)
          detach_dev(tr);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block.name,
      type: "each",
      source: "(186:16) {#each books as book (book._id)}",
      ctx
    });
    return block;
  }
  function create_fragment(ctx) {
    let header;
    let section0;
    let button0;
    let t1;
    let section1;
    let h1;
    let t3;
    let section2;
    let nav;
    let button1;
    let t5;
    let button2;
    let t7;
    let button3;
    let t9;
    let button4;
    let t11;
    let main;
    let section3;
    let table;
    let thead;
    let tr;
    let th0;
    let t12;
    let th1;
    let t14;
    let th2;
    let t16;
    let th3;
    let t18;
    let th4;
    let t20;
    let th5;
    let t22;
    let tbody;
    let each_blocks = [];
    let each_1_lookup = new Map();
    let t23;
    let div10;
    let div0;
    let t24;
    let div9;
    let div2;
    let button5;
    let t25;
    let div1;
    let t27;
    let div7;
    let div6;
    let div3;
    let label0;
    let t29;
    let input0;
    let t30;
    let div4;
    let label1;
    let t32;
    let input1;
    let t33;
    let div5;
    let label2;
    let t35;
    let textarea0;
    let t36;
    let div8;
    let button6;
    let t38;
    let button7;
    let t40;
    let div21;
    let div11;
    let t41;
    let div20;
    let div13;
    let button8;
    let t42;
    let div12;
    let t44;
    let div18;
    let div17;
    let div14;
    let label3;
    let t46;
    let input2;
    let t47;
    let div15;
    let label4;
    let t49;
    let input3;
    let t50;
    let div16;
    let label5;
    let t52;
    let textarea1;
    let t53;
    let div19;
    let button9;
    let t55;
    let button10;
    let mounted;
    let dispose;
    let each_value = ctx[0];
    validate_each_argument(each_value);
    const get_key = (ctx2) => ctx2[27]._id;
    validate_each_keys(ctx, each_value, get_each_context, get_key);
    for (let i = 0; i < each_value.length; i += 1) {
      let child_ctx = get_each_context(ctx, each_value, i);
      let key = get_key(child_ctx);
      each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    }
    const block = {
      c: function create() {
        header = element("header");
        section0 = element("section");
        button0 = element("button");
        button0.textContent = "Add Book";
        t1 = space();
        section1 = element("section");
        h1 = element("h1");
        h1.textContent = "Pagy";
        t3 = space();
        section2 = element("section");
        nav = element("nav");
        button1 = element("button");
        button1.textContent = "All";
        t5 = space();
        button2 = element("button");
        button2.textContent = "Books";
        t7 = space();
        button3 = element("button");
        button3.textContent = "User";
        t9 = space();
        button4 = element("button");
        button4.textContent = "Role";
        t11 = space();
        main = element("main");
        section3 = element("section");
        table = element("table");
        thead = element("thead");
        tr = element("tr");
        th0 = element("th");
        t12 = space();
        th1 = element("th");
        th1.textContent = "Title";
        t14 = space();
        th2 = element("th");
        th2.textContent = "Author";
        t16 = space();
        th3 = element("th");
        th3.textContent = "Description";
        t18 = space();
        th4 = element("th");
        th4.textContent = "Create";
        t20 = space();
        th5 = element("th");
        th5.textContent = "Actions";
        t22 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t23 = space();
        div10 = element("div");
        div0 = element("div");
        t24 = space();
        div9 = element("div");
        div2 = element("div");
        button5 = element("button");
        t25 = space();
        div1 = element("div");
        div1.textContent = "Add a new book";
        t27 = space();
        div7 = element("div");
        div6 = element("div");
        div3 = element("div");
        label0 = element("label");
        label0.textContent = "Title";
        t29 = space();
        input0 = element("input");
        t30 = space();
        div4 = element("div");
        label1 = element("label");
        label1.textContent = "Author";
        t32 = space();
        input1 = element("input");
        t33 = space();
        div5 = element("div");
        label2 = element("label");
        label2.textContent = "Description";
        t35 = space();
        textarea0 = element("textarea");
        t36 = space();
        div8 = element("div");
        button6 = element("button");
        button6.textContent = "Add book";
        t38 = space();
        button7 = element("button");
        button7.textContent = "Cancel";
        t40 = space();
        div21 = element("div");
        div11 = element("div");
        t41 = space();
        div20 = element("div");
        div13 = element("div");
        button8 = element("button");
        t42 = space();
        div12 = element("div");
        div12.textContent = "Update book";
        t44 = space();
        div18 = element("div");
        div17 = element("div");
        div14 = element("div");
        label3 = element("label");
        label3.textContent = "Title";
        t46 = space();
        input2 = element("input");
        t47 = space();
        div15 = element("div");
        label4 = element("label");
        label4.textContent = "Author";
        t49 = space();
        input3 = element("input");
        t50 = space();
        div16 = element("div");
        label5 = element("label");
        label5.textContent = "Description";
        t52 = space();
        textarea1 = element("textarea");
        t53 = space();
        div19 = element("div");
        button9 = element("button");
        button9.textContent = "Update";
        t55 = space();
        button10 = element("button");
        button10.textContent = "Cancel";
        attr_dev(button0, "class", "btn btn-primary");
        add_location(button0, file, 139, 8, 3447);
        attr_dev(section0, "class", "navbar-section");
        add_location(section0, file, 138, 4, 3406);
        add_location(h1, file, 142, 8, 3577);
        attr_dev(section1, "class", "navbar-center");
        add_location(section1, file, 141, 4, 3537);
        attr_dev(button1, "class", "btn");
        toggle_class(button1, "btn-primary", ctx[3] === "all");
        add_location(button1, file, 146, 12, 3703);
        attr_dev(button2, "class", "btn");
        toggle_class(button2, "btn-primary", ctx[3] === "book");
        add_location(button2, file, 151, 12, 3891);
        attr_dev(button3, "class", "btn");
        toggle_class(button3, "btn-primary", ctx[3] === "user");
        add_location(button3, file, 157, 12, 4104);
        attr_dev(button4, "class", "btn");
        toggle_class(button4, "btn-primary", ctx[3] === "role");
        add_location(button4, file, 162, 12, 4299);
        attr_dev(nav, "class", "btn-group btn-group-block");
        add_location(nav, file, 145, 8, 3651);
        attr_dev(section2, "class", "navbar-section");
        add_location(section2, file, 144, 4, 3610);
        attr_dev(header, "class", "navbar container p-sticky");
        add_location(header, file, 137, 0, 3359);
        add_location(th0, file, 176, 20, 4700);
        add_location(th1, file, 177, 20, 4727);
        add_location(th2, file, 178, 20, 4780);
        add_location(th3, file, 179, 20, 4816);
        add_location(th4, file, 180, 20, 4857);
        add_location(th5, file, 181, 20, 4893);
        add_location(tr, file, 175, 16, 4675);
        add_location(thead, file, 174, 12, 4651);
        add_location(tbody, file, 184, 12, 4965);
        attr_dev(table, "class", "table table-hover table-scroll");
        add_location(table, file, 173, 8, 4592);
        attr_dev(section3, "class", "column col-12");
        add_location(section3, file, 172, 4, 4552);
        attr_dev(main, "class", "container");
        add_location(main, file, 171, 0, 4523);
        attr_dev(div0, "class", "modal-overlay");
        attr_dev(div0, "aria-label", "Close");
        add_location(div0, file, 219, 4, 6475);
        attr_dev(button5, "class", "btn btn-clear float-right");
        attr_dev(button5, "aria-label", "Close");
        add_location(button5, file, 222, 12, 6626);
        attr_dev(div1, "class", "modal-title h5");
        add_location(div1, file, 227, 12, 6783);
        attr_dev(div2, "class", "modal-header");
        add_location(div2, file, 221, 8, 6587);
        attr_dev(label0, "class", "form-label");
        attr_dev(label0, "for", "newTitle");
        add_location(label0, file, 232, 20, 6975);
        attr_dev(input0, "class", "form-input");
        attr_dev(input0, "type", "text");
        attr_dev(input0, "id", "newTitle");
        attr_dev(input0, "placeholder", "book title");
        add_location(input0, file, 233, 20, 7050);
        attr_dev(div3, "class", "form-group");
        add_location(div3, file, 231, 16, 6930);
        attr_dev(label1, "class", "form-label");
        attr_dev(label1, "for", "newAuthor");
        add_location(label1, file, 242, 20, 7385);
        attr_dev(input1, "class", "form-input");
        attr_dev(input1, "type", "text");
        attr_dev(input1, "id", "newAuthor");
        attr_dev(input1, "placeholder", "book author");
        add_location(input1, file, 243, 20, 7462);
        attr_dev(div4, "class", "form-group");
        add_location(div4, file, 241, 16, 7340);
        attr_dev(label2, "class", "form-label");
        attr_dev(label2, "for", "newDescription");
        add_location(label2, file, 252, 20, 7800);
        attr_dev(textarea0, "class", "form-input");
        attr_dev(textarea0, "rows", "5");
        attr_dev(textarea0, "id", "newDescription");
        attr_dev(textarea0, "placeholder", "book description");
        add_location(textarea0, file, 255, 20, 7933);
        attr_dev(div5, "class", "form-group");
        add_location(div5, file, 251, 16, 7755);
        attr_dev(div6, "class", "content");
        add_location(div6, file, 230, 12, 6892);
        attr_dev(div7, "class", "modal-body");
        add_location(div7, file, 229, 8, 6855);
        attr_dev(button6, "class", "btn btn-primary");
        add_location(button6, file, 266, 12, 8306);
        attr_dev(button7, "class", "btn btn-link");
        add_location(button7, file, 270, 12, 8455);
        attr_dev(div8, "class", "modal-footer");
        add_location(div8, file, 265, 8, 8267);
        attr_dev(div9, "class", "modal-container");
        add_location(div9, file, 220, 4, 6549);
        attr_dev(div10, "class", "modal");
        attr_dev(div10, "id", "modal-add");
        toggle_class(div10, "active", ctx[4]);
        add_location(div10, file, 218, 0, 6413);
        attr_dev(div11, "class", "modal-overlay");
        attr_dev(div11, "aria-label", "Close");
        add_location(div11, file, 275, 4, 8622);
        attr_dev(button8, "class", "btn btn-clear float-right");
        attr_dev(button8, "aria-label", "Close");
        add_location(button8, file, 278, 12, 8776);
        attr_dev(div12, "class", "modal-title h5");
        add_location(div12, file, 283, 12, 8936);
        attr_dev(div13, "class", "modal-header");
        add_location(div13, file, 277, 8, 8737);
        attr_dev(label3, "class", "form-label");
        attr_dev(label3, "for", "newTitle");
        add_location(label3, file, 288, 20, 9125);
        attr_dev(input2, "class", "form-input");
        attr_dev(input2, "type", "text");
        attr_dev(input2, "id", "newTitle");
        attr_dev(input2, "placeholder", "book title");
        add_location(input2, file, 289, 20, 9200);
        attr_dev(div14, "class", "form-group");
        add_location(div14, file, 287, 16, 9080);
        attr_dev(label4, "class", "form-label");
        attr_dev(label4, "for", "newAuthor");
        add_location(label4, file, 298, 20, 9532);
        attr_dev(input3, "class", "form-input");
        attr_dev(input3, "type", "text");
        attr_dev(input3, "id", "newAuthor");
        attr_dev(input3, "placeholder", "book author");
        add_location(input3, file, 299, 20, 9609);
        attr_dev(div15, "class", "form-group");
        add_location(div15, file, 297, 16, 9487);
        attr_dev(label5, "class", "form-label");
        attr_dev(label5, "for", "newDescription");
        add_location(label5, file, 308, 20, 9944);
        attr_dev(textarea1, "class", "form-input");
        attr_dev(textarea1, "rows", "5");
        attr_dev(textarea1, "id", "newDescription");
        attr_dev(textarea1, "placeholder", "book description");
        add_location(textarea1, file, 311, 20, 10077);
        attr_dev(div16, "class", "form-group");
        add_location(div16, file, 307, 16, 9899);
        attr_dev(div17, "class", "content");
        add_location(div17, file, 286, 12, 9042);
        attr_dev(div18, "class", "modal-body");
        add_location(div18, file, 285, 8, 9005);
        attr_dev(button9, "class", "btn btn-primary");
        add_location(button9, file, 322, 12, 10447);
        attr_dev(button10, "class", "btn btn-link");
        add_location(button10, file, 324, 12, 10542);
        attr_dev(div19, "class", "modal-footer");
        add_location(div19, file, 321, 8, 10408);
        attr_dev(div20, "class", "modal-container");
        add_location(div20, file, 276, 4, 8699);
        attr_dev(div21, "class", "modal");
        attr_dev(div21, "id", "modal-update");
        toggle_class(div21, "active", ctx[5]);
        add_location(div21, file, 274, 0, 8554);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, header, anchor);
        append_dev(header, section0);
        append_dev(section0, button0);
        append_dev(header, t1);
        append_dev(header, section1);
        append_dev(section1, h1);
        append_dev(header, t3);
        append_dev(header, section2);
        append_dev(section2, nav);
        append_dev(nav, button1);
        append_dev(nav, t5);
        append_dev(nav, button2);
        append_dev(nav, t7);
        append_dev(nav, button3);
        append_dev(nav, t9);
        append_dev(nav, button4);
        insert_dev(target, t11, anchor);
        insert_dev(target, main, anchor);
        append_dev(main, section3);
        append_dev(section3, table);
        append_dev(table, thead);
        append_dev(thead, tr);
        append_dev(tr, th0);
        append_dev(tr, t12);
        append_dev(tr, th1);
        append_dev(tr, t14);
        append_dev(tr, th2);
        append_dev(tr, t16);
        append_dev(tr, th3);
        append_dev(tr, t18);
        append_dev(tr, th4);
        append_dev(tr, t20);
        append_dev(tr, th5);
        append_dev(table, t22);
        append_dev(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(tbody, null);
        }
        insert_dev(target, t23, anchor);
        insert_dev(target, div10, anchor);
        append_dev(div10, div0);
        append_dev(div10, t24);
        append_dev(div10, div9);
        append_dev(div9, div2);
        append_dev(div2, button5);
        append_dev(div2, t25);
        append_dev(div2, div1);
        append_dev(div9, t27);
        append_dev(div9, div7);
        append_dev(div7, div6);
        append_dev(div6, div3);
        append_dev(div3, label0);
        append_dev(div3, t29);
        append_dev(div3, input0);
        set_input_value(input0, ctx[1].title);
        append_dev(div6, t30);
        append_dev(div6, div4);
        append_dev(div4, label1);
        append_dev(div4, t32);
        append_dev(div4, input1);
        set_input_value(input1, ctx[1].author);
        append_dev(div6, t33);
        append_dev(div6, div5);
        append_dev(div5, label2);
        append_dev(div5, t35);
        append_dev(div5, textarea0);
        set_input_value(textarea0, ctx[1].description);
        append_dev(div9, t36);
        append_dev(div9, div8);
        append_dev(div8, button6);
        append_dev(div8, t38);
        append_dev(div8, button7);
        insert_dev(target, t40, anchor);
        insert_dev(target, div21, anchor);
        append_dev(div21, div11);
        append_dev(div21, t41);
        append_dev(div21, div20);
        append_dev(div20, div13);
        append_dev(div13, button8);
        append_dev(div13, t42);
        append_dev(div13, div12);
        append_dev(div20, t44);
        append_dev(div20, div18);
        append_dev(div18, div17);
        append_dev(div17, div14);
        append_dev(div14, label3);
        append_dev(div14, t46);
        append_dev(div14, input2);
        set_input_value(input2, ctx[2].title);
        append_dev(div17, t47);
        append_dev(div17, div15);
        append_dev(div15, label4);
        append_dev(div15, t49);
        append_dev(div15, input3);
        set_input_value(input3, ctx[2].author);
        append_dev(div17, t50);
        append_dev(div17, div16);
        append_dev(div16, label5);
        append_dev(div16, t52);
        append_dev(div16, textarea1);
        set_input_value(textarea1, ctx[2].description);
        append_dev(div20, t53);
        append_dev(div20, div19);
        append_dev(div19, button9);
        append_dev(div19, t55);
        append_dev(div19, button10);
        if (!mounted) {
          dispose = [
            listen_dev(button0, "click", ctx[12], false, false, false),
            listen_dev(button1, "click", ctx[15], false, false, false),
            listen_dev(button2, "click", ctx[16], false, false, false),
            listen_dev(button3, "click", ctx[17], false, false, false),
            listen_dev(button4, "click", ctx[18], false, false, false),
            listen_dev(th1, "click", ctx[14], false, false, false),
            listen_dev(div0, "click", ctx[12], false, false, false),
            listen_dev(button5, "click", ctx[12], false, false, false),
            listen_dev(input0, "input", ctx[19]),
            listen_dev(input1, "input", ctx[20]),
            listen_dev(textarea0, "input", ctx[21]),
            listen_dev(button6, "click", ctx[22], false, false, false),
            listen_dev(button7, "click", ctx[12], false, false, false),
            listen_dev(div11, "click", ctx[13], false, false, false),
            listen_dev(button8, "click", ctx[13], false, false, false),
            listen_dev(input2, "input", ctx[23]),
            listen_dev(input3, "input", ctx[24]),
            listen_dev(textarea1, "input", ctx[25]),
            listen_dev(button9, "click", ctx[9], false, false, false),
            listen_dev(button10, "click", ctx[13], false, false, false)
          ];
          mounted = true;
        }
      },
      p: function update2(ctx2, [dirty]) {
        if (dirty & 8) {
          toggle_class(button1, "btn-primary", ctx2[3] === "all");
        }
        if (dirty & 8) {
          toggle_class(button2, "btn-primary", ctx2[3] === "book");
        }
        if (dirty & 8) {
          toggle_class(button3, "btn-primary", ctx2[3] === "user");
        }
        if (dirty & 8) {
          toggle_class(button4, "btn-primary", ctx2[3] === "role");
        }
        if (dirty & 3329) {
          each_value = ctx2[0];
          validate_each_argument(each_value);
          validate_each_keys(ctx2, each_value, get_each_context, get_key);
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, tbody, destroy_block, create_each_block, null, get_each_context);
        }
        if (dirty & 2 && input0.value !== ctx2[1].title) {
          set_input_value(input0, ctx2[1].title);
        }
        if (dirty & 2 && input1.value !== ctx2[1].author) {
          set_input_value(input1, ctx2[1].author);
        }
        if (dirty & 2) {
          set_input_value(textarea0, ctx2[1].description);
        }
        if (dirty & 16) {
          toggle_class(div10, "active", ctx2[4]);
        }
        if (dirty & 4 && input2.value !== ctx2[2].title) {
          set_input_value(input2, ctx2[2].title);
        }
        if (dirty & 4 && input3.value !== ctx2[2].author) {
          set_input_value(input3, ctx2[2].author);
        }
        if (dirty & 4) {
          set_input_value(textarea1, ctx2[2].description);
        }
        if (dirty & 32) {
          toggle_class(div21, "active", ctx2[5]);
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching)
          detach_dev(header);
        if (detaching)
          detach_dev(t11);
        if (detaching)
          detach_dev(main);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
        if (detaching)
          detach_dev(t23);
        if (detaching)
          detach_dev(div10);
        if (detaching)
          detach_dev(t40);
        if (detaching)
          detach_dev(div21);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }
  function instance($$self, $$props, $$invalidate) {
    let {$$slots: slots = {}, $$scope} = $$props;
    validate_slots("App", slots, []);
    let books = [], addBookForm = {title: "", author: "", description: ""}, editForm = {
      _id: "",
      title: "",
      author: "",
      description: ""
    }, type = "all";
    onMount(() => getAll("*"));
    async function getAll(type2) {
      $$invalidate(0, books = await fetch(`/api/${type2}`).then((res) => res.json()));
    }
    function addBook() {
      const payload = {
        title: addBookForm.title,
        author: addBookForm.author,
        description: addBookForm.description
      };
      const path = "/api/book:";
      fetch(path, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      }).then(() => {
        getAll("*");
      }).catch((error) => {
        console.log(error);
        getAll("*");
      });
    }
    async function editBook(book) {
      $$invalidate(2, editForm = await fetch(`/api/books/${book._id}`).then((res) => res.json()));
      updatetoggle();
    }
    function updateBook() {
      const payload = {
        title: editForm.title,
        author: editForm.author,
        description: editForm.description
      };
      const path = `/api/books/${editForm._id}`;
      fetch(path, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      }).then(() => {
        getAll("*");
      }).catch((error) => {
        console.error(error);
        getAll("*");
      });
      updatetoggle();
    }
    async function copyBook(book) {
      $$invalidate(1, addBookForm = await fetch(`/api/books/${book._id}`).then((res) => res.json()));
      addBook();
    }
    function removeBook(bookID) {
      const path = `/api/books/${bookID._id}`;
      fetch(path, {method: "DELETE"}).then(() => {
        getAll("*");
      }).catch((error) => {
        console.error(error);
        getAll("*");
      });
    }
    function initForm() {
      $$invalidate(1, addBookForm.title = "", addBookForm);
      $$invalidate(1, addBookForm.author = "", addBookForm);
      $$invalidate(1, addBookForm.description = "", addBookForm);
      $$invalidate(2, editForm._id = "", editForm);
      $$invalidate(2, editForm.title = "", editForm);
      $$invalidate(2, editForm.author = "", editForm);
      $$invalidate(2, editForm.description = "", editForm);
    }
    let addopen = false, updateopen = false;
    function addtoggle() {
      initForm();
      $$invalidate(4, addopen = !addopen);
    }
    function updatetoggle() {
      $$invalidate(5, updateopen = !updateopen);
    }
    function sortby(items) {
      $$invalidate(0, books = books.sort((a, b) => {
        return b._id - a._id;
      }));
      console.log("sort");
    }
    const writable_props = [];
    Object.keys($$props).forEach((key) => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console_1.warn(`<App> was created with unknown prop '${key}'`);
    });
    const click_handler = () => (getAll("*"), $$invalidate(3, type = "all"));
    const click_handler_1 = () => (getAll("book*"), $$invalidate(3, type = "book"));
    const click_handler_2 = () => (getAll("user*"), $$invalidate(3, type = "user"));
    const click_handler_3 = () => (getAll("role*"), $$invalidate(3, type = "role"));
    function input0_input_handler() {
      addBookForm.title = this.value;
      $$invalidate(1, addBookForm);
    }
    function input1_input_handler() {
      addBookForm.author = this.value;
      $$invalidate(1, addBookForm);
    }
    function textarea0_input_handler() {
      addBookForm.description = this.value;
      $$invalidate(1, addBookForm);
    }
    const click_handler_4 = () => (addBook(), addtoggle());
    function input2_input_handler() {
      editForm.title = this.value;
      $$invalidate(2, editForm);
    }
    function input3_input_handler() {
      editForm.author = this.value;
      $$invalidate(2, editForm);
    }
    function textarea1_input_handler() {
      editForm.description = this.value;
      $$invalidate(2, editForm);
    }
    $$self.$capture_state = () => ({
      onMount,
      fly,
      books,
      addBookForm,
      editForm,
      type,
      getAll,
      addBook,
      editBook,
      updateBook,
      copyBook,
      removeBook,
      initForm,
      addopen,
      updateopen,
      addtoggle,
      updatetoggle,
      sortby
    });
    $$self.$inject_state = ($$props2) => {
      if ("books" in $$props2)
        $$invalidate(0, books = $$props2.books);
      if ("addBookForm" in $$props2)
        $$invalidate(1, addBookForm = $$props2.addBookForm);
      if ("editForm" in $$props2)
        $$invalidate(2, editForm = $$props2.editForm);
      if ("type" in $$props2)
        $$invalidate(3, type = $$props2.type);
      if ("addopen" in $$props2)
        $$invalidate(4, addopen = $$props2.addopen);
      if ("updateopen" in $$props2)
        $$invalidate(5, updateopen = $$props2.updateopen);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 1) {
        $:
          console.log(books);
      }
    };
    return [
      books,
      addBookForm,
      editForm,
      type,
      addopen,
      updateopen,
      getAll,
      addBook,
      editBook,
      updateBook,
      copyBook,
      removeBook,
      addtoggle,
      updatetoggle,
      sortby,
      click_handler,
      click_handler_1,
      click_handler_2,
      click_handler_3,
      input0_input_handler,
      input1_input_handler,
      textarea0_input_handler,
      click_handler_4,
      input2_input_handler,
      input3_input_handler,
      textarea1_input_handler
    ];
  }
  var App = class extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "App",
        options,
        id: create_fragment.name
      });
    }
  };
  var App_default = App;
  require_();

  // src/client/main.js
  var app = new App_default({
    target: document.body,
    props: {}
  });
  var main_default = app;
})();
//# sourceMappingURL=client.js.map
