var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/.pnpm/derver@0.4.14/node_modules/derver/dist/derver.cjs.js
var require_derver_cjs = __commonJS((exports2) => {
  var Re = Object.create;
  var R = Object.defineProperty;
  var Ce = Object.getPrototypeOf;
  var Oe = Object.prototype.hasOwnProperty;
  var Te = Object.getOwnPropertyNames;
  var ke = Object.getOwnPropertyDescriptor;
  var z = (e) => R(e, "__esModule", {value: true});
  var L = (e, t) => () => (t || (t = {exports: {}}, e(t.exports, t)), t.exports);
  var Ne = (e, t) => {
    z(e);
    for (var r in t)
      R(e, r, {get: t[r], enumerable: true});
  };
  var Le = (e, t, r) => {
    if (z(e), typeof t == "object" || typeof t == "function")
      for (let i of Te(t))
        !Oe.call(e, i) && i !== "default" && R(e, i, {get: () => t[i], enumerable: !(r = ke(t, i)) || r.enumerable});
    return e;
  };
  var m = (e) => e && e.__esModule ? e : Le(R(Re(Ce(e)), "default", {value: e, enumerable: true}), e);
  var _ = L((Lt, oe) => {
    var C = require("fs"), ae = require("path"), et = require("os");
    function D(e, t) {
      return Object.prototype.toString.call(e) === "[object " + t + "]";
    }
    function W(e, t) {
      try {
        return t(e);
      } catch (r) {
        if (/^(ENOENT|EPERM|EACCES)$/.test(r.code))
          return r.code !== "ENOENT" && console.warn("Warning: Cannot access %s", e), false;
        throw r;
      }
    }
    var tt = {nil: function(e) {
      return e == null;
    }, array: function(e) {
      return Array.isArray(e);
    }, emptyObject: function(e) {
      for (var t in e)
        return false;
      return true;
    }, buffer: function(e) {
      return Buffer.isBuffer(e);
    }, regExp: function(e) {
      return D(e, "RegExp");
    }, string: function(e) {
      return D(e, "String");
    }, func: function(e) {
      return typeof e == "function";
    }, number: function(e) {
      return D(e, "Number");
    }, exists: function(e) {
      return C.existsSync(e);
    }, file: function(e) {
      return W(e, function(t) {
        return C.statSync(t).isFile();
      });
    }, samePath: function(e, t) {
      return ae.resolve(e) === ae.resolve(t);
    }, directory: function(e) {
      return W(e, function(t) {
        return C.statSync(t).isDirectory();
      });
    }, symbolicLink: function(e) {
      return W(e, function(t) {
        return C.lstatSync(t).isSymbolicLink();
      });
    }, windows: function() {
      return et.platform() === "win32";
    }};
    oe.exports = tt;
  });
  var fe = L((jt, ce) => {
    var E = require("fs"), se = require("os"), A = require("path"), O = _(), S, rt = se.tmpdir && se.tmpdir() || process.env.TMPDIR || process.env.TEMP || process.cwd();
    function le() {
      this.stack = [];
    }
    le.prototype = {create: function(e, t) {
      var r = A.join(t, "node-watch-" + Math.random().toString(16).substr(2));
      return this.stack.push({name: r, type: e}), r;
    }, write: function() {
      for (var e = 0; e < arguments.length; ++e)
        E.writeFileSync(arguments[e], " ");
    }, mkdir: function() {
      for (var e = 0; e < arguments.length; ++e)
        E.mkdirSync(arguments[e]);
    }, cleanup: function(e) {
      try {
        for (var t; t = this.stack.pop(); ) {
          var r = t.type, i = t.name;
          r === "file" && O.file(i) ? E.unlinkSync(i) : r === "dir" && O.directory(i) && E.rmdirSync(i);
        }
      } finally {
        O.func(e) && e();
      }
    }};
    var ue = false;
    ce.exports = function e(t) {
      if (!O.func(t))
        return false;
      if (S !== void 0)
        return t(S);
      if (!ue)
        ue = true;
      else
        return setTimeout(function() {
          e(t);
        }, 300);
      var r = new le(), i = r.create("dir", rt), n = r.create("dir", i), a = r.create("file", n);
      r.mkdir(i, n);
      var o = {recursive: true}, c;
      try {
        c = E.watch(i, o);
      } catch (u) {
        if (u.code == "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM")
          return t(S = false);
        throw u;
      }
      if (!c)
        return false;
      var s = setTimeout(function() {
        c.close(), r.cleanup(function() {
          t(S = false);
        });
      }, 200);
      c.on("change", function(u, d) {
        A.basename(a) === A.basename(d) && (c.close(), clearTimeout(s), r.cleanup(function() {
          t(S = true);
        }));
      }), r.write(a);
    };
  });
  var be = L((Mt, I) => {
    var F = require("fs"), x = require("path"), de = require("util"), he = require("events"), me = fe(), l = _(), nt = "update", pe = "remove", T = Symbol("skip");
    function it(e) {
      return e.some(function(t, r, i) {
        return i.indexOf(t) !== r;
      });
    }
    function U(e) {
      return e.filter(function(t, r, i) {
        return i.indexOf(t) === r;
      });
    }
    function ot(e) {
      return e.reduce(function(t, r) {
        return t.concat(r);
      }, []);
    }
    function at(e) {
      if (e && e !== "buffer" && !Buffer.isEncoding(e))
        throw new Error("Unknown encoding: " + e);
    }
    function ct(e) {
      return function(t, r) {
        if (l.func(e)) {
          var i = e(t, T);
          i && i !== T && r();
        } else
          l.regExp(e) ? e.test(t) && r() : r();
      };
    }
    function st(e) {
      return e.map(function(t) {
        return l.exists(t) ? [nt, t] : [pe, t];
      });
    }
    function lt(e) {
      var t = U(e), r = /~$|^\.#|^##$/g, i = e.some(function(o) {
        return r.test(o);
      });
      if (i) {
        var n = it(e.map(function(o) {
          return o.replace(r, "");
        }));
        n && (t = t.filter(function(o) {
          return l.exists(o);
        }));
      }
      if (l.windows()) {
        var a = t.map(function(o) {
          return x.parse(o).dir;
        });
        t = t.filter(function(o) {
          return l.exists(o) ? !a.some(function(c) {
            return l.samePath(o, c);
          }) : true;
        });
      }
      return st(t);
    }
    function ut(e, t) {
      var r, i = [], n = e.options.encoding, a = e.options.delay;
      l.number(a) || (a = 200);
      function o() {
        lt(i).forEach(function(c) {
          c[1] = Buffer.from(c[1]), n !== "buffer" && (c[1] = c[1].toString(n)), t.apply(null, c);
        }), r = null, i = [];
      }
      return function(c, s) {
        i.push(s), r || (r = setTimeout(o, a));
      };
    }
    function ve() {
      var e = {};
      return function(t) {
        return function(r, i) {
          e[r + i] = [r, i], setTimeout(function() {
            Object.keys(e).forEach(function(n) {
              t.apply(null, e[n]);
            }), e = {};
          });
        };
      };
    }
    function ge(e, t, r = function() {
    }) {
      l.directory(e) ? F.readdir(e, function(i, n) {
        if (i)
          if (/^(EPERM|EACCES)$/.test(i.code))
            console.warn("Warning: Cannot access %s.", e);
          else
            throw i;
        else
          n.forEach(function(a) {
            var o = x.join(e, a);
            l.directory(o) && t(o);
          }), r();
      }) : r();
    }
    function ft(e) {
      var t = 0;
      return function() {
        return t++, function() {
          t--, t === 0 && e();
        };
      };
    }
    function dt() {
      return function() {
      };
    }
    function we(e, t) {
      return !l.func(t) || t(e, T) !== T;
    }
    var ye = de.deprecate(function() {
    }, "(node-watch) First param in callback function  is replaced with event name since 0.5.0, use  `(evt, filename) => {}` if you want to get the filename");
    function p() {
      he.EventEmitter.call(this), this.watchers = {}, this._isReady = false, this._isClosed = false;
    }
    de.inherits(p, he.EventEmitter);
    p.prototype.expose = function() {
      var e = {}, t = this, r = ["on", "emit", "once", "close", "isClosed", "listeners", "setMaxListeners", "getMaxListeners", "getWatchedPaths"];
      return r.forEach(function(i) {
        e[i] = function() {
          return t[i].apply(t, arguments);
        };
      }), e;
    };
    p.prototype.isClosed = function() {
      return this._isClosed;
    };
    p.prototype.close = function(e) {
      var t = this;
      if (e) {
        var r = this.watchers[e];
        r && r.close && (r.close(), delete t.watchers[e]), ge(e, function(i) {
          t.close(i);
        });
      } else
        Object.keys(t.watchers).forEach(function(i) {
          var n = t.watchers[i];
          n && n.close && n.close();
        }), this.watchers = {};
      l.emptyObject(t.watchers) && (this._isClosed = true, process.nextTick(xe, this));
    };
    p.prototype.getWatchedPaths = function(e) {
      if (l.func(e)) {
        var t = this;
        t._isReady ? e(Object.keys(t.watchers)) : t.on("ready", function() {
          e(Object.keys(t.watchers));
        });
      }
    };
    function H(e) {
      e._isReady || (e._isReady = true, process.nextTick(function() {
        e.emit("ready");
      }));
    }
    function xe(e) {
      e.emit("close");
    }
    p.prototype.add = function(e, t) {
      var r = this;
      t = t || {fpath: ""};
      var i = x.resolve(t.fpath);
      this.watchers[i] = e;
      var n = function(o, c) {
        if (r.isClosed())
          return;
        var s = c;
        l.nil(s) && (s = ""), s = x.join(t.fpath, s), t.options.recursive && me(function(u) {
          if (!u) {
            var d = x.resolve(s);
            if (!l.exists(s))
              r.close(d);
            else {
              var g = l.directory(s) && !r.watchers[d] && we(s, t.options.filter);
              g && r.watchDirectory(s, t.options);
            }
          }
        }), a(o, s);
      }, a = ut(t, function(o, c) {
        if (t.compareName)
          t.compareName(c) && r.emit("change", o, c);
        else {
          var s = ct(t.options.filter);
          s(c, function() {
            r.flag ? r.flag = "" : r.emit("change", o, c);
          });
        }
      });
      e.on("error", function(o) {
        if (r.isClosed())
          return;
        l.windows() && o.code === "EPERM" ? (e.emit("change", pe, t.fpath && ""), r.flag = "windows-error", r.close(i)) : r.emit("error", o);
      }), e.on("change", n);
    };
    p.prototype.watchFile = function(e, t, r) {
      var i = x.join(e, "../"), n = Object.assign({}, t, {filter: null, encoding: "utf8"});
      delete n.recursive;
      var a = F.watch(i, n);
      this.add(a, {type: "file", fpath: i, options: Object.assign({}, n, {encoding: t.encoding}), compareName: function(o) {
        return l.samePath(o, e);
      }}), l.func(r) && (r.length === 1 && ye(), this.on("change", r));
    };
    p.prototype.watchDirectory = function(e, t, r, i = dt) {
      var n = this, a = i();
      me(function(o) {
        t.recursive = !!t.recursive;
        var c = Object.assign({}, t, {encoding: "utf8"});
        o || delete c.recursive;
        var s = F.watch(e, c);
        n.add(s, {type: "dir", fpath: e, options: t}), l.func(r) && (r.length === 1 && ye(), n.on("change", r)), t.recursive && !o && ge(e, function(u) {
          we(u, t.filter) && n.watchDirectory(u, t, null, i);
        }, i()), a();
      });
    };
    function ht(e) {
      var t = new p(), r = ve(), i = e.length;
      return e.forEach(function(n) {
        n.on("change", r(function(a, o) {
          t.emit("change", a, o);
        })), n.on("error", function(a) {
          t.emit("error", a);
        }), n.on("ready", function() {
          --i || H(t);
        });
      }), t.close = function() {
        e.forEach(function(n) {
          n.close();
        }), process.nextTick(xe, t);
      }, t.getWatchedPaths = function(n) {
        if (l.func(n)) {
          var a = e.map(function(o) {
            return new Promise(function(c) {
              o.getWatchedPaths(c);
            });
          });
          Promise.all(a).then(function(o) {
            var c = U(ot(o));
            n(c);
          });
        }
      }, t.expose();
    }
    function k(e, t, r) {
      var i = new p();
      if (l.buffer(e) && (e = e.toString()), !l.array(e) && !l.exists(e) && i.emit("error", new Error(e + " does not exist.")), l.string(t) && (t = {encoding: t}), l.func(t) && (r = t, t = {}), arguments.length < 2 && (t = {}), t.encoding ? at(t.encoding) : t.encoding = "utf8", l.array(e)) {
        if (e.length === 1)
          return k(e[0], t, r);
        var n = ve();
        return ht(U(e).map(function(o) {
          var c = k(o, t);
          return l.func(r) && c.on("change", n(r)), c;
        }));
      }
      if (l.file(e))
        i.watchFile(e, t, r), H(i);
      else if (l.directory(e)) {
        var a = ft(function() {
          H(i);
        });
        i.watchDirectory(e, t, r, a);
      }
      return i.expose();
    }
    I.exports = k;
    I.exports.default = k;
  });
  Ne(exports2, {createRemote: () => Q, derver: () => pt});
  var ee = m(require("http"));
  var b = m(require("fs/promises"));
  var te = m(require("os"));
  var y = m(require("path"));
  var $ = m(require("zlib"));
  var je = "text/html";
  var Me = "text/html";
  var Pe = "image/jpeg";
  var $e = "image/jpeg";
  var De = "image/gif";
  var We = "image/png";
  var _e = "image/svg+xml";
  var Ae = "text/javascript";
  var Ie = "application/json";
  var Fe = "text/css";
  var Ue = "image/x-icon";
  var j = {".htm": je, ".html": Me, ".jpg": Pe, ".jpeg": $e, ".gif": De, ".png": We, ".svg": _e, ".js": Ae, ".json": Ie, ".css": Fe, ".ico": Ue};
  var v = (e, t, r) => `[${t}m${e}[${r}m`;
  var f = {blue: (e) => v(e, 34, 39), red: (e) => v(e, 31, 39), green: (e) => v(e, 32, 39), yellow: (e) => v(e, 33, 39), magenta: (e) => v(e, 35, 39), cyan: (e) => v(e, 36, 39), gray: (e) => v(e, 90, 39), bold: (e) => v(e, 1, 22), italic: (e) => v(e, 3, 23)};
  function B() {
    let e = 2, t = [];
    const r = {line: (i = "", n, a) => {
      const o = i.length;
      return o + 2 > e && (e = o + 2), n && (i = f[n](i)), a && (i = f[a](i)), t.push([i, o]), r;
    }, print: (i = 0, n) => {
      let a = " ".repeat(i), o = `${a}\u2554${"\u2550".repeat(e)}\u2557`, c = `${a}\u255A${"\u2550".repeat(e)}\u255D`, s = `${a}\u2551`, u = "\u2551";
      n && (o = f[n](o), c = f[n](c), s = f[n](s), u = f[n](u)), console.log(o);
      for (let d of t) {
        const g = Math.floor((e - d[1]) / 2), N = e - d[1] - g;
        console.log(`${s}${" ".repeat(g)}${d[0]}${" ".repeat(N)}${u}`);
      }
      return console.log(c), r;
    }};
    return r;
  }
  var G = m(require("http"));
  var J = m(require("os"));
  var K = m(require("path"));
  var M = m(require("fs"));
  var V = "/derver-livereload-events";
  var Y = "/derver-livereload-remote";
  var P = new Set();
  function w(e, t, r) {
    P.forEach((i) => {
      typeof i[e] == "function" && i[e](t, r);
    });
  }
  function Q(e) {
    const t = typeof e == "string" ? e : false;
    let r = "localhost", i = 7e3;
    t || (e && e.host && (r = e.host), e && e.port && (i = e.port));
    function n(a, o) {
      return new Promise((c) => {
        const s = t && He(t);
        s && s.host && (hostname = s.host), s && s.port && (i = s.port);
        const u = {hostname: s && s.host || r, port: s && s.port || i, path: Y, method: "POST", headers: {"Content-Type": "application/json"}}, d = G.default.request(u, (g) => {
          g.on("data", (N) => {
            N.toString() === "REMOTE OK" ? c("OK") : (console.log("[Derver remote]: Warning: wrong command " + a), c("WARNING"));
          });
        });
        d.on("error", (g) => {
          console.log("[Derver remote]: Warning:" + g.message), c("WARNING");
        }), d.write(JSON.stringify({command: a, data: o || {}})), d.end();
      });
    }
    return {reload() {
      return n("reload");
    }, console(a) {
      return n("console", {text: a});
    }, error(a, o) {
      return n("error", {text: a, header: o});
    }};
  }
  function X(e) {
    return !e.watch && !e.remote ? null : function(t, r, i) {
      if (t.url == V) {
        const n = (o, c) => r.write(`event: ${o}
data: ${JSON.stringify(c || {})}

`), a = {reload: () => n("refresh"), console: (o) => n("console", {text: o}), error: (o, c) => n("srverror", {text: o, header: c || "Error"})};
        P.add(a), r.writeHead(200, {"Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive"}), r.on("close", function() {
          P.delete(a);
        }), r.write(`data: connected

`);
      } else if (e.remote && t.url == Y)
        if (t.method == "POST") {
          let n = "";
          t.on("data", (a) => {
            n += a.toString();
          }), t.on("end", () => {
            const a = JSON.parse(n || "{}");
            if (a.command == "reload")
              w("reload");
            else if (a.command == "console")
              w("console", a.data.text);
            else if (a.command == "error")
              w("error", a.data.text, a.data.header);
            else
              return r.end("REMOTE WRONG COMMAND");
            r.end("REMOTE OK");
          });
        } else
          i();
      else
        i();
    };
  }
  function ze() {
    return function(e) {
      let t;
      function r() {
        if (window.EventSource) {
          let a2 = function(o) {
            return JSON.parse(o.data);
          };
          var a = a2;
          var n = new EventSource(e);
          n.addEventListener("refresh", function(o) {
            location.reload();
          }, false), n.addEventListener("console", function(o) {
            console.log(a2(o).text);
          }, false), n.addEventListener("srverror", function(o) {
            let c = a2(o);
            i(c.header, c.text);
          }, false), n.addEventListener("open", function(o) {
            t && location.reload(), console.log("[Livereload] Ready");
          }, false), n.addEventListener("error", function(o) {
            o.eventPhase == EventSource.CLOSED && n.close(), o.target.readyState == EventSource.CLOSED ? (console.log("[Livereload] Disconnected! Retry in 5s..."), !t && i("Disconnected!", "Connection with server was lost."), t = setTimeout(r, 5e3)) : o.target.readyState == EventSource.CONNECTING && console.log("[Livereload] Connecting...");
          }, false);
        } else
          console.error("[Livereload] Can't start Livereload! Your browser doesn't support SSE");
      }
      function i(n, a) {
        const o = document.createElement("div");
        o.innerHTML = `
                  <div class="lrmsg-bg">
                    <div class="lrmsg-modal">
                      <div class="lrmsg-close" onclick="this.parentNode.parentNode.remove()">\xD7</div>
                      <div class="lrmsg-header">${n}</div>
                      <div class="lrmsg-content">${a}</div>
                    </div>
                  </div>
                  <style>
                    .lrmsg-bg{
                      font-family: Verdana, Geneva, sans-serif;
                      font-size: 16px;
                      background: rgba(30, 30, 30, 0.6);
                      position: fixed;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      z-index: 1;
                    }

                    .lrmsg-modal{
                      position: relative;
                      max-width: 600px;
                      max-height: 400px;
                      margin: 40px auto; 
                      margin-top: 0px;
                      background-color: #1e1e1e;
                      border-top: 3px solid red;
                      border-radius: 5px;
                      opacity: 0;
                      animation: slide 0.3s forwards;
                      color: #cccccc;
                    }

                    .lrmsg-header{
                      font-weight: bold;
                      font-size: 18px;
                      padding: 10px;
                    }

                    .lrmsg-close{
                      float: right;
                      font-weight: bold;
                      color: #cccccc;
                      font-size: 25px;
                      margin: 3px 10px;
                      cursor: pointer;
                    }

                    .lrmsg-close:hover{color:#9a9a9a}

                    .lrmsg-content{
                      padding: 10px;
                      border-top: 1px solid #363636;
                    }

                    @keyframes slide {
                      100% { margin-top: 40px; opacity: 1;}
                  }
                  </style>
                `, document.body.append(o);
      }
      r();
    }.toString();
  }
  function Z(e) {
    return !e.watch && !e.remote ? null : function(t, r, i) {
      [".html", ".htm"].includes(t.extname) && (r.body = Buffer.from(r.body.toString("utf-8").replace(/(<\/body>)/, `<script>(${ze()})('${V}')</script>
$1`))), i();
    };
  }
  function He(e) {
    const t = J.default.tmpdir(), r = K.default.join(t, "derver_" + e);
    return M.default.existsSync(r) ? JSON.parse(M.default.readFileSync(r, "utf-8")) : false;
  }
  var q = "0.4.14";
  function re(e) {
    const t = e.watch === false && e.cache && e.compress;
    return new Promise(async (r, i) => {
      const n = await Ze(e), a = ee.default.createServer(function(c, s) {
        Be([Ge(e), Ke(e), Ve(e), ...e.middlewares.list(), X(e), Je(e), Ye(e), Z(e), Qe(e), Xe(e)], c, s);
      });
      a.on("listening", (c) => {
        r(a), B().line(t ? "Derver server started" : "Development server started", "bold").line("on").line(`http://${e.host}:${e.port}`, "blue").print(5, "green");
      }), a.on("error", (c) => {
        console.log(f.bold(`

Server starting error:`)), console.log("  " + f.red(c.toString()) + `

`), i(c.toString());
      }), a.listen(e.port, e.host);
      const o = async () => {
        await n(), a.close();
      };
      process.on("SIGTERM", o), process.on("exit", o);
    });
  }
  function ne() {
    const e = [];
    function t(n) {
      for (let a of n.middlewares)
        e.push(function(o, c, s) {
          if (n.method && n.method !== o.method)
            return s();
          if (n.pattern && n.pattern !== "") {
            const u = qe(n.pattern, o.url);
            if (!u || n.exact && !u.exact)
              return s();
            o.params = u.params;
          }
          a(o, c, s);
        });
    }
    function r(n, a, o) {
      n = Array.from(n);
      let c = n.length > 0 && typeof n[0] == "string" ? n.shift() : null;
      return c && !c.startsWith("/") && (c = "/" + c), {method: a == "use" ? null : a.toUpperCase(), pattern: (o || "") + (c || ""), exact: !(o && !c), middlewares: n.filter((s) => typeof s == "function")};
    }
    function i(n) {
      const a = new Proxy({}, {get(o, c) {
        return c == "list" ? () => e : c == "sub" ? function() {
          let s = Array.from(arguments), u = (n || "") + s.shift();
          s.forEach((d) => d(i(u)));
        } : function() {
          return t(r(arguments, c, n)), a;
        };
      }});
      return a;
    }
    return i();
  }
  function Be(e, t, r) {
    e.push((n, a) => a.send(a.body || ""));
    const i = () => {
      let n;
      for (; !n && e.length > 0; )
        n = e.shift();
      n && n(t, r, i);
    };
    i();
  }
  function Ge(e) {
    return function(t, r, i) {
      const n = new URL(t.url, "http://" + (t.headers.host || "derver.tld"));
      t.path = n.pathname, t.host = n.host, t.hostname = n.hostname, t.port = n.port, t.search = n.search, t.query = Array.from(n.searchParams).reduce((a, [o, c]) => (a[o] = c, a), {}), i();
    };
  }
  function Je(e) {
    return async function(t, r, i) {
      t.file = y.default.join(e.dir, t.path), t.extname = y.default.extname(t.file), t.extname === "" && (t.file = y.default.join(t.file, e.index), t.extname = y.default.extname(t.file)), t.exists = await ie(t.file), e.spa && !t.exists && t.extname === y.default.extname(e.index) && (t.file = y.default.join(e.dir, e.index), t.exists = await ie(t.file)), i();
    };
  }
  function Ke(e) {
    return function(t, r, i) {
      r.send = function(n) {
        r.writeHead(200), r.end(n);
      }, i();
    };
  }
  function Ve(e) {
    return function(t, r, i) {
      r.setHeader("Server", "Derver/" + q), i();
    };
  }
  function Ye(e) {
    return async function(t, r, i) {
      if (!t.exists)
        return console.log(f.gray("  [web] ") + t.url + " - " + f.red("404 Not Found")), r.writeHead(404, {"Content-Type": "text/plain"}), r.end("Not found");
      j[t.extname] && r.setHeader("Content-Type", j[t.extname]), r.body = await b.default.readFile(t.file), console.log(f.gray("  [web] ") + t.url + " - " + f.green("200 OK")), i();
    };
  }
  function Qe(e) {
    return e.compress ? function(t, r, i) {
      t.headers["accept-encoding"] && (t.headers["accept-encoding"].includes("br") ? (r.setHeader("Content-Encoding", "br"), r.body = $.default.brotliCompressSync(r.body)) : t.headers["accept-encoding"].includes("gzip") && (r.setHeader("Content-Encoding", "gzip"), r.body = $.default.gzipSync(r.body))), i();
    } : null;
  }
  function Xe(e) {
    return e.cache ? function(t, r, i) {
      typeof e.cache != "number" && (e.cache = 31536e3), r.setHeader("Cache-Control", "max-age=" + e.cache), i();
    } : null;
  }
  function qe(e, t) {
    e = e.endsWith("/") ? e : e + "/", t = t.endsWith("/") ? t : t + "/";
    const r = [];
    let i = {}, n = true, a = e.split("/").map((c) => c.startsWith(":") ? (r.push(c.slice(1)), "([^\\/]+)") : c).join("\\/"), o = t.match(new RegExp(`^${a}$`));
    return o || (n = false, o = t.match(new RegExp(`^${a}`))), o ? (r.forEach((c, s) => i[c] = o[s + 1]), {exact: n, params: i, part: o[0].slice(0, -1)}) : null;
  }
  async function Ze(e) {
    const t = te.default.tmpdir();
    if (typeof e.remote != "string")
      return () => {
      };
    const r = y.default.join(t, "derver_" + e.remote);
    return await b.default.writeFile(r, JSON.stringify({host: e.host, port: e.port})), async () => await b.default.unlink(r);
  }
  async function ie(e) {
    try {
      return await b.default.stat(e), true;
    } catch {
      return false;
    }
  }
  var Ee = m(be());
  function Se(e) {
    if (typeof e.watch == "string" && (e.watch = [e.watch]), e.watch) {
      console.log(f.yellow(`       Waiting for changes...

`));
      const t = [];
      process.on("SIGTERM", () => t.forEach((n) => n.close())), process.on("exit", () => t.forEach((n) => n.close()));
      const r = new Set(), i = (n, a) => {
        if (r.has(n))
          return;
        r.add(n), setTimeout(() => r.delete(n), 100), a();
      };
      for (let n of e.watch)
        t.push(Ee.default(n, {recursive: true}, async function(a, o) {
          i(n, () => console.log(f.gray("[watch] ") + "Changes in " + f.blue(n)));
          let c = true;
          typeof e.onwatch == "function" && await e.onwatch({prevent: () => c = false, reload: () => w("reload"), console: (s) => w("console", s), error: (s, u) => w("error", s, u)}, n, o, a), c && w("reload");
        }));
    }
  }
  var mt = {port: 7e3, host: "localhost", index: "index.html", dir: "public", compress: false, cache: false, spa: false, watch: null, onwatch: null, remote: false};
  function pt(e) {
    const t = Object.assign(mt, e, {middlewares: ne()});
    return (async () => {
      t.watch === null && (t.watch = t.dir);
      try {
        await re(t);
      } catch (r) {
        console.log(r.message), process.exit(1);
      }
      Se(t);
    })(), t.middlewares;
  }
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/utils.js
var require_utils = __commonJS((exports2, module2) => {
  "use strict";
  function replyToObject(reply) {
    if (reply.length === 0 || !(reply instanceof Array)) {
      return null;
    }
    var obj = {};
    for (var i = 0; i < reply.length; i += 2) {
      obj[reply[i].toString("binary")] = reply[i + 1];
    }
    return obj;
  }
  function replyToStrings(reply) {
    if (reply instanceof Buffer) {
      return reply.toString();
    }
    if (reply instanceof Array) {
      var res = new Array(reply.length);
      for (var i = 0; i < reply.length; i++) {
        res[i] = replyToStrings(reply[i]);
      }
      return res;
    }
    return reply;
  }
  function print2(err, reply) {
    if (err) {
      console.log(err.toString());
    } else {
      console.log("Reply: " + reply);
    }
  }
  var camelCase;
  function clone(obj) {
    var copy;
    if (Array.isArray(obj)) {
      copy = new Array(obj.length);
      for (var i = 0; i < obj.length; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;
    }
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      copy = {};
      var elems = Object.keys(obj);
      var elem;
      while (elem = elems.pop()) {
        if (elem === "tls") {
          copy[elem] = obj[elem];
          continue;
        }
        var snake_case = elem.replace(/[A-Z][^A-Z]/g, "_$&").toLowerCase();
        if (snake_case !== elem.toLowerCase()) {
          camelCase = true;
        }
        copy[snake_case] = clone(obj[elem]);
      }
      return copy;
    }
    return obj;
  }
  function convenienceClone(obj) {
    camelCase = false;
    obj = clone(obj) || {};
    if (camelCase) {
      obj.camel_case = true;
    }
    return obj;
  }
  function callbackOrEmit(self, callback, err, res) {
    if (callback) {
      callback(err, res);
    } else if (err) {
      self.emit("error", err);
    }
  }
  function replyInOrder(self, callback, err, res, queue) {
    var command_obj;
    if (queue) {
      command_obj = queue.peekBack();
    } else {
      command_obj = self.offline_queue.peekBack() || self.command_queue.peekBack();
    }
    if (!command_obj) {
      process.nextTick(function() {
        callbackOrEmit(self, callback, err, res);
      });
    } else {
      var tmp = command_obj.callback;
      command_obj.callback = tmp ? function(e, r) {
        tmp(e, r);
        callbackOrEmit(self, callback, err, res);
      } : function(e, r) {
        if (e) {
          self.emit("error", e);
        }
        callbackOrEmit(self, callback, err, res);
      };
    }
  }
  module2.exports = {
    reply_to_strings: replyToStrings,
    reply_to_object: replyToObject,
    print: print2,
    err_code: /^([A-Z]+)\s+(.+)$/,
    monitor_regex: /^[0-9]{10,11}\.[0-9]+ \[[0-9]+ .+\]( ".+?")+$/,
    clone: convenienceClone,
    callback_or_emit: callbackOrEmit,
    reply_in_order: replyInOrder
  };
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/command.js
var require_command = __commonJS((exports2, module2) => {
  "use strict";
  var betterStackTraces = /development/i.test(process.env.NODE_ENV) || /\bredis\b/i.test(process.env.NODE_DEBUG);
  function Command(command, args, callback, call_on_write) {
    this.command = command;
    this.args = args;
    this.buffer_args = false;
    this.callback = callback;
    this.call_on_write = call_on_write;
    if (betterStackTraces) {
      this.error = new Error();
    }
  }
  module2.exports = Command;
});

// node_modules/.pnpm/denque@1.5.0/node_modules/denque/index.js
var require_denque = __commonJS((exports2, module2) => {
  "use strict";
  function Denque(array, options2) {
    var options2 = options2 || {};
    this._head = 0;
    this._tail = 0;
    this._capacity = options2.capacity;
    this._capacityMask = 3;
    this._list = new Array(4);
    if (Array.isArray(array)) {
      this._fromArray(array);
    }
  }
  Denque.prototype.peekAt = function peekAt(index) {
    var i = index;
    if (i !== (i | 0)) {
      return void 0;
    }
    var len = this.size();
    if (i >= len || i < -len)
      return void 0;
    if (i < 0)
      i += len;
    i = this._head + i & this._capacityMask;
    return this._list[i];
  };
  Denque.prototype.get = function get2(i) {
    return this.peekAt(i);
  };
  Denque.prototype.peek = function peek() {
    if (this._head === this._tail)
      return void 0;
    return this._list[this._head];
  };
  Denque.prototype.peekFront = function peekFront() {
    return this.peek();
  };
  Denque.prototype.peekBack = function peekBack() {
    return this.peekAt(-1);
  };
  Object.defineProperty(Denque.prototype, "length", {
    get: function length() {
      return this.size();
    }
  });
  Denque.prototype.size = function size() {
    if (this._head === this._tail)
      return 0;
    if (this._head < this._tail)
      return this._tail - this._head;
    else
      return this._capacityMask + 1 - (this._head - this._tail);
  };
  Denque.prototype.unshift = function unshift(item) {
    if (item === void 0)
      return this.size();
    var len = this._list.length;
    this._head = this._head - 1 + len & this._capacityMask;
    this._list[this._head] = item;
    if (this._tail === this._head)
      this._growArray();
    if (this._capacity && this.size() > this._capacity)
      this.pop();
    if (this._head < this._tail)
      return this._tail - this._head;
    else
      return this._capacityMask + 1 - (this._head - this._tail);
  };
  Denque.prototype.shift = function shift() {
    var head = this._head;
    if (head === this._tail)
      return void 0;
    var item = this._list[head];
    this._list[head] = void 0;
    this._head = head + 1 & this._capacityMask;
    if (head < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2)
      this._shrinkArray();
    return item;
  };
  Denque.prototype.push = function push(item) {
    if (item === void 0)
      return this.size();
    var tail = this._tail;
    this._list[tail] = item;
    this._tail = tail + 1 & this._capacityMask;
    if (this._tail === this._head) {
      this._growArray();
    }
    if (this._capacity && this.size() > this._capacity) {
      this.shift();
    }
    if (this._head < this._tail)
      return this._tail - this._head;
    else
      return this._capacityMask + 1 - (this._head - this._tail);
  };
  Denque.prototype.pop = function pop() {
    var tail = this._tail;
    if (tail === this._head)
      return void 0;
    var len = this._list.length;
    this._tail = tail - 1 + len & this._capacityMask;
    var item = this._list[this._tail];
    this._list[this._tail] = void 0;
    if (this._head < 2 && tail > 1e4 && tail <= len >>> 2)
      this._shrinkArray();
    return item;
  };
  Denque.prototype.removeOne = function removeOne(index) {
    var i = index;
    if (i !== (i | 0)) {
      return void 0;
    }
    if (this._head === this._tail)
      return void 0;
    var size = this.size();
    var len = this._list.length;
    if (i >= size || i < -size)
      return void 0;
    if (i < 0)
      i += size;
    i = this._head + i & this._capacityMask;
    var item = this._list[i];
    var k;
    if (index < size / 2) {
      for (k = index; k > 0; k--) {
        this._list[i] = this._list[i = i - 1 + len & this._capacityMask];
      }
      this._list[i] = void 0;
      this._head = this._head + 1 + len & this._capacityMask;
    } else {
      for (k = size - 1 - index; k > 0; k--) {
        this._list[i] = this._list[i = i + 1 + len & this._capacityMask];
      }
      this._list[i] = void 0;
      this._tail = this._tail - 1 + len & this._capacityMask;
    }
    return item;
  };
  Denque.prototype.remove = function remove(index, count) {
    var i = index;
    var removed;
    var del_count = count;
    if (i !== (i | 0)) {
      return void 0;
    }
    if (this._head === this._tail)
      return void 0;
    var size = this.size();
    var len = this._list.length;
    if (i >= size || i < -size || count < 1)
      return void 0;
    if (i < 0)
      i += size;
    if (count === 1 || !count) {
      removed = new Array(1);
      removed[0] = this.removeOne(i);
      return removed;
    }
    if (i === 0 && i + count >= size) {
      removed = this.toArray();
      this.clear();
      return removed;
    }
    if (i + count > size)
      count = size - i;
    var k;
    removed = new Array(count);
    for (k = 0; k < count; k++) {
      removed[k] = this._list[this._head + i + k & this._capacityMask];
    }
    i = this._head + i & this._capacityMask;
    if (index + count === size) {
      this._tail = this._tail - count + len & this._capacityMask;
      for (k = count; k > 0; k--) {
        this._list[i = i + 1 + len & this._capacityMask] = void 0;
      }
      return removed;
    }
    if (index === 0) {
      this._head = this._head + count + len & this._capacityMask;
      for (k = count - 1; k > 0; k--) {
        this._list[i = i + 1 + len & this._capacityMask] = void 0;
      }
      return removed;
    }
    if (i < size / 2) {
      this._head = this._head + index + count + len & this._capacityMask;
      for (k = index; k > 0; k--) {
        this.unshift(this._list[i = i - 1 + len & this._capacityMask]);
      }
      i = this._head - 1 + len & this._capacityMask;
      while (del_count > 0) {
        this._list[i = i - 1 + len & this._capacityMask] = void 0;
        del_count--;
      }
      if (index < 0)
        this._tail = i;
    } else {
      this._tail = i;
      i = i + count + len & this._capacityMask;
      for (k = size - (count + index); k > 0; k--) {
        this.push(this._list[i++]);
      }
      i = this._tail;
      while (del_count > 0) {
        this._list[i = i + 1 + len & this._capacityMask] = void 0;
        del_count--;
      }
    }
    if (this._head < 2 && this._tail > 1e4 && this._tail <= len >>> 2)
      this._shrinkArray();
    return removed;
  };
  Denque.prototype.splice = function splice(index, count) {
    var i = index;
    if (i !== (i | 0)) {
      return void 0;
    }
    var size = this.size();
    if (i < 0)
      i += size;
    if (i > size)
      return void 0;
    if (arguments.length > 2) {
      var k;
      var temp;
      var removed;
      var arg_len = arguments.length;
      var len = this._list.length;
      var arguments_index = 2;
      if (!size || i < size / 2) {
        temp = new Array(i);
        for (k = 0; k < i; k++) {
          temp[k] = this._list[this._head + k & this._capacityMask];
        }
        if (count === 0) {
          removed = [];
          if (i > 0) {
            this._head = this._head + i + len & this._capacityMask;
          }
        } else {
          removed = this.remove(i, count);
          this._head = this._head + i + len & this._capacityMask;
        }
        while (arg_len > arguments_index) {
          this.unshift(arguments[--arg_len]);
        }
        for (k = i; k > 0; k--) {
          this.unshift(temp[k - 1]);
        }
      } else {
        temp = new Array(size - (i + count));
        var leng = temp.length;
        for (k = 0; k < leng; k++) {
          temp[k] = this._list[this._head + i + count + k & this._capacityMask];
        }
        if (count === 0) {
          removed = [];
          if (i != size) {
            this._tail = this._head + i + len & this._capacityMask;
          }
        } else {
          removed = this.remove(i, count);
          this._tail = this._tail - leng + len & this._capacityMask;
        }
        while (arguments_index < arg_len) {
          this.push(arguments[arguments_index++]);
        }
        for (k = 0; k < leng; k++) {
          this.push(temp[k]);
        }
      }
      return removed;
    } else {
      return this.remove(i, count);
    }
  };
  Denque.prototype.clear = function clear() {
    this._head = 0;
    this._tail = 0;
  };
  Denque.prototype.isEmpty = function isEmpty() {
    return this._head === this._tail;
  };
  Denque.prototype.toArray = function toArray() {
    return this._copyArray(false);
  };
  Denque.prototype._fromArray = function _fromArray(array) {
    for (var i = 0; i < array.length; i++)
      this.push(array[i]);
  };
  Denque.prototype._copyArray = function _copyArray(fullCopy) {
    var newArray = [];
    var list = this._list;
    var len = list.length;
    var i;
    if (fullCopy || this._head > this._tail) {
      for (i = this._head; i < len; i++)
        newArray.push(list[i]);
      for (i = 0; i < this._tail; i++)
        newArray.push(list[i]);
    } else {
      for (i = this._head; i < this._tail; i++)
        newArray.push(list[i]);
    }
    return newArray;
  };
  Denque.prototype._growArray = function _growArray() {
    if (this._head) {
      this._list = this._copyArray(true);
      this._head = 0;
    }
    this._tail = this._list.length;
    this._list.length *= 2;
    this._capacityMask = this._capacityMask << 1 | 1;
  };
  Denque.prototype._shrinkArray = function _shrinkArray() {
    this._list.length >>>= 1;
    this._capacityMask >>>= 1;
  };
  module2.exports = Denque;
});

// node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/lib/old.js
var require_old = __commonJS((exports2, module2) => {
  "use strict";
  var assert = require("assert");
  var util = require("util");
  function RedisError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    Error.captureStackTrace(this, this.constructor);
  }
  util.inherits(RedisError, Error);
  Object.defineProperty(RedisError.prototype, "name", {
    value: "RedisError",
    configurable: true,
    writable: true
  });
  function ParserError(message, buffer, offset) {
    assert(buffer);
    assert.strictEqual(typeof offset, "number");
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    Error.captureStackTrace(this, this.constructor);
    Error.stackTraceLimit = tmp;
    this.offset = offset;
    this.buffer = buffer;
  }
  util.inherits(ParserError, RedisError);
  Object.defineProperty(ParserError.prototype, "name", {
    value: "ParserError",
    configurable: true,
    writable: true
  });
  function ReplyError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    Error.captureStackTrace(this, this.constructor);
    Error.stackTraceLimit = tmp;
  }
  util.inherits(ReplyError, RedisError);
  Object.defineProperty(ReplyError.prototype, "name", {
    value: "ReplyError",
    configurable: true,
    writable: true
  });
  function AbortError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    Error.captureStackTrace(this, this.constructor);
  }
  util.inherits(AbortError, RedisError);
  Object.defineProperty(AbortError.prototype, "name", {
    value: "AbortError",
    configurable: true,
    writable: true
  });
  function InterruptError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    Error.captureStackTrace(this, this.constructor);
  }
  util.inherits(InterruptError, AbortError);
  Object.defineProperty(InterruptError.prototype, "name", {
    value: "InterruptError",
    configurable: true,
    writable: true
  });
  module2.exports = {
    RedisError,
    ParserError,
    ReplyError,
    AbortError,
    InterruptError
  };
});

