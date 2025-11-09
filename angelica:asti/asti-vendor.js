/*! For license information please see vendor.js.LICENSE.txt */
(window.webpackJsonp = window.webpackJsonp || []).push([[0], [function(e, t, i) {
    var n;
    !function(t, i) {
        "use strict";
        "object" == typeof e.exports ? e.exports = t.document ? i(t, !0) : function(e) {
            if (!e.document)
                throw new Error("jQuery requires a window with a document");
            return i(e)
        } : i(t)
    }("undefined" != typeof window ? window : this, (function(i, r) {
        "use strict";
        var s = [],
            o = i.document,
            a = Object.getPrototypeOf,
            l = s.slice,
            c = s.concat,
            d = s.push,
            u = s.indexOf,
            p = {},
            h = p.toString,
            f = p.hasOwnProperty,
            m = f.toString,
            g = m.call(Object),
            v = {},
            y = function(e) {
                return "function" == typeof e && "number" != typeof e.nodeType
            },
            b = function(e) {
                return null != e && e === e.window
            },
            w = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };
        function x(e, t, i) {
            var n,
                r,
                s = (i = i || o).createElement("script");
            if (s.text = e, t)
                for (n in w)
                    (r = t[n] || t.getAttribute && t.getAttribute(n)) && s.setAttribute(n, r);
            i.head.appendChild(s).parentNode.removeChild(s)
        }
        function T(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? p[h.call(e)] || "object" : typeof e
        }
        var E = function(e, t) {
                return new E.fn.init(e, t)
            },
            S = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        function C(e) {
            var t = !!e && "length" in e && e.length,
                i = T(e);
            return !y(e) && !b(e) && ("array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }
        E.fn = E.prototype = {
            jquery: "3.4.1",
            constructor: E,
            length: 0,
            toArray: function() {
                return l.call(this)
            },
            get: function(e) {
                return null == e ? l.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = E.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return E.each(this, e)
            },
            map: function(e) {
                return this.pushStack(E.map(this, (function(t, i) {
                    return e.call(t, i, t)
                })))
            },
            slice: function() {
                return this.pushStack(l.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    i = +e + (e < 0 ? t : 0);
                return this.pushStack(i >= 0 && i < t ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: d,
            sort: s.sort,
            splice: s.splice
        },
        E.extend = E.fn.extend = function() {
            var e,
                t,
                i,
                n,
                r,
                s,
                o = arguments[0] || {},
                a = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof o && (c = o, o = arguments[a] || {}, a++), "object" == typeof o || y(o) || (o = {}), a === l && (o = this, a--); a < l; a++)
                if (null != (e = arguments[a]))
                    for (t in e)
                        n = e[t],
                        "__proto__" !== t && o !== n && (c && n && (E.isPlainObject(n) || (r = Array.isArray(n))) ? (i = o[t], s = r && !Array.isArray(i) ? [] : r || E.isPlainObject(i) ? i : {}, r = !1, o[t] = E.extend(c, s, n)) : void 0 !== n && (o[t] = n));
            return o
        },
        E.extend({
            expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                var t,
                    i;
                return !(!e || "[object Object]" !== h.call(e)) && (!(t = a(e)) || "function" == typeof (i = f.call(t, "constructor") && t.constructor) && m.call(i) === g)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            globalEval: function(e, t) {
                x(e, {
                    nonce: t && t.nonce
                })
            },
            each: function(e, t) {
                var i,
                    n = 0;
                if (C(e))
                    for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++)
                        ;
                else
                    for (n in e)
                        if (!1 === t.call(e[n], n, e[n]))
                            break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(S, "")
            },
            makeArray: function(e, t) {
                var i = t || [];
                return null != e && (C(Object(e)) ? E.merge(i, "string" == typeof e ? [e] : e) : d.call(i, e)), i
            },
            inArray: function(e, t, i) {
                return null == t ? -1 : u.call(t, e, i)
            },
            merge: function(e, t) {
                for (var i = +t.length, n = 0, r = e.length; n < i; n++)
                    e[r++] = t[n];
                return e.length = r, e
            },
            grep: function(e, t, i) {
                for (var n = [], r = 0, s = e.length, o = !i; r < s; r++)
                    !t(e[r], r) !== o && n.push(e[r]);
                return n
            },
            map: function(e, t, i) {
                var n,
                    r,
                    s = 0,
                    o = [];
                if (C(e))
                    for (n = e.length; s < n; s++)
                        null != (r = t(e[s], s, i)) && o.push(r);
                else
                    for (s in e)
                        null != (r = t(e[s], s, i)) && o.push(r);
                return c.apply([], o)
            },
            guid: 1,
            support: v
        }),
        "function" == typeof Symbol && (E.fn[Symbol.iterator] = s[Symbol.iterator]),
        E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
            p["[object " + t + "]"] = t.toLowerCase()
        }));
        var k = function(e) {
            var t,
                i,
                n,
                r,
                s,
                o,
                a,
                l,
                c,
                d,
                u,
                p,
                h,
                f,
                m,
                g,
                v,
                y,
                b,
                w = "sizzle" + 1 * new Date,
                x = e.document,
                T = 0,
                E = 0,
                S = le(),
                C = le(),
                k = le(),
                M = le(),
                $ = function(e, t) {
                    return e === t && (u = !0), 0
                },
                z = {}.hasOwnProperty,
                L = [],
                P = L.pop,
                A = L.push,
                D = L.push,
                I = L.slice,
                N = function(e, t) {
                    for (var i = 0, n = e.length; i < n; i++)
                        if (e[i] === t)
                            return i;
                    return -1
                },
                O = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                H = "[\\x20\\t\\r\\n\\f]",
                j = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                _ = "\\[" + H + "*(" + j + ")(?:" + H + "*([*^$|!~]?=)" + H + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + j + "))|)" + H + "*\\]",
                q = ":(" + j + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + _ + ")*)|.*)\\)|)",
                B = new RegExp(H + "+", "g"),
                R = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
                X = new RegExp("^" + H + "*," + H + "*"),
                F = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
                Y = new RegExp(H + "|>"),
                W = new RegExp(q),
                V = new RegExp("^" + j + "$"),
                G = {
                    ID: new RegExp("^#(" + j + ")"),
                    CLASS: new RegExp("^\\.(" + j + ")"),
                    TAG: new RegExp("^(" + j + "|[*])"),
                    ATTR: new RegExp("^" + _),
                    PSEUDO: new RegExp("^" + q),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + O + ")$", "i"),
                    needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", "i")
                },
                U = /HTML$/i,
                K = /^(?:input|select|textarea|button)$/i,
                Z = /^h\d$/i,
                Q = /^[^{]+\{\s*\[native \w/,
                J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ee = /[+~]/,
                te = new RegExp("\\\\([\\da-f]{1,6}" + H + "?|(" + H + ")|.)", "ig"),
                ie = function(e, t, i) {
                    var n = "0x" + t - 65536;
                    return n != n || i ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                },
                ne = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                re = function(e, t) {
                    return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                },
                se = function() {
                    p()
                },
                oe = we((function(e) {
                    return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                }), {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                D.apply(L = I.call(x.childNodes), x.childNodes),
                L[x.childNodes.length].nodeType
            } catch (e) {
                D = {
                    apply: L.length ? function(e, t) {
                        A.apply(e, I.call(t))
                    } : function(e, t) {
                        for (var i = e.length, n = 0; e[i++] = t[n++];)
                            ;
                        e.length = i - 1
                    }
                }
            }
            function ae(e, t, n, r) {
                var s,
                    a,
                    c,
                    d,
                    u,
                    f,
                    v,
                    y = t && t.ownerDocument,
                    T = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T)
                    return n;
                if (!r && ((t ? t.ownerDocument || t : x) !== h && p(t), t = t || h, m)) {
                    if (11 !== T && (u = J.exec(e)))
                        if (s = u[1]) {
                            if (9 === T) {
                                if (!(c = t.getElementById(s)))
                                    return n;
                                if (c.id === s)
                                    return n.push(c), n
                            } else if (y && (c = y.getElementById(s)) && b(t, c) && c.id === s)
                                return n.push(c), n
                        } else {
                            if (u[2])
                                return D.apply(n, t.getElementsByTagName(e)), n;
                            if ((s = u[3]) && i.getElementsByClassName && t.getElementsByClassName)
                                return D.apply(n, t.getElementsByClassName(s)), n
                        }
                    if (i.qsa && !M[e + " "] && (!g || !g.test(e)) && (1 !== T || "object" !== t.nodeName.toLowerCase())) {
                        if (v = e, y = t, 1 === T && Y.test(e)) {
                            for ((d = t.getAttribute("id")) ? d = d.replace(ne, re) : t.setAttribute("id", d = w), a = (f = o(e)).length; a--;)
                                f[a] = "#" + d + " " + be(f[a]);
                            v = f.join(","),
                            y = ee.test(e) && ve(t.parentNode) || t
                        }
                        try {
                            return D.apply(n, y.querySelectorAll(v)), n
                        } catch (t) {
                            M(e, !0)
                        } finally {
                            d === w && t.removeAttribute("id")
                        }
                    }
                }
                return l(e.replace(R, "$1"), t, n, r)
            }
            function le() {
                var e = [];
                return function t(i, r) {
                    return e.push(i + " ") > n.cacheLength && delete t[e.shift()], t[i + " "] = r
                }
            }
            function ce(e) {
                return e[w] = !0, e
            }
            function de(e) {
                var t = h.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t),
                    t = null
                }
            }
            function ue(e, t) {
                for (var i = e.split("|"), r = i.length; r--;)
                    n.attrHandle[i[r]] = t
            }
            function pe(e, t) {
                var i = t && e,
                    n = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (n)
                    return n;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === t)
                            return -1;
                return e ? 1 : -1
            }
            function he(e) {
                return function(t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }
            function fe(e) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && t.type === e
                }
            }
            function me(e) {
                return function(t) {
                    return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && oe(t) === e : t.disabled === e : "label" in t && t.disabled === e
                }
            }
            function ge(e) {
                return ce((function(t) {
                    return t = +t, ce((function(i, n) {
                        for (var r, s = e([], i.length, t), o = s.length; o--;)
                            i[r = s[o]] && (i[r] = !(n[r] = i[r]))
                    }))
                }))
            }
            function ve(e) {
                return e && void 0 !== e.getElementsByTagName && e
            }
            for (t in i = ae.support = {}, s = ae.isXML = function(e) {
                var t = e.namespaceURI,
                    i = (e.ownerDocument || e).documentElement;
                return !U.test(t || i && i.nodeName || "HTML")
            }, p = ae.setDocument = function(e) {
                var t,
                    r,
                    o = e ? e.ownerDocument || e : x;
                return o !== h && 9 === o.nodeType && o.documentElement ? (f = (h = o).documentElement, m = !s(h), x !== h && (r = h.defaultView) && r.top !== r && (r.addEventListener ? r.addEventListener("unload", se, !1) : r.attachEvent && r.attachEvent("onunload", se)), i.attributes = de((function(e) {
                    return e.className = "i", !e.getAttribute("className")
                })), i.getElementsByTagName = de((function(e) {
                    return e.appendChild(h.createComment("")), !e.getElementsByTagName("*").length
                })), i.getElementsByClassName = Q.test(h.getElementsByClassName), i.getById = de((function(e) {
                    return f.appendChild(e).id = w, !h.getElementsByName || !h.getElementsByName(w).length
                })), i.getById ? (n.filter.ID = function(e) {
                    var t = e.replace(te, ie);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }, n.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && m) {
                        var i = t.getElementById(e);
                        return i ? [i] : []
                    }
                }) : (n.filter.ID = function(e) {
                    var t = e.replace(te, ie);
                    return function(e) {
                        var i = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return i && i.value === t
                    }
                }, n.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && m) {
                        var i,
                            n,
                            r,
                            s = t.getElementById(e);
                        if (s) {
                            if ((i = s.getAttributeNode("id")) && i.value === e)
                                return [s];
                            for (r = t.getElementsByName(e), n = 0; s = r[n++];)
                                if ((i = s.getAttributeNode("id")) && i.value === e)
                                    return [s]
                        }
                        return []
                    }
                }), n.find.TAG = i.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : i.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var i,
                        n = [],
                        r = 0,
                        s = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; i = s[r++];)
                            1 === i.nodeType && n.push(i);
                        return n
                    }
                    return s
                }, n.find.CLASS = i.getElementsByClassName && function(e, t) {
                    if (void 0 !== t.getElementsByClassName && m)
                        return t.getElementsByClassName(e)
                }, v = [], g = [], (i.qsa = Q.test(h.querySelectorAll)) && (de((function(e) {
                    f.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                    e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + H + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length || g.push("\\[" + H + "*(?:value|" + O + ")"),
                    e.querySelectorAll("[id~=" + w + "-]").length || g.push("~="),
                    e.querySelectorAll(":checked").length || g.push(":checked"),
                    e.querySelectorAll("a#" + w + "+*").length || g.push(".#.+[+~]")
                })), de((function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = h.createElement("input");
                    t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length && g.push("name" + H + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"),
                    f.appendChild(e).disabled = !0,
                    2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    g.push(",.*:")
                }))), (i.matchesSelector = Q.test(y = f.matches || f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && de((function(e) {
                    i.disconnectedMatch = y.call(e, "*"),
                    y.call(e, "[s!='']:x"),
                    v.push("!=", q)
                })), g = g.length && new RegExp(g.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(f.compareDocumentPosition), b = t || Q.test(f.contains) ? function(e, t) {
                    var i = 9 === e.nodeType ? e.documentElement : e,
                        n = t && t.parentNode;
                    return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e)
                                return !0;
                    return !1
                }, $ = t ? function(e, t) {
                    if (e === t)
                        return u = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !i.sortDetached && t.compareDocumentPosition(e) === n ? e === h || e.ownerDocument === x && b(x, e) ? -1 : t === h || t.ownerDocument === x && b(x, t) ? 1 : d ? N(d, e) - N(d, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t)
                        return u = !0, 0;
                    var i,
                        n = 0,
                        r = e.parentNode,
                        s = t.parentNode,
                        o = [e],
                        a = [t];
                    if (!r || !s)
                        return e === h ? -1 : t === h ? 1 : r ? -1 : s ? 1 : d ? N(d, e) - N(d, t) : 0;
                    if (r === s)
                        return pe(e, t);
                    for (i = e; i = i.parentNode;)
                        o.unshift(i);
                    for (i = t; i = i.parentNode;)
                        a.unshift(i);
                    for (; o[n] === a[n];)
                        n++;
                    return n ? pe(o[n], a[n]) : o[n] === x ? -1 : a[n] === x ? 1 : 0
                }, h) : h
            }, ae.matches = function(e, t) {
                return ae(e, null, null, t)
            }, ae.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== h && p(e), i.matchesSelector && m && !M[t + " "] && (!v || !v.test(t)) && (!g || !g.test(t)))
                    try {
                        var n = y.call(e, t);
                        if (n || i.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                            return n
                    } catch (e) {
                        M(t, !0)
                    }
                return ae(t, h, null, [e]).length > 0
            }, ae.contains = function(e, t) {
                return (e.ownerDocument || e) !== h && p(e), b(e, t)
            }, ae.attr = function(e, t) {
                (e.ownerDocument || e) !== h && p(e);
                var r = n.attrHandle[t.toLowerCase()],
                    s = r && z.call(n.attrHandle, t.toLowerCase()) ? r(e, t, !m) : void 0;
                return void 0 !== s ? s : i.attributes || !m ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
            }, ae.escape = function(e) {
                return (e + "").replace(ne, re)
            }, ae.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, ae.uniqueSort = function(e) {
                var t,
                    n = [],
                    r = 0,
                    s = 0;
                if (u = !i.detectDuplicates, d = !i.sortStable && e.slice(0), e.sort($), u) {
                    for (; t = e[s++];)
                        t === e[s] && (r = n.push(s));
                    for (; r--;)
                        e.splice(n[r], 1)
                }
                return d = null, e
            }, r = ae.getText = function(e) {
                var t,
                    i = "",
                    n = 0,
                    s = e.nodeType;
                if (s) {
                    if (1 === s || 9 === s || 11 === s) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            i += r(e)
                    } else if (3 === s || 4 === s)
                        return e.nodeValue
                } else
                    for (; t = e[n++];)
                        i += r(t);
                return i
            }, (n = ae.selectors = {
                cacheLength: 50,
                createPseudo: ce,
                match: G,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(te, ie), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ie), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t,
                            i = !e[6] && e[2];
                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && W.test(i) && (t = o(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(te, ie).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = S[e + " "];
                        return t || (t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) && S(e, (function(e) {
                                return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                            }))
                    },
                    ATTR: function(e, t, i) {
                        return function(n) {
                            var r = ae.attr(n, e);
                            return null == r ? "!=" === t : !t || (r += "", "=" === t ? r === i : "!=" === t ? r !== i : "^=" === t ? i && 0 === r.indexOf(i) : "*=" === t ? i && r.indexOf(i) > -1 : "$=" === t ? i && r.slice(-i.length) === i : "~=" === t ? (" " + r.replace(B, " ") + " ").indexOf(i) > -1 : "|=" === t && (r === i || r.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(e, t, i, n, r) {
                        var s = "nth" !== e.slice(0, 3),
                            o = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === n && 0 === r ? function(e) {
                            return !!e.parentNode
                        } : function(t, i, l) {
                            var c,
                                d,
                                u,
                                p,
                                h,
                                f,
                                m = s !== o ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = a && t.nodeName.toLowerCase(),
                                y = !l && !a,
                                b = !1;
                            if (g) {
                                if (s) {
                                    for (; m;) {
                                        for (p = t; p = p[m];)
                                            if (a ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)
                                                return !1;
                                        f = m = "only" === e && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [o ? g.firstChild : g.lastChild], o && y) {
                                    for (b = (h = (c = (d = (u = (p = g)[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === T && c[1]) && c[2], p = h && g.childNodes[h]; p = ++h && p && p[m] || (b = h = 0) || f.pop();)
                                        if (1 === p.nodeType && ++b && p === t) {
                                            d[e] = [T, h, b];
                                            break
                                        }
                                } else if (y && (b = h = (c = (d = (u = (p = t)[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === T && c[1]), !1 === b)
                                    for (; (p = ++h && p && p[m] || (b = h = 0) || f.pop()) && ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && ((d = (u = p[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] = [T, b]), p !== t));)
                                        ;
                                return (b -= r) === n || b % n == 0 && b / n >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var i,
                            r = n.pseudos[e] || n.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                        return r[w] ? r(t) : r.length > 1 ? (i = [e, e, "", t], n.setFilters.hasOwnProperty(e.toLowerCase()) ? ce((function(e, i) {
                            for (var n, s = r(e, t), o = s.length; o--;)
                                e[n = N(e, s[o])] = !(i[n] = s[o])
                        })) : function(e) {
                            return r(e, 0, i)
                        }) : r
                    }
                },
                pseudos: {
                    not: ce((function(e) {
                        var t = [],
                            i = [],
                            n = a(e.replace(R, "$1"));
                        return n[w] ? ce((function(e, t, i, r) {
                            for (var s, o = n(e, null, r, []), a = e.length; a--;)
                                (s = o[a]) && (e[a] = !(t[a] = s))
                        })) : function(e, r, s) {
                            return t[0] = e, n(t, null, s, i), t[0] = null, !i.pop()
                        }
                    })),
                    has: ce((function(e) {
                        return function(t) {
                            return ae(e, t).length > 0
                        }
                    })),
                    contains: ce((function(e) {
                        return e = e.replace(te, ie), function(t) {
                            return (t.textContent || r(t)).indexOf(e) > -1
                        }
                    })),
                    lang: ce((function(e) {
                        return V.test(e || "") || ae.error("unsupported lang: " + e), e = e.replace(te, ie).toLowerCase(), function(t) {
                            var i;
                            do {
                                if (i = m ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                    return (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-")
                            } while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                    })),
                    target: function(t) {
                        var i = e.location && e.location.hash;
                        return i && i.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === f
                    },
                    focus: function(e) {
                        return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: me(!1),
                    disabled: me(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !n.pseudos.empty(e)
                    },
                    header: function(e) {
                        return Z.test(e.nodeName)
                    },
                    input: function(e) {
                        return K.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: ge((function() {
                        return [0]
                    })),
                    last: ge((function(e, t) {
                        return [t - 1]
                    })),
                    eq: ge((function(e, t, i) {
                        return [i < 0 ? i + t : i]
                    })),
                    even: ge((function(e, t) {
                        for (var i = 0; i < t; i += 2)
                            e.push(i);
                        return e
                    })),
                    odd: ge((function(e, t) {
                        for (var i = 1; i < t; i += 2)
                            e.push(i);
                        return e
                    })),
                    lt: ge((function(e, t, i) {
                        for (var n = i < 0 ? i + t : i > t ? t : i; --n >= 0;)
                            e.push(n);
                        return e
                    })),
                    gt: ge((function(e, t, i) {
                        for (var n = i < 0 ? i + t : i; ++n < t;)
                            e.push(n);
                        return e
                    }))
                }
            }).pseudos.nth = n.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                n.pseudos[t] = he(t);
            for (t in {
                submit: !0,
                reset: !0
            })
                n.pseudos[t] = fe(t);
            function ye() {}
            function be(e) {
                for (var t = 0, i = e.length, n = ""; t < i; t++)
                    n += e[t].value;
                return n
            }
            function we(e, t, i) {
                var n = t.dir,
                    r = t.next,
                    s = r || n,
                    o = i && "parentNode" === s,
                    a = E++;
                return t.first ? function(t, i, r) {
                    for (; t = t[n];)
                        if (1 === t.nodeType || o)
                            return e(t, i, r);
                    return !1
                } : function(t, i, l) {
                    var c,
                        d,
                        u,
                        p = [T, a];
                    if (l) {
                        for (; t = t[n];)
                            if ((1 === t.nodeType || o) && e(t, i, l))
                                return !0
                    } else
                        for (; t = t[n];)
                            if (1 === t.nodeType || o)
                                if (d = (u = t[w] || (t[w] = {}))[t.uniqueID] || (u[t.uniqueID] = {}), r && r === t.nodeName.toLowerCase())
                                    t = t[n] || t;
                                else {
                                    if ((c = d[s]) && c[0] === T && c[1] === a)
                                        return p[2] = c[2];
                                    if (d[s] = p, p[2] = e(t, i, l))
                                        return !0
                                }
                    return !1
                }
            }
            function xe(e) {
                return e.length > 1 ? function(t, i, n) {
                    for (var r = e.length; r--;)
                        if (!e[r](t, i, n))
                            return !1;
                    return !0
                } : e[0]
            }
            function Te(e, t, i, n, r) {
                for (var s, o = [], a = 0, l = e.length, c = null != t; a < l; a++)
                    (s = e[a]) && (i && !i(s, n, r) || (o.push(s), c && t.push(a)));
                return o
            }
            function Ee(e, t, i, n, r, s) {
                return n && !n[w] && (n = Ee(n)), r && !r[w] && (r = Ee(r, s)), ce((function(s, o, a, l) {
                    var c,
                        d,
                        u,
                        p = [],
                        h = [],
                        f = o.length,
                        m = s || function(e, t, i) {
                            for (var n = 0, r = t.length; n < r; n++)
                                ae(e, t[n], i);
                            return i
                        }(t || "*", a.nodeType ? [a] : a, []),
                        g = !e || !s && t ? m : Te(m, p, e, a, l),
                        v = i ? r || (s ? e : f || n) ? [] : o : g;
                    if (i && i(g, v, a, l), n)
                        for (c = Te(v, h), n(c, [], a, l), d = c.length; d--;)
                            (u = c[d]) && (v[h[d]] = !(g[h[d]] = u));
                    if (s) {
                        if (r || e) {
                            if (r) {
                                for (c = [], d = v.length; d--;)
                                    (u = v[d]) && c.push(g[d] = u);
                                r(null, v = [], c, l)
                            }
                            for (d = v.length; d--;)
                                (u = v[d]) && (c = r ? N(s, u) : p[d]) > -1 && (s[c] = !(o[c] = u))
                        }
                    } else
                        v = Te(v === o ? v.splice(f, v.length) : v),
                        r ? r(null, o, v, l) : D.apply(o, v)
                }))
            }
            function Se(e) {
                for (var t, i, r, s = e.length, o = n.relative[e[0].type], a = o || n.relative[" "], l = o ? 1 : 0, d = we((function(e) {
                        return e === t
                    }), a, !0), u = we((function(e) {
                        return N(t, e) > -1
                    }), a, !0), p = [function(e, i, n) {
                        var r = !o && (n || i !== c) || ((t = i).nodeType ? d(e, i, n) : u(e, i, n));
                        return t = null, r
                    }]; l < s; l++)
                    if (i = n.relative[e[l].type])
                        p = [we(xe(p), i)];
                    else {
                        if ((i = n.filter[e[l].type].apply(null, e[l].matches))[w]) {
                            for (r = ++l; r < s && !n.relative[e[r].type]; r++)
                                ;
                            return Ee(l > 1 && xe(p), l > 1 && be(e.slice(0, l - 1).concat({
                                value: " " === e[l - 2].type ? "*" : ""
                            })).replace(R, "$1"), i, l < r && Se(e.slice(l, r)), r < s && Se(e = e.slice(r)), r < s && be(e))
                        }
                        p.push(i)
                    }
                return xe(p)
            }
            return ye.prototype = n.filters = n.pseudos, n.setFilters = new ye, o = ae.tokenize = function(e, t) {
                var i,
                    r,
                    s,
                    o,
                    a,
                    l,
                    c,
                    d = C[e + " "];
                if (d)
                    return t ? 0 : d.slice(0);
                for (a = e, l = [], c = n.preFilter; a;) {
                    for (o in i && !(r = X.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(s = [])), i = !1, (r = F.exec(a)) && (i = r.shift(), s.push({
                        value: i,
                        type: r[0].replace(R, " ")
                    }), a = a.slice(i.length)), n.filter)
                        !(r = G[o].exec(a)) || c[o] && !(r = c[o](r)) || (i = r.shift(), s.push({
                            value: i,
                            type: o,
                            matches: r
                        }), a = a.slice(i.length));
                    if (!i)
                        break
                }
                return t ? a.length : a ? ae.error(e) : C(e, l).slice(0)
            }, a = ae.compile = function(e, t) {
                var i,
                    r = [],
                    s = [],
                    a = k[e + " "];
                if (!a) {
                    for (t || (t = o(e)), i = t.length; i--;)
                        (a = Se(t[i]))[w] ? r.push(a) : s.push(a);
                    (a = k(e, function(e, t) {
                        var i = t.length > 0,
                            r = e.length > 0,
                            s = function(s, o, a, l, d) {
                                var u,
                                    f,
                                    g,
                                    v = 0,
                                    y = "0",
                                    b = s && [],
                                    w = [],
                                    x = c,
                                    E = s || r && n.find.TAG("*", d),
                                    S = T += null == x ? 1 : Math.random() || .1,
                                    C = E.length;
                                for (d && (c = o === h || o || d); y !== C && null != (u = E[y]); y++) {
                                    if (r && u) {
                                        for (f = 0, o || u.ownerDocument === h || (p(u), a = !m); g = e[f++];)
                                            if (g(u, o || h, a)) {
                                                l.push(u);
                                                break
                                            }
                                        d && (T = S)
                                    }
                                    i && ((u = !g && u) && v--, s && b.push(u))
                                }
                                if (v += y, i && y !== v) {
                                    for (f = 0; g = t[f++];)
                                        g(b, w, o, a);
                                    if (s) {
                                        if (v > 0)
                                            for (; y--;)
                                                b[y] || w[y] || (w[y] = P.call(l));
                                        w = Te(w)
                                    }
                                    D.apply(l, w),
                                    d && !s && w.length > 0 && v + t.length > 1 && ae.uniqueSort(l)
                                }
                                return d && (T = S, c = x), b
                            };
                        return i ? ce(s) : s
                    }(s, r))).selector = e
                }
                return a
            }, l = ae.select = function(e, t, i, r) {
                var s,
                    l,
                    c,
                    d,
                    u,
                    p = "function" == typeof e && e,
                    h = !r && o(e = p.selector || e);
                if (i = i || [], 1 === h.length) {
                    if ((l = h[0] = h[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && 9 === t.nodeType && m && n.relative[l[1].type]) {
                        if (!(t = (n.find.ID(c.matches[0].replace(te, ie), t) || [])[0]))
                            return i;
                        p && (t = t.parentNode),
                        e = e.slice(l.shift().value.length)
                    }
                    for (s = G.needsContext.test(e) ? 0 : l.length; s-- && (c = l[s], !n.relative[d = c.type]);)
                        if ((u = n.find[d]) && (r = u(c.matches[0].replace(te, ie), ee.test(l[0].type) && ve(t.parentNode) || t))) {
                            if (l.splice(s, 1), !(e = r.length && be(l)))
                                return D.apply(i, r), i;
                            break
                        }
                }
                return (p || a(e, h))(r, t, !m, i, !t || ee.test(e) && ve(t.parentNode) || t), i
            }, i.sortStable = w.split("").sort($).join("") === w, i.detectDuplicates = !!u, p(), i.sortDetached = de((function(e) {
                return 1 & e.compareDocumentPosition(h.createElement("fieldset"))
            })), de((function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            })) || ue("type|href|height|width", (function(e, t, i) {
                if (!i)
                    return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            })), i.attributes && de((function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            })) || ue("value", (function(e, t, i) {
                if (!i && "input" === e.nodeName.toLowerCase())
                    return e.defaultValue
            })), de((function(e) {
                return null == e.getAttribute("disabled")
            })) || ue(O, (function(e, t, i) {
                var n;
                if (!i)
                    return !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
            })), ae
        }(i);
        E.find = k,
        E.expr = k.selectors,
        E.expr[":"] = E.expr.pseudos,
        E.uniqueSort = E.unique = k.uniqueSort,
        E.text = k.getText,
        E.isXMLDoc = k.isXML,
        E.contains = k.contains,
        E.escapeSelector = k.escape;
        var M = function(e, t, i) {
                for (var n = [], r = void 0 !== i; (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (r && E(e).is(i))
                            break;
                        n.push(e)
                    }
                return n
            },
            $ = function(e, t) {
                for (var i = []; e; e = e.nextSibling)
                    1 === e.nodeType && e !== t && i.push(e);
                return i
            },
            z = E.expr.match.needsContext;
        function L(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var P = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function A(e, t, i) {
            return y(t) ? E.grep(e, (function(e, n) {
                return !!t.call(e, n, e) !== i
            })) : t.nodeType ? E.grep(e, (function(e) {
                return e === t !== i
            })) : "string" != typeof t ? E.grep(e, (function(e) {
                return u.call(t, e) > -1 !== i
            })) : E.filter(t, e, i)
        }
        E.filter = function(e, t, i) {
            var n = t[0];
            return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? E.find.matchesSelector(n, e) ? [n] : [] : E.find.matches(e, E.grep(t, (function(e) {
                return 1 === e.nodeType
            })))
        },
        E.fn.extend({
            find: function(e) {
                var t,
                    i,
                    n = this.length,
                    r = this;
                if ("string" != typeof e)
                    return this.pushStack(E(e).filter((function() {
                        for (t = 0; t < n; t++)
                            if (E.contains(r[t], this))
                                return !0
                    })));
                for (i = this.pushStack([]), t = 0; t < n; t++)
                    E.find(e, r[t], i);
                return n > 1 ? E.uniqueSort(i) : i
            },
            filter: function(e) {
                return this.pushStack(A(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(A(this, e || [], !0))
            },
            is: function(e) {
                return !!A(this, "string" == typeof e && z.test(e) ? E(e) : e || [], !1).length
            }
        });
        var D,
            I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (E.fn.init = function(e, t, i) {
            var n,
                r;
            if (!e)
                return this;
            if (i = i || D, "string" == typeof e) {
                if (!(n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : I.exec(e)) || !n[1] && t)
                    return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), P.test(n[1]) && E.isPlainObject(t))
                        for (n in t)
                            y(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this
                }
                return (r = o.getElementById(n[2])) && (this[0] = r, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : y(e) ? void 0 !== i.ready ? i.ready(e) : e(E) : E.makeArray(e, this)
        }).prototype = E.fn,
        D = E(o);
        var N = /^(?:parents|prev(?:Until|All))/,
            O = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        function H(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType;)
                ;
            return e
        }
        E.fn.extend({
            has: function(e) {
                var t = E(e, this),
                    i = t.length;
                return this.filter((function() {
                    for (var e = 0; e < i; e++)
                        if (E.contains(this, t[e]))
                            return !0
                }))
            },
            closest: function(e, t) {
                var i,
                    n = 0,
                    r = this.length,
                    s = [],
                    o = "string" != typeof e && E(e);
                if (!z.test(e))
                    for (; n < r; n++)
                        for (i = this[n]; i && i !== t; i = i.parentNode)
                            if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && E.find.matchesSelector(i, e))) {
                                s.push(i);
                                break
                            }
                return this.pushStack(s.length > 1 ? E.uniqueSort(s) : s)
            },
            index: function(e) {
                return e ? "string" == typeof e ? u.call(E(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }),
        E.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return M(e, "parentNode")
            },
            parentsUntil: function(e, t, i) {
                return M(e, "parentNode", i)
            },
            next: function(e) {
                return H(e, "nextSibling")
            },
            prev: function(e) {
                return H(e, "previousSibling")
            },
            nextAll: function(e) {
                return M(e, "nextSibling")
            },
            prevAll: function(e) {
                return M(e, "previousSibling")
            },
            nextUntil: function(e, t, i) {
                return M(e, "nextSibling", i)
            },
            prevUntil: function(e, t, i) {
                return M(e, "previousSibling", i)
            },
            siblings: function(e) {
                return $((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return $(e.firstChild)
            },
            contents: function(e) {
                return void 0 !== e.contentDocument ? e.contentDocument : (L(e, "template") && (e = e.content || e), E.merge([], e.childNodes))
            }
        }, (function(e, t) {
            E.fn[e] = function(i, n) {
                var r = E.map(this, t, i);
                return "Until" !== e.slice(-5) && (n = i), n && "string" == typeof n && (r = E.filter(n, r)), this.length > 1 && (O[e] || E.uniqueSort(r), N.test(e) && r.reverse()), this.pushStack(r)
            }
        }));
        var j = /[^\x20\t\r\n\f]+/g;
        function _(e) {
            return e
        }
        function q(e) {
            throw e
        }
        function B(e, t, i, n) {
            var r;
            try {
                e && y(r = e.promise) ? r.call(e).done(t).fail(i) : e && y(r = e.then) ? r.call(e, t, i) : t.apply(void 0, [e].slice(n))
            } catch (e) {
                i.apply(void 0, [e])
            }
        }
        E.Callbacks = function(e) {
            e = "string" == typeof e ? function(e) {
                var t = {};
                return E.each(e.match(j) || [], (function(e, i) {
                    t[i] = !0
                })), t
            }(e) : E.extend({}, e);
            var t,
                i,
                n,
                r,
                s = [],
                o = [],
                a = -1,
                l = function() {
                    for (r = r || e.once, n = t = !0; o.length; a = -1)
                        for (i = o.shift(); ++a < s.length;)
                            !1 === s[a].apply(i[0], i[1]) && e.stopOnFalse && (a = s.length, i = !1);
                    e.memory || (i = !1),
                    t = !1,
                    r && (s = i ? [] : "")
                },
                c = {
                    add: function() {
                        return s && (i && !t && (a = s.length - 1, o.push(i)), function t(i) {
                            E.each(i, (function(i, n) {
                                y(n) ? e.unique && c.has(n) || s.push(n) : n && n.length && "string" !== T(n) && t(n)
                            }))
                        }(arguments), i && !t && l()), this
                    },
                    remove: function() {
                        return E.each(arguments, (function(e, t) {
                            for (var i; (i = E.inArray(t, s, i)) > -1;)
                                s.splice(i, 1),
                                i <= a && a--
                        })), this
                    },
                    has: function(e) {
                        return e ? E.inArray(e, s) > -1 : s.length > 0
                    },
                    empty: function() {
                        return s && (s = []), this
                    },
                    disable: function() {
                        return r = o = [], s = i = "", this
                    },
                    disabled: function() {
                        return !s
                    },
                    lock: function() {
                        return r = o = [], i || t || (s = i = ""), this
                    },
                    locked: function() {
                        return !!r
                    },
                    fireWith: function(e, i) {
                        return r || (i = [e, (i = i || []).slice ? i.slice() : i], o.push(i), t || l()), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!n
                    }
                };
            return c
        },
        E.extend({
            Deferred: function(e) {
                var t = [["notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2], ["resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected"]],
                    n = "pending",
                    r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this
                        },
                        catch: function(e) {
                            return r.then(null, e)
                        },
                        pipe: function() {
                            var e = arguments;
                            return E.Deferred((function(i) {
                                E.each(t, (function(t, n) {
                                    var r = y(e[n[4]]) && e[n[4]];
                                    s[n[1]]((function() {
                                        var e = r && r.apply(this, arguments);
                                        e && y(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[n[0] + "With"](this, r ? [e] : arguments)
                                    }))
                                })),
                                e = null
                            })).promise()
                        },
                        then: function(e, n, r) {
                            var s = 0;
                            function o(e, t, n, r) {
                                return function() {
                                    var a = this,
                                        l = arguments,
                                        c = function() {
                                            var i,
                                                c;
                                            if (!(e < s)) {
                                                if ((i = n.apply(a, l)) === t.promise())
                                                    throw new TypeError("Thenable self-resolution");
                                                c = i && ("object" == typeof i || "function" == typeof i) && i.then,
                                                y(c) ? r ? c.call(i, o(s, t, _, r), o(s, t, q, r)) : (s++, c.call(i, o(s, t, _, r), o(s, t, q, r), o(s, t, _, t.notifyWith))) : (n !== _ && (a = void 0, l = [i]), (r || t.resolveWith)(a, l))
                                            }
                                        },
                                        d = r ? c : function() {
                                            try {
                                                c()
                                            } catch (i) {
                                                E.Deferred.exceptionHook && E.Deferred.exceptionHook(i, d.stackTrace),
                                                e + 1 >= s && (n !== q && (a = void 0, l = [i]), t.rejectWith(a, l))
                                            }
                                        };
                                    e ? d() : (E.Deferred.getStackHook && (d.stackTrace = E.Deferred.getStackHook()), i.setTimeout(d))
                                }
                            }
                            return E.Deferred((function(i) {
                                t[0][3].add(o(0, i, y(r) ? r : _, i.notifyWith)),
                                t[1][3].add(o(0, i, y(e) ? e : _)),
                                t[2][3].add(o(0, i, y(n) ? n : q))
                            })).promise()
                        },
                        promise: function(e) {
                            return null != e ? E.extend(e, r) : r
                        }
                    },
                    s = {};
                return E.each(t, (function(e, i) {
                    var o = i[2],
                        a = i[5];
                    r[i[1]] = o.add,
                    a && o.add((function() {
                        n = a
                    }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock),
                    o.add(i[3].fire),
                    s[i[0]] = function() {
                        return s[i[0] + "With"](this === s ? void 0 : this, arguments), this
                    },
                    s[i[0] + "With"] = o.fireWith
                })), r.promise(s), e && e.call(s, s), s
            },
            when: function(e) {
                var t = arguments.length,
                    i = t,
                    n = Array(i),
                    r = l.call(arguments),
                    s = E.Deferred(),
                    o = function(e) {
                        return function(i) {
                            n[e] = this,
                            r[e] = arguments.length > 1 ? l.call(arguments) : i,
                            --t || s.resolveWith(n, r)
                        }
                    };
                if (t <= 1 && (B(e, s.done(o(i)).resolve, s.reject, !t), "pending" === s.state() || y(r[i] && r[i].then)))
                    return s.then();
                for (; i--;)
                    B(r[i], o(i), s.reject);
                return s.promise()
            }
        });
        var R = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        E.Deferred.exceptionHook = function(e, t) {
            i.console && i.console.warn && e && R.test(e.name) && i.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
        },
        E.readyException = function(e) {
            i.setTimeout((function() {
                throw e
            }))
        };
        var X = E.Deferred();
        function F() {
            o.removeEventListener("DOMContentLoaded", F),
            i.removeEventListener("load", F),
            E.ready()
        }
        E.fn.ready = function(e) {
            return X.then(e).catch((function(e) {
                E.readyException(e)
            })), this
        },
        E.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0, !0 !== e && --E.readyWait > 0 || X.resolveWith(o, [E]))
            }
        }),
        E.ready.then = X.then,
        "complete" === o.readyState || "loading" !== o.readyState && !o.documentElement.doScroll ? i.setTimeout(E.ready) : (o.addEventListener("DOMContentLoaded", F), i.addEventListener("load", F));
        var Y = function(e, t, i, n, r, s, o) {
                var a = 0,
                    l = e.length,
                    c = null == i;
                if ("object" === T(i))
                    for (a in r = !0, i)
                        Y(e, t, a, i[a], !0, s, o);
                else if (void 0 !== n && (r = !0, y(n) || (o = !0), c && (o ? (t.call(e, n), t = null) : (c = t, t = function(e, t, i) {
                    return c.call(E(e), i)
                })), t))
                    for (; a < l; a++)
                        t(e[a], i, o ? n : n.call(e[a], a, t(e[a], i)));
                return r ? e : c ? t.call(e) : l ? t(e[0], i) : s
            },
            W = /^-ms-/,
            V = /-([a-z])/g;
        function G(e, t) {
            return t.toUpperCase()
        }
        function U(e) {
            return e.replace(W, "ms-").replace(V, G)
        }
        var K = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
        function Z() {
            this.expando = E.expando + Z.uid++
        }
        Z.uid = 1,
        Z.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, K(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, i) {
                var n,
                    r = this.cache(e);
                if ("string" == typeof t)
                    r[U(t)] = i;
                else
                    for (n in t)
                        r[U(n)] = t[n];
                return r
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][U(t)]
            },
            access: function(e, t, i) {
                return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), void 0 !== i ? i : t)
            },
            remove: function(e, t) {
                var i,
                    n = e[this.expando];
                if (void 0 !== n) {
                    if (void 0 !== t) {
                        i = (t = Array.isArray(t) ? t.map(U) : (t = U(t)) in n ? [t] : t.match(j) || []).length;
                        for (; i--;)
                            delete n[t[i]]
                    }
                    (void 0 === t || E.isEmptyObject(n)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !E.isEmptyObject(t)
            }
        };
        var Q = new Z,
            J = new Z,
            ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            te = /[A-Z]/g;
        function ie(e, t, i) {
            var n;
            if (void 0 === i && 1 === e.nodeType)
                if (n = "data-" + t.replace(te, "-$&").toLowerCase(), "string" == typeof (i = e.getAttribute(n))) {
                    try {
                        i = function(e) {
                            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ee.test(e) ? JSON.parse(e) : e)
                        }(i)
                    } catch (e) {}
                    J.set(e, t, i)
                } else
                    i = void 0;
            return i
        }
        E.extend({
            hasData: function(e) {
                return J.hasData(e) || Q.hasData(e)
            },
            data: function(e, t, i) {
                return J.access(e, t, i)
            },
            removeData: function(e, t) {
                J.remove(e, t)
            },
            _data: function(e, t, i) {
                return Q.access(e, t, i)
            },
            _removeData: function(e, t) {
                Q.remove(e, t)
            }
        }),
        E.fn.extend({
            data: function(e, t) {
                var i,
                    n,
                    r,
                    s = this[0],
                    o = s && s.attributes;
                if (void 0 === e) {
                    if (this.length && (r = J.get(s), 1 === s.nodeType && !Q.get(s, "hasDataAttrs"))) {
                        for (i = o.length; i--;)
                            o[i] && 0 === (n = o[i].name).indexOf("data-") && (n = U(n.slice(5)), ie(s, n, r[n]));
                        Q.set(s, "hasDataAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof e ? this.each((function() {
                    J.set(this, e)
                })) : Y(this, (function(t) {
                    var i;
                    if (s && void 0 === t)
                        return void 0 !== (i = J.get(s, e)) || void 0 !== (i = ie(s, e)) ? i : void 0;
                    this.each((function() {
                        J.set(this, e, t)
                    }))
                }), null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each((function() {
                    J.remove(this, e)
                }))
            }
        }),
        E.extend({
            queue: function(e, t, i) {
                var n;
                if (e)
                    return t = (t || "fx") + "queue", n = Q.get(e, t), i && (!n || Array.isArray(i) ? n = Q.access(e, t, E.makeArray(i)) : n.push(i)), n || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var i = E.queue(e, t),
                    n = i.length,
                    r = i.shift(),
                    s = E._queueHooks(e, t);
                "inprogress" === r && (r = i.shift(), n--),
                r && ("fx" === t && i.unshift("inprogress"), delete s.stop, r.call(e, (function() {
                    E.dequeue(e, t)
                }), s)),
                !n && s && s.empty.fire()
            },
            _queueHooks: function(e, t) {
                var i = t + "queueHooks";
                return Q.get(e, i) || Q.access(e, i, {
                        empty: E.Callbacks("once memory").add((function() {
                            Q.remove(e, [t + "queue", i])
                        }))
                    })
            }
        }),
        E.fn.extend({
            queue: function(e, t) {
                var i = 2;
                return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? E.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                    var i = E.queue(this, e, t);
                    E._queueHooks(this, e),
                    "fx" === e && "inprogress" !== i[0] && E.dequeue(this, e)
                }))
            },
            dequeue: function(e) {
                return this.each((function() {
                    E.dequeue(this, e)
                }))
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var i,
                    n = 1,
                    r = E.Deferred(),
                    s = this,
                    o = this.length,
                    a = function() {
                        --n || r.resolveWith(s, [s])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;)
                    (i = Q.get(s[o], e + "queueHooks")) && i.empty && (n++, i.empty.add(a));
                return a(), r.promise(t)
            }
        });
        var ne = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            re = new RegExp("^(?:([+-])=|)(" + ne + ")([a-z%]*)$", "i"),
            se = ["Top", "Right", "Bottom", "Left"],
            oe = o.documentElement,
            ae = function(e) {
                return E.contains(e.ownerDocument, e)
            },
            le = {
                composed: !0
            };
        oe.getRootNode && (ae = function(e) {
            return E.contains(e.ownerDocument, e) || e.getRootNode(le) === e.ownerDocument
        });
        var ce = function(e, t) {
                return "none" === (e = t || e).style.display || "" === e.style.display && ae(e) && "none" === E.css(e, "display")
            },
            de = function(e, t, i, n) {
                var r,
                    s,
                    o = {};
                for (s in t)
                    o[s] = e.style[s],
                    e.style[s] = t[s];
                for (s in r = i.apply(e, n || []), t)
                    e.style[s] = o[s];
                return r
            };
        function ue(e, t, i, n) {
            var r,
                s,
                o = 20,
                a = n ? function() {
                    return n.cur()
                } : function() {
                    return E.css(e, t, "")
                },
                l = a(),
                c = i && i[3] || (E.cssNumber[t] ? "" : "px"),
                d = e.nodeType && (E.cssNumber[t] || "px" !== c && +l) && re.exec(E.css(e, t));
            if (d && d[3] !== c) {
                for (l /= 2, c = c || d[3], d = +l || 1; o--;)
                    E.style(e, t, d + c),
                    (1 - s) * (1 - (s = a() / l || .5)) <= 0 && (o = 0),
                    d /= s;
                d *= 2,
                E.style(e, t, d + c),
                i = i || []
            }
            return i && (d = +d || +l || 0, r = i[1] ? d + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = d, n.end = r)), r
        }
        var pe = {};
        function he(e) {
            var t,
                i = e.ownerDocument,
                n = e.nodeName,
                r = pe[n];
            return r || (t = i.body.appendChild(i.createElement(n)), r = E.css(t, "display"), t.parentNode.removeChild(t), "none" === r && (r = "block"), pe[n] = r, r)
        }
        function fe(e, t) {
            for (var i, n, r = [], s = 0, o = e.length; s < o; s++)
                (n = e[s]).style && (i = n.style.display, t ? ("none" === i && (r[s] = Q.get(n, "display") || null, r[s] || (n.style.display = "")), "" === n.style.display && ce(n) && (r[s] = he(n))) : "none" !== i && (r[s] = "none", Q.set(n, "display", i)));
            for (s = 0; s < o; s++)
                null != r[s] && (e[s].style.display = r[s]);
            return e
        }
        E.fn.extend({
            show: function() {
                return fe(this, !0)
            },
            hide: function() {
                return fe(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                    ce(this) ? E(this).show() : E(this).hide()
                }))
            }
        });
        var me = /^(?:checkbox|radio)$/i,
            ge = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            ve = /^$|^module$|\/(?:java|ecma)script/i,
            ye = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        function be(e, t) {
            var i;
            return i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && L(e, t) ? E.merge([e], i) : i
        }
        function we(e, t) {
            for (var i = 0, n = e.length; i < n; i++)
                Q.set(e[i], "globalEval", !t || Q.get(t[i], "globalEval"))
        }
        ye.optgroup = ye.option,
        ye.tbody = ye.tfoot = ye.colgroup = ye.caption = ye.thead,
        ye.th = ye.td;
        var xe,
            Te,
            Ee = /<|&#?\w+;/;
        function Se(e, t, i, n, r) {
            for (var s, o, a, l, c, d, u = t.createDocumentFragment(), p = [], h = 0, f = e.length; h < f; h++)
                if ((s = e[h]) || 0 === s)
                    if ("object" === T(s))
                        E.merge(p, s.nodeType ? [s] : s);
                    else if (Ee.test(s)) {
                        for (o = o || u.appendChild(t.createElement("div")), a = (ge.exec(s) || ["", ""])[1].toLowerCase(), l = ye[a] || ye._default, o.innerHTML = l[1] + E.htmlPrefilter(s) + l[2], d = l[0]; d--;)
                            o = o.lastChild;
                        E.merge(p, o.childNodes),
                        (o = u.firstChild).textContent = ""
                    } else
                        p.push(t.createTextNode(s));
            for (u.textContent = "", h = 0; s = p[h++];)
                if (n && E.inArray(s, n) > -1)
                    r && r.push(s);
                else if (c = ae(s), o = be(u.appendChild(s), "script"), c && we(o), i)
                    for (d = 0; s = o[d++];)
                        ve.test(s.type || "") && i.push(s);
            return u
        }
        xe = o.createDocumentFragment().appendChild(o.createElement("div")),
        (Te = o.createElement("input")).setAttribute("type", "radio"),
        Te.setAttribute("checked", "checked"),
        Te.setAttribute("name", "t"),
        xe.appendChild(Te),
        v.checkClone = xe.cloneNode(!0).cloneNode(!0).lastChild.checked,
        xe.innerHTML = "<textarea>x</textarea>",
        v.noCloneChecked = !!xe.cloneNode(!0).lastChild.defaultValue;
        var Ce = /^key/,
            ke = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Me = /^([^.]*)(?:\.(.+)|)/;
        function $e() {
            return !0
        }
        function ze() {
            return !1
        }
        function Le(e, t) {
            return e === function() {
                try {
                    return o.activeElement
                } catch (e) {}
            }() == ("focus" === t)
        }
        function Pe(e, t, i, n, r, s) {
            var o,
                a;
            if ("object" == typeof t) {
                for (a in "string" != typeof i && (n = n || i, i = void 0), t)
                    Pe(e, a, i, n, t[a], s);
                return e
            }
            if (null == n && null == r ? (r = i, n = i = void 0) : null == r && ("string" == typeof i ? (r = n, n = void 0) : (r = n, n = i, i = void 0)), !1 === r)
                r = ze;
            else if (!r)
                return e;
            return 1 === s && (o = r, (r = function(e) {
                return E().off(e), o.apply(this, arguments)
            }).guid = o.guid || (o.guid = E.guid++)), e.each((function() {
                E.event.add(this, t, r, n, i)
            }))
        }
        function Ae(e, t, i) {
            i ? (Q.set(e, t, !1), E.event.add(e, t, {
                namespace: !1,
                handler: function(e) {
                    var n,
                        r,
                        s = Q.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                        if (s.length)
                            (E.event.special[t] || {}).delegateType && e.stopPropagation();
                        else if (s = l.call(arguments), Q.set(this, t, s), n = i(this, t), this[t](), s !== (r = Q.get(this, t)) || n ? Q.set(this, t, !1) : r = {}, s !== r)
                            return e.stopImmediatePropagation(), e.preventDefault(), r.value
                    } else
                        s.length && (Q.set(this, t, {
                            value: E.event.trigger(E.extend(s[0], E.Event.prototype), s.slice(1), this)
                        }), e.stopImmediatePropagation())
                }
            })) : void 0 === Q.get(e, t) && E.event.add(e, t, $e)
        }
        E.event = {
            global: {},
            add: function(e, t, i, n, r) {
                var s,
                    o,
                    a,
                    l,
                    c,
                    d,
                    u,
                    p,
                    h,
                    f,
                    m,
                    g = Q.get(e);
                if (g)
                    for (i.handler && (i = (s = i).handler, r = s.selector), r && E.find.matchesSelector(oe, r), i.guid || (i.guid = E.guid++), (l = g.events) || (l = g.events = {}), (o = g.handle) || (o = g.handle = function(t) {
                        return void 0 !== E && E.event.triggered !== t.type ? E.event.dispatch.apply(e, arguments) : void 0
                    }), c = (t = (t || "").match(j) || [""]).length; c--;)
                        h = m = (a = Me.exec(t[c]) || [])[1],
                        f = (a[2] || "").split(".").sort(),
                        h && (u = E.event.special[h] || {}, h = (r ? u.delegateType : u.bindType) || h, u = E.event.special[h] || {}, d = E.extend({
                            type: h,
                            origType: m,
                            data: n,
                            handler: i,
                            guid: i.guid,
                            selector: r,
                            needsContext: r && E.expr.match.needsContext.test(r),
                            namespace: f.join(".")
                        }, s), (p = l[h]) || ((p = l[h] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, n, f, o) || e.addEventListener && e.addEventListener(h, o)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = i.guid)), r ? p.splice(p.delegateCount++, 0, d) : p.push(d), E.event.global[h] = !0)
            },
            remove: function(e, t, i, n, r) {
                var s,
                    o,
                    a,
                    l,
                    c,
                    d,
                    u,
                    p,
                    h,
                    f,
                    m,
                    g = Q.hasData(e) && Q.get(e);
                if (g && (l = g.events)) {
                    for (c = (t = (t || "").match(j) || [""]).length; c--;)
                        if (h = m = (a = Me.exec(t[c]) || [])[1], f = (a[2] || "").split(".").sort(), h) {
                            for (u = E.event.special[h] || {}, p = l[h = (n ? u.delegateType : u.bindType) || h] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = p.length; s--;)
                                d = p[s],
                                !r && m !== d.origType || i && i.guid !== d.guid || a && !a.test(d.namespace) || n && n !== d.selector && ("**" !== n || !d.selector) || (p.splice(s, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                            o && !p.length && (u.teardown && !1 !== u.teardown.call(e, f, g.handle) || E.removeEvent(e, h, g.handle), delete l[h])
                        } else
                            for (h in l)
                                E.event.remove(e, h + t[c], i, n, !0);
                    E.isEmptyObject(l) && Q.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t,
                    i,
                    n,
                    r,
                    s,
                    o,
                    a = E.event.fix(e),
                    l = new Array(arguments.length),
                    c = (Q.get(this, "events") || {})[a.type] || [],
                    d = E.event.special[a.type] || {};
                for (l[0] = a, t = 1; t < arguments.length; t++)
                    l[t] = arguments[t];
                if (a.delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, a)) {
                    for (o = E.event.handlers.call(this, a, c), t = 0; (r = o[t++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = r.elem, i = 0; (s = r.handlers[i++]) && !a.isImmediatePropagationStopped();)
                            a.rnamespace && !1 !== s.namespace && !a.rnamespace.test(s.namespace) || (a.handleObj = s, a.data = s.data, void 0 !== (n = ((E.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, l)) && !1 === (a.result = n) && (a.preventDefault(), a.stopPropagation()));
                    return d.postDispatch && d.postDispatch.call(this, a), a.result
                }
            },
            handlers: function(e, t) {
                var i,
                    n,
                    r,
                    s,
                    o,
                    a = [],
                    l = t.delegateCount,
                    c = e.target;
                if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                    for (; c !== this; c = c.parentNode || this)
                        if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                            for (s = [], o = {}, i = 0; i < l; i++)
                                void 0 === o[r = (n = t[i]).selector + " "] && (o[r] = n.needsContext ? E(r, this).index(c) > -1 : E.find(r, this, null, [c]).length),
                                o[r] && s.push(n);
                            s.length && a.push({
                                elem: c,
                                handlers: s
                            })
                        }
                return c = this, l < t.length && a.push({
                    elem: c,
                    handlers: t.slice(l)
                }), a
            },
            addProp: function(e, t) {
                Object.defineProperty(E.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: y(t) ? function() {
                        if (this.originalEvent)
                            return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent)
                            return this.originalEvent[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(e) {
                return e[E.expando] ? e : new E.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        var t = this || e;
                        return me.test(t.type) && t.click && L(t, "input") && Ae(t, "click", $e), !1
                    },
                    trigger: function(e) {
                        var t = this || e;
                        return me.test(t.type) && t.click && L(t, "input") && Ae(t, "click"), !0
                    },
                    _default: function(e) {
                        var t = e.target;
                        return me.test(t.type) && t.click && L(t, "input") && Q.get(t, "click") || L(t, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        },
        E.removeEvent = function(e, t, i) {
            e.removeEventListener && e.removeEventListener(t, i)
        },
        E.Event = function(e, t) {
            if (!(this instanceof E.Event))
                return new E.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? $e : ze, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e,
            t && E.extend(this, t),
            this.timeStamp = e && e.timeStamp || Date.now(),
            this[E.expando] = !0
        },
        E.Event.prototype = {
            constructor: E.Event,
            isDefaultPrevented: ze,
            isPropagationStopped: ze,
            isImmediatePropagationStopped: ze,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = $e,
                e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = $e,
                e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = $e,
                e && !this.isSimulated && e.stopImmediatePropagation(),
                this.stopPropagation()
            }
        },
        E.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var t = e.button;
                return null == e.which && Ce.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ke.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, E.event.addProp),
        E.each({
            focus: "focusin",
            blur: "focusout"
        }, (function(e, t) {
            E.event.special[e] = {
                setup: function() {
                    return Ae(this, e, Le), !1
                },
                trigger: function() {
                    return Ae(this, e), !0
                },
                delegateType: t
            }
        })),
        E.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, (function(e, t) {
            E.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var i,
                        n = this,
                        r = e.relatedTarget,
                        s = e.handleObj;
                    return r && (r === n || E.contains(n, r)) || (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
                }
            }
        })),
        E.fn.extend({
            on: function(e, t, i, n) {
                return Pe(this, e, t, i, n)
            },
            one: function(e, t, i, n) {
                return Pe(this, e, t, i, n, 1)
            },
            off: function(e, t, i) {
                var n,
                    r;
                if (e && e.preventDefault && e.handleObj)
                    return n = e.handleObj, E(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                if ("object" == typeof e) {
                    for (r in e)
                        this.off(r, t, e[r]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = ze), this.each((function() {
                    E.event.remove(this, e, i, t)
                }))
            }
        });
        var De = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            Ie = /<script|<style|<link/i,
            Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Oe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function He(e, t) {
            return L(e, "table") && L(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e
        }
        function je(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }
        function _e(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }
        function qe(e, t) {
            var i,
                n,
                r,
                s,
                o,
                a,
                l,
                c;
            if (1 === t.nodeType) {
                if (Q.hasData(e) && (s = Q.access(e), o = Q.set(t, s), c = s.events))
                    for (r in delete o.handle, o.events = {}, c)
                        for (i = 0, n = c[r].length; i < n; i++)
                            E.event.add(t, r, c[r][i]);
                J.hasData(e) && (a = J.access(e), l = E.extend({}, a), J.set(t, l))
            }
        }
        function Be(e, t) {
            var i = t.nodeName.toLowerCase();
            "input" === i && me.test(e.type) ? t.checked = e.checked : "input" !== i && "textarea" !== i || (t.defaultValue = e.defaultValue)
        }
        function Re(e, t, i, n) {
            t = c.apply([], t);
            var r,
                s,
                o,
                a,
                l,
                d,
                u = 0,
                p = e.length,
                h = p - 1,
                f = t[0],
                m = y(f);
            if (m || p > 1 && "string" == typeof f && !v.checkClone && Ne.test(f))
                return e.each((function(r) {
                    var s = e.eq(r);
                    m && (t[0] = f.call(this, r, s.html())),
                    Re(s, t, i, n)
                }));
            if (p && (s = (r = Se(t, e[0].ownerDocument, !1, e, n)).firstChild, 1 === r.childNodes.length && (r = s), s || n)) {
                for (a = (o = E.map(be(r, "script"), je)).length; u < p; u++)
                    l = r,
                    u !== h && (l = E.clone(l, !0, !0), a && E.merge(o, be(l, "script"))),
                    i.call(e[u], l, u);
                if (a)
                    for (d = o[o.length - 1].ownerDocument, E.map(o, _e), u = 0; u < a; u++)
                        l = o[u],
                        ve.test(l.type || "") && !Q.access(l, "globalEval") && E.contains(d, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? E._evalUrl && !l.noModule && E._evalUrl(l.src, {
                            nonce: l.nonce || l.getAttribute("nonce")
                        }) : x(l.textContent.replace(Oe, ""), l, d))
            }
            return e
        }
        function Xe(e, t, i) {
            for (var n, r = t ? E.filter(t, e) : e, s = 0; null != (n = r[s]); s++)
                i || 1 !== n.nodeType || E.cleanData(be(n)),
                n.parentNode && (i && ae(n) && we(be(n, "script")), n.parentNode.removeChild(n));
            return e
        }
        E.extend({
            htmlPrefilter: function(e) {
                return e.replace(De, "<$1></$2>")
            },
            clone: function(e, t, i) {
                var n,
                    r,
                    s,
                    o,
                    a = e.cloneNode(!0),
                    l = ae(e);
                if (!(v.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e)))
                    for (o = be(a), n = 0, r = (s = be(e)).length; n < r; n++)
                        Be(s[n], o[n]);
                if (t)
                    if (i)
                        for (s = s || be(e), o = o || be(a), n = 0, r = s.length; n < r; n++)
                            qe(s[n], o[n]);
                    else
                        qe(e, a);
                return (o = be(a, "script")).length > 0 && we(o, !l && be(e, "script")), a
            },
            cleanData: function(e) {
                for (var t, i, n, r = E.event.special, s = 0; void 0 !== (i = e[s]); s++)
                    if (K(i)) {
                        if (t = i[Q.expando]) {
                            if (t.events)
                                for (n in t.events)
                                    r[n] ? E.event.remove(i, n) : E.removeEvent(i, n, t.handle);
                            i[Q.expando] = void 0
                        }
                        i[J.expando] && (i[J.expando] = void 0)
                    }
            }
        }),
        E.fn.extend({
            detach: function(e) {
                return Xe(this, e, !0)
            },
            remove: function(e) {
                return Xe(this, e)
            },
            text: function(e) {
                return Y(this, (function(e) {
                    return void 0 === e ? E.text(this) : this.empty().each((function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    }))
                }), null, e, arguments.length)
            },
            append: function() {
                return Re(this, arguments, (function(e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || He(this, e).appendChild(e)
                }))
            },
            prepend: function() {
                return Re(this, arguments, (function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = He(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                }))
            },
            before: function() {
                return Re(this, arguments, (function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                }))
            },
            after: function() {
                return Re(this, arguments, (function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                }))
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++)
                    1 === e.nodeType && (E.cleanData(be(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map((function() {
                    return E.clone(this, e, t)
                }))
            },
            html: function(e) {
                return Y(this, (function(e) {
                    var t = this[0] || {},
                        i = 0,
                        n = this.length;
                    if (void 0 === e && 1 === t.nodeType)
                        return t.innerHTML;
                    if ("string" == typeof e && !Ie.test(e) && !ye[(ge.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = E.htmlPrefilter(e);
                        try {
                            for (; i < n; i++)
                                1 === (t = this[i] || {}).nodeType && (E.cleanData(be(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }), null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return Re(this, arguments, (function(t) {
                    var i = this.parentNode;
                    E.inArray(this, e) < 0 && (E.cleanData(be(this)), i && i.replaceChild(t, this))
                }), e)
            }
        }),
        E.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, (function(e, t) {
            E.fn[e] = function(e) {
                for (var i, n = [], r = E(e), s = r.length - 1, o = 0; o <= s; o++)
                    i = o === s ? this : this.clone(!0),
                    E(r[o])[t](i),
                    d.apply(n, i.get());
                return this.pushStack(n)
            }
        }));
        var Fe = new RegExp("^(" + ne + ")(?!px)[a-z%]+$", "i"),
            Ye = function(e) {
                var t = e.ownerDocument.defaultView;
                return t && t.opener || (t = i), t.getComputedStyle(e)
            },
            We = new RegExp(se.join("|"), "i");
        function Ve(e, t, i) {
            var n,
                r,
                s,
                o,
                a = e.style;
            return (i = i || Ye(e)) && ("" !== (o = i.getPropertyValue(t) || i[t]) || ae(e) || (o = E.style(e, t)), !v.pixelBoxStyles() && Fe.test(o) && We.test(t) && (n = a.width, r = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = o, o = i.width, a.width = n, a.minWidth = r, a.maxWidth = s)), void 0 !== o ? o + "" : o
        }
        function Ge(e, t) {
            return {
                get: function() {
                    if (!e())
                        return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }
        !function() {
            function e() {
                if (d) {
                    c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                    d.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                    oe.appendChild(c).appendChild(d);
                    var e = i.getComputedStyle(d);
                    n = "1%" !== e.top,
                    l = 12 === t(e.marginLeft),
                    d.style.right = "60%",
                    a = 36 === t(e.right),
                    r = 36 === t(e.width),
                    d.style.position = "absolute",
                    s = 12 === t(d.offsetWidth / 3),
                    oe.removeChild(c),
                    d = null
                }
            }
            function t(e) {
                return Math.round(parseFloat(e))
            }
            var n,
                r,
                s,
                a,
                l,
                c = o.createElement("div"),
                d = o.createElement("div");
            d.style && (d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === d.style.backgroundClip, E.extend(v, {
                boxSizingReliable: function() {
                    return e(), r
                },
                pixelBoxStyles: function() {
                    return e(), a
                },
                pixelPosition: function() {
                    return e(), n
                },
                reliableMarginLeft: function() {
                    return e(), l
                },
                scrollboxSize: function() {
                    return e(), s
                }
            }))
        }();
        var Ue = ["Webkit", "Moz", "ms"],
            Ke = o.createElement("div").style,
            Ze = {};
        function Qe(e) {
            var t = E.cssProps[e] || Ze[e];
            return t || (e in Ke ? e : Ze[e] = function(e) {
                    for (var t = e[0].toUpperCase() + e.slice(1), i = Ue.length; i--;)
                        if ((e = Ue[i] + t) in Ke)
                            return e
                }(e) || e)
        }
        var Je = /^(none|table(?!-c[ea]).+)/,
            et = /^--/,
            tt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            it = {
                letterSpacing: "0",
                fontWeight: "400"
            };
        function nt(e, t, i) {
            var n = re.exec(t);
            return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
        }
        function rt(e, t, i, n, r, s) {
            var o = "width" === t ? 1 : 0,
                a = 0,
                l = 0;
            if (i === (n ? "border" : "content"))
                return 0;
            for (; o < 4; o += 2)
                "margin" === i && (l += E.css(e, i + se[o], !0, r)),
                n ? ("content" === i && (l -= E.css(e, "padding" + se[o], !0, r)), "margin" !== i && (l -= E.css(e, "border" + se[o] + "Width", !0, r))) : (l += E.css(e, "padding" + se[o], !0, r), "padding" !== i ? l += E.css(e, "border" + se[o] + "Width", !0, r) : a += E.css(e, "border" + se[o] + "Width", !0, r));
            return !n && s >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - s - l - a - .5)) || 0), l
        }
        function st(e, t, i) {
            var n = Ye(e),
                r = (!v.boxSizingReliable() || i) && "border-box" === E.css(e, "boxSizing", !1, n),
                s = r,
                o = Ve(e, t, n),
                a = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Fe.test(o)) {
                if (!i)
                    return o;
                o = "auto"
            }
            return (!v.boxSizingReliable() && r || "auto" === o || !parseFloat(o) && "inline" === E.css(e, "display", !1, n)) && e.getClientRects().length && (r = "border-box" === E.css(e, "boxSizing", !1, n), (s = a in e) && (o = e[a])), (o = parseFloat(o) || 0) + rt(e, t, i || (r ? "border" : "content"), s, n, o) + "px"
        }
        function ot(e, t, i, n, r) {
            return new ot.prototype.init(e, t, i, n, r)
        }
        E.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var i = Ve(e, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, i, n) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r,
                        s,
                        o,
                        a = U(t),
                        l = et.test(t),
                        c = e.style;
                    if (l || (t = Qe(a)), o = E.cssHooks[t] || E.cssHooks[a], void 0 === i)
                        return o && "get" in o && void 0 !== (r = o.get(e, !1, n)) ? r : c[t];
                    "string" === (s = typeof i) && (r = re.exec(i)) && r[1] && (i = ue(e, t, r), s = "number"),
                    null != i && i == i && ("number" !== s || l || (i += r && r[3] || (E.cssNumber[a] ? "" : "px")), v.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (c[t] = "inherit"), o && "set" in o && void 0 === (i = o.set(e, i, n)) || (l ? c.setProperty(t, i) : c[t] = i))
                }
            },
            css: function(e, t, i, n) {
                var r,
                    s,
                    o,
                    a = U(t);
                return et.test(t) || (t = Qe(a)), (o = E.cssHooks[t] || E.cssHooks[a]) && "get" in o && (r = o.get(e, !0, i)), void 0 === r && (r = Ve(e, t, n)), "normal" === r && t in it && (r = it[t]), "" === i || i ? (s = parseFloat(r), !0 === i || isFinite(s) ? s || 0 : r) : r
            }
        }),
        E.each(["height", "width"], (function(e, t) {
            E.cssHooks[t] = {
                get: function(e, i, n) {
                    if (i)
                        return !Je.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? st(e, t, n) : de(e, tt, (function() {
                            return st(e, t, n)
                        }))
                },
                set: function(e, i, n) {
                    var r,
                        s = Ye(e),
                        o = !v.scrollboxSize() && "absolute" === s.position,
                        a = (o || n) && "border-box" === E.css(e, "boxSizing", !1, s),
                        l = n ? rt(e, t, n, a, s) : 0;
                    return a && o && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(s[t]) - rt(e, t, "border", !1, s) - .5)), l && (r = re.exec(i)) && "px" !== (r[3] || "px") && (e.style[t] = i, i = E.css(e, t)), nt(0, i, l)
                }
            }
        })),
        E.cssHooks.marginLeft = Ge(v.reliableMarginLeft, (function(e, t) {
            if (t)
                return (parseFloat(Ve(e, "marginLeft")) || e.getBoundingClientRect().left - de(e, {
                    marginLeft: 0
                }, (function() {
                    return e.getBoundingClientRect().left
                }))) + "px"
        })),
        E.each({
            margin: "",
            padding: "",
            border: "Width"
        }, (function(e, t) {
            E.cssHooks[e + t] = {
                expand: function(i) {
                    for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++)
                        r[e + se[n] + t] = s[n] || s[n - 2] || s[0];
                    return r
                }
            },
            "margin" !== e && (E.cssHooks[e + t].set = nt)
        })),
        E.fn.extend({
            css: function(e, t) {
                return Y(this, (function(e, t, i) {
                    var n,
                        r,
                        s = {},
                        o = 0;
                    if (Array.isArray(t)) {
                        for (n = Ye(e), r = t.length; o < r; o++)
                            s[t[o]] = E.css(e, t[o], !1, n);
                        return s
                    }
                    return void 0 !== i ? E.style(e, t, i) : E.css(e, t)
                }), e, t, arguments.length > 1)
            }
        }),
        E.Tween = ot,
        ot.prototype = {
            constructor: ot,
            init: function(e, t, i, n, r, s) {
                this.elem = e,
                this.prop = i,
                this.easing = r || E.easing._default,
                this.options = t,
                this.start = this.now = this.cur(),
                this.end = n,
                this.unit = s || (E.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var e = ot.propHooks[this.prop];
                return e && e.get ? e.get(this) : ot.propHooks._default.get(this)
            },
            run: function(e) {
                var t,
                    i = ot.propHooks[this.prop];
                return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : ot.propHooks._default.set(this), this
            }
        },
        ot.prototype.init.prototype = ot.prototype,
        ot.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = E.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function(e) {
                    E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !E.cssHooks[e.prop] && null == e.elem.style[Qe(e.prop)] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        },
        ot.propHooks.scrollTop = ot.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        E.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        },
        E.fx = ot.prototype.init,
        E.fx.step = {};
        var at,
            lt,
            ct = /^(?:toggle|show|hide)$/,
            dt = /queueHooks$/;
        function ut() {
            lt && (!1 === o.hidden && i.requestAnimationFrame ? i.requestAnimationFrame(ut) : i.setTimeout(ut, E.fx.interval), E.fx.tick())
        }
        function pt() {
            return i.setTimeout((function() {
                at = void 0
            })), at = Date.now()
        }
        function ht(e, t) {
            var i,
                n = 0,
                r = {
                    height: e
                };
            for (t = t ? 1 : 0; n < 4; n += 2 - t)
                r["margin" + (i = se[n])] = r["padding" + i] = e;
            return t && (r.opacity = r.width = e), r
        }
        function ft(e, t, i) {
            for (var n, r = (mt.tweeners[t] || []).concat(mt.tweeners["*"]), s = 0, o = r.length; s < o; s++)
                if (n = r[s].call(i, t, e))
                    return n
        }
        function mt(e, t, i) {
            var n,
                r,
                s = 0,
                o = mt.prefilters.length,
                a = E.Deferred().always((function() {
                    delete l.elem
                })),
                l = function() {
                    if (r)
                        return !1;
                    for (var t = at || pt(), i = Math.max(0, c.startTime + c.duration - t), n = 1 - (i / c.duration || 0), s = 0, o = c.tweens.length; s < o; s++)
                        c.tweens[s].run(n);
                    return a.notifyWith(e, [c, n, i]), n < 1 && o ? i : (o || a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c]), !1)
                },
                c = a.promise({
                    elem: e,
                    props: E.extend({}, t),
                    opts: E.extend(!0, {
                        specialEasing: {},
                        easing: E.easing._default
                    }, i),
                    originalProperties: t,
                    originalOptions: i,
                    startTime: at || pt(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(t, i) {
                        var n = E.Tween(e, c.opts, t, i, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(n), n
                    },
                    stop: function(t) {
                        var i = 0,
                            n = t ? c.tweens.length : 0;
                        if (r)
                            return this;
                        for (r = !0; i < n; i++)
                            c.tweens[i].run(1);
                        return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
                    }
                }),
                d = c.props;
            for (!function(e, t) {
                var i,
                    n,
                    r,
                    s,
                    o;
                for (i in e)
                    if (r = t[n = U(i)], s = e[i], Array.isArray(s) && (r = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), (o = E.cssHooks[n]) && "expand" in o)
                        for (i in s = o.expand(s), delete e[n], s)
                            i in e || (e[i] = s[i], t[i] = r);
                    else
                        t[n] = r
            }(d, c.opts.specialEasing); s < o; s++)
                if (n = mt.prefilters[s].call(c, e, d, c.opts))
                    return y(n.stop) && (E._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)), n;
            return E.map(d, ft, c), y(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), E.fx.timer(E.extend(l, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c
        }
        E.Animation = E.extend(mt, {
            tweeners: {
                "*": [function(e, t) {
                    var i = this.createTween(e, t);
                    return ue(i.elem, e, re.exec(t), i), i
                }]
            },
            tweener: function(e, t) {
                y(e) ? (t = e, e = ["*"]) : e = e.match(j);
                for (var i, n = 0, r = e.length; n < r; n++)
                    i = e[n],
                    mt.tweeners[i] = mt.tweeners[i] || [],
                    mt.tweeners[i].unshift(t)
            },
            prefilters: [function(e, t, i) {
                var n,
                    r,
                    s,
                    o,
                    a,
                    l,
                    c,
                    d,
                    u = "width" in t || "height" in t,
                    p = this,
                    h = {},
                    f = e.style,
                    m = e.nodeType && ce(e),
                    g = Q.get(e, "fxshow");
                for (n in i.queue || (null == (o = E._queueHooks(e, "fx")).unqueued && (o.unqueued = 0, a = o.empty.fire, o.empty.fire = function() {
                    o.unqueued || a()
                }), o.unqueued++, p.always((function() {
                    p.always((function() {
                        o.unqueued--,
                        E.queue(e, "fx").length || o.empty.fire()
                    }))
                }))), t)
                    if (r = t[n], ct.test(r)) {
                        if (delete t[n], s = s || "toggle" === r, r === (m ? "hide" : "show")) {
                            if ("show" !== r || !g || void 0 === g[n])
                                continue;
                            m = !0
                        }
                        h[n] = g && g[n] || E.style(e, n)
                    }
                if ((l = !E.isEmptyObject(t)) || !E.isEmptyObject(h))
                    for (n in u && 1 === e.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY], null == (c = g && g.display) && (c = Q.get(e, "display")), "none" === (d = E.css(e, "display")) && (c ? d = c : (fe([e], !0), c = e.style.display || c, d = E.css(e, "display"), fe([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === E.css(e, "float") && (l || (p.done((function() {
                        f.display = c
                    })), null == c && (d = f.display, c = "none" === d ? "" : d)), f.display = "inline-block")), i.overflow && (f.overflow = "hidden", p.always((function() {
                        f.overflow = i.overflow[0],
                        f.overflowX = i.overflow[1],
                        f.overflowY = i.overflow[2]
                    }))), l = !1, h)
                        l || (g ? "hidden" in g && (m = g.hidden) : g = Q.access(e, "fxshow", {
                            display: c
                        }), s && (g.hidden = !m), m && fe([e], !0), p.done((function() {
                            for (n in m || fe([e]), Q.remove(e, "fxshow"), h)
                                E.style(e, n, h[n])
                        }))),
                        l = ft(m ? g[n] : 0, n, p),
                        n in g || (g[n] = l.start, m && (l.end = l.start, l.start = 0))
            }],
            prefilter: function(e, t) {
                t ? mt.prefilters.unshift(e) : mt.prefilters.push(e)
            }
        }),
        E.speed = function(e, t, i) {
            var n = e && "object" == typeof e ? E.extend({}, e) : {
                complete: i || !i && t || y(e) && e,
                duration: e,
                easing: i && t || t && !y(t) && t
            };
            return E.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in E.fx.speeds ? n.duration = E.fx.speeds[n.duration] : n.duration = E.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                y(n.old) && n.old.call(this),
                n.queue && E.dequeue(this, n.queue)
            }, n
        },
        E.fn.extend({
            fadeTo: function(e, t, i, n) {
                return this.filter(ce).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, i, n)
            },
            animate: function(e, t, i, n) {
                var r = E.isEmptyObject(e),
                    s = E.speed(t, i, n),
                    o = function() {
                        var t = mt(this, E.extend({}, e), s);
                        (r || Q.get(this, "finish")) && t.stop(!0)
                    };
                return o.finish = o, r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
            },
            stop: function(e, t, i) {
                var n = function(e) {
                    var t = e.stop;
                    delete e.stop,
                    t(i)
                };
                return "string" != typeof e && (i = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each((function() {
                    var t = !0,
                        r = null != e && e + "queueHooks",
                        s = E.timers,
                        o = Q.get(this);
                    if (r)
                        o[r] && o[r].stop && n(o[r]);
                    else
                        for (r in o)
                            o[r] && o[r].stop && dt.test(r) && n(o[r]);
                    for (r = s.length; r--;)
                        s[r].elem !== this || null != e && s[r].queue !== e || (s[r].anim.stop(i), t = !1, s.splice(r, 1));
                    !t && i || E.dequeue(this, e)
                }))
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each((function() {
                    var t,
                        i = Q.get(this),
                        n = i[e + "queue"],
                        r = i[e + "queueHooks"],
                        s = E.timers,
                        o = n ? n.length : 0;
                    for (i.finish = !0, E.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = s.length; t--;)
                        s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                    for (t = 0; t < o; t++)
                        n[t] && n[t].finish && n[t].finish.call(this);
                    delete i.finish
                }))
            }
        }),
        E.each(["toggle", "show", "hide"], (function(e, t) {
            var i = E.fn[t];
            E.fn[t] = function(e, n, r) {
                return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(ht(t, !0), e, n, r)
            }
        })),
        E.each({
            slideDown: ht("show"),
            slideUp: ht("hide"),
            slideToggle: ht("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, (function(e, t) {
            E.fn[e] = function(e, i, n) {
                return this.animate(t, e, i, n)
            }
        })),
        E.timers = [],
        E.fx.tick = function() {
            var e,
                t = 0,
                i = E.timers;
            for (at = Date.now(); t < i.length; t++)
                (e = i[t])() || i[t] !== e || i.splice(t--, 1);
            i.length || E.fx.stop(),
            at = void 0
        },
        E.fx.timer = function(e) {
            E.timers.push(e),
            E.fx.start()
        },
        E.fx.interval = 13,
        E.fx.start = function() {
            lt || (lt = !0, ut())
        },
        E.fx.stop = function() {
            lt = null
        },
        E.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        E.fn.delay = function(e, t) {
            return e = E.fx && E.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, n) {
                var r = i.setTimeout(t, e);
                n.stop = function() {
                    i.clearTimeout(r)
                }
            }))
        },
        function() {
            var e = o.createElement("input"),
                t = o.createElement("select").appendChild(o.createElement("option"));
            e.type = "checkbox",
            v.checkOn = "" !== e.value,
            v.optSelected = t.selected,
            (e = o.createElement("input")).value = "t",
            e.type = "radio",
            v.radioValue = "t" === e.value
        }();
        var gt,
            vt = E.expr.attrHandle;
        E.fn.extend({
            attr: function(e, t) {
                return Y(this, E.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each((function() {
                    E.removeAttr(this, e)
                }))
            }
        }),
        E.extend({
            attr: function(e, t, i) {
                var n,
                    r,
                    s = e.nodeType;
                if (3 !== s && 8 !== s && 2 !== s)
                    return void 0 === e.getAttribute ? E.prop(e, t, i) : (1 === s && E.isXMLDoc(e) || (r = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? gt : void 0)), void 0 !== i ? null === i ? void E.removeAttr(e, t) : r && "set" in r && void 0 !== (n = r.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : r && "get" in r && null !== (n = r.get(e, t)) ? n : null == (n = E.find.attr(e, t)) ? void 0 : n)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!v.radioValue && "radio" === t && L(e, "input")) {
                            var i = e.value;
                            return e.setAttribute("type", t), i && (e.value = i), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var i,
                    n = 0,
                    r = t && t.match(j);
                if (r && 1 === e.nodeType)
                    for (; i = r[n++];)
                        e.removeAttribute(i)
            }
        }),
        gt = {
            set: function(e, t, i) {
                return !1 === t ? E.removeAttr(e, i) : e.setAttribute(i, i), i
            }
        },
        E.each(E.expr.match.bool.source.match(/\w+/g), (function(e, t) {
            var i = vt[t] || E.find.attr;
            vt[t] = function(e, t, n) {
                var r,
                    s,
                    o = t.toLowerCase();
                return n || (s = vt[o], vt[o] = r, r = null != i(e, t, n) ? o : null, vt[o] = s), r
            }
        }));
        var yt = /^(?:input|select|textarea|button)$/i,
            bt = /^(?:a|area)$/i;
        function wt(e) {
            return (e.match(j) || []).join(" ")
        }
        function xt(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }
        function Tt(e) {
            return Array.isArray(e) ? e : "string" == typeof e && e.match(j) || []
        }
        E.fn.extend({
            prop: function(e, t) {
                return Y(this, E.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each((function() {
                    delete this[E.propFix[e] || e]
                }))
            }
        }),
        E.extend({
            prop: function(e, t, i) {
                var n,
                    r,
                    s = e.nodeType;
                if (3 !== s && 8 !== s && 2 !== s)
                    return 1 === s && E.isXMLDoc(e) || (t = E.propFix[t] || t, r = E.propHooks[t]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(e, i, t)) ? n : e[t] = i : r && "get" in r && null !== (n = r.get(e, t)) ? n : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = E.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : yt.test(e.nodeName) || bt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }),
        v.optSelected || (E.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }),
        E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
            E.propFix[this.toLowerCase()] = this
        })),
        E.fn.extend({
            addClass: function(e) {
                var t,
                    i,
                    n,
                    r,
                    s,
                    o,
                    a,
                    l = 0;
                if (y(e))
                    return this.each((function(t) {
                        E(this).addClass(e.call(this, t, xt(this)))
                    }));
                if ((t = Tt(e)).length)
                    for (; i = this[l++];)
                        if (r = xt(i), n = 1 === i.nodeType && " " + wt(r) + " ") {
                            for (o = 0; s = t[o++];)
                                n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                            r !== (a = wt(n)) && i.setAttribute("class", a)
                        }
                return this
            },
            removeClass: function(e) {
                var t,
                    i,
                    n,
                    r,
                    s,
                    o,
                    a,
                    l = 0;
                if (y(e))
                    return this.each((function(t) {
                        E(this).removeClass(e.call(this, t, xt(this)))
                    }));
                if (!arguments.length)
                    return this.attr("class", "");
                if ((t = Tt(e)).length)
                    for (; i = this[l++];)
                        if (r = xt(i), n = 1 === i.nodeType && " " + wt(r) + " ") {
                            for (o = 0; s = t[o++];)
                                for (; n.indexOf(" " + s + " ") > -1;)
                                    n = n.replace(" " + s + " ", " ");
                            r !== (a = wt(n)) && i.setAttribute("class", a)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var i = typeof e,
                    n = "string" === i || Array.isArray(e);
                return "boolean" == typeof t && n ? t ? this.addClass(e) : this.removeClass(e) : y(e) ? this.each((function(i) {
                    E(this).toggleClass(e.call(this, i, xt(this), t), t)
                })) : this.each((function() {
                    var t,
                        r,
                        s,
                        o;
                    if (n)
                        for (r = 0, s = E(this), o = Tt(e); t = o[r++];)
                            s.hasClass(t) ? s.removeClass(t) : s.addClass(t);
                    else
                        void 0 !== e && "boolean" !== i || ((t = xt(this)) && Q.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Q.get(this, "__className__") || ""))
                }))
            },
            hasClass: function(e) {
                var t,
                    i,
                    n = 0;
                for (t = " " + e + " "; i = this[n++];)
                    if (1 === i.nodeType && (" " + wt(xt(i)) + " ").indexOf(t) > -1)
                        return !0;
                return !1
            }
        });
        var Et = /\r/g;
        E.fn.extend({
            val: function(e) {
                var t,
                    i,
                    n,
                    r = this[0];
                return arguments.length ? (n = y(e), this.each((function(i) {
                    var r;
                    1 === this.nodeType && (null == (r = n ? e.call(this, i, E(this).val()) : e) ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = E.map(r, (function(e) {
                        return null == e ? "" : e + ""
                    }))), (t = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                }))) : r ? (t = E.valHooks[r.type] || E.valHooks[r.nodeName.toLowerCase()]) && "get" in t && void 0 !== (i = t.get(r, "value")) ? i : "string" == typeof (i = r.value) ? i.replace(Et, "") : null == i ? "" : i : void 0
            }
        }),
        E.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = E.find.attr(e, "value");
                        return null != t ? t : wt(E.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t,
                            i,
                            n,
                            r = e.options,
                            s = e.selectedIndex,
                            o = "select-one" === e.type,
                            a = o ? null : [],
                            l = o ? s + 1 : r.length;
                        for (n = s < 0 ? l : o ? s : 0; n < l; n++)
                            if (((i = r[n]).selected || n === s) && !i.disabled && (!i.parentNode.disabled || !L(i.parentNode, "optgroup"))) {
                                if (t = E(i).val(), o)
                                    return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function(e, t) {
                        for (var i, n, r = e.options, s = E.makeArray(t), o = r.length; o--;)
                            ((n = r[o]).selected = E.inArray(E.valHooks.option.get(n), s) > -1) && (i = !0);
                        return i || (e.selectedIndex = -1), s
                    }
                }
            }
        }),
        E.each(["radio", "checkbox"], (function() {
            E.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t))
                        return e.checked = E.inArray(E(e).val(), t) > -1
                }
            },
            v.checkOn || (E.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        })),
        v.focusin = "onfocusin" in i;
        var St = /^(?:focusinfocus|focusoutblur)$/,
            Ct = function(e) {
                e.stopPropagation()
            };
        E.extend(E.event, {
            trigger: function(e, t, n, r) {
                var s,
                    a,
                    l,
                    c,
                    d,
                    u,
                    p,
                    h,
                    m = [n || o],
                    g = f.call(e, "type") ? e.type : e,
                    v = f.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = h = l = n = n || o, 3 !== n.nodeType && 8 !== n.nodeType && !St.test(g + E.event.triggered) && (g.indexOf(".") > -1 && (v = g.split("."), g = v.shift(), v.sort()), d = g.indexOf(":") < 0 && "on" + g, (e = e[E.expando] ? e : new E.Event(g, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = v.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : E.makeArray(t, [e]), p = E.event.special[g] || {}, r || !p.trigger || !1 !== p.trigger.apply(n, t))) {
                    if (!r && !p.noBubble && !b(n)) {
                        for (c = p.delegateType || g, St.test(c + g) || (a = a.parentNode); a; a = a.parentNode)
                            m.push(a),
                            l = a;
                        l === (n.ownerDocument || o) && m.push(l.defaultView || l.parentWindow || i)
                    }
                    for (s = 0; (a = m[s++]) && !e.isPropagationStopped();)
                        h = a,
                        e.type = s > 1 ? c : p.bindType || g,
                        (u = (Q.get(a, "events") || {})[e.type] && Q.get(a, "handle")) && u.apply(a, t),
                        (u = d && a[d]) && u.apply && K(a) && (e.result = u.apply(a, t), !1 === e.result && e.preventDefault());
                    return e.type = g, r || e.isDefaultPrevented() || p._default && !1 !== p._default.apply(m.pop(), t) || !K(n) || d && y(n[g]) && !b(n) && ((l = n[d]) && (n[d] = null), E.event.triggered = g, e.isPropagationStopped() && h.addEventListener(g, Ct), n[g](), e.isPropagationStopped() && h.removeEventListener(g, Ct), E.event.triggered = void 0, l && (n[d] = l)), e.result
                }
            },
            simulate: function(e, t, i) {
                var n = E.extend(new E.Event, i, {
                    type: e,
                    isSimulated: !0
                });
                E.event.trigger(n, null, t)
            }
        }),
        E.fn.extend({
            trigger: function(e, t) {
                return this.each((function() {
                    E.event.trigger(e, t, this)
                }))
            },
            triggerHandler: function(e, t) {
                var i = this[0];
                if (i)
                    return E.event.trigger(e, t, i, !0)
            }
        }),
        v.focusin || E.each({
            focus: "focusin",
            blur: "focusout"
        }, (function(e, t) {
            var i = function(e) {
                E.event.simulate(t, e.target, E.event.fix(e))
            };
            E.event.special[t] = {
                setup: function() {
                    var n = this.ownerDocument || this,
                        r = Q.access(n, t);
                    r || n.addEventListener(e, i, !0),
                    Q.access(n, t, (r || 0) + 1)
                },
                teardown: function() {
                    var n = this.ownerDocument || this,
                        r = Q.access(n, t) - 1;
                    r ? Q.access(n, t, r) : (n.removeEventListener(e, i, !0), Q.remove(n, t))
                }
            }
        }));
        var kt = i.location,
            Mt = Date.now(),
            $t = /\?/;
        E.parseXML = function(e) {
            var t;
            if (!e || "string" != typeof e)
                return null;
            try {
                t = (new i.DOMParser).parseFromString(e, "text/xml")
            } catch (e) {
                t = void 0
            }
            return t && !t.getElementsByTagName("parsererror").length || E.error("Invalid XML: " + e), t
        };
        var zt = /\[\]$/,
            Lt = /\r?\n/g,
            Pt = /^(?:submit|button|image|reset|file)$/i,
            At = /^(?:input|select|textarea|keygen)/i;
        function Dt(e, t, i, n) {
            var r;
            if (Array.isArray(t))
                E.each(t, (function(t, r) {
                    i || zt.test(e) ? n(e, r) : Dt(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, i, n)
                }));
            else if (i || "object" !== T(t))
                n(e, t);
            else
                for (r in t)
                    Dt(e + "[" + r + "]", t[r], i, n)
        }
        E.param = function(e, t) {
            var i,
                n = [],
                r = function(e, t) {
                    var i = y(t) ? t() : t;
                    n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == i ? "" : i)
                };
            if (null == e)
                return "";
            if (Array.isArray(e) || e.jquery && !E.isPlainObject(e))
                E.each(e, (function() {
                    r(this.name, this.value)
                }));
            else
                for (i in e)
                    Dt(i, e[i], t, r);
            return n.join("&")
        },
        E.fn.extend({
            serialize: function() {
                return E.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map((function() {
                    var e = E.prop(this, "elements");
                    return e ? E.makeArray(e) : this
                })).filter((function() {
                    var e = this.type;
                    return this.name && !E(this).is(":disabled") && At.test(this.nodeName) && !Pt.test(e) && (this.checked || !me.test(e))
                })).map((function(e, t) {
                    var i = E(this).val();
                    return null == i ? null : Array.isArray(i) ? E.map(i, (function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Lt, "\r\n")
                        }
                    })) : {
                        name: t.name,
                        value: i.replace(Lt, "\r\n")
                    }
                })).get()
            }
        });
        var It = /%20/g,
            Nt = /#.*$/,
            Ot = /([?&])_=[^&]*/,
            Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            jt = /^(?:GET|HEAD)$/,
            _t = /^\/\//,
            qt = {},
            Bt = {},
            Rt = "*/".concat("*"),
            Xt = o.createElement("a");
        function Ft(e) {
            return function(t, i) {
                "string" != typeof t && (i = t, t = "*");
                var n,
                    r = 0,
                    s = t.toLowerCase().match(j) || [];
                if (y(i))
                    for (; n = s[r++];)
                        "+" === n[0] ? (n = n.slice(1) || "*", (e[n] = e[n] || []).unshift(i)) : (e[n] = e[n] || []).push(i)
            }
        }
        function Yt(e, t, i, n) {
            var r = {},
                s = e === Bt;
            function o(a) {
                var l;
                return r[a] = !0, E.each(e[a] || [], (function(e, a) {
                    var c = a(t, i, n);
                    return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
                })), l
            }
            return o(t.dataTypes[0]) || !r["*"] && o("*")
        }
        function Wt(e, t) {
            var i,
                n,
                r = E.ajaxSettings.flatOptions || {};
            for (i in t)
                void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
            return n && E.extend(!0, e, n), e
        }
        Xt.href = kt.href,
        E.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: kt.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(kt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Rt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": E.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? Wt(Wt(e, E.ajaxSettings), t) : Wt(E.ajaxSettings, e)
            },
            ajaxPrefilter: Ft(qt),
            ajaxTransport: Ft(Bt),
            ajax: function(e, t) {
                "object" == typeof e && (t = e, e = void 0),
                t = t || {};
                var n,
                    r,
                    s,
                    a,
                    l,
                    c,
                    d,
                    u,
                    p,
                    h,
                    f = E.ajaxSetup({}, t),
                    m = f.context || f,
                    g = f.context && (m.nodeType || m.jquery) ? E(m) : E.event,
                    v = E.Deferred(),
                    y = E.Callbacks("once memory"),
                    b = f.statusCode || {},
                    w = {},
                    x = {},
                    T = "canceled",
                    S = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (d) {
                                if (!a)
                                    for (a = {}; t = Ht.exec(s);)
                                        a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                t = a[e.toLowerCase() + " "]
                            }
                            return null == t ? null : t.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return d ? s : null
                        },
                        setRequestHeader: function(e, t) {
                            return null == d && (e = x[e.toLowerCase()] = x[e.toLowerCase()] || e, w[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return null == d && (f.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (d)
                                    S.always(e[S.status]);
                                else
                                    for (t in e)
                                        b[t] = [b[t], e[t]];
                            return this
                        },
                        abort: function(e) {
                            var t = e || T;
                            return n && n.abort(t), C(0, t), this
                        }
                    };
                if (v.promise(S), f.url = ((e || f.url || kt.href) + "").replace(_t, kt.protocol + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(j) || [""], null == f.crossDomain) {
                    c = o.createElement("a");
                    try {
                        c.href = f.url,
                        c.href = c.href,
                        f.crossDomain = Xt.protocol + "//" + Xt.host != c.protocol + "//" + c.host
                    } catch (e) {
                        f.crossDomain = !0
                    }
                }
                if (f.data && f.processData && "string" != typeof f.data && (f.data = E.param(f.data, f.traditional)), Yt(qt, f, t, S), d)
                    return S;
                for (p in (u = E.event && f.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !jt.test(f.type), r = f.url.replace(Nt, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(It, "+")) : (h = f.url.slice(r.length), f.data && (f.processData || "string" == typeof f.data) && (r += ($t.test(r) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (r = r.replace(Ot, "$1"), h = ($t.test(r) ? "&" : "?") + "_=" + Mt++ + h), f.url = r + h), f.ifModified && (E.lastModified[r] && S.setRequestHeader("If-Modified-Since", E.lastModified[r]), E.etag[r] && S.setRequestHeader("If-None-Match", E.etag[r])), (f.data && f.hasContent && !1 !== f.contentType || t.contentType) && S.setRequestHeader("Content-Type", f.contentType), S.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : f.accepts["*"]), f.headers)
                    S.setRequestHeader(p, f.headers[p]);
                if (f.beforeSend && (!1 === f.beforeSend.call(m, S, f) || d))
                    return S.abort();
                if (T = "abort", y.add(f.complete), S.done(f.success), S.fail(f.error), n = Yt(Bt, f, t, S)) {
                    if (S.readyState = 1, u && g.trigger("ajaxSend", [S, f]), d)
                        return S;
                    f.async && f.timeout > 0 && (l = i.setTimeout((function() {
                        S.abort("timeout")
                    }), f.timeout));
                    try {
                        d = !1,
                        n.send(w, C)
                    } catch (e) {
                        if (d)
                            throw e;
                        C(-1, e)
                    }
                } else
                    C(-1, "No Transport");
                function C(e, t, o, a) {
                    var c,
                        p,
                        h,
                        w,
                        x,
                        T = t;
                    d || (d = !0, l && i.clearTimeout(l), n = void 0, s = a || "", S.readyState = e > 0 ? 4 : 0, c = e >= 200 && e < 300 || 304 === e, o && (w = function(e, t, i) {
                        for (var n, r, s, o, a = e.contents, l = e.dataTypes; "*" === l[0];)
                            l.shift(),
                            void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                        if (n)
                            for (r in a)
                                if (a[r] && a[r].test(n)) {
                                    l.unshift(r);
                                    break
                                }
                        if (l[0] in i)
                            s = l[0];
                        else {
                            for (r in i) {
                                if (!l[0] || e.converters[r + " " + l[0]]) {
                                    s = r;
                                    break
                                }
                                o || (o = r)
                            }
                            s = s || o
                        }
                        if (s)
                            return s !== l[0] && l.unshift(s), i[s]
                    }(f, S, o)), w = function(e, t, i, n) {
                        var r,
                            s,
                            o,
                            a,
                            l,
                            c = {},
                            d = e.dataTypes.slice();
                        if (d[1])
                            for (o in e.converters)
                                c[o.toLowerCase()] = e.converters[o];
                        for (s = d.shift(); s;)
                            if (e.responseFields[s] && (i[e.responseFields[s]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = s, s = d.shift())
                                if ("*" === s)
                                    s = l;
                                else if ("*" !== l && l !== s) {
                                    if (!(o = c[l + " " + s] || c["* " + s]))
                                        for (r in c)
                                            if ((a = r.split(" "))[1] === s && (o = c[l + " " + a[0]] || c["* " + a[0]])) {
                                                !0 === o ? o = c[r] : !0 !== c[r] && (s = a[0], d.unshift(a[1]));
                                                break
                                            }
                                    if (!0 !== o)
                                        if (o && e.throws)
                                            t = o(t);
                                        else
                                            try {
                                                t = o(t)
                                            } catch (e) {
                                                return {
                                                    state: "parsererror",
                                                    error: o ? e : "No conversion from " + l + " to " + s
                                                }
                                            }
                                }
                        return {
                            state: "success",
                            data: t
                        }
                    }(f, w, S, c), c ? (f.ifModified && ((x = S.getResponseHeader("Last-Modified")) && (E.lastModified[r] = x), (x = S.getResponseHeader("etag")) && (E.etag[r] = x)), 204 === e || "HEAD" === f.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = w.state, p = w.data, c = !(h = w.error))) : (h = T, !e && T || (T = "error", e < 0 && (e = 0))), S.status = e, S.statusText = (t || T) + "", c ? v.resolveWith(m, [p, T, S]) : v.rejectWith(m, [S, T, h]), S.statusCode(b), b = void 0, u && g.trigger(c ? "ajaxSuccess" : "ajaxError", [S, f, c ? p : h]), y.fireWith(m, [S, T]), u && (g.trigger("ajaxComplete", [S, f]), --E.active || E.event.trigger("ajaxStop")))
                }
                return S
            },
            getJSON: function(e, t, i) {
                return E.get(e, t, i, "json")
            },
            getScript: function(e, t) {
                return E.get(e, void 0, t, "script")
            }
        }),
        E.each(["get", "post"], (function(e, t) {
            E[t] = function(e, i, n, r) {
                return y(i) && (r = r || n, n = i, i = void 0), E.ajax(E.extend({
                    url: e,
                    type: t,
                    dataType: r,
                    data: i,
                    success: n
                }, E.isPlainObject(e) && e))
            }
        })),
        E._evalUrl = function(e, t) {
            return E.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(e) {
                    E.globalEval(e, t)
                }
            })
        },
        E.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (y(e) && (e = e.call(this[0])), t = E(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                    for (var e = this; e.firstElementChild;)
                        e = e.firstElementChild;
                    return e
                })).append(this)), this
            },
            wrapInner: function(e) {
                return y(e) ? this.each((function(t) {
                    E(this).wrapInner(e.call(this, t))
                })) : this.each((function() {
                    var t = E(this),
                        i = t.contents();
                    i.length ? i.wrapAll(e) : t.append(e)
                }))
            },
            wrap: function(e) {
                var t = y(e);
                return this.each((function(i) {
                    E(this).wrapAll(t ? e.call(this, i) : e)
                }))
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each((function() {
                    E(this).replaceWith(this.childNodes)
                })), this
            }
        }),
        E.expr.pseudos.hidden = function(e) {
            return !E.expr.pseudos.visible(e)
        },
        E.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        },
        E.ajaxSettings.xhr = function() {
            try {
                return new i.XMLHttpRequest
            } catch (e) {}
        };
        var Vt = {
                0: 200,
                1223: 204
            },
            Gt = E.ajaxSettings.xhr();
        v.cors = !!Gt && "withCredentials" in Gt,
        v.ajax = Gt = !!Gt,
        E.ajaxTransport((function(e) {
            var t,
                n;
            if (v.cors || Gt && !e.crossDomain)
                return {
                    send: function(r, s) {
                        var o,
                            a = e.xhr();
                        if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                            for (o in e.xhrFields)
                                a[o] = e.xhrFields[o];
                        for (o in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r)
                            a.setRequestHeader(o, r[o]);
                        t = function(e) {
                            return function() {
                                t && (t = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? s(0, "error") : s(a.status, a.statusText) : s(Vt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                    binary: a.response
                                } : {
                                    text: a.responseText
                                }, a.getAllResponseHeaders()))
                            }
                        },
                        a.onload = t(),
                        n = a.onerror = a.ontimeout = t("error"),
                        void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                            4 === a.readyState && i.setTimeout((function() {
                                t && n()
                            }))
                        },
                        t = t("abort");
                        try {
                            a.send(e.hasContent && e.data || null)
                        } catch (e) {
                            if (t)
                                throw e
                        }
                    },
                    abort: function() {
                        t && t()
                    }
                }
        })),
        E.ajaxPrefilter((function(e) {
            e.crossDomain && (e.contents.script = !1)
        })),
        E.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return E.globalEval(e), e
                }
            }
        }),
        E.ajaxPrefilter("script", (function(e) {
            void 0 === e.cache && (e.cache = !1),
            e.crossDomain && (e.type = "GET")
        })),
        E.ajaxTransport("script", (function(e) {
            var t,
                i;
            if (e.crossDomain || e.scriptAttrs)
                return {
                    send: function(n, r) {
                        t = E("<script>").attr(e.scriptAttrs || {}).prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", i = function(e) {
                            t.remove(),
                            i = null,
                            e && r("error" === e.type ? 404 : 200, e.type)
                        }),
                        o.head.appendChild(t[0])
                    },
                    abort: function() {
                        i && i()
                    }
                }
        }));
        var Ut,
            Kt = [],
            Zt = /(=)\?(?=&|$)|\?\?/;
        E.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Kt.pop() || E.expando + "_" + Mt++;
                return this[e] = !0, e
            }
        }),
        E.ajaxPrefilter("json jsonp", (function(e, t, n) {
            var r,
                s,
                o,
                a = !1 !== e.jsonp && (Zt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0])
                return r = e.jsonpCallback = y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Zt, "$1" + r) : !1 !== e.jsonp && (e.url += ($t.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                    return o || E.error(r + " was not called"), o[0]
                }, e.dataTypes[0] = "json", s = i[r], i[r] = function() {
                    o = arguments
                }, n.always((function() {
                    void 0 === s ? E(i).removeProp(r) : i[r] = s,
                    e[r] && (e.jsonpCallback = t.jsonpCallback, Kt.push(r)),
                    o && y(s) && s(o[0]),
                    o = s = void 0
                })), "script"
        })),
        v.createHTMLDocument = ((Ut = o.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ut.childNodes.length),
        E.parseHTML = function(e, t, i) {
            return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t, t = !1), t || (v.createHTMLDocument ? ((n = (t = o.implementation.createHTMLDocument("")).createElement("base")).href = o.location.href, t.head.appendChild(n)) : t = o), s = !i && [], (r = P.exec(e)) ? [t.createElement(r[1])] : (r = Se([e], t, s), s && s.length && E(s).remove(), E.merge([], r.childNodes)));
            var n,
                r,
                s
        },
        E.fn.load = function(e, t, i) {
            var n,
                r,
                s,
                o = this,
                a = e.indexOf(" ");
            return a > -1 && (n = wt(e.slice(a)), e = e.slice(0, a)), y(t) ? (i = t, t = void 0) : t && "object" == typeof t && (r = "POST"), o.length > 0 && E.ajax({
                url: e,
                type: r || "GET",
                dataType: "html",
                data: t
            }).done((function(e) {
                s = arguments,
                o.html(n ? E("<div>").append(E.parseHTML(e)).find(n) : e)
            })).always(i && function(e, t) {
                o.each((function() {
                    i.apply(this, s || [e.responseText, t, e])
                }))
            }), this
        },
        E.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
            E.fn[t] = function(e) {
                return this.on(t, e)
            }
        })),
        E.expr.pseudos.animated = function(e) {
            return E.grep(E.timers, (function(t) {
                return e === t.elem
            })).length
        },
        E.offset = {
            setOffset: function(e, t, i) {
                var n,
                    r,
                    s,
                    o,
                    a,
                    l,
                    c = E.css(e, "position"),
                    d = E(e),
                    u = {};
                "static" === c && (e.style.position = "relative"),
                a = d.offset(),
                s = E.css(e, "top"),
                l = E.css(e, "left"),
                ("absolute" === c || "fixed" === c) && (s + l).indexOf("auto") > -1 ? (o = (n = d.position()).top, r = n.left) : (o = parseFloat(s) || 0, r = parseFloat(l) || 0),
                y(t) && (t = t.call(e, i, E.extend({}, a))),
                null != t.top && (u.top = t.top - a.top + o),
                null != t.left && (u.left = t.left - a.left + r),
                "using" in t ? t.using.call(e, u) : d.css(u)
            }
        },
        E.fn.extend({
            offset: function(e) {
                if (arguments.length)
                    return void 0 === e ? this : this.each((function(t) {
                        E.offset.setOffset(this, e, t)
                    }));
                var t,
                    i,
                    n = this[0];
                return n ? n.getClientRects().length ? (t = n.getBoundingClientRect(), i = n.ownerDocument.defaultView, {
                    top: t.top + i.pageYOffset,
                    left: t.left + i.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e,
                        t,
                        i,
                        n = this[0],
                        r = {
                            top: 0,
                            left: 0
                        };
                    if ("fixed" === E.css(n, "position"))
                        t = n.getBoundingClientRect();
                    else {
                        for (t = this.offset(), i = n.ownerDocument, e = n.offsetParent || i.documentElement; e && (e === i.body || e === i.documentElement) && "static" === E.css(e, "position");)
                            e = e.parentNode;
                        e && e !== n && 1 === e.nodeType && ((r = E(e).offset()).top += E.css(e, "borderTopWidth", !0), r.left += E.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - r.top - E.css(n, "marginTop", !0),
                        left: t.left - r.left - E.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map((function() {
                    for (var e = this.offsetParent; e && "static" === E.css(e, "position");)
                        e = e.offsetParent;
                    return e || oe
                }))
            }
        }),
        E.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, (function(e, t) {
            var i = "pageYOffset" === t;
            E.fn[e] = function(n) {
                return Y(this, (function(e, n, r) {
                    var s;
                    if (b(e) ? s = e : 9 === e.nodeType && (s = e.defaultView), void 0 === r)
                        return s ? s[t] : e[n];
                    s ? s.scrollTo(i ? s.pageXOffset : r, i ? r : s.pageYOffset) : e[n] = r
                }), e, n, arguments.length)
            }
        })),
        E.each(["top", "left"], (function(e, t) {
            E.cssHooks[t] = Ge(v.pixelPosition, (function(e, i) {
                if (i)
                    return i = Ve(e, t), Fe.test(i) ? E(e).position()[t] + "px" : i
            }))
        })),
        E.each({
            Height: "height",
            Width: "width"
        }, (function(e, t) {
            E.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, (function(i, n) {
                E.fn[n] = function(r, s) {
                    var o = arguments.length && (i || "boolean" != typeof r),
                        a = i || (!0 === r || !0 === s ? "margin" : "border");
                    return Y(this, (function(t, i, r) {
                        var s;
                        return b(t) ? 0 === n.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (s = t.documentElement, Math.max(t.body["scroll" + e], s["scroll" + e], t.body["offset" + e], s["offset" + e], s["client" + e])) : void 0 === r ? E.css(t, i, a) : E.style(t, i, r, a)
                    }), t, o ? r : void 0, o)
                }
            }))
        })),
        E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
            E.fn[t] = function(e, i) {
                return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
            }
        })),
        E.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }),
        E.fn.extend({
            bind: function(e, t, i) {
                return this.on(e, null, t, i)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, i, n) {
                return this.on(t, e, i, n)
            },
            undelegate: function(e, t, i) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
            }
        }),
        E.proxy = function(e, t) {
            var i,
                n,
                r;
            if ("string" == typeof t && (i = e[t], t = e, e = i), y(e))
                return n = l.call(arguments, 2), (r = function() {
                    return e.apply(t || this, n.concat(l.call(arguments)))
                }).guid = e.guid = e.guid || E.guid++, r
        },
        E.holdReady = function(e) {
            e ? E.readyWait++ : E.ready(!0)
        },
        E.isArray = Array.isArray,
        E.parseJSON = JSON.parse,
        E.nodeName = L,
        E.isFunction = y,
        E.isWindow = b,
        E.camelCase = U,
        E.type = T,
        E.now = Date.now,
        E.isNumeric = function(e) {
            var t = E.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        },
        void 0 === (n = function() {
            return E
        }.apply(t, [])) || (e.exports = n);
        var Qt = i.jQuery,
            Jt = i.$;
        return E.noConflict = function(e) {
            return i.$ === E && (i.$ = Jt), e && i.jQuery === E && (i.jQuery = Qt), E
        }, r || (i.jQuery = i.$ = E), E
    }))
}, , function(e, t, i) {
    var n,
        r;
    !function(s, o) {
        "use strict";
        n = [i(11)],
        void 0 === (r = function(e) {
            return function(e, t) {
                var i = e.jQuery,
                    n = e.console;
                function r(e, t) {
                    for (var i in t)
                        e[i] = t[i];
                    return e
                }
                var s = Array.prototype.slice;
                function o(e, t, a) {
                    if (!(this instanceof o))
                        return new o(e, t, a);
                    var l,
                        c = e;
                    ("string" == typeof e && (c = document.querySelectorAll(e)), c) ? (this.elements = (l = c, Array.isArray(l) ? l : "object" == typeof l && "number" == typeof l.length ? s.call(l) : [l]), this.options = r({}, this.options), "function" == typeof t ? a = t : r(this.options, t), a && this.on("always", a), this.getImages(), i && (this.jqDeferred = new i.Deferred), setTimeout(this.check.bind(this))) : n.error("Bad element for imagesLoaded " + (c || e))
                }
                o.prototype = Object.create(t.prototype),
                o.prototype.options = {},
                o.prototype.getImages = function() {
                    this.images = [],
                    this.elements.forEach(this.addElementImages, this)
                },
                o.prototype.addElementImages = function(e) {
                    "IMG" == e.nodeName && this.addImage(e),
                    !0 === this.options.background && this.addElementBackgroundImages(e);
                    var t = e.nodeType;
                    if (t && a[t]) {
                        for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                            var r = i[n];
                            this.addImage(r)
                        }
                        if ("string" == typeof this.options.background) {
                            var s = e.querySelectorAll(this.options.background);
                            for (n = 0; n < s.length; n++) {
                                var o = s[n];
                                this.addElementBackgroundImages(o)
                            }
                        }
                    }
                };
                var a = {
                    1: !0,
                    9: !0,
                    11: !0
                };
                function l(e) {
                    this.img = e
                }
                function c(e, t) {
                    this.url = e,
                    this.element = t,
                    this.img = new Image
                }
                return o.prototype.addElementBackgroundImages = function(e) {
                    var t = getComputedStyle(e);
                    if (t)
                        for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                            var r = n && n[2];
                            r && this.addBackground(r, e),
                            n = i.exec(t.backgroundImage)
                        }
                }, o.prototype.addImage = function(e) {
                    var t = new l(e);
                    this.images.push(t)
                }, o.prototype.addBackground = function(e, t) {
                    var i = new c(e, t);
                    this.images.push(i)
                }, o.prototype.check = function() {
                    var e = this;
                    function t(t, i, n) {
                        setTimeout((function() {
                            e.progress(t, i, n)
                        }))
                    }
                    this.progressedCount = 0,
                    this.hasAnyBroken = !1,
                    this.images.length ? this.images.forEach((function(e) {
                        e.once("progress", t),
                        e.check()
                    })) : this.complete()
                }, o.prototype.progress = function(e, t, i) {
                    this.progressedCount++,
                    this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded,
                    this.emitEvent("progress", [this, e, t]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && n && n.log("progress: " + i, e, t)
                }, o.prototype.complete = function() {
                    var e = this.hasAnyBroken ? "fail" : "done";
                    if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                        var t = this.hasAnyBroken ? "reject" : "resolve";
                        this.jqDeferred[t](this)
                    }
                }, l.prototype = Object.create(t.prototype), l.prototype.check = function() {
                    this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src)
                }, l.prototype.getIsImageComplete = function() {
                    return this.img.complete && this.img.naturalWidth
                }, l.prototype.confirm = function(e, t) {
                    this.isLoaded = e,
                    this.emitEvent("progress", [this, this.img, t])
                }, l.prototype.handleEvent = function(e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e)
                }, l.prototype.onload = function() {
                    this.confirm(!0, "onload"),
                    this.unbindEvents()
                }, l.prototype.onerror = function() {
                    this.confirm(!1, "onerror"),
                    this.unbindEvents()
                }, l.prototype.unbindEvents = function() {
                    this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
                }, c.prototype = Object.create(l.prototype), c.prototype.check = function() {
                    this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    this.img.src = this.url,
                    this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
                }, c.prototype.unbindEvents = function() {
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
                }, c.prototype.confirm = function(e, t) {
                    this.isLoaded = e,
                    this.emitEvent("progress", [this, this.element, t])
                }, o.makeJQueryPlugin = function(t) {
                    (t = t || e.jQuery) && ((i = t).fn.imagesLoaded = function(e, t) {
                        return new o(this, e, t).jqDeferred.promise(i(this))
                    })
                }, o.makeJQueryPlugin(), o
            }(s, e)
        }.apply(t, n)) || (e.exports = r)
    }("undefined" != typeof window ? window : this)
}, , , function(e, t, i) {
    var n,
        r,
        s;
    !function(o) {
        "use strict";
        r = [i(0)],
        void 0 === (s = "function" == typeof (n = function(e) {
            var t = -1,
                i = -1,
                n = function(e) {
                    return parseFloat(e) || 0
                },
                r = function(t) {
                    var i = e(t),
                        r = null,
                        s = [];
                    return i.each((function() {
                        var t = e(this),
                            i = t.offset().top - n(t.css("margin-top")),
                            o = s.length > 0 ? s[s.length - 1] : null;
                        null === o ? s.push(t) : Math.floor(Math.abs(r - i)) <= 1 ? s[s.length - 1] = o.add(t) : s.push(t),
                        r = i
                    })), s
                },
                s = function(t) {
                    var i = {
                        byRow: !0,
                        property: "height",
                        target: null,
                        remove: !1
                    };
                    return "object" == typeof t ? e.extend(i, t) : ("boolean" == typeof t ? i.byRow = t : "remove" === t && (i.remove = !0), i)
                },
                o = e.fn.matchHeight = function(t) {
                    var i = s(t);
                    if (i.remove) {
                        var n = this;
                        return this.css(i.property, ""), e.each(o._groups, (function(e, t) {
                            t.elements = t.elements.not(n)
                        })), this
                    }
                    return this.length <= 1 && !i.target || (o._groups.push({
                        elements: this,
                        options: i
                    }), o._apply(this, i)), this
                };
            o.version = "0.7.2",
            o._groups = [],
            o._throttle = 80,
            o._maintainScroll = !1,
            o._beforeUpdate = null,
            o._afterUpdate = null,
            o._rows = r,
            o._parse = n,
            o._parseOptions = s,
            o._apply = function(t, i) {
                var a = s(i),
                    l = e(t),
                    c = [l],
                    d = e(window).scrollTop(),
                    u = e("html").outerHeight(!0),
                    p = l.parents().filter(":hidden");
                return p.each((function() {
                    var t = e(this);
                    t.data("style-cache", t.attr("style"))
                })), p.css("display", "block"), a.byRow && !a.target && (l.each((function() {
                    var t = e(this),
                        i = t.css("display");
                    "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block"),
                    t.data("style-cache", t.attr("style")),
                    t.css({
                        display: i,
                        "padding-top": "0",
                        "padding-bottom": "0",
                        "margin-top": "0",
                        "margin-bottom": "0",
                        "border-top-width": "0",
                        "border-bottom-width": "0",
                        height: "100px",
                        overflow: "hidden"
                    })
                })), c = r(l), l.each((function() {
                    var t = e(this);
                    t.attr("style", t.data("style-cache") || "")
                }))), e.each(c, (function(t, i) {
                    var r = e(i),
                        s = 0;
                    if (a.target)
                        s = a.target.outerHeight(!1);
                    else {
                        if (a.byRow && r.length <= 1)
                            return void r.css(a.property, "");
                        r.each((function() {
                            var t = e(this),
                                i = t.attr("style"),
                                n = t.css("display");
                            "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                            var r = {
                                display: n
                            };
                            r[a.property] = "",
                            t.css(r),
                            t.outerHeight(!1) > s && (s = t.outerHeight(!1)),
                            i ? t.attr("style", i) : t.css("display", "")
                        }))
                    }
                    r.each((function() {
                        var t = e(this),
                            i = 0;
                        a.target && t.is(a.target) || ("border-box" !== t.css("box-sizing") && (i += n(t.css("border-top-width")) + n(t.css("border-bottom-width")), i += n(t.css("padding-top")) + n(t.css("padding-bottom"))), t.css(a.property, s - i + "px"))
                    }))
                })), p.each((function() {
                    var t = e(this);
                    t.attr("style", t.data("style-cache") || null)
                })), o._maintainScroll && e(window).scrollTop(d / u * e("html").outerHeight(!0)), this
            },
            o._applyDataApi = function() {
                var t = {};
                e("[data-match-height], [data-mh]").each((function() {
                    var i = e(this),
                        n = i.attr("data-mh") || i.attr("data-match-height");
                    t[n] = n in t ? t[n].add(i) : i
                })),
                e.each(t, (function() {
                    this.matchHeight(!0)
                }))
            };
            var a = function(t) {
                o._beforeUpdate && o._beforeUpdate(t, o._groups),
                e.each(o._groups, (function() {
                    o._apply(this.elements, this.options)
                })),
                o._afterUpdate && o._afterUpdate(t, o._groups)
            };
            o._update = function(n, r) {
                if (r && "resize" === r.type) {
                    var s = e(window).width();
                    if (s === t)
                        return;
                    t = s
                }
                n ? -1 === i && (i = setTimeout((function() {
                    a(r),
                    i = -1
                }), o._throttle)) : a(r)
            },
            e(o._applyDataApi);
            var l = e.fn.on ? "on" : "bind";
            e(window)[l]("load", (function(e) {
                o._update(!1, e)
            })),
            e(window)[l]("resize orientationchange", (function(e) {
                o._update(!0, e)
            }))
        }) ? n.apply(t, r) : n) || (e.exports = s)
    }()
}, function(e, t, i) {
    var n,
        r,
        s;
    r = [i(0)],
    void 0 === (s = "function" == typeof (n = function(e) {
        "use strict";
        var t = !1,
            i = !1,
            n = 0,
            r = 2e3,
            s = 0,
            o = e,
            a = document,
            l = window,
            c = o(l),
            d = [],
            u = l.requestAnimationFrame || l.webkitRequestAnimationFrame || l.mozRequestAnimationFrame || !1,
            p = l.cancelAnimationFrame || l.webkitCancelAnimationFrame || l.mozCancelAnimationFrame || !1;
        if (u)
            l.cancelAnimationFrame || (p = function(e) {});
        else {
            var h = 0;
            u = function(e, t) {
                var i = (new Date).getTime(),
                    n = Math.max(0, 16 - (i - h)),
                    r = l.setTimeout((function() {
                        e(i + n)
                    }), n);
                return h = i + n, r
            },
            p = function(e) {
                l.clearTimeout(e)
            }
        }
        var f,
            m,
            g,
            v = l.MutationObserver || l.WebKitMutationObserver || !1,
            y = Date.now || function() {
                return (new Date).getTime()
            },
            b = {
                zindex: "auto",
                cursoropacitymin: 0,
                cursoropacitymax: 1,
                cursorcolor: "#424242",
                cursorwidth: "6px",
                cursorborder: "1px solid #fff",
                cursorborderradius: "5px",
                scrollspeed: 40,
                mousescrollstep: 27,
                touchbehavior: !1,
                emulatetouch: !1,
                hwacceleration: !0,
                usetransition: !0,
                boxzoom: !1,
                dblclickzoom: !0,
                gesturezoom: !0,
                grabcursorenabled: !0,
                autohidemode: !0,
                background: "",
                iframeautoresize: !0,
                cursorminheight: 32,
                preservenativescrolling: !0,
                railoffset: !1,
                railhoffset: !1,
                bouncescroll: !0,
                spacebarenabled: !0,
                railpadding: {
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                disableoutline: !0,
                horizrailenabled: !0,
                railalign: "right",
                railvalign: "bottom",
                enabletranslate3d: !0,
                enablemousewheel: !0,
                enablekeyboard: !0,
                smoothscroll: !0,
                sensitiverail: !0,
                enablemouselockapi: !0,
                cursorfixedheight: !1,
                directionlockdeadzone: 6,
                hidecursordelay: 400,
                nativeparentscrolling: !0,
                enablescrollonselection: !0,
                overflowx: !0,
                overflowy: !0,
                cursordragspeed: .3,
                rtlmode: "auto",
                cursordragontouch: !1,
                oneaxismousemode: "auto",
                scriptpath: (m = a.currentScript || !!(f = a.getElementsByTagName("script")).length && f[f.length - 1], g = m ? m.src.split("?")[0] : "", g.split("/").length > 0 ? g.split("/").slice(0, -1).join("/") + "/" : ""),
                preventmultitouchscrolling: !0,
                disablemutationobserver: !1,
                enableobserver: !0,
                scrollbarid: !1
            },
            w = !1,
            x = function(e, h) {
                var f = this;
                this.version = "3.7.6",
                this.name = "nicescroll",
                this.me = h;
                var m = o("body"),
                    g = this.opt = {
                        doc: m,
                        win: !1
                    };
                if (o.extend(g, b), g.snapbackspeed = 80, e)
                    for (var x in g)
                        void 0 !== e[x] && (g[x] = e[x]);
                if (g.disablemutationobserver && (v = !1), this.doc = g.doc, this.iddoc = this.doc && this.doc[0] && this.doc[0].id || "", this.ispage = /^BODY|HTML/.test(g.win ? g.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== g.win, this.win = g.win || (this.ispage ? c : this.doc), this.docscroll = this.ispage && !this.haswrapper ? c : this.win, this.body = m, this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != g.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = {
                    x: 0,
                    y: 0
                }, this.scrollratio = {
                    x: 0,
                    y: 0
                }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == g.rtlmode) {
                    var E = this.win[0] == l ? this.body : this.win,
                        S = E.css("writing-mode") || E.css("-webkit-writing-mode") || E.css("-ms-writing-mode") || E.css("-moz-writing-mode");
                    "horizontal-tb" == S || "lr-tb" == S || "" === S ? (this.isrtlmode = "rtl" == E.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == S || "tb" == S || "tb-rl" == S || "rl-tb" == S, this.isvertical = "vertical-rl" == S || "tb" == S || "tb-rl" == S)
                } else
                    this.isrtlmode = !0 === g.rtlmode,
                    this.isvertical = !1;
                if (this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, this.observerbody = !1, !1 !== g.scrollbarid)
                    this.id = g.scrollbarid;
                else
                    do {
                        this.id = "ascrail" + r++
                    } while (a.getElementById(this.id));
                this.rail = !1,
                this.cursor = !1,
                this.cursorfreezed = !1,
                this.selectiondrag = !1,
                this.zoom = !1,
                this.zoomactive = !1,
                this.hasfocus = !1,
                this.hasmousefocus = !1,
                this.railslocked = !1,
                this.locked = !1,
                this.hidden = !1,
                this.cursoractive = !0,
                this.wheelprevented = !1,
                this.overflowx = g.overflowx,
                this.overflowy = g.overflowy,
                this.nativescrollingarea = !1,
                this.checkarea = 0,
                this.events = [],
                this.saved = {},
                this.delaylist = {},
                this.synclist = {},
                this.lastdeltax = 0,
                this.lastdeltay = 0,
                this.detected = function() {
                    if (w)
                        return w;
                    var e = a.createElement("DIV"),
                        t = e.style,
                        i = navigator.userAgent,
                        n = navigator.platform,
                        r = {};
                    return r.haspointerlock = "pointerLockElement" in a || "webkitPointerLockElement" in a || "mozPointerLockElement" in a, r.isopera = "opera" in l, r.isopera12 = r.isopera && "getUserMedia" in navigator, r.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(l.operamini), r.isie = "all" in a && "attachEvent" in e && !r.isopera, r.isieold = r.isie && !("msInterpolationMode" in t), r.isie7 = r.isie && !r.isieold && (!("documentMode" in a) || 7 === a.documentMode), r.isie8 = r.isie && "documentMode" in a && 8 === a.documentMode, r.isie9 = r.isie && "performance" in l && 9 === a.documentMode, r.isie10 = r.isie && "performance" in l && 10 === a.documentMode, r.isie11 = "msRequestFullscreen" in e && a.documentMode >= 11, r.ismsedge = "msCredentials" in l, r.ismozilla = "MozAppearance" in t, r.iswebkit = !r.ismsedge && "WebkitAppearance" in t, r.ischrome = r.iswebkit && "chrome" in l, r.ischrome38 = r.ischrome && "touchAction" in t, r.ischrome22 = !r.ischrome38 && r.ischrome && r.haspointerlock, r.ischrome26 = !r.ischrome38 && r.ischrome && "transition" in t, r.cantouch = "ontouchstart" in a.documentElement || "ontouchstart" in l, r.hasw3ctouch = !!l.PointerEvent && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), r.hasmstouch = !r.hasw3ctouch && (l.MSPointerEvent || !1), r.ismac = /^mac$/i.test(n), r.isios = r.cantouch && /iphone|ipad|ipod/i.test(n), r.isios4 = r.isios && !("seal" in Object), r.isios7 = r.isios && "webkitHidden" in a, r.isios8 = r.isios && "hidden" in a, r.isios10 = r.isios && l.Proxy, r.isandroid = /android/i.test(i), r.haseventlistener = "addEventListener" in e, r.trstyle = !1, r.hastransform = !1, r.hastranslate3d = !1, r.transitionstyle = !1, r.hastransition = !1, r.transitionend = !1, r.trstyle = "transform", r.hastransform = "transform" in t || function() {
                        for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], i = 0, n = e.length; i < n; i++)
                            if (void 0 !== t[e[i]]) {
                                r.trstyle = e[i];
                                break
                            }
                        r.hastransform = !!r.trstyle
                    }(), r.hastransform && (t[r.trstyle] = "translate3d(1px,2px,3px)", r.hastranslate3d = /translate3d/.test(t[r.trstyle])), r.transitionstyle = "transition", r.prefixstyle = "", r.transitionend = "transitionend", r.hastransition = "transition" in t || function() {
                        r.transitionend = !1;
                        for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], i = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], n = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], s = 0, o = e.length; s < o; s++)
                            if (e[s] in t) {
                                r.transitionstyle = e[s],
                                r.prefixstyle = i[s],
                                r.transitionend = n[s];
                                break
                            }
                        r.ischrome26 && (r.prefixstyle = i[1]),
                        r.hastransition = r.transitionstyle
                    }(), r.cursorgrabvalue = function() {
                        var e = ["grab", "-webkit-grab", "-moz-grab"];
                        (r.ischrome && !r.ischrome38 || r.isie) && (e = []);
                        for (var i = 0, n = e.length; i < n; i++) {
                            var s = e[i];
                            if (t.cursor = s, t.cursor == s)
                                return s
                        }
                        return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"
                    }(), r.hasmousecapture = "setCapture" in e, r.hasMutationObserver = !1 !== v, e = null, w = r, r
                }();
                var C = o.extend({}, this.detected);
                this.canhwscroll = C.hastransform && g.hwacceleration,
                this.ishwscroll = this.canhwscroll && f.haswrapper,
                this.isrtlmode ? this.isvertical ? this.hasreversehr = !(C.iswebkit || C.isie || C.isie11) : this.hasreversehr = !(C.iswebkit || C.isie && !C.isie10 && !C.isie11) : this.hasreversehr = !1,
                this.istouchcapable = !1,
                (C.cantouch || !C.hasw3ctouch && !C.hasmstouch) && (!C.cantouch || C.isios || C.isandroid || !C.iswebkit && !C.ismozilla) || (this.istouchcapable = !0),
                g.enablemouselockapi || (C.hasmousecapture = !1, C.haspointerlock = !1),
                this.debounced = function(e, t, i) {
                    f && (f.delaylist[e] || (f.delaylist[e] = {
                        h: u((function() {
                            f.delaylist[e].fn.call(f),
                            f.delaylist[e] = !1
                        }), i)
                    }, t.call(f)), f.delaylist[e].fn = t)
                },
                this.synched = function(e, t) {
                    f.synclist[e] ? f.synclist[e] = t : (f.synclist[e] = t, u((function() {
                        f && (f.synclist[e] && f.synclist[e].call(f), f.synclist[e] = null)
                    })))
                },
                this.unsynched = function(e) {
                    f.synclist[e] && (f.synclist[e] = !1)
                },
                this.css = function(e, t) {
                    for (var i in t)
                        f.saved.css.push([e, i, e.css(i)]),
                        e.css(i, t[i])
                },
                this.scrollTop = function(e) {
                    return void 0 === e ? f.getScrollTop() : f.setScrollTop(e)
                },
                this.scrollLeft = function(e) {
                    return void 0 === e ? f.getScrollLeft() : f.setScrollLeft(e)
                };
                var k = function(e, t, i, n, r, s, o) {
                    this.st = e,
                    this.ed = t,
                    this.spd = i,
                    this.p1 = n || 0,
                    this.p2 = r || 1,
                    this.p3 = s || 0,
                    this.p4 = o || 1,
                    this.ts = y(),
                    this.df = t - e
                };
                function M() {
                    var e = f.doc.css(C.trstyle);
                    return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/)
                }
                if (k.prototype = {
                    B2: function(e) {
                        return 3 * (1 - e) * (1 - e) * e
                    },
                    B3: function(e) {
                        return 3 * (1 - e) * e * e
                    },
                    B4: function(e) {
                        return e * e * e
                    },
                    getPos: function() {
                        return (y() - this.ts) / this.spd
                    },
                    getNow: function() {
                        var e = (y() - this.ts) / this.spd,
                            t = this.B2(e) + this.B3(e) + this.B4(e);
                        return e >= 1 ? this.ed : this.st + this.df * t | 0
                    },
                    update: function(e, t) {
                        return this.st = this.getNow(), this.ed = e, this.spd = t, this.ts = y(), this.df = this.ed - this.st, this
                    }
                }, this.ishwscroll) {
                    this.doc.translate = {
                        x: 0,
                        y: 0,
                        tx: "0px",
                        ty: "0px"
                    },
                    C.hastranslate3d && C.isios && this.doc.css("-webkit-backface-visibility", "hidden"),
                    this.getScrollTop = function(e) {
                        if (!e) {
                            var t = M();
                            if (t)
                                return 16 == t.length ? -t[13] : -t[5];
                            if (f.timerscroll && f.timerscroll.bz)
                                return f.timerscroll.bz.getNow()
                        }
                        return f.doc.translate.y
                    },
                    this.getScrollLeft = function(e) {
                        if (!e) {
                            var t = M();
                            if (t)
                                return 16 == t.length ? -t[12] : -t[4];
                            if (f.timerscroll && f.timerscroll.bh)
                                return f.timerscroll.bh.getNow()
                        }
                        return f.doc.translate.x
                    },
                    this.notifyScrollEvent = function(e) {
                        var t = a.createEvent("UIEvents");
                        t.initUIEvent("scroll", !1, !1, l, 1),
                        t.niceevent = !0,
                        e.dispatchEvent(t)
                    };
                    var $ = this.isrtlmode ? 1 : -1;
                    C.hastranslate3d && g.enabletranslate3d ? (this.setScrollTop = function(e, t) {
                        f.doc.translate.y = e,
                        f.doc.translate.ty = -1 * e + "px",
                        f.doc.css(C.trstyle, "translate3d(" + f.doc.translate.tx + "," + f.doc.translate.ty + ",0)"),
                        t || f.notifyScrollEvent(f.win[0])
                    }, this.setScrollLeft = function(e, t) {
                        f.doc.translate.x = e,
                        f.doc.translate.tx = e * $ + "px",
                        f.doc.css(C.trstyle, "translate3d(" + f.doc.translate.tx + "," + f.doc.translate.ty + ",0)"),
                        t || f.notifyScrollEvent(f.win[0])
                    }) : (this.setScrollTop = function(e, t) {
                        f.doc.translate.y = e,
                        f.doc.translate.ty = -1 * e + "px",
                        f.doc.css(C.trstyle, "translate(" + f.doc.translate.tx + "," + f.doc.translate.ty + ")"),
                        t || f.notifyScrollEvent(f.win[0])
                    }, this.setScrollLeft = function(e, t) {
                        f.doc.translate.x = e,
                        f.doc.translate.tx = e * $ + "px",
                        f.doc.css(C.trstyle, "translate(" + f.doc.translate.tx + "," + f.doc.translate.ty + ")"),
                        t || f.notifyScrollEvent(f.win[0])
                    })
                } else
                    this.getScrollTop = function() {
                        return f.docscroll.scrollTop()
                    },
                    this.setScrollTop = function(e) {
                        f.docscroll.scrollTop(e)
                    },
                    this.getScrollLeft = function() {
                        return f.hasreversehr ? f.detected.ismozilla ? f.page.maxw - Math.abs(f.docscroll.scrollLeft()) : f.page.maxw - f.docscroll.scrollLeft() : f.docscroll.scrollLeft()
                    },
                    this.setScrollLeft = function(e) {
                        return setTimeout((function() {
                            if (f)
                                return f.hasreversehr && (e = f.detected.ismozilla ? -(f.page.maxw - e) : f.page.maxw - e), f.docscroll.scrollLeft(e)
                        }), 1)
                    };
                this.getTarget = function(e) {
                    return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement)
                },
                this.hasParent = function(e, t) {
                    if (!e)
                        return !1;
                    for (var i = e.target || e.srcElement || e || !1; i && i.id != t;)
                        i = i.parentNode || !1;
                    return !1 !== i
                };
                var z = {
                    thin: 1,
                    medium: 3,
                    thick: 5
                };
                function L(e, t, i) {
                    var n = e.css(t),
                        r = parseFloat(n);
                    if (isNaN(r)) {
                        var s = 3 == (r = z[n] || 0) ? i ? f.win.outerHeight() - f.win.innerHeight() : f.win.outerWidth() - f.win.innerWidth() : 1;
                        return f.isie8 && r && (r += 1), s ? r : 0
                    }
                    return r
                }
                this.getDocumentScrollOffset = function() {
                    return {
                        top: l.pageYOffset || a.documentElement.scrollTop,
                        left: l.pageXOffset || a.documentElement.scrollLeft
                    }
                },
                this.getOffset = function() {
                    if (f.isfixed) {
                        var e = f.win.offset(),
                            t = f.getDocumentScrollOffset();
                        return e.top -= t.top, e.left -= t.left, e
                    }
                    var i = f.win.offset();
                    if (!f.viewport)
                        return i;
                    var n = f.viewport.offset();
                    return {
                        top: i.top - n.top,
                        left: i.left - n.left
                    }
                },
                this.updateScrollBar = function(e) {
                    var t,
                        i;
                    if (f.ishwscroll)
                        f.rail.css({
                            height: f.win.innerHeight() - (g.railpadding.top + g.railpadding.bottom)
                        }),
                        f.railh && f.railh.css({
                            width: f.win.innerWidth() - (g.railpadding.left + g.railpadding.right)
                        });
                    else {
                        var n = f.getOffset();
                        if ((t = {
                            top: n.top,
                            left: n.left - (g.railpadding.left + g.railpadding.right)
                        }).top += L(f.win, "border-top-width", !0), t.left += f.rail.align ? f.win.outerWidth() - L(f.win, "border-right-width") - f.rail.width : L(f.win, "border-left-width"), (i = g.railoffset) && (i.top && (t.top += i.top), i.left && (t.left += i.left)), f.railslocked || f.rail.css({
                            top: t.top,
                            left: t.left,
                            height: (e ? e.h : f.win.innerHeight()) - (g.railpadding.top + g.railpadding.bottom)
                        }), f.zoom && f.zoom.css({
                            top: t.top + 1,
                            left: 1 == f.rail.align ? t.left - 20 : t.left + f.rail.width + 4
                        }), f.railh && !f.railslocked) {
                            t = {
                                top: n.top,
                                left: n.left
                            },
                            (i = g.railhoffset) && (i.top && (t.top += i.top), i.left && (t.left += i.left));
                            var r = f.railh.align ? t.top + L(f.win, "border-top-width", !0) + f.win.innerHeight() - f.railh.height : t.top + L(f.win, "border-top-width", !0),
                                s = t.left + L(f.win, "border-left-width");
                            f.railh.css({
                                top: r - (g.railpadding.top + g.railpadding.bottom),
                                left: s,
                                width: f.railh.width
                            })
                        }
                    }
                },
                this.doRailClick = function(e, t, i) {
                    var n,
                        r,
                        s,
                        o;
                    f.railslocked || (f.cancelEvent(e), "pageY" in e || (e.pageX = e.clientX + a.documentElement.scrollLeft, e.pageY = e.clientY + a.documentElement.scrollTop), t ? (n = i ? f.doScrollLeft : f.doScrollTop, s = i ? (e.pageX - f.railh.offset().left - f.cursorwidth / 2) * f.scrollratio.x : (e.pageY - f.rail.offset().top - f.cursorheight / 2) * f.scrollratio.y, f.unsynched("relativexy"), n(0 | s)) : (n = i ? f.doScrollLeftBy : f.doScrollBy, s = i ? f.scroll.x : f.scroll.y, o = i ? e.pageX - f.railh.offset().left : e.pageY - f.rail.offset().top, r = i ? f.view.w : f.view.h, n(s >= o ? r : -r)))
                },
                f.newscrolly = f.newscrollx = 0,
                f.hasanimationframe = "requestAnimationFrame" in l,
                f.hascancelanimationframe = "cancelAnimationFrame" in l,
                f.hasborderbox = !1,
                this.init = function() {
                    if (f.saved.css = [], C.isoperamini)
                        return !0;
                    if (C.isandroid && !("hidden" in a))
                        return !0;
                    g.emulatetouch = g.emulatetouch || g.touchbehavior,
                    f.hasborderbox = l.getComputedStyle && "border-box" === l.getComputedStyle(a.body)["box-sizing"];
                    var e = {
                        "overflow-y": "hidden"
                    };
                    if ((C.isie11 || C.isie10) && (e["-ms-overflow-style"] = "none"), f.ishwscroll && (this.doc.css(C.transitionstyle, C.prefixstyle + "transform 0ms ease-out"), C.transitionend && f.bind(f.doc, C.transitionend, f.onScrollTransitionEnd, !1)), f.zindex = "auto", f.ispage || "auto" != g.zindex ? f.zindex = g.zindex : f.zindex = function() {
                        var e = f.win;
                        if ("zIndex" in e)
                            return e.zIndex();
                        for (; e.length > 0;) {
                            if (9 == e[0].nodeType)
                                return !1;
                            var t = e.css("zIndex");
                            if (!isNaN(t) && 0 !== t)
                                return parseInt(t);
                            e = e.parent()
                        }
                        return !1
                    }() || "auto", !f.ispage && "auto" != f.zindex && f.zindex > s && (s = f.zindex), f.isie && 0 === f.zindex && "auto" == g.zindex && (f.zindex = "auto"), !f.ispage || !C.isieold) {
                        var r = f.docscroll;
                        f.ispage && (r = f.haswrapper ? f.win : f.doc),
                        f.css(r, e),
                        f.ispage && (C.isie11 || C.isie) && f.css(o("html"), e),
                        !C.isios || f.ispage || f.haswrapper || f.css(m, {
                            "-webkit-overflow-scrolling": "touch"
                        });
                        var d = o(a.createElement("div"));
                        d.css({
                            position: "relative",
                            top: 0,
                            float: "right",
                            width: g.cursorwidth,
                            height: 0,
                            "background-color": g.cursorcolor,
                            border: g.cursorborder,
                            "background-clip": "padding-box",
                            "-webkit-border-radius": g.cursorborderradius,
                            "-moz-border-radius": g.cursorborderradius,
                            "border-radius": g.cursorborderradius
                        }),
                        d.addClass("nicescroll-cursors"),
                        f.cursor = d;
                        var u = o(a.createElement("div"));
                        u.attr("id", f.id),
                        u.addClass("nicescroll-rails nicescroll-rails-vr");
                        var p,
                            h,
                            y = ["left", "right", "top", "bottom"];
                        for (var b in y)
                            h = y[b],
                            (p = g.railpadding[h] || 0) && u.css("padding-" + h, p + "px");
                        u.append(d),
                        u.width = Math.max(parseFloat(g.cursorwidth), d.outerWidth()),
                        u.css({
                            width: u.width + "px",
                            zIndex: f.zindex,
                            background: g.background,
                            cursor: "default"
                        }),
                        u.visibility = !0,
                        u.scrollable = !0,
                        u.align = "left" == g.railalign ? 0 : 1,
                        f.rail = u,
                        f.rail.drag = !1;
                        var w,
                            x = !1;
                        if (!g.boxzoom || f.ispage || C.isieold || (x = a.createElement("div"), f.bind(x, "click", f.doZoom), f.bind(x, "mouseenter", (function() {
                            f.zoom.css("opacity", g.cursoropacitymax)
                        })), f.bind(x, "mouseleave", (function() {
                            f.zoom.css("opacity", g.cursoropacitymin)
                        })), f.zoom = o(x), f.zoom.css({
                            cursor: "pointer",
                            zIndex: f.zindex,
                            backgroundImage: "url(" + g.scriptpath + "zoomico.png)",
                            height: 18,
                            width: 18,
                            backgroundPosition: "0 0"
                        }), g.dblclickzoom && f.bind(f.win, "dblclick", f.doZoom), C.cantouch && g.gesturezoom && (f.ongesturezoom = function(e) {
                            return e.scale > 1.5 && f.doZoomIn(e), e.scale < .8 && f.doZoomOut(e), f.cancelEvent(e)
                        }, f.bind(f.win, "gestureend", f.ongesturezoom))), f.railh = !1, g.horizrailenabled && (f.css(r, {
                            overflowX: "hidden"
                        }), (d = o(a.createElement("div"))).css({
                            position: "absolute",
                            top: 0,
                            height: g.cursorwidth,
                            width: 0,
                            backgroundColor: g.cursorcolor,
                            border: g.cursorborder,
                            backgroundClip: "padding-box",
                            "-webkit-border-radius": g.cursorborderradius,
                            "-moz-border-radius": g.cursorborderradius,
                            "border-radius": g.cursorborderradius
                        }), C.isieold && d.css("overflow", "hidden"), d.addClass("nicescroll-cursors"), f.cursorh = d, (w = o(a.createElement("div"))).attr("id", f.id + "-hr"), w.addClass("nicescroll-rails nicescroll-rails-hr"), w.height = Math.max(parseFloat(g.cursorwidth), d.outerHeight()), w.css({
                            height: w.height + "px",
                            zIndex: f.zindex,
                            background: g.background
                        }), w.append(d), w.visibility = !0, w.scrollable = !0, w.align = "top" == g.railvalign ? 0 : 1, f.railh = w, f.railh.drag = !1), f.ispage)
                            u.css({
                                position: "fixed",
                                top: 0,
                                height: "100%"
                            }),
                            u.css(u.align ? {
                                right: 0
                            } : {
                                left: 0
                            }),
                            f.body.append(u),
                            f.railh && (w.css({
                                position: "fixed",
                                left: 0,
                                width: "100%"
                            }), w.css(w.align ? {
                                bottom: 0
                            } : {
                                top: 0
                            }), f.body.append(w));
                        else {
                            if (f.ishwscroll) {
                                "static" == f.win.css("position") && f.css(f.win, {
                                    position: "relative"
                                });
                                var E = "HTML" == f.win[0].nodeName ? f.body : f.win;
                                o(E).scrollTop(0).scrollLeft(0),
                                f.zoom && (f.zoom.css({
                                    position: "absolute",
                                    top: 1,
                                    right: 0,
                                    "margin-right": u.width + 4
                                }), E.append(f.zoom)),
                                u.css({
                                    position: "absolute",
                                    top: 0
                                }),
                                u.css(u.align ? {
                                    right: 0
                                } : {
                                    left: 0
                                }),
                                E.append(u),
                                w && (w.css({
                                    position: "absolute",
                                    left: 0,
                                    bottom: 0
                                }), w.css(w.align ? {
                                    bottom: 0
                                } : {
                                    top: 0
                                }), E.append(w))
                            } else {
                                f.isfixed = "fixed" == f.win.css("position");
                                var S = f.isfixed ? "fixed" : "absolute";
                                f.isfixed || (f.viewport = f.getViewport(f.win[0])),
                                f.viewport && (f.body = f.viewport, /fixed|absolute/.test(f.viewport.css("position")) || f.css(f.viewport, {
                                    position: "relative"
                                })),
                                u.css({
                                    position: S
                                }),
                                f.zoom && f.zoom.css({
                                    position: S
                                }),
                                f.updateScrollBar(),
                                f.body.append(u),
                                f.zoom && f.body.append(f.zoom),
                                f.railh && (w.css({
                                    position: S
                                }), f.body.append(w))
                            }
                            C.isios && f.css(f.win, {
                                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                                "-webkit-touch-callout": "none"
                            }),
                            g.disableoutline && (C.isie && f.win.attr("hideFocus", "true"), C.iswebkit && f.win.css("outline", "none"))
                        }
                        if (!1 === g.autohidemode ? (f.autohidedom = !1, f.rail.css({
                            opacity: g.cursoropacitymax
                        }), f.railh && f.railh.css({
                            opacity: g.cursoropacitymax
                        })) : !0 === g.autohidemode || "leave" === g.autohidemode ? (f.autohidedom = o().add(f.rail), C.isie8 && (f.autohidedom = f.autohidedom.add(f.cursor)), f.railh && (f.autohidedom = f.autohidedom.add(f.railh)), f.railh && C.isie8 && (f.autohidedom = f.autohidedom.add(f.cursorh))) : "scroll" == g.autohidemode ? (f.autohidedom = o().add(f.rail), f.railh && (f.autohidedom = f.autohidedom.add(f.railh))) : "cursor" == g.autohidemode ? (f.autohidedom = o().add(f.cursor), f.railh && (f.autohidedom = f.autohidedom.add(f.cursorh))) : "hidden" == g.autohidemode && (f.autohidedom = !1, f.hide(), f.railslocked = !1), C.cantouch || f.istouchcapable || g.emulatetouch || C.hasmstouch) {
                            f.scrollmom = new T(f),
                            f.ontouchstart = function(e) {
                                if (f.locked)
                                    return !1;
                                if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE))
                                    return !1;
                                if (f.hasmoving = !1, f.scrollmom.timer && (f.triggerScrollEnd(), f.scrollmom.stop()), !f.railslocked) {
                                    var t = f.getTarget(e);
                                    if (t && /INPUT/i.test(t.nodeName) && /range/i.test(t.type))
                                        return f.stopPropagation(e);
                                    var i = "mousedown" === e.type;
                                    if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), f.forcescreen) {
                                        var n = e;
                                        (e = {
                                            original: e.original ? e.original : e
                                        }).clientX = n.screenX,
                                        e.clientY = n.screenY
                                    }
                                    if (f.rail.drag = {
                                        x: e.clientX,
                                        y: e.clientY,
                                        sx: f.scroll.x,
                                        sy: f.scroll.y,
                                        st: f.getScrollTop(),
                                        sl: f.getScrollLeft(),
                                        pt: 2,
                                        dl: !1,
                                        tg: t
                                    }, f.ispage || !g.directionlockdeadzone)
                                        f.rail.drag.dl = "f";
                                    else {
                                        var r = {
                                                w: c.width(),
                                                h: c.height()
                                            },
                                            s = f.getContentSize(),
                                            a = s.h - r.h,
                                            l = s.w - r.w;
                                        f.rail.scrollable && !f.railh.scrollable ? f.rail.drag.ck = a > 0 && "v" : !f.rail.scrollable && f.railh.scrollable ? f.rail.drag.ck = l > 0 && "h" : f.rail.drag.ck = !1
                                    }
                                    if (g.emulatetouch && f.isiframe && C.isie) {
                                        var d = f.win.position();
                                        f.rail.drag.x += d.left,
                                        f.rail.drag.y += d.top
                                    }
                                    if (f.hasmoving = !1, f.lastmouseup = !1, f.scrollmom.reset(e.clientX, e.clientY), t && i) {
                                        if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(t.nodeName))
                                            return C.hasmousecapture && t.setCapture(), g.emulatetouch ? (t.onclick && !t._onclick && (t._onclick = t.onclick, t.onclick = function(e) {
                                                if (f.hasmoving)
                                                    return !1;
                                                t._onclick.call(this, e)
                                            }), f.cancelEvent(e)) : f.stopPropagation(e);
                                        /SUBMIT|CANCEL|BUTTON/i.test(o(t).attr("type")) && (f.preventclick = {
                                            tg: t,
                                            click: !1
                                        })
                                    }
                                }
                            },
                            f.ontouchend = function(e) {
                                if (!f.rail.drag)
                                    return !0;
                                if (2 == f.rail.drag.pt) {
                                    if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE))
                                        return !1;
                                    f.rail.drag = !1;
                                    var t = "mouseup" === e.type;
                                    if (f.hasmoving && (f.scrollmom.doMomentum(), f.lastmouseup = !0, f.hideCursor(), C.hasmousecapture && a.releaseCapture(), t))
                                        return f.cancelEvent(e)
                                } else if (1 == f.rail.drag.pt)
                                    return f.onmouseup(e)
                            };
                            var k = g.emulatetouch && f.isiframe && !C.hasmousecapture,
                                M = .3 * g.directionlockdeadzone | 0;
                            f.ontouchmove = function(e, t) {
                                if (!f.rail.drag)
                                    return !0;
                                if (e.targetTouches && g.preventmultitouchscrolling && e.targetTouches.length > 1)
                                    return !0;
                                if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE))
                                    return !0;
                                if (2 == f.rail.drag.pt) {
                                    var i,
                                        n;
                                    if ("changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), n = i = 0, k && !t) {
                                        var r = f.win.position();
                                        n = -r.left,
                                        i = -r.top
                                    }
                                    var s = e.clientY + i,
                                        o = s - f.rail.drag.y,
                                        l = e.clientX + n,
                                        c = l - f.rail.drag.x,
                                        d = f.rail.drag.st - o;
                                    if (f.ishwscroll && g.bouncescroll)
                                        d < 0 ? d = Math.round(d / 2) : d > f.page.maxh && (d = f.page.maxh + Math.round((d - f.page.maxh) / 2));
                                    else if (d < 0 ? (d = 0, s = 0) : d > f.page.maxh && (d = f.page.maxh, s = 0), 0 === s && !f.hasmoving)
                                        return f.ispage || (f.rail.drag = !1), !0;
                                    var u = f.getScrollLeft();
                                    if (f.railh && f.railh.scrollable && (u = f.isrtlmode ? c - f.rail.drag.sl : f.rail.drag.sl - c, f.ishwscroll && g.bouncescroll ? u < 0 ? u = Math.round(u / 2) : u > f.page.maxw && (u = f.page.maxw + Math.round((u - f.page.maxw) / 2)) : (u < 0 && (u = 0, l = 0), u > f.page.maxw && (u = f.page.maxw, l = 0))), !f.hasmoving) {
                                        if (f.rail.drag.y === e.clientY && f.rail.drag.x === e.clientX)
                                            return f.cancelEvent(e);
                                        var p = Math.abs(o),
                                            h = Math.abs(c),
                                            m = g.directionlockdeadzone;
                                        if (f.rail.drag.ck ? "v" == f.rail.drag.ck ? h > m && p <= M ? f.rail.drag = !1 : p > m && (f.rail.drag.dl = "v") : "h" == f.rail.drag.ck && (p > m && h <= M ? f.rail.drag = !1 : h > m && (f.rail.drag.dl = "h")) : p > m && h > m ? f.rail.drag.dl = "f" : p > m ? f.rail.drag.dl = h > M ? "f" : "v" : h > m && (f.rail.drag.dl = p > M ? "f" : "h"), !f.rail.drag.dl)
                                            return f.cancelEvent(e);
                                        f.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                                        f.hasmoving = !0
                                    }
                                    return f.preventclick && !f.preventclick.click && (f.preventclick.click = f.preventclick.tg.onclick || !1, f.preventclick.tg.onclick = f.onpreventclick), f.rail.drag.dl && ("v" == f.rail.drag.dl ? u = f.rail.drag.sl : "h" == f.rail.drag.dl && (d = f.rail.drag.st)), f.synched("touchmove", (function() {
                                        f.rail.drag && 2 == f.rail.drag.pt && (f.prepareTransition && f.resetTransition(), f.rail.scrollable && f.setScrollTop(d), f.scrollmom.update(l, s), f.railh && f.railh.scrollable ? (f.setScrollLeft(u), f.showCursor(d, u)) : f.showCursor(d), C.isie10 && a.selection.clear())
                                    })), f.cancelEvent(e)
                                }
                                return 1 == f.rail.drag.pt ? f.onmousemove(e) : void 0
                            },
                            f.ontouchstartCursor = function(e, t) {
                                if (!f.rail.drag || 3 == f.rail.drag.pt) {
                                    if (f.locked)
                                        return f.cancelEvent(e);
                                    f.cancelScroll(),
                                    f.rail.drag = {
                                        x: e.touches[0].clientX,
                                        y: e.touches[0].clientY,
                                        sx: f.scroll.x,
                                        sy: f.scroll.y,
                                        pt: 3,
                                        hr: !!t
                                    };
                                    var i = f.getTarget(e);
                                    return !f.ispage && C.hasmousecapture && i.setCapture(), f.isiframe && !C.hasmousecapture && (f.saved.csspointerevents = f.doc.css("pointer-events"), f.css(f.doc, {
                                        "pointer-events": "none"
                                    })), f.cancelEvent(e)
                                }
                            },
                            f.ontouchendCursor = function(e) {
                                if (f.rail.drag) {
                                    if (C.hasmousecapture && a.releaseCapture(), f.isiframe && !C.hasmousecapture && f.doc.css("pointer-events", f.saved.csspointerevents), 3 != f.rail.drag.pt)
                                        return;
                                    return f.rail.drag = !1, f.cancelEvent(e)
                                }
                            },
                            f.ontouchmoveCursor = function(e) {
                                if (f.rail.drag) {
                                    if (3 != f.rail.drag.pt)
                                        return;
                                    if (f.cursorfreezed = !0, f.rail.drag.hr) {
                                        f.scroll.x = f.rail.drag.sx + (e.touches[0].clientX - f.rail.drag.x),
                                        f.scroll.x < 0 && (f.scroll.x = 0);
                                        var t = f.scrollvaluemaxw;
                                        f.scroll.x > t && (f.scroll.x = t)
                                    } else {
                                        f.scroll.y = f.rail.drag.sy + (e.touches[0].clientY - f.rail.drag.y),
                                        f.scroll.y < 0 && (f.scroll.y = 0);
                                        var i = f.scrollvaluemax;
                                        f.scroll.y > i && (f.scroll.y = i)
                                    }
                                    return f.synched("touchmove", (function() {
                                        f.rail.drag && 3 == f.rail.drag.pt && (f.showCursor(), f.rail.drag.hr ? f.doScrollLeft(Math.round(f.scroll.x * f.scrollratio.x), g.cursordragspeed) : f.doScrollTop(Math.round(f.scroll.y * f.scrollratio.y), g.cursordragspeed))
                                    })), f.cancelEvent(e)
                                }
                            }
                        }
                        if (f.onmousedown = function(e, t) {
                            if (!f.rail.drag || 1 == f.rail.drag.pt) {
                                if (f.railslocked)
                                    return f.cancelEvent(e);
                                f.cancelScroll(),
                                f.rail.drag = {
                                    x: e.clientX,
                                    y: e.clientY,
                                    sx: f.scroll.x,
                                    sy: f.scroll.y,
                                    pt: 1,
                                    hr: t || !1
                                };
                                var i = f.getTarget(e);
                                return C.hasmousecapture && i.setCapture(), f.isiframe && !C.hasmousecapture && (f.saved.csspointerevents = f.doc.css("pointer-events"), f.css(f.doc, {
                                    "pointer-events": "none"
                                })), f.hasmoving = !1, f.cancelEvent(e)
                            }
                        }, f.onmouseup = function(e) {
                            if (f.rail.drag)
                                return 1 != f.rail.drag.pt || (C.hasmousecapture && a.releaseCapture(), f.isiframe && !C.hasmousecapture && f.doc.css("pointer-events", f.saved.csspointerevents), f.rail.drag = !1, f.cursorfreezed = !1, f.hasmoving && f.triggerScrollEnd(), f.cancelEvent(e))
                        }, f.onmousemove = function(e) {
                            if (f.rail.drag) {
                                if (1 !== f.rail.drag.pt)
                                    return;
                                if (C.ischrome && 0 === e.which)
                                    return f.onmouseup(e);
                                if (f.cursorfreezed = !0, f.hasmoving || f.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), f.hasmoving = !0, f.rail.drag.hr) {
                                    f.scroll.x = f.rail.drag.sx + (e.clientX - f.rail.drag.x),
                                    f.scroll.x < 0 && (f.scroll.x = 0);
                                    var t = f.scrollvaluemaxw;
                                    f.scroll.x > t && (f.scroll.x = t)
                                } else {
                                    f.scroll.y = f.rail.drag.sy + (e.clientY - f.rail.drag.y),
                                    f.scroll.y < 0 && (f.scroll.y = 0);
                                    var i = f.scrollvaluemax;
                                    f.scroll.y > i && (f.scroll.y = i)
                                }
                                return f.synched("mousemove", (function() {
                                    f.cursorfreezed && (f.showCursor(), f.rail.drag.hr ? f.scrollLeft(Math.round(f.scroll.x * f.scrollratio.x)) : f.scrollTop(Math.round(f.scroll.y * f.scrollratio.y)))
                                })), f.cancelEvent(e)
                            }
                            f.checkarea = 0
                        }, C.cantouch || g.emulatetouch)
                            f.onpreventclick = function(e) {
                                if (f.preventclick)
                                    return f.preventclick.tg.onclick = f.preventclick.click, f.preventclick = !1, f.cancelEvent(e)
                            },
                            f.onclick = !C.isios && function(e) {
                                return !f.lastmouseup || (f.lastmouseup = !1, f.cancelEvent(e))
                            },
                            g.grabcursorenabled && C.cursorgrabvalue && (f.css(f.ispage ? f.doc : f.win, {
                                cursor: C.cursorgrabvalue
                            }), f.css(f.rail, {
                                cursor: C.cursorgrabvalue
                            }));
                        else {
                            var $ = function(e) {
                                if (f.selectiondrag) {
                                    if (e) {
                                        var t = f.win.outerHeight(),
                                            i = e.pageY - f.selectiondrag.top;
                                        i > 0 && i < t && (i = 0),
                                        i >= t && (i -= t),
                                        f.selectiondrag.df = i
                                    }
                                    if (0 !== f.selectiondrag.df) {
                                        var n = -2 * f.selectiondrag.df / 6 | 0;
                                        f.doScrollBy(n),
                                        f.debounced("doselectionscroll", (function() {
                                            $()
                                        }), 50)
                                    }
                                }
                            };
                            f.hasTextSelected = "getSelection" in a ? function() {
                                return a.getSelection().rangeCount > 0
                            } : "selection" in a ? function() {
                                return "None" != a.selection.type
                            } : function() {
                                return !1
                            },
                            f.onselectionstart = function(e) {
                                f.ispage || (f.selectiondrag = f.win.offset())
                            },
                            f.onselectionend = function(e) {
                                f.selectiondrag = !1
                            },
                            f.onselectiondrag = function(e) {
                                f.selectiondrag && f.hasTextSelected() && f.debounced("selectionscroll", (function() {
                                    $(e)
                                }), 250)
                            }
                        }
                        if (C.hasw3ctouch ? (f.css(f.ispage ? o("html") : f.win, {
                            "touch-action": "none"
                        }), f.css(f.rail, {
                            "touch-action": "none"
                        }), f.css(f.cursor, {
                            "touch-action": "none"
                        }), f.bind(f.win, "pointerdown", f.ontouchstart), f.bind(a, "pointerup", f.ontouchend), f.delegate(a, "pointermove", f.ontouchmove)) : C.hasmstouch ? (f.css(f.ispage ? o("html") : f.win, {
                            "-ms-touch-action": "none"
                        }), f.css(f.rail, {
                            "-ms-touch-action": "none"
                        }), f.css(f.cursor, {
                            "-ms-touch-action": "none"
                        }), f.bind(f.win, "MSPointerDown", f.ontouchstart), f.bind(a, "MSPointerUp", f.ontouchend), f.delegate(a, "MSPointerMove", f.ontouchmove), f.bind(f.cursor, "MSGestureHold", (function(e) {
                            e.preventDefault()
                        })), f.bind(f.cursor, "contextmenu", (function(e) {
                            e.preventDefault()
                        }))) : C.cantouch && (f.bind(f.win, "touchstart", f.ontouchstart, !1, !0), f.bind(a, "touchend", f.ontouchend, !1, !0), f.bind(a, "touchcancel", f.ontouchend, !1, !0), f.delegate(a, "touchmove", f.ontouchmove, !1, !0)), g.emulatetouch && (f.bind(f.win, "mousedown", f.ontouchstart, !1, !0), f.bind(a, "mouseup", f.ontouchend, !1, !0), f.bind(a, "mousemove", f.ontouchmove, !1, !0)), (g.cursordragontouch || !C.cantouch && !g.emulatetouch) && (f.rail.css({
                            cursor: "default"
                        }), f.railh && f.railh.css({
                            cursor: "default"
                        }), f.jqbind(f.rail, "mouseenter", (function() {
                            if (!f.ispage && !f.win.is(":visible"))
                                return !1;
                            f.canshowonmouseevent && f.showCursor(),
                            f.rail.active = !0
                        })), f.jqbind(f.rail, "mouseleave", (function() {
                            f.rail.active = !1,
                            f.rail.drag || f.hideCursor()
                        })), g.sensitiverail && (f.bind(f.rail, "click", (function(e) {
                            f.doRailClick(e, !1, !1)
                        })), f.bind(f.rail, "dblclick", (function(e) {
                            f.doRailClick(e, !0, !1)
                        })), f.bind(f.cursor, "click", (function(e) {
                            f.cancelEvent(e)
                        })), f.bind(f.cursor, "dblclick", (function(e) {
                            f.cancelEvent(e)
                        }))), f.railh && (f.jqbind(f.railh, "mouseenter", (function() {
                            if (!f.ispage && !f.win.is(":visible"))
                                return !1;
                            f.canshowonmouseevent && f.showCursor(),
                            f.rail.active = !0
                        })), f.jqbind(f.railh, "mouseleave", (function() {
                            f.rail.active = !1,
                            f.rail.drag || f.hideCursor()
                        })), g.sensitiverail && (f.bind(f.railh, "click", (function(e) {
                            f.doRailClick(e, !1, !0)
                        })), f.bind(f.railh, "dblclick", (function(e) {
                            f.doRailClick(e, !0, !0)
                        })), f.bind(f.cursorh, "click", (function(e) {
                            f.cancelEvent(e)
                        })), f.bind(f.cursorh, "dblclick", (function(e) {
                            f.cancelEvent(e)
                        }))))), g.cursordragontouch && (this.istouchcapable || C.cantouch) && (f.bind(f.cursor, "touchstart", f.ontouchstartCursor), f.bind(f.cursor, "touchmove", f.ontouchmoveCursor), f.bind(f.cursor, "touchend", f.ontouchendCursor), f.cursorh && f.bind(f.cursorh, "touchstart", (function(e) {
                            f.ontouchstartCursor(e, !0)
                        })), f.cursorh && f.bind(f.cursorh, "touchmove", f.ontouchmoveCursor), f.cursorh && f.bind(f.cursorh, "touchend", f.ontouchendCursor)), g.emulatetouch || C.isandroid || C.isios ? (f.bind(C.hasmousecapture ? f.win : a, "mouseup", f.ontouchend), f.onclick && f.bind(a, "click", f.onclick), g.cursordragontouch ? (f.bind(f.cursor, "mousedown", f.onmousedown), f.bind(f.cursor, "mouseup", f.onmouseup), f.cursorh && f.bind(f.cursorh, "mousedown", (function(e) {
                            f.onmousedown(e, !0)
                        })), f.cursorh && f.bind(f.cursorh, "mouseup", f.onmouseup)) : (f.bind(f.rail, "mousedown", (function(e) {
                            e.preventDefault()
                        })), f.railh && f.bind(f.railh, "mousedown", (function(e) {
                            e.preventDefault()
                        })))) : (f.bind(C.hasmousecapture ? f.win : a, "mouseup", f.onmouseup), f.bind(a, "mousemove", f.onmousemove), f.onclick && f.bind(a, "click", f.onclick), f.bind(f.cursor, "mousedown", f.onmousedown), f.bind(f.cursor, "mouseup", f.onmouseup), f.railh && (f.bind(f.cursorh, "mousedown", (function(e) {
                            f.onmousedown(e, !0)
                        })), f.bind(f.cursorh, "mouseup", f.onmouseup)), !f.ispage && g.enablescrollonselection && (f.bind(f.win[0], "mousedown", f.onselectionstart), f.bind(a, "mouseup", f.onselectionend), f.bind(f.cursor, "mouseup", f.onselectionend), f.cursorh && f.bind(f.cursorh, "mouseup", f.onselectionend), f.bind(a, "mousemove", f.onselectiondrag)), f.zoom && (f.jqbind(f.zoom, "mouseenter", (function() {
                            f.canshowonmouseevent && f.showCursor(),
                            f.rail.active = !0
                        })), f.jqbind(f.zoom, "mouseleave", (function() {
                            f.rail.active = !1,
                            f.rail.drag || f.hideCursor()
                        })))), g.enablemousewheel && (f.isiframe || f.mousewheel(C.isie && f.ispage ? a : f.win, f.onmousewheel), f.mousewheel(f.rail, f.onmousewheel), f.railh && f.mousewheel(f.railh, f.onmousewheelhr)), f.ispage || C.cantouch || /HTML|^BODY/.test(f.win[0].nodeName) || (f.win.attr("tabindex") || f.win.attr({
                            tabindex: ++n
                        }), f.bind(f.win, "focus", (function(e) {
                            t = f.getTarget(e).id || f.getTarget(e) || !1,
                            f.hasfocus = !0,
                            f.canshowonmouseevent && f.noticeCursor()
                        })), f.bind(f.win, "blur", (function(e) {
                            t = !1,
                            f.hasfocus = !1
                        })), f.bind(f.win, "mouseenter", (function(e) {
                            i = f.getTarget(e).id || f.getTarget(e) || !1,
                            f.hasmousefocus = !0,
                            f.canshowonmouseevent && f.noticeCursor()
                        })), f.bind(f.win, "mouseleave", (function(e) {
                            i = !1,
                            f.hasmousefocus = !1,
                            f.rail.drag || f.hideCursor()
                        }))), f.onkeypress = function(e) {
                            if (f.railslocked && 0 === f.page.maxh)
                                return !0;
                            e = e || l.event;
                            var n = f.getTarget(e);
                            if (n && /INPUT|TEXTAREA|SELECT|OPTION/.test(n.nodeName) && (!n.getAttribute("type") && !n.type || !/submit|button|cancel/i.tp))
                                return !0;
                            if (o(n).attr("contenteditable"))
                                return !0;
                            if (f.hasfocus || f.hasmousefocus && !t || f.ispage && !t && !i) {
                                var r = e.keyCode;
                                if (f.railslocked && 27 != r)
                                    return f.cancelEvent(e);
                                var s = e.ctrlKey || !1,
                                    a = e.shiftKey || !1,
                                    c = !1;
                                switch (r) {
                                case 38:
                                case 63233:
                                    f.doScrollBy(72),
                                    c = !0;
                                    break;
                                case 40:
                                case 63235:
                                    f.doScrollBy(-72),
                                    c = !0;
                                    break;
                                case 37:
                                case 63232:
                                    f.railh && (s ? f.doScrollLeft(0) : f.doScrollLeftBy(72), c = !0);
                                    break;
                                case 39:
                                case 63234:
                                    f.railh && (s ? f.doScrollLeft(f.page.maxw) : f.doScrollLeftBy(-72), c = !0);
                                    break;
                                case 33:
                                case 63276:
                                    f.doScrollBy(f.view.h),
                                    c = !0;
                                    break;
                                case 34:
                                case 63277:
                                    f.doScrollBy(-f.view.h),
                                    c = !0;
                                    break;
                                case 36:
                                case 63273:
                                    f.railh && s ? f.doScrollPos(0, 0) : f.doScrollTo(0),
                                    c = !0;
                                    break;
                                case 35:
                                case 63275:
                                    f.railh && s ? f.doScrollPos(f.page.maxw, f.page.maxh) : f.doScrollTo(f.page.maxh),
                                    c = !0;
                                    break;
                                case 32:
                                    g.spacebarenabled && (a ? f.doScrollBy(f.view.h) : f.doScrollBy(-f.view.h), c = !0);
                                    break;
                                case 27:
                                    f.zoomactive && (f.doZoom(), c = !0)
                                }
                                if (c)
                                    return f.cancelEvent(e)
                            }
                        }, g.enablekeyboard && f.bind(a, C.isopera && !C.isopera12 ? "keypress" : "keydown", f.onkeypress), f.bind(a, "keydown", (function(e) {
                            e.ctrlKey && (f.wheelprevented = !0)
                        })), f.bind(a, "keyup", (function(e) {
                            e.ctrlKey || (f.wheelprevented = !1)
                        })), f.bind(l, "blur", (function(e) {
                            f.wheelprevented = !1
                        })), f.bind(l, "resize", f.onscreenresize), f.bind(l, "orientationchange", f.onscreenresize), f.bind(l, "load", f.lazyResize), C.ischrome && !f.ispage && !f.haswrapper) {
                            var z = f.win.attr("style"),
                                L = parseFloat(f.win.css("width")) + 1;
                            f.win.css("width", L),
                            f.synched("chromefix", (function() {
                                f.win.attr("style", z)
                            }))
                        }
                        if (f.onAttributeChange = function(e) {
                            f.lazyResize(f.isieold ? 250 : 30)
                        }, g.enableobserver && (f.isie11 || !1 === v || (f.observerbody = new v((function(e) {
                            if (e.forEach((function(e) {
                                if ("attributes" == e.type)
                                    return m.hasClass("modal-open") && m.hasClass("modal-dialog") && !o.contains(o(".modal-dialog")[0], f.doc[0]) ? f.hide() : f.show()
                            })), f.me.clientWidth != f.page.width || f.me.clientHeight != f.page.height)
                                return f.lazyResize(30)
                        })), f.observerbody.observe(a.body, {
                            childList: !0,
                            subtree: !0,
                            characterData: !1,
                            attributes: !0,
                            attributeFilter: ["class"]
                        })), !f.ispage && !f.haswrapper)) {
                            var P = f.win[0];
                            !1 !== v ? (f.observer = new v((function(e) {
                                e.forEach(f.onAttributeChange)
                            })), f.observer.observe(P, {
                                childList: !0,
                                characterData: !1,
                                attributes: !0,
                                subtree: !1
                            }), f.observerremover = new v((function(e) {
                                e.forEach((function(e) {
                                    if (e.removedNodes.length > 0)
                                        for (var t in e.removedNodes)
                                            if (f && e.removedNodes[t] === P)
                                                return f.remove()
                                }))
                            })), f.observerremover.observe(P.parentNode, {
                                childList: !0,
                                characterData: !1,
                                attributes: !1,
                                subtree: !1
                            })) : (f.bind(P, C.isie && !C.isie9 ? "propertychange" : "DOMAttrModified", f.onAttributeChange), C.isie9 && P.attachEvent("onpropertychange", f.onAttributeChange), f.bind(P, "DOMNodeRemoved", (function(e) {
                                e.target === P && f.remove()
                            })))
                        }
                        !f.ispage && g.boxzoom && f.bind(l, "resize", f.resizeZoom),
                        f.istextarea && (f.bind(f.win, "keydown", f.lazyResize), f.bind(f.win, "mouseup", f.lazyResize)),
                        f.lazyResize(30)
                    }
                    if ("IFRAME" == this.doc[0].nodeName) {
                        var A = function() {
                            var t;
                            f.iframexd = !1;
                            try {
                                (t = "contentDocument" in this ? this.contentDocument : this.contentWindow._doc).domain
                            } catch (e) {
                                f.iframexd = !0,
                                t = !1
                            }
                            if (f.iframexd)
                                return "console" in l && console.log("NiceScroll error: policy restriced iframe"), !0;
                            if (f.forcescreen = !0, f.isiframe && (f.iframe = {
                                doc: o(t),
                                html: f.doc.contents().find("html")[0],
                                body: f.doc.contents().find("body")[0]
                            }, f.getContentSize = function() {
                                return {
                                    w: Math.max(f.iframe.html.scrollWidth, f.iframe.body.scrollWidth),
                                    h: Math.max(f.iframe.html.scrollHeight, f.iframe.body.scrollHeight)
                                }
                            }, f.docscroll = o(f.iframe.body)), !C.isios && g.iframeautoresize && !f.isiframe) {
                                f.win.scrollTop(0),
                                f.doc.height("");
                                var i = Math.max(t.getElementsByTagName("html")[0].scrollHeight, t.body.scrollHeight);
                                f.doc.height(i)
                            }
                            f.lazyResize(30),
                            f.css(o(f.iframe.body), e),
                            C.isios && f.haswrapper && f.css(o(t.body), {
                                "-webkit-transform": "translate3d(0,0,0)"
                            }),
                            "contentWindow" in this ? f.bind(this.contentWindow, "scroll", f.onscroll) : f.bind(t, "scroll", f.onscroll),
                            g.enablemousewheel && f.mousewheel(t, f.onmousewheel),
                            g.enablekeyboard && f.bind(t, C.isopera ? "keypress" : "keydown", f.onkeypress),
                            C.cantouch ? (f.bind(t, "touchstart", f.ontouchstart), f.bind(t, "touchmove", f.ontouchmove)) : g.emulatetouch && (f.bind(t, "mousedown", f.ontouchstart), f.bind(t, "mousemove", (function(e) {
                                return f.ontouchmove(e, !0)
                            })), g.grabcursorenabled && C.cursorgrabvalue && f.css(o(t.body), {
                                cursor: C.cursorgrabvalue
                            })),
                            f.bind(t, "mouseup", f.ontouchend),
                            f.zoom && (g.dblclickzoom && f.bind(t, "dblclick", f.doZoom), f.ongesturezoom && f.bind(t, "gestureend", f.ongesturezoom))
                        };
                        this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout((function() {
                            A.call(f.doc[0], !1)
                        }), 500),
                        f.bind(this.doc, "load", A)
                    }
                },
                this.showCursor = function(e, t) {
                    if (f.cursortimeout && (clearTimeout(f.cursortimeout), f.cursortimeout = 0), f.rail) {
                        if (f.autohidedom && (f.autohidedom.stop().css({
                            opacity: g.cursoropacitymax
                        }), f.cursoractive = !0), f.rail.drag && 1 == f.rail.drag.pt || (void 0 !== e && !1 !== e && (f.scroll.y = e / f.scrollratio.y | 0), void 0 !== t && (f.scroll.x = t / f.scrollratio.x | 0)), f.cursor.css({
                            height: f.cursorheight,
                            top: f.scroll.y
                        }), f.cursorh) {
                            var i = f.hasreversehr ? f.scrollvaluemaxw - f.scroll.x : f.scroll.x;
                            f.cursorh.css({
                                width: f.cursorwidth,
                                left: !f.rail.align && f.rail.visibility ? i + f.rail.width : i
                            }),
                            f.cursoractive = !0
                        }
                        f.zoom && f.zoom.stop().css({
                            opacity: g.cursoropacitymax
                        })
                    }
                },
                this.hideCursor = function(e) {
                    f.cursortimeout || f.rail && f.autohidedom && (f.hasmousefocus && "leave" === g.autohidemode || (f.cursortimeout = setTimeout((function() {
                        f.rail.active && f.showonmouseevent || (f.autohidedom.stop().animate({
                            opacity: g.cursoropacitymin
                        }), f.zoom && f.zoom.stop().animate({
                            opacity: g.cursoropacitymin
                        }), f.cursoractive = !1),
                        f.cursortimeout = 0
                    }), e || g.hidecursordelay)))
                },
                this.noticeCursor = function(e, t, i) {
                    f.showCursor(t, i),
                    f.rail.active || f.hideCursor(e)
                },
                this.getContentSize = f.ispage ? function() {
                    return {
                        w: Math.max(a.body.scrollWidth, a.documentElement.scrollWidth),
                        h: Math.max(a.body.scrollHeight, a.documentElement.scrollHeight)
                    }
                } : f.haswrapper ? function() {
                    return {
                        w: f.doc[0].offsetWidth,
                        h: f.doc[0].offsetHeight
                    }
                } : function() {
                    return {
                        w: f.docscroll[0].scrollWidth,
                        h: f.docscroll[0].scrollHeight
                    }
                },
                this.onResize = function(e, t) {
                    if (!f || !f.win)
                        return !1;
                    var i = f.page.maxh,
                        n = f.page.maxw,
                        r = f.view.h,
                        s = f.view.w;
                    if (f.view = {
                        w: f.ispage ? f.win.width() : f.win[0].clientWidth,
                        h: f.ispage ? f.win.height() : f.win[0].clientHeight
                    }, f.page = t || f.getContentSize(), f.page.maxh = Math.max(0, f.page.h - f.view.h), f.page.maxw = Math.max(0, f.page.w - f.view.w), f.page.maxh == i && f.page.maxw == n && f.view.w == s && f.view.h == r) {
                        if (f.ispage)
                            return f;
                        var o = f.win.offset();
                        if (f.lastposition) {
                            var a = f.lastposition;
                            if (a.top == o.top && a.left == o.left)
                                return f
                        }
                        f.lastposition = o
                    }
                    return 0 === f.page.maxh ? (f.hideRail(), f.scrollvaluemax = 0, f.scroll.y = 0, f.scrollratio.y = 0, f.cursorheight = 0, f.setScrollTop(0), f.rail && (f.rail.scrollable = !1)) : (f.page.maxh -= g.railpadding.top + g.railpadding.bottom, f.rail.scrollable = !0), 0 === f.page.maxw ? (f.hideRailHr(), f.scrollvaluemaxw = 0, f.scroll.x = 0, f.scrollratio.x = 0, f.cursorwidth = 0, f.setScrollLeft(0), f.railh && (f.railh.scrollable = !1)) : (f.page.maxw -= g.railpadding.left + g.railpadding.right, f.railh && (f.railh.scrollable = g.horizrailenabled)), f.railslocked = f.locked || 0 === f.page.maxh && 0 === f.page.maxw, f.railslocked ? (f.ispage || f.updateScrollBar(f.view), !1) : (f.hidden || (f.rail.visibility || f.showRail(), f.railh && !f.railh.visibility && f.showRailHr()), f.istextarea && f.win.css("resize") && "none" != f.win.css("resize") && (f.view.h -= 20), f.cursorheight = Math.min(f.view.h, Math.round(f.view.h * (f.view.h / f.page.h))), f.cursorheight = g.cursorfixedheight ? g.cursorfixedheight : Math.max(g.cursorminheight, f.cursorheight), f.cursorwidth = Math.min(f.view.w, Math.round(f.view.w * (f.view.w / f.page.w))), f.cursorwidth = g.cursorfixedheight ? g.cursorfixedheight : Math.max(g.cursorminheight, f.cursorwidth), f.scrollvaluemax = f.view.h - f.cursorheight - (g.railpadding.top + g.railpadding.bottom), f.hasborderbox || (f.scrollvaluemax -= f.cursor[0].offsetHeight - f.cursor[0].clientHeight), f.railh && (f.railh.width = f.page.maxh > 0 ? f.view.w - f.rail.width : f.view.w, f.scrollvaluemaxw = f.railh.width - f.cursorwidth - (g.railpadding.left + g.railpadding.right)), f.ispage || f.updateScrollBar(f.view), f.scrollratio = {
                        x: f.page.maxw / f.scrollvaluemaxw,
                        y: f.page.maxh / f.scrollvaluemax
                    }, f.getScrollTop() > f.page.maxh ? f.doScrollTop(f.page.maxh) : (f.scroll.y = f.getScrollTop() / f.scrollratio.y | 0, f.scroll.x = f.getScrollLeft() / f.scrollratio.x | 0, f.cursoractive && f.noticeCursor()), f.scroll.y && 0 === f.getScrollTop() && f.doScrollTo(f.scroll.y * f.scrollratio.y | 0), f)
                },
                this.resize = f.onResize;
                var P = 0;
                function A(e, t, i, n) {
                    f._bind(e, t, (function(n) {
                        var r = {
                            original: n = n || l.event,
                            target: n.target || n.srcElement,
                            type: "wheel",
                            deltaMode: "MozMousePixelScroll" == n.type ? 0 : 1,
                            deltaX: 0,
                            deltaZ: 0,
                            preventDefault: function() {
                                return n.preventDefault ? n.preventDefault() : n.returnValue = !1, !1
                            },
                            stopImmediatePropagation: function() {
                                n.stopImmediatePropagation ? n.stopImmediatePropagation() : n.cancelBubble = !0
                            }
                        };
                        return "mousewheel" == t ? (n.wheelDeltaX && (r.deltaX = -1 / 40 * n.wheelDeltaX), n.wheelDeltaY && (r.deltaY = -1 / 40 * n.wheelDeltaY), !r.deltaY && !r.deltaX && (r.deltaY = -1 / 40 * n.wheelDelta)) : r.deltaY = n.detail, i.call(e, r)
                    }), n)
                }
                this.onscreenresize = function(e) {
                    clearTimeout(P);
                    var t = !f.ispage && !f.haswrapper;
                    t && f.hideRails(),
                    P = setTimeout((function() {
                        f && (t && f.showRails(), f.resize()),
                        P = 0
                    }), 120)
                },
                this.lazyResize = function(e) {
                    return clearTimeout(P), e = isNaN(e) ? 240 : e, P = setTimeout((function() {
                        f && f.resize(),
                        P = 0
                    }), e), f
                },
                this.jqbind = function(e, t, i) {
                    f.events.push({
                        e: e,
                        n: t,
                        f: i,
                        q: !0
                    }),
                    o(e).on(t, i)
                },
                this.mousewheel = function(e, t, i) {
                    var n = "jquery" in e ? e[0] : e;
                    if ("onwheel" in a.createElement("div"))
                        f._bind(n, "wheel", t, i || !1);
                    else {
                        var r = void 0 !== a.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                        A(n, r, t, i || !1),
                        "DOMMouseScroll" == r && A(n, "MozMousePixelScroll", t, i || !1)
                    }
                };
                var D = !1;
                if (C.haseventlistener) {
                    try {
                        var I = Object.defineProperty({}, "passive", {
                            get: function() {
                                D = !0
                            }
                        });
                        l.addEventListener("test", null, I)
                    } catch (e) {}
                    this.stopPropagation = function(e) {
                        return !!e && ((e = e.original ? e.original : e).stopPropagation(), !1)
                    },
                    this.cancelEvent = function(e) {
                        return e.cancelable && e.preventDefault(), e.stopImmediatePropagation(), e.preventManipulation && e.preventManipulation(), !1
                    }
                } else
                    Event.prototype.preventDefault = function() {
                        this.returnValue = !1
                    },
                    Event.prototype.stopPropagation = function() {
                        this.cancelBubble = !0
                    },
                    l.constructor.prototype.addEventListener = a.constructor.prototype.addEventListener = Element.prototype.addEventListener = function(e, t, i) {
                        this.attachEvent("on" + e, t)
                    },
                    l.constructor.prototype.removeEventListener = a.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function(e, t, i) {
                        this.detachEvent("on" + e, t)
                    },
                    this.cancelEvent = function(e) {
                        return (e = e || l.event) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1), !1
                    },
                    this.stopPropagation = function(e) {
                        return (e = e || l.event) && (e.cancelBubble = !0), !1
                    };
                this.delegate = function(e, t, i, n, r) {
                    var s = d[t] || !1;
                    s || (s = {
                        a: [],
                        l: [],
                        f: function(e) {
                            for (var t = s.l, i = !1, n = t.length - 1; n >= 0; n--)
                                if (!1 === (i = t[n].call(e.target, e)))
                                    return !1;
                            return i
                        }
                    }, f.bind(e, t, s.f, n, r), d[t] = s),
                    f.ispage ? (s.a = [f.id].concat(s.a), s.l = [i].concat(s.l)) : (s.a.push(f.id), s.l.push(i))
                },
                this.undelegate = function(e, t, i, n, r) {
                    var s = d[t] || !1;
                    if (s && s.l)
                        for (var o = 0, a = s.l.length; o < a; o++)
                            s.a[o] === f.id && (s.a.splice(o), s.l.splice(o), 0 === s.a.length && (f._unbind(e, t, s.l.f), d[t] = null))
                },
                this.bind = function(e, t, i, n, r) {
                    var s = "jquery" in e ? e[0] : e;
                    f._bind(s, t, i, n || !1, r || !1)
                },
                this._bind = function(e, t, i, n, r) {
                    f.events.push({
                        e: e,
                        n: t,
                        f: i,
                        b: n,
                        q: !1
                    }),
                    D && (r || e == window.document || e == window.document.body || e == window) ? e.addEventListener(t, i, {
                        passive: !1,
                        capture: n
                    }) : e.addEventListener(t, i, n || !1)
                },
                this._unbind = function(e, t, i, n) {
                    d[t] ? f.undelegate(e, t, i, n) : e.removeEventListener(t, i, n)
                },
                this.unbindAll = function() {
                    for (var e = 0; e < f.events.length; e++) {
                        var t = f.events[e];
                        t.q ? t.e.unbind(t.n, t.f) : f._unbind(t.e, t.n, t.f, t.b)
                    }
                },
                this.showRails = function() {
                    return f.showRail().showRailHr()
                },
                this.showRail = function() {
                    return 0 === f.page.maxh || !f.ispage && "none" == f.win.css("display") || (f.rail.visibility = !0, f.rail.css("display", "block")), f
                },
                this.showRailHr = function() {
                    return f.railh && (0 === f.page.maxw || !f.ispage && "none" == f.win.css("display") || (f.railh.visibility = !0, f.railh.css("display", "block"))), f
                },
                this.hideRails = function() {
                    return f.hideRail().hideRailHr()
                },
                this.hideRail = function() {
                    return f.rail.visibility = !1, f.rail.css("display", "none"), f
                },
                this.hideRailHr = function() {
                    return f.railh && (f.railh.visibility = !1, f.railh.css("display", "none")), f
                },
                this.show = function() {
                    return f.hidden = !1, f.railslocked = !1, f.showRails()
                },
                this.hide = function() {
                    return f.hidden = !0, f.railslocked = !0, f.hideRails()
                },
                this.toggle = function() {
                    return f.hidden ? f.show() : f.hide()
                },
                this.remove = function() {
                    for (var e in f.stop(), f.cursortimeout && clearTimeout(f.cursortimeout), f.delaylist)
                        f.delaylist[e] && p(f.delaylist[e].h);
                    f.doZoomOut(),
                    f.unbindAll(),
                    C.isie9 && f.win[0].detachEvent("onpropertychange", f.onAttributeChange),
                    !1 !== f.observer && f.observer.disconnect(),
                    !1 !== f.observerremover && f.observerremover.disconnect(),
                    !1 !== f.observerbody && f.observerbody.disconnect(),
                    f.events = null,
                    f.cursor && f.cursor.remove(),
                    f.cursorh && f.cursorh.remove(),
                    f.rail && f.rail.remove(),
                    f.railh && f.railh.remove(),
                    f.zoom && f.zoom.remove();
                    for (var t = 0; t < f.saved.css.length; t++) {
                        var i = f.saved.css[t];
                        i[0].css(i[1], void 0 === i[2] ? "" : i[2])
                    }
                    f.saved = !1,
                    f.me.data("__nicescroll", "");
                    var n = o.nicescroll;
                    for (var r in n.each((function(e) {
                        if (this && this.id === f.id) {
                            delete n[e];
                            for (var t = ++e; t < n.length; t++, e++)
                                n[e] = n[t];
                            n.length--,
                            n.length && delete n[n.length]
                        }
                    })), f)
                        f[r] = null,
                        delete f[r];
                    f = null
                },
                this.scrollstart = function(e) {
                    return this.onscrollstart = e, f
                },
                this.scrollend = function(e) {
                    return this.onscrollend = e, f
                },
                this.scrollcancel = function(e) {
                    return this.onscrollcancel = e, f
                },
                this.zoomin = function(e) {
                    return this.onzoomin = e, f
                },
                this.zoomout = function(e) {
                    return this.onzoomout = e, f
                },
                this.isScrollable = function(e) {
                    var t = e.target ? e.target : e;
                    if ("OPTION" == t.nodeName)
                        return !0;
                    for (; t && 1 == t.nodeType && t !== this.me[0] && !/^BODY|HTML/.test(t.nodeName);) {
                        var i = o(t),
                            n = i.css("overflowY") || i.css("overflowX") || i.css("overflow") || "";
                        if (/scroll|auto/.test(n))
                            return t.clientHeight != t.scrollHeight;
                        t = !!t.parentNode && t.parentNode
                    }
                    return !1
                },
                this.getViewport = function(e) {
                    for (var t = !(!e || !e.parentNode) && e.parentNode; t && 1 == t.nodeType && !/^BODY|HTML/.test(t.nodeName);) {
                        var i = o(t);
                        if (/fixed|absolute/.test(i.css("position")))
                            return i;
                        var n = i.css("overflowY") || i.css("overflowX") || i.css("overflow") || "";
                        if (/scroll|auto/.test(n) && t.clientHeight != t.scrollHeight)
                            return i;
                        if (i.getNiceScroll().length > 0)
                            return i;
                        t = !!t.parentNode && t.parentNode
                    }
                    return !1
                },
                this.triggerScrollStart = function(e, t, i, n, r) {
                    if (f.onscrollstart) {
                        var s = {
                            type: "scrollstart",
                            current: {
                                x: e,
                                y: t
                            },
                            request: {
                                x: i,
                                y: n
                            },
                            end: {
                                x: f.newscrollx,
                                y: f.newscrolly
                            },
                            speed: r
                        };
                        f.onscrollstart.call(f, s)
                    }
                },
                this.triggerScrollEnd = function() {
                    if (f.onscrollend) {
                        var e = f.getScrollLeft(),
                            t = f.getScrollTop(),
                            i = {
                                type: "scrollend",
                                current: {
                                    x: e,
                                    y: t
                                },
                                end: {
                                    x: e,
                                    y: t
                                }
                            };
                        f.onscrollend.call(f, i)
                    }
                };
                var N = 0,
                    O = 0,
                    H = 0,
                    j = 1;
                function _(e, t, i, n) {
                    f.scrollrunning || (f.newscrolly = f.getScrollTop(), f.newscrollx = f.getScrollLeft(), H = y());
                    var r = y() - H;
                    if (H = y(), r > 350 ? j = 1 : j += (2 - j) / 10, t = t * j | 0, e = e * j | 0) {
                        if (n)
                            if (e < 0) {
                                if (f.getScrollLeft() >= f.page.maxw)
                                    return !0
                            } else if (f.getScrollLeft() <= 0)
                                return !0;
                        var s = e > 0 ? 1 : -1;
                        O !== s && (f.scrollmom && f.scrollmom.stop(), f.newscrollx = f.getScrollLeft(), O = s),
                        f.lastdeltax -= e
                    }
                    if (t) {
                        if (function() {
                            var e = f.getScrollTop();
                            if (t < 0) {
                                if (e >= f.page.maxh)
                                    return !0
                            } else if (e <= 0)
                                return !0
                        }()) {
                            if (g.nativeparentscrolling && i && !f.ispage && !f.zoomactive)
                                return !0;
                            var o = f.view.h >> 1;
                            f.newscrolly < -o ? (f.newscrolly = -o, t = -1) : f.newscrolly > f.page.maxh + o ? (f.newscrolly = f.page.maxh + o, t = 1) : t = 0
                        }
                        var a = t > 0 ? 1 : -1;
                        N !== a && (f.scrollmom && f.scrollmom.stop(), f.newscrolly = f.getScrollTop(), N = a),
                        f.lastdeltay -= t
                    }
                    (t || e) && f.synched("relativexy", (function() {
                        var e = f.lastdeltay + f.newscrolly;
                        f.lastdeltay = 0;
                        var t = f.lastdeltax + f.newscrollx;
                        f.lastdeltax = 0,
                        f.rail.drag || f.doScrollPos(t, e)
                    }))
                }
                var q = !1;
                function B(e, t, i) {
                    var n,
                        r;
                    return !(i || !q) || (0 === e.deltaMode ? (n = -e.deltaX * (g.mousescrollstep / 54) | 0, r = -e.deltaY * (g.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (n = -e.deltaX * g.mousescrollstep * 50 / 80 | 0, r = -e.deltaY * g.mousescrollstep * 50 / 80 | 0), t && g.oneaxismousemode && 0 === n && r && (n = r, r = 0, i && (n < 0 ? f.getScrollLeft() >= f.page.maxw : f.getScrollLeft() <= 0) && (r = n, n = 0)), f.isrtlmode && (n = -n), _(n, r, i, !0) ? void (i && (q = !0)) : (q = !1, e.stopImmediatePropagation(), e.preventDefault()))
                }
                if (this.onmousewheel = function(e) {
                    if (f.wheelprevented || f.locked)
                        return !1;
                    if (f.railslocked)
                        return f.debounced("checkunlock", f.resize, 250), !1;
                    if (f.rail.drag)
                        return f.cancelEvent(e);
                    if ("auto" === g.oneaxismousemode && 0 !== e.deltaX && (g.oneaxismousemode = !1), g.oneaxismousemode && 0 === e.deltaX && !f.rail.scrollable)
                        return !f.railh || !f.railh.scrollable || f.onmousewheelhr(e);
                    var t = y(),
                        i = !1;
                    if (g.preservenativescrolling && f.checkarea + 600 < t && (f.nativescrollingarea = f.isScrollable(e), i = !0), f.checkarea = t, f.nativescrollingarea)
                        return !0;
                    var n = B(e, !1, i);
                    return n && (f.checkarea = 0), n
                }, this.onmousewheelhr = function(e) {
                    if (!f.wheelprevented) {
                        if (f.railslocked || !f.railh.scrollable)
                            return !0;
                        if (f.rail.drag)
                            return f.cancelEvent(e);
                        var t = y(),
                            i = !1;
                        return g.preservenativescrolling && f.checkarea + 600 < t && (f.nativescrollingarea = f.isScrollable(e), i = !0), f.checkarea = t, !!f.nativescrollingarea || (f.railslocked ? f.cancelEvent(e) : B(e, !0, i))
                    }
                }, this.stop = function() {
                    return f.cancelScroll(), f.scrollmon && f.scrollmon.stop(), f.cursorfreezed = !1, f.scroll.y = Math.round(f.getScrollTop() * (1 / f.scrollratio.y)), f.noticeCursor(), f
                }, this.getTransitionSpeed = function(e) {
                    return 80 + e / 72 * g.scrollspeed | 0
                }, g.smoothscroll)
                    if (f.ishwscroll && C.hastransition && g.usetransition && g.smoothscroll) {
                        var R = "";
                        this.resetTransition = function() {
                            R = "",
                            f.doc.css(C.prefixstyle + "transition-duration", "0ms")
                        },
                        this.prepareTransition = function(e, t) {
                            var i = t ? e : f.getTransitionSpeed(e),
                                n = i + "ms";
                            return R !== n && (R = n, f.doc.css(C.prefixstyle + "transition-duration", n)), i
                        },
                        this.doScrollLeft = function(e, t) {
                            var i = f.scrollrunning ? f.newscrolly : f.getScrollTop();
                            f.doScrollPos(e, i, t)
                        },
                        this.doScrollTop = function(e, t) {
                            var i = f.scrollrunning ? f.newscrollx : f.getScrollLeft();
                            f.doScrollPos(i, e, t)
                        },
                        this.cursorupdate = {
                            running: !1,
                            start: function() {
                                var e = this;
                                if (!e.running) {
                                    e.running = !0;
                                    var t = function() {
                                        e.running && u(t),
                                        f.showCursor(f.getScrollTop(), f.getScrollLeft()),
                                        f.notifyScrollEvent(f.win[0])
                                    };
                                    u(t)
                                }
                            },
                            stop: function() {
                                this.running = !1
                            }
                        },
                        this.doScrollPos = function(e, t, i) {
                            var n = f.getScrollTop(),
                                r = f.getScrollLeft();
                            if (((f.newscrolly - n) * (t - n) < 0 || (f.newscrollx - r) * (e - r) < 0) && f.cancelScroll(), g.bouncescroll ? (t < 0 ? t = t / 2 | 0 : t > f.page.maxh && (t = f.page.maxh + (t - f.page.maxh) / 2 | 0), e < 0 ? e = e / 2 | 0 : e > f.page.maxw && (e = f.page.maxw + (e - f.page.maxw) / 2 | 0)) : (t < 0 ? t = 0 : t > f.page.maxh && (t = f.page.maxh), e < 0 ? e = 0 : e > f.page.maxw && (e = f.page.maxw)), f.scrollrunning && e == f.newscrollx && t == f.newscrolly)
                                return !1;
                            f.newscrolly = t,
                            f.newscrollx = e;
                            var s = f.getScrollTop(),
                                o = f.getScrollLeft(),
                                a = {};
                            a.x = e - o,
                            a.y = t - s;
                            var l = 0 | Math.sqrt(a.x * a.x + a.y * a.y),
                                c = f.prepareTransition(l);
                            f.scrollrunning || (f.scrollrunning = !0, f.triggerScrollStart(o, s, e, t, c), f.cursorupdate.start()),
                            f.scrollendtrapped = !0,
                            C.transitionend || (f.scrollendtrapped && clearTimeout(f.scrollendtrapped), f.scrollendtrapped = setTimeout(f.onScrollTransitionEnd, c)),
                            f.setScrollTop(f.newscrolly),
                            f.setScrollLeft(f.newscrollx)
                        },
                        this.cancelScroll = function() {
                            if (!f.scrollendtrapped)
                                return !0;
                            var e = f.getScrollTop(),
                                t = f.getScrollLeft();
                            return f.scrollrunning = !1, C.transitionend || clearTimeout(C.transitionend), f.scrollendtrapped = !1, f.resetTransition(), f.setScrollTop(e), f.railh && f.setScrollLeft(t), f.timerscroll && f.timerscroll.tm && clearInterval(f.timerscroll.tm), f.timerscroll = !1, f.cursorfreezed = !1, f.cursorupdate.stop(), f.showCursor(e, t), f
                        },
                        this.onScrollTransitionEnd = function() {
                            if (f.scrollendtrapped) {
                                var e = f.getScrollTop(),
                                    t = f.getScrollLeft();
                                if (e < 0 ? e = 0 : e > f.page.maxh && (e = f.page.maxh), t < 0 ? t = 0 : t > f.page.maxw && (t = f.page.maxw), e != f.newscrolly || t != f.newscrollx)
                                    return f.doScrollPos(t, e, g.snapbackspeed);
                                f.scrollrunning && f.triggerScrollEnd(),
                                f.scrollrunning = !1,
                                f.scrollendtrapped = !1,
                                f.resetTransition(),
                                f.timerscroll = !1,
                                f.setScrollTop(e),
                                f.railh && f.setScrollLeft(t),
                                f.cursorupdate.stop(),
                                f.noticeCursor(!1, e, t),
                                f.cursorfreezed = !1
                            }
                        }
                    } else
                        this.doScrollLeft = function(e, t) {
                            var i = f.scrollrunning ? f.newscrolly : f.getScrollTop();
                            f.doScrollPos(e, i, t)
                        },
                        this.doScrollTop = function(e, t) {
                            var i = f.scrollrunning ? f.newscrollx : f.getScrollLeft();
                            f.doScrollPos(i, e, t)
                        },
                        this.doScrollPos = function(e, t, i) {
                            var n = f.getScrollTop(),
                                r = f.getScrollLeft();
                            ((f.newscrolly - n) * (t - n) < 0 || (f.newscrollx - r) * (e - r) < 0) && f.cancelScroll();
                            var s = !1;
                            if (f.bouncescroll && f.rail.visibility || (t < 0 ? (t = 0, s = !0) : t > f.page.maxh && (t = f.page.maxh, s = !0)), f.bouncescroll && f.railh.visibility || (e < 0 ? (e = 0, s = !0) : e > f.page.maxw && (e = f.page.maxw, s = !0)), f.scrollrunning && f.newscrolly === t && f.newscrollx === e)
                                return !0;
                            f.newscrolly = t,
                            f.newscrollx = e,
                            f.dst = {},
                            f.dst.x = e - r,
                            f.dst.y = t - n,
                            f.dst.px = r,
                            f.dst.py = n;
                            var o = 0 | Math.sqrt(f.dst.x * f.dst.x + f.dst.y * f.dst.y),
                                a = f.getTransitionSpeed(o);
                            f.bzscroll = {};
                            var l = s ? 1 : .58;
                            f.bzscroll.x = new k(r, f.newscrollx, a, 0, 0, l, 1),
                            f.bzscroll.y = new k(n, f.newscrolly, a, 0, 0, l, 1),
                            y();
                            var c = function() {
                                if (f.scrollrunning) {
                                    var e = f.bzscroll.y.getPos();
                                    f.setScrollLeft(f.bzscroll.x.getNow()),
                                    f.setScrollTop(f.bzscroll.y.getNow()),
                                    e <= 1 ? f.timer = u(c) : (f.scrollrunning = !1, f.timer = 0, f.triggerScrollEnd())
                                }
                            };
                            f.scrollrunning || (f.triggerScrollStart(r, n, e, t, a), f.scrollrunning = !0, f.timer = u(c))
                        },
                        this.cancelScroll = function() {
                            return f.timer && p(f.timer), f.timer = 0, f.bzscroll = !1, f.scrollrunning = !1, f
                        };
                else
                    this.doScrollLeft = function(e, t) {
                        var i = f.getScrollTop();
                        f.doScrollPos(e, i, t)
                    },
                    this.doScrollTop = function(e, t) {
                        var i = f.getScrollLeft();
                        f.doScrollPos(i, e, t)
                    },
                    this.doScrollPos = function(e, t, i) {
                        var n = e > f.page.maxw ? f.page.maxw : e;
                        n < 0 && (n = 0);
                        var r = t > f.page.maxh ? f.page.maxh : t;
                        r < 0 && (r = 0),
                        f.synched("scroll", (function() {
                            f.setScrollTop(r),
                            f.setScrollLeft(n)
                        }))
                    },
                    this.cancelScroll = function() {};
                this.doScrollBy = function(e, t) {
                    _(0, e)
                },
                this.doScrollLeftBy = function(e, t) {
                    _(e, 0)
                },
                this.doScrollTo = function(e, t) {
                    var i = t ? Math.round(e * f.scrollratio.y) : e;
                    i < 0 ? i = 0 : i > f.page.maxh && (i = f.page.maxh),
                    f.cursorfreezed = !1,
                    f.doScrollTop(e)
                },
                this.checkContentSize = function() {
                    var e = f.getContentSize();
                    e.h == f.page.h && e.w == f.page.w || f.resize(!1, e)
                },
                f.onscroll = function(e) {
                    f.rail.drag || f.cursorfreezed || f.synched("scroll", (function() {
                        f.scroll.y = Math.round(f.getScrollTop() / f.scrollratio.y),
                        f.railh && (f.scroll.x = Math.round(f.getScrollLeft() / f.scrollratio.x)),
                        f.noticeCursor()
                    }))
                },
                f.bind(f.docscroll, "scroll", f.onscroll),
                this.doZoomIn = function(e) {
                    if (!f.zoomactive) {
                        f.zoomactive = !0,
                        f.zoomrestore = {
                            style: {}
                        };
                        var t = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
                            i = f.win[0].style;
                        for (var n in t) {
                            var r = t[n];
                            f.zoomrestore.style[r] = void 0 !== i[r] ? i[r] : ""
                        }
                        f.zoomrestore.style.width = f.win.css("width"),
                        f.zoomrestore.style.height = f.win.css("height"),
                        f.zoomrestore.padding = {
                            w: f.win.outerWidth() - f.win.width(),
                            h: f.win.outerHeight() - f.win.height()
                        },
                        C.isios4 && (f.zoomrestore.scrollTop = c.scrollTop(), c.scrollTop(0)),
                        f.win.css({
                            position: C.isios4 ? "absolute" : "fixed",
                            top: 0,
                            left: 0,
                            zIndex: s + 100,
                            margin: 0
                        });
                        var o = f.win.css("backgroundColor");
                        return ("" === o || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(o)) && f.win.css("backgroundColor", "#fff"), f.rail.css({
                            zIndex: s + 101
                        }), f.zoom.css({
                            zIndex: s + 102
                        }), f.zoom.css("backgroundPosition", "0 -18px"), f.resizeZoom(), f.onzoomin && f.onzoomin.call(f), f.cancelEvent(e)
                    }
                },
                this.doZoomOut = function(e) {
                    if (f.zoomactive)
                        return f.zoomactive = !1, f.win.css("margin", ""), f.win.css(f.zoomrestore.style), C.isios4 && c.scrollTop(f.zoomrestore.scrollTop), f.rail.css({
                            "z-index": f.zindex
                        }), f.zoom.css({
                            "z-index": f.zindex
                        }), f.zoomrestore = !1, f.zoom.css("backgroundPosition", "0 0"), f.onResize(), f.onzoomout && f.onzoomout.call(f), f.cancelEvent(e)
                },
                this.doZoom = function(e) {
                    return f.zoomactive ? f.doZoomOut(e) : f.doZoomIn(e)
                },
                this.resizeZoom = function() {
                    if (f.zoomactive) {
                        var e = f.getScrollTop();
                        f.win.css({
                            width: c.width() - f.zoomrestore.padding.w + "px",
                            height: c.height() - f.zoomrestore.padding.h + "px"
                        }),
                        f.onResize(),
                        f.setScrollTop(Math.min(f.page.maxh, e))
                    }
                },
                this.init(),
                o.nicescroll.push(this)
            },
            T = function(e) {
                var t = this;
                this.nc = e,
                this.lastx = 0,
                this.lasty = 0,
                this.speedx = 0,
                this.speedy = 0,
                this.lasttime = 0,
                this.steptime = 0,
                this.snapx = !1,
                this.snapy = !1,
                this.demulx = 0,
                this.demuly = 0,
                this.lastscrollx = -1,
                this.lastscrolly = -1,
                this.chkx = 0,
                this.chky = 0,
                this.timer = 0,
                this.reset = function(e, i) {
                    t.stop(),
                    t.steptime = 0,
                    t.lasttime = y(),
                    t.speedx = 0,
                    t.speedy = 0,
                    t.lastx = e,
                    t.lasty = i,
                    t.lastscrollx = -1,
                    t.lastscrolly = -1
                },
                this.update = function(e, i) {
                    var n = y();
                    t.steptime = n - t.lasttime,
                    t.lasttime = n;
                    var r = i - t.lasty,
                        s = e - t.lastx,
                        o = t.nc.getScrollTop() + r,
                        a = t.nc.getScrollLeft() + s;
                    t.snapx = a < 0 || a > t.nc.page.maxw,
                    t.snapy = o < 0 || o > t.nc.page.maxh,
                    t.speedx = s,
                    t.speedy = r,
                    t.lastx = e,
                    t.lasty = i
                },
                this.stop = function() {
                    t.nc.unsynched("domomentum2d"),
                    t.timer && clearTimeout(t.timer),
                    t.timer = 0,
                    t.lastscrollx = -1,
                    t.lastscrolly = -1
                },
                this.doSnapy = function(e, i) {
                    var n = !1;
                    i < 0 ? (i = 0, n = !0) : i > t.nc.page.maxh && (i = t.nc.page.maxh, n = !0),
                    e < 0 ? (e = 0, n = !0) : e > t.nc.page.maxw && (e = t.nc.page.maxw, n = !0),
                    n ? t.nc.doScrollPos(e, i, t.nc.opt.snapbackspeed) : t.nc.triggerScrollEnd()
                },
                this.doMomentum = function(e) {
                    var i = y(),
                        n = e ? i + e : t.lasttime,
                        r = t.nc.getScrollLeft(),
                        s = t.nc.getScrollTop(),
                        o = t.nc.page.maxh,
                        a = t.nc.page.maxw;
                    t.speedx = a > 0 ? Math.min(60, t.speedx) : 0,
                    t.speedy = o > 0 ? Math.min(60, t.speedy) : 0;
                    var l = n && i - n <= 60;
                    (s < 0 || s > o || r < 0 || r > a) && (l = !1);
                    var c = !(!t.speedy || !l) && t.speedy,
                        d = !(!t.speedx || !l) && t.speedx;
                    if (c || d) {
                        var u = Math.max(16, t.steptime);
                        if (u > 50) {
                            var p = u / 50;
                            t.speedx *= p,
                            t.speedy *= p,
                            u = 50
                        }
                        t.demulxy = 0,
                        t.lastscrollx = t.nc.getScrollLeft(),
                        t.chkx = t.lastscrollx,
                        t.lastscrolly = t.nc.getScrollTop(),
                        t.chky = t.lastscrolly;
                        var h = t.lastscrollx,
                            f = t.lastscrolly,
                            m = function() {
                                var e = y() - i > 600 ? .04 : .02;
                                t.speedx && (h = Math.floor(t.lastscrollx - t.speedx * (1 - t.demulxy)), t.lastscrollx = h, (h < 0 || h > a) && (e = .1)),
                                t.speedy && (f = Math.floor(t.lastscrolly - t.speedy * (1 - t.demulxy)), t.lastscrolly = f, (f < 0 || f > o) && (e = .1)),
                                t.demulxy = Math.min(1, t.demulxy + e),
                                t.nc.synched("domomentum2d", (function() {
                                    t.speedx && (t.nc.getScrollLeft(), t.chkx = h, t.nc.setScrollLeft(h)),
                                    t.speedy && (t.nc.getScrollTop(), t.chky = f, t.nc.setScrollTop(f)),
                                    t.timer || (t.nc.hideCursor(), t.doSnapy(h, f))
                                })),
                                t.demulxy < 1 ? t.timer = setTimeout(m, u) : (t.stop(), t.nc.hideCursor(), t.doSnapy(h, f))
                            };
                        m()
                    } else
                        t.doSnapy(t.nc.getScrollLeft(), t.nc.getScrollTop())
                }
            },
            E = e.fn.scrollTop;
        e.cssHooks.pageYOffset = {
            get: function(e, t, i) {
                var n = o.data(e, "__nicescroll") || !1;
                return n && n.ishwscroll ? n.getScrollTop() : E.call(e)
            },
            set: function(e, t) {
                var i = o.data(e, "__nicescroll") || !1;
                return i && i.ishwscroll ? i.setScrollTop(parseInt(t)) : E.call(e, t), this
            }
        },
        e.fn.scrollTop = function(e) {
            if (void 0 === e) {
                var t = this[0] && o.data(this[0], "__nicescroll") || !1;
                return t && t.ishwscroll ? t.getScrollTop() : E.call(this)
            }
            return this.each((function() {
                var t = o.data(this, "__nicescroll") || !1;
                t && t.ishwscroll ? t.setScrollTop(parseInt(e)) : E.call(o(this), e)
            }))
        };
        var S = e.fn.scrollLeft;
        o.cssHooks.pageXOffset = {
            get: function(e, t, i) {
                var n = o.data(e, "__nicescroll") || !1;
                return n && n.ishwscroll ? n.getScrollLeft() : S.call(e)
            },
            set: function(e, t) {
                var i = o.data(e, "__nicescroll") || !1;
                return i && i.ishwscroll ? i.setScrollLeft(parseInt(t)) : S.call(e, t), this
            }
        },
        e.fn.scrollLeft = function(e) {
            if (void 0 === e) {
                var t = this[0] && o.data(this[0], "__nicescroll") || !1;
                return t && t.ishwscroll ? t.getScrollLeft() : S.call(this)
            }
            return this.each((function() {
                var t = o.data(this, "__nicescroll") || !1;
                t && t.ishwscroll ? t.setScrollLeft(parseInt(e)) : S.call(o(this), e)
            }))
        };
        var C = function(e) {
            var t = this;
            if (this.length = 0, this.name = "nicescrollarray", this.each = function(e) {
                return o.each(t, e), t
            }, this.push = function(e) {
                t[t.length] = e,
                t.length++
            }, this.eq = function(e) {
                return t[e]
            }, e)
                for (var i = 0; i < e.length; i++) {
                    var n = o.data(e[i], "__nicescroll") || !1;
                    n && (this[this.length] = n, this.length++)
                }
            return this
        };
        (function(e, t, i) {
            for (var n = 0, r = t.length; n < r; n++)
                i(e, t[n])
        })(C.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], (function(e, t) {
            e[t] = function() {
                var e = arguments;
                return this.each((function() {
                    this[t].apply(this, e)
                }))
            }
        })),
        e.fn.getNiceScroll = function(e) {
            return void 0 === e ? new C(this) : this[e] && o.data(this[e], "__nicescroll") || !1
        },
        (e.expr.pseudos || e.expr[":"]).nicescroll = function(e) {
            return void 0 !== o.data(e, "__nicescroll")
        },
        o.fn.niceScroll = function(e, t) {
            void 0 !== t || "object" != typeof e || "jquery" in e || (t = e, e = !1);
            var i = new C;
            return this.each((function() {
                var n = o(this),
                    r = o.extend({}, t);
                if (e) {
                    var s = o(e);
                    r.doc = s.length > 1 ? o(e, n) : s,
                    r.win = n
                }
                !("doc" in r) || "win" in r || (r.win = n);
                var a = n.data("__nicescroll") || !1;
                a || (r.doc = r.doc || n, a = new x(r, n), n.data("__nicescroll", a)),
                i.push(a)
            })), 1 === i.length ? i[0] : i
        },
        l.NiceScroll = {
            getjQuery: function() {
                return e
            }
        },
        o.nicescroll || (o.nicescroll = new C, o.nicescroll.options = b)
    }) ? n.apply(t, r) : n) || (e.exports = s)
}, function(e, t, i) {
    var n,
        r,
        s;
    r = [i(0)],
    void 0 === (s = "function" == typeof (n = function(e) {
        var t,
            i,
            n,
            r = [],
            s = document,
            o = window,
            a = s.documentElement;
        function l() {
            if (r.length) {
                var n,
                    l,
                    c,
                    d = 0,
                    u = e.map(r, (function(e) {
                        var t = e.data.selector,
                            i = e.$element;
                        return t ? i.find(t) : i
                    }));
                for (t = t || ((c = {
                    height: o.innerHeight,
                    width: o.innerWidth
                }).height || !(n = s.compatMode) && e.support.boxModel || (c = {
                    height: (l = "CSS1Compat" === n ? a : s.body).clientHeight,
                    width: l.clientWidth
                }), c), i = i || {
                    top: o.pageYOffset || a.scrollTop || s.body.scrollTop,
                    left: o.pageXOffset || a.scrollLeft || s.body.scrollLeft
                }; d < r.length; d++)
                    if (e.contains(a, u[d][0])) {
                        var p = e(u[d]),
                            h = {
                                height: p[0].offsetHeight,
                                width: p[0].offsetWidth
                            },
                            f = p.offset(),
                            m = p.data("inview");
                        if (!i || !t)
                            return;
                        f.top + h.height > i.top && f.top < i.top + t.height && f.left + h.width > i.left && f.left < i.left + t.width ? m || p.data("inview", !0).trigger("inview", [!0]) : m && p.data("inview", !1).trigger("inview", [!1])
                    }
            }
        }
        e.event.special.inview = {
            add: function(t) {
                r.push({
                    data: t,
                    $element: e(this),
                    element: this
                }),
                !n && r.length && (n = setInterval(l, 250))
            },
            remove: function(e) {
                for (var t = 0; t < r.length; t++) {
                    var i = r[t];
                    if (i.element === this && i.data.guid === e.guid) {
                        r.splice(t, 1);
                        break
                    }
                }
                r.length || (clearInterval(n), n = null)
            }
        },
        e(o).bind("scroll resize scrollstop", (function() {
            t = i = null
        })),
        !a.addEventListener && a.attachEvent && a.attachEvent("onfocusin", (function() {
            i = null
        }))
    }) ? n.apply(t, r) : n) || (e.exports = s)
}, function(e, t, i) {
    (function(t) {
        e.exports = function() {
            "use strict";
            function e(e, t) {
                for (var i = e.length, n = i, r = []; i--;)
                    r.push(t(e[n - i - 1]));
                return r
            }
            function i(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (window.Promise)
                    return b(e, t, i);
                e.recalculate(!0, !0)
            }
            function n(e) {
                var t = e.useContainerForBreakpoints ? e.container.clientWidth : window.innerWidth,
                    i = {
                        columns: e.columns
                    };
                T(e.margin) ? i.margin = {
                    x: e.margin.x,
                    y: e.margin.y
                } : i.margin = {
                    x: e.margin,
                    y: e.margin
                };
                var n = Object.keys(e.breakAt);
                return e.mobileFirst ? function(e) {
                    for (var t = e.options, i = e.responsiveOptions, n = e.keys, r = e.docWidth, s = void 0, o = 0; o < n.length; o++) {
                        var a = parseInt(n[o], 10);
                        r >= a && (s = t.breakAt[a], E(s, i))
                    }
                    return i
                }({
                    options: e,
                    responsiveOptions: i,
                    keys: n,
                    docWidth: t
                }) : function(e) {
                    for (var t = e.options, i = e.responsiveOptions, n = e.keys, r = e.docWidth, s = void 0, o = n.length - 1; o >= 0; o--) {
                        var a = parseInt(n[o], 10);
                        r <= a && (s = t.breakAt[a], E(s, i))
                    }
                    return i
                }({
                    options: e,
                    responsiveOptions: i,
                    keys: n,
                    docWidth: t
                })
            }
            function r(e) {
                return n(e).columns
            }
            function s(e) {
                return n(e).margin
            }
            function o(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    i = r(e),
                    n = s(e).x,
                    o = 100 / i;
                if (!t)
                    return o;
                if (1 === i)
                    return "100%";
                var a = "px";
                if ("string" == typeof n) {
                    var l = parseFloat(n);
                    a = n.replace(l, ""),
                    n = l
                }
                return n = (i - 1) * n / i, "%" === a ? o - n + "%" : "calc(" + o + "% - " + n + a + ")"
            }
            function a(e, t) {
                var i,
                    n = r(e.options),
                    a = 0,
                    l = void 0;
                if (1 == ++t)
                    return 0;
                var c = "px";
                if ("string" == typeof (l = s(e.options).x)) {
                    var d = parseFloat(l, 10);
                    c = l.replace(d, ""),
                    l = d
                }
                return i = (l - (n - 1) * l / n) * (t - 1), a += o(e.options, !1) * (t - 1), "%" === c ? a + i + "%" : "calc(" + a + "% + " + i + c + ")"
            }
            function l(e) {
                var t = 0,
                    i = e.container,
                    n = e.rows;
                p(n, (function(e) {
                    t = e > t ? e : t
                })),
                i.style.height = t + "px"
            }
            function c(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                    o = r(e.options),
                    a = s(e.options).y;
                C(e, o, i),
                p(t, (function(t) {
                    var i = 0,
                        r = parseInt(t.offsetHeight, 10);
                    isNaN(r) || (e.rows.forEach((function(t, n) {
                        t < e.rows[i] && (i = n)
                    })), t.style.position = "absolute", t.style.top = e.rows[i] + "px", t.style.left = "" + e.cols[i], e.rows[i] += isNaN(r) ? 0 : r + a, n && (t.dataset.macyComplete = 1))
                })),
                n && (e.tmpRows = null),
                l(e)
            }
            function d(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                    o = r(e.options),
                    a = s(e.options).y;
                C(e, o, i),
                p(t, (function(t) {
                    e.lastcol === o && (e.lastcol = 0);
                    var i = S(t, "height");
                    i = parseInt(t.offsetHeight, 10),
                    isNaN(i) || (t.style.position = "absolute", t.style.top = e.rows[e.lastcol] + "px", t.style.left = "" + e.cols[e.lastcol], e.rows[e.lastcol] += isNaN(i) ? 0 : i + a, e.lastcol += 1, n && (t.dataset.macyComplete = 1))
                })),
                n && (e.tmpRows = null),
                l(e)
            }
            var u = function e(t, i) {
                if (!(this instanceof e))
                    return new e(t, i);
                if (t && t.nodeName)
                    return t;
                if (t = t.replace(/^\s*/, "").replace(/\s*$/, ""), i)
                    return this.byCss(t, i);
                for (var n in this.selectors)
                    if (i = n.split("/"), new RegExp(i[1], i[2]).test(t))
                        return this.selectors[n](t);
                return this.byCss(t)
            };
            u.prototype.byCss = function(e, t) {
                return (t || document).querySelectorAll(e)
            },
            u.prototype.selectors = {},
            u.prototype.selectors[/^\.[\w\-]+$/] = function(e) {
                return document.getElementsByClassName(e.substring(1))
            },
            u.prototype.selectors[/^\w+$/] = function(e) {
                return document.getElementsByTagName(e)
            },
            u.prototype.selectors[/^\#[\w\-]+$/] = function(e) {
                return document.getElementById(e.substring(1))
            };
            var p = function(e, t) {
                    for (var i = e.length, n = i; i--;)
                        t(e[n - i - 1])
                },
                h = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.running = !1,
                    this.events = [],
                    this.add(e)
                };
            h.prototype.run = function() {
                if (!this.running && this.events.length > 0) {
                    var e = this.events.shift();
                    this.running = !0,
                    e(),
                    this.running = !1,
                    this.run()
                }
            },
            h.prototype.add = function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return !!t && (Array.isArray(t) ? p(t, (function(t) {
                        return e.add(t)
                    })) : (this.events.push(t), void this.run()))
            },
            h.prototype.clear = function() {
                this.events = []
            };
            var f = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return this.instance = e, this.data = t, this
                },
                m = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.events = {},
                    this.instance = e
                };
            m.prototype.on = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return !(!e || !t) && (Array.isArray(this.events[e]) || (this.events[e] = []), this.events[e].push(t))
            },
            m.prototype.emit = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!e || !Array.isArray(this.events[e]))
                    return !1;
                var i = new f(this.instance, t);
                p(this.events[e], (function(e) {
                    return e(i)
                }))
            };
            var g = function(e) {
                    return !("naturalHeight" in e && e.naturalHeight + e.naturalWidth === 0) || e.width + e.height !== 0
                },
                v = function(e, i) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return new t((function(e, t) {
                        if (i.complete)
                            return g(i) ? e(i) : t(i);
                        i.addEventListener("load", (function() {
                            return g(i) ? e(i) : t(i)
                        })),
                        i.addEventListener("error", (function() {
                            return t(i)
                        }))
                    })).then((function(t) {
                        n && e.emit(e.constants.EVENT_IMAGE_LOAD, {
                            img: t
                        })
                    })).catch((function(t) {
                        return e.emit(e.constants.EVENT_IMAGE_ERROR, {
                            img: t
                        })
                    }))
                },
                y = function(t, i) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return e(i, (function(e) {
                        return v(t, e, n)
                    }))
                },
                b = function(e, i) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return t.all(y(e, i, n)).then((function() {
                        e.emit(e.constants.EVENT_IMAGE_COMPLETE)
                    }))
                },
                w = function(e) {
                    return function(e, t) {
                        var i = void 0;
                        return function() {
                            i && clearTimeout(i),
                            i = setTimeout(e, t)
                        }
                    }((function() {
                        e.emit(e.constants.EVENT_RESIZE),
                        e.queue.add((function() {
                            return e.recalculate(!0, !0)
                        }))
                    }), 100)
                },
                x = function(e) {
                    (function(e) {
                        if (e.container = u(e.options.container), e.container instanceof u || !e.container)
                            return !!e.options.debug && console.error("Error: Container not found");
                        e.container.length && (e.container = e.container[0]),
                        e.options.container = e.container,
                        e.container.style.position = "relative"
                    })(e),
                    function(e) {
                        e.queue = new h,
                        e.events = new m(e),
                        e.rows = [],
                        e.resizer = w(e)
                    }(e),
                    function(e) {
                        var t = u("img", e.container);
                        window.addEventListener("resize", e.resizer),
                        e.on(e.constants.EVENT_IMAGE_LOAD, (function() {
                            return e.recalculate(!1, !1)
                        })),
                        e.on(e.constants.EVENT_IMAGE_COMPLETE, (function() {
                            return e.recalculate(!0, !0)
                        })),
                        e.options.useOwnImageLoader || i(e, t, !e.options.waitForImages),
                        e.emit(e.constants.EVENT_INITIALIZED)
                    }(e)
                },
                T = function(e) {
                    return e === Object(e) && "[object Array]" !== Object.prototype.toString.call(e)
                },
                E = function(e, t) {
                    T(e) || (t.columns = e),
                    T(e) && e.columns && (t.columns = e.columns),
                    T(e) && e.margin && !T(e.margin) && (t.margin = {
                        x: e.margin,
                        y: e.margin
                    }),
                    T(e) && e.margin && T(e.margin) && e.margin.x && (t.margin.x = e.margin.x),
                    T(e) && e.margin && T(e.margin) && e.margin.y && (t.margin.y = e.margin.y)
                },
                S = function(e, t) {
                    return window.getComputedStyle(e, null).getPropertyValue(t)
                },
                C = function(e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if (e.lastcol || (e.lastcol = 0), e.rows.length < 1 && (i = !0), i) {
                        e.rows = [],
                        e.cols = [],
                        e.lastcol = 0;
                        for (var n = t - 1; n >= 0; n--)
                            e.rows[n] = 0,
                            e.cols[n] = a(e, n)
                    } else if (e.tmpRows)
                        for (e.rows = [], n = t - 1; n >= 0; n--)
                            e.rows[n] = e.tmpRows[n];
                    else
                        for (e.tmpRows = [], n = t - 1; n >= 0; n--)
                            e.tmpRows[n] = e.rows[n]
                },
                k = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                        n = t ? e.container.children : u(':scope > *:not([data-macy-complete="1"])', e.container);
                    n = Array.from(n).filter((function(e) {
                        return null !== e.offsetParent
                    }));
                    var r = o(e.options);
                    return p(n, (function(e) {
                        t && (e.dataset.macyComplete = 0),
                        e.style.width = r
                    })), e.options.trueOrder ? (d(e, n, t, i), e.emit(e.constants.EVENT_RECALCULATED)) : (c(e, n, t, i), e.emit(e.constants.EVENT_RECALCULATED))
                },
                M = function() {
                    return !!window.Promise
                },
                $ = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var i = arguments[t];
                        for (var n in i)
                            Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                    }
                    return e
                };
            Array.from || (Array.from = function(e) {
                for (var t = 0, i = []; t < e.length;)
                    i.push(e[t++]);
                return i
            });
            var z = {
                columns: 4,
                margin: 2,
                trueOrder: !1,
                waitForImages: !1,
                useImageLoader: !0,
                breakAt: {},
                useOwnImageLoader: !1,
                onInit: !1,
                cancelLegacy: !1,
                useContainerForBreakpoints: !1
            };
            !function() {
                try {
                    document.createElement("a").querySelector(":scope *")
                } catch (e) {
                    !function() {
                        function e(e) {
                            return function(i) {
                                if (i && t.test(i)) {
                                    var n = this.getAttribute("id");
                                    n || (this.id = "q" + Math.floor(9e6 * Math.random()) + 1e6),
                                    arguments[0] = i.replace(t, "#" + this.id);
                                    var r = e.apply(this, arguments);
                                    return null === n ? this.removeAttribute("id") : n || (this.id = n), r
                                }
                                return e.apply(this, arguments)
                            }
                        }
                        var t = /:scope\b/gi,
                            i = e(Element.prototype.querySelector);
                        Element.prototype.querySelector = function(e) {
                            return i.apply(this, arguments)
                        };
                        var n = e(Element.prototype.querySelectorAll);
                        Element.prototype.querySelectorAll = function(e) {
                            return n.apply(this, arguments)
                        }
                    }()
                }
            }();
            var L = function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : z;
                if (!(this instanceof e))
                    return new e(t);
                this.options = {},
                $(this.options, z, t),
                this.options.cancelLegacy && !M() || x(this)
            };
            return L.init = function(e) {
                return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "), new L(e)
            }, L.prototype.recalculateOnImageLoad = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return i(this, u("img", this.container), !e)
            }, L.prototype.runOnImageLoad = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    n = u("img", this.container);
                return this.on(this.constants.EVENT_IMAGE_COMPLETE, e), t && this.on(this.constants.EVENT_IMAGE_LOAD, e), i(this, n, t)
            }, L.prototype.recalculate = function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return i && this.queue.clear(), this.queue.add((function() {
                    return k(e, t, i)
                }))
            }, L.prototype.remove = function() {
                window.removeEventListener("resize", this.resizer),
                p(this.container.children, (function(e) {
                    e.removeAttribute("data-macy-complete"),
                    e.removeAttribute("style")
                })),
                this.container.removeAttribute("style")
            }, L.prototype.reInit = function() {
                this.recalculate(!0, !0),
                this.emit(this.constants.EVENT_INITIALIZED),
                window.addEventListener("resize", this.resizer),
                this.container.style.position = "relative"
            }, L.prototype.on = function(e, t) {
                this.events.on(e, t)
            }, L.prototype.emit = function(e, t) {
                this.events.emit(e, t)
            }, L.constants = {
                EVENT_INITIALIZED: "macy.initialized",
                EVENT_RECALCULATED: "macy.recalculated",
                EVENT_IMAGE_LOAD: "macy.image.load",
                EVENT_IMAGE_ERROR: "macy.image.error",
                EVENT_IMAGE_COMPLETE: "macy.images.complete",
                EVENT_RESIZE: "macy.resize"
            }, L.prototype.constants = L.constants, L
        }()
    }).call(this, i(14))
}, function(e, t, i) {
    "use strict";
    var n = "undefined" == typeof document ? {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: {
                blur: function() {},
                nodeName: ""
            },
            querySelector: function() {
                return null
            },
            querySelectorAll: function() {
                return []
            },
            getElementById: function() {
                return null
            },
            createEvent: function() {
                return {
                    initEvent: function() {}
                }
            },
            createElement: function() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function() {},
                    getElementsByTagName: function() {
                        return []
                    }
                }
            },
            location: {
                hash: ""
            }
        } : document,
        r = "undefined" == typeof window ? {
            document: n,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function() {
                return this
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
                return {
                    getPropertyValue: function() {
                        return ""
                    }
                }
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {}
        } : window;
    class s {
        constructor(e)
        {
            const t = this;
            for (let i = 0; i < e.length; i += 1)
                t[i] = e[i];
            return t.length = e.length, this
        }
    }
    function o(e, t) {
        const i = [];
        let o = 0;
        if (e && !t && e instanceof s)
            return e;
        if (e)
            if ("string" == typeof e) {
                let r,
                    s;
                const a = e.trim();
                if (a.indexOf("<") >= 0 && a.indexOf(">") >= 0) {
                    let e = "div";
                    for (0 === a.indexOf("<li") && (e = "ul"), 0 === a.indexOf("<tr") && (e = "tbody"), 0 !== a.indexOf("<td") && 0 !== a.indexOf("<th") || (e = "tr"), 0 === a.indexOf("<tbody") && (e = "table"), 0 === a.indexOf("<option") && (e = "select"), s = n.createElement(e), s.innerHTML = a, o = 0; o < s.childNodes.length; o += 1)
                        i.push(s.childNodes[o])
                } else
                    for (r = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || n).querySelectorAll(e.trim()) : [n.getElementById(e.trim().split("#")[1])], o = 0; o < r.length; o += 1)
                        r[o] && i.push(r[o])
            } else if (e.nodeType || e === r || e === n)
                i.push(e);
            else if (e.length > 0 && e[0].nodeType)
                for (o = 0; o < e.length; o += 1)
                    i.push(e[o]);
        return new s(i)
    }
    function a(e) {
        const t = [];
        for (let i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    o.fn = s.prototype,
    o.Class = s,
    o.Dom7 = s;
    "resize scroll".split(" ");
    const l = {
        addClass: function(e) {
            if (void 0 === e)
                return this;
            const t = e.split(" ");
            for (let e = 0; e < t.length; e += 1)
                for (let i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[e]);
            return this
        },
        removeClass: function(e) {
            const t = e.split(" ");
            for (let e = 0; e < t.length; e += 1)
                for (let i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[e]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            const t = e.split(" ");
            for (let e = 0; e < t.length; e += 1)
                for (let i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[e]);
            return this
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (let i = 0; i < this.length; i += 1)
                if (2 === arguments.length)
                    this[i].setAttribute(e, t);
                else
                    for (const t in e)
                        this[i][t] = e[t],
                        this[i].setAttribute(t, e[t]);
            return this
        },
        removeAttr: function(e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            let i;
            if (void 0 !== t) {
                for (let n = 0; n < this.length; n += 1)
                    i = this[n],
                    i.dom7ElementDataStorage || (i.dom7ElementDataStorage = {}),
                    i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0], i) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
                    return i.dom7ElementDataStorage[e];
                const t = i.getAttribute(`data-${e}`);
                return t || void 0
            }
        },
        transform: function(e) {
            for (let t = 0; t < this.length; t += 1) {
                const i = this[t].style;
                i.webkitTransform = e,
                i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e = `${e}ms`);
            for (let t = 0; t < this.length; t += 1) {
                const i = this[t].style;
                i.webkitTransitionDuration = e,
                i.transitionDuration = e
            }
            return this
        },
        on: function(...e) {
            let [t, i, n, r] = e;
            function s(e) {
                const t = e.target;
                if (!t)
                    return;
                const r = e.target.dom7EventData || [];
                if (r.indexOf(e) < 0 && r.unshift(e), o(t).is(i))
                    n.apply(t, r);
                else {
                    const e = o(t).parents();
                    for (let t = 0; t < e.length; t += 1)
                        o(e[t]).is(i) && n.apply(e[t], r)
                }
            }
            function a(e) {
                const t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                n.apply(this, t)
            }
            "function" == typeof e[1] && ([t, n, r] = e, i = void 0),
            r || (r = !1);
            const l = t.split(" ");
            let c;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (i)
                    for (c = 0; c < l.length; c += 1) {
                        const e = l[c];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                        t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                        t.dom7LiveListeners[e].push({
                            listener: n,
                            proxyListener: s
                        }),
                        t.addEventListener(e, s, r)
                    }
                else
                    for (c = 0; c < l.length; c += 1) {
                        const e = l[c];
                        t.dom7Listeners || (t.dom7Listeners = {}),
                        t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                        t.dom7Listeners[e].push({
                            listener: n,
                            proxyListener: a
                        }),
                        t.addEventListener(e, a, r)
                    }
            }
            return this
        },
        off: function(...e) {
            let [t, i, n, r] = e;
            "function" == typeof e[1] && ([t, n, r] = e, i = void 0),
            r || (r = !1);
            const s = t.split(" ");
            for (let e = 0; e < s.length; e += 1) {
                const t = s[e];
                for (let e = 0; e < this.length; e += 1) {
                    const s = this[e];
                    let o;
                    if (!i && s.dom7Listeners ? o = s.dom7Listeners[t] : i && s.dom7LiveListeners && (o = s.dom7LiveListeners[t]), o && o.length)
                        for (let e = o.length - 1; e >= 0; e -= 1) {
                            const i = o[e];
                            n && i.listener === n || n && i.listener && i.listener.dom7proxy && i.listener.dom7proxy === n ? (s.removeEventListener(t, i.proxyListener, r), o.splice(e, 1)) : n || (s.removeEventListener(t, i.proxyListener, r), o.splice(e, 1))
                        }
                }
            }
            return this
        },
        trigger: function(...e) {
            const t = e[0].split(" "),
                i = e[1];
            for (let s = 0; s < t.length; s += 1) {
                const o = t[s];
                for (let t = 0; t < this.length; t += 1) {
                    const s = this[t];
                    let a;
                    try {
                        a = new r.CustomEvent(o, {
                            detail: i,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        a = n.createEvent("Event"),
                        a.initEvent(o, !0, !0),
                        a.detail = i
                    }
                    s.dom7EventData = e.filter((e, t) => t > 0),
                    s.dispatchEvent(a),
                    s.dom7EventData = [],
                    delete s.dom7EventData
                }
            }
            return this
        },
        transitionEnd: function(e) {
            const t = ["webkitTransitionEnd", "transitionend"],
                i = this;
            let n;
            function r(s) {
                if (s.target === this)
                    for (e.call(this, s), n = 0; n < t.length; n += 1)
                        i.off(t[n], r)
            }
            if (e)
                for (n = 0; n < t.length; n += 1)
                    i.on(t[n], r);
            return this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (this.length > 0) {
                const e = this[0],
                    t = e.getBoundingClientRect(),
                    i = n.body,
                    s = e.clientTop || i.clientTop || 0,
                    o = e.clientLeft || i.clientLeft || 0,
                    a = e === r ? r.scrollY : e.scrollTop,
                    l = e === r ? r.scrollX : e.scrollLeft;
                return {
                    top: t.top + a - s,
                    left: t.left + l - o
                }
            }
            return null
        },
        css: function(e, t) {
            let i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (let t in e)
                            this[i].style[t] = e[t];
                    return this
                }
                if (this[0])
                    return r.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1)
                    this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            if (!e)
                return this;
            for (let t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t]))
                    return this;
            return this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : void 0;
            for (let t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(e) {
            const t = this[0];
            let i,
                a;
            if (!t || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (t.matches)
                    return t.matches(e);
                if (t.webkitMatchesSelector)
                    return t.webkitMatchesSelector(e);
                if (t.msMatchesSelector)
                    return t.msMatchesSelector(e);
                for (i = o(e), a = 0; a < i.length; a += 1)
                    if (i[a] === t)
                        return !0;
                return !1
            }
            if (e === n)
                return t === n;
            if (e === r)
                return t === r;
            if (e.nodeType || e instanceof s) {
                for (i = e.nodeType ? [e] : e, a = 0; a < i.length; a += 1)
                    if (i[a] === t)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            let e,
                t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);)
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            const t = this.length;
            let i;
            return e > t - 1 ? new s([]) : e < 0 ? (i = t + e, new s(i < 0 ? [] : [this[i]])) : new s([this[e]])
        },
        append: function(...e) {
            let t;
            for (let i = 0; i < e.length; i += 1) {
                t = e[i];
                for (let e = 0; e < this.length; e += 1)
                    if ("string" == typeof t) {
                        const i = n.createElement("div");
                        for (i.innerHTML = t; i.firstChild;)
                            this[e].appendChild(i.firstChild)
                    } else if (t instanceof s)
                        for (let i = 0; i < t.length; i += 1)
                            this[e].appendChild(t[i]);
                    else
                        this[e].appendChild(t)
            }
            return this
        },
        prepend: function(e) {
            let t,
                i;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    const r = n.createElement("div");
                    for (r.innerHTML = e, i = r.childNodes.length - 1; i >= 0; i -= 1)
                        this[t].insertBefore(r.childNodes[i], this[t].childNodes[0])
                } else if (e instanceof s)
                    for (i = 0; i < e.length; i += 1)
                        this[t].insertBefore(e[i], this[t].childNodes[0]);
                else
                    this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && o(this[0].nextElementSibling).is(e) ? new s([this[0].nextElementSibling]) : new s([]) : this[0].nextElementSibling ? new s([this[0].nextElementSibling]) : new s([]) : new s([])
        },
        nextAll: function(e) {
            const t = [];
            let i = this[0];
            if (!i)
                return new s([]);
            for (; i.nextElementSibling;) {
                const n = i.nextElementSibling;
                e ? o(n).is(e) && t.push(n) : t.push(n),
                i = n
            }
            return new s(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                const t = this[0];
                return e ? t.previousElementSibling && o(t.previousElementSibling).is(e) ? new s([t.previousElementSibling]) : new s([]) : t.previousElementSibling ? new s([t.previousElementSibling]) : new s([])
            }
            return new s([])
        },
        prevAll: function(e) {
            const t = [];
            let i = this[0];
            if (!i)
                return new s([]);
            for (; i.previousElementSibling;) {
                const n = i.previousElementSibling;
                e ? o(n).is(e) && t.push(n) : t.push(n),
                i = n
            }
            return new s(t)
        },
        parent: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1)
                null !== this[i].parentNode && (e ? o(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return o(a(t))
        },
        parents: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1) {
                let n = this[i].parentNode;
                for (; n;)
                    e ? o(n).is(e) && t.push(n) : t.push(n),
                    n = n.parentNode
            }
            return o(a(t))
        },
        closest: function(e) {
            let t = this;
            return void 0 === e ? new s([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1) {
                const n = this[i].querySelectorAll(e);
                for (let e = 0; e < n.length; e += 1)
                    t.push(n[e])
            }
            return new s(t)
        },
        children: function(e) {
            const t = [];
            for (let i = 0; i < this.length; i += 1) {
                const n = this[i].childNodes;
                for (let i = 0; i < n.length; i += 1)
                    e ? 1 === n[i].nodeType && o(n[i]).is(e) && t.push(n[i]) : 1 === n[i].nodeType && t.push(n[i])
            }
            return new s(a(t))
        },
        remove: function() {
            for (let e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function(...e) {
            const t = this;
            let i,
                n;
            for (i = 0; i < e.length; i += 1) {
                const r = o(e[i]);
                for (n = 0; n < r.length; n += 1)
                    t[t.length] = r[n],
                    t.length += 1
            }
            return t
        },
        styles: function() {
            return this[0] ? r.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(l).forEach(e => {
        o.fn[e] = o.fn[e] || l[e]
    });
    const c = {
            deleteProps(e) {
                const t = e;
                Object.keys(t).forEach(e => {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            },
            nextTick: (e, t=0) => setTimeout(e, t),
            now: () => Date.now(),
            getTranslate(e, t="x") {
                let i,
                    n,
                    s;
                const o = r.getComputedStyle(e, null);
                return r.WebKitCSSMatrix ? (n = o.transform || o.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(e => e.replace(",", ".")).join(", ")), s = new r.WebKitCSSMatrix("none" === n ? "" : n)) : (s = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), "x" === t && (n = r.WebKitCSSMatrix ? s.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = r.WebKitCSSMatrix ? s.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), n || 0
            },
            parseUrlQuery(e) {
                const t = {};
                let i,
                    n,
                    s,
                    o,
                    a = e || r.location.href;
                if ("string" == typeof a && a.length)
                    for (a = a.indexOf("?") > -1 ? a.replace(/\S*\?/, "") : "", n = a.split("&").filter(e => "" !== e), o = n.length, i = 0; i < o; i += 1)
                        s = n[i].replace(/#\S+/g, "").split("="),
                        t[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "";
                return t
            },
            isObject: e => "object" == typeof e && null !== e && e.constructor && e.constructor === Object,
            extend(...e) {
                const t = Object(e[0]);
                for (let i = 1; i < e.length; i += 1) {
                    const n = e[i];
                    if (null != n) {
                        const e = Object.keys(Object(n));
                        for (let i = 0, r = e.length; i < r; i += 1) {
                            const r = e[i],
                                s = Object.getOwnPropertyDescriptor(n, r);
                            void 0 !== s && s.enumerable && (c.isObject(t[r]) && c.isObject(n[r]) ? c.extend(t[r], n[r]) : !c.isObject(t[r]) && c.isObject(n[r]) ? (t[r] = {}, c.extend(t[r], n[r])) : t[r] = n[r])
                        }
                    }
                }
                return t
            }
        },
        d = function() {
            const e = n.createElement("div");
            return {
                touch: r.Modernizr && !0 === r.Modernizr.touch || !!(r.navigator.maxTouchPoints > 0 || "ontouchstart" in r || r.DocumentTouch && n instanceof r.DocumentTouch),
                pointerEvents: !!(r.navigator.pointerEnabled || r.PointerEvent || "maxTouchPoints" in r.navigator && r.navigator.maxTouchPoints > 0),
                prefixedPointerEvents: !!r.navigator.msPointerEnabled,
                transition: function() {
                    const t = e.style;
                    return "transition" in t || "webkitTransition" in t || "MozTransition" in t
                }(),
                transforms3d: r.Modernizr && !0 === r.Modernizr.csstransforms3d || function() {
                    const t = e.style;
                    return "webkitPerspective" in t || "MozPerspective" in t || "OPerspective" in t || "MsPerspective" in t || "perspective" in t
                }(),
                flexbox: function() {
                    const t = e.style,
                        i = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" ");
                    for (let e = 0; e < i.length; e += 1)
                        if (i[e] in t)
                            return !0;
                    return !1
                }(),
                observer: "MutationObserver" in r || "WebkitMutationObserver" in r,
                passiveListener: function() {
                    let e = !1;
                    try {
                        const t = Object.defineProperty({}, "passive", {
                            get() {
                                e = !0
                            }
                        });
                        r.addEventListener("testPassiveListener", null, t)
                    } catch (e) {}
                    return e
                }(),
                gestures: "ongesturestart" in r
            }
        }(),
        u = {
            isIE: !!r.navigator.userAgent.match(/Trident/g) || !!r.navigator.userAgent.match(/MSIE/g),
            isEdge: !!r.navigator.userAgent.match(/Edge/g),
            isSafari: function() {
                const e = r.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(r.navigator.userAgent)
        };
    class p {
        constructor(e={})
        {
            const t = this;
            t.params = e,
            t.eventsListeners = {},
            t.params && t.params.on && Object.keys(t.params.on).forEach(e => {
                t.on(e, t.params.on[e])
            })
        }
        on(e, t, i)
        {
            const n = this;
            if ("function" != typeof t)
                return n;
            const r = i ? "unshift" : "push";
            return e.split(" ").forEach(e => {
                n.eventsListeners[e] || (n.eventsListeners[e] = []),
                n.eventsListeners[e][r](t)
            }), n
        }
        once(e, t, i)
        {
            const n = this;
            if ("function" != typeof t)
                return n;
            function r(...i) {
                t.apply(n, i),
                n.off(e, r),
                r.f7proxy && delete r.f7proxy
            }
            return r.f7proxy = t, n.on(e, r, i)
        }
        off(e, t)
        {
            const i = this;
            return i.eventsListeners ? (e.split(" ").forEach(e => {
                void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((n, r) => {
                    (n === t || n.f7proxy && n.f7proxy === t) && i.eventsListeners[e].splice(r, 1)
                })
            }), i) : i
        }
        emit(...e)
        {
            const t = this;
            if (!t.eventsListeners)
                return t;
            let i,
                n,
                r;
            return "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], n = e.slice(1, e.length), r = t) : (i = e[0].events, n = e[0].data, r = e[0].context || t), (Array.isArray(i) ? i : i.split(" ")).forEach(e => {
                if (t.eventsListeners && t.eventsListeners[e]) {
                    const i = [];
                    t.eventsListeners[e].forEach(e => {
                        i.push(e)
                    }),
                    i.forEach(e => {
                        e.apply(r, n)
                    })
                }
            }), t
        }
        useModulesParams(e)
        {
            const t = this;
            t.modules && Object.keys(t.modules).forEach(i => {
                const n = t.modules[i];
                n.params && c.extend(e, n.params)
            })
        }
        useModules(e={})
        {
            const t = this;
            t.modules && Object.keys(t.modules).forEach(i => {
                const n = t.modules[i],
                    r = e[i] || {};
                n.instance && Object.keys(n.instance).forEach(e => {
                    const i = n.instance[e];
                    t[e] = "function" == typeof i ? i.bind(t) : i
                }),
                n.on && t.on && Object.keys(n.on).forEach(e => {
                    t.on(e, n.on[e])
                }),
                n.create && n.create.bind(t)(r)
            })
        }
        static set components(e)
        {
            this.use && this.use(e)
        }
        static installModule(e, ...t)
        {
            const i = this;
            i.prototype.modules || (i.prototype.modules = {});
            const n = e.name || `${Object.keys(i.prototype.modules).length}_${c.now()}`;
            return i.prototype.modules[n] = e, e.proto && Object.keys(e.proto).forEach(t => {
                i.prototype[t] = e.proto[t]
            }), e.static && Object.keys(e.static).forEach(t => {
                i[t] = e.static[t]
            }), e.install && e.install.apply(i, t), i
        }
        static use(e, ...t)
        {
            const i = this;
            return Array.isArray(e) ? (e.forEach(e => i.installModule(e)), i) : i.installModule(e, ...t)
        }
    }
    var h = {
        updateSize: function() {
            const e = this;
            let t,
                i;
            const n = e.$el;
            t = void 0 !== e.params.width ? e.params.width : n[0].clientWidth,
            i = void 0 !== e.params.height ? e.params.height : n[0].clientHeight,
            0 === t && e.isHorizontal() || 0 === i && e.isVertical() || (t = t - parseInt(n.css("padding-left"), 10) - parseInt(n.css("padding-right"), 10), i = i - parseInt(n.css("padding-top"), 10) - parseInt(n.css("padding-bottom"), 10), c.extend(e, {
                width: t,
                height: i,
                size: e.isHorizontal() ? t : i
            }))
        },
        updateSlides: function() {
            const e = this,
                t = e.params,
                {$wrapperEl: i, size: n, rtlTranslate: s, wrongRTL: o} = e,
                a = e.virtual && t.virtual.enabled,
                l = a ? e.virtual.slides.length : e.slides.length,
                p = i.children(`.${e.params.slideClass}`),
                h = a ? e.virtual.slides.length : p.length;
            let f = [];
            const m = [],
                g = [];
            let v = t.slidesOffsetBefore;
            "function" == typeof v && (v = t.slidesOffsetBefore.call(e));
            let y = t.slidesOffsetAfter;
            "function" == typeof y && (y = t.slidesOffsetAfter.call(e));
            const b = e.snapGrid.length,
                w = e.snapGrid.length;
            let x,
                T,
                E = t.spaceBetween,
                S = -v,
                C = 0,
                k = 0;
            if (void 0 === n)
                return;
            "string" == typeof E && E.indexOf("%") >= 0 && (E = parseFloat(E.replace("%", "")) / 100 * n),
            e.virtualSize = -E,
            s ? p.css({
                marginLeft: "",
                marginTop: ""
            }) : p.css({
                marginRight: "",
                marginBottom: ""
            }),
            t.slidesPerColumn > 1 && (x = Math.floor(h / t.slidesPerColumn) === h / e.params.slidesPerColumn ? h : Math.ceil(h / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
            const M = t.slidesPerColumn,
                $ = x / M,
                z = Math.floor(h / t.slidesPerColumn);
            for (let i = 0; i < h; i += 1) {
                T = 0;
                const s = p.eq(i);
                if (t.slidesPerColumn > 1) {
                    let n,
                        r,
                        o;
                    if ("column" === t.slidesPerColumnFill || "row" === t.slidesPerColumnFill && t.slidesPerGroup > 1) {
                        if ("column" === t.slidesPerColumnFill)
                            r = Math.floor(i / M),
                            o = i - r * M,
                            (r > z || r === z && o === M - 1) && (o += 1, o >= M && (o = 0, r += 1));
                        else {
                            const e = Math.floor(i / t.slidesPerGroup);
                            o = Math.floor(i / t.slidesPerView) - e * t.slidesPerColumn,
                            r = i - o * t.slidesPerView - e * t.slidesPerView
                        }
                        n = r + o * x / M,
                        s.css({
                            "-webkit-box-ordinal-group": n,
                            "-moz-box-ordinal-group": n,
                            "-ms-flex-order": n,
                            "-webkit-order": n,
                            order: n
                        })
                    } else
                        o = Math.floor(i / $),
                        r = i - o * $;
                    s.css(`margin-${e.isHorizontal() ? "top" : "left"}`, 0 !== o && t.spaceBetween && `${t.spaceBetween}px`).attr("data-swiper-column", r).attr("data-swiper-row", o)
                }
                if ("none" !== s.css("display")) {
                    if ("auto" === t.slidesPerView) {
                        const i = r.getComputedStyle(s[0], null),
                            n = s[0].style.transform,
                            o = s[0].style.webkitTransform;
                        if (n && (s[0].style.transform = "none"), o && (s[0].style.webkitTransform = "none"), t.roundLengths)
                            T = e.isHorizontal() ? s.outerWidth(!0) : s.outerHeight(!0);
                        else if (e.isHorizontal()) {
                            const e = parseFloat(i.getPropertyValue("width")),
                                t = parseFloat(i.getPropertyValue("padding-left")),
                                n = parseFloat(i.getPropertyValue("padding-right")),
                                r = parseFloat(i.getPropertyValue("margin-left")),
                                s = parseFloat(i.getPropertyValue("margin-right")),
                                o = i.getPropertyValue("box-sizing");
                            T = o && "border-box" === o && !u.isIE ? e + r + s : e + t + n + r + s
                        } else {
                            const e = parseFloat(i.getPropertyValue("height")),
                                t = parseFloat(i.getPropertyValue("padding-top")),
                                n = parseFloat(i.getPropertyValue("padding-bottom")),
                                r = parseFloat(i.getPropertyValue("margin-top")),
                                s = parseFloat(i.getPropertyValue("margin-bottom")),
                                o = i.getPropertyValue("box-sizing");
                            T = o && "border-box" === o && !u.isIE ? e + r + s : e + t + n + r + s
                        }
                        n && (s[0].style.transform = n),
                        o && (s[0].style.webkitTransform = o),
                        t.roundLengths && (T = Math.floor(T))
                    } else
                        T = (n - (t.slidesPerView - 1) * E) / t.slidesPerView,
                        t.roundLengths && (T = Math.floor(T)),
                        p[i] && (e.isHorizontal() ? p[i].style.width = `${T}px` : p[i].style.height = `${T}px`);
                    p[i] && (p[i].swiperSlideSize = T),
                    g.push(T),
                    t.centeredSlides ? (S = S + T / 2 + C / 2 + E, 0 === C && 0 !== i && (S = S - n / 2 - E), 0 === i && (S = S - n / 2 - E), Math.abs(S) < .001 && (S = 0), t.roundLengths && (S = Math.floor(S)), k % t.slidesPerGroup == 0 && f.push(S), m.push(S)) : (t.roundLengths && (S = Math.floor(S)), k % t.slidesPerGroup == 0 && f.push(S), m.push(S), S = S + T + E),
                    e.virtualSize += T + E,
                    C = T,
                    k += 1
                }
            }
            let L;
            if (e.virtualSize = Math.max(e.virtualSize, n) + y, s && o && ("slide" === t.effect || "coverflow" === t.effect) && i.css({
                width: `${e.virtualSize + t.spaceBetween}px`
            }), d.flexbox && !t.setWrapperSize || (e.isHorizontal() ? i.css({
                width: `${e.virtualSize + t.spaceBetween}px`
            }) : i.css({
                height: `${e.virtualSize + t.spaceBetween}px`
            })), t.slidesPerColumn > 1 && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? i.css({
                width: `${e.virtualSize + t.spaceBetween}px`
            }) : i.css({
                height: `${e.virtualSize + t.spaceBetween}px`
            }), t.centeredSlides)) {
                L = [];
                for (let i = 0; i < f.length; i += 1) {
                    let n = f[i];
                    t.roundLengths && (n = Math.floor(n)),
                    f[i] < e.virtualSize + f[0] && L.push(n)
                }
                f = L
            }
            if (!t.centeredSlides) {
                L = [];
                for (let i = 0; i < f.length; i += 1) {
                    let r = f[i];
                    t.roundLengths && (r = Math.floor(r)),
                    f[i] <= e.virtualSize - n && L.push(r)
                }
                f = L,
                Math.floor(e.virtualSize - n) - Math.floor(f[f.length - 1]) > 1 && f.push(e.virtualSize - n)
            }
            if (0 === f.length && (f = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? p.css({
                marginLeft: `${E}px`
            }) : p.css({
                marginRight: `${E}px`
            }) : p.css({
                marginBottom: `${E}px`
            })), t.centerInsufficientSlides) {
                let e = 0;
                if (g.forEach(i => {
                    e += i + (t.spaceBetween ? t.spaceBetween : 0)
                }), e -= t.spaceBetween, e < n) {
                    const t = (n - e) / 2;
                    f.forEach((e, i) => {
                        f[i] = e - t
                    }),
                    m.forEach((e, i) => {
                        m[i] = e + t
                    })
                }
            }
            c.extend(e, {
                slides: p,
                snapGrid: f,
                slidesGrid: m,
                slidesSizesGrid: g
            }),
            h !== l && e.emit("slidesLengthChange"),
            f.length !== b && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")),
            m.length !== w && e.emit("slidesGridLengthChange"),
            (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
        },
        updateAutoHeight: function(e) {
            const t = this,
                i = [];
            let n,
                r = 0;
            if ("number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed), "auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                    const e = t.activeIndex + n;
                    if (e > t.slides.length)
                        break;
                    i.push(t.slides.eq(e)[0])
                }
            else
                i.push(t.slides.eq(t.activeIndex)[0]);
            for (n = 0; n < i.length; n += 1)
                if (void 0 !== i[n]) {
                    const e = i[n].offsetHeight;
                    r = e > r ? e : r
                }
            r && t.$wrapperEl.css("height", `${r}px`)
        },
        updateSlidesOffset: function() {
            const e = this,
                t = e.slides;
            for (let i = 0; i < t.length; i += 1)
                t[i].swiperSlideOffset = e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop
        },
        updateSlidesProgress: function(e=this && this.translate || 0) {
            const t = this,
                i = t.params,
                {slides: n, rtlTranslate: r} = t;
            if (0 === n.length)
                return;
            void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
            let s = -e;
            r && (s = e),
            n.removeClass(i.slideVisibleClass),
            t.visibleSlidesIndexes = [],
            t.visibleSlides = [];
            for (let e = 0; e < n.length; e += 1) {
                const o = n[e],
                    a = (s + (i.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + i.spaceBetween);
                if (i.watchSlidesVisibility) {
                    const r = -(s - o.swiperSlideOffset),
                        a = r + t.slidesSizesGrid[e];
                    (r >= 0 && r < t.size - 1 || a > 1 && a <= t.size || r <= 0 && a >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), n.eq(e).addClass(i.slideVisibleClass))
                }
                o.progress = r ? -a : a
            }
            t.visibleSlides = o(t.visibleSlides)
        },
        updateProgress: function(e=this && this.translate || 0) {
            const t = this,
                i = t.params,
                n = t.maxTranslate() - t.minTranslate();
            let {progress: r, isBeginning: s, isEnd: o} = t;
            const a = s,
                l = o;
            0 === n ? (r = 0, s = !0, o = !0) : (r = (e - t.minTranslate()) / n, s = r <= 0, o = r >= 1),
            c.extend(t, {
                progress: r,
                isBeginning: s,
                isEnd: o
            }),
            (i.watchSlidesProgress || i.watchSlidesVisibility) && t.updateSlidesProgress(e),
            s && !a && t.emit("reachBeginning toEdge"),
            o && !l && t.emit("reachEnd toEdge"),
            (a && !s || l && !o) && t.emit("fromEdge"),
            t.emit("progress", r)
        },
        updateSlidesClasses: function() {
            const e = this,
                {slides: t, params: i, $wrapperEl: n, activeIndex: r, realIndex: s} = e,
                o = e.virtual && i.virtual.enabled;
            let a;
            t.removeClass(`${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`),
            a = o ? e.$wrapperEl.find(`.${i.slideClass}[data-swiper-slide-index="${r}"]`) : t.eq(r),
            a.addClass(i.slideActiveClass),
            i.loop && (a.hasClass(i.slideDuplicateClass) ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${s}"]`).addClass(i.slideDuplicateActiveClass) : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${s}"]`).addClass(i.slideDuplicateActiveClass));
            let l = a.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === l.length && (l = t.eq(0), l.addClass(i.slideNextClass));
            let c = a.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === c.length && (c = t.eq(-1), c.addClass(i.slidePrevClass)),
            i.loop && (l.hasClass(i.slideDuplicateClass) ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass) : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass), c.hasClass(i.slideDuplicateClass) ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass) : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            const t = this,
                i = t.rtlTranslate ? t.translate : -t.translate,
                {slidesGrid: n, snapGrid: r, params: s, activeIndex: o, realIndex: a, snapIndex: l} = t;
            let d,
                u = e;
            if (void 0 === u) {
                for (let e = 0; e < n.length; e += 1)
                    void 0 !== n[e + 1] ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2 ? u = e : i >= n[e] && i < n[e + 1] && (u = e + 1) : i >= n[e] && (u = e);
                s.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0)
            }
            if (d = r.indexOf(i) >= 0 ? r.indexOf(i) : Math.floor(u / s.slidesPerGroup), d >= r.length && (d = r.length - 1), u === o)
                return void (d !== l && (t.snapIndex = d, t.emit("snapIndexChange")));
            const p = parseInt(t.slides.eq(u).attr("data-swiper-slide-index") || u, 10);
            c.extend(t, {
                snapIndex: d,
                realIndex: p,
                previousIndex: o,
                activeIndex: u
            }),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            a !== p && t.emit("realIndexChange"),
            (t.initialized || t.runCallbacksOnInit) && t.emit("slideChange")
        },
        updateClickedSlide: function(e) {
            const t = this,
                i = t.params,
                n = o(e.target).closest(`.${i.slideClass}`)[0];
            let r = !1;
            if (n)
                for (let e = 0; e < t.slides.length; e += 1)
                    t.slides[e] === n && (r = !0);
            if (!n || !r)
                return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
            t.clickedSlide = n,
            t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(o(n).attr("data-swiper-slide-index"), 10) : t.clickedIndex = o(n).index(),
            i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var f = {
        getTranslate: function(e=(this.isHorizontal() ? "x" : "y")) {
            const {params: t, rtlTranslate: i, translate: n, $wrapperEl: r} = this;
            if (t.virtualTranslate)
                return i ? -n : n;
            let s = c.getTranslate(r[0], e);
            return i && (s = -s), s || 0
        },
        setTranslate: function(e, t) {
            const i = this,
                {rtlTranslate: n, params: r, $wrapperEl: s, progress: o} = i;
            let a,
                l = 0,
                c = 0;
            i.isHorizontal() ? l = n ? -e : e : c = e,
            r.roundLengths && (l = Math.floor(l), c = Math.floor(c)),
            r.virtualTranslate || (d.transforms3d ? s.transform(`translate3d(${l}px, ${c}px, 0px)`) : s.transform(`translate(${l}px, ${c}px)`)),
            i.previousTranslate = i.translate,
            i.translate = i.isHorizontal() ? l : c;
            const u = i.maxTranslate() - i.minTranslate();
            a = 0 === u ? 0 : (e - i.minTranslate()) / u,
            a !== o && i.updateProgress(e),
            i.emit("setTranslate", i.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var m = {
        setTransition: function(e, t) {
            this.$wrapperEl.transition(e),
            this.emit("setTransition", e, t)
        },
        transitionStart: function(e=!0, t) {
            const i = this,
                {activeIndex: n, params: r, previousIndex: s} = i;
            r.autoHeight && i.updateAutoHeight();
            let o = t;
            if (o || (o = n > s ? "next" : n < s ? "prev" : "reset"), i.emit("transitionStart"), e && n !== s) {
                if ("reset" === o)
                    return void i.emit("slideResetTransitionStart");
                i.emit("slideChangeTransitionStart"),
                "next" === o ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function(e=!0, t) {
            const i = this,
                {activeIndex: n, previousIndex: r} = i;
            i.animating = !1,
            i.setTransition(0);
            let s = t;
            if (s || (s = n > r ? "next" : n < r ? "prev" : "reset"), i.emit("transitionEnd"), e && n !== r) {
                if ("reset" === s)
                    return void i.emit("slideResetTransitionEnd");
                i.emit("slideChangeTransitionEnd"),
                "next" === s ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd")
            }
        }
    };
    var g = {
        slideTo: function(e=0, t=this.params.speed, i=!0, n) {
            const r = this;
            let s = e;
            s < 0 && (s = 0);
            const {params: o, snapGrid: a, slidesGrid: l, previousIndex: c, activeIndex: u, rtlTranslate: p} = r;
            if (r.animating && o.preventInteractionOnTransition)
                return !1;
            let h = Math.floor(s / o.slidesPerGroup);
            h >= a.length && (h = a.length - 1),
            (u || o.initialSlide || 0) === (c || 0) && i && r.emit("beforeSlideChangeStart");
            const f = -a[h];
            if (r.updateProgress(f), o.normalizeSlideIndex)
                for (let e = 0; e < l.length; e += 1)
                    -Math.floor(100 * f) >= Math.floor(100 * l[e]) && (s = e);
            if (r.initialized && s !== u) {
                if (!r.allowSlideNext && f < r.translate && f < r.minTranslate())
                    return !1;
                if (!r.allowSlidePrev && f > r.translate && f > r.maxTranslate() && (u || 0) !== s)
                    return !1
            }
            let m;
            return m = s > u ? "next" : s < u ? "prev" : "reset", p && -f === r.translate || !p && f === r.translate ? (r.updateActiveIndex(s), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(f), "reset" !== m && (r.transitionStart(i, m), r.transitionEnd(i, m)), !1) : (0 !== t && d.transition ? (r.setTransition(t), r.setTranslate(f), r.updateActiveIndex(s), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, n), r.transitionStart(i, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, m))
            }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))) : (r.setTransition(0), r.setTranslate(f), r.updateActiveIndex(s), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, n), r.transitionStart(i, m), r.transitionEnd(i, m)), !0)
        },
        slideToLoop: function(e=0, t=this.params.speed, i=!0, n) {
            const r = this;
            let s = e;
            return r.params.loop && (s += r.loopedSlides), r.slideTo(s, t, i, n)
        },
        slideNext: function(e=this.params.speed, t=!0, i) {
            const n = this,
                {params: r, animating: s} = n;
            return r.loop ? !s && (n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft, n.slideTo(n.activeIndex + r.slidesPerGroup, e, t, i)) : n.slideTo(n.activeIndex + r.slidesPerGroup, e, t, i)
        },
        slidePrev: function(e=this.params.speed, t=!0, i) {
            const n = this,
                {params: r, animating: s, snapGrid: o, slidesGrid: a, rtlTranslate: l} = n;
            if (r.loop) {
                if (s)
                    return !1;
                n.loopFix(),
                n._clientLeft = n.$wrapperEl[0].clientLeft
            }
            function c(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const d = c(l ? n.translate : -n.translate),
                u = o.map(e => c(e)),
                p = (a.map(e => c(e)), o[u.indexOf(d)], o[u.indexOf(d) - 1]);
            let h;
            return void 0 !== p && (h = a.indexOf(p), h < 0 && (h = n.activeIndex - 1)), n.slideTo(h, e, t, i)
        },
        slideReset: function(e=this.params.speed, t=!0, i) {
            return this.slideTo(this.activeIndex, e, t, i)
        },
        slideToClosest: function(e=this.params.speed, t=!0, i) {
            const n = this;
            let r = n.activeIndex;
            const s = Math.floor(r / n.params.slidesPerGroup);
            if (s < n.snapGrid.length - 1) {
                const e = n.rtlTranslate ? n.translate : -n.translate,
                    t = n.snapGrid[s];
                e - t > (n.snapGrid[s + 1] - t) / 2 && (r = n.params.slidesPerGroup)
            }
            return n.slideTo(r, e, t, i)
        },
        slideToClickedSlide: function() {
            const e = this,
                {params: t, $wrapperEl: i} = e,
                n = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let r,
                s = e.clickedIndex;
            if (t.loop) {
                if (e.animating)
                    return;
                r = parseInt(o(e.clickedSlide).attr("data-swiper-slide-index"), 10),
                t.centeredSlides ? s < e.loopedSlides - n / 2 || s > e.slides.length - e.loopedSlides + n / 2 ? (e.loopFix(), s = i.children(`.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), c.nextTick(() => {
                    e.slideTo(s)
                })) : e.slideTo(s) : s > e.slides.length - n ? (e.loopFix(), s = i.children(`.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), c.nextTick(() => {
                    e.slideTo(s)
                })) : e.slideTo(s)
            } else
                e.slideTo(s)
        }
    };
    var v = {
        loopCreate: function() {
            const e = this,
                {params: t, $wrapperEl: i} = e;
            i.children(`.${t.slideClass}.${t.slideDuplicateClass}`).remove();
            let r = i.children(`.${t.slideClass}`);
            if (t.loopFillGroupWithBlank) {
                const e = t.slidesPerGroup - r.length % t.slidesPerGroup;
                if (e !== t.slidesPerGroup) {
                    for (let r = 0; r < e; r += 1) {
                        const e = o(n.createElement("div")).addClass(`${t.slideClass} ${t.slideBlankClass}`);
                        i.append(e)
                    }
                    r = i.children(`.${t.slideClass}`)
                }
            }
            "auto" !== t.slidesPerView || t.loopedSlides || (t.loopedSlides = r.length),
            e.loopedSlides = parseInt(t.loopedSlides || t.slidesPerView, 10),
            e.loopedSlides += t.loopAdditionalSlides,
            e.loopedSlides > r.length && (e.loopedSlides = r.length);
            const s = [],
                a = [];
            r.each((t, i) => {
                const n = o(i);
                t < e.loopedSlides && a.push(i),
                t < r.length && t >= r.length - e.loopedSlides && s.push(i),
                n.attr("data-swiper-slide-index", t)
            });
            for (let e = 0; e < a.length; e += 1)
                i.append(o(a[e].cloneNode(!0)).addClass(t.slideDuplicateClass));
            for (let e = s.length - 1; e >= 0; e -= 1)
                i.prepend(o(s[e].cloneNode(!0)).addClass(t.slideDuplicateClass))
        },
        loopFix: function() {
            const e = this,
                {params: t, activeIndex: i, slides: n, loopedSlides: r, allowSlidePrev: s, allowSlideNext: o, snapGrid: a, rtlTranslate: l} = e;
            let c;
            e.allowSlidePrev = !0,
            e.allowSlideNext = !0;
            const d = -a[i] - e.getTranslate();
            if (i < r) {
                c = n.length - 3 * r + i,
                c += r,
                e.slideTo(c, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)
            } else if ("auto" === t.slidesPerView && i >= 2 * r || i >= n.length - r) {
                c = -n.length + i + r,
                c += r,
                e.slideTo(c, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)
            }
            e.allowSlidePrev = s,
            e.allowSlideNext = o
        },
        loopDestroy: function() {
            const {$wrapperEl: e, params: t, slides: i} = this;
            e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),
            i.removeAttr("data-swiper-slide-index")
        }
    };
    var y = {
        setGrabCursor: function(e) {
            if (d.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)
                return;
            const t = this.el;
            t.style.cursor = "move",
            t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
            t.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
            t.style.cursor = e ? "grabbing" : "grab"
        },
        unsetGrabCursor: function() {
            d.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var b = {
        appendSlide: function(e) {
            const t = this,
                {$wrapperEl: i, params: n} = t;
            if (n.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                for (let t = 0; t < e.length; t += 1)
                    e[t] && i.append(e[t]);
            else
                i.append(e);
            n.loop && t.loopCreate(),
            n.observer && d.observer || t.update()
        },
        prependSlide: function(e) {
            const t = this,
                {params: i, $wrapperEl: n, activeIndex: r} = t;
            i.loop && t.loopDestroy();
            let s = r + 1;
            if ("object" == typeof e && "length" in e) {
                for (let t = 0; t < e.length; t += 1)
                    e[t] && n.prepend(e[t]);
                s = r + e.length
            } else
                n.prepend(e);
            i.loop && t.loopCreate(),
            i.observer && d.observer || t.update(),
            t.slideTo(s, 0, !1)
        },
        addSlide: function(e, t) {
            const i = this,
                {$wrapperEl: n, params: r, activeIndex: s} = i;
            let o = s;
            r.loop && (o -= i.loopedSlides, i.loopDestroy(), i.slides = n.children(`.${r.slideClass}`));
            const a = i.slides.length;
            if (e <= 0)
                return void i.prependSlide(t);
            if (e >= a)
                return void i.appendSlide(t);
            let l = o > e ? o + 1 : o;
            const c = [];
            for (let t = a - 1; t >= e; t -= 1) {
                const e = i.slides.eq(t);
                e.remove(),
                c.unshift(e)
            }
            if ("object" == typeof t && "length" in t) {
                for (let e = 0; e < t.length; e += 1)
                    t[e] && n.append(t[e]);
                l = o > e ? o + t.length : o
            } else
                n.append(t);
            for (let e = 0; e < c.length; e += 1)
                n.append(c[e]);
            r.loop && i.loopCreate(),
            r.observer && d.observer || i.update(),
            r.loop ? i.slideTo(l + i.loopedSlides, 0, !1) : i.slideTo(l, 0, !1)
        },
        removeSlide: function(e) {
            const t = this,
                {params: i, $wrapperEl: n, activeIndex: r} = t;
            let s = r;
            i.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = n.children(`.${i.slideClass}`));
            let o,
                a = s;
            if ("object" == typeof e && "length" in e) {
                for (let i = 0; i < e.length; i += 1)
                    o = e[i],
                    t.slides[o] && t.slides.eq(o).remove(),
                    o < a && (a -= 1);
                a = Math.max(a, 0)
            } else
                o = e,
                t.slides[o] && t.slides.eq(o).remove(),
                o < a && (a -= 1),
                a = Math.max(a, 0);
            i.loop && t.loopCreate(),
            i.observer && d.observer || t.update(),
            i.loop ? t.slideTo(a + t.loopedSlides, 0, !1) : t.slideTo(a, 0, !1)
        },
        removeAllSlides: function() {
            const e = this,
                t = [];
            for (let i = 0; i < e.slides.length; i += 1)
                t.push(i);
            e.removeSlide(t)
        }
    };
    const w = function() {
        const e = r.navigator.userAgent,
            t = {
                ios: !1,
                android: !1,
                androidChrome: !1,
                desktop: !1,
                windows: !1,
                iphone: !1,
                ipod: !1,
                ipad: !1,
                cordova: r.cordova || r.phonegap,
                phonegap: r.cordova || r.phonegap
            },
            i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
            s = e.match(/(Android);?[\s\/]+([\d.]+)?/),
            o = e.match(/(iPad).*OS\s([\d_]+)/),
            a = e.match(/(iPod)(.*OS\s([\d_]+))?/),
            l = !o && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (i && (t.os = "windows", t.osVersion = i[2], t.windows = !0), s && !i && (t.os = "android", t.osVersion = s[2], t.android = !0, t.androidChrome = e.toLowerCase().indexOf("chrome") >= 0), (o || l || a) && (t.os = "ios", t.ios = !0), l && !a && (t.osVersion = l[2].replace(/_/g, "."), t.iphone = !0), o && (t.osVersion = o[2].replace(/_/g, "."), t.ipad = !0), a && (t.osVersion = a[3] ? a[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && e.indexOf("Version/") >= 0 && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (l || o || a) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
            const e = t.osVersion.split("."),
                i = n.querySelector('meta[name="viewport"]');
            t.minimalUi = !t.webView && (a || l) && (1 * e[0] == 7 ? 1 * e[1] >= 1 : 1 * e[0] > 7) && i && i.getAttribute("content").indexOf("minimal-ui") >= 0
        }
        return t.pixelRatio = r.devicePixelRatio || 1, t
    }();
    function x(e) {
        const t = this,
            i = t.touchEventsData,
            {params: s, touches: a} = t;
        if (t.animating && s.preventInteractionOnTransition)
            return;
        let l = e;
        if (l.originalEvent && (l = l.originalEvent), i.isTouchEvent = "touchstart" === l.type, !i.isTouchEvent && "which" in l && 3 === l.which)
            return;
        if (!i.isTouchEvent && "button" in l && l.button > 0)
            return;
        if (i.isTouched && i.isMoved)
            return;
        if (s.noSwiping && o(l.target).closest(s.noSwipingSelector ? s.noSwipingSelector : `.${s.noSwipingClass}`)[0])
            return void (t.allowClick = !0);
        if (s.swipeHandler && !o(l).closest(s.swipeHandler)[0])
            return;
        a.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX,
        a.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY;
        const d = a.currentX,
            u = a.currentY,
            p = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
            h = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
        if (!p || !(d <= h || d >= r.screen.width - h)) {
            if (c.extend(i, {
                isTouched: !0,
                isMoved: !1,
                allowTouchCallbacks: !0,
                isScrolling: void 0,
                startMoving: void 0
            }), a.startX = d, a.startY = u, i.touchStartTime = c.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, s.threshold > 0 && (i.allowThresholdMove = !1), "touchstart" !== l.type) {
                let e = !0;
                o(l.target).is(i.formElements) && (e = !1),
                n.activeElement && o(n.activeElement).is(i.formElements) && n.activeElement !== l.target && n.activeElement.blur();
                const r = e && t.allowTouchMove && s.touchStartPreventDefault;
                (s.touchStartForcePreventDefault || r) && l.preventDefault()
            }
            t.emit("touchStart", l)
        }
    }
    function T(e) {
        const t = this,
            i = t.touchEventsData,
            {params: r, touches: s, rtlTranslate: a} = t;
        let l = e;
        if (l.originalEvent && (l = l.originalEvent), !i.isTouched)
            return void (i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", l));
        if (i.isTouchEvent && "mousemove" === l.type)
            return;
        const d = "touchmove" === l.type ? l.targetTouches[0].pageX : l.pageX,
            u = "touchmove" === l.type ? l.targetTouches[0].pageY : l.pageY;
        if (l.preventedByNestedSwiper)
            return s.startX = d, void (s.startY = u);
        if (!t.allowTouchMove)
            return t.allowClick = !1, void (i.isTouched && (c.extend(s, {
                startX: d,
                startY: u,
                currentX: d,
                currentY: u
            }), i.touchStartTime = c.now()));
        if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
            if (t.isVertical()) {
                if (u < s.startY && t.translate <= t.maxTranslate() || u > s.startY && t.translate >= t.minTranslate())
                    return i.isTouched = !1, void (i.isMoved = !1)
            } else if (d < s.startX && t.translate <= t.maxTranslate() || d > s.startX && t.translate >= t.minTranslate())
                return;
        if (i.isTouchEvent && n.activeElement && l.target === n.activeElement && o(l.target).is(i.formElements))
            return i.isMoved = !0, void (t.allowClick = !1);
        if (i.allowTouchCallbacks && t.emit("touchMove", l), l.targetTouches && l.targetTouches.length > 1)
            return;
        s.currentX = d,
        s.currentY = u;
        const p = s.currentX - s.startX,
            h = s.currentY - s.startY;
        if (t.params.threshold && Math.sqrt(p ** 2 + h ** 2) < t.params.threshold)
            return;
        if (void 0 === i.isScrolling) {
            let e;
            t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? i.isScrolling = !1 : p * p + h * h >= 25 && (e = 180 * Math.atan2(Math.abs(h), Math.abs(p)) / Math.PI, i.isScrolling = t.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
        }
        if (i.isScrolling && t.emit("touchMoveOpposite", l), void 0 === i.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (i.startMoving = !0)), i.isScrolling)
            return void (i.isTouched = !1);
        if (!i.startMoving)
            return;
        t.allowClick = !1,
        l.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && l.stopPropagation(),
        i.isMoved || (r.loop && t.loopFix(), i.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !r.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", l)),
        t.emit("sliderMove", l),
        i.isMoved = !0;
        let f = t.isHorizontal() ? p : h;
        s.diff = f,
        f *= r.touchRatio,
        a && (f = -f),
        t.swipeDirection = f > 0 ? "prev" : "next",
        i.currentTranslate = f + i.startTranslate;
        let m = !0,
            g = r.resistanceRatio;
        if (r.touchReleaseOnEdges && (g = 0), f > 0 && i.currentTranslate > t.minTranslate() ? (m = !1, r.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + i.startTranslate + f) ** g)) : f < 0 && i.currentTranslate < t.maxTranslate() && (m = !1, r.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - i.startTranslate - f) ** g)), m && (l.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), r.threshold > 0) {
            if (!(Math.abs(f) > r.threshold || i.allowThresholdMove))
                return void (i.currentTranslate = i.startTranslate);
            if (!i.allowThresholdMove)
                return i.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, i.currentTranslate = i.startTranslate, void (s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
        }
        r.followFinger && ((r.freeMode || r.watchSlidesProgress || r.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), r.freeMode && (0 === i.velocities.length && i.velocities.push({
            position: s[t.isHorizontal() ? "startX" : "startY"],
            time: i.touchStartTime
        }), i.velocities.push({
            position: s[t.isHorizontal() ? "currentX" : "currentY"],
            time: c.now()
        })), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate))
    }
    function E(e) {
        const t = this,
            i = t.touchEventsData,
            {params: n, touches: r, rtlTranslate: s, $wrapperEl: o, slidesGrid: a, snapGrid: l} = t;
        let d = e;
        if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), i.allowTouchCallbacks = !1, !i.isTouched)
            return i.isMoved && n.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
        n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const u = c.now(),
            p = u - i.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), p < 300 && u - i.lastClickTime > 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = c.nextTick(() => {
            t && !t.destroyed && t.emit("click", d)
        }, 300)), p < 300 && u - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", d))), i.lastClickTime = c.now(), c.nextTick(() => {
            t.destroyed || (t.allowClick = !0)
        }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === r.diff || i.currentTranslate === i.startTranslate)
            return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
        let h;
        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, h = n.followFinger ? s ? t.translate : -t.translate : -i.currentTranslate, n.freeMode) {
            if (h < -t.minTranslate())
                return void t.slideTo(t.activeIndex);
            if (h > -t.maxTranslate())
                return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
            if (n.freeModeMomentum) {
                if (i.velocities.length > 1) {
                    const e = i.velocities.pop(),
                        r = i.velocities.pop(),
                        s = e.position - r.position,
                        o = e.time - r.time;
                    t.velocity = s / o,
                    t.velocity /= 2,
                    Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0),
                    (o > 150 || c.now() - e.time > 300) && (t.velocity = 0)
                } else
                    t.velocity = 0;
                t.velocity *= n.freeModeMomentumVelocityRatio,
                i.velocities.length = 0;
                let e = 1e3 * n.freeModeMomentumRatio;
                const r = t.velocity * e;
                let a = t.translate + r;
                s && (a = -a);
                let d,
                    u = !1;
                const p = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                let h;
                if (a < t.maxTranslate())
                    n.freeModeMomentumBounce ? (a + t.maxTranslate() < -p && (a = t.maxTranslate() - p), d = t.maxTranslate(), u = !0, i.allowMomentumBounce = !0) : a = t.maxTranslate(),
                    n.loop && n.centeredSlides && (h = !0);
                else if (a > t.minTranslate())
                    n.freeModeMomentumBounce ? (a - t.minTranslate() > p && (a = t.minTranslate() + p), d = t.minTranslate(), u = !0, i.allowMomentumBounce = !0) : a = t.minTranslate(),
                    n.loop && n.centeredSlides && (h = !0);
                else if (n.freeModeSticky) {
                    let e;
                    for (let t = 0; t < l.length; t += 1)
                        if (l[t] > -a) {
                            e = t;
                            break
                        }
                    a = Math.abs(l[e] - a) < Math.abs(l[e - 1] - a) || "next" === t.swipeDirection ? l[e] : l[e - 1],
                    a = -a
                }
                if (h && t.once("transitionEnd", () => {
                    t.loopFix()
                }), 0 !== t.velocity)
                    e = s ? Math.abs((-a - t.translate) / t.velocity) : Math.abs((a - t.translate) / t.velocity);
                else if (n.freeModeSticky)
                    return void t.slideToClosest();
                n.freeModeMomentumBounce && u ? (t.updateProgress(d), t.setTransition(e), t.setTranslate(a), t.transitionStart(!0, t.swipeDirection), t.animating = !0, o.transitionEnd(() => {
                    t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), t.setTranslate(d), o.transitionEnd(() => {
                        t && !t.destroyed && t.transitionEnd()
                    }))
                })) : t.velocity ? (t.updateProgress(a), t.setTransition(e), t.setTranslate(a), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, o.transitionEnd(() => {
                    t && !t.destroyed && t.transitionEnd()
                }))) : t.updateProgress(a),
                t.updateActiveIndex(),
                t.updateSlidesClasses()
            } else if (n.freeModeSticky)
                return void t.slideToClosest();
            return void ((!n.freeModeMomentum || p >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses()))
        }
        let f = 0,
            m = t.slidesSizesGrid[0];
        for (let e = 0; e < a.length; e += n.slidesPerGroup)
            void 0 !== a[e + n.slidesPerGroup] ? h >= a[e] && h < a[e + n.slidesPerGroup] && (f = e, m = a[e + n.slidesPerGroup] - a[e]) : h >= a[e] && (f = e, m = a[a.length - 1] - a[a.length - 2]);
        const g = (h - a[f]) / m;
        if (p > n.longSwipesMs) {
            if (!n.longSwipes)
                return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (g >= n.longSwipesRatio ? t.slideTo(f + n.slidesPerGroup) : t.slideTo(f)),
            "prev" === t.swipeDirection && (g > 1 - n.longSwipesRatio ? t.slideTo(f + n.slidesPerGroup) : t.slideTo(f))
        } else {
            if (!n.shortSwipes)
                return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && t.slideTo(f + n.slidesPerGroup),
            "prev" === t.swipeDirection && t.slideTo(f)
        }
    }
    function S() {
        const e = this,
            {params: t, el: i} = e;
        if (i && 0 === i.offsetWidth)
            return;
        t.breakpoints && e.setBreakpoint();
        const {allowSlideNext: n, allowSlidePrev: r, snapGrid: s} = e;
        if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
            const i = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
            e.setTranslate(i),
            e.updateActiveIndex(),
            e.updateSlidesClasses(),
            t.autoHeight && e.updateAutoHeight()
        } else
            e.updateSlidesClasses(),
            ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
        e.allowSlidePrev = r,
        e.allowSlideNext = n,
        e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow()
    }
    function C(e) {
        const t = this;
        t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
    }
    var k = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsInverse: !1,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    };
    const M = {
            update: h,
            translate: f,
            transition: m,
            slide: g,
            loop: v,
            grabCursor: y,
            manipulation: b,
            events: {
                attachEvents: function() {
                    const e = this,
                        {params: t, touchEvents: i, el: r, wrapperEl: s} = e;
                    e.onTouchStart = x.bind(e),
                    e.onTouchMove = T.bind(e),
                    e.onTouchEnd = E.bind(e),
                    e.onClick = C.bind(e);
                    const o = "container" === t.touchEventsTarget ? r : s,
                        a = !!t.nested;
                    if (d.touch || !d.pointerEvents && !d.prefixedPointerEvents) {
                        if (d.touch) {
                            const n = !("touchstart" !== i.start || !d.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            o.addEventListener(i.start, e.onTouchStart, n),
                            o.addEventListener(i.move, e.onTouchMove, d.passiveListener ? {
                                passive: !1,
                                capture: a
                            } : a),
                            o.addEventListener(i.end, e.onTouchEnd, n)
                        }
                        (t.simulateTouch && !w.ios && !w.android || t.simulateTouch && !d.touch && w.ios) && (o.addEventListener("mousedown", e.onTouchStart, !1), n.addEventListener("mousemove", e.onTouchMove, a), n.addEventListener("mouseup", e.onTouchEnd, !1))
                    } else
                        o.addEventListener(i.start, e.onTouchStart, !1),
                        n.addEventListener(i.move, e.onTouchMove, a),
                        n.addEventListener(i.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && o.addEventListener("click", e.onClick, !0),
                    e.on(w.ios || w.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", S, !0)
                },
                detachEvents: function() {
                    const e = this,
                        {params: t, touchEvents: i, el: r, wrapperEl: s} = e,
                        o = "container" === t.touchEventsTarget ? r : s,
                        a = !!t.nested;
                    if (d.touch || !d.pointerEvents && !d.prefixedPointerEvents) {
                        if (d.touch) {
                            const n = !("onTouchStart" !== i.start || !d.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            o.removeEventListener(i.start, e.onTouchStart, n),
                            o.removeEventListener(i.move, e.onTouchMove, a),
                            o.removeEventListener(i.end, e.onTouchEnd, n)
                        }
                        (t.simulateTouch && !w.ios && !w.android || t.simulateTouch && !d.touch && w.ios) && (o.removeEventListener("mousedown", e.onTouchStart, !1), n.removeEventListener("mousemove", e.onTouchMove, a), n.removeEventListener("mouseup", e.onTouchEnd, !1))
                    } else
                        o.removeEventListener(i.start, e.onTouchStart, !1),
                        n.removeEventListener(i.move, e.onTouchMove, a),
                        n.removeEventListener(i.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && o.removeEventListener("click", e.onClick, !0),
                    e.off(w.ios || w.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", S)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    const e = this,
                        {activeIndex: t, initialized: i, loopedSlides: n=0, params: r} = e,
                        s = r.breakpoints;
                    if (!s || s && 0 === Object.keys(s).length)
                        return;
                    const o = e.getBreakpoint(s);
                    if (o && e.currentBreakpoint !== o) {
                        const a = o in s ? s[o] : void 0;
                        a && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(e => {
                            const t = a[e];
                            void 0 !== t && (a[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        });
                        const l = a || e.originalParams,
                            d = l.direction && l.direction !== r.direction,
                            u = r.loop && (l.slidesPerView !== r.slidesPerView || d);
                        d && i && e.changeDirection(),
                        c.extend(e.params, l),
                        c.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }),
                        e.currentBreakpoint = o,
                        u && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - n + e.loopedSlides, 0, !1)),
                        e.emit("breakpoint", l)
                    }
                },
                getBreakpoint: function(e) {
                    const t = this;
                    if (!e)
                        return;
                    let i = !1;
                    const n = [];
                    Object.keys(e).forEach(e => {
                        n.push(e)
                    }),
                    n.sort((e, t) => parseInt(e, 10) - parseInt(t, 10));
                    for (let e = 0; e < n.length; e += 1) {
                        const s = n[e];
                        t.params.breakpointsInverse ? s <= r.innerWidth && (i = s) : s >= r.innerWidth && !i && (i = s)
                    }
                    return i || "max"
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    const e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length,
                    e.allowSlideNext = !e.isLocked,
                    e.allowSlidePrev = !e.isLocked,
                    t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
                    t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    const {classNames: e, params: t, rtl: i, $el: n} = this,
                        r = [];
                    r.push("initialized"),
                    r.push(t.direction),
                    t.freeMode && r.push("free-mode"),
                    d.flexbox || r.push("no-flexbox"),
                    t.autoHeight && r.push("autoheight"),
                    i && r.push("rtl"),
                    t.slidesPerColumn > 1 && r.push("multirow"),
                    w.android && r.push("android"),
                    w.ios && r.push("ios"),
                    (u.isIE || u.isEdge) && (d.pointerEvents || d.prefixedPointerEvents) && r.push(`wp8-${t.direction}`),
                    r.forEach(i => {
                        e.push(t.containerModifierClass + i)
                    }),
                    n.addClass(e.join(" "))
                },
                removeClasses: function() {
                    const {$el: e, classNames: t} = this;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, t, i, n, s, o) {
                    let a;
                    function l() {
                        o && o()
                    }
                    e.complete && s ? l() : t ? (a = new r.Image, a.onload = l, a.onerror = l, n && (a.sizes = n), i && (a.srcset = i), t && (a.src = t)) : l()
                },
                preloadImages: function() {
                    const e = this;
                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (let i = 0; i < e.imagesToLoad.length; i += 1) {
                        const n = e.imagesToLoad[i];
                        e.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        $ = {};
    class z extends p {
        constructor(...e)
        {
            let t,
                i;
            1 === e.length && e[0].constructor && e[0].constructor === Object ? i = e[0] : [t, i] = e,
            i || (i = {}),
            i = c.extend({}, i),
            t && !i.el && (i.el = t),
            super(i),
            Object.keys(M).forEach(e => {
                Object.keys(M[e]).forEach(t => {
                    z.prototype[t] || (z.prototype[t] = M[e][t])
                })
            });
            const n = this;
            void 0 === n.modules && (n.modules = {}),
            Object.keys(n.modules).forEach(e => {
                const t = n.modules[e];
                if (t.params) {
                    const e = Object.keys(t.params)[0],
                        n = t.params[e];
                    if ("object" != typeof n || null === n)
                        return;
                    if (!(e in i) || !("enabled" in n))
                        return;
                    !0 === i[e] && (i[e] = {
                        enabled: !0
                    }),
                    "object" != typeof i[e] || "enabled" in i[e] || (i[e].enabled = !0),
                    i[e] || (i[e] = {
                        enabled: !1
                    })
                }
            });
            const r = c.extend({}, k);
            n.useModulesParams(r),
            n.params = c.extend({}, r, $, i),
            n.originalParams = c.extend({}, n.params),
            n.passedParams = c.extend({}, i),
            n.$ = o;
            const s = o(n.params.el);
            if (t = s[0], !t)
                return;
            if (s.length > 1) {
                const e = [];
                return s.each((t, n) => {
                    const r = c.extend({}, i, {
                        el: n
                    });
                    e.push(new z(r))
                }), e
            }
            t.swiper = n,
            s.data("swiper", n);
            const a = s.children(`.${n.params.wrapperClass}`);
            return c.extend(n, {
                $el: s,
                el: t,
                $wrapperEl: a,
                wrapperEl: a[0],
                classNames: [],
                slides: o(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === n.params.direction,
                isVertical: () => "vertical" === n.params.direction,
                rtl: "rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction"),
                rtlTranslate: "horizontal" === n.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction")),
                wrongRTL: "-webkit-box" === a.css("display"),
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: n.params.allowSlideNext,
                allowSlidePrev: n.params.allowSlidePrev,
                touchEvents: function() {
                    const e = ["touchstart", "touchmove", "touchend"];
                    let t = ["mousedown", "mousemove", "mouseup"];
                    return d.pointerEvents ? t = ["pointerdown", "pointermove", "pointerup"] : d.prefixedPointerEvents && (t = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), n.touchEventsTouch = {
                        start: e[0],
                        move: e[1],
                        end: e[2]
                    }, n.touchEventsDesktop = {
                        start: t[0],
                        move: t[1],
                        end: t[2]
                    }, d.touch || !n.params.simulateTouch ? n.touchEventsTouch : n.touchEventsDesktop
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    formElements: "input, select, option, textarea, button, video",
                    lastClickTime: c.now(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: !0,
                allowTouchMove: n.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }), n.useModules(), n.params.init && n.init(), n
        }
        slidesPerViewDynamic()
        {
            const {params: e, slides: t, slidesGrid: i, size: n, activeIndex: r} = this;
            let s = 1;
            if (e.centeredSlides) {
                let e,
                    i = t[r].swiperSlideSize;
                for (let o = r + 1; o < t.length; o += 1)
                    t[o] && !e && (i += t[o].swiperSlideSize, s += 1, i > n && (e = !0));
                for (let o = r - 1; o >= 0; o -= 1)
                    t[o] && !e && (i += t[o].swiperSlideSize, s += 1, i > n && (e = !0))
            } else
                for (let e = r + 1; e < t.length; e += 1)
                    i[e] - i[r] < n && (s += 1);
            return s
        }
        update()
        {
            const e = this;
            if (!e || e.destroyed)
                return;
            const {snapGrid: t, params: i} = e;
            function n() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(i),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            let r;
            i.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode ? (n(), e.params.autoHeight && e.updateAutoHeight()) : (r = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), r || n()),
            i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
        }
        changeDirection(e, t=!0)
        {
            const i = this,
                n = i.params.direction;
            return e || (e = "horizontal" === n ? "vertical" : "horizontal"), e === n || "horizontal" !== e && "vertical" !== e || (i.$el.removeClass(`${i.params.containerModifierClass}${n} wp8-${n}`).addClass(`${i.params.containerModifierClass}${e}`), (u.isIE || u.isEdge) && (d.pointerEvents || d.prefixedPointerEvents) && i.$el.addClass(`${i.params.containerModifierClass}wp8-${e}`), i.params.direction = e, i.slides.each((t, i) => {
                "vertical" === e ? i.style.width = "" : i.style.height = ""
            }), i.emit("changeDirection"), t && i.update()), i
        }
        init()
        {
            const e = this;
            e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
        }
        destroy(e=!0, t=!0)
        {
            const i = this,
                {params: n, $el: r, $wrapperEl: s, slides: o} = i;
            return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), r.removeAttr("style"), s.removeAttr("style"), o && o.length && o.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(e => {
                i.off(e)
            }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), c.deleteProps(i)), i.destroyed = !0), null
        }
        static extendDefaults(e)
        {
            c.extend($, e)
        }
        static get extendedDefaults()
        {
            return $
        }
        static get defaults()
        {
            return k
        }
        static get Class()
        {
            return p
        }
        static get $()
        {
            return o
        }
    }
    var L = {
            name: "device",
            proto: {
                device: w
            },
            static: {
                device: w
            }
        },
        P = {
            name: "support",
            proto: {
                support: d
            },
            static: {
                support: d
            }
        },
        A = {
            name: "browser",
            proto: {
                browser: u
            },
            static: {
                browser: u
            }
        },
        D = {
            name: "resize",
            create() {
                const e = this;
                c.extend(e, {
                    resize: {
                        resizeHandler() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init() {
                    r.addEventListener("resize", this.resize.resizeHandler),
                    r.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy() {
                    r.removeEventListener("resize", this.resize.resizeHandler),
                    r.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        };
    const I = {
        func: r.MutationObserver || r.WebkitMutationObserver,
        attach(e, t={}) {
            const i = this,
                n = new (0, I.func)(e => {
                    if (1 === e.length)
                        return void i.emit("observerUpdate", e[0]);
                    const t = function() {
                        i.emit("observerUpdate", e[0])
                    };
                    r.requestAnimationFrame ? r.requestAnimationFrame(t) : r.setTimeout(t, 0)
                });
            n.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            i.observer.observers.push(n)
        },
        init() {
            const e = this;
            if (d.observer && e.params.observer) {
                if (e.params.observeParents) {
                    const t = e.$el.parents();
                    for (let i = 0; i < t.length; i += 1)
                        e.observer.attach(t[i])
                }
                e.observer.attach(e.$el[0], {
                    childList: e.params.observeSlideChildren
                }),
                e.observer.attach(e.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        destroy() {
            this.observer.observers.forEach(e => {
                e.disconnect()
            }),
            this.observer.observers = []
        }
    };
    var N = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create() {
            c.extend(this, {
                observer: {
                    init: I.init.bind(this),
                    attach: I.attach.bind(this),
                    destroy: I.destroy.bind(this),
                    observers: []
                }
            })
        },
        on: {
            init() {
                this.observer.init()
            },
            destroy() {
                this.observer.destroy()
            }
        }
    };
    const O = {
        update(e) {
            const t = this,
                {slidesPerView: i, slidesPerGroup: n, centeredSlides: r} = t.params,
                {addSlidesBefore: s, addSlidesAfter: o} = t.params.virtual,
                {from: a, to: l, slides: d, slidesGrid: u, renderSlide: p, offset: h} = t.virtual;
            t.updateActiveIndex();
            const f = t.activeIndex || 0;
            let m,
                g,
                v;
            m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
            r ? (g = Math.floor(i / 2) + n + s, v = Math.floor(i / 2) + n + o) : (g = i + (n - 1) + s, v = n + o);
            const y = Math.max((f || 0) - v, 0),
                b = Math.min((f || 0) + g, d.length - 1),
                w = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);
            function x() {
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses(),
                t.lazy && t.params.lazy.enabled && t.lazy.load()
            }
            if (c.extend(t.virtual, {
                from: y,
                to: b,
                offset: w,
                slidesGrid: t.slidesGrid
            }), a === y && l === b && !e)
                return t.slidesGrid !== u && w !== h && t.slides.css(m, `${w}px`), void t.updateProgress();
            if (t.params.virtual.renderExternal)
                return t.params.virtual.renderExternal.call(t, {
                    offset: w,
                    from: y,
                    to: b,
                    slides: function() {
                        const e = [];
                        for (let t = y; t <= b; t += 1)
                            e.push(d[t]);
                        return e
                    }()
                }), void x();
            const T = [],
                E = [];
            if (e)
                t.$wrapperEl.find(`.${t.params.slideClass}`).remove();
            else
                for (let e = a; e <= l; e += 1)
                    (e < y || e > b) && t.$wrapperEl.find(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
            for (let t = 0; t < d.length; t += 1)
                t >= y && t <= b && (void 0 === l || e ? E.push(t) : (t > l && E.push(t), t < a && T.push(t)));
            E.forEach(e => {
                t.$wrapperEl.append(p(d[e], e))
            }),
            T.sort((e, t) => t - e).forEach(e => {
                t.$wrapperEl.prepend(p(d[e], e))
            }),
            t.$wrapperEl.children(".swiper-slide").css(m, `${w}px`),
            x()
        },
        renderSlide(e, t) {
            const i = this,
                n = i.params.virtual;
            if (n.cache && i.virtual.cache[t])
                return i.virtual.cache[t];
            const r = n.renderSlide ? o(n.renderSlide.call(i, e, t)) : o(`<div class="${i.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);
            return r.attr("data-swiper-slide-index") || r.attr("data-swiper-slide-index", t), n.cache && (i.virtual.cache[t] = r), r
        },
        appendSlide(e) {
            const t = this;
            if ("object" == typeof e && "length" in e)
                for (let i = 0; i < e.length; i += 1)
                    e[i] && t.virtual.slides.push(e[i]);
            else
                t.virtual.slides.push(e);
            t.virtual.update(!0)
        },
        prependSlide(e) {
            const t = this,
                i = t.activeIndex;
            let n = i + 1,
                r = 1;
            if (Array.isArray(e)) {
                for (let i = 0; i < e.length; i += 1)
                    e[i] && t.virtual.slides.unshift(e[i]);
                n = i + e.length,
                r = e.length
            } else
                t.virtual.slides.unshift(e);
            if (t.params.virtual.cache) {
                const e = t.virtual.cache,
                    i = {};
                Object.keys(e).forEach(t => {
                    i[parseInt(t, 10) + r] = e[t]
                }),
                t.virtual.cache = i
            }
            t.virtual.update(!0),
            t.slideTo(n, 0)
        },
        removeSlide(e) {
            const t = this;
            if (null == e)
                return;
            let i = t.activeIndex;
            if (Array.isArray(e))
                for (let n = e.length - 1; n >= 0; n -= 1)
                    t.virtual.slides.splice(e[n], 1),
                    t.params.virtual.cache && delete t.virtual.cache[e[n]],
                    e[n] < i && (i -= 1),
                    i = Math.max(i, 0);
            else
                t.virtual.slides.splice(e, 1),
                t.params.virtual.cache && delete t.virtual.cache[e],
                e < i && (i -= 1),
                i = Math.max(i, 0);
            t.virtual.update(!0),
            t.slideTo(i, 0)
        },
        removeAllSlides() {
            const e = this;
            e.virtual.slides = [],
            e.params.virtual.cache && (e.virtual.cache = {}),
            e.virtual.update(!0),
            e.slideTo(0, 0)
        }
    };
    var H = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create() {
            c.extend(this, {
                virtual: {
                    update: O.update.bind(this),
                    appendSlide: O.appendSlide.bind(this),
                    prependSlide: O.prependSlide.bind(this),
                    removeSlide: O.removeSlide.bind(this),
                    removeAllSlides: O.removeAllSlides.bind(this),
                    renderSlide: O.renderSlide.bind(this),
                    slides: this.params.virtual.slides,
                    cache: {}
                }
            })
        },
        on: {
            beforeInit() {
                const e = this;
                if (!e.params.virtual.enabled)
                    return;
                e.classNames.push(`${e.params.containerModifierClass}virtual`);
                const t = {
                    watchSlidesProgress: !0
                };
                c.extend(e.params, t),
                c.extend(e.originalParams, t),
                e.params.initialSlide || e.virtual.update()
            },
            setTranslate() {
                this.params.virtual.enabled && this.virtual.update()
            }
        }
    };
    const j = {
        handle(e) {
            const t = this,
                {rtlTranslate: i} = t;
            let s = e;
            s.originalEvent && (s = s.originalEvent);
            const o = s.keyCode || s.charCode;
            if (!t.allowSlideNext && (t.isHorizontal() && 39 === o || t.isVertical() && 40 === o || 34 === o))
                return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && 37 === o || t.isVertical() && 38 === o || 33 === o))
                return !1;
            if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || n.activeElement && n.activeElement.nodeName && ("input" === n.activeElement.nodeName.toLowerCase() || "textarea" === n.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (33 === o || 34 === o || 37 === o || 39 === o || 38 === o || 40 === o)) {
                    let e = !1;
                    if (t.$el.parents(`.${t.params.slideClass}`).length > 0 && 0 === t.$el.parents(`.${t.params.slideActiveClass}`).length)
                        return;
                    const n = r.innerWidth,
                        s = r.innerHeight,
                        o = t.$el.offset();
                    i && (o.left -= t.$el[0].scrollLeft);
                    const a = [[o.left, o.top], [o.left + t.width, o.top], [o.left, o.top + t.height], [o.left + t.width, o.top + t.height]];
                    for (let t = 0; t < a.length; t += 1) {
                        const i = a[t];
                        i[0] >= 0 && i[0] <= n && i[1] >= 0 && i[1] <= s && (e = !0)
                    }
                    if (!e)
                        return
                }
                t.isHorizontal() ? (33 !== o && 34 !== o && 37 !== o && 39 !== o || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (34 !== o && 39 !== o || i) && (33 !== o && 37 !== o || !i) || t.slideNext(), (33 !== o && 37 !== o || i) && (34 !== o && 39 !== o || !i) || t.slidePrev()) : (33 !== o && 34 !== o && 38 !== o && 40 !== o || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), 34 !== o && 40 !== o || t.slideNext(), 33 !== o && 38 !== o || t.slidePrev()),
                t.emit("keyPress", o)
            }
        },
        enable() {
            this.keyboard.enabled || (o(n).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
        },
        disable() {
            this.keyboard.enabled && (o(n).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
        }
    };
    var _ = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0
            }
        },
        create() {
            c.extend(this, {
                keyboard: {
                    enabled: !1,
                    enable: j.enable.bind(this),
                    disable: j.disable.bind(this),
                    handle: j.handle.bind(this)
                }
            })
        },
        on: {
            init() {
                const e = this;
                e.params.keyboard.enabled && e.keyboard.enable()
            },
            destroy() {
                const e = this;
                e.keyboard.enabled && e.keyboard.disable()
            }
        }
    };
    const q = {
        lastScrollTime: c.now(),
        event: r.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
            let e = "onwheel" in n;
            if (!e) {
                const t = n.createElement("div");
                t.setAttribute("onwheel", "return;"),
                e = "function" == typeof t.onwheel
            }
            return !e && n.implementation && n.implementation.hasFeature && !0 !== n.implementation.hasFeature("", "") && (e = n.implementation.hasFeature("Events.wheel", "3.0")), e
        }() ? "wheel" : "mousewheel",
        normalize(e) {
            let t = 0,
                i = 0,
                n = 0,
                r = 0;
            return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, r = 10 * i, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || r) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, r *= 40) : (n *= 800, r *= 800)), n && !t && (t = n < 1 ? -1 : 1), r && !i && (i = r < 1 ? -1 : 1), {
                spinX: t,
                spinY: i,
                pixelX: n,
                pixelY: r
            }
        },
        handleMouseEnter() {
            this.mouseEntered = !0
        },
        handleMouseLeave() {
            this.mouseEntered = !1
        },
        handle(e) {
            let t = e;
            const i = this,
                n = i.params.mousewheel;
            if (!i.mouseEntered && !n.releaseOnEdges)
                return !0;
            t.originalEvent && (t = t.originalEvent);
            let s = 0;
            const o = i.rtlTranslate ? -1 : 1,
                a = q.normalize(t);
            if (n.forceToAxis)
                if (i.isHorizontal()) {
                    if (!(Math.abs(a.pixelX) > Math.abs(a.pixelY)))
                        return !0;
                    s = a.pixelX * o
                } else {
                    if (!(Math.abs(a.pixelY) > Math.abs(a.pixelX)))
                        return !0;
                    s = a.pixelY
                }
            else
                s = Math.abs(a.pixelX) > Math.abs(a.pixelY) ? -a.pixelX * o : -a.pixelY;
            if (0 === s)
                return !0;
            if (n.invert && (s = -s), i.params.freeMode) {
                i.params.loop && i.loopFix();
                let e = i.getTranslate() + s * n.sensitivity;
                const r = i.isBeginning,
                    o = i.isEnd;
                if (e >= i.minTranslate() && (e = i.minTranslate()), e <= i.maxTranslate() && (e = i.maxTranslate()), i.setTransition(0), i.setTranslate(e), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!r && i.isBeginning || !o && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = c.nextTick(() => {
                    i.slideToClosest()
                }, 300)), i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), e === i.minTranslate() || e === i.maxTranslate())
                    return !0
            } else {
                if (c.now() - i.mousewheel.lastScrollTime > 60)
                    if (s < 0)
                        if (i.isEnd && !i.params.loop || i.animating) {
                            if (n.releaseOnEdges)
                                return !0
                        } else
                            i.slideNext(),
                            i.emit("scroll", t);
                    else if (i.isBeginning && !i.params.loop || i.animating) {
                        if (n.releaseOnEdges)
                            return !0
                    } else
                        i.slidePrev(),
                        i.emit("scroll", t);
                i.mousewheel.lastScrollTime = (new r.Date).getTime()
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
        },
        enable() {
            const e = this;
            if (!q.event)
                return !1;
            if (e.mousewheel.enabled)
                return !1;
            let t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = o(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(q.event, e.mousewheel.handle), e.mousewheel.enabled = !0, !0
        },
        disable() {
            const e = this;
            if (!q.event)
                return !1;
            if (!e.mousewheel.enabled)
                return !1;
            let t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = o(e.params.mousewheel.eventsTarged)), t.off(q.event, e.mousewheel.handle), e.mousewheel.enabled = !1, !0
        }
    };
    const B = {
        update() {
            const e = this,
                t = e.params.navigation;
            if (e.params.loop)
                return;
            const {$nextEl: i, $prevEl: n} = e.navigation;
            n && n.length > 0 && (e.isBeginning ? n.addClass(t.disabledClass) : n.removeClass(t.disabledClass), n[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)),
            i && i.length > 0 && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
        },
        onPrevClick(e) {
            e.preventDefault(),
            this.isBeginning && !this.params.loop || this.slidePrev()
        },
        onNextClick(e) {
            e.preventDefault(),
            this.isEnd && !this.params.loop || this.slideNext()
        },
        init() {
            const e = this,
                t = e.params.navigation;
            if (!t.nextEl && !t.prevEl)
                return;
            let i,
                n;
            t.nextEl && (i = o(t.nextEl), e.params.uniqueNavElements && "string" == typeof t.nextEl && i.length > 1 && 1 === e.$el.find(t.nextEl).length && (i = e.$el.find(t.nextEl))),
            t.prevEl && (n = o(t.prevEl), e.params.uniqueNavElements && "string" == typeof t.prevEl && n.length > 1 && 1 === e.$el.find(t.prevEl).length && (n = e.$el.find(t.prevEl))),
            i && i.length > 0 && i.on("click", e.navigation.onNextClick),
            n && n.length > 0 && n.on("click", e.navigation.onPrevClick),
            c.extend(e.navigation, {
                $nextEl: i,
                nextEl: i && i[0],
                $prevEl: n,
                prevEl: n && n[0]
            })
        },
        destroy() {
            const e = this,
                {$nextEl: t, $prevEl: i} = e.navigation;
            t && t.length && (t.off("click", e.navigation.onNextClick), t.removeClass(e.params.navigation.disabledClass)),
            i && i.length && (i.off("click", e.navigation.onPrevClick), i.removeClass(e.params.navigation.disabledClass))
        }
    };
    const R = {
        update() {
            const e = this,
                t = e.rtl,
                i = e.params.pagination;
            if (!i.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length)
                return;
            const n = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                r = e.pagination.$el;
            let s;
            const a = e.params.loop ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
            if (e.params.loop ? (s = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup), s > n - 1 - 2 * e.loopedSlides && (s -= n - 2 * e.loopedSlides), s > a - 1 && (s -= a), s < 0 && "bullets" !== e.params.paginationType && (s = a + s)) : s = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === i.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                const n = e.pagination.bullets;
                let a,
                    l,
                    c;
                if (i.dynamicBullets && (e.pagination.bulletSize = n.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(e.isHorizontal() ? "width" : "height", `${e.pagination.bulletSize * (i.dynamicMainBullets + 4)}px`), i.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += s - e.previousIndex, e.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = i.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), a = s - e.pagination.dynamicBulletIndex, l = a + (Math.min(n.length, i.dynamicMainBullets) - 1), c = (l + a) / 2), n.removeClass(`${i.bulletActiveClass} ${i.bulletActiveClass}-next ${i.bulletActiveClass}-next-next ${i.bulletActiveClass}-prev ${i.bulletActiveClass}-prev-prev ${i.bulletActiveClass}-main`), r.length > 1)
                    n.each((e, t) => {
                        const n = o(t),
                            r = n.index();
                        r === s && n.addClass(i.bulletActiveClass),
                        i.dynamicBullets && (r >= a && r <= l && n.addClass(`${i.bulletActiveClass}-main`), r === a && n.prev().addClass(`${i.bulletActiveClass}-prev`).prev().addClass(`${i.bulletActiveClass}-prev-prev`), r === l && n.next().addClass(`${i.bulletActiveClass}-next`).next().addClass(`${i.bulletActiveClass}-next-next`))
                    });
                else {
                    if (n.eq(s).addClass(i.bulletActiveClass), i.dynamicBullets) {
                        const e = n.eq(a),
                            t = n.eq(l);
                        for (let e = a; e <= l; e += 1)
                            n.eq(e).addClass(`${i.bulletActiveClass}-main`);
                        e.prev().addClass(`${i.bulletActiveClass}-prev`).prev().addClass(`${i.bulletActiveClass}-prev-prev`),
                        t.next().addClass(`${i.bulletActiveClass}-next`).next().addClass(`${i.bulletActiveClass}-next-next`)
                    }
                }
                if (i.dynamicBullets) {
                    const r = Math.min(n.length, i.dynamicMainBullets + 4),
                        s = (e.pagination.bulletSize * r - e.pagination.bulletSize) / 2 - c * e.pagination.bulletSize,
                        o = t ? "right" : "left";
                    n.css(e.isHorizontal() ? o : "top", `${s}px`)
                }
            }
            if ("fraction" === i.type && (r.find(`.${i.currentClass}`).text(i.formatFractionCurrent(s + 1)), r.find(`.${i.totalClass}`).text(i.formatFractionTotal(a))), "progressbar" === i.type) {
                let t;
                t = i.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                const n = (s + 1) / a;
                let o = 1,
                    l = 1;
                "horizontal" === t ? o = n : l = n,
                r.find(`.${i.progressbarFillClass}`).transform(`translate3d(0,0,0) scaleX(${o}) scaleY(${l})`).transition(e.params.speed)
            }
            "custom" === i.type && i.renderCustom ? (r.html(i.renderCustom(e, s + 1, a)), e.emit("paginationRender", e, r[0])) : e.emit("paginationUpdate", e, r[0]),
            r[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](i.lockClass)
        },
        render() {
            const e = this,
                t = e.params.pagination;
            if (!t.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length)
                return;
            const i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                n = e.pagination.$el;
            let r = "";
            if ("bullets" === t.type) {
                const s = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                for (let i = 0; i < s; i += 1)
                    t.renderBullet ? r += t.renderBullet.call(e, i, t.bulletClass) : r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;
                n.html(r),
                e.pagination.bullets = n.find(`.${t.bulletClass}`)
            }
            "fraction" === t.type && (r = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span>` + " / " + `<span class="${t.totalClass}"></span>`, n.html(r)),
            "progressbar" === t.type && (r = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`, n.html(r)),
            "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
        },
        init() {
            const e = this,
                t = e.params.pagination;
            if (!t.el)
                return;
            let i = o(t.el);
            0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass(`${t.modifierClass}${t.type}-dynamic`), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", `.${t.bulletClass}`, (function(t) {
                t.preventDefault();
                let i = o(this).index() * e.params.slidesPerGroup;
                e.params.loop && (i += e.loopedSlides),
                e.slideTo(i)
            })), c.extend(e.pagination, {
                $el: i,
                el: i[0]
            }))
        },
        destroy() {
            const e = this.params.pagination;
            if (!e.el || !this.pagination.el || !this.pagination.$el || 0 === this.pagination.$el.length)
                return;
            const t = this.pagination.$el;
            t.removeClass(e.hiddenClass),
            t.removeClass(e.modifierClass + e.type),
            this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && t.off("click", `.${e.bulletClass}`)
        }
    };
    const X = {
        setTranslate() {
            const e = this;
            if (!e.params.scrollbar.el || !e.scrollbar.el)
                return;
            const {scrollbar: t, rtlTranslate: i, progress: n} = e,
                {dragSize: r, trackSize: s, $dragEl: o, $el: a} = t,
                l = e.params.scrollbar;
            let c = r,
                u = (s - r) * n;
            i ? (u = -u, u > 0 ? (c = r - u, u = 0) : -u + r > s && (c = s + u)) : u < 0 ? (c = r + u, u = 0) : u + r > s && (c = s - u),
            e.isHorizontal() ? (d.transforms3d ? o.transform(`translate3d(${u}px, 0, 0)`) : o.transform(`translateX(${u}px)`), o[0].style.width = `${c}px`) : (d.transforms3d ? o.transform(`translate3d(0px, ${u}px, 0)`) : o.transform(`translateY(${u}px)`), o[0].style.height = `${c}px`),
            l.hide && (clearTimeout(e.scrollbar.timeout), a[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(() => {
                a[0].style.opacity = 0,
                a.transition(400)
            }, 1e3))
        },
        setTransition(e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        },
        updateSize() {
            const e = this;
            if (!e.params.scrollbar.el || !e.scrollbar.el)
                return;
            const {scrollbar: t} = e,
                {$dragEl: i, $el: n} = t;
            i[0].style.width = "",
            i[0].style.height = "";
            const r = e.isHorizontal() ? n[0].offsetWidth : n[0].offsetHeight,
                s = e.size / e.virtualSize,
                o = s * (r / e.size);
            let a;
            a = "auto" === e.params.scrollbar.dragSize ? r * s : parseInt(e.params.scrollbar.dragSize, 10),
            e.isHorizontal() ? i[0].style.width = `${a}px` : i[0].style.height = `${a}px`,
            n[0].style.display = s >= 1 ? "none" : "",
            e.params.scrollbar.hide && (n[0].style.opacity = 0),
            c.extend(t, {
                trackSize: r,
                divider: s,
                moveDivider: o,
                dragSize: a
            }),
            t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
        },
        getPointerPosition(e) {
            return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY
        },
        setDragPosition(e) {
            const {scrollbar: t, rtlTranslate: i} = this,
                {$el: n, dragSize: r, trackSize: s, dragStartPos: o} = t;
            let a;
            a = (t.getPointerPosition(e) - n.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (s - r),
            a = Math.max(Math.min(a, 1), 0),
            i && (a = 1 - a);
            const l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * a;
            this.updateProgress(l),
            this.setTranslate(l),
            this.updateActiveIndex(),
            this.updateSlidesClasses()
        },
        onDragStart(e) {
            const t = this.params.scrollbar,
                {scrollbar: i, $wrapperEl: n} = this,
                {$el: r, $dragEl: s} = i;
            this.scrollbar.isTouched = !0,
            this.scrollbar.dragStartPos = e.target === s[0] || e.target === s ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            n.transition(100),
            s.transition(100),
            i.setDragPosition(e),
            clearTimeout(this.scrollbar.dragTimeout),
            r.transition(0),
            t.hide && r.css("opacity", 1),
            this.emit("scrollbarDragStart", e)
        },
        onDragMove(e) {
            const {scrollbar: t, $wrapperEl: i} = this,
                {$el: n, $dragEl: r} = t;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), n.transition(0), r.transition(0), this.emit("scrollbarDragMove", e))
        },
        onDragEnd(e) {
            const t = this,
                i = t.params.scrollbar,
                {scrollbar: n} = t,
                {$el: r} = n;
            t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, i.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = c.nextTick(() => {
                r.css("opacity", 0),
                r.transition(400)
            }, 1e3)), t.emit("scrollbarDragEnd", e), i.snapOnRelease && t.slideToClosest())
        },
        enableDraggable() {
            const e = this;
            if (!e.params.scrollbar.el)
                return;
            const {scrollbar: t, touchEventsTouch: i, touchEventsDesktop: r, params: s} = e,
                o = t.$el[0],
                a = !(!d.passiveListener || !s.passiveListeners) && {
                    passive: !1,
                    capture: !1
                },
                l = !(!d.passiveListener || !s.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
            d.touch ? (o.addEventListener(i.start, e.scrollbar.onDragStart, a), o.addEventListener(i.move, e.scrollbar.onDragMove, a), o.addEventListener(i.end, e.scrollbar.onDragEnd, l)) : (o.addEventListener(r.start, e.scrollbar.onDragStart, a), n.addEventListener(r.move, e.scrollbar.onDragMove, a), n.addEventListener(r.end, e.scrollbar.onDragEnd, l))
        },
        disableDraggable() {
            const e = this;
            if (!e.params.scrollbar.el)
                return;
            const {scrollbar: t, touchEventsTouch: i, touchEventsDesktop: r, params: s} = e,
                o = t.$el[0],
                a = !(!d.passiveListener || !s.passiveListeners) && {
                    passive: !1,
                    capture: !1
                },
                l = !(!d.passiveListener || !s.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
            d.touch ? (o.removeEventListener(i.start, e.scrollbar.onDragStart, a), o.removeEventListener(i.move, e.scrollbar.onDragMove, a), o.removeEventListener(i.end, e.scrollbar.onDragEnd, l)) : (o.removeEventListener(r.start, e.scrollbar.onDragStart, a), n.removeEventListener(r.move, e.scrollbar.onDragMove, a), n.removeEventListener(r.end, e.scrollbar.onDragEnd, l))
        },
        init() {
            const e = this;
            if (!e.params.scrollbar.el)
                return;
            const {scrollbar: t, $el: i} = e,
                n = e.params.scrollbar;
            let r = o(n.el);
            e.params.uniqueNavElements && "string" == typeof n.el && r.length > 1 && 1 === i.find(n.el).length && (r = i.find(n.el));
            let s = r.find(`.${e.params.scrollbar.dragClass}`);
            0 === s.length && (s = o(`<div class="${e.params.scrollbar.dragClass}"></div>`), r.append(s)),
            c.extend(t, {
                $el: r,
                el: r[0],
                $dragEl: s,
                dragEl: s[0]
            }),
            n.draggable && t.enableDraggable()
        },
        destroy() {
            this.scrollbar.disableDraggable()
        }
    };
    const F = {
        setTransform(e, t) {
            const {rtl: i} = this,
                n = o(e),
                r = i ? -1 : 1,
                s = n.attr("data-swiper-parallax") || "0";
            let a = n.attr("data-swiper-parallax-x"),
                l = n.attr("data-swiper-parallax-y");
            const c = n.attr("data-swiper-parallax-scale"),
                d = n.attr("data-swiper-parallax-opacity");
            if (a || l ? (a = a || "0", l = l || "0") : this.isHorizontal() ? (a = s, l = "0") : (l = s, a = "0"), a = a.indexOf("%") >= 0 ? `${parseInt(a, 10) * t * r}%` : `${a * t * r}px`, l = l.indexOf("%") >= 0 ? `${parseInt(l, 10) * t}%` : `${l * t}px`, null != d) {
                const e = d - (d - 1) * (1 - Math.abs(t));
                n[0].style.opacity = e
            }
            if (null == c)
                n.transform(`translate3d(${a}, ${l}, 0px)`);
            else {
                const e = c - (c - 1) * (1 - Math.abs(t));
                n.transform(`translate3d(${a}, ${l}, 0px) scale(${e})`)
            }
        },
        setTranslate() {
            const e = this,
                {$el: t, slides: i, progress: n, snapGrid: r} = e;
            t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t, i) => {
                e.parallax.setTransform(i, n)
            }),
            i.each((t, i) => {
                let s = i.progress;
                e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (s += Math.ceil(t / 2) - n * (r.length - 1)),
                s = Math.min(Math.max(s, -1), 1),
                o(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t, i) => {
                    e.parallax.setTransform(i, s)
                })
            })
        },
        setTransition(e=this.params.speed) {
            const {$el: t} = this;
            t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t, i) => {
                const n = o(i);
                let r = parseInt(n.attr("data-swiper-parallax-duration"), 10) || e;
                0 === e && (r = 0),
                n.transition(r)
            })
        }
    };
    const Y = {
        getDistanceBetweenTouches(e) {
            if (e.targetTouches.length < 2)
                return 1;
            const t = e.targetTouches[0].pageX,
                i = e.targetTouches[0].pageY,
                n = e.targetTouches[1].pageX,
                r = e.targetTouches[1].pageY;
            return Math.sqrt((n - t) ** 2 + (r - i) ** 2)
        },
        onGestureStart(e) {
            const t = this,
                i = t.params.zoom,
                n = t.zoom,
                {gesture: r} = n;
            if (n.fakeGestureTouched = !1, n.fakeGestureMoved = !1, !d.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                n.fakeGestureTouched = !0,
                r.scaleStart = Y.getDistanceBetweenTouches(e)
            }
            r.$slideEl && r.$slideEl.length || (r.$slideEl = o(e.target).closest(".swiper-slide"), 0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)), r.$imageEl = r.$slideEl.find("img, svg, canvas"), r.$imageWrapEl = r.$imageEl.parent(`.${i.containerClass}`), r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== r.$imageWrapEl.length) ? (r.$imageEl.transition(0), t.zoom.isScaling = !0) : r.$imageEl = void 0
        },
        onGestureChange(e) {
            const t = this.params.zoom,
                i = this.zoom,
                {gesture: n} = i;
            if (!d.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                i.fakeGestureMoved = !0,
                n.scaleMove = Y.getDistanceBetweenTouches(e)
            }
            n.$imageEl && 0 !== n.$imageEl.length && (d.gestures ? i.scale = e.scale * i.currentScale : i.scale = n.scaleMove / n.scaleStart * i.currentScale, i.scale > n.maxRatio && (i.scale = n.maxRatio - 1 + (i.scale - n.maxRatio + 1) ** .5), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - (t.minRatio - i.scale + 1) ** .5), n.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`))
        },
        onGestureEnd(e) {
            const t = this.params.zoom,
                i = this.zoom,
                {gesture: n} = i;
            if (!d.gestures) {
                if (!i.fakeGestureTouched || !i.fakeGestureMoved)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !w.android)
                    return;
                i.fakeGestureTouched = !1,
                i.fakeGestureMoved = !1
            }
            n.$imageEl && 0 !== n.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio), n.$imageEl.transition(this.params.speed).transform(`translate3d(0,0,0) scale(${i.scale})`), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (n.$slideEl = void 0))
        },
        onTouchStart(e) {
            const t = this.zoom,
                {gesture: i, image: n} = t;
            i.$imageEl && 0 !== i.$imageEl.length && (n.isTouched || (w.android && e.preventDefault(), n.isTouched = !0, n.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        },
        onTouchMove(e) {
            const t = this,
                i = t.zoom,
                {gesture: n, image: r, velocity: s} = i;
            if (!n.$imageEl || 0 === n.$imageEl.length)
                return;
            if (t.allowClick = !1, !r.isTouched || !n.$slideEl)
                return;
            r.isMoved || (r.width = n.$imageEl[0].offsetWidth, r.height = n.$imageEl[0].offsetHeight, r.startX = c.getTranslate(n.$imageWrapEl[0], "x") || 0, r.startY = c.getTranslate(n.$imageWrapEl[0], "y") || 0, n.slideWidth = n.$slideEl[0].offsetWidth, n.slideHeight = n.$slideEl[0].offsetHeight, n.$imageWrapEl.transition(0), t.rtl && (r.startX = -r.startX, r.startY = -r.startY));
            const o = r.width * i.scale,
                a = r.height * i.scale;
            if (!(o < n.slideWidth && a < n.slideHeight)) {
                if (r.minX = Math.min(n.slideWidth / 2 - o / 2, 0), r.maxX = -r.minX, r.minY = Math.min(n.slideHeight / 2 - a / 2, 0), r.maxY = -r.minY, r.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, r.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !r.isMoved && !i.isScaling) {
                    if (t.isHorizontal() && (Math.floor(r.minX) === Math.floor(r.startX) && r.touchesCurrent.x < r.touchesStart.x || Math.floor(r.maxX) === Math.floor(r.startX) && r.touchesCurrent.x > r.touchesStart.x))
                        return void (r.isTouched = !1);
                    if (!t.isHorizontal() && (Math.floor(r.minY) === Math.floor(r.startY) && r.touchesCurrent.y < r.touchesStart.y || Math.floor(r.maxY) === Math.floor(r.startY) && r.touchesCurrent.y > r.touchesStart.y))
                        return void (r.isTouched = !1)
                }
                e.preventDefault(),
                e.stopPropagation(),
                r.isMoved = !0,
                r.currentX = r.touchesCurrent.x - r.touchesStart.x + r.startX,
                r.currentY = r.touchesCurrent.y - r.touchesStart.y + r.startY,
                r.currentX < r.minX && (r.currentX = r.minX + 1 - (r.minX - r.currentX + 1) ** .8),
                r.currentX > r.maxX && (r.currentX = r.maxX - 1 + (r.currentX - r.maxX + 1) ** .8),
                r.currentY < r.minY && (r.currentY = r.minY + 1 - (r.minY - r.currentY + 1) ** .8),
                r.currentY > r.maxY && (r.currentY = r.maxY - 1 + (r.currentY - r.maxY + 1) ** .8),
                s.prevPositionX || (s.prevPositionX = r.touchesCurrent.x),
                s.prevPositionY || (s.prevPositionY = r.touchesCurrent.y),
                s.prevTime || (s.prevTime = Date.now()),
                s.x = (r.touchesCurrent.x - s.prevPositionX) / (Date.now() - s.prevTime) / 2,
                s.y = (r.touchesCurrent.y - s.prevPositionY) / (Date.now() - s.prevTime) / 2,
                Math.abs(r.touchesCurrent.x - s.prevPositionX) < 2 && (s.x = 0),
                Math.abs(r.touchesCurrent.y - s.prevPositionY) < 2 && (s.y = 0),
                s.prevPositionX = r.touchesCurrent.x,
                s.prevPositionY = r.touchesCurrent.y,
                s.prevTime = Date.now(),
                n.$imageWrapEl.transform(`translate3d(${r.currentX}px, ${r.currentY}px,0)`)
            }
        },
        onTouchEnd() {
            const e = this.zoom,
                {gesture: t, image: i, velocity: n} = e;
            if (!t.$imageEl || 0 === t.$imageEl.length)
                return;
            if (!i.isTouched || !i.isMoved)
                return i.isTouched = !1, void (i.isMoved = !1);
            i.isTouched = !1,
            i.isMoved = !1;
            let r = 300,
                s = 300;
            const o = n.x * r,
                a = i.currentX + o,
                l = n.y * s,
                c = i.currentY + l;
            0 !== n.x && (r = Math.abs((a - i.currentX) / n.x)),
            0 !== n.y && (s = Math.abs((c - i.currentY) / n.y));
            const d = Math.max(r, s);
            i.currentX = a,
            i.currentY = c;
            const u = i.width * e.scale,
                p = i.height * e.scale;
            i.minX = Math.min(t.slideWidth / 2 - u / 2, 0),
            i.maxX = -i.minX,
            i.minY = Math.min(t.slideHeight / 2 - p / 2, 0),
            i.maxY = -i.minY,
            i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX),
            i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY),
            t.$imageWrapEl.transition(d).transform(`translate3d(${i.currentX}px, ${i.currentY}px,0)`)
        },
        onTransitionEnd() {
            const e = this.zoom,
                {gesture: t} = e;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
        },
        toggle(e) {
            const t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        },
        in(e) {
            const t = this,
                i = t.zoom,
                n = t.params.zoom,
                {gesture: r, image: s} = i;
            if (r.$slideEl || (r.$slideEl = t.clickedSlide ? o(t.clickedSlide) : t.slides.eq(t.activeIndex), r.$imageEl = r.$slideEl.find("img, svg, canvas"), r.$imageWrapEl = r.$imageEl.parent(`.${n.containerClass}`)), !r.$imageEl || 0 === r.$imageEl.length)
                return;
            let a,
                l,
                c,
                d,
                u,
                p,
                h,
                f,
                m,
                g,
                v,
                y,
                b,
                w,
                x,
                T,
                E,
                S;
            r.$slideEl.addClass(`${n.zoomedSlideClass}`),
            void 0 === s.touchesStart.x && e ? (a = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, l = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (a = s.touchesStart.x, l = s.touchesStart.y),
            i.scale = r.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio,
            i.currentScale = r.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio,
            e ? (E = r.$slideEl[0].offsetWidth, S = r.$slideEl[0].offsetHeight, c = r.$slideEl.offset().left, d = r.$slideEl.offset().top, u = c + E / 2 - a, p = d + S / 2 - l, m = r.$imageEl[0].offsetWidth, g = r.$imageEl[0].offsetHeight, v = m * i.scale, y = g * i.scale, b = Math.min(E / 2 - v / 2, 0), w = Math.min(S / 2 - y / 2, 0), x = -b, T = -w, h = u * i.scale, f = p * i.scale, h < b && (h = b), h > x && (h = x), f < w && (f = w), f > T && (f = T)) : (h = 0, f = 0),
            r.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${f}px,0)`),
            r.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${i.scale})`)
        },
        out() {
            const e = this,
                t = e.zoom,
                i = e.params.zoom,
                {gesture: n} = t;
            n.$slideEl || (n.$slideEl = e.clickedSlide ? o(e.clickedSlide) : e.slides.eq(e.activeIndex), n.$imageEl = n.$slideEl.find("img, svg, canvas"), n.$imageWrapEl = n.$imageEl.parent(`.${i.containerClass}`)),
            n.$imageEl && 0 !== n.$imageEl.length && (t.scale = 1, t.currentScale = 1, n.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), n.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), n.$slideEl.removeClass(`${i.zoomedSlideClass}`), n.$slideEl = void 0)
        },
        enable() {
            const e = this,
                t = e.zoom;
            if (t.enabled)
                return;
            t.enabled = !0;
            const i = !("touchstart" !== e.touchEvents.start || !d.passiveListener || !e.params.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            d.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)),
            e.$wrapperEl.on(e.touchEvents.move, `.${e.params.zoom.containerClass}`, t.onTouchMove)
        },
        disable() {
            const e = this,
                t = e.zoom;
            if (!t.enabled)
                return;
            e.zoom.enabled = !1;
            const i = !("touchstart" !== e.touchEvents.start || !d.passiveListener || !e.params.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            d.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)),
            e.$wrapperEl.off(e.touchEvents.move, `.${e.params.zoom.containerClass}`, t.onTouchMove)
        }
    };
    const W = {
        loadInSlide(e, t=!0) {
            const i = this,
                n = i.params.lazy;
            if (void 0 === e)
                return;
            if (0 === i.slides.length)
                return;
            const r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children(`.${i.params.slideClass}[data-swiper-slide-index="${e}"]`) : i.slides.eq(e);
            let s = r.find(`.${n.elementClass}:not(.${n.loadedClass}):not(.${n.loadingClass})`);
            !r.hasClass(n.elementClass) || r.hasClass(n.loadedClass) || r.hasClass(n.loadingClass) || (s = s.add(r[0])),
            0 !== s.length && s.each((e, s) => {
                const a = o(s);
                a.addClass(n.loadingClass);
                const l = a.attr("data-background"),
                    c = a.attr("data-src"),
                    d = a.attr("data-srcset"),
                    u = a.attr("data-sizes");
                i.loadImage(a[0], c || l, d, u, !1, () => {
                    if (null != i && i && (!i || i.params) && !i.destroyed) {
                        if (l ? (a.css("background-image", `url("${l}")`), a.removeAttr("data-background")) : (d && (a.attr("srcset", d), a.removeAttr("data-srcset")), u && (a.attr("sizes", u), a.removeAttr("data-sizes")), c && (a.attr("src", c), a.removeAttr("data-src"))), a.addClass(n.loadedClass).removeClass(n.loadingClass), r.find(`.${n.preloaderClass}`).remove(), i.params.loop && t) {
                            const e = r.attr("data-swiper-slide-index");
                            if (r.hasClass(i.params.slideDuplicateClass)) {
                                const t = i.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${i.params.slideDuplicateClass})`);
                                i.lazy.loadInSlide(t.index(), !1)
                            } else {
                                const t = i.$wrapperEl.children(`.${i.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`);
                                i.lazy.loadInSlide(t.index(), !1)
                            }
                        }
                        i.emit("lazyImageReady", r[0], a[0])
                    }
                }),
                i.emit("lazyImageLoad", r[0], a[0])
            })
        },
        load() {
            const e = this,
                {$wrapperEl: t, params: i, slides: n, activeIndex: r} = e,
                s = e.virtual && i.virtual.enabled,
                a = i.lazy;
            let l = i.slidesPerView;
            function c(e) {
                if (s) {
                    if (t.children(`.${i.slideClass}[data-swiper-slide-index="${e}"]`).length)
                        return !0
                } else if (n[e])
                    return !0;
                return !1
            }
            function d(e) {
                return s ? o(e).attr("data-swiper-slide-index") : o(e).index()
            }
            if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility)
                t.children(`.${i.slideVisibleClass}`).each((t, i) => {
                    const n = s ? o(i).attr("data-swiper-slide-index") : o(i).index();
                    e.lazy.loadInSlide(n)
                });
            else if (l > 1)
                for (let t = r; t < r + l; t += 1)
                    c(t) && e.lazy.loadInSlide(t);
            else
                e.lazy.loadInSlide(r);
            if (a.loadPrevNext)
                if (l > 1 || a.loadPrevNextAmount && a.loadPrevNextAmount > 1) {
                    const t = a.loadPrevNextAmount,
                        i = l,
                        s = Math.min(r + i + Math.max(t, i), n.length),
                        o = Math.max(r - Math.max(i, t), 0);
                    for (let t = r + l; t < s; t += 1)
                        c(t) && e.lazy.loadInSlide(t);
                    for (let t = o; t < r; t += 1)
                        c(t) && e.lazy.loadInSlide(t)
                } else {
                    const n = t.children(`.${i.slideNextClass}`);
                    n.length > 0 && e.lazy.loadInSlide(d(n));
                    const r = t.children(`.${i.slidePrevClass}`);
                    r.length > 0 && e.lazy.loadInSlide(d(r))
                }
        }
    };
    const V = {
        LinearSpline: function(e, t) {
            const i = function() {
                let e,
                    t,
                    i;
                return (n, r) => {
                    for (t = -1, e = n.length; e - t > 1;)
                        i = e + t >> 1,
                        n[i] <= r ? t = i : e = i;
                    return e
                }
            }();
            let n,
                r;
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                return e ? (r = i(this.x, e), n = r - 1, (e - this.x[n]) * (this.y[r] - this.y[n]) / (this.x[r] - this.x[n]) + this.y[n]) : 0
            }, this
        },
        getInterpolateFunction(e) {
            const t = this;
            t.controller.spline || (t.controller.spline = t.params.loop ? new V.LinearSpline(t.slidesGrid, e.slidesGrid) : new V.LinearSpline(t.snapGrid, e.snapGrid))
        },
        setTranslate(e, t) {
            const i = this,
                n = i.controller.control;
            let r,
                s;
            function o(e) {
                const t = i.rtlTranslate ? -i.translate : i.translate;
                "slide" === i.params.controller.by && (i.controller.getInterpolateFunction(e), s = -i.controller.spline.interpolate(-t)),
                s && "container" !== i.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (i.maxTranslate() - i.minTranslate()), s = (t - i.minTranslate()) * r + e.minTranslate()),
                i.params.controller.inverse && (s = e.maxTranslate() - s),
                e.updateProgress(s),
                e.setTranslate(s, i),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            if (Array.isArray(n))
                for (let e = 0; e < n.length; e += 1)
                    n[e] !== t && n[e] instanceof z && o(n[e]);
            else
                n instanceof z && t !== n && o(n)
        },
        setTransition(e, t) {
            const i = this,
                n = i.controller.control;
            let r;
            function s(t) {
                t.setTransition(e, i),
                0 !== e && (t.transitionStart(), t.params.autoHeight && c.nextTick(() => {
                    t.updateAutoHeight()
                }), t.$wrapperEl.transitionEnd(() => {
                    n && (t.params.loop && "slide" === i.params.controller.by && t.loopFix(), t.transitionEnd())
                }))
            }
            if (Array.isArray(n))
                for (r = 0; r < n.length; r += 1)
                    n[r] !== t && n[r] instanceof z && s(n[r]);
            else
                n instanceof z && t !== n && s(n)
        }
    };
    const G = {
        makeElFocusable: e => (e.attr("tabIndex", "0"), e),
        addElRole: (e, t) => (e.attr("role", t), e),
        addElLabel: (e, t) => (e.attr("aria-label", t), e),
        disableEl: e => (e.attr("aria-disabled", !0), e),
        enableEl: e => (e.attr("aria-disabled", !1), e),
        onEnterKey(e) {
            const t = this,
                i = t.params.a11y;
            if (13 !== e.keyCode)
                return;
            const n = o(e.target);
            t.navigation && t.navigation.$nextEl && n.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)),
            t.navigation && t.navigation.$prevEl && n.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)),
            t.pagination && n.is(`.${t.params.pagination.bulletClass}`) && n[0].click()
        },
        notify(e) {
            const t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""), t.html(e))
        },
        updateNavigation() {
            const e = this;
            if (e.params.loop)
                return;
            const {$nextEl: t, $prevEl: i} = e.navigation;
            i && i.length > 0 && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)),
            t && t.length > 0 && (e.isEnd ? e.a11y.disableEl(t) : e.a11y.enableEl(t))
        },
        updatePagination() {
            const e = this,
                t = e.params.a11y;
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((i, n) => {
                const r = o(n);
                e.a11y.makeElFocusable(r),
                e.a11y.addElRole(r, "button"),
                e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
            })
        },
        init() {
            const e = this;
            e.$el.append(e.a11y.liveRegion);
            const t = e.params.a11y;
            let i,
                n;
            e.navigation && e.navigation.$nextEl && (i = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (n = e.navigation.$prevEl),
            i && (e.a11y.makeElFocusable(i), e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, t.nextSlideMessage), i.on("keydown", e.a11y.onEnterKey)),
            n && (e.a11y.makeElFocusable(n), e.a11y.addElRole(n, "button"), e.a11y.addElLabel(n, t.prevSlideMessage), n.on("keydown", e.a11y.onEnterKey)),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", `.${e.params.pagination.bulletClass}`, e.a11y.onEnterKey)
        },
        destroy() {
            const e = this;
            let t,
                i;
            e.a11y.liveRegion && e.a11y.liveRegion.length > 0 && e.a11y.liveRegion.remove(),
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
            t && t.off("keydown", e.a11y.onEnterKey),
            i && i.off("keydown", e.a11y.onEnterKey),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.off("keydown", `.${e.params.pagination.bulletClass}`, e.a11y.onEnterKey)
        }
    };
    const U = {
        init() {
            const e = this;
            if (!e.params.history)
                return;
            if (!r.history || !r.history.pushState)
                return e.params.history.enabled = !1, void (e.params.hashNavigation.enabled = !0);
            const t = e.history;
            t.initialized = !0,
            t.paths = U.getPathValues(),
            (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || r.addEventListener("popstate", e.history.setHistoryPopState))
        },
        destroy() {
            const e = this;
            e.params.history.replaceState || r.removeEventListener("popstate", e.history.setHistoryPopState)
        },
        setHistoryPopState() {
            this.history.paths = U.getPathValues(),
            this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        },
        getPathValues() {
            const e = r.location.pathname.slice(1).split("/").filter(e => "" !== e),
                t = e.length;
            return {
                key: e[t - 2],
                value: e[t - 1]
            }
        },
        setHistory(e, t) {
            if (!this.history.initialized || !this.params.history.enabled)
                return;
            const i = this.slides.eq(t);
            let n = U.slugify(i.attr("data-history"));
            r.location.pathname.includes(e) || (n = `${e}/${n}`);
            const s = r.history.state;
            s && s.value === n || (this.params.history.replaceState ? r.history.replaceState({
                value: n
            }, null, n) : r.history.pushState({
                value: n
            }, null, n))
        },
        slugify: e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
        scrollToSlide(e, t, i) {
            const n = this;
            if (t)
                for (let r = 0, s = n.slides.length; r < s; r += 1) {
                    const s = n.slides.eq(r);
                    if (U.slugify(s.attr("data-history")) === t && !s.hasClass(n.params.slideDuplicateClass)) {
                        const t = s.index();
                        n.slideTo(t, e, i)
                    }
                }
            else
                n.slideTo(0, e, i)
        }
    };
    const K = {
        onHashCange() {
            const e = this,
                t = n.location.hash.replace("#", "");
            if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                const i = e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${t}"]`).index();
                if (void 0 === i)
                    return;
                e.slideTo(i)
            }
        },
        setHash() {
            const e = this;
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                if (e.params.hashNavigation.replaceState && r.history && r.history.replaceState)
                    r.history.replaceState(null, null, `#${e.slides.eq(e.activeIndex).attr("data-hash")}` || "");
                else {
                    const t = e.slides.eq(e.activeIndex),
                        i = t.attr("data-hash") || t.attr("data-history");
                    n.location.hash = i || ""
                }
        },
        init() {
            const e = this;
            if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)
                return;
            e.hashNavigation.initialized = !0;
            const t = n.location.hash.replace("#", "");
            if (t) {
                const i = 0;
                for (let n = 0, r = e.slides.length; n < r; n += 1) {
                    const r = e.slides.eq(n);
                    if ((r.attr("data-hash") || r.attr("data-history")) === t && !r.hasClass(e.params.slideDuplicateClass)) {
                        const t = r.index();
                        e.slideTo(t, i, e.params.runCallbacksOnInit, !0)
                    }
                }
            }
            e.params.hashNavigation.watchState && o(r).on("hashchange", e.hashNavigation.onHashCange)
        },
        destroy() {
            const e = this;
            e.params.hashNavigation.watchState && o(r).off("hashchange", e.hashNavigation.onHashCange)
        }
    };
    const Z = {
        run() {
            const e = this,
                t = e.slides.eq(e.activeIndex);
            let i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = c.nextTick(() => {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
            }, i)
        },
        start() {
            return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0))
        },
        stop() {
            const e = this;
            return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
        },
        pause(e) {
            const t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
        }
    };
    const Q = {
        setTranslate() {
            const e = this,
                {slides: t} = e;
            for (let i = 0; i < t.length; i += 1) {
                const t = e.slides.eq(i);
                let n = -t[0].swiperSlideOffset;
                e.params.virtualTranslate || (n -= e.translate);
                let r = 0;
                e.isHorizontal() || (r = n, n = 0);
                const s = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                t.css({
                    opacity: s
                }).transform(`translate3d(${n}px, ${r}px, 0px)`)
            }
        },
        setTransition(e) {
            const t = this,
                {slides: i, $wrapperEl: n} = t;
            if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                let e = !1;
                i.transitionEnd(() => {
                    if (e)
                        return;
                    if (!t || t.destroyed)
                        return;
                    e = !0,
                    t.animating = !1;
                    const i = ["webkitTransitionEnd", "transitionend"];
                    for (let e = 0; e < i.length; e += 1)
                        n.trigger(i[e])
                })
            }
        }
    };
    const J = {
        setTranslate() {
            const {$el: e, $wrapperEl: t, slides: i, width: n, height: r, rtlTranslate: s, size: a} = this,
                l = this.params.cubeEffect,
                c = this.isHorizontal(),
                d = this.virtual && this.params.virtual.enabled;
            let p,
                h = 0;
            l.shadow && (c ? (p = t.find(".swiper-cube-shadow"), 0 === p.length && (p = o('<div class="swiper-cube-shadow"></div>'), t.append(p)), p.css({
                height: `${n}px`
            })) : (p = e.find(".swiper-cube-shadow"), 0 === p.length && (p = o('<div class="swiper-cube-shadow"></div>'), e.append(p))));
            for (let e = 0; e < i.length; e += 1) {
                const t = i.eq(e);
                let n = e;
                d && (n = parseInt(t.attr("data-swiper-slide-index"), 10));
                let r = 90 * n,
                    u = Math.floor(r / 360);
                s && (r = -r, u = Math.floor(-r / 360));
                const p = Math.max(Math.min(t[0].progress, 1), -1);
                let f = 0,
                    m = 0,
                    g = 0;
                n % 4 == 0 ? (f = 4 * -u * a, g = 0) : (n - 1) % 4 == 0 ? (f = 0, g = 4 * -u * a) : (n - 2) % 4 == 0 ? (f = a + 4 * u * a, g = a) : (n - 3) % 4 == 0 && (f = -a, g = 3 * a + 4 * a * u),
                s && (f = -f),
                c || (m = f, f = 0);
                const v = `rotateX(${c ? 0 : -r}deg) rotateY(${c ? r : 0}deg) translate3d(${f}px, ${m}px, ${g}px)`;
                if (p <= 1 && p > -1 && (h = 90 * n + 90 * p, s && (h = 90 * -n - 90 * p)), t.transform(v), l.slideShadows) {
                    let e = c ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                        i = c ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                    0 === e.length && (e = o(`<div class="swiper-slide-shadow-${c ? "left" : "top"}"></div>`), t.append(e)),
                    0 === i.length && (i = o(`<div class="swiper-slide-shadow-${c ? "right" : "bottom"}"></div>`), t.append(i)),
                    e.length && (e[0].style.opacity = Math.max(-p, 0)),
                    i.length && (i[0].style.opacity = Math.max(p, 0))
                }
            }
            if (t.css({
                "-webkit-transform-origin": `50% 50% -${a / 2}px`,
                "-moz-transform-origin": `50% 50% -${a / 2}px`,
                "-ms-transform-origin": `50% 50% -${a / 2}px`,
                "transform-origin": `50% 50% -${a / 2}px`
            }), l.shadow)
                if (c)
                    p.transform(`translate3d(0px, ${n / 2 + l.shadowOffset}px, ${-n / 2}px) rotateX(90deg) rotateZ(0deg) scale(${l.shadowScale})`);
                else {
                    const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                        t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
                        i = l.shadowScale,
                        n = l.shadowScale / t,
                        s = l.shadowOffset;
                    p.transform(`scale3d(${i}, 1, ${n}) translate3d(0px, ${r / 2 + s}px, ${-r / 2 / n}px) rotateX(-90deg)`)
                }
            const f = u.isSafari || u.isUiWebView ? -a / 2 : 0;
            t.transform(`translate3d(0px,0,${f}px) rotateX(${this.isHorizontal() ? 0 : h}deg) rotateY(${this.isHorizontal() ? -h : 0}deg)`)
        },
        setTransition(e) {
            const {$el: t, slides: i} = this;
            i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    };
    const ee = {
        setTranslate() {
            const e = this,
                {slides: t, rtlTranslate: i} = e;
            for (let n = 0; n < t.length; n += 1) {
                const r = t.eq(n);
                let s = r[0].progress;
                e.params.flipEffect.limitRotation && (s = Math.max(Math.min(r[0].progress, 1), -1));
                let a = -180 * s,
                    l = 0,
                    c = -r[0].swiperSlideOffset,
                    d = 0;
                if (e.isHorizontal() ? i && (a = -a) : (d = c, c = 0, l = -a, a = 0), r[0].style.zIndex = -Math.abs(Math.round(s)) + t.length, e.params.flipEffect.slideShadows) {
                    let t = e.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                        i = e.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                    0 === t.length && (t = o(`<div class="swiper-slide-shadow-${e.isHorizontal() ? "left" : "top"}"></div>`), r.append(t)),
                    0 === i.length && (i = o(`<div class="swiper-slide-shadow-${e.isHorizontal() ? "right" : "bottom"}"></div>`), r.append(i)),
                    t.length && (t[0].style.opacity = Math.max(-s, 0)),
                    i.length && (i[0].style.opacity = Math.max(s, 0))
                }
                r.transform(`translate3d(${c}px, ${d}px, 0px) rotateX(${l}deg) rotateY(${a}deg)`)
            }
        },
        setTransition(e) {
            const t = this,
                {slides: i, activeIndex: n, $wrapperEl: r} = t;
            if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                let e = !1;
                i.eq(n).transitionEnd((function() {
                    if (e)
                        return;
                    if (!t || t.destroyed)
                        return;
                    e = !0,
                    t.animating = !1;
                    const i = ["webkitTransitionEnd", "transitionend"];
                    for (let e = 0; e < i.length; e += 1)
                        r.trigger(i[e])
                }))
            }
        }
    };
    const te = {
        setTranslate() {
            const {width: e, height: t, slides: i, $wrapperEl: n, slidesSizesGrid: r} = this,
                s = this.params.coverflowEffect,
                a = this.isHorizontal(),
                l = this.translate,
                c = a ? e / 2 - l : t / 2 - l,
                u = a ? s.rotate : -s.rotate,
                p = s.depth;
            for (let e = 0, t = i.length; e < t; e += 1) {
                const t = i.eq(e),
                    n = r[e],
                    l = (c - t[0].swiperSlideOffset - n / 2) / n * s.modifier;
                let d = a ? u * l : 0,
                    h = a ? 0 : u * l,
                    f = -p * Math.abs(l),
                    m = a ? 0 : s.stretch * l,
                    g = a ? s.stretch * l : 0;
                Math.abs(g) < .001 && (g = 0),
                Math.abs(m) < .001 && (m = 0),
                Math.abs(f) < .001 && (f = 0),
                Math.abs(d) < .001 && (d = 0),
                Math.abs(h) < .001 && (h = 0);
                const v = `translate3d(${g}px,${m}px,${f}px)  rotateX(${h}deg) rotateY(${d}deg)`;
                if (t.transform(v), t[0].style.zIndex = 1 - Math.abs(Math.round(l)), s.slideShadows) {
                    let e = a ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                        i = a ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                    0 === e.length && (e = o(`<div class="swiper-slide-shadow-${a ? "left" : "top"}"></div>`), t.append(e)),
                    0 === i.length && (i = o(`<div class="swiper-slide-shadow-${a ? "right" : "bottom"}"></div>`), t.append(i)),
                    e.length && (e[0].style.opacity = l > 0 ? l : 0),
                    i.length && (i[0].style.opacity = -l > 0 ? -l : 0)
                }
            }
            if (d.pointerEvents || d.prefixedPointerEvents) {
                n[0].style.perspectiveOrigin = `${c}px 50%`
            }
        },
        setTransition(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    };
    const ie = {
        init() {
            const e = this,
                {thumbs: t} = e.params,
                i = e.constructor;
            t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, c.extend(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), c.extend(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : c.isObject(t.swiper) && (e.thumbs.swiper = new i(c.extend({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })), e.thumbs.swiperCreated = !0),
            e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
            e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
        },
        onThumbClick() {
            const e = this,
                t = e.thumbs.swiper;
            if (!t)
                return;
            const i = t.clickedIndex,
                n = t.clickedSlide;
            if (n && o(n).hasClass(e.params.thumbs.slideThumbActiveClass))
                return;
            if (null == i)
                return;
            let r;
            if (r = t.params.loop ? parseInt(o(t.clickedSlide).attr("data-swiper-slide-index"), 10) : i, e.params.loop) {
                let t = e.activeIndex;
                e.slides.eq(t).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, t = e.activeIndex);
                const i = e.slides.eq(t).prevAll(`[data-swiper-slide-index="${r}"]`).eq(0).index(),
                    n = e.slides.eq(t).nextAll(`[data-swiper-slide-index="${r}"]`).eq(0).index();
                r = void 0 === i ? n : void 0 === n ? i : n - t < t - i ? n : i
            }
            e.slideTo(r)
        },
        update(e) {
            const t = this,
                i = t.thumbs.swiper;
            if (!i)
                return;
            const n = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView;
            if (t.realIndex !== i.realIndex) {
                let r,
                    s = i.activeIndex;
                if (i.params.loop) {
                    i.slides.eq(s).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, s = i.activeIndex);
                    const e = i.slides.eq(s).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),
                        n = i.slides.eq(s).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();
                    r = void 0 === e ? n : void 0 === n ? e : n - s == s - e ? s : n - s < s - e ? n : e
                } else
                    r = t.realIndex;
                i.visibleSlidesIndexes && i.visibleSlidesIndexes.indexOf(r) < 0 && (i.params.centeredSlides ? r = r > s ? r - Math.floor(n / 2) + 1 : r + Math.floor(n / 2) - 1 : r > s && (r = r - n + 1), i.slideTo(r, e ? 0 : void 0))
            }
            let r = 1;
            const s = t.params.thumbs.slideThumbActiveClass;
            if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (r = t.params.slidesPerView), i.slides.removeClass(s), i.params.loop || i.params.virtual)
                for (let e = 0; e < r; e += 1)
                    i.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex + e}"]`).addClass(s);
            else
                for (let e = 0; e < r; e += 1)
                    i.slides.eq(t.realIndex + e).addClass(s)
        }
    };
    const ne = [L, P, A, D, N, H, _, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create() {
            c.extend(this, {
                mousewheel: {
                    enabled: !1,
                    enable: q.enable.bind(this),
                    disable: q.disable.bind(this),
                    handle: q.handle.bind(this),
                    handleMouseEnter: q.handleMouseEnter.bind(this),
                    handleMouseLeave: q.handleMouseLeave.bind(this),
                    lastScrollTime: c.now()
                }
            })
        },
        on: {
            init() {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            },
            destroy() {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create() {
            c.extend(this, {
                navigation: {
                    init: B.init.bind(this),
                    update: B.update.bind(this),
                    destroy: B.destroy.bind(this),
                    onNextClick: B.onNextClick.bind(this),
                    onPrevClick: B.onPrevClick.bind(this)
                }
            })
        },
        on: {
            init() {
                this.navigation.init(),
                this.navigation.update()
            },
            toEdge() {
                this.navigation.update()
            },
            fromEdge() {
                this.navigation.update()
            },
            destroy() {
                this.navigation.destroy()
            },
            click(e) {
                const t = this,
                    {$nextEl: i, $prevEl: n} = t.navigation;
                if (t.params.navigation.hideOnClick && !o(e.target).is(n) && !o(e.target).is(i)) {
                    let e;
                    i ? e = i.hasClass(t.params.navigation.hiddenClass) : n && (e = n.hasClass(t.params.navigation.hiddenClass)),
                    !0 === e ? t.emit("navigationShow", t) : t.emit("navigationHide", t),
                    i && i.toggleClass(t.params.navigation.hiddenClass),
                    n && n.toggleClass(t.params.navigation.hiddenClass)
                }
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e => e,
                formatFractionTotal: e => e,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create() {
            c.extend(this, {
                pagination: {
                    init: R.init.bind(this),
                    render: R.render.bind(this),
                    update: R.update.bind(this),
                    destroy: R.destroy.bind(this),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init() {
                this.pagination.init(),
                this.pagination.render(),
                this.pagination.update()
            },
            activeIndexChange() {
                const e = this;
                (e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
            },
            snapIndexChange() {
                const e = this;
                e.params.loop || e.pagination.update()
            },
            slidesLengthChange() {
                const e = this;
                e.params.loop && (e.pagination.render(), e.pagination.update())
            },
            snapGridLengthChange() {
                const e = this;
                e.params.loop || (e.pagination.render(), e.pagination.update())
            },
            destroy() {
                this.pagination.destroy()
            },
            click(e) {
                const t = this;
                if (t.params.pagination.el && t.params.pagination.hideOnClick && t.pagination.$el.length > 0 && !o(e.target).hasClass(t.params.pagination.bulletClass)) {
                    !0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t),
                    t.pagination.$el.toggleClass(t.params.pagination.hiddenClass)
                }
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create() {
            c.extend(this, {
                scrollbar: {
                    init: X.init.bind(this),
                    destroy: X.destroy.bind(this),
                    updateSize: X.updateSize.bind(this),
                    setTranslate: X.setTranslate.bind(this),
                    setTransition: X.setTransition.bind(this),
                    enableDraggable: X.enableDraggable.bind(this),
                    disableDraggable: X.disableDraggable.bind(this),
                    setDragPosition: X.setDragPosition.bind(this),
                    getPointerPosition: X.getPointerPosition.bind(this),
                    onDragStart: X.onDragStart.bind(this),
                    onDragMove: X.onDragMove.bind(this),
                    onDragEnd: X.onDragEnd.bind(this),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init() {
                this.scrollbar.init(),
                this.scrollbar.updateSize(),
                this.scrollbar.setTranslate()
            },
            update() {
                this.scrollbar.updateSize()
            },
            resize() {
                this.scrollbar.updateSize()
            },
            observerUpdate() {
                this.scrollbar.updateSize()
            },
            setTranslate() {
                this.scrollbar.setTranslate()
            },
            setTransition(e) {
                this.scrollbar.setTransition(e)
            },
            destroy() {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create() {
            c.extend(this, {
                parallax: {
                    setTransform: F.setTransform.bind(this),
                    setTranslate: F.setTranslate.bind(this),
                    setTransition: F.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit() {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            },
            init() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTranslate() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTransition(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create() {
            const e = this,
                t = {
                    enabled: !1,
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        $slideEl: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        $imageEl: void 0,
                        $imageWrapEl: void 0,
                        maxRatio: 3
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    }
                };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(i => {
                t[i] = Y[i].bind(e)
            }),
            c.extend(e, {
                zoom: t
            });
            let i = 1;
            Object.defineProperty(e.zoom, "scale", {
                get: () => i,
                set(t) {
                    if (i !== t) {
                        const i = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                            n = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                        e.emit("zoomChange", t, i, n)
                    }
                    i = t
                }
            })
        },
        on: {
            init() {
                const e = this;
                e.params.zoom.enabled && e.zoom.enable()
            },
            destroy() {
                this.zoom.disable()
            },
            touchStart(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            },
            touchEnd(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            },
            doubleTap(e) {
                const t = this;
                t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && t.zoom.toggle(e)
            },
            transitionEnd() {
                const e = this;
                e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create() {
            c.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: W.load.bind(this),
                    loadInSlide: W.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit() {
                const e = this;
                e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
            },
            init() {
                const e = this;
                e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && e.lazy.load()
            },
            scroll() {
                const e = this;
                e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
            },
            resize() {
                const e = this;
                e.params.lazy.enabled && e.lazy.load()
            },
            scrollbarDragMove() {
                const e = this;
                e.params.lazy.enabled && e.lazy.load()
            },
            transitionStart() {
                const e = this;
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
            },
            transitionEnd() {
                const e = this;
                e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create() {
            c.extend(this, {
                controller: {
                    control: this.params.controller.control,
                    getInterpolateFunction: V.getInterpolateFunction.bind(this),
                    setTranslate: V.setTranslate.bind(this),
                    setTransition: V.setTransition.bind(this)
                }
            })
        },
        on: {
            update() {
                const e = this;
                e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
            },
            resize() {
                const e = this;
                e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
            },
            observerUpdate() {
                const e = this;
                e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
            },
            setTranslate(e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            },
            setTransition(e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create() {
            const e = this;
            c.extend(e, {
                a11y: {
                    liveRegion: o(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
                }
            }),
            Object.keys(G).forEach(t => {
                e.a11y[t] = G[t].bind(e)
            })
        },
        on: {
            init() {
                this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
            },
            toEdge() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            fromEdge() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            paginationUpdate() {
                this.params.a11y.enabled && this.a11y.updatePagination()
            },
            destroy() {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create() {
            c.extend(this, {
                history: {
                    init: U.init.bind(this),
                    setHistory: U.setHistory.bind(this),
                    setHistoryPopState: U.setHistoryPopState.bind(this),
                    scrollToSlide: U.scrollToSlide.bind(this),
                    destroy: U.destroy.bind(this)
                }
            })
        },
        on: {
            init() {
                const e = this;
                e.params.history.enabled && e.history.init()
            },
            destroy() {
                const e = this;
                e.params.history.enabled && e.history.destroy()
            },
            transitionEnd() {
                const e = this;
                e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create() {
            c.extend(this, {
                hashNavigation: {
                    initialized: !1,
                    init: K.init.bind(this),
                    destroy: K.destroy.bind(this),
                    setHash: K.setHash.bind(this),
                    onHashCange: K.onHashCange.bind(this)
                }
            })
        },
        on: {
            init() {
                const e = this;
                e.params.hashNavigation.enabled && e.hashNavigation.init()
            },
            destroy() {
                const e = this;
                e.params.hashNavigation.enabled && e.hashNavigation.destroy()
            },
            transitionEnd() {
                const e = this;
                e.hashNavigation.initialized && e.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create() {
            const e = this;
            c.extend(e, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: Z.run.bind(e),
                    start: Z.start.bind(e),
                    stop: Z.stop.bind(e),
                    pause: Z.pause.bind(e),
                    onTransitionEnd(t) {
                        e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init() {
                const e = this;
                e.params.autoplay.enabled && e.autoplay.start()
            },
            beforeTransitionStart(e, t) {
                const i = this;
                i.autoplay.running && (t || !i.params.autoplay.disableOnInteraction ? i.autoplay.pause(e) : i.autoplay.stop())
            },
            sliderFirstMove() {
                const e = this;
                e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
            },
            destroy() {
                const e = this;
                e.autoplay.running && e.autoplay.stop()
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create() {
            c.extend(this, {
                fadeEffect: {
                    setTranslate: Q.setTranslate.bind(this),
                    setTransition: Q.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit() {
                if ("fade" !== this.params.effect)
                    return;
                this.classNames.push(`${this.params.containerModifierClass}fade`);
                const e = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    spaceBetween: 0,
                    virtualTranslate: !0
                };
                c.extend(this.params, e),
                c.extend(this.originalParams, e)
            },
            setTranslate() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            },
            setTransition(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create() {
            c.extend(this, {
                cubeEffect: {
                    setTranslate: J.setTranslate.bind(this),
                    setTransition: J.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit() {
                if ("cube" !== this.params.effect)
                    return;
                this.classNames.push(`${this.params.containerModifierClass}cube`),
                this.classNames.push(`${this.params.containerModifierClass}3d`);
                const e = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    resistanceRatio: 0,
                    spaceBetween: 0,
                    centeredSlides: !1,
                    virtualTranslate: !0
                };
                c.extend(this.params, e),
                c.extend(this.originalParams, e)
            },
            setTranslate() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            },
            setTransition(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create() {
            c.extend(this, {
                flipEffect: {
                    setTranslate: ee.setTranslate.bind(this),
                    setTransition: ee.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit() {
                if ("flip" !== this.params.effect)
                    return;
                this.classNames.push(`${this.params.containerModifierClass}flip`),
                this.classNames.push(`${this.params.containerModifierClass}3d`);
                const e = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    spaceBetween: 0,
                    virtualTranslate: !0
                };
                c.extend(this.params, e),
                c.extend(this.originalParams, e)
            },
            setTranslate() {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            },
            setTransition(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create() {
            c.extend(this, {
                coverflowEffect: {
                    setTranslate: te.setTranslate.bind(this),
                    setTransition: te.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit() {
                "coverflow" === this.params.effect && (this.classNames.push(`${this.params.containerModifierClass}coverflow`), this.classNames.push(`${this.params.containerModifierClass}3d`), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            },
            setTranslate() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            },
            setTransition(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create() {
            c.extend(this, {
                thumbs: {
                    swiper: null,
                    init: ie.init.bind(this),
                    update: ie.update.bind(this),
                    onThumbClick: ie.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit() {
                const {thumbs: e} = this.params;
                e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
            },
            slideChange() {
                this.thumbs.swiper && this.thumbs.update()
            },
            update() {
                this.thumbs.swiper && this.thumbs.update()
            },
            resize() {
                this.thumbs.swiper && this.thumbs.update()
            },
            observerUpdate() {
                this.thumbs.swiper && this.thumbs.update()
            },
            setTransition(e) {
                const t = this.thumbs.swiper;
                t && t.setTransition(e)
            },
            beforeDestroy() {
                const e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }];
    void 0 === z.use && (z.use = z.Class.use, z.installModule = z.Class.installModule),
    z.use(ne);
    t.a = z
}, , function(e, t, i) {
    var n,
        r;
    "undefined" != typeof window && window,
    void 0 === (r = "function" == typeof (n = function() {
        "use strict";
        function e() {}
        var t = e.prototype;
        return t.on = function(e, t) {
            if (e && t) {
                var i = this._events = this._events || {},
                    n = i[e] = i[e] || [];
                return -1 == n.indexOf(t) && n.push(t), this
            }
        }, t.once = function(e, t) {
            if (e && t) {
                this.on(e, t);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[e] = i[e] || {})[t] = !0, this
            }
        }, t.off = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = i.indexOf(t);
                return -1 != n && i.splice(n, 1), this
            }
        }, t.emitEvent = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                i = i.slice(0),
                t = t || [];
                for (var n = this._onceEvents && this._onceEvents[e], r = 0; r < i.length; r++) {
                    var s = i[r];
                    n && n[s] && (this.off(e, s), delete n[s]),
                    s.apply(this, t)
                }
                return this
            }
        }, t.allOff = function() {
            delete this._events,
            delete this._onceEvents
        }, e
    }) ? n.call(t, i, t, e) : n) || (e.exports = r)
}, , , function(e, t, i) {
    (function(t, i) {
        var n;
        n = function() {
            "use strict";
            function e(e) {
                return "function" == typeof e
            }
            var n = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                r = 0,
                s = void 0,
                o = void 0,
                a = function(e, t) {
                    f[r] = e,
                    f[r + 1] = t,
                    2 === (r += 2) && (o ? o(m) : w())
                },
                l = "undefined" != typeof window ? window : void 0,
                c = l || {},
                d = c.MutationObserver || c.WebKitMutationObserver,
                u = "undefined" == typeof self && void 0 !== t && "[object process]" === {}.toString.call(t),
                p = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;
            function h() {
                var e = setTimeout;
                return function() {
                    return e(m, 1)
                }
            }
            var f = new Array(1e3);
            function m() {
                for (var e = 0; e < r; e += 2)
                    (0, f[e])(f[e + 1]),
                    f[e] = void 0,
                    f[e + 1] = void 0;
                r = 0
            }
            var g,
                v,
                y,
                b,
                w = void 0;
            function x(e, t) {
                var i = this,
                    n = new this.constructor(S);
                void 0 === n[E] && I(n);
                var r = i._state;
                if (r) {
                    var s = arguments[r - 1];
                    a((function() {
                        return A(r, n, s, i._result)
                    }))
                } else
                    L(i, n, e, t);
                return n
            }
            function T(e) {
                if (e && "object" == typeof e && e.constructor === this)
                    return e;
                var t = new this(S);
                return k(t, e), t
            }
            u ? w = function() {
                return t.nextTick(m)
            } : d ? (v = 0, y = new d(m), b = document.createTextNode(""), y.observe(b, {
                characterData: !0
            }), w = function() {
                b.data = v = ++v % 2
            }) : p ? ((g = new MessageChannel).port1.onmessage = m, w = function() {
                return g.port2.postMessage(0)
            }) : w = void 0 === l ? function() {
                try {
                    var e = Function("return this")().require("vertx");
                    return void 0 !== (s = e.runOnLoop || e.runOnContext) ? function() {
                        s(m)
                    } : h()
                } catch (e) {
                    return h()
                }
            }() : h();
            var E = Math.random().toString(36).substring(2);
            function S() {}
            function C(t, i, n) {
                i.constructor === t.constructor && n === x && i.constructor.resolve === T ? function(e, t) {
                    1 === t._state ? $(e, t._result) : 2 === t._state ? z(e, t._result) : L(t, void 0, (function(t) {
                        return k(e, t)
                    }), (function(t) {
                        return z(e, t)
                    }))
                }(t, i) : void 0 === n ? $(t, i) : e(n) ? function(e, t, i) {
                    a((function(e) {
                        var n = !1,
                            r = function(e, t, i, n) {
                                try {
                                    e.call(t, i, n)
                                } catch (e) {
                                    return e
                                }
                            }(i, t, (function(i) {
                                n || (n = !0, t !== i ? k(e, i) : $(e, i))
                            }), (function(t) {
                                n || (n = !0, z(e, t))
                            }), e._label);
                        !n && r && (n = !0, z(e, r))
                    }), e)
                }(t, i, n) : $(t, i)
            }
            function k(e, t) {
                if (e === t)
                    z(e, new TypeError("You cannot resolve a promise with itself"));
                else if (r = typeof (n = t), null === n || "object" !== r && "function" !== r)
                    $(e, t);
                else {
                    var i = void 0;
                    try {
                        i = t.then
                    } catch (t) {
                        return void z(e, t)
                    }
                    C(e, t, i)
                }
                var n,
                    r
            }
            function M(e) {
                e._onerror && e._onerror(e._result),
                P(e)
            }
            function $(e, t) {
                void 0 === e._state && (e._result = t, e._state = 1, 0 !== e._subscribers.length && a(P, e))
            }
            function z(e, t) {
                void 0 === e._state && (e._state = 2, e._result = t, a(M, e))
            }
            function L(e, t, i, n) {
                var r = e._subscribers,
                    s = r.length;
                e._onerror = null,
                r[s] = t,
                r[s + 1] = i,
                r[s + 2] = n,
                0 === s && e._state && a(P, e)
            }
            function P(e) {
                var t = e._subscribers,
                    i = e._state;
                if (0 !== t.length) {
                    for (var n = void 0, r = void 0, s = e._result, o = 0; o < t.length; o += 3)
                        n = t[o],
                        r = t[o + i],
                        n ? A(i, n, r, s) : r(s);
                    e._subscribers.length = 0
                }
            }
            function A(t, i, n, r) {
                var s = e(n),
                    o = void 0,
                    a = void 0,
                    l = !0;
                if (s) {
                    try {
                        o = n(r)
                    } catch (e) {
                        l = !1,
                        a = e
                    }
                    if (i === o)
                        return void z(i, new TypeError("A promises callback cannot return that same promise."))
                } else
                    o = r;
                void 0 !== i._state || (s && l ? k(i, o) : !1 === l ? z(i, a) : 1 === t ? $(i, o) : 2 === t && z(i, o))
            }
            var D = 0;
            function I(e) {
                e[E] = D++,
                e._state = void 0,
                e._result = void 0,
                e._subscribers = []
            }
            var N = function() {
                    function e(e, t) {
                        this._instanceConstructor = e,
                        this.promise = new e(S),
                        this.promise[E] || I(this.promise),
                        n(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? $(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && $(this.promise, this._result))) : z(this.promise, new Error("Array Methods must be provided an Array"))
                    }
                    return e.prototype._enumerate = function(e) {
                        for (var t = 0; void 0 === this._state && t < e.length; t++)
                            this._eachEntry(e[t], t)
                    }, e.prototype._eachEntry = function(e, t) {
                        var i = this._instanceConstructor,
                            n = i.resolve;
                        if (n === T) {
                            var r = void 0,
                                s = void 0,
                                o = !1;
                            try {
                                r = e.then
                            } catch (e) {
                                o = !0,
                                s = e
                            }
                            if (r === x && void 0 !== e._state)
                                this._settledAt(e._state, t, e._result);
                            else if ("function" != typeof r)
                                this._remaining--,
                                this._result[t] = e;
                            else if (i === O) {
                                var a = new i(S);
                                o ? z(a, s) : C(a, e, r),
                                this._willSettleAt(a, t)
                            } else
                                this._willSettleAt(new i((function(t) {
                                    return t(e)
                                })), t)
                        } else
                            this._willSettleAt(n(e), t)
                    }, e.prototype._settledAt = function(e, t, i) {
                        var n = this.promise;
                        void 0 === n._state && (this._remaining--, 2 === e ? z(n, i) : this._result[t] = i),
                        0 === this._remaining && $(n, this._result)
                    }, e.prototype._willSettleAt = function(e, t) {
                        var i = this;
                        L(e, void 0, (function(e) {
                            return i._settledAt(1, t, e)
                        }), (function(e) {
                            return i._settledAt(2, t, e)
                        }))
                    }, e
                }(),
                O = function() {
                    function t(e) {
                        this[E] = D++,
                        this._result = this._state = void 0,
                        this._subscribers = [],
                        S !== e && ("function" != typeof e && function() {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                        }(), this instanceof t ? function(e, t) {
                            try {
                                t((function(t) {
                                    k(e, t)
                                }), (function(t) {
                                    z(e, t)
                                }))
                            } catch (t) {
                                z(e, t)
                            }
                        }(this, e) : function() {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                        }())
                    }
                    return t.prototype.catch = function(e) {
                        return this.then(null, e)
                    }, t.prototype.finally = function(t) {
                        var i = this.constructor;
                        return e(t) ? this.then((function(e) {
                            return i.resolve(t()).then((function() {
                                return e
                            }))
                        }), (function(e) {
                            return i.resolve(t()).then((function() {
                                throw e
                            }))
                        })) : this.then(t, t)
                    }, t
                }();
            return O.prototype.then = x, O.all = function(e) {
                return new N(this, e).promise
            }, O.race = function(e) {
                var t = this;
                return n(e) ? new t((function(i, n) {
                    for (var r = e.length, s = 0; s < r; s++)
                        t.resolve(e[s]).then(i, n)
                })) : new t((function(e, t) {
                    return t(new TypeError("You must pass an array to race."))
                }))
            }, O.resolve = T, O.reject = function(e) {
                var t = new this(S);
                return z(t, e), t
            }, O._setScheduler = function(e) {
                o = e
            }, O._setAsap = function(e) {
                a = e
            }, O._asap = a, O.polyfill = function() {
                var e = void 0;
                if (void 0 !== i)
                    e = i;
                else if ("undefined" != typeof self)
                    e = self;
                else
                    try {
                        e = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                var t = e.Promise;
                if (t) {
                    var n = null;
                    try {
                        n = Object.prototype.toString.call(t.resolve())
                    } catch (e) {}
                    if ("[object Promise]" === n && !t.cast)
                        return
                }
                e.Promise = O
            }, O.Promise = O, O
        },
        e.exports = n()
    }).call(this, i(15), i(16))
}, function(e, t) {
    var i,
        n,
        r = e.exports = {};
    function s() {
        throw new Error("setTimeout has not been defined")
    }
    function o() {
        throw new Error("clearTimeout has not been defined")
    }
    function a(e) {
        if (i === setTimeout)
            return setTimeout(e, 0);
        if ((i === s || !i) && setTimeout)
            return i = setTimeout, setTimeout(e, 0);
        try {
            return i(e, 0)
        } catch (t) {
            try {
                return i.call(null, e, 0)
            } catch (t) {
                return i.call(this, e, 0)
            }
        }
    }
    !function() {
        try {
            i = "function" == typeof setTimeout ? setTimeout : s
        } catch (e) {
            i = s
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : o
        } catch (e) {
            n = o
        }
    }();
    var l,
        c = [],
        d = !1,
        u = -1;
    function p() {
        d && l && (d = !1, l.length ? c = l.concat(c) : u = -1, c.length && h())
    }
    function h() {
        if (!d) {
            var e = a(p);
            d = !0;
            for (var t = c.length; t;) {
                for (l = c, c = []; ++u < t;)
                    l && l[u].run();
                u = -1,
                t = c.length
            }
            l = null,
            d = !1,
            function(e) {
                if (n === clearTimeout)
                    return clearTimeout(e);
                if ((n === o || !n) && clearTimeout)
                    return n = clearTimeout, clearTimeout(e);
                try {
                    n(e)
                } catch (t) {
                    try {
                        return n.call(null, e)
                    } catch (t) {
                        return n.call(this, e)
                    }
                }
            }(e)
        }
    }
    function f(e, t) {
        this.fun = e,
        this.array = t
    }
    function m() {}
    r.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var i = 1; i < arguments.length; i++)
                t[i - 1] = arguments[i];
        c.push(new f(e, t)),
        1 !== c.length || d || a(h)
    },
    f.prototype.run = function() {
        this.fun.apply(null, this.array)
    },
    r.title = "browser",
    r.browser = !0,
    r.env = {},
    r.argv = [],
    r.version = "",
    r.versions = {},
    r.on = m,
    r.addListener = m,
    r.once = m,
    r.off = m,
    r.removeListener = m,
    r.removeAllListeners = m,
    r.emit = m,
    r.prependListener = m,
    r.prependOnceListener = m,
    r.listeners = function(e) {
        return []
    },
    r.binding = function(e) {
        throw new Error("process.binding is not supported")
    },
    r.cwd = function() {
        return "/"
    },
    r.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    },
    r.umask = function() {
        return 0
    }
}, function(e, t) {
    var i;
    i = function() {
        return this
    }();
    try {
        i = i || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (i = window)
    }
    e.exports = i
}]]);