// node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/lib/modern.js
var require_modern = __commonJS((exports2, module2) => {
  "use strict";
  var assert = require("assert");
  var RedisError = class extends Error {
    get name() {
      return this.constructor.name;
    }
  };
  var ParserError = class extends RedisError {
    constructor(message, buffer, offset) {
      assert(buffer);
      assert.strictEqual(typeof offset, "number");
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      super(message);
      Error.stackTraceLimit = tmp;
      this.offset = offset;
      this.buffer = buffer;
    }
    get name() {
      return this.constructor.name;
    }
  };
  var ReplyError = class extends RedisError {
    constructor(message) {
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      super(message);
      Error.stackTraceLimit = tmp;
    }
    get name() {
      return this.constructor.name;
    }
  };
  var AbortError = class extends RedisError {
    get name() {
      return this.constructor.name;
    }
  };
  var InterruptError = class extends AbortError {
    get name() {
      return this.constructor.name;
    }
  };
  module2.exports = {
    RedisError,
    ParserError,
    ReplyError,
    AbortError,
    InterruptError
  };
});

// node_modules/.pnpm/redis-errors@1.2.0/node_modules/redis-errors/index.js
var require_redis_errors = __commonJS((exports2, module2) => {
  "use strict";
  var Errors = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? require_old() : require_modern();
  module2.exports = Errors;
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/customErrors.js
var require_customErrors = __commonJS((exports2, module2) => {
  "use strict";
  var util = require("util");
  var assert = require("assert");
  var RedisError = require_redis_errors().RedisError;
  var ADD_STACKTRACE = false;
  function AbortError(obj, stack) {
    assert(obj, "The options argument is required");
    assert.strictEqual(typeof obj, "object", "The options argument has to be of type object");
    Object.defineProperty(this, "message", {
      value: obj.message || "",
      configurable: true,
      writable: true
    });
    if (stack || stack === void 0) {
      Error.captureStackTrace(this, AbortError);
    }
    for (var keys2 = Object.keys(obj), key = keys2.pop(); key; key = keys2.pop()) {
      this[key] = obj[key];
    }
  }
  function AggregateError(obj) {
    assert(obj, "The options argument is required");
    assert.strictEqual(typeof obj, "object", "The options argument has to be of type object");
    AbortError.call(this, obj, ADD_STACKTRACE);
    Object.defineProperty(this, "message", {
      value: obj.message || "",
      configurable: true,
      writable: true
    });
    Error.captureStackTrace(this, AggregateError);
    for (var keys2 = Object.keys(obj), key = keys2.pop(); key; key = keys2.pop()) {
      this[key] = obj[key];
    }
  }
  util.inherits(AbortError, RedisError);
  util.inherits(AggregateError, AbortError);
  Object.defineProperty(AbortError.prototype, "name", {
    value: "AbortError",
    configurable: true,
    writable: true
  });
  Object.defineProperty(AggregateError.prototype, "name", {
    value: "AggregateError",
    configurable: true,
    writable: true
  });
  module2.exports = {
    AbortError,
    AggregateError
  };
});

// node_modules/.pnpm/redis-parser@3.0.0/node_modules/redis-parser/lib/parser.js
var require_parser = __commonJS((exports2, module2) => {
  "use strict";
  var Buffer2 = require("buffer").Buffer;
  var StringDecoder = require("string_decoder").StringDecoder;
  var decoder = new StringDecoder();
  var errors = require_redis_errors();
  var ReplyError = errors.ReplyError;
  var ParserError = errors.ParserError;
  var bufferPool = Buffer2.allocUnsafe(32 * 1024);
  var bufferOffset = 0;
  var interval = null;
  var counter = 0;
  var notDecreased = 0;
  function parseSimpleNumbers(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    var sign = 1;
    if (parser.buffer[offset] === 45) {
      sign = -1;
      offset++;
    }
    while (offset < length) {
      const c1 = parser.buffer[offset++];
      if (c1 === 13) {
        parser.offset = offset + 1;
        return sign * number;
      }
      number = number * 10 + (c1 - 48);
    }
  }
  function parseStringNumbers(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    var res = "";
    if (parser.buffer[offset] === 45) {
      res += "-";
      offset++;
    }
    while (offset < length) {
      var c1 = parser.buffer[offset++];
      if (c1 === 13) {
        parser.offset = offset + 1;
        if (number !== 0) {
          res += number;
        }
        return res;
      } else if (number > 429496728) {
        res += number * 10 + (c1 - 48);
        number = 0;
      } else if (c1 === 48 && number === 0) {
        res += 0;
      } else {
        number = number * 10 + (c1 - 48);
      }
    }
  }
  function parseSimpleString(parser) {
    const start = parser.offset;
    const buffer = parser.buffer;
    const length = buffer.length - 1;
    var offset = start;
    while (offset < length) {
      if (buffer[offset++] === 13) {
        parser.offset = offset + 1;
        if (parser.optionReturnBuffers === true) {
          return parser.buffer.slice(start, offset - 1);
        }
        return parser.buffer.toString("utf8", start, offset - 1);
      }
    }
  }
  function parseLength(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    while (offset < length) {
      const c1 = parser.buffer[offset++];
      if (c1 === 13) {
        parser.offset = offset + 1;
        return number;
      }
      number = number * 10 + (c1 - 48);
    }
  }
  function parseInteger(parser) {
    if (parser.optionStringNumbers === true) {
      return parseStringNumbers(parser);
    }
    return parseSimpleNumbers(parser);
  }
  function parseBulkString(parser) {
    const length = parseLength(parser);
    if (length === void 0) {
      return;
    }
    if (length < 0) {
      return null;
    }
    const offset = parser.offset + length;
    if (offset + 2 > parser.buffer.length) {
      parser.bigStrSize = offset + 2;
      parser.totalChunkSize = parser.buffer.length;
      parser.bufferCache.push(parser.buffer);
      return;
    }
    const start = parser.offset;
    parser.offset = offset + 2;
    if (parser.optionReturnBuffers === true) {
      return parser.buffer.slice(start, offset);
    }
    return parser.buffer.toString("utf8", start, offset);
  }
  function parseError(parser) {
    var string = parseSimpleString(parser);
    if (string !== void 0) {
      if (parser.optionReturnBuffers === true) {
        string = string.toString();
      }
      return new ReplyError(string);
    }
  }
  function handleError(parser, type) {
    const err = new ParserError("Protocol error, got " + JSON.stringify(String.fromCharCode(type)) + " as reply type byte", JSON.stringify(parser.buffer), parser.offset);
    parser.buffer = null;
    parser.returnFatalError(err);
  }
  function parseArray(parser) {
    const length = parseLength(parser);
    if (length === void 0) {
      return;
    }
    if (length < 0) {
      return null;
    }
    const responses = new Array(length);
    return parseArrayElements(parser, responses, 0);
  }
  function pushArrayCache(parser, array, pos) {
    parser.arrayCache.push(array);
    parser.arrayPos.push(pos);
  }
  function parseArrayChunks(parser) {
    const tmp = parser.arrayCache.pop();
    var pos = parser.arrayPos.pop();
    if (parser.arrayCache.length) {
      const res = parseArrayChunks(parser);
      if (res === void 0) {
        pushArrayCache(parser, tmp, pos);
        return;
      }
      tmp[pos++] = res;
    }
    return parseArrayElements(parser, tmp, pos);
  }
  function parseArrayElements(parser, responses, i) {
    const bufferLength = parser.buffer.length;
    while (i < responses.length) {
      const offset = parser.offset;
      if (parser.offset >= bufferLength) {
        pushArrayCache(parser, responses, i);
        return;
      }
      const response = parseType(parser, parser.buffer[parser.offset++]);
      if (response === void 0) {
        if (!(parser.arrayCache.length || parser.bufferCache.length)) {
          parser.offset = offset;
        }
        pushArrayCache(parser, responses, i);
        return;
      }
      responses[i] = response;
      i++;
    }
    return responses;
  }
  function parseType(parser, type) {
    switch (type) {
      case 36:
        return parseBulkString(parser);
      case 43:
        return parseSimpleString(parser);
      case 42:
        return parseArray(parser);
      case 58:
        return parseInteger(parser);
      case 45:
        return parseError(parser);
      default:
        return handleError(parser, type);
    }
  }
  function decreaseBufferPool() {
    if (bufferPool.length > 50 * 1024) {
      if (counter === 1 || notDecreased > counter * 2) {
        const minSliceLen = Math.floor(bufferPool.length / 10);
        const sliceLength = minSliceLen < bufferOffset ? bufferOffset : minSliceLen;
        bufferOffset = 0;
        bufferPool = bufferPool.slice(sliceLength, bufferPool.length);
      } else {
        notDecreased++;
        counter--;
      }
    } else {
      clearInterval(interval);
      counter = 0;
      notDecreased = 0;
      interval = null;
    }
  }
  function resizeBuffer(length) {
    if (bufferPool.length < length + bufferOffset) {
      const multiplier = length > 1024 * 1024 * 75 ? 2 : 3;
      if (bufferOffset > 1024 * 1024 * 111) {
        bufferOffset = 1024 * 1024 * 50;
      }
      bufferPool = Buffer2.allocUnsafe(length * multiplier + bufferOffset);
      bufferOffset = 0;
      counter++;
      if (interval === null) {
        interval = setInterval(decreaseBufferPool, 50);
      }
    }
  }
  function concatBulkString(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
      if (chunks === 2) {
        return list[0].toString("utf8", oldOffset, list[0].length + offset - 2);
      }
      chunks--;
      offset = list[list.length - 2].length + offset;
    }
    var res = decoder.write(list[0].slice(oldOffset));
    for (var i = 1; i < chunks - 1; i++) {
      res += decoder.write(list[i]);
    }
    res += decoder.end(list[i].slice(0, offset - 2));
    return res;
  }
  function concatBulkBuffer(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    const length = parser.bigStrSize - oldOffset - 2;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
      if (chunks === 2) {
        return list[0].slice(oldOffset, list[0].length + offset - 2);
      }
      chunks--;
      offset = list[list.length - 2].length + offset;
    }
    resizeBuffer(length);
    const start = bufferOffset;
    list[0].copy(bufferPool, start, oldOffset, list[0].length);
    bufferOffset += list[0].length - oldOffset;
    for (var i = 1; i < chunks - 1; i++) {
      list[i].copy(bufferPool, bufferOffset);
      bufferOffset += list[i].length;
    }
    list[i].copy(bufferPool, bufferOffset, 0, offset - 2);
    bufferOffset += offset - 2;
    return bufferPool.slice(start, bufferOffset);
  }
  var JavascriptRedisParser = class {
    constructor(options2) {
      if (!options2) {
        throw new TypeError("Options are mandatory.");
      }
      if (typeof options2.returnError !== "function" || typeof options2.returnReply !== "function") {
        throw new TypeError("The returnReply and returnError options have to be functions.");
      }
      this.setReturnBuffers(!!options2.returnBuffers);
      this.setStringNumbers(!!options2.stringNumbers);
      this.returnError = options2.returnError;
      this.returnFatalError = options2.returnFatalError || options2.returnError;
      this.returnReply = options2.returnReply;
      this.reset();
    }
    reset() {
      this.offset = 0;
      this.buffer = null;
      this.bigStrSize = 0;
      this.totalChunkSize = 0;
      this.bufferCache = [];
      this.arrayCache = [];
      this.arrayPos = [];
    }
    setReturnBuffers(returnBuffers) {
      if (typeof returnBuffers !== "boolean") {
        throw new TypeError("The returnBuffers argument has to be a boolean");
      }
      this.optionReturnBuffers = returnBuffers;
    }
    setStringNumbers(stringNumbers) {
      if (typeof stringNumbers !== "boolean") {
        throw new TypeError("The stringNumbers argument has to be a boolean");
      }
      this.optionStringNumbers = stringNumbers;
    }
    execute(buffer) {
      if (this.buffer === null) {
        this.buffer = buffer;
        this.offset = 0;
      } else if (this.bigStrSize === 0) {
        const oldLength = this.buffer.length;
        const remainingLength = oldLength - this.offset;
        const newBuffer = Buffer2.allocUnsafe(remainingLength + buffer.length);
        this.buffer.copy(newBuffer, 0, this.offset, oldLength);
        buffer.copy(newBuffer, remainingLength, 0, buffer.length);
        this.buffer = newBuffer;
        this.offset = 0;
        if (this.arrayCache.length) {
          const arr = parseArrayChunks(this);
          if (arr === void 0) {
            return;
          }
          this.returnReply(arr);
        }
      } else if (this.totalChunkSize + buffer.length >= this.bigStrSize) {
        this.bufferCache.push(buffer);
        var tmp = this.optionReturnBuffers ? concatBulkBuffer(this) : concatBulkString(this);
        this.bigStrSize = 0;
        this.bufferCache = [];
        this.buffer = buffer;
        if (this.arrayCache.length) {
          this.arrayCache[0][this.arrayPos[0]++] = tmp;
          tmp = parseArrayChunks(this);
          if (tmp === void 0) {
            return;
          }
        }
        this.returnReply(tmp);
      } else {
        this.bufferCache.push(buffer);
        this.totalChunkSize += buffer.length;
        return;
      }
      while (this.offset < this.buffer.length) {
        const offset = this.offset;
        const type = this.buffer[this.offset++];
        const response = parseType(this, type);
        if (response === void 0) {
          if (!(this.arrayCache.length || this.bufferCache.length)) {
            this.offset = offset;
          }
          return;
        }
        if (type === 45) {
          this.returnError(response);
        } else {
          this.returnReply(response);
        }
      }
      this.buffer = null;
    }
  };
  module2.exports = JavascriptRedisParser;
});

// node_modules/.pnpm/redis-parser@3.0.0/node_modules/redis-parser/index.js
var require_redis_parser = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = require_parser();
});

// node_modules/.pnpm/redis-commands@1.7.0/node_modules/redis-commands/commands.json
var require_commands = __commonJS((exports2, module2) => {
  module2.exports = {
    acl: {
      arity: -2,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale",
        "skip_slowlog"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    append: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    asking: {
      arity: 1,
      flags: [
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    auth: {
      arity: -2,
      flags: [
        "noscript",
        "loading",
        "stale",
        "skip_monitor",
        "skip_slowlog",
        "fast",
        "no_auth"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    bgrewriteaof: {
      arity: 1,
      flags: [
        "admin",
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    bgsave: {
      arity: -1,
      flags: [
        "admin",
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    bitcount: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    bitfield: {
      arity: -2,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    bitfield_ro: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    bitop: {
      arity: -4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 2,
      keyStop: -1,
      step: 1
    },
    bitpos: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    blmove: {
      arity: 6,
      flags: [
        "write",
        "denyoom",
        "noscript"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    blpop: {
      arity: -3,
      flags: [
        "write",
        "noscript"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    brpop: {
      arity: -3,
      flags: [
        "write",
        "noscript"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    brpoplpush: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "noscript"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    bzpopmax: {
      arity: -3,
      flags: [
        "write",
        "noscript",
        "fast"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    bzpopmin: {
      arity: -3,
      flags: [
        "write",
        "noscript",
        "fast"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    client: {
      arity: -2,
      flags: [
        "admin",
        "noscript",
        "random",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    cluster: {
      arity: -2,
      flags: [
        "admin",
        "random",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    command: {
      arity: -1,
      flags: [
        "random",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    config: {
      arity: -2,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    copy: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    dbsize: {
      arity: 1,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    debug: {
      arity: -2,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    decr: {
      arity: 2,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    decrby: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    del: {
      arity: -2,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    discard: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    dump: {
      arity: 2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    echo: {
      arity: 2,
      flags: [
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    eval: {
      arity: -3,
      flags: [
        "noscript",
        "may_replicate",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    evalsha: {
      arity: -3,
      flags: [
        "noscript",
        "may_replicate",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    exec: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "skip_monitor",
        "skip_slowlog"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    exists: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    expire: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    expireat: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    failover: {
      arity: -1,
      flags: [
        "admin",
        "noscript",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    flushall: {
      arity: -1,
      flags: [
        "write"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    flushdb: {
      arity: -1,
      flags: [
        "write"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    geoadd: {
      arity: -5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geodist: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geohash: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geopos: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadius: {
      arity: -6,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadius_ro: {
      arity: -6,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadiusbymember: {
      arity: -5,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadiusbymember_ro: {
      arity: -5,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geosearch: {
      arity: -7,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geosearchstore: {
      arity: -8,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    get: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getbit: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getdel: {
      arity: 2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getex: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getrange: {
      arity: 4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getset: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hdel: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hello: {
      arity: -1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "skip_monitor",
        "skip_slowlog",
        "fast",
        "no_auth"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    hexists: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hget: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hgetall: {
      arity: 2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hincrby: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hincrbyfloat: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hkeys: {
      arity: 2,
      flags: [
        "readonly",
        "sort_for_script"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hlen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hmget: {
      arity: -3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hmset: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    "host:": {
      arity: -1,
      flags: [
        "readonly",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    hrandfield: {
      arity: -2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hscan: {
      arity: -3,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hset: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hsetnx: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hstrlen: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hvals: {
      arity: 2,
      flags: [
        "readonly",
        "sort_for_script"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    incr: {
      arity: 2,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    incrby: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    incrbyfloat: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    info: {
      arity: -1,
      flags: [
        "random",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    keys: {
      arity: 2,
      flags: [
        "readonly",
        "sort_for_script"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    lastsave: {
      arity: 1,
      flags: [
        "random",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    latency: {
      arity: -2,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    lindex: {
      arity: 3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    linsert: {
      arity: 5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    llen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lmove: {
      arity: 5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    lolwut: {
      arity: -1,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    lpop: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lpos: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lpush: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lpushx: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lrange: {
      arity: 4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lrem: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lset: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    ltrim: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    memory: {
      arity: -2,
      flags: [
        "readonly",
        "random",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    mget: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    migrate: {
      arity: -6,
      flags: [
        "write",
        "random",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    module: {
      arity: -2,
      flags: [
        "admin",
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    monitor: {
      arity: 1,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    move: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    mset: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 2
    },
    msetnx: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 2
    },
    multi: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    object: {
      arity: -2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 2,
      keyStop: 2,
      step: 1
    },
    persist: {
      arity: 2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pexpire: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pexpireat: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pfadd: {
      arity: -2,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pfcount: {
      arity: -2,
      flags: [
        "readonly",
        "may_replicate"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    pfdebug: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "admin"
      ],
      keyStart: 2,
      keyStop: 2,
      step: 1
    },
    pfmerge: {
      arity: -2,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    pfselftest: {
      arity: 1,
      flags: [
        "admin"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    ping: {
      arity: -1,
      flags: [
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    post: {
      arity: -1,
      flags: [
        "readonly",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    psetex: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    psubscribe: {
      arity: -2,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    psync: {
      arity: -3,
      flags: [
        "admin",
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    pttl: {
      arity: 2,
      flags: [
        "readonly",
        "random",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    publish: {
      arity: 3,
      flags: [
        "pubsub",
        "loading",
        "stale",
        "fast",
        "may_replicate"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    pubsub: {
      arity: -2,
      flags: [
        "pubsub",
        "random",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    punsubscribe: {
      arity: -1,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    quit: {
      arity: 1,
      flags: [
        "loading",
        "stale",
        "readonly"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    randomkey: {
      arity: 1,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    readonly: {
      arity: 1,
      flags: [
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    readwrite: {
      arity: 1,
      flags: [
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    rename: {
      arity: 3,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    renamenx: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    replconf: {
      arity: -1,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    replicaof: {
      arity: 3,
      flags: [
        "admin",
        "noscript",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    reset: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    restore: {
      arity: -4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    "restore-asking": {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "asking"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    role: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    rpop: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    rpoplpush: {
      arity: 3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    rpush: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    rpushx: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    sadd: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    save: {
      arity: 1,
      flags: [
        "admin",
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    scan: {
      arity: -2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    scard: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    script: {
      arity: -2,
      flags: [
        "noscript",
        "may_replicate"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    sdiff: {
      arity: -2,
      flags: [
        "readonly",
        "sort_for_script"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sdiffstore: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    select: {
      arity: 2,
      flags: [
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    set: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setbit: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setex: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setnx: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setrange: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    shutdown: {
      arity: -1,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    sinter: {
      arity: -2,
      flags: [
        "readonly",
        "sort_for_script"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sinterstore: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sismember: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    slaveof: {
      arity: 3,
      flags: [
        "admin",
        "noscript",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    slowlog: {
      arity: -2,
      flags: [
        "admin",
        "random",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    smembers: {
      arity: 2,
      flags: [
        "readonly",
        "sort_for_script"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    smismember: {
      arity: -3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    smove: {
      arity: 4,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    sort: {
      arity: -2,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    spop: {
      arity: -2,
      flags: [
        "write",
        "random",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    srandmember: {
      arity: -2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    srem: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    sscan: {
      arity: -3,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    stralgo: {
      arity: -2,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    strlen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    subscribe: {
      arity: -2,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    substr: {
      arity: 4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    sunion: {
      arity: -2,
      flags: [
        "readonly",
        "sort_for_script"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sunionstore: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    swapdb: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    sync: {
      arity: 1,
      flags: [
        "admin",
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    time: {
      arity: 1,
      flags: [
        "random",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    touch: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    ttl: {
      arity: 2,
      flags: [
        "readonly",
        "random",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    type: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    unlink: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    unsubscribe: {
      arity: -1,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    unwatch: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    wait: {
      arity: 3,
      flags: [
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    watch: {
      arity: -2,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    xack: {
      arity: -4,
      flags: [
        "write",
        "random",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xadd: {
      arity: -5,
      flags: [
        "write",
        "denyoom",
        "random",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xautoclaim: {
      arity: -6,
      flags: [
        "write",
        "random",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xclaim: {
      arity: -6,
      flags: [
        "write",
        "random",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xdel: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xgroup: {
      arity: -2,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 2,
      keyStop: 2,
      step: 1
    },
    xinfo: {
      arity: -2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 2,
      keyStop: 2,
      step: 1
    },
    xlen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xpending: {
      arity: -3,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xread: {
      arity: -4,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    xreadgroup: {
      arity: -7,
      flags: [
        "write",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    xrevrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xsetid: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xtrim: {
      arity: -2,
      flags: [
        "write",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zadd: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zcard: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zcount: {
      arity: 4,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zdiff: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zdiffstore: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zincrby: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zinter: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zinterstore: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zlexcount: {
      arity: 4,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zmscore: {
      arity: -3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zpopmax: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zpopmin: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrandmember: {
      arity: -2,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrangebylex: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrangebyscore: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrangestore: {
      arity: -5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    zrank: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrem: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zremrangebylex: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zremrangebyrank: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zremrangebyscore: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrangebylex: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrangebyscore: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrank: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zscan: {
      arity: -3,
      flags: [
        "readonly",
        "random"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zscore: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zunion: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zunionstore: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    }
  };
});

// node_modules/.pnpm/redis-commands@1.7.0/node_modules/redis-commands/index.js
var require_redis_commands = __commonJS((exports2) => {
  "use strict";
  var commands = require_commands();
  exports2.list = Object.keys(commands);
  var flags = {};
  exports2.list.forEach(function(commandName) {
    flags[commandName] = commands[commandName].flags.reduce(function(flags2, flag) {
      flags2[flag] = true;
      return flags2;
    }, {});
  });
  exports2.exists = function(commandName) {
    return Boolean(commands[commandName]);
  };
  exports2.hasFlag = function(commandName, flag) {
    if (!flags[commandName]) {
      throw new Error("Unknown command " + commandName);
    }
    return Boolean(flags[commandName][flag]);
  };
  exports2.getKeyIndexes = function(commandName, args, options2) {
    var command = commands[commandName];
    if (!command) {
      throw new Error("Unknown command " + commandName);
    }
    if (!Array.isArray(args)) {
      throw new Error("Expect args to be an array");
    }
    var keys2 = [];
    var i, keyStart, keyStop, parseExternalKey;
    switch (commandName) {
      case "zunionstore":
      case "zinterstore":
        keys2.push(0);
      case "eval":
      case "evalsha":
        keyStop = Number(args[1]) + 2;
        for (i = 2; i < keyStop; i++) {
          keys2.push(i);
        }
        break;
      case "sort":
        parseExternalKey = options2 && options2.parseExternalKey;
        keys2.push(0);
        for (i = 1; i < args.length - 1; i++) {
          if (typeof args[i] !== "string") {
            continue;
          }
          var directive = args[i].toUpperCase();
          if (directive === "GET") {
            i += 1;
            if (args[i] !== "#") {
              if (parseExternalKey) {
                keys2.push([i, getExternalKeyNameLength(args[i])]);
              } else {
                keys2.push(i);
              }
            }
          } else if (directive === "BY") {
            i += 1;
            if (parseExternalKey) {
              keys2.push([i, getExternalKeyNameLength(args[i])]);
            } else {
              keys2.push(i);
            }
          } else if (directive === "STORE") {
            i += 1;
            keys2.push(i);
          }
        }
        break;
      case "migrate":
        if (args[2] === "") {
          for (i = 5; i < args.length - 1; i++) {
            if (args[i].toUpperCase() === "KEYS") {
              for (var j = i + 1; j < args.length; j++) {
                keys2.push(j);
              }
              break;
            }
          }
        } else {
          keys2.push(2);
        }
        break;
      case "xreadgroup":
      case "xread":
        for (i = commandName === "xread" ? 0 : 3; i < args.length - 1; i++) {
          if (String(args[i]).toUpperCase() === "STREAMS") {
            for (j = i + 1; j <= i + (args.length - 1 - i) / 2; j++) {
              keys2.push(j);
            }
            break;
          }
        }
        break;
      default:
        if (command.step > 0) {
          keyStart = command.keyStart - 1;
          keyStop = command.keyStop > 0 ? command.keyStop : args.length + command.keyStop + 1;
          for (i = keyStart; i < keyStop; i += command.step) {
            keys2.push(i);
          }
        }
        break;
    }
    return keys2;
  };
  function getExternalKeyNameLength(key) {
    if (typeof key !== "string") {
      key = String(key);
    }
    var hashPos = key.indexOf("->");
    return hashPos === -1 ? key.length : hashPos;
  }
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/debug.js
var require_debug = __commonJS((exports2, module2) => {
  "use strict";
  var index = require_redis();
  function debug() {
    if (index.debug_mode) {
      var data = Array.prototype.slice.call(arguments);
      data.unshift(new Date().toISOString());
      console.error.apply(null, data);
    }
  }
  module2.exports = debug;
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/createClient.js
var require_createClient = __commonJS((exports2, module2) => {
  "use strict";
  var utils = require_utils();
  var URL2 = require("url");
  module2.exports = function createClient2(port_arg, host_arg, options2) {
    if (typeof port_arg === "number" || typeof port_arg === "string" && /^\d+$/.test(port_arg)) {
      var host2;
      if (typeof host_arg === "string") {
        host2 = host_arg;
      } else {
        if (options2 && host_arg) {
          throw new TypeError("Unknown type of connection in createClient()");
        }
        options2 = options2 || host_arg;
      }
      options2 = utils.clone(options2);
      options2.host = host2 || options2.host;
      options2.port = port_arg;
    } else if (typeof port_arg === "string" || port_arg && port_arg.url) {
      options2 = utils.clone(port_arg.url ? port_arg : host_arg || options2);
      var url = port_arg.url || port_arg;
      var parsed = URL2.parse(url, true, true);
      if (parsed.slashes) {
        if (parsed.auth) {
          var columnIndex = parsed.auth.indexOf(":");
          options2.password = parsed.auth.slice(columnIndex + 1);
          if (columnIndex > 0) {
            options2.user = parsed.auth.slice(0, columnIndex);
          }
        }
        if (parsed.protocol) {
          if (parsed.protocol === "rediss:") {
            options2.tls = options2.tls || {};
          } else if (parsed.protocol !== "redis:") {
            console.warn('node_redis: WARNING: You passed "' + parsed.protocol.substring(0, parsed.protocol.length - 1) + '" as protocol instead of the "redis" protocol!');
          }
        }
        if (parsed.pathname && parsed.pathname !== "/") {
          options2.db = parsed.pathname.substr(1);
        }
        if (parsed.hostname) {
          options2.host = parsed.hostname;
        }
        if (parsed.port) {
          options2.port = parsed.port;
        }
        if (parsed.search !== "") {
          var elem;
          for (elem in parsed.query) {
            if (elem in options2) {
              if (options2[elem] === parsed.query[elem]) {
                console.warn("node_redis: WARNING: You passed the " + elem + " option twice!");
              } else {
                throw new RangeError("The " + elem + " option is added twice and does not match");
              }
            }
            options2[elem] = parsed.query[elem];
          }
        }
      } else if (parsed.hostname) {
        throw new RangeError('The redis url must begin with slashes "//" or contain slashes after the redis protocol');
      } else {
        options2.path = url;
      }
    } else if (typeof port_arg === "object" || port_arg === void 0) {
      options2 = utils.clone(port_arg || options2);
      options2.host = options2.host || host_arg;
      if (port_arg && arguments.length !== 1) {
        throw new TypeError("Too many arguments passed to createClient. Please only pass the options object");
      }
    }
    if (!options2) {
      throw new TypeError("Unknown type of connection in createClient()");
    }
    return options2;
  };
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/multi.js
var require_multi = __commonJS((exports2, module2) => {
  "use strict";
  var Queue = require_denque();
  var utils = require_utils();
  var Command = require_command();
  function Multi(client2, args) {
    this._client = client2;
    this.queue = new Queue();
    var command, tmp_args;
    if (args) {
      for (var i = 0; i < args.length; i++) {
        command = args[i][0];
        tmp_args = args[i].slice(1);
        if (Array.isArray(command)) {
          this[command[0]].apply(this, command.slice(1).concat(tmp_args));
        } else {
          this[command].apply(this, tmp_args);
        }
      }
    }
  }
  function pipeline_transaction_command(self, command_obj, index) {
    var tmp = command_obj.callback;
    command_obj.callback = function(err, reply) {
      if (err && index !== -1) {
        if (tmp) {
          tmp(err);
        }
        err.position = index;
        self.errors.push(err);
      }
      self.wants_buffers[index] = command_obj.buffer_args;
      command_obj.callback = tmp;
    };
    self._client.internal_send_command(command_obj);
  }
  Multi.prototype.exec_atomic = Multi.prototype.EXEC_ATOMIC = Multi.prototype.execAtomic = function exec_atomic(callback) {
    if (this.queue.length < 2) {
      return this.exec_batch(callback);
    }
    return this.exec(callback);
  };
  function multi_callback(self, err, replies) {
    var i = 0, command_obj;
    if (err) {
      err.errors = self.errors;
      if (self.callback) {
        self.callback(err);
      } else if (err.code !== "CONNECTION_BROKEN") {
        self._client.emit("error", err);
      }
      return;
    }
    if (replies) {
      while (command_obj = self.queue.shift()) {
        if (replies[i] instanceof Error) {
          var match = replies[i].message.match(utils.err_code);
          if (match) {
            replies[i].code = match[1];
          }
          replies[i].command = command_obj.command.toUpperCase();
          if (typeof command_obj.callback === "function") {
            command_obj.callback(replies[i]);
          }
        } else {
          replies[i] = self._client.handle_reply(replies[i], command_obj.command, self.wants_buffers[i]);
          if (typeof command_obj.callback === "function") {
            command_obj.callback(null, replies[i]);
          }
        }
        i++;
      }
    }
    if (self.callback) {
      self.callback(null, replies);
    }
  }
  Multi.prototype.exec_transaction = function exec_transaction(callback) {
    if (this.monitoring || this._client.monitoring) {
      var err = new RangeError("Using transaction with a client that is in monitor mode does not work due to faulty return values of Redis.");
      err.command = "EXEC";
      err.code = "EXECABORT";
      return utils.reply_in_order(this._client, callback, err);
    }
    var self = this;
    var len = self.queue.length;
    self.errors = [];
    self.callback = callback;
    self._client.cork();
    self.wants_buffers = new Array(len);
    pipeline_transaction_command(self, new Command("multi", []), -1);
    for (var index = 0; index < len; index++) {
      pipeline_transaction_command(self, self.queue.get(index), index);
    }
    self._client.internal_send_command(new Command("exec", [], function(err2, replies) {
      multi_callback(self, err2, replies);
    }));
    self._client.uncork();
    return !self._client.should_buffer;
  };
  function batch_callback(self, cb, i) {
    return function batch_callback2(err, res) {
      if (err) {
        self.results[i] = err;
        self.results[i].position = i;
      } else {
        self.results[i] = res;
      }
      cb(err, res);
    };
  }
  Multi.prototype.exec = Multi.prototype.EXEC = Multi.prototype.exec_batch = function exec_batch(callback) {
    var self = this;
    var len = self.queue.length;
    var index = 0;
    var command_obj;
    if (len === 0) {
      utils.reply_in_order(self._client, callback, null, []);
      return !self._client.should_buffer;
    }
    self._client.cork();
    if (!callback) {
      while (command_obj = self.queue.shift()) {
        self._client.internal_send_command(command_obj);
      }
      self._client.uncork();
      return !self._client.should_buffer;
    }
    var callback_without_own_cb = function(err, res) {
      if (err) {
        self.results.push(err);
        var i = self.results.length - 1;
        self.results[i].position = i;
      } else {
        self.results.push(res);
      }
    };
    var last_callback = function(cb) {
      return function(err, res) {
        cb(err, res);
        callback(null, self.results);
      };
    };
    self.results = [];
    while (command_obj = self.queue.shift()) {
      if (typeof command_obj.callback === "function") {
        command_obj.callback = batch_callback(self, command_obj.callback, index);
      } else {
        command_obj.callback = callback_without_own_cb;
      }
      if (typeof callback === "function" && index === len - 1) {
        command_obj.callback = last_callback(command_obj.callback);
      }
      this._client.internal_send_command(command_obj);
      index++;
    }
    self._client.uncork();
    return !self._client.should_buffer;
  };
  module2.exports = Multi;
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/individualCommands.js
var require_individualCommands = __commonJS(() => {
  "use strict";
  var utils = require_utils();
  var debug = require_debug();
  var Multi = require_multi();
  var Command = require_command();
  var no_password_is_set = /no password is set|called without any password configured/;
  var loading = /LOADING/;
  var RedisClient = require_redis().RedisClient;
  RedisClient.prototype.multi = RedisClient.prototype.MULTI = function multi(args) {
    var multi2 = new Multi(this, args);
    multi2.exec = multi2.EXEC = multi2.exec_transaction;
    return multi2;
  };
  RedisClient.prototype.batch = RedisClient.prototype.BATCH = function batch(args) {
    return new Multi(this, args);
  };
  function select_callback(self, db, callback) {
    return function(err, res) {
      if (err === null) {
        self.selected_db = db;
      }
      utils.callback_or_emit(self, callback, err, res);
    };
  }
  RedisClient.prototype.select = RedisClient.prototype.SELECT = function select(db, callback) {
    return this.internal_send_command(new Command("select", [db], select_callback(this, db, callback)));
  };
  Multi.prototype.select = Multi.prototype.SELECT = function select(db, callback) {
    this.queue.push(new Command("select", [db], select_callback(this._client, db, callback)));
    return this;
  };
  RedisClient.prototype.monitor = RedisClient.prototype.MONITOR = function monitor(callback) {
    var self = this;
    var call_on_write = function() {
      self.monitoring = true;
    };
    return this.internal_send_command(new Command("monitor", [], callback, call_on_write));
  };
  Multi.prototype.monitor = Multi.prototype.MONITOR = function monitor(callback) {
    if (this.exec !== this.exec_transaction) {
      var self = this;
      var call_on_write = function() {
        self._client.monitoring = true;
      };
      this.queue.push(new Command("monitor", [], callback, call_on_write));
      return this;
    }
    this.monitoring = true;
    return this;
  };
  function quit_callback(self, callback) {
    return function(err, res) {
      if (err && err.code === "NR_CLOSED") {
        err = null;
        res = "OK";
      }
      utils.callback_or_emit(self, callback, err, res);
      if (self.stream.writable) {
        self.stream.destroy();
      }
    };
  }
  RedisClient.prototype.QUIT = RedisClient.prototype.quit = function quit(callback) {
    var backpressure_indicator = this.internal_send_command(new Command("quit", [], quit_callback(this, callback)));
    this.closing = true;
    this.ready = false;
    return backpressure_indicator;
  };
  Multi.prototype.QUIT = Multi.prototype.quit = function quit(callback) {
    var self = this._client;
    var call_on_write = function() {
      self.closing = true;
      self.ready = false;
    };
    this.queue.push(new Command("quit", [], quit_callback(self, callback), call_on_write));
    return this;
  };
  function info_callback(self, callback) {
    return function(err, res) {
      if (res) {
        var obj = {};
        var lines = res.toString().split("\r\n");
        var line, parts, sub_parts;
        for (var i = 0; i < lines.length; i++) {
          parts = lines[i].split(":");
          if (parts[1]) {
            if (parts[0].indexOf("db") === 0) {
              sub_parts = parts[1].split(",");
              obj[parts[0]] = {};
              while (line = sub_parts.pop()) {
                line = line.split("=");
                obj[parts[0]][line[0]] = +line[1];
              }
            } else {
              obj[parts[0]] = parts[1];
            }
          }
        }
        obj.versions = [];
        if (obj.redis_version) {
          obj.redis_version.split(".").forEach(function(num) {
            obj.versions.push(+num);
          });
        }
        self.server_info = obj;
      } else {
        self.server_info = {};
      }
      utils.callback_or_emit(self, callback, err, res);
    };
  }
  RedisClient.prototype.info = RedisClient.prototype.INFO = function info(section, callback) {
    var args = [];
    if (typeof section === "function") {
      callback = section;
    } else if (section !== void 0) {
      args = Array.isArray(section) ? section : [section];
    }
    return this.internal_send_command(new Command("info", args, info_callback(this, callback)));
  };
  Multi.prototype.info = Multi.prototype.INFO = function info(section, callback) {
    var args = [];
    if (typeof section === "function") {
      callback = section;
    } else if (section !== void 0) {
      args = Array.isArray(section) ? section : [section];
    }
    this.queue.push(new Command("info", args, info_callback(this._client, callback)));
    return this;
  };
  function auth_callback(self, pass, user, callback) {
    return function(err, res) {
      if (err) {
        if (no_password_is_set.test(err.message)) {
          self.warn("Warning: Redis server does not require a password, but a password was supplied.");
          err = null;
          res = "OK";
        } else if (loading.test(err.message)) {
          debug("Redis still loading, trying to authenticate later");
          setTimeout(function() {
            self.auth(pass, user, callback);
          }, 100);
          return;
        }
      }
      utils.callback_or_emit(self, callback, err, res);
    };
  }
  RedisClient.prototype.auth = RedisClient.prototype.AUTH = function auth(pass, user, callback) {
    debug("Sending auth to " + this.address + " id " + this.connection_id);
    if (user instanceof Function) {
      callback = user;
      user = null;
    }
    this.auth_pass = pass;
    this.auth_user = user;
    var ready = this.ready;
    this.ready = ready || this.offline_queue.length === 0;
    var tmp = this.internal_send_command(new Command("auth", user ? [user, pass] : [pass], auth_callback(this, pass, user, callback)));
    this.ready = ready;
    return tmp;
  };
  Multi.prototype.auth = Multi.prototype.AUTH = function auth(pass, user, callback) {
    debug("Sending auth to " + this.address + " id " + this.connection_id);
    if (user instanceof Function) {
      callback = user;
      user = null;
    }
    this.auth_pass = pass;
    this.auth_user = user;
    this.queue.push(new Command("auth", user ? [user, pass] : [pass], auth_callback(this._client, pass, user, callback)));
    return this;
  };
  RedisClient.prototype.client = RedisClient.prototype.CLIENT = function client2() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0];
      callback = arguments[1];
    } else if (Array.isArray(arguments[1])) {
      if (len === 3) {
        callback = arguments[2];
      }
      len = arguments[1].length;
      arr = new Array(len + 1);
      arr[0] = arguments[0];
      for (; i < len; i += 1) {
        arr[i + 1] = arguments[1][i];
      }
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this;
    var call_on_write = void 0;
    if (arr.length === 2 && arr[0].toString().toUpperCase() === "REPLY") {
      var reply_on_off = arr[1].toString().toUpperCase();
      if (reply_on_off === "ON" || reply_on_off === "OFF" || reply_on_off === "SKIP") {
        call_on_write = function() {
          self.reply = reply_on_off;
        };
      }
    }
    return this.internal_send_command(new Command("client", arr, callback, call_on_write));
  };
  Multi.prototype.client = Multi.prototype.CLIENT = function client2() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0];
      callback = arguments[1];
    } else if (Array.isArray(arguments[1])) {
      if (len === 3) {
        callback = arguments[2];
      }
      len = arguments[1].length;
      arr = new Array(len + 1);
      arr[0] = arguments[0];
      for (; i < len; i += 1) {
        arr[i + 1] = arguments[1][i];
      }
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this._client;
    var call_on_write = void 0;
    if (arr.length === 2 && arr[0].toString().toUpperCase() === "REPLY") {
      var reply_on_off = arr[1].toString().toUpperCase();
      if (reply_on_off === "ON" || reply_on_off === "OFF" || reply_on_off === "SKIP") {
        call_on_write = function() {
          self.reply = reply_on_off;
        };
      }
    }
    this.queue.push(new Command("client", arr, callback, call_on_write));
    return this;
  };
  RedisClient.prototype.hmset = RedisClient.prototype.HMSET = function hmset() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0];
      callback = arguments[1];
    } else if (Array.isArray(arguments[1])) {
      if (len === 3) {
        callback = arguments[2];
      }
      len = arguments[1].length;
      arr = new Array(len + 1);
      arr[0] = arguments[0];
      for (; i < len; i += 1) {
        arr[i + 1] = arguments[1][i];
      }
    } else if (typeof arguments[1] === "object" && (arguments.length === 2 || arguments.length === 3 && (typeof arguments[2] === "function" || typeof arguments[2] === "undefined"))) {
      arr = [arguments[0]];
      for (var field in arguments[1]) {
        arr.push(field, arguments[1][field]);
      }
      callback = arguments[2];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    return this.internal_send_command(new Command("hmset", arr, callback));
  };
  Multi.prototype.hmset = Multi.prototype.HMSET = function hmset() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0];
      callback = arguments[1];
    } else if (Array.isArray(arguments[1])) {
      if (len === 3) {
        callback = arguments[2];
      }
      len = arguments[1].length;
      arr = new Array(len + 1);
      arr[0] = arguments[0];
      for (; i < len; i += 1) {
        arr[i + 1] = arguments[1][i];
      }
    } else if (typeof arguments[1] === "object" && (arguments.length === 2 || arguments.length === 3 && (typeof arguments[2] === "function" || typeof arguments[2] === "undefined"))) {
      arr = [arguments[0]];
      for (var field in arguments[1]) {
        arr.push(field, arguments[1][field]);
      }
      callback = arguments[2];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    this.queue.push(new Command("hmset", arr, callback));
    return this;
  };
  RedisClient.prototype.subscribe = RedisClient.prototype.SUBSCRIBE = function subscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    return this.internal_send_command(new Command("subscribe", arr, callback, call_on_write));
  };
  Multi.prototype.subscribe = Multi.prototype.SUBSCRIBE = function subscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this._client;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    this.queue.push(new Command("subscribe", arr, callback, call_on_write));
    return this;
  };
  RedisClient.prototype.unsubscribe = RedisClient.prototype.UNSUBSCRIBE = function unsubscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    return this.internal_send_command(new Command("unsubscribe", arr, callback, call_on_write));
  };
  Multi.prototype.unsubscribe = Multi.prototype.UNSUBSCRIBE = function unsubscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this._client;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    this.queue.push(new Command("unsubscribe", arr, callback, call_on_write));
    return this;
  };
  RedisClient.prototype.psubscribe = RedisClient.prototype.PSUBSCRIBE = function psubscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    return this.internal_send_command(new Command("psubscribe", arr, callback, call_on_write));
  };
  Multi.prototype.psubscribe = Multi.prototype.PSUBSCRIBE = function psubscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this._client;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    this.queue.push(new Command("psubscribe", arr, callback, call_on_write));
    return this;
  };
  RedisClient.prototype.punsubscribe = RedisClient.prototype.PUNSUBSCRIBE = function punsubscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    return this.internal_send_command(new Command("punsubscribe", arr, callback, call_on_write));
  };
  Multi.prototype.punsubscribe = Multi.prototype.PUNSUBSCRIBE = function punsubscribe() {
    var arr, len = arguments.length, callback, i = 0;
    if (Array.isArray(arguments[0])) {
      arr = arguments[0].slice(0);
      callback = arguments[1];
    } else {
      len = arguments.length;
      if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
        len--;
        callback = arguments[len];
      }
      arr = new Array(len);
      for (; i < len; i += 1) {
        arr[i] = arguments[i];
      }
    }
    var self = this._client;
    var call_on_write = function() {
      self.pub_sub_mode = self.pub_sub_mode || self.command_queue.length + 1;
    };
    this.queue.push(new Command("punsubscribe", arr, callback, call_on_write));
    return this;
  };
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/extendedApi.js
var require_extendedApi = __commonJS(() => {
  "use strict";
  var utils = require_utils();
  var debug = require_debug();
  var RedisClient = require_redis().RedisClient;
  var Command = require_command();
  var noop = function() {
  };
  RedisClient.prototype.send_command = RedisClient.prototype.sendCommand = function(command, args, callback) {
    if (typeof command !== "string") {
      throw new TypeError('Wrong input type "' + (command !== null && command !== void 0 ? command.constructor.name : command) + '" for command name');
    }
    command = command.toLowerCase();
    if (!Array.isArray(args)) {
      if (args === void 0 || args === null) {
        args = [];
      } else if (typeof args === "function" && callback === void 0) {
        callback = args;
        args = [];
      } else {
        throw new TypeError('Wrong input type "' + args.constructor.name + '" for args');
      }
    }
    if (typeof callback !== "function" && callback !== void 0) {
      throw new TypeError('Wrong input type "' + (callback !== null ? callback.constructor.name : "null") + '" for callback function');
    }
    if (command === "multi" || typeof this[command] !== "function") {
      return this.internal_send_command(new Command(command, args, callback));
    }
    if (typeof callback === "function") {
      args = args.concat([callback]);
    }
    return this[command].apply(this, args);
  };
  RedisClient.prototype.end = function(flush) {
    if (flush) {
      this.flush_and_error({
        message: "Connection forcefully ended and command aborted.",
        code: "NR_CLOSED"
      });
    } else if (arguments.length === 0) {
      this.warn("Using .end() without the flush parameter is deprecated and throws from v.3.0.0 on.\nPlease check the doku (https://github.com/NodeRedis/node_redis) and explictly use flush.");
    }
    if (this.retry_timer) {
      clearTimeout(this.retry_timer);
      this.retry_timer = null;
    }
    this.stream.removeAllListeners();
    this.stream.on("error", noop);
    this.connected = false;
    this.ready = false;
    this.closing = true;
    return this.stream.destroySoon();
  };
  RedisClient.prototype.unref = function() {
    if (this.connected) {
      debug("Unref'ing the socket connection");
      this.stream.unref();
    } else {
      debug("Not connected yet, will unref later");
      this.once("connect", function() {
        this.unref();
      });
    }
  };
  RedisClient.prototype.duplicate = function(options2, callback) {
    if (typeof options2 === "function") {
      callback = options2;
      options2 = null;
    }
    var existing_options = utils.clone(this.options);
    options2 = utils.clone(options2);
    for (var elem in options2) {
      existing_options[elem] = options2[elem];
    }
    var client2 = new RedisClient(existing_options);
    client2.selected_db = options2.db || this.selected_db;
    if (typeof callback === "function") {
      var ready_listener = function() {
        callback(null, client2);
        client2.removeAllListeners(error_listener);
      };
      var error_listener = function(err) {
        callback(err);
        client2.end(true);
      };
      client2.once("ready", ready_listener);
      client2.once("error", error_listener);
      return;
    }
    return client2;
  };
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/lib/commands.js
var require_commands2 = __commonJS((exports2, module2) => {
  "use strict";
  var commands = require_redis_commands();
  var Multi = require_multi();
  var RedisClient = require_redis().RedisClient;
  var Command = require_command();
  var addCommand = function(command) {
    var commandName = command.replace(/(?:^([0-9])|[^a-zA-Z0-9_$])/g, "_$1");
    if (!RedisClient.prototype[command]) {
      RedisClient.prototype[command.toUpperCase()] = RedisClient.prototype[command] = function() {
        var arr;
        var len = arguments.length;
        var callback;
        var i = 0;
        if (Array.isArray(arguments[0])) {
          arr = arguments[0];
          if (len === 2) {
            callback = arguments[1];
          }
        } else if (len > 1 && Array.isArray(arguments[1])) {
          if (len === 3) {
            callback = arguments[2];
          }
          len = arguments[1].length;
          arr = new Array(len + 1);
          arr[0] = arguments[0];
          for (; i < len; i += 1) {
            arr[i + 1] = arguments[1][i];
          }
        } else {
          if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
            len--;
            callback = arguments[len];
          }
          arr = new Array(len);
          for (; i < len; i += 1) {
            arr[i] = arguments[i];
          }
        }
        return this.internal_send_command(new Command(command, arr, callback));
      };
      if (commandName !== command) {
        RedisClient.prototype[commandName.toUpperCase()] = RedisClient.prototype[commandName] = RedisClient.prototype[command];
      }
      Object.defineProperty(RedisClient.prototype[command], "name", {
        value: commandName
      });
    }
    if (!Multi.prototype[command]) {
      Multi.prototype[command.toUpperCase()] = Multi.prototype[command] = function() {
        var arr;
        var len = arguments.length;
        var callback;
        var i = 0;
        if (Array.isArray(arguments[0])) {
          arr = arguments[0];
          if (len === 2) {
            callback = arguments[1];
          }
        } else if (len > 1 && Array.isArray(arguments[1])) {
          if (len === 3) {
            callback = arguments[2];
          }
          len = arguments[1].length;
          arr = new Array(len + 1);
          arr[0] = arguments[0];
          for (; i < len; i += 1) {
            arr[i + 1] = arguments[1][i];
          }
        } else {
          if (len !== 0 && (typeof arguments[len - 1] === "function" || typeof arguments[len - 1] === "undefined")) {
            len--;
            callback = arguments[len];
          }
          arr = new Array(len);
          for (; i < len; i += 1) {
            arr[i] = arguments[i];
          }
        }
        this.queue.push(new Command(command, arr, callback));
        return this;
      };
      if (commandName !== command) {
        Multi.prototype[commandName.toUpperCase()] = Multi.prototype[commandName] = Multi.prototype[command];
      }
      Object.defineProperty(Multi.prototype[command], "name", {
        value: commandName
      });
    }
  };
  commands.list.forEach(addCommand);
  module2.exports = addCommand;
});

// node_modules/.pnpm/redis@3.1.0/node_modules/redis/index.js
var require_redis = __commonJS((exports2) => {
  "use strict";
  var net = require("net");
  var tls = require("tls");
  var util = require("util");
  var utils = require_utils();
  var Command = require_command();
  var Queue = require_denque();
  var errorClasses = require_customErrors();
  var EventEmitter = require("events");
  var Parser = require_redis_parser();
  var RedisErrors = require_redis_errors();
  var commands = require_redis_commands();
  var debug = require_debug();
  var unifyOptions = require_createClient();
  var SUBSCRIBE_COMMANDS = {
    subscribe: true,
    unsubscribe: true,
    psubscribe: true,
    punsubscribe: true
  };
  function noop() {
  }
  function handle_detect_buffers_reply(reply, command, buffer_args) {
    if (buffer_args === false || this.message_buffers) {
      reply = utils.reply_to_strings(reply);
    }
    if (command === "hgetall") {
      reply = utils.reply_to_object(reply);
    }
    return reply;
  }
  exports2.debug_mode = /\bredis\b/i.test(process.env.NODE_DEBUG);
  function RedisClient(options2, stream) {
    options2 = utils.clone(options2);
    EventEmitter.call(this);
    var cnx_options = {};
    var self = this;
    for (var tls_option in options2.tls) {
      cnx_options[tls_option] = options2.tls[tls_option];
      if (tls_option === "port" || tls_option === "host" || tls_option === "path" || tls_option === "family") {
        options2[tls_option] = options2.tls[tls_option];
      }
    }
    if (stream) {
      options2.stream = stream;
      this.address = '"Private stream"';
    } else if (options2.path) {
      cnx_options.path = options2.path;
      this.address = options2.path;
    } else {
      cnx_options.port = +options2.port || 6379;
      cnx_options.host = options2.host || "127.0.0.1";
      cnx_options.family = !options2.family && net.isIP(cnx_options.host) || (options2.family === "IPv6" ? 6 : 4);
      this.address = cnx_options.host + ":" + cnx_options.port;
    }
    this.connection_options = cnx_options;
    this.connection_id = RedisClient.connection_id++;
    this.connected = false;
    this.ready = false;
    if (options2.socket_keepalive === void 0) {
      options2.socket_keepalive = true;
    }
    if (options2.socket_initial_delay === void 0) {
      options2.socket_initial_delay = 0;
    }
    for (var command in options2.rename_commands) {
      options2.rename_commands[command.toLowerCase()] = options2.rename_commands[command];
    }
    options2.return_buffers = !!options2.return_buffers;
    options2.detect_buffers = !!options2.detect_buffers;
    if (options2.return_buffers && options2.detect_buffers) {
      self.warn("WARNING: You activated return_buffers and detect_buffers at the same time. The return value is always going to be a buffer.");
      options2.detect_buffers = false;
    }
    if (options2.detect_buffers) {
      this.handle_reply = handle_detect_buffers_reply;
    }
    this.should_buffer = false;
    this.command_queue = new Queue();
    this.offline_queue = new Queue();
    this.pipeline_queue = new Queue();
    this.connect_timeout = +options2.connect_timeout || 36e5;
    this.enable_offline_queue = options2.enable_offline_queue === false ? false : true;
    this.initialize_retry_vars();
    this.pub_sub_mode = 0;
    this.subscription_set = {};
    this.monitoring = false;
    this.message_buffers = false;
    this.closing = false;
    this.server_info = {};
    this.auth_pass = options2.auth_pass || options2.password;
    this.auth_user = options2.auth_user || options2.user;
    this.selected_db = options2.db;
    this.fire_strings = true;
    this.pipeline = false;
    this.sub_commands_left = 0;
    this.times_connected = 0;
    this.buffers = options2.return_buffers || options2.detect_buffers;
    this.options = options2;
    this.reply = "ON";
    this.create_stream();
    this.on("newListener", function(event) {
      if ((event === "message_buffer" || event === "pmessage_buffer" || event === "messageBuffer" || event === "pmessageBuffer") && !this.buffers && !this.message_buffers) {
        this.reply_parser.optionReturnBuffers = true;
        this.message_buffers = true;
        this.handle_reply = handle_detect_buffers_reply;
      }
    });
  }
  util.inherits(RedisClient, EventEmitter);
  RedisClient.connection_id = 0;
  function create_parser(self) {
    return new Parser({
      returnReply: function(data) {
        self.return_reply(data);
      },
      returnError: function(err) {
        self.return_error(err);
      },
      returnFatalError: function(err) {
        err.message += ". Please report this.";
        self.ready = false;
        self.flush_and_error({
          message: "Fatal error encountered. Command aborted.",
          code: "NR_FATAL"
        }, {
          error: err,
          queues: ["command_queue"]
        });
        self.emit("error", err);
        self.create_stream();
      },
      returnBuffers: self.buffers || self.message_buffers,
      stringNumbers: self.options.string_numbers || false
    });
  }
  RedisClient.prototype.create_stream = function() {
    var self = this;
    this.reply_parser = create_parser(this);
    if (this.options.stream) {
      if (this.stream) {
        return;
      }
      this.stream = this.options.stream;
    } else {
      if (this.stream) {
        this.stream.removeAllListeners();
        this.stream.destroy();
      }
      if (this.options.tls) {
        this.stream = tls.connect(this.connection_options);
      } else {
        this.stream = net.createConnection(this.connection_options);
      }
    }
    if (this.options.connect_timeout) {
      this.stream.setTimeout(this.connect_timeout, function() {
        self.retry_totaltime = self.connect_timeout;
        self.connection_gone("timeout");
      });
    }
    var connect_event = this.options.tls ? "secureConnect" : "connect";
    this.stream.once(connect_event, function() {
      this.removeAllListeners("timeout");
      self.times_connected++;
      self.on_connect();
    });
    this.stream.on("data", function(buffer_from_socket) {
      debug("Net read " + self.address + " id " + self.connection_id);
      self.reply_parser.execute(buffer_from_socket);
    });
    this.stream.on("error", function(err) {
      self.on_error(err);
    });
    this.stream.once("close", function(hadError) {
      self.connection_gone("close");
    });
    this.stream.once("end", function() {
      self.connection_gone("end");
    });
    this.stream.on("drain", function() {
      self.drain();
    });
    this.stream.setNoDelay();
    if (this.auth_pass !== void 0) {
      this.ready = true;
      this.auth(this.auth_pass, this.auth_user, function(err) {
        if (err && err.code !== "UNCERTAIN_STATE") {
          self.emit("error", err);
        }
      });
      this.ready = false;
    }
  };
  RedisClient.prototype.handle_reply = function(reply, command) {
    if (command === "hgetall") {
      reply = utils.reply_to_object(reply);
    }
    return reply;
  };
  RedisClient.prototype.cork = noop;
  RedisClient.prototype.uncork = noop;
  RedisClient.prototype.initialize_retry_vars = function() {
    this.retry_timer = null;
    this.retry_totaltime = 0;
    this.retry_delay = 200;
    this.retry_backoff = 1.7;
    this.attempts = 1;
  };
  RedisClient.prototype.warn = function(msg) {
    var self = this;
    process.nextTick(function() {
      if (self.listeners("warning").length !== 0) {
        self.emit("warning", msg);
      } else {
        console.warn("node_redis:", msg);
      }
    });
  };
  RedisClient.prototype.flush_and_error = function(error_attributes, options2) {
    options2 = options2 || {};
    var aggregated_errors = [];
    var queue_names = options2.queues || ["command_queue", "offline_queue"];
    for (var i = 0; i < queue_names.length; i++) {
      if (queue_names[i] === "command_queue") {
        error_attributes.message += " It might have been processed.";
      } else {
        error_attributes.message = error_attributes.message.replace(" It might have been processed.", "");
      }
      for (var command_obj = this[queue_names[i]].shift(); command_obj; command_obj = this[queue_names[i]].shift()) {
        var err = new errorClasses.AbortError(error_attributes);
        if (command_obj.error) {
          err.stack = err.stack + command_obj.error.stack.replace(/^Error.*?\n/, "\n");
        }
        err.command = command_obj.command.toUpperCase();
        if (command_obj.args && command_obj.args.length) {
          err.args = command_obj.args;
        }
        if (options2.error) {
          err.origin = options2.error;
        }
        if (typeof command_obj.callback === "function") {
          command_obj.callback(err);
        } else {
          aggregated_errors.push(err);
        }
      }
    }
    if (exports2.debug_mode && aggregated_errors.length) {
      var error;
      if (aggregated_errors.length === 1) {
        error = aggregated_errors[0];
      } else {
        error_attributes.message = error_attributes.message.replace("It", "They").replace(/command/i, "$&s");
        error = new errorClasses.AggregateError(error_attributes);
        error.errors = aggregated_errors;
      }
      this.emit("error", error);
    }
  };
  RedisClient.prototype.on_error = function(err) {
    if (this.closing) {
      return;
    }
    err.message = "Redis connection to " + this.address + " failed - " + err.message;
    debug(err.message);
    this.connected = false;
    this.ready = false;
    if (!this.options.retry_strategy) {
      this.emit("error", err);
    }
    this.connection_gone("error", err);
  };
  RedisClient.prototype.on_connect = function() {
    debug("Stream connected " + this.address + " id " + this.connection_id);
    this.connected = true;
    this.ready = false;
    this.emitted_end = false;
    this.stream.setKeepAlive(this.options.socket_keepalive, this.options.socket_initial_delay);
    this.stream.setTimeout(0);
    this.emit("connect");
    this.initialize_retry_vars();
    if (this.options.no_ready_check) {
      this.on_ready();
    } else {
      this.ready_check();
    }
  };
  RedisClient.prototype.on_ready = function() {
    var self = this;
    debug("on_ready called " + this.address + " id " + this.connection_id);
    this.ready = true;
    this.cork = function() {
      self.pipeline = true;
      if (self.stream.cork) {
        self.stream.cork();
      }
    };
    this.uncork = function() {
      if (self.fire_strings) {
        self.write_strings();
      } else {
        self.write_buffers();
      }
      self.pipeline = false;
      self.fire_strings = true;
      if (self.stream.uncork) {
        self.stream.uncork();
      }
    };
    if (this.selected_db !== void 0) {
      this.internal_send_command(new Command("select", [this.selected_db]));
    }
    if (this.monitoring) {
      this.internal_send_command(new Command("monitor", []));
    }
    var callback_count = Object.keys(this.subscription_set).length;
    if (!this.options.disable_resubscribing && callback_count) {
      var callback = function() {
        callback_count--;
        if (callback_count === 0) {
          self.emit("ready");
        }
      };
      debug("Sending pub/sub on_ready commands");
      for (var key in this.subscription_set) {
        var command = key.slice(0, key.indexOf("_"));
        var args = this.subscription_set[key];
        this[command]([args], callback);
      }
      this.send_offline_queue();
      return;
    }
    this.send_offline_queue();
    this.emit("ready");
  };
  RedisClient.prototype.on_info_cmd = function(err, res) {
    if (err) {
      if (err.message === "ERR unknown command 'info'") {
        this.on_ready();
        return;
      }
      err.message = "Ready check failed: " + err.message;
      this.emit("error", err);
      return;
    }
    if (!res) {
      debug("The info command returned without any data.");
      this.on_ready();
      return;
    }
    if (!this.server_info.loading || this.server_info.loading === "0") {
      if (this.server_info.master_link_status && this.server_info.master_link_status !== "up") {
        this.server_info.loading_eta_seconds = 0.05;
      } else {
        debug("Redis server ready.");
        this.on_ready();
        return;
      }
    }
    var retry_time = +this.server_info.loading_eta_seconds * 1e3;
    if (retry_time > 1e3) {
      retry_time = 1e3;
    }
    debug("Redis server still loading, trying again in " + retry_time);
    setTimeout(function(self) {
      self.ready_check();
    }, retry_time, this);
  };
  RedisClient.prototype.ready_check = function() {
    var self = this;
    debug("Checking server ready state...");
    this.ready = true;
    this.info(function(err, res) {
      self.on_info_cmd(err, res);
    });
    this.ready = false;
  };
  RedisClient.prototype.send_offline_queue = function() {
    for (var command_obj = this.offline_queue.shift(); command_obj; command_obj = this.offline_queue.shift()) {
      debug("Sending offline command: " + command_obj.command);
      this.internal_send_command(command_obj);
    }
    this.drain();
  };
  var retry_connection = function(self, error) {
    debug("Retrying connection...");
    var reconnect_params = {
      delay: self.retry_delay,
      attempt: self.attempts,
      error
    };
    if (self.options.camel_case) {
      reconnect_params.totalRetryTime = self.retry_totaltime;
      reconnect_params.timesConnected = self.times_connected;
    } else {
      reconnect_params.total_retry_time = self.retry_totaltime;
      reconnect_params.times_connected = self.times_connected;
    }
    self.emit("reconnecting", reconnect_params);
    self.retry_totaltime += self.retry_delay;
    self.attempts += 1;
    self.retry_delay = Math.round(self.retry_delay * self.retry_backoff);
    self.create_stream();
    self.retry_timer = null;
  };
  RedisClient.prototype.connection_gone = function(why, error) {
    if (this.retry_timer) {
      return;
    }
    error = error || null;
    debug("Redis connection is gone from " + why + " event.");
    this.connected = false;
    this.ready = false;
    this.cork = noop;
    this.uncork = noop;
    this.pipeline = false;
    this.pub_sub_mode = 0;
    if (!this.emitted_end) {
      this.emit("end");
      this.emitted_end = true;
    }
    if (this.closing) {
      debug("Connection ended by quit / end command, not retrying.");
      this.flush_and_error({
        message: "Stream connection ended and command aborted.",
        code: "NR_CLOSED"
      }, {
        error
      });
      return;
    }
    if (typeof this.options.retry_strategy === "function") {
      var retry_params = {
        attempt: this.attempts,
        error
      };
      if (this.options.camel_case) {
        retry_params.totalRetryTime = this.retry_totaltime;
        retry_params.timesConnected = this.times_connected;
      } else {
        retry_params.total_retry_time = this.retry_totaltime;
        retry_params.times_connected = this.times_connected;
      }
      this.retry_delay = this.options.retry_strategy(retry_params);
      if (typeof this.retry_delay !== "number") {
        if (this.retry_delay instanceof Error) {
          error = this.retry_delay;
        }
        var errorMessage = "Redis connection in broken state: retry aborted.";
        this.flush_and_error({
          message: errorMessage,
          code: "CONNECTION_BROKEN"
        }, {
          error
        });
        var retryError = new Error(errorMessage);
        retryError.code = "CONNECTION_BROKEN";
        if (error) {
          retryError.origin = error;
        }
        this.end(false);
        this.emit("error", retryError);
        return;
      }
    }
    if (this.retry_totaltime >= this.connect_timeout) {
      var message = "Redis connection in broken state: connection timeout exceeded.";
      this.flush_and_error({
        message,
        code: "CONNECTION_BROKEN"
      }, {
        error
      });
      var err = new Error(message);
      err.code = "CONNECTION_BROKEN";
      if (error) {
        err.origin = error;
      }
      this.end(false);
      this.emit("error", err);
      return;
    }
    if (this.options.retry_unfulfilled_commands) {
      this.offline_queue.unshift.apply(this.offline_queue, this.command_queue.toArray());
      this.command_queue.clear();
    } else if (this.command_queue.length !== 0) {
      this.flush_and_error({
        message: "Redis connection lost and command aborted.",
        code: "UNCERTAIN_STATE"
      }, {
        error,
        queues: ["command_queue"]
      });
    }
    if (this.retry_totaltime + this.retry_delay > this.connect_timeout) {
      this.retry_delay = this.connect_timeout - this.retry_totaltime;
    }
    debug("Retry connection in " + this.retry_delay + " ms");
    this.retry_timer = setTimeout(retry_connection, this.retry_delay, this, error);
  };
  RedisClient.prototype.return_error = function(err) {
    var command_obj = this.command_queue.shift();
    if (command_obj.error) {
      err.stack = command_obj.error.stack.replace(/^Error.*?\n/, "ReplyError: " + err.message + "\n");
    }
    err.command = command_obj.command.toUpperCase();
    if (command_obj.args && command_obj.args.length) {
      err.args = command_obj.args;
    }
    if (this.pub_sub_mode > 1) {
      this.pub_sub_mode--;
    }
    var match = err.message.match(utils.err_code);
    if (match) {
      err.code = match[1];
    }
    utils.callback_or_emit(this, command_obj.callback, err);
  };
  RedisClient.prototype.drain = function() {
    this.should_buffer = false;
  };
  function normal_reply(self, reply) {
    var command_obj = self.command_queue.shift();
    if (typeof command_obj.callback === "function") {
      if (command_obj.command !== "exec") {
        reply = self.handle_reply(reply, command_obj.command, command_obj.buffer_args);
      }
      command_obj.callback(null, reply);
    } else {
      debug("No callback for reply");
    }
  }
  function subscribe_unsubscribe(self, reply, type) {
    var command_obj = self.command_queue.get(0);
    var buffer = self.options.return_buffers || self.options.detect_buffers && command_obj.buffer_args;
    var channel = buffer || reply[1] === null ? reply[1] : reply[1].toString();
    var count = +reply[2];
    debug(type, channel);
    if (channel !== null) {
      self.emit(type, channel, count);
      if (type === "subscribe" || type === "psubscribe") {
        self.subscription_set[type + "_" + channel] = channel;
      } else {
        type = type === "unsubscribe" ? "subscribe" : "psubscribe";
        delete self.subscription_set[type + "_" + channel];
      }
    }
    if (command_obj.args.length === 1 || self.sub_commands_left === 1 || command_obj.args.length === 0 && (count === 0 || channel === null)) {
      if (count === 0) {
        var running_command;
        var i = 1;
        self.pub_sub_mode = 0;
        while (running_command = self.command_queue.get(i)) {
          if (SUBSCRIBE_COMMANDS[running_command.command]) {
            self.pub_sub_mode = i;
            break;
          }
          i++;
        }
      }
      self.command_queue.shift();
      if (typeof command_obj.callback === "function") {
        command_obj.callback(null, channel);
      }
      self.sub_commands_left = 0;
    } else {
      if (self.sub_commands_left !== 0) {
        self.sub_commands_left--;
      } else {
        self.sub_commands_left = command_obj.args.length ? command_obj.args.length - 1 : count;
      }
    }
  }
  function return_pub_sub(self, reply) {
    var type = reply[0].toString();
    if (type === "message") {
      if (!self.options.return_buffers || self.message_buffers) {
        self.emit("message", reply[1].toString(), reply[2].toString());
        self.emit("message_buffer", reply[1], reply[2]);
        self.emit("messageBuffer", reply[1], reply[2]);
      } else {
        self.emit("message", reply[1], reply[2]);
      }
    } else if (type === "pmessage") {
      if (!self.options.return_buffers || self.message_buffers) {
        self.emit("pmessage", reply[1].toString(), reply[2].toString(), reply[3].toString());
        self.emit("pmessage_buffer", reply[1], reply[2], reply[3]);
        self.emit("pmessageBuffer", reply[1], reply[2], reply[3]);
      } else {
        self.emit("pmessage", reply[1], reply[2], reply[3]);
      }
    } else {
      subscribe_unsubscribe(self, reply, type);
    }
  }
  RedisClient.prototype.return_reply = function(reply) {
    if (this.monitoring) {
      var replyStr;
      if (this.buffers && Buffer.isBuffer(reply)) {
        replyStr = reply.toString();
      } else {
        replyStr = reply;
      }
      if (typeof replyStr === "string" && utils.monitor_regex.test(replyStr)) {
        var timestamp2 = replyStr.slice(0, replyStr.indexOf(" "));
        var args = replyStr.slice(replyStr.indexOf('"') + 1, -1).split('" "').map(function(elem) {
          return elem.replace(/\\"/g, '"');
        });
        this.emit("monitor", timestamp2, args, replyStr);
        return;
      }
    }
    if (this.pub_sub_mode === 0) {
      normal_reply(this, reply);
    } else if (this.pub_sub_mode !== 1) {
      this.pub_sub_mode--;
      normal_reply(this, reply);
    } else if (!(reply instanceof Array) || reply.length <= 2) {
      normal_reply(this, reply);
    } else {
      return_pub_sub(this, reply);
    }
  };
  function handle_offline_command(self, command_obj) {
    var command = command_obj.command;
    var err, msg;
    if (self.closing || !self.enable_offline_queue) {
      command = command.toUpperCase();
      if (!self.closing) {
        if (self.stream.writable) {
          msg = "The connection is not yet established and the offline queue is deactivated.";
        } else {
          msg = "Stream not writeable.";
        }
      } else {
        msg = "The connection is already closed.";
      }
      err = new errorClasses.AbortError({
        message: command + " can't be processed. " + msg,
        code: "NR_CLOSED",
        command
      });
      if (command_obj.args.length) {
        err.args = command_obj.args;
      }
      utils.reply_in_order(self, command_obj.callback, err);
    } else {
      debug("Queueing " + command + " for next server connection.");
      self.offline_queue.push(command_obj);
    }
    self.should_buffer = true;
  }
  RedisClient.prototype.internal_send_command = function(command_obj) {
    var arg, prefix_keys;
    var i = 0;
    var command_str = "";
    var args = command_obj.args;
    var command = command_obj.command;
    var len = args.length;
    var big_data = false;
    var args_copy = new Array(len);
    if (process.domain && command_obj.callback) {
      command_obj.callback = process.domain.bind(command_obj.callback);
    }
    if (this.ready === false || this.stream.writable === false) {
      handle_offline_command(this, command_obj);
      return false;
    }
    for (i = 0; i < len; i += 1) {
      if (typeof args[i] === "string") {
        if (args[i].length > 3e4) {
          big_data = true;
          args_copy[i] = Buffer.from(args[i], "utf8");
        } else {
          args_copy[i] = args[i];
        }
      } else if (typeof args[i] === "object") {
        if (args[i] instanceof Date) {
          args_copy[i] = args[i].toString();
        } else if (Buffer.isBuffer(args[i])) {
          args_copy[i] = args[i];
          command_obj.buffer_args = true;
          big_data = true;
        } else {
          var invalidArgError = new Error("node_redis: The " + command.toUpperCase() + " command contains a invalid argument type.\nOnly strings, dates and buffers are accepted. Please update your code to use valid argument types.");
          invalidArgError.command = command_obj.command.toUpperCase();
          if (command_obj.args && command_obj.args.length) {
            invalidArgError.args = command_obj.args;
          }
          if (command_obj.callback) {
            command_obj.callback(invalidArgError);
            return false;
          }
          throw invalidArgError;
        }
      } else if (typeof args[i] === "undefined") {
        var undefinedArgError = new Error("node_redis: The " + command.toUpperCase() + ' command contains a invalid argument type of "undefined".\nOnly strings, dates and buffers are accepted. Please update your code to use valid argument types.');
        undefinedArgError.command = command_obj.command.toUpperCase();
        if (command_obj.args && command_obj.args.length) {
          undefinedArgError.args = command_obj.args;
        }
        command_obj.callback(undefinedArgError);
        return false;
      } else {
        args_copy[i] = "" + args[i];
      }
    }
    if (this.options.prefix) {
      prefix_keys = commands.getKeyIndexes(command, args_copy);
      for (i = prefix_keys.pop(); i !== void 0; i = prefix_keys.pop()) {
        args_copy[i] = this.options.prefix + args_copy[i];
      }
    }
    if (this.options.rename_commands && this.options.rename_commands[command]) {
      command = this.options.rename_commands[command];
    }
    command_str = "*" + (len + 1) + "\r\n$" + command.length + "\r\n" + command + "\r\n";
    if (big_data === false) {
      for (i = 0; i < len; i += 1) {
        arg = args_copy[i];
        command_str += "$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n";
      }
      debug("Send " + this.address + " id " + this.connection_id + ": " + command_str);
      this.write(command_str);
    } else {
      debug("Send command (" + command_str + ") has Buffer arguments");
      this.fire_strings = false;
      this.write(command_str);
      for (i = 0; i < len; i += 1) {
        arg = args_copy[i];
        if (typeof arg === "string") {
          this.write("$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n");
        } else {
          this.write("$" + arg.length + "\r\n");
          this.write(arg);
          this.write("\r\n");
        }
        debug("send_command: buffer send " + arg.length + " bytes");
      }
    }
    if (command_obj.call_on_write) {
      command_obj.call_on_write();
    }
    if (this.reply === "ON") {
      this.command_queue.push(command_obj);
    } else {
      if (command_obj.callback) {
        utils.reply_in_order(this, command_obj.callback, null, void 0, this.command_queue);
      }
      if (this.reply === "SKIP") {
        this.reply = "SKIP_ONE_MORE";
      } else if (this.reply === "SKIP_ONE_MORE") {
        this.reply = "ON";
      }
    }
    return !this.should_buffer;
  };
  RedisClient.prototype.write_strings = function() {
    var str = "";
    for (var command = this.pipeline_queue.shift(); command; command = this.pipeline_queue.shift()) {
      if (str.length + command.length > 4 * 1024 * 1024) {
        this.should_buffer = !this.stream.write(str);
        str = "";
      }
      str += command;
    }
    if (str !== "") {
      this.should_buffer = !this.stream.write(str);
    }
  };
  RedisClient.prototype.write_buffers = function() {
    for (var command = this.pipeline_queue.shift(); command; command = this.pipeline_queue.shift()) {
      this.should_buffer = !this.stream.write(command);
    }
  };
  RedisClient.prototype.write = function(data) {
    if (this.pipeline === false) {
      this.should_buffer = !this.stream.write(data);
      return;
    }
    this.pipeline_queue.push(data);
  };
  Object.defineProperty(exports2, "debugMode", {
    get: function() {
      return this.debug_mode;
    },
    set: function(val) {
      this.debug_mode = val;
    }
  });
  Object.defineProperty(RedisClient.prototype, "command_queue_length", {
    get: function() {
      return this.command_queue.length;
    }
  });
  Object.defineProperty(RedisClient.prototype, "offline_queue_length", {
    get: function() {
      return this.offline_queue.length;
    }
  });
  Object.defineProperty(RedisClient.prototype, "retryDelay", {
    get: function() {
      return this.retry_delay;
    }
  });
  Object.defineProperty(RedisClient.prototype, "retryBackoff", {
    get: function() {
      return this.retry_backoff;
    }
  });
  Object.defineProperty(RedisClient.prototype, "commandQueueLength", {
    get: function() {
      return this.command_queue.length;
    }
  });
  Object.defineProperty(RedisClient.prototype, "offlineQueueLength", {
    get: function() {
      return this.offline_queue.length;
    }
  });
  Object.defineProperty(RedisClient.prototype, "shouldBuffer", {
    get: function() {
      return this.should_buffer;
    }
  });
  Object.defineProperty(RedisClient.prototype, "connectionId", {
    get: function() {
      return this.connection_id;
    }
  });
  Object.defineProperty(RedisClient.prototype, "serverInfo", {
    get: function() {
      return this.server_info;
    }
  });
  exports2.createClient = function() {
    return new RedisClient(unifyOptions.apply(null, arguments));
  };
  exports2.RedisClient = RedisClient;
  exports2.print = utils.print;
  exports2.Multi = require_multi();
  exports2.AbortError = errorClasses.AbortError;
  exports2.RedisError = RedisErrors.RedisError;
  exports2.ParserError = RedisErrors.ParserError;
  exports2.ReplyError = RedisErrors.ReplyError;
  exports2.AggregateError = errorClasses.AggregateError;
  require_individualCommands();
  require_extendedApi();
  exports2.addCommand = exports2.add_command = require_commands2();
});

// server:server_development.js
var import_derver = __toModule(require_derver_cjs());
var import_path = __toModule(require("path"));
var DIR = import_path.default.join(__dirname, "../client");
function server_development_default(options2) {
  return (0, import_derver.derver)({
    dir: DIR,
    ...options2,
    remote: "svelte_derver_starter"
  });
}

// src/server/redis.js
var import_redis = __toModule(require_redis());
var import_util = __toModule(require("util"));
var DEV = process.env.NODE_ENV === "dev";
var host = DEV ? "localhost" : "redis";
var options = {
  host,
  port: 6379,
  password: "timestamp",
  db: 0,
  socket: ""
};
var client = (0, import_redis.createClient)(options);
var hgetall = (0, import_util.promisify)(client.hgetall).bind(client);
var keys = (0, import_util.promisify)(client.keys).bind(client);
var id = new Date().getTime();
var timestamp = new Date();
var redis_default = {migration, get, post, update, del};
async function migration() {
  client.on("connect", () => {
    console.log("Connected to Redis");
  });
  client.auth(options.password, import_redis.print);
  client.hset("book:1", [
    "title",
    "The Little Redis Book",
    "author",
    "Karl Seguin",
    "description",
    "The Little Redis Book is a free book introducing Redis.",
    "create",
    timestamp
  ], (err, reply) => {
    if (err) {
      console.log(err);
    }
    console.log(reply);
  });
  client.hset("user:1", [
    "role",
    "admin",
    "email",
    "The Little Redis Book",
    "password",
    "Karl Seguin",
    "description",
    "The Little Redis Book is a free book introducing Redis.",
    "create",
    timestamp
  ], (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
  client.hset("user:2", [
    "role",
    "publisher",
    "email",
    "The Little Redis Book",
    "password",
    "Karl Seguin",
    "description",
    "The Little Redis Book is a free book introducing Redis.",
    "create",
    timestamp
  ]);
  client.hset("role:admin:1", [
    "role",
    "admin",
    "email",
    "The Little Redis Book",
    "password",
    "Karl Seguin",
    "description",
    "The Little Redis Book is a free book introducing Redis.",
    "create",
    timestamp
  ]);
  client.hset("role:admin:2", [
    "role",
    "admin",
    "email",
    "The Little Redis Book",
    "password",
    "Karl Seguin",
    "description",
    "The Little Redis Book is a free book introducing Redis.",
    "create",
    timestamp
  ]);
  client.hset("role:1", [
    "role",
    "admin",
    "email",
    "The Little Redis Book",
    "password",
    "Karl Seguin",
    "description",
    "The Little Redis Book is a free book introducing Redis.",
    "create",
    timestamp
  ]);
}
async function get(req, res) {
  if (req.params.id) {
    await hgetall(req.params.id).then((obj) => res.json({_id: req.params.id, ...obj}));
  } else {
    let hashes = await keys(req.params.type);
    let promises = hashes.map((key) => {
      return hgetall(key).then((obj) => {
        return {_id: key, ...obj};
      });
    });
    Promise.all(promises).then((data) => res.json(data));
    MHGETALL(hashes, (err, arr) => {
      console.log("Received output from Redis Multi/Exec:");
      console.dir(arr);
    });
  }
}
function MHGETALL(keys2, cb) {
  const multi = client.multi();
  keys2.map((key) => {
    return multi.hgetall(key, (err, obj) => {
      obj = {_id: key, ...obj};
      return obj;
    });
  });
  multi.exec((err, result) => {
    cb(err, result);
  });
}
async function post(req, res, next) {
  const {
    title,
    author,
    description
  } = req.body;
  client.hset(req.params.type + id, [
    "title",
    title,
    "author",
    author,
    "description",
    description,
    "create",
    timestamp,
    "update",
    timestamp
  ], (err, reply) => {
    res.send("Add succesfully");
  });
}
async function update(req, res, next) {
  const {
    title,
    author,
    description
  } = req.body;
  client.hmset(req.params.id, [
    "title",
    title,
    "author",
    author,
    "description",
    description,
    "update",
    timestamp
  ], (err, reply) => {
    res.send("Updated succesfully");
  });
}
async function del(req, res) {
  client.del(req.params.id, (err, reply) => {
    console.log(reply);
    res.send("User deleted successfully");
  });
}

// src/server/middlewares.js
function log(req, res, next) {
  console.log({
    "req.method": req.method,
    "req.headers": req.headers,
    "req.url": req.url,
    "req.path": req.path,
    "req.query": req.query,
    "req.params": req.params,
    "req.body": req.body
  });
  next();
}
function json(req, res, next) {
  res.json = (obj) => {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(obj));
  };
  next();
}
function body(req, res, next, data = "") {
  if (req.method === "POST" || req.method === "PUT") {
    req.on("data", (chunk) => {
      data += decodeURIComponent(chunk);
    });
    req.on("end", (decode) => {
      req.body = JSON.parse(data);
      next();
    });
  } else {
    next();
  }
}

// src/server/main.js
var DEV2 = process.env.NODE_ENV === "dev";
var app = server_development_default({
  port: DEV2 ? 3131 : 1313,
  spa: true,
  host: "0.0.0.0",
  cache: 3600
});
app.sub("/api", (app2) => {
  app2.use(body);
  app2.use(json);
  app2.use(log);
  app2.get("/:type", redis_default.get);
  app2.get("/:type/:id", redis_default.get);
  app2.post("/:type", redis_default.post);
  app2.put("/:type/:id", redis_default.update);
  app2.delete("/:type/:id", redis_default.del);
});
console.log("Start migrations");
redis_default.migration();
//# sourceMappingURL=server.js.map
