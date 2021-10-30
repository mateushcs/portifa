function $75c38b07c38e3c07$var$t() {
}
$75c38b07c38e3c07$var$t.prototype = {
    on: function(t, e, r) {
        var i = this.e || (this.e = {
        });
        return (i[t] || (i[t] = [])).push({
            fn: e,
            ctx: r
        }), this;
    },
    once: function(t, e, r) {
        var i = this;
        function n() {
            i.off(t, n), e.apply(r, arguments);
        }
        return n._ = e, this.on(t, n, r);
    },
    emit: function(t) {
        for(var e = [].slice.call(arguments, 1), r = ((this.e || (this.e = {
        }))[t] || []).slice(), i = 0, n = r.length; i < n; i++)r[i].fn.apply(r[i].ctx, e);
        return this;
    },
    off: function(t, e) {
        var r = this.e || (this.e = {
        }), i = r[t], n = [];
        if (i && e) for(var o = 0, s = i.length; o < s; o++)i[o].fn !== e && i[o].fn._ !== e && n.push(i[o]);
        return n.length ? r[t] = n : delete r[t], this;
    }
};
var $75c38b07c38e3c07$var$e = $75c38b07c38e3c07$var$t;
$75c38b07c38e3c07$var$e.TinyEmitter = $75c38b07c38e3c07$var$t;
var $75c38b07c38e3c07$var$r = function(t) {
    this.wrap = document.querySelector("[data-router-wrapper]"), this.properties = t, this.Transition = t.transition ? new t.transition.class(this.wrap, t.transition.name) : null;
};
$75c38b07c38e3c07$var$r.prototype.setup = function() {
    this.onEnter && this.onEnter(), this.onEnterCompleted && this.onEnterCompleted();
}, $75c38b07c38e3c07$var$r.prototype.add = function() {
    this.wrap.insertAdjacentHTML("beforeend", this.properties.view.outerHTML);
}, $75c38b07c38e3c07$var$r.prototype.update = function() {
    document.title = this.properties.page.title;
}, $75c38b07c38e3c07$var$r.prototype.show = function(t) {
    var e = this;
    return new Promise(function(r) {
        try {
            function i(t) {
                e.onEnterCompleted && e.onEnterCompleted(), r();
            }
            return e.update(), e.onEnter && e.onEnter(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.show(t)).then(i) : i());
        } catch (t1) {
            return Promise.reject(t1);
        }
    });
}, $75c38b07c38e3c07$var$r.prototype.hide = function(t) {
    var e = this;
    return new Promise(function(r) {
        try {
            function i(t) {
                e.onLeaveCompleted && e.onLeaveCompleted(), r();
            }
            return e.onLeave && e.onLeave(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.hide(t)).then(i) : i());
        } catch (t1) {
            return Promise.reject(t1);
        }
    });
};
var $75c38b07c38e3c07$var$i = new window.DOMParser, $75c38b07c38e3c07$var$n = function(t, e) {
    this.renderers = t, this.transitions = e;
};
$75c38b07c38e3c07$var$n.prototype.getOrigin = function(t) {
    var e = t.match(/(https?:\/\/[\w\-.]+)/);
    return e ? e[1].replace(/https?:\/\//, "") : null;
}, $75c38b07c38e3c07$var$n.prototype.getPathname = function(t) {
    var e = t.match(/https?:\/\/.*?(\/[\w_\-./]+)/);
    return e ? e[1] : "/";
}, $75c38b07c38e3c07$var$n.prototype.getAnchor = function(t) {
    var e = t.match(/(#.*)$/);
    return e ? e[1] : null;
}, $75c38b07c38e3c07$var$n.prototype.getParams = function(t) {
    var e = t.match(/\?([\w_\-.=&]+)/);
    if (!e) return null;
    for(var r = e[1].split("&"), i = {
    }, n = 0; n < r.length; n++){
        var o = r[n].split("=");
        i[o[0]] = o[1];
    }
    return i;
}, $75c38b07c38e3c07$var$n.prototype.getDOM = function(t) {
    return "string" == typeof t ? $75c38b07c38e3c07$var$i.parseFromString(t, "text/html") : t;
}, $75c38b07c38e3c07$var$n.prototype.getView = function(t) {
    return t.querySelector("[data-router-view]");
}, $75c38b07c38e3c07$var$n.prototype.getSlug = function(t) {
    return t.getAttribute("data-router-view");
}, $75c38b07c38e3c07$var$n.prototype.getRenderer = function(t) {
    if (!this.renderers) return Promise.resolve($75c38b07c38e3c07$var$r);
    if (t in this.renderers) {
        var e = this.renderers[t];
        return "function" != typeof e || $75c38b07c38e3c07$var$r.isPrototypeOf(e) ? "function" == typeof e.then ? Promise.resolve(e).then(function(t) {
            return t.default;
        }) : Promise.resolve(e) : Promise.resolve(e()).then(function(t) {
            return t.default;
        });
    }
    return Promise.resolve($75c38b07c38e3c07$var$r);
}, $75c38b07c38e3c07$var$n.prototype.getTransition = function(t) {
    return this.transitions ? t in this.transitions ? {
        class: this.transitions[t],
        name: t
    } : "default" in this.transitions ? {
        class: this.transitions.default,
        name: "default"
    } : null : null;
}, $75c38b07c38e3c07$var$n.prototype.getProperties = function(t) {
    var e = this.getDOM(t), r = this.getView(e), i = this.getSlug(r);
    return {
        page: e,
        view: r,
        slug: i,
        renderer: this.getRenderer(i, this.renderers),
        transition: this.getTransition(i, this.transitions)
    };
}, $75c38b07c38e3c07$var$n.prototype.getLocation = function(t) {
    return {
        href: t,
        anchor: this.getAnchor(t),
        origin: this.getOrigin(t),
        params: this.getParams(t),
        pathname: this.getPathname(t)
    };
};
var $75c38b07c38e3c07$var$o = function(t) {
    function e(e) {
        var r = this;
        void 0 === e && (e = {
        });
        var i = e.renderers, o = e.transitions;
        t.call(this), this.Helpers = new $75c38b07c38e3c07$var$n(i, o), this.Transitions = o, this.Contextual = !1, this.location = this.Helpers.getLocation(window.location.href), this.properties = this.Helpers.getProperties(document.cloneNode(!0)), this.popping = !1, this.running = !1, this.trigger = null, this.cache = new Map, this.cache.set(this.location.href, this.properties), this.properties.renderer.then(function(t) {
            r.From = new t(r.properties), r.From.setup();
        }), this._navigate = this.navigate.bind(this), window.addEventListener("popstate", this.popState.bind(this)), this.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), this.attach(this.links);
    }
    return t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e, e.prototype.attach = function(t) {
        for(var e = 0, r = t; e < r.length; e += 1)r[e].addEventListener("click", this._navigate);
    }, e.prototype.detach = function(t) {
        for(var e = 0, r = t; e < r.length; e += 1)r[e].removeEventListener("click", this._navigate);
    }, e.prototype.navigate = function(t) {
        if (!t.metaKey && !t.ctrlKey) {
            t.preventDefault();
            var e = !!t.currentTarget.hasAttribute("data-transition") && t.currentTarget.dataset.transition;
            this.redirect(t.currentTarget.href, e, t.currentTarget);
        }
    }, e.prototype.redirect = function(t, e, r) {
        if (void 0 === e && (e = !1), void 0 === r && (r = "script"), this.trigger = r, !this.running && t !== this.location.href) {
            var i = this.Helpers.getLocation(t);
            this.Contextual = !1, e && (this.Contextual = this.Transitions.contextual[e].prototype, this.Contextual.name = e), i.origin !== this.location.origin || i.anchor && i.pathname === this.location.pathname ? window.location.href = t : (this.location = i, this.beforeFetch());
        }
    }, e.prototype.popState = function() {
        this.trigger = "popstate", this.Contextual = !1;
        var t = this.Helpers.getLocation(window.location.href);
        this.location.pathname !== t.pathname || !this.location.anchor && !t.anchor ? (this.popping = !0, this.location = t, this.beforeFetch()) : this.location = t;
    }, e.prototype.pushState = function() {
        this.popping || window.history.pushState(this.location, "", this.location.href);
    }, e.prototype.fetch = function() {
        try {
            var t = this;
            return Promise.resolve(fetch(t.location.href, {
                mode: "same-origin",
                method: "GET",
                headers: {
                    "X-Requested-With": "Highway"
                },
                credentials: "same-origin"
            })).then(function(e) {
                if (e.status >= 200 && e.status < 300) return e.text();
                window.location.href = t.location.href;
            });
        } catch (t1) {
            return Promise.reject(t1);
        }
    }, e.prototype.beforeFetch = function() {
        try {
            var t = this;
            function e() {
                t.afterFetch();
            }
            t.pushState(), t.running = !0, t.emit("NAVIGATE_OUT", {
                from: {
                    page: t.From.properties.page,
                    view: t.From.properties.view
                },
                trigger: t.trigger,
                location: t.location
            });
            var r = {
                trigger: t.trigger,
                contextual: t.Contextual
            }, i = t.cache.has(t.location.href) ? Promise.resolve(t.From.hide(r)).then(function() {
                t.properties = t.cache.get(t.location.href);
            }) : Promise.resolve(Promise.all([
                t.fetch(),
                t.From.hide(r)
            ])).then(function(e) {
                t.properties = t.Helpers.getProperties(e[0]), t.cache.set(t.location.href, t.properties);
            });
            return Promise.resolve(i && i.then ? i.then(e) : e());
        } catch (t1) {
            return Promise.reject(t1);
        }
    }, e.prototype.afterFetch = function() {
        try {
            var t = this;
            return Promise.resolve(t.properties.renderer).then(function(e) {
                return t.To = new e(t.properties), t.To.add(), t.emit("NAVIGATE_IN", {
                    to: {
                        page: t.To.properties.page,
                        view: t.To.wrap.lastElementChild
                    },
                    trigger: t.trigger,
                    location: t.location
                }), Promise.resolve(t.To.show({
                    trigger: t.trigger,
                    contextual: t.Contextual
                })).then(function() {
                    t.popping = !1, t.running = !1, t.detach(t.links), t.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), t.attach(t.links), t.emit("NAVIGATE_END", {
                        to: {
                            page: t.To.properties.page,
                            view: t.To.wrap.lastElementChild
                        },
                        from: {
                            page: t.From.properties.page,
                            view: t.From.properties.view
                        },
                        trigger: t.trigger,
                        location: t.location
                    }), t.From = t.To, t.trigger = null;
                });
            });
        } catch (t1) {
            return Promise.reject(t1);
        }
    }, e;
}($75c38b07c38e3c07$var$e), $75c38b07c38e3c07$var$s = function(t, e) {
    this.wrap = t, this.name = e;
};
$75c38b07c38e3c07$var$s.prototype.show = function(t) {
    var e = this, r = t.trigger, i = t.contextual, n = this.wrap.lastElementChild, o = this.wrap.firstElementChild;
    return new Promise(function(t) {
        i ? (n.setAttribute("data-transition-in", i.name), n.removeAttribute("data-transition-out", i.name), i.in && i.in({
            to: n,
            from: o,
            trigger: r,
            done: t
        })) : (n.setAttribute("data-transition-in", e.name), n.removeAttribute("data-transition-out", e.name), e.in && e.in({
            to: n,
            from: o,
            trigger: r,
            done: t
        }));
    });
}, $75c38b07c38e3c07$var$s.prototype.hide = function(t) {
    var e = this, r = t.trigger, i = t.contextual, n = this.wrap.firstElementChild;
    return new Promise(function(t) {
        i ? (n.setAttribute("data-transition-out", i.name), n.removeAttribute("data-transition-in", i.name), i.out && i.out({
            from: n,
            trigger: r,
            done: t
        })) : (n.setAttribute("data-transition-out", e.name), n.removeAttribute("data-transition-in", e.name), e.out && e.out({
            from: n,
            trigger: r,
            done: t
        }));
    });
}, console.log("Highway v2.2.0");
var $75c38b07c38e3c07$export$2e2bcd8739ae039 = {
    Core: $75c38b07c38e3c07$var$o,
    Helpers: $75c38b07c38e3c07$var$n,
    Renderer: $75c38b07c38e3c07$var$r,
    Transition: $75c38b07c38e3c07$var$s
};




function $45c181d6c56df0f8$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $45c181d6c56df0f8$var$_inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.8.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/ /* eslint-disable */ var $45c181d6c56df0f8$export$4922bee768729a77 = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
        lineHeight: ""
    }
}, $45c181d6c56df0f8$var$_defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
}, $45c181d6c56df0f8$var$_suppressOverwrites, $45c181d6c56df0f8$var$_bigNum = 100000000, $45c181d6c56df0f8$var$_tinyNum = 1 / $45c181d6c56df0f8$var$_bigNum, $45c181d6c56df0f8$var$_2PI = Math.PI * 2, $45c181d6c56df0f8$var$_HALF_PI = $45c181d6c56df0f8$var$_2PI / 4, $45c181d6c56df0f8$var$_gsID = 0, $45c181d6c56df0f8$var$_sqrt = Math.sqrt, $45c181d6c56df0f8$var$_cos = Math.cos, $45c181d6c56df0f8$var$_sin = Math.sin, $45c181d6c56df0f8$export$f664476fd67145ca = function _isString(value) {
    return typeof value === "string";
}, $45c181d6c56df0f8$var$_isFunction = function _isFunction(value) {
    return typeof value === "function";
}, $45c181d6c56df0f8$var$_isNumber = function _isNumber(value) {
    return typeof value === "number";
}, $45c181d6c56df0f8$export$a8178c063a9fd3a1 = function _isUndefined(value) {
    return typeof value === "undefined";
}, $45c181d6c56df0f8$var$_isObject = function _isObject(value) {
    return typeof value === "object";
}, $45c181d6c56df0f8$var$_isNotFalse = function _isNotFalse(value) {
    return value !== false;
}, $45c181d6c56df0f8$var$_windowExists = function _windowExists() {
    return typeof window !== "undefined";
}, $45c181d6c56df0f8$var$_isFuncOrString = function _isFuncOrString(value) {
    return $45c181d6c56df0f8$var$_isFunction(value) || $45c181d6c56df0f8$export$f664476fd67145ca(value);
}, $45c181d6c56df0f8$var$_isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
}, // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
$45c181d6c56df0f8$var$_isArray = Array.isArray, $45c181d6c56df0f8$var$_strictNumExp = /(?:-?\.?\d|\.)+/gi, //only numbers (including negatives and decimals) but NOT relative values.
$45c181d6c56df0f8$export$b9d44bb6523120d6 = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
$45c181d6c56df0f8$export$65c88bbd597e7b0a = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, $45c181d6c56df0f8$var$_complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
$45c181d6c56df0f8$export$5a680e28b0b61bc = /[+-]=-?[.\d]+/, $45c181d6c56df0f8$var$_delimitedValueExp = /[^,'"\[\]\s]+/gi, // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
$45c181d6c56df0f8$var$_unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i, $45c181d6c56df0f8$var$_globalTimeline, $45c181d6c56df0f8$var$_win, $45c181d6c56df0f8$var$_coreInitted, $45c181d6c56df0f8$var$_doc, $45c181d6c56df0f8$var$_globals = {
}, $45c181d6c56df0f8$var$_installScope = {
}, $45c181d6c56df0f8$var$_coreReady, $45c181d6c56df0f8$var$_install = function _install(scope) {
    return ($45c181d6c56df0f8$var$_installScope = $45c181d6c56df0f8$var$_merge(scope, $45c181d6c56df0f8$var$_globals)) && $45c181d6c56df0f8$export$99ee26438460406a;
}, $45c181d6c56df0f8$export$7fb54635790b59a5 = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
}, $45c181d6c56df0f8$var$_warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
}, $45c181d6c56df0f8$var$_addGlobal = function _addGlobal(name, obj) {
    return name && ($45c181d6c56df0f8$var$_globals[name] = obj) && $45c181d6c56df0f8$var$_installScope && ($45c181d6c56df0f8$var$_installScope[name] = obj) || $45c181d6c56df0f8$var$_globals;
}, $45c181d6c56df0f8$var$_emptyFunc = function _emptyFunc() {
    return 0;
}, $45c181d6c56df0f8$var$_reservedProps = {
}, $45c181d6c56df0f8$var$_lazyTweens = [], $45c181d6c56df0f8$var$_lazyLookup = {
}, $45c181d6c56df0f8$var$_lastRenderedFrame, $45c181d6c56df0f8$export$d305d8ec5d7c26b8 = {
}, $45c181d6c56df0f8$var$_effects = {
}, $45c181d6c56df0f8$var$_nextGCFrame = 30, $45c181d6c56df0f8$var$_harnessPlugins = [], $45c181d6c56df0f8$var$_callbackNames = "", $45c181d6c56df0f8$var$_harness = function _harness(targets) {
    var target = targets[0], harnessPlugin, i;
    $45c181d6c56df0f8$var$_isObject(target) || $45c181d6c56df0f8$var$_isFunction(target) || (targets = [
        targets
    ]);
    if (!(harnessPlugin = (target._gsap || {
    }).harness)) {
        // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
        i = $45c181d6c56df0f8$var$_harnessPlugins.length;
        while((i--) && !$45c181d6c56df0f8$var$_harnessPlugins[i].targetTest(target));
        harnessPlugin = $45c181d6c56df0f8$var$_harnessPlugins[i];
    }
    i = targets.length;
    while(i--)targets[i] && (targets[i]._gsap || (targets[i]._gsap = new $45c181d6c56df0f8$export$cf10981d5419cad5(targets[i], harnessPlugin))) || targets.splice(i, 1);
    return targets;
}, $45c181d6c56df0f8$export$8b9be379d2de2a39 = function _getCache(target) {
    return target._gsap || $45c181d6c56df0f8$var$_harness($45c181d6c56df0f8$export$45b10814cc054894(target))[0]._gsap;
}, $45c181d6c56df0f8$export$51d6bbe898aef1f9 = function _getProperty(target, property, v) {
    return (v = target[property]) && $45c181d6c56df0f8$var$_isFunction(v) ? target[property]() : $45c181d6c56df0f8$export$a8178c063a9fd3a1(v) && target.getAttribute && target.getAttribute(property) || v;
}, $45c181d6c56df0f8$export$f9000b814859f126 = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
}, //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
$45c181d6c56df0f8$export$9c8d725d65e13f94 = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
}, $45c181d6c56df0f8$var$_roundPrecise = function _roundPrecise(value) {
    return Math.round(value * 10000000) / 10000000 || 0;
}, // increased precision mostly for timing values.
$45c181d6c56df0f8$var$_arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
    var l = toFind.length, i = 0;
    for(; toSearch.indexOf(toFind[i]) < 0 && ++i < l;);
    return i < l;
}, $45c181d6c56df0f8$var$_lazyRender = function _lazyRender() {
    var l = $45c181d6c56df0f8$var$_lazyTweens.length, a = $45c181d6c56df0f8$var$_lazyTweens.slice(0), i, tween;
    $45c181d6c56df0f8$var$_lazyLookup = {
    };
    $45c181d6c56df0f8$var$_lazyTweens.length = 0;
    for(i = 0; i < l; i++){
        tween = a[i];
        tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
}, $45c181d6c56df0f8$var$_lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    $45c181d6c56df0f8$var$_lazyTweens.length && $45c181d6c56df0f8$var$_lazyRender();
    animation.render(time, suppressEvents, force);
    $45c181d6c56df0f8$var$_lazyTweens.length && $45c181d6c56df0f8$var$_lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
}, $45c181d6c56df0f8$var$_numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match($45c181d6c56df0f8$var$_delimitedValueExp).length < 2 ? n : $45c181d6c56df0f8$export$f664476fd67145ca(value) ? value.trim() : value;
}, $45c181d6c56df0f8$var$_passThrough = function _passThrough(p) {
    return p;
}, $45c181d6c56df0f8$export$dc2b19673bb53610 = function _setDefaults(obj, defaults) {
    for(var p in defaults)p in obj || (obj[p] = defaults[p]);
    return obj;
}, $45c181d6c56df0f8$var$_setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
    for(var p in defaults)p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
}, $45c181d6c56df0f8$var$_merge = function _merge(base, toMerge) {
    for(var p in toMerge)base[p] = toMerge[p];
    return base;
}, $45c181d6c56df0f8$var$_mergeDeep = function _mergeDeep(base, toMerge) {
    for(var p in toMerge)p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = $45c181d6c56df0f8$var$_isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {
    }), toMerge[p]) : toMerge[p]);
    return base;
}, $45c181d6c56df0f8$var$_copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {
    }, p;
    for(p in obj)p in excluding || (copy[p] = obj[p]);
    return copy;
}, $45c181d6c56df0f8$var$_inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || $45c181d6c56df0f8$var$_globalTimeline, func = vars.keyframes ? $45c181d6c56df0f8$var$_setKeyframeDefaults : $45c181d6c56df0f8$export$dc2b19673bb53610;
    if ($45c181d6c56df0f8$var$_isNotFalse(vars.inherit)) while(parent){
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
    }
    return vars;
}, $45c181d6c56df0f8$var$_arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while(match && i-- && a1[i] === a2[i]);
    return i < 0;
}, $45c181d6c56df0f8$var$_addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) firstProp = "_first";
    if (lastProp === void 0) lastProp = "_last";
    var prev = parent[lastProp], t;
    if (sortBy) {
        t = child[sortBy];
        while(prev && prev[sortBy] > t)prev = prev._prev;
    }
    if (prev) {
        child._next = prev._next;
        prev._next = child;
    } else {
        child._next = parent[firstProp];
        parent[firstProp] = child;
    }
    if (child._next) child._next._prev = child;
    else parent[lastProp] = child;
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
}, $45c181d6c56df0f8$export$cd008aa6cd8844e3 = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) firstProp = "_first";
    if (lastProp === void 0) lastProp = "_last";
    var prev = child._prev, next = child._next;
    if (prev) prev._next = next;
    else if (parent[firstProp] === child) parent[firstProp] = next;
    if (next) next._prev = prev;
    else if (parent[lastProp] === child) parent[lastProp] = prev;
    child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
}, $45c181d6c56df0f8$var$_removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
}, $45c181d6c56df0f8$var$_uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
        // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
        var a = animation;
        while(a){
            a._dirty = 1;
            a = a.parent;
        }
    }
    return animation;
}, $45c181d6c56df0f8$var$_recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;
    while(parent && parent.parent){
        //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
        parent._dirty = 1;
        parent.totalDuration();
        parent = parent.parent;
    }
    return animation;
}, $45c181d6c56df0f8$var$_hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
}, $45c181d6c56df0f8$var$_elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? $45c181d6c56df0f8$var$_animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
}, // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
$45c181d6c56df0f8$var$_animationCycle = function _animationCycle(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
}, $45c181d6c56df0f8$var$_parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
}, $45c181d6c56df0f8$var$_setEnd = function _setEnd(animation) {
    return animation._end = $45c181d6c56df0f8$var$_roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || $45c181d6c56df0f8$var$_tinyNum) || 0));
}, $45c181d6c56df0f8$var$_alignPlayhead = function _alignPlayhead(animation, totalTime) {
    // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
        animation._start = $45c181d6c56df0f8$var$_roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
        $45c181d6c56df0f8$var$_setEnd(animation);
        parent._dirty || $45c181d6c56df0f8$var$_uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
    }
    return animation;
}, /*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/ $45c181d6c56df0f8$var$_postAddChecks = function _postAddChecks(timeline, child) {
    var t;
    if (child._time || child._initted && !child._dur) {
        //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
        t = $45c181d6c56df0f8$var$_parentToChildTotalTime(timeline.rawTime(), child);
        if (!child._dur || $45c181d6c56df0f8$var$_clamp(0, child.totalDuration(), t) - child._tTime > $45c181d6c56df0f8$var$_tinyNum) child.render(t, true);
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
    if ($45c181d6c56df0f8$var$_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
        //in case any of the ancestors had completed but should now be enabled...
        if (timeline._dur < timeline.duration()) {
            t = timeline;
            while(t._dp){
                t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.
                t = t._dp;
            }
        }
        timeline._zTime = -$45c181d6c56df0f8$var$_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
    }
}, $45c181d6c56df0f8$var$_addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && $45c181d6c56df0f8$var$_removeFromParent(child);
    child._start = $45c181d6c56df0f8$var$_roundPrecise(($45c181d6c56df0f8$var$_isNumber(position) ? position : position || timeline !== $45c181d6c56df0f8$var$_globalTimeline ? $45c181d6c56df0f8$var$_parsePosition(timeline, position, child) : timeline._time) + child._delay);
    child._end = $45c181d6c56df0f8$var$_roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    $45c181d6c56df0f8$var$_addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
    $45c181d6c56df0f8$var$_isFromOrFromStart(child) || (timeline._recent = child);
    skipChecks || $45c181d6c56df0f8$var$_postAddChecks(timeline, child);
    return timeline;
}, $45c181d6c56df0f8$var$_scrollTrigger = function _scrollTrigger(animation, trigger) {
    return ($45c181d6c56df0f8$var$_globals.ScrollTrigger || $45c181d6c56df0f8$export$7fb54635790b59a5("scrollTrigger", trigger)) && $45c181d6c56df0f8$var$_globals.ScrollTrigger.create(trigger, animation);
}, $45c181d6c56df0f8$var$_attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
    $45c181d6c56df0f8$var$_initTween(tween, totalTime);
    if (!tween._initted) return 1;
    if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && $45c181d6c56df0f8$var$_lastRenderedFrame !== $45c181d6c56df0f8$export$762ed8fbedb691e3.frame) {
        $45c181d6c56df0f8$var$_lazyTweens.push(tween);
        tween._lazy = [
            totalTime,
            suppressEvents
        ];
        return 1;
    }
}, $45c181d6c56df0f8$var$_parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
}, // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
$45c181d6c56df0f8$var$_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
}, $45c181d6c56df0f8$var$_renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && $45c181d6c56df0f8$var$_parentPlayheadIsBeforeStart(tween) && !(!tween._initted && $45c181d6c56df0f8$var$_isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !$45c181d6c56df0f8$var$_isFromOrFromStart(tween)) ? 0 : 1, // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
    repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
        // in case there's a zero-duration tween that has a repeat with a repeatDelay
        tTime = $45c181d6c56df0f8$var$_clamp(0, tween._tDur, totalTime);
        iteration = $45c181d6c56df0f8$var$_animationCycle(tTime, repeatDelay);
        prevIteration = $45c181d6c56df0f8$var$_animationCycle(tween._tTime, repeatDelay);
        tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
        if (iteration !== prevIteration) {
            prevRatio = 1 - ratio;
            tween.vars.repeatRefresh && tween._initted && tween.invalidate();
        }
    }
    if (ratio !== prevRatio || force || tween._zTime === $45c181d6c56df0f8$var$_tinyNum || !totalTime && tween._zTime) {
        if (!tween._initted && $45c181d6c56df0f8$var$_attemptInitTween(tween, totalTime, force, suppressEvents)) // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        return;
        prevIteration = tween._zTime;
        tween._zTime = totalTime || (suppressEvents ? $45c181d6c56df0f8$var$_tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.
        suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.
        tween.ratio = ratio;
        tween._from && (ratio = 1 - ratio);
        tween._time = 0;
        tween._tTime = tTime;
        pt = tween._pt;
        while(pt){
            pt.r(ratio, pt.d);
            pt = pt._next;
        }
        tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
        tween._onUpdate && !suppressEvents && $45c181d6c56df0f8$var$_callback(tween, "onUpdate");
        tTime && tween._repeat && !suppressEvents && tween.parent && $45c181d6c56df0f8$var$_callback(tween, "onRepeat");
        if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
            ratio && $45c181d6c56df0f8$var$_removeFromParent(tween, 1);
            if (!suppressEvents) {
                $45c181d6c56df0f8$var$_callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
                tween._prom && tween._prom();
            }
        }
    } else if (!tween._zTime) tween._zTime = totalTime;
}, $45c181d6c56df0f8$var$_findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
        child = animation._first;
        while(child && child._start <= time){
            if (!child._dur && child.data === "isPause" && child._start > prevTime) return child;
            child = child._next;
        }
    } else {
        child = animation._last;
        while(child && child._start >= time){
            if (!child._dur && child.data === "isPause" && child._start < prevTime) return child;
            child = child._prev;
        }
    }
}, $45c181d6c56df0f8$var$_setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = $45c181d6c56df0f8$var$_roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 10000000000 : $45c181d6c56df0f8$var$_roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress && !leavePlayhead ? $45c181d6c56df0f8$var$_alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && $45c181d6c56df0f8$var$_setEnd(animation);
    skipUncache || $45c181d6c56df0f8$var$_uncache(animation.parent, animation);
    return animation;
}, $45c181d6c56df0f8$var$_onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof $45c181d6c56df0f8$export$e6a97ba2cae5bb94 ? $45c181d6c56df0f8$var$_uncache(animation) : $45c181d6c56df0f8$var$_setDuration(animation, animation._dur);
}, $45c181d6c56df0f8$var$_zeroPosition = {
    _start: 0,
    endTime: $45c181d6c56df0f8$var$_emptyFunc,
    totalDuration: $45c181d6c56df0f8$var$_emptyFunc
}, $45c181d6c56df0f8$var$_parsePosition = function _parsePosition(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || $45c181d6c56df0f8$var$_zeroPosition, clippedDuration = animation.duration() >= $45c181d6c56df0f8$var$_bigNum ? recent.endTime(false) : animation._dur, //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
    i, offset, isPercent;
    if ($45c181d6c56df0f8$export$f664476fd67145ca(position) && (isNaN(position) || position in labels)) {
        //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
        offset = position.charAt(0);
        isPercent = position.substr(-1) === "%";
        i = position.indexOf("=");
        if (offset === "<" || offset === ">") {
            i >= 0 && (position = position.replace(/=/, ""));
            return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
        }
        if (i < 0) {
            position in labels || (labels[position] = clippedDuration);
            return labels[position];
        }
        offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
        if (isPercent && percentAnimation) offset = offset / 100 * ($45c181d6c56df0f8$var$_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
        return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
}, $45c181d6c56df0f8$var$_createTweenType = function _createTweenType(type, params, timeline) {
    var isLegacy = $45c181d6c56df0f8$var$_isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline;
    if (type) {
        irVars = vars;
        parent = timeline;
        while(parent && !("immediateRender" in irVars)){
            // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
            irVars = parent.vars.defaults || {
            };
            parent = $45c181d6c56df0f8$var$_isNotFalse(parent.vars.inherit) && parent.parent;
        }
        vars.immediateRender = $45c181d6c56df0f8$var$_isNotFalse(irVars.immediateRender);
        type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
    }
    return new $45c181d6c56df0f8$export$208a41d6b4e37b97(params[0], vars, params[varsIndex + 1]);
}, $45c181d6c56df0f8$var$_conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
}, $45c181d6c56df0f8$var$_clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
}, $45c181d6c56df0f8$export$65f2564e9a9b9222 = function getUnit(value) {
    if (typeof value !== "string") return "";
    var v = $45c181d6c56df0f8$var$_unitExp.exec(value);
    return v ? value.substr(v.index + v[0].length) : "";
}, // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
$45c181d6c56df0f8$export$7d15b64cf5a3a4c4 = function clamp(min, max, value) {
    return $45c181d6c56df0f8$var$_conditionalReturn(value, function(v) {
        return $45c181d6c56df0f8$var$_clamp(min, max, v);
    });
}, $45c181d6c56df0f8$var$_slice = [].slice, $45c181d6c56df0f8$var$_isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && $45c181d6c56df0f8$var$_isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && $45c181d6c56df0f8$var$_isObject(value[0])) && !value.nodeType && value !== $45c181d6c56df0f8$var$_win;
}, $45c181d6c56df0f8$var$_flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) accumulator = [];
    return ar.forEach(function(value) {
        var _accumulator;
        return $45c181d6c56df0f8$export$f664476fd67145ca(value) && !leaveStrings || $45c181d6c56df0f8$var$_isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, $45c181d6c56df0f8$export$45b10814cc054894(value)) : accumulator.push(value);
    }) || accumulator;
}, //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
$45c181d6c56df0f8$export$45b10814cc054894 = function toArray(value, scope, leaveStrings) {
    return $45c181d6c56df0f8$export$f664476fd67145ca(value) && !leaveStrings && ($45c181d6c56df0f8$var$_coreInitted || !$45c181d6c56df0f8$var$_wake()) ? $45c181d6c56df0f8$var$_slice.call((scope || $45c181d6c56df0f8$var$_doc).querySelectorAll(value), 0) : $45c181d6c56df0f8$var$_isArray(value) ? $45c181d6c56df0f8$var$_flatten(value, leaveStrings) : $45c181d6c56df0f8$var$_isArrayLike(value) ? $45c181d6c56df0f8$var$_slice.call(value, 0) : value ? [
        value
    ] : [];
}, $45c181d6c56df0f8$export$aea217a45095ce11 = function selector(value) {
    value = $45c181d6c56df0f8$export$45b10814cc054894(value)[0] || $45c181d6c56df0f8$var$_warn("Invalid scope") || {
    };
    return function(v) {
        var el = value.current || value.nativeElement || value;
        return $45c181d6c56df0f8$export$45b10814cc054894(v, el.querySelectorAll ? el : el === value ? $45c181d6c56df0f8$var$_warn("Invalid scope") || $45c181d6c56df0f8$var$_doc.createElement("div") : value);
    };
}, $45c181d6c56df0f8$export$448332262467e042 = function shuffle(a) {
    return a.sort(function() {
        return 0.5 - Math.random();
    });
}, // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
$45c181d6c56df0f8$export$f02a9ddbe4480f19 = function distribute(v) {
    if ($45c181d6c56df0f8$var$_isFunction(v)) return v;
    var vars = $45c181d6c56df0f8$var$_isObject(v) ? v : {
        each: v
    }, //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = $45c181d6c56df0f8$var$_parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {
    }, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if ($45c181d6c56df0f8$export$f664476fd67145ca(from)) ratioX = ratioY = ({
        center: 0.5,
        edges: 0.5,
        end: 1
    })[from] || 0;
    else if (!isDecimal && ratios) {
        ratioX = from[0];
        ratioY = from[1];
    }
    return function(i, target, a) {
        var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
        if (!distances) {
            wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [
                1,
                $45c181d6c56df0f8$var$_bigNum
            ])[1];
            if (!wrapAt) {
                max = -$45c181d6c56df0f8$var$_bigNum;
                while(max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l);
                wrapAt--;
            }
            distances = cache[l] = [];
            originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
            originY = ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
            max = 0;
            min = $45c181d6c56df0f8$var$_bigNum;
            for(j = 0; j < l; j++){
                x = j % wrapAt - originX;
                y = originY - (j / wrapAt | 0);
                distances[j] = d = !axis ? $45c181d6c56df0f8$var$_sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
                d > max && (max = d);
                d < min && (min = d);
            }
            from === "random" && $45c181d6c56df0f8$export$448332262467e042(distances);
            distances.max = max - min;
            distances.min = min;
            distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
            distances.b = l < 0 ? base - l : base;
            distances.u = $45c181d6c56df0f8$export$65f2564e9a9b9222(vars.amount || vars.each) || 0; //unit
            ease = ease && l < 0 ? $45c181d6c56df0f8$var$_invertEase(ease) : ease;
        }
        l = (distances[i] - distances.min) / distances.max || 0;
        return $45c181d6c56df0f8$var$_roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
    };
}, $45c181d6c56df0f8$export$dd12390e6b265a17 = function _roundModifier(v) {
    //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())
    return function(raw) {
        var n = Math.round(parseFloat(raw) / v) * v * p;
        return (n - n % 1) / p + ($45c181d6c56df0f8$var$_isNumber(raw) ? 0 : $45c181d6c56df0f8$export$65f2564e9a9b9222(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
    };
}, $45c181d6c56df0f8$export$51a0620f7a28532b = function snap(snapTo, value) {
    var isArray = $45c181d6c56df0f8$var$_isArray(snapTo), radius, is2D;
    if (!isArray && $45c181d6c56df0f8$var$_isObject(snapTo)) {
        radius = isArray = snapTo.radius || $45c181d6c56df0f8$var$_bigNum;
        if (snapTo.values) {
            snapTo = $45c181d6c56df0f8$export$45b10814cc054894(snapTo.values);
            if (is2D = !$45c181d6c56df0f8$var$_isNumber(snapTo[0])) radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
        } else snapTo = $45c181d6c56df0f8$export$dd12390e6b265a17(snapTo.increment);
    }
    return $45c181d6c56df0f8$var$_conditionalReturn(value, !isArray ? $45c181d6c56df0f8$export$dd12390e6b265a17(snapTo) : $45c181d6c56df0f8$var$_isFunction(snapTo) ? function(raw) {
        is2D = snapTo(raw);
        return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
        var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = $45c181d6c56df0f8$var$_bigNum, closest = 0, i = snapTo.length, dx, dy;
        while(i--){
            if (is2D) {
                dx = snapTo[i].x - x;
                dy = snapTo[i].y - y;
                dx = dx * dx + dy * dy;
            } else dx = Math.abs(snapTo[i] - x);
            if (dx < min) {
                min = dx;
                closest = i;
            }
        }
        closest = !radius || min <= radius ? snapTo[closest] : raw;
        return is2D || closest === raw || $45c181d6c56df0f8$var$_isNumber(raw) ? closest : closest + $45c181d6c56df0f8$export$65f2564e9a9b9222(raw);
    });
}, $45c181d6c56df0f8$export$4385e60b38654f68 = function random(min, max, roundingIncrement, returnFunction) {
    return $45c181d6c56df0f8$var$_conditionalReturn($45c181d6c56df0f8$var$_isArray(min) ? !max : roundingIncrement === true ? (roundingIncrement = 0, false) : !returnFunction, function() {
        return $45c181d6c56df0f8$var$_isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 0.00001, returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
}, $45c181d6c56df0f8$export$a4627e546088548d = function pipe() {
    for(var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++)functions[_key] = arguments[_key];
    return function(value) {
        return functions.reduce(function(v, f) {
            return f(v);
        }, value);
    };
}, $45c181d6c56df0f8$export$d7502930aa5492de = function unitize(func, unit) {
    return function(value) {
        return func(parseFloat(value)) + (unit || $45c181d6c56df0f8$export$65f2564e9a9b9222(value));
    };
}, $45c181d6c56df0f8$export$a3295358bff77e = function normalize(min, max, value) {
    return $45c181d6c56df0f8$export$f65a7599bbc6b121(min, max, 0, 1, value);
}, $45c181d6c56df0f8$var$_wrapArray = function _wrapArray(a, wrapper, value) {
    return $45c181d6c56df0f8$var$_conditionalReturn(value, function(index) {
        return a[~~wrapper(index)];
    });
}, $45c181d6c56df0f8$export$4997ffc0176396a6 = function wrap(min, max, value) {
    // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
    var range = max - min;
    return $45c181d6c56df0f8$var$_isArray(min) ? $45c181d6c56df0f8$var$_wrapArray(min, wrap(0, min.length), max) : $45c181d6c56df0f8$var$_conditionalReturn(value, function(value) {
        return (range + (value - min) % range) % range + min;
    });
}, $45c181d6c56df0f8$export$cfc0b067273edc55 = function wrapYoyo(min, max, value) {
    var range = max - min, total = range * 2;
    return $45c181d6c56df0f8$var$_isArray(min) ? $45c181d6c56df0f8$var$_wrapArray(min, wrapYoyo(0, min.length - 1), max) : $45c181d6c56df0f8$var$_conditionalReturn(value, function(value) {
        value = (total + (value - min) % total) % total || 0;
        return min + (value > range ? total - value : value);
    });
}, $45c181d6c56df0f8$export$d5962a97e3cde94d = function _replaceRandom(value) {
    //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
    var prev = 0, s = "", i, nums, end, isArray;
    while(~(i = value.indexOf("random(", prev))){
        end = value.indexOf(")", i);
        isArray = value.charAt(i + 7) === "[";
        nums = value.substr(i + 7, end - i - 7).match(isArray ? $45c181d6c56df0f8$var$_delimitedValueExp : $45c181d6c56df0f8$var$_strictNumExp);
        s += value.substr(prev, i - prev) + $45c181d6c56df0f8$export$4385e60b38654f68(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 0.00001);
        prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
}, $45c181d6c56df0f8$export$f65a7599bbc6b121 = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return $45c181d6c56df0f8$var$_conditionalReturn(value, function(value) {
        return outMin + ((value - inMin) / inRange * outRange || 0);
    });
}, $45c181d6c56df0f8$export$89e29e4ab65e70a9 = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p) {
        return (1 - p) * start + p * end;
    };
    if (!func) {
        var isString = $45c181d6c56df0f8$export$f664476fd67145ca(start), master = {
        }, p, i, interpolators, l, il;
        progress === true && (mutate = 1) && (progress = null);
        if (isString) {
            start = {
                p: start
            };
            end = {
                p: end
            };
        } else if ($45c181d6c56df0f8$var$_isArray(start) && !$45c181d6c56df0f8$var$_isArray(end)) {
            interpolators = [];
            l = start.length;
            il = l - 2;
            for(i = 1; i < l; i++)interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
            l--;
            func = function func(p) {
                p *= l;
                var i = Math.min(il, ~~p);
                return interpolators[i](p - i);
            };
            progress = end;
        } else if (!mutate) start = $45c181d6c56df0f8$var$_merge($45c181d6c56df0f8$var$_isArray(start) ? [] : {
        }, start);
        if (!interpolators) {
            for(p in end)$45c181d6c56df0f8$var$_addPropTween.call(master, start, p, "get", end[p]);
            func = function func(p) {
                return $45c181d6c56df0f8$var$_renderPropTweens(p, master) || (isString ? start.p : start);
            };
        }
    }
    return $45c181d6c56df0f8$var$_conditionalReturn(progress, func);
}, $45c181d6c56df0f8$var$_getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    //used for nextLabel() and previousLabel()
    var labels = timeline.labels, min = $45c181d6c56df0f8$var$_bigNum, p, distance, label;
    for(p in labels){
        distance = labels[p] - fromTime;
        if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
            label = p;
            min = distance;
        }
    }
    return label;
}, $45c181d6c56df0f8$var$_callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], params, scope;
    if (!callback) return;
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && $45c181d6c56df0f8$var$_lazyTweens.length && $45c181d6c56df0f8$var$_lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
    return params ? callback.apply(scope, params) : callback.call(scope);
}, $45c181d6c56df0f8$var$_interrupt = function _interrupt(animation) {
    $45c181d6c56df0f8$var$_removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(false);
    animation.progress() < 1 && $45c181d6c56df0f8$var$_callback(animation, "onInterrupt");
    return animation;
}, $45c181d6c56df0f8$var$_quickTween, $45c181d6c56df0f8$var$_createPlugin = function _createPlugin(config) {
    config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.
    var name = config.name, isFunc = $45c181d6c56df0f8$var$_isFunction(config), Plugin = name && !isFunc && config.init ? function() {
        this._props = [];
    } : config, //in case someone passes in an object that's not a plugin, like CustomEase
    instanceDefaults = {
        init: $45c181d6c56df0f8$var$_emptyFunc,
        render: $45c181d6c56df0f8$var$_renderPropTweens,
        add: $45c181d6c56df0f8$var$_addPropTween,
        kill: $45c181d6c56df0f8$var$_killPropTweensOf,
        modifier: $45c181d6c56df0f8$var$_addPluginModifier,
        rawVars: 0
    }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: $45c181d6c56df0f8$export$d60fbc1e0278aaf0,
        aliases: {
        },
        register: 0
    };
    $45c181d6c56df0f8$var$_wake();
    if (config !== Plugin) {
        if ($45c181d6c56df0f8$export$d305d8ec5d7c26b8[name]) return;
        $45c181d6c56df0f8$export$dc2b19673bb53610(Plugin, $45c181d6c56df0f8$export$dc2b19673bb53610($45c181d6c56df0f8$var$_copyExcluding(config, instanceDefaults), statics)); //static methods
        $45c181d6c56df0f8$var$_merge(Plugin.prototype, $45c181d6c56df0f8$var$_merge(instanceDefaults, $45c181d6c56df0f8$var$_copyExcluding(config, statics))); //instance methods
        $45c181d6c56df0f8$export$d305d8ec5d7c26b8[Plugin.prop = name] = Plugin;
        if (config.targetTest) {
            $45c181d6c56df0f8$var$_harnessPlugins.push(Plugin);
            $45c181d6c56df0f8$var$_reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
    }
    $45c181d6c56df0f8$var$_addGlobal(name, Plugin);
    config.register && config.register($45c181d6c56df0f8$export$99ee26438460406a, Plugin, $45c181d6c56df0f8$export$3a67f7f44b1e838a);
}, /*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */ $45c181d6c56df0f8$var$_255 = 255, $45c181d6c56df0f8$var$_colorLookup = {
    aqua: [
        0,
        $45c181d6c56df0f8$var$_255,
        $45c181d6c56df0f8$var$_255
    ],
    lime: [
        0,
        $45c181d6c56df0f8$var$_255,
        0
    ],
    silver: [
        192,
        192,
        192
    ],
    black: [
        0,
        0,
        0
    ],
    maroon: [
        128,
        0,
        0
    ],
    teal: [
        0,
        128,
        128
    ],
    blue: [
        0,
        0,
        $45c181d6c56df0f8$var$_255
    ],
    navy: [
        0,
        0,
        128
    ],
    white: [
        $45c181d6c56df0f8$var$_255,
        $45c181d6c56df0f8$var$_255,
        $45c181d6c56df0f8$var$_255
    ],
    olive: [
        128,
        128,
        0
    ],
    yellow: [
        $45c181d6c56df0f8$var$_255,
        $45c181d6c56df0f8$var$_255,
        0
    ],
    orange: [
        $45c181d6c56df0f8$var$_255,
        165,
        0
    ],
    gray: [
        128,
        128,
        128
    ],
    purple: [
        128,
        0,
        128
    ],
    green: [
        0,
        128,
        0
    ],
    red: [
        $45c181d6c56df0f8$var$_255,
        0,
        0
    ],
    pink: [
        $45c181d6c56df0f8$var$_255,
        192,
        203
    ],
    cyan: [
        0,
        $45c181d6c56df0f8$var$_255,
        $45c181d6c56df0f8$var$_255
    ],
    transparent: [
        $45c181d6c56df0f8$var$_255,
        $45c181d6c56df0f8$var$_255,
        $45c181d6c56df0f8$var$_255,
        0
    ]
}, $45c181d6c56df0f8$var$_hue = function _hue(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * $45c181d6c56df0f8$var$_255 + 0.5 | 0;
}, $45c181d6c56df0f8$export$73d6f35be992df24 = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? $45c181d6c56df0f8$var$_colorLookup.black : $45c181d6c56df0f8$var$_isNumber(v) ? [
        v >> 16,
        v >> 8 & $45c181d6c56df0f8$var$_255,
        v & $45c181d6c56df0f8$var$_255
    ] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!a) {
        if (v.substr(-1) === ",") //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
        if ($45c181d6c56df0f8$var$_colorLookup[v]) a = $45c181d6c56df0f8$var$_colorLookup[v];
        else if (v.charAt(0) === "#") {
            if (v.length < 6) {
                //for shorthand like #9F0 or #9F0F (could have alpha)
                r = v.charAt(1);
                g = v.charAt(2);
                b = v.charAt(3);
                v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
            }
            if (v.length === 9) {
                // hex with alpha, like #fd5e53ff
                a = parseInt(v.substr(1, 6), 16);
                return [
                    a >> 16,
                    a >> 8 & $45c181d6c56df0f8$var$_255,
                    a & $45c181d6c56df0f8$var$_255,
                    parseInt(v.substr(7), 16) / 255
                ];
            }
            v = parseInt(v.substr(1), 16);
            a = [
                v >> 16,
                v >> 8 & $45c181d6c56df0f8$var$_255,
                v & $45c181d6c56df0f8$var$_255
            ];
        } else if (v.substr(0, 3) === "hsl") {
            a = wasHSL = v.match($45c181d6c56df0f8$var$_strictNumExp);
            if (!toHSL) {
                h = +a[0] % 360 / 360;
                s = +a[1] / 100;
                l = +a[2] / 100;
                g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
                r = l * 2 - g;
                a.length > 3 && (a[3] *= 1); //cast as number
                a[0] = $45c181d6c56df0f8$var$_hue(h + 1 / 3, r, g);
                a[1] = $45c181d6c56df0f8$var$_hue(h, r, g);
                a[2] = $45c181d6c56df0f8$var$_hue(h - 1 / 3, r, g);
            } else if (~v.indexOf("=")) {
                //if relative values are found, just return the raw strings with the relative prefixes in place.
                a = v.match($45c181d6c56df0f8$export$b9d44bb6523120d6);
                forceAlpha && a.length < 4 && (a[3] = 1);
                return a;
            }
        } else a = v.match($45c181d6c56df0f8$var$_strictNumExp) || $45c181d6c56df0f8$var$_colorLookup.transparent;
        a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
        r = a[0] / $45c181d6c56df0f8$var$_255;
        g = a[1] / $45c181d6c56df0f8$var$_255;
        b = a[2] / $45c181d6c56df0f8$var$_255;
        max = Math.max(r, g, b);
        min = Math.min(r, g, b);
        l = (max + min) / 2;
        if (max === min) h = s = 0;
        else {
            d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
            h *= 60;
        }
        a[0] = ~~(h + 0.5);
        a[1] = ~~(s * 100 + 0.5);
        a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
}, $45c181d6c56df0f8$var$_colorOrderData = function _colorOrderData(v) {
    // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
    var values = [], c = [], i = -1;
    v.split($45c181d6c56df0f8$export$dd733e62515be2bd).forEach(function(v) {
        var a = v.match($45c181d6c56df0f8$export$65c88bbd597e7b0a) || [];
        values.push.apply(values, a);
        c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
}, $45c181d6c56df0f8$var$_formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match($45c181d6c56df0f8$export$dd733e62515be2bd), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) return s;
    colors = colors.map(function(color) {
        return (color = $45c181d6c56df0f8$export$73d6f35be992df24(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
        d = $45c181d6c56df0f8$var$_colorOrderData(s);
        c = orderMatchData.c;
        if (c.join(result) !== d.c.join(result)) {
            shell = s.replace($45c181d6c56df0f8$export$dd733e62515be2bd, "1").split($45c181d6c56df0f8$export$65c88bbd597e7b0a);
            l = shell.length - 1;
            for(; i < l; i++)result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
    }
    if (!shell) {
        shell = s.split($45c181d6c56df0f8$export$dd733e62515be2bd);
        l = shell.length - 1;
        for(; i < l; i++)result += shell[i] + colors[i];
    }
    return result + shell[l];
}, $45c181d6c56df0f8$export$dd733e62515be2bd = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
    p;
    for(p in $45c181d6c56df0f8$var$_colorLookup)s += "|" + p + "\\b";
    return new RegExp(s + ")", "gi");
}(), $45c181d6c56df0f8$var$_hslExp = /hsl[a]?\(/, $45c181d6c56df0f8$export$7eb2e5eb5eeb96a4 = function _colorStringFilter(a) {
    var combined = a.join(" "), toHSL;
    $45c181d6c56df0f8$export$dd733e62515be2bd.lastIndex = 0;
    if ($45c181d6c56df0f8$export$dd733e62515be2bd.test(combined)) {
        toHSL = $45c181d6c56df0f8$var$_hslExp.test(combined);
        a[1] = $45c181d6c56df0f8$var$_formatColors(a[1], toHSL);
        a[0] = $45c181d6c56df0f8$var$_formatColors(a[0], toHSL, $45c181d6c56df0f8$var$_colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.
        return true;
    }
}, /*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */ $45c181d6c56df0f8$var$_tickerActive, $45c181d6c56df0f8$export$762ed8fbedb691e3 = function() {
    var _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1000 / 240, _nextTime = _gap, _listeners = [], _id, _req, _raf, _self, _delta, _i, _tick = function _tick(v) {
        var elapsed = _getTime() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
        elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
        _lastUpdate += elapsed;
        time = _lastUpdate - _startTime;
        overlap = time - _nextTime;
        if (overlap > 0 || manual) {
            frame = ++_self.frame;
            _delta = time - _self.time * 1000;
            _self.time = time = time / 1000;
            _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
            dispatch = 1;
        }
        manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
        if (dispatch) for(_i = 0; _i < _listeners.length; _i++)// use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
    };
    _self = {
        time: 0,
        frame: 0,
        tick: function tick() {
            _tick(true);
        },
        deltaRatio: function deltaRatio(fps) {
            return _delta / (1000 / (fps || 60));
        },
        wake: function wake() {
            if ($45c181d6c56df0f8$var$_coreReady) {
                if (!$45c181d6c56df0f8$var$_coreInitted && $45c181d6c56df0f8$var$_windowExists()) {
                    $45c181d6c56df0f8$var$_win = $45c181d6c56df0f8$var$_coreInitted = window;
                    $45c181d6c56df0f8$var$_doc = $45c181d6c56df0f8$var$_win.document || {
                    };
                    $45c181d6c56df0f8$var$_globals.gsap = $45c181d6c56df0f8$export$99ee26438460406a;
                    ($45c181d6c56df0f8$var$_win.gsapVersions || ($45c181d6c56df0f8$var$_win.gsapVersions = [])).push($45c181d6c56df0f8$export$99ee26438460406a.version);
                    $45c181d6c56df0f8$var$_install($45c181d6c56df0f8$var$_installScope || $45c181d6c56df0f8$var$_win.GreenSockGlobals || !$45c181d6c56df0f8$var$_win.gsap && $45c181d6c56df0f8$var$_win || {
                    });
                    _raf = $45c181d6c56df0f8$var$_win.requestAnimationFrame;
                }
                _id && _self.sleep();
                _req = _raf || function(f) {
                    return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
                };
                $45c181d6c56df0f8$var$_tickerActive = 1;
                _tick(2);
            }
        },
        sleep: function sleep() {
            (_raf ? $45c181d6c56df0f8$var$_win.cancelAnimationFrame : clearTimeout)(_id);
            $45c181d6c56df0f8$var$_tickerActive = 0;
            _req = $45c181d6c56df0f8$var$_emptyFunc;
        },
        lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
            _lagThreshold = threshold || 1 / $45c181d6c56df0f8$var$_tinyNum; //zero should be interpreted as basically unlimited
            _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
        },
        fps: function fps(_fps) {
            _gap = 1000 / (_fps || 240);
            _nextTime = _self.time * 1000 + _gap;
        },
        add: function add(callback) {
            _listeners.indexOf(callback) < 0 && _listeners.push(callback);
            $45c181d6c56df0f8$var$_wake();
        },
        remove: function remove(callback) {
            var i;
            ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
        },
        _listeners: _listeners
    };
    return _self;
}(), $45c181d6c56df0f8$var$_wake = function _wake() {
    return !$45c181d6c56df0f8$var$_tickerActive && $45c181d6c56df0f8$export$762ed8fbedb691e3.wake();
}, //also ensures the core classes are initialized.
/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/ $45c181d6c56df0f8$var$_easeMap = {
}, $45c181d6c56df0f8$var$_customEaseExp = /^[\d.\-M][\d.\-,\s]/, $45c181d6c56df0f8$var$_quotesExp = /["']/g, $45c181d6c56df0f8$var$_parseObjectInString = function _parseObjectInString(value) {
    //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
    var obj = {
    }, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
    for(; i < l; i++){
        val = split[i];
        index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
        parsedVal = val.substr(0, index);
        obj[key] = isNaN(parsedVal) ? parsedVal.replace($45c181d6c56df0f8$var$_quotesExp, "").trim() : +parsedVal;
        key = val.substr(index + 1).trim();
    }
    return obj;
}, $45c181d6c56df0f8$var$_valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
}, $45c181d6c56df0f8$var$_configEaseFromString = function _configEaseFromString(name) {
    //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
    var split = (name + "").split("("), ease = $45c181d6c56df0f8$var$_easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [
        $45c181d6c56df0f8$var$_parseObjectInString(split[1])
    ] : $45c181d6c56df0f8$var$_valueInParentheses(name).split(",").map($45c181d6c56df0f8$var$_numericIfPossible)) : $45c181d6c56df0f8$var$_easeMap._CE && $45c181d6c56df0f8$var$_customEaseExp.test(name) ? $45c181d6c56df0f8$var$_easeMap._CE("", name) : ease;
}, $45c181d6c56df0f8$var$_invertEase = function _invertEase(ease) {
    return function(p) {
        return 1 - ease(1 - p);
    };
}, // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
$45c181d6c56df0f8$var$_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first, ease;
    while(child){
        if (child instanceof $45c181d6c56df0f8$export$e6a97ba2cae5bb94) _propagateYoyoEase(child, isYoyo);
        else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
            if (child.timeline) _propagateYoyoEase(child.timeline, isYoyo);
            else {
                ease = child._ease;
                child._ease = child._yEase;
                child._yEase = ease;
                child._yoyo = isYoyo;
            }
        }
        child = child._next;
    }
}, $45c181d6c56df0f8$var$_parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : ($45c181d6c56df0f8$var$_isFunction(ease) ? ease : $45c181d6c56df0f8$var$_easeMap[ease] || $45c181d6c56df0f8$var$_configEaseFromString(ease)) || defaultEase;
}, $45c181d6c56df0f8$var$_insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
    };
    if (easeInOut === void 0) easeInOut = function easeInOut(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
    var ease = {
        easeIn: easeIn,
        easeOut: easeOut,
        easeInOut: easeInOut
    }, lowercaseName;
    $45c181d6c56df0f8$export$f9000b814859f126(names, function(name) {
        $45c181d6c56df0f8$var$_easeMap[name] = $45c181d6c56df0f8$var$_globals[name] = ease;
        $45c181d6c56df0f8$var$_easeMap[lowercaseName = name.toLowerCase()] = easeOut;
        for(var p in ease)$45c181d6c56df0f8$var$_easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = $45c181d6c56df0f8$var$_easeMap[name + "." + p] = ease[p];
    });
    return ease;
}, $45c181d6c56df0f8$var$_easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function(p) {
        return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
}, $45c181d6c56df0f8$var$_configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
    p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / $45c181d6c56df0f8$var$_2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut(p) {
        return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * $45c181d6c56df0f8$var$_sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
        return 1 - easeOut(1 - p);
    } : $45c181d6c56df0f8$var$_easeInOutFromOut(easeOut);
    p2 = $45c181d6c56df0f8$var$_2PI / p2; //precalculate to optimize
    ease.config = function(amplitude, period) {
        return _configElastic(type, amplitude, period);
    };
    return ease;
}, $45c181d6c56df0f8$var$_configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) overshoot = 1.70158;
    var easeOut = function easeOut(p) {
        return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
        return 1 - easeOut(1 - p);
    } : $45c181d6c56df0f8$var$_easeInOutFromOut(easeOut);
    ease.config = function(overshoot) {
        return _configBack(type, overshoot);
    };
    return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };
$45c181d6c56df0f8$export$f9000b814859f126("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    $45c181d6c56df0f8$var$_insertEase(name + ",Power" + (power - 1), i ? function(p) {
        return Math.pow(p, power);
    } : function(p) {
        return p;
    }, function(p) {
        return 1 - Math.pow(1 - p, power);
    }, function(p) {
        return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
});
$45c181d6c56df0f8$var$_easeMap.Linear.easeNone = $45c181d6c56df0f8$var$_easeMap.none = $45c181d6c56df0f8$var$_easeMap.Linear.easeIn;
$45c181d6c56df0f8$var$_insertEase("Elastic", $45c181d6c56df0f8$var$_configElastic("in"), $45c181d6c56df0f8$var$_configElastic("out"), $45c181d6c56df0f8$var$_configElastic());
(function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut(p) {
        return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    $45c181d6c56df0f8$var$_insertEase("Bounce", function(p) {
        return 1 - easeOut(1 - p);
    }, easeOut);
})(7.5625, 2.75);
$45c181d6c56df0f8$var$_insertEase("Expo", function(p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
});
$45c181d6c56df0f8$var$_insertEase("Circ", function(p) {
    return -($45c181d6c56df0f8$var$_sqrt(1 - p * p) - 1);
});
$45c181d6c56df0f8$var$_insertEase("Sine", function(p) {
    return p === 1 ? 1 : -$45c181d6c56df0f8$var$_cos(p * $45c181d6c56df0f8$var$_HALF_PI) + 1;
});
$45c181d6c56df0f8$var$_insertEase("Back", $45c181d6c56df0f8$var$_configBack("in"), $45c181d6c56df0f8$var$_configBack("out"), $45c181d6c56df0f8$var$_configBack());
$45c181d6c56df0f8$var$_easeMap.SteppedEase = $45c181d6c56df0f8$var$_easeMap.steps = $45c181d6c56df0f8$var$_globals.SteppedEase = {
    config: function config(steps, immediateStart) {
        if (steps === void 0) steps = 1;
        var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - $45c181d6c56df0f8$var$_tinyNum;
        return function(p) {
            return ((p2 * $45c181d6c56df0f8$var$_clamp(0, max, p) | 0) + p3) * p1;
        };
    }
};
$45c181d6c56df0f8$var$_defaults.ease = $45c181d6c56df0f8$var$_easeMap["quad.out"];
$45c181d6c56df0f8$export$f9000b814859f126("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return $45c181d6c56df0f8$var$_callbackNames += name + "," + name + "Params,";
});
var $45c181d6c56df0f8$export$cf10981d5419cad5 = function GSCache(target, harness) {
    this.id = $45c181d6c56df0f8$var$_gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : $45c181d6c56df0f8$export$51d6bbe898aef1f9;
    this.set = harness ? harness.getSetter : $45c181d6c56df0f8$export$d60fbc1e0278aaf0;
};
var $45c181d6c56df0f8$export$c35d437ae5945fcd = /*#__PURE__*/ function() {
    function Animation(vars) {
        this.vars = vars;
        this._delay = +vars.delay || 0;
        if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
            // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
            this._rDelay = vars.repeatDelay || 0;
            this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
        }
        this._ts = 1;
        $45c181d6c56df0f8$var$_setDuration(this, +vars.duration, 1, 1);
        this.data = vars.data;
        $45c181d6c56df0f8$var$_tickerActive || $45c181d6c56df0f8$export$762ed8fbedb691e3.wake();
    }
    var _proto = Animation.prototype;
    _proto.delay = function delay(value) {
        if (value || value === 0) {
            this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
            this._delay = value;
            return this;
        }
        return this._delay;
    };
    _proto.duration = function duration(value) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
        if (!arguments.length) return this._tDur;
        this._dirty = 0;
        return $45c181d6c56df0f8$var$_setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
        $45c181d6c56df0f8$var$_wake();
        if (!arguments.length) return this._tTime;
        var parent = this._dp;
        if (parent && parent.smoothChildTiming && this._ts) {
            $45c181d6c56df0f8$var$_alignPlayhead(this, _totalTime);
            !parent._dp || parent.parent || $45c181d6c56df0f8$var$_postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
            //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.
            while(parent && parent.parent){
                if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) parent.totalTime(parent._tTime, true);
                parent = parent.parent;
            }
            if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
            $45c181d6c56df0f8$var$_addToTimeline(this._dp, this, this._start - this._delay);
        }
        if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === $45c181d6c56df0f8$var$_tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
            // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
            this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
            //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
            //   this._lock = 1;
            $45c181d6c56df0f8$var$_lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
        //}
        }
        return this;
    };
    _proto.time = function time(value, suppressEvents) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + $45c181d6c56df0f8$var$_elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
        return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };
    _proto.progress = function progress(value, suppressEvents) {
        return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + $45c181d6c56df0f8$var$_elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
        var cycleDuration = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? $45c181d6c56df0f8$var$_animationCycle(this._tTime, cycleDuration) + 1 : 1;
    } // potential future addition:
    ;
    _proto.timeScale = function timeScale(value) {
        if (!arguments.length) return this._rts === -$45c181d6c56df0f8$var$_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
        if (this._rts === value) return this;
        var tTime = this.parent && this._ts ? $45c181d6c56df0f8$var$_parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
        // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
        //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
        // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.
        this._rts = +value || 0;
        this._ts = this._ps || value === -$45c181d6c56df0f8$var$_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.
        $45c181d6c56df0f8$var$_recacheAncestors(this.totalTime($45c181d6c56df0f8$var$_clamp(-this._delay, this._tDur, tTime), true));
        $45c181d6c56df0f8$var$_setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.
        return this;
    };
    _proto.paused = function paused(value) {
        if (!arguments.length) return this._ps;
        if (this._ps !== value) {
            this._ps = value;
            if (value) {
                this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.
                this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
            } else {
                $45c181d6c56df0f8$var$_wake();
                this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.
                this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== $45c181d6c56df0f8$var$_tinyNum && (this._tTime -= $45c181d6c56df0f8$var$_tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
            }
        }
        return this;
    };
    _proto.startTime = function startTime(value) {
        if (arguments.length) {
            this._start = value;
            var parent = this.parent || this._dp;
            parent && (parent._sort || !this.parent) && $45c181d6c56df0f8$var$_addToTimeline(parent, this, value - this._delay);
            return this;
        }
        return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
        return this._start + ($45c181d6c56df0f8$var$_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
        var parent = this.parent || this._dp; // _dp = detached parent
        return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : $45c181d6c56df0f8$var$_parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.globalTime = function globalTime(rawTime) {
        var animation = this, time = arguments.length ? rawTime : animation.rawTime();
        while(animation){
            time = animation._start + time / (animation._ts || 1);
            animation = animation._dp;
        }
        return time;
    };
    _proto.repeat = function repeat(value) {
        if (arguments.length) {
            this._repeat = value === Infinity ? -2 : value;
            return $45c181d6c56df0f8$var$_onUpdateTotalDuration(this);
        }
        return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
        if (arguments.length) {
            var time = this._time;
            this._rDelay = value;
            $45c181d6c56df0f8$var$_onUpdateTotalDuration(this);
            return time ? this.time(time) : this;
        }
        return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
        if (arguments.length) {
            this._yoyo = value;
            return this;
        }
        return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
        return this.totalTime($45c181d6c56df0f8$var$_parsePosition(this, position), $45c181d6c56df0f8$var$_isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
        return this.play().totalTime(includeDelay ? -this._delay : 0, $45c181d6c56df0f8$var$_isNotFalse(suppressEvents));
    };
    _proto.play = function play(from, suppressEvents) {
        from != null && this.seek(from, suppressEvents);
        return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
        from != null && this.seek(from || this.totalDuration(), suppressEvents);
        return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
        atTime != null && this.seek(atTime, suppressEvents);
        return this.paused(true);
    };
    _proto.resume = function resume() {
        return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
        if (arguments.length) {
            !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -$45c181d6c56df0f8$var$_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.
            return this;
        }
        return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
        this._initted = this._act = 0;
        this._zTime = -$45c181d6c56df0f8$var$_tinyNum;
        return this;
    };
    _proto.isActive = function isActive() {
        var parent = this.parent || this._dp, start = this._start, rawTime;
        return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - $45c181d6c56df0f8$var$_tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
        var vars = this.vars;
        if (arguments.length > 1) {
            if (!callback) delete vars[type];
            else {
                vars[type] = callback;
                params && (vars[type + "Params"] = params);
                type === "onUpdate" && (this._onUpdate = callback);
            }
            return this;
        }
        return vars[type];
    };
    _proto.then = function then(onFulfilled) {
        var self = this;
        return new Promise(function(resolve) {
            var f = $45c181d6c56df0f8$var$_isFunction(onFulfilled) ? onFulfilled : $45c181d6c56df0f8$var$_passThrough, _resolve = function _resolve() {
                var _then = self.then;
                self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)
                $45c181d6c56df0f8$var$_isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
                resolve(f);
                self.then = _then;
            };
            if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) _resolve();
            else self._prom = _resolve;
        });
    };
    _proto.kill = function kill() {
        $45c181d6c56df0f8$var$_interrupt(this);
    };
    return Animation;
}();
$45c181d6c56df0f8$export$dc2b19673bb53610($45c181d6c56df0f8$export$c35d437ae5945fcd.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -$45c181d6c56df0f8$var$_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
});
var $45c181d6c56df0f8$export$e6a97ba2cae5bb94 = /*#__PURE__*/ function(_Animation) {
    $45c181d6c56df0f8$var$_inheritsLoose(Timeline, _Animation);
    function Timeline(vars, position) {
        var _this;
        if (vars === void 0) vars = {
        };
        _this = _Animation.call(this, vars) || this;
        _this.labels = {
        };
        _this.smoothChildTiming = !!vars.smoothChildTiming;
        _this.autoRemoveChildren = !!vars.autoRemoveChildren;
        _this._sort = $45c181d6c56df0f8$var$_isNotFalse(vars.sortChildren);
        $45c181d6c56df0f8$var$_globalTimeline && $45c181d6c56df0f8$var$_addToTimeline(vars.parent || $45c181d6c56df0f8$var$_globalTimeline, $45c181d6c56df0f8$var$_assertThisInitialized(_this), position);
        vars.reversed && _this.reverse();
        vars.paused && _this.paused(true);
        vars.scrollTrigger && $45c181d6c56df0f8$var$_scrollTrigger($45c181d6c56df0f8$var$_assertThisInitialized(_this), vars.scrollTrigger);
        return _this;
    }
    var _proto2 = Timeline.prototype;
    _proto2.to = function to(targets, vars, position) {
        $45c181d6c56df0f8$var$_createTweenType(0, arguments, this);
        return this;
    };
    _proto2.from = function from(targets, vars, position) {
        $45c181d6c56df0f8$var$_createTweenType(1, arguments, this);
        return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
        $45c181d6c56df0f8$var$_createTweenType(2, arguments, this);
        return this;
    };
    _proto2.set = function set(targets, vars, position) {
        vars.duration = 0;
        vars.parent = this;
        $45c181d6c56df0f8$var$_inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
        vars.immediateRender = !!vars.immediateRender;
        new $45c181d6c56df0f8$export$208a41d6b4e37b97(targets, vars, $45c181d6c56df0f8$var$_parsePosition(this, position), 1);
        return this;
    };
    _proto2.call = function call(callback, params, position) {
        return $45c181d6c56df0f8$var$_addToTimeline(this, $45c181d6c56df0f8$export$208a41d6b4e37b97.delayedCall(0, callback, params), position);
    } //ONLY for backward compatibility! Maybe delete?
    ;
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
        vars.duration = duration;
        vars.stagger = vars.stagger || stagger;
        vars.onComplete = onCompleteAll;
        vars.onCompleteParams = onCompleteAllParams;
        vars.parent = this;
        new $45c181d6c56df0f8$export$208a41d6b4e37b97(targets, vars, $45c181d6c56df0f8$var$_parsePosition(this, position));
        return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
        vars.runBackwards = 1;
        $45c181d6c56df0f8$var$_inheritDefaults(vars).immediateRender = $45c181d6c56df0f8$var$_isNotFalse(vars.immediateRender);
        return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
        toVars.startAt = fromVars;
        $45c181d6c56df0f8$var$_inheritDefaults(toVars).immediateRender = $45c181d6c56df0f8$var$_isNotFalse(toVars.immediateRender);
        return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render(totalTime, suppressEvents, force) {
        var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : $45c181d6c56df0f8$var$_roundPrecise(totalTime), // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
        crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
        this !== $45c181d6c56df0f8$var$_globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
        if (tTime !== this._tTime || force || crossingStart) {
            if (prevTime !== this._time && dur) {
                //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
                tTime += this._time - prevTime;
                totalTime += this._time - prevTime;
            }
            time = tTime;
            prevStart = this._start;
            timeScale = this._ts;
            prevPaused = !timeScale;
            if (crossingStart) {
                dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.
                (totalTime || !suppressEvents) && (this._zTime = totalTime);
            }
            if (this._repeat) {
                //adjust the time for repeats and yoyos
                yoyo = this._yoyo;
                cycleDuration = dur + this._rDelay;
                if (this._repeat < -1 && totalTime < 0) return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
                time = $45c181d6c56df0f8$var$_roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
                if (tTime === tDur) {
                    // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
                    iteration = this._repeat;
                    time = dur;
                } else {
                    iteration = ~~(tTime / cycleDuration);
                    if (iteration && iteration === tTime / cycleDuration) {
                        time = dur;
                        iteration--;
                    }
                    time > dur && (time = dur);
                }
                prevIteration = $45c181d6c56df0f8$var$_animationCycle(this._tTime, cycleDuration);
                !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005
                if (yoyo && iteration & 1) {
                    time = dur - time;
                    isYoyo = 1;
                }
                /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */ if (iteration !== prevIteration && !this._lock) {
                    var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
                    iteration < prevIteration && (rewinding = !rewinding);
                    prevTime = rewinding ? 0 : dur;
                    this._lock = 1;
                    this.render(prevTime || (isYoyo ? 0 : $45c181d6c56df0f8$var$_roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
                    this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.
                    !suppressEvents && this.parent && $45c181d6c56df0f8$var$_callback(this, "onRepeat");
                    this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
                    if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
                    return this;
                    dur = this._dur; // in case the duration changed in the onRepeat
                    tDur = this._tDur;
                    if (doesWrap) {
                        this._lock = 2;
                        prevTime = rewinding ? dur : -0.0001;
                        this.render(prevTime, true);
                        this.vars.repeatRefresh && !isYoyo && this.invalidate();
                    }
                    this._lock = 0;
                    if (!this._ts && !prevPaused) return this;
                     //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.
                    $45c181d6c56df0f8$var$_propagateYoyoEase(this, isYoyo);
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2) {
                pauseTween = $45c181d6c56df0f8$var$_findNextPauseTween(this, $45c181d6c56df0f8$var$_roundPrecise(prevTime), $45c181d6c56df0f8$var$_roundPrecise(time));
                if (pauseTween) tTime -= time - (time = pauseTween._start);
            }
            this._tTime = tTime;
            this._time = time;
            this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.
            if (!this._initted) {
                this._onUpdate = this.vars.onUpdate;
                this._initted = 1;
                this._zTime = totalTime;
                prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
            }
            if (!prevTime && time && !suppressEvents) {
                $45c181d6c56df0f8$var$_callback(this, "onStart");
                if (this._tTime !== tTime) // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
                return this;
            }
            if (time >= prevTime && totalTime >= 0) {
                child = this._first;
                while(child){
                    next = child._next;
                    if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
                        if (child.parent !== this) // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                        return this.render(totalTime, suppressEvents, force);
                        child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
                        if (time !== this._time || !this._ts && !prevPaused) {
                            //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                            pauseTween = 0;
                            next && (tTime += this._zTime = -$45c181d6c56df0f8$var$_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)
                            break;
                        }
                    }
                    child = next;
                }
            } else {
                child = this._last;
                var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.
                while(child){
                    next = child._prev;
                    if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
                        if (child.parent !== this) // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                        return this.render(totalTime, suppressEvents, force);
                        child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);
                        if (time !== this._time || !this._ts && !prevPaused) {
                            //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                            pauseTween = 0;
                            next && (tTime += this._zTime = adjustedTime ? -$45c181d6c56df0f8$var$_tinyNum : $45c181d6c56df0f8$var$_tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)
                            break;
                        }
                    }
                    child = next;
                }
            }
            if (pauseTween && !suppressEvents) {
                this.pause();
                pauseTween.render(time >= prevTime ? 0 : -$45c181d6c56df0f8$var$_tinyNum)._zTime = time >= prevTime ? 1 : -1;
                if (this._ts) {
                    //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
                    this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.
                    $45c181d6c56df0f8$var$_setEnd(this);
                    return this.render(totalTime, suppressEvents, force);
                }
            }
            this._onUpdate && !suppressEvents && $45c181d6c56df0f8$var$_callback(this, "onUpdate", true);
            if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) {
                if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
                    if (!this._lock) {
                        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && $45c181d6c56df0f8$var$_removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.
                        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                            $45c181d6c56df0f8$var$_callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                        }
                    }
                }
            }
        }
        return this;
    };
    _proto2.add = function add(child, position) {
        var _this2 = this;
        $45c181d6c56df0f8$var$_isNumber(position) || (position = $45c181d6c56df0f8$var$_parsePosition(this, position, child));
        if (!(child instanceof $45c181d6c56df0f8$export$c35d437ae5945fcd)) {
            if ($45c181d6c56df0f8$var$_isArray(child)) {
                child.forEach(function(obj) {
                    return _this2.add(obj, position);
                });
                return this;
            }
            if ($45c181d6c56df0f8$export$f664476fd67145ca(child)) return this.addLabel(child, position);
            if ($45c181d6c56df0f8$var$_isFunction(child)) child = $45c181d6c56df0f8$export$208a41d6b4e37b97.delayedCall(0, child);
            else return this;
        }
        return this !== child ? $45c181d6c56df0f8$var$_addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
        if (nested === void 0) nested = true;
        if (tweens === void 0) tweens = true;
        if (timelines === void 0) timelines = true;
        if (ignoreBeforeTime === void 0) ignoreBeforeTime = -$45c181d6c56df0f8$var$_bigNum;
        var a = [], child = this._first;
        while(child){
            if (child._start >= ignoreBeforeTime) {
                if (child instanceof $45c181d6c56df0f8$export$208a41d6b4e37b97) tweens && a.push(child);
                else {
                    timelines && a.push(child);
                    nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
                }
            }
            child = child._next;
        }
        return a;
    };
    _proto2.getById = function getById(id) {
        var animations = this.getChildren(1, 1, 1), i = animations.length;
        while(i--){
            if (animations[i].vars.id === id) return animations[i];
        }
    };
    _proto2.remove = function remove(child) {
        if ($45c181d6c56df0f8$export$f664476fd67145ca(child)) return this.removeLabel(child);
        if ($45c181d6c56df0f8$var$_isFunction(child)) return this.killTweensOf(child);
        $45c181d6c56df0f8$export$cd008aa6cd8844e3(this, child);
        if (child === this._recent) this._recent = this._last;
        return $45c181d6c56df0f8$var$_uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
        if (!arguments.length) return this._tTime;
        this._forcing = 1;
        if (!this._dp && this._ts) //special case for the global timeline (or any other that has no parent or detached parent).
        this._start = $45c181d6c56df0f8$var$_roundPrecise($45c181d6c56df0f8$export$762ed8fbedb691e3.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
        _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
        this._forcing = 0;
        return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
        this.labels[label] = $45c181d6c56df0f8$var$_parsePosition(this, position);
        return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
        delete this.labels[label];
        return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
        var t = $45c181d6c56df0f8$export$208a41d6b4e37b97.delayedCall(0, callback || $45c181d6c56df0f8$var$_emptyFunc, params);
        t.data = "isPause";
        this._hasPause = 1;
        return $45c181d6c56df0f8$var$_addToTimeline(this, t, $45c181d6c56df0f8$var$_parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
        var child = this._first;
        position = $45c181d6c56df0f8$var$_parsePosition(this, position);
        while(child){
            if (child._start === position && child.data === "isPause") $45c181d6c56df0f8$var$_removeFromParent(child);
            child = child._next;
        }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
        var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
        while(i--)$45c181d6c56df0f8$var$_overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
        return this;
    };
    _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
        var a = [], parsedTargets = $45c181d6c56df0f8$export$45b10814cc054894(targets), child = this._first, isGlobalTime = $45c181d6c56df0f8$var$_isNumber(onlyActive), // a number is interpreted as a global time. If the animation spans
        children;
        while(child){
            if (child instanceof $45c181d6c56df0f8$export$208a41d6b4e37b97) {
                if ($45c181d6c56df0f8$var$_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!$45c181d6c56df0f8$var$_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
                a.push(child);
            } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) a.push.apply(a, children);
            child = child._next;
        }
        return a;
    } // potential future feature - targets() on timelines
    ;
    _proto2.tweenTo = function tweenTo(position, vars) {
        vars = vars || {
        };
        var tl = this, endTime = $45c181d6c56df0f8$var$_parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = $45c181d6c56df0f8$export$208a41d6b4e37b97.to(tl, $45c181d6c56df0f8$export$dc2b19673bb53610({
            ease: vars.ease || "none",
            lazy: false,
            immediateRender: false,
            time: endTime,
            overwrite: "auto",
            duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || $45c181d6c56df0f8$var$_tinyNum,
            onStart: function onStart() {
                tl.pause();
                if (!initted) {
                    var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
                    tween._dur !== duration && $45c181d6c56df0f8$var$_setDuration(tween, duration, 0, 1).render(tween._time, true, true);
                    initted = 1;
                }
                _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
            }
        }, vars));
        return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
        return this.tweenTo(toPosition, $45c181d6c56df0f8$export$dc2b19673bb53610({
            startAt: {
                time: $45c181d6c56df0f8$var$_parsePosition(this, fromPosition)
            }
        }, vars));
    };
    _proto2.recent = function recent() {
        return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
        if (afterTime === void 0) afterTime = this._time;
        return $45c181d6c56df0f8$var$_getLabelInDirection(this, $45c181d6c56df0f8$var$_parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
        if (beforeTime === void 0) beforeTime = this._time;
        return $45c181d6c56df0f8$var$_getLabelInDirection(this, $45c181d6c56df0f8$var$_parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
        return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + $45c181d6c56df0f8$var$_tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
        if (ignoreBeforeTime === void 0) ignoreBeforeTime = 0;
        var child = this._first, labels = this.labels, p;
        while(child){
            if (child._start >= ignoreBeforeTime) {
                child._start += amount;
                child._end += amount;
            }
            child = child._next;
        }
        if (adjustLabels) {
            for(p in labels)if (labels[p] >= ignoreBeforeTime) labels[p] += amount;
        }
        return $45c181d6c56df0f8$var$_uncache(this);
    };
    _proto2.invalidate = function invalidate() {
        var child = this._first;
        this._lock = 0;
        while(child){
            child.invalidate();
            child = child._next;
        }
        return _Animation.prototype.invalidate.call(this);
    };
    _proto2.clear = function clear(includeLabels) {
        if (includeLabels === void 0) includeLabels = true;
        var child = this._first, next;
        while(child){
            next = child._next;
            this.remove(child);
            child = next;
        }
        this._dp && (this._time = this._tTime = this._pTime = 0);
        includeLabels && (this.labels = {
        });
        return $45c181d6c56df0f8$var$_uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
        var max = 0, self = this, child = self._last, prevStart = $45c181d6c56df0f8$var$_bigNum, prev, start, parent;
        if (arguments.length) return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
        if (self._dirty) {
            parent = self.parent;
            while(child){
                prev = child._prev; //record it here in case the tween changes position in the sequence...
                child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.
                start = child._start;
                if (start > prevStart && self._sort && child._ts && !self._lock) {
                    //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
                    self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().
                    $45c181d6c56df0f8$var$_addToTimeline(self, child, start - child._delay, 1)._lock = 0;
                } else prevStart = start;
                if (start < 0 && child._ts) {
                    //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
                    max -= start;
                    if (!parent && !self._dp || parent && parent.smoothChildTiming) {
                        self._start += start / self._ts;
                        self._time -= start;
                        self._tTime -= start;
                    }
                    self.shiftChildren(-start, false, -Infinity);
                    prevStart = 0;
                }
                child._end > max && child._ts && (max = child._end);
                child = prev;
            }
            $45c181d6c56df0f8$var$_setDuration(self, self === $45c181d6c56df0f8$var$_globalTimeline && self._time > max ? self._time : max, 1, 1);
            self._dirty = 0;
        }
        return self._tDur;
    };
    Timeline.updateRoot = function updateRoot(time) {
        if ($45c181d6c56df0f8$var$_globalTimeline._ts) {
            $45c181d6c56df0f8$var$_lazySafeRender($45c181d6c56df0f8$var$_globalTimeline, $45c181d6c56df0f8$var$_parentToChildTotalTime(time, $45c181d6c56df0f8$var$_globalTimeline));
            $45c181d6c56df0f8$var$_lastRenderedFrame = $45c181d6c56df0f8$export$762ed8fbedb691e3.frame;
        }
        if ($45c181d6c56df0f8$export$762ed8fbedb691e3.frame >= $45c181d6c56df0f8$var$_nextGCFrame) {
            $45c181d6c56df0f8$var$_nextGCFrame += $45c181d6c56df0f8$export$4922bee768729a77.autoSleep || 120;
            var child = $45c181d6c56df0f8$var$_globalTimeline._first;
            if (!child || !child._ts) {
                if ($45c181d6c56df0f8$export$4922bee768729a77.autoSleep && $45c181d6c56df0f8$export$762ed8fbedb691e3._listeners.length < 2) {
                    while(child && !child._ts)child = child._next;
                    child || $45c181d6c56df0f8$export$762ed8fbedb691e3.sleep();
                }
            }
        }
    };
    return Timeline;
}($45c181d6c56df0f8$export$c35d437ae5945fcd);
$45c181d6c56df0f8$export$dc2b19673bb53610($45c181d6c56df0f8$export$e6a97ba2cae5bb94.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var $45c181d6c56df0f8$var$_addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    var pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(this._pt, target, prop, 0, 1, $45c181d6c56df0f8$export$c5bc8e04394ecb2, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings
    end += "";
    if (hasRandom = ~end.indexOf("random(")) end = $45c181d6c56df0f8$export$d5962a97e3cde94d(end);
    if (stringFilter) {
        a = [
            start,
            end
        ];
        stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
        start = a[0];
        end = a[1];
    }
    startNums = start.match($45c181d6c56df0f8$var$_complexStringNumExp) || [];
    while(result = $45c181d6c56df0f8$var$_complexStringNumExp.exec(end)){
        endNum = result[0];
        chunk = end.substring(index, result.index);
        if (color) color = (color + 1) % 5;
        else if (chunk.substr(-5) === "rgba(") color = 1;
        if (endNum !== startNums[matchIndex++]) {
            startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.
            pt._pt = {
                _next: pt._pt,
                p: chunk || matchIndex === 1 ? chunk : ",",
                //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
                s: startNum,
                c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
                m: color && color < 4 ? Math.round : 0
            };
            index = $45c181d6c56df0f8$var$_complexStringNumExp.lastIndex;
        }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    pt.fp = funcParam;
    if ($45c181d6c56df0f8$export$5a680e28b0b61bc.test(end) || hasRandom) pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    return pt;
}, $45c181d6c56df0f8$var$_addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
    $45c181d6c56df0f8$var$_isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !$45c181d6c56df0f8$var$_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !$45c181d6c56df0f8$var$_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !$45c181d6c56df0f8$var$_isFunction(currentValue) ? $45c181d6c56df0f8$var$_setterPlain : funcParam ? $45c181d6c56df0f8$var$_setterFuncWithParam : $45c181d6c56df0f8$var$_setterFunc, pt;
    if ($45c181d6c56df0f8$export$f664476fd67145ca(end)) {
        if (~end.indexOf("random(")) end = $45c181d6c56df0f8$export$d5962a97e3cde94d(end);
        if (end.charAt(1) === "=") {
            pt = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + ($45c181d6c56df0f8$export$65f2564e9a9b9222(parsedStart) || 0);
            if (pt || pt === 0) // to avoid isNaN, like if someone passes in a value like "!= whatever"
            end = pt;
        }
    }
    if (parsedStart !== end) {
        if (!isNaN(parsedStart * end) && end !== "") {
            // fun fact: any number multiplied by "" is evaluated as the number 0!
            pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? $45c181d6c56df0f8$var$_renderBoolean : $45c181d6c56df0f8$var$_renderPlain, 0, setter);
            funcParam && (pt.fp = funcParam);
            modifier && pt.modifier(modifier, this, target);
            return this._pt = pt;
        }
        !currentValue && !(prop in target) && $45c181d6c56df0f8$export$7fb54635790b59a5(prop, end);
        return $45c181d6c56df0f8$var$_addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || $45c181d6c56df0f8$export$4922bee768729a77.stringFilter, funcParam);
    }
}, //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
$45c181d6c56df0f8$var$_processVars = function _processVars(vars, index, target, targets, tween) {
    $45c181d6c56df0f8$var$_isFunction(vars) && (vars = $45c181d6c56df0f8$var$_parseFuncOrString(vars, tween, index, target, targets));
    if (!$45c181d6c56df0f8$var$_isObject(vars) || vars.style && vars.nodeType || $45c181d6c56df0f8$var$_isArray(vars) || $45c181d6c56df0f8$var$_isTypedArray(vars)) return $45c181d6c56df0f8$export$f664476fd67145ca(vars) ? $45c181d6c56df0f8$var$_parseFuncOrString(vars, tween, index, target, targets) : vars;
    var copy = {
    }, p;
    for(p in vars)copy[p] = $45c181d6c56df0f8$var$_parseFuncOrString(vars[p], tween, index, target, targets);
    return copy;
}, $45c181d6c56df0f8$export$5c457b74208010cf = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if ($45c181d6c56df0f8$export$d305d8ec5d7c26b8[property] && (plugin = new $45c181d6c56df0f8$export$d305d8ec5d7c26b8[property]()).init(target, plugin.rawVars ? vars[property] : $45c181d6c56df0f8$var$_processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
        tween._pt = pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
        if (tween !== $45c181d6c56df0f8$var$_quickTween) {
            ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.
            i = plugin._props.length;
            while(i--)ptLookup[plugin._props[i]] = pt;
        }
    }
    return plugin;
}, $45c181d6c56df0f8$var$_overwritingTween, //store a reference temporarily so we can avoid overwriting itself.
$45c181d6c56df0f8$var$_initTween = function _initTween(tween, time) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, onUpdateParams = vars.onUpdateParams, callbackScope = vars.callbackScope, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets, autoOverwrite = tween._overwrite === "auto" && !$45c181d6c56df0f8$var$_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = $45c181d6c56df0f8$var$_parseEase(ease, $45c181d6c56df0f8$var$_defaults.ease);
    tween._yEase = yoyoEase ? $45c181d6c56df0f8$var$_invertEase($45c181d6c56df0f8$var$_parseEase(yoyoEase === true ? ease : yoyoEase, $45c181d6c56df0f8$var$_defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
        //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
        yoyoEase = tween._yEase;
        tween._yEase = tween._ease;
        tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.
    if (!tl) {
        //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
        harness = targets[0] ? $45c181d6c56df0f8$export$8b9be379d2de2a39(targets[0]).harness : 0;
        harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.
        cleanVars = $45c181d6c56df0f8$var$_copyExcluding(vars, $45c181d6c56df0f8$var$_reservedProps);
        prevStartAt && prevStartAt.render(-1, true).kill();
        if (startAt) {
            $45c181d6c56df0f8$var$_removeFromParent(tween._startAt = $45c181d6c56df0f8$export$208a41d6b4e37b97.set(targets, $45c181d6c56df0f8$export$dc2b19673bb53610({
                data: "isStart",
                overwrite: false,
                parent: parent,
                immediateRender: true,
                lazy: $45c181d6c56df0f8$var$_isNotFalse(lazy),
                startAt: null,
                delay: 0,
                onUpdate: onUpdate,
                onUpdateParams: onUpdateParams,
                callbackScope: callbackScope,
                stagger: 0
            }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);
            time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.
            if (immediateRender) {
                time > 0 && !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
                if (dur && time <= 0) {
                    time && (tween._zTime = time);
                    return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
                } // if (time > 0) {
            // 	autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
            // } else if (dur && !(time < 0 && prevStartAt)) {
            // 	time && (tween._zTime = time);
            // 	return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
            // }
            } else if (autoRevert === false) tween._startAt = 0;
        } else if (runBackwards && dur) {
            //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
            if (prevStartAt) !autoRevert && (tween._startAt = 0);
            else {
                time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
                p = $45c181d6c56df0f8$export$dc2b19673bb53610({
                    overwrite: false,
                    data: "isFromStart",
                    //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
                    lazy: immediateRender && $45c181d6c56df0f8$var$_isNotFalse(lazy),
                    immediateRender: immediateRender,
                    //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
                    stagger: 0,
                    parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
                }, cleanVars);
                harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})
                $45c181d6c56df0f8$var$_removeFromParent(tween._startAt = $45c181d6c56df0f8$export$208a41d6b4e37b97.set(targets, p));
                time < 0 && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted from() tween.
                if (!immediateRender) _initTween(tween._startAt, $45c181d6c56df0f8$var$_tinyNum); //ensures that the initial values are recorded
                else if (!time) return;
            }
        }
        tween._pt = 0;
        lazy = dur && $45c181d6c56df0f8$var$_isNotFalse(lazy) || lazy && !dur;
        for(i = 0; i < targets.length; i++){
            target = targets[i];
            gsData = target._gsap || $45c181d6c56df0f8$var$_harness(targets)[i]._gsap;
            tween._ptLookup[i] = ptLookup = {
            };
            $45c181d6c56df0f8$var$_lazyLookup[gsData.id] && $45c181d6c56df0f8$var$_lazyTweens.length && $45c181d6c56df0f8$var$_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
            index = fullTargets === targets ? i : fullTargets.indexOf(target);
            if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
                tween._pt = pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
                plugin._props.forEach(function(name) {
                    ptLookup[name] = pt;
                });
                plugin.priority && (hasPriority = 1);
            }
            if (!harness || harnessVars) {
                for(p in cleanVars)if ($45c181d6c56df0f8$export$d305d8ec5d7c26b8[p] && (plugin = $45c181d6c56df0f8$export$5c457b74208010cf(p, cleanVars, tween, index, target, fullTargets))) plugin.priority && (hasPriority = 1);
                else ptLookup[p] = pt = $45c181d6c56df0f8$var$_addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
            tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
            if (autoOverwrite && tween._pt) {
                $45c181d6c56df0f8$var$_overwritingTween = tween;
                $45c181d6c56df0f8$var$_globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!
                overwritten = !tween.parent;
                $45c181d6c56df0f8$var$_overwritingTween = 0;
            }
            tween._pt && lazy && ($45c181d6c56df0f8$var$_lazyLookup[gsData.id] = 1);
        }
        hasPriority && $45c181d6c56df0f8$export$eed5824f53346d57(tween);
        tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.
}, $45c181d6c56df0f8$var$_addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? $45c181d6c56df0f8$export$8b9be379d2de2a39(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) return vars;
    copy = $45c181d6c56df0f8$var$_merge({
    }, vars);
    for(p in propertyAliases)if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while(i--)copy[aliases[i]] = copy[p];
    }
    return copy;
}, $45c181d6c56df0f8$var$_parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return $45c181d6c56df0f8$var$_isFunction(value) ? value.call(tween, i, target, targets) : $45c181d6c56df0f8$export$f664476fd67145ca(value) && ~value.indexOf("random(") ? $45c181d6c56df0f8$export$d5962a97e3cde94d(value) : value;
}, $45c181d6c56df0f8$var$_staggerTweenProps = $45c181d6c56df0f8$var$_callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase", $45c181d6c56df0f8$var$_staggerPropsToSkip = ($45c181d6c56df0f8$var$_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
var $45c181d6c56df0f8$export$208a41d6b4e37b97 = /*#__PURE__*/ function(_Animation2) {
    $45c181d6c56df0f8$var$_inheritsLoose(Tween, _Animation2);
    function Tween(targets, vars, position, skipInherit) {
        var _this3;
        if (typeof vars === "number") {
            position.duration = vars;
            vars = position;
            position = null;
        }
        _this3 = _Animation2.call(this, skipInherit ? vars : $45c181d6c56df0f8$var$_inheritDefaults(vars)) || this;
        var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || $45c181d6c56df0f8$var$_globalTimeline, parsedTargets = ($45c181d6c56df0f8$var$_isArray(targets) || $45c181d6c56df0f8$var$_isTypedArray(targets) ? $45c181d6c56df0f8$var$_isNumber(targets[0]) : "length" in vars) ? [
            targets
        ] : $45c181d6c56df0f8$export$45b10814cc054894(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
        _this3._targets = parsedTargets.length ? $45c181d6c56df0f8$var$_harness(parsedTargets) : $45c181d6c56df0f8$var$_warn("GSAP target " + targets + " not found. https://greensock.com", !$45c181d6c56df0f8$export$4922bee768729a77.nullTargetWarn) || [];
        _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property
        _this3._overwrite = overwrite;
        if (keyframes || stagger || $45c181d6c56df0f8$var$_isFuncOrString(duration) || $45c181d6c56df0f8$var$_isFuncOrString(delay)) {
            vars = _this3.vars;
            tl = _this3.timeline = new $45c181d6c56df0f8$export$e6a97ba2cae5bb94({
                data: "nested",
                defaults: defaults || {
                }
            });
            tl.kill();
            tl.parent = tl._dp = $45c181d6c56df0f8$var$_assertThisInitialized(_this3);
            tl._start = 0;
            if (keyframes) {
                $45c181d6c56df0f8$var$_inheritDefaults($45c181d6c56df0f8$export$dc2b19673bb53610(tl.vars.defaults, {
                    ease: "none"
                }));
                stagger ? parsedTargets.forEach(function(t, i) {
                    return keyframes.forEach(function(frame, j) {
                        return tl.to(t, frame, j ? ">" : i * stagger);
                    });
                }) : keyframes.forEach(function(frame) {
                    return tl.to(parsedTargets, frame, ">");
                });
            } else {
                l = parsedTargets.length;
                staggerFunc = stagger ? $45c181d6c56df0f8$export$f02a9ddbe4480f19(stagger) : $45c181d6c56df0f8$var$_emptyFunc;
                if ($45c181d6c56df0f8$var$_isObject(stagger)) {
                    //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
                    for(p in stagger)if (~$45c181d6c56df0f8$var$_staggerTweenProps.indexOf(p)) {
                        staggerVarsToMerge || (staggerVarsToMerge = {
                        });
                        staggerVarsToMerge[p] = stagger[p];
                    }
                }
                for(i = 0; i < l; i++){
                    copy = {
                    };
                    for(p in vars)if ($45c181d6c56df0f8$var$_staggerPropsToSkip.indexOf(p) < 0) copy[p] = vars[p];
                    copy.stagger = 0;
                    yoyoEase && (copy.yoyoEase = yoyoEase);
                    staggerVarsToMerge && $45c181d6c56df0f8$var$_merge(copy, staggerVarsToMerge);
                    curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.
                    copy.duration = +$45c181d6c56df0f8$var$_parseFuncOrString(duration, $45c181d6c56df0f8$var$_assertThisInitialized(_this3), i, curTarget, parsedTargets);
                    copy.delay = (+$45c181d6c56df0f8$var$_parseFuncOrString(delay, $45c181d6c56df0f8$var$_assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
                    if (!stagger && l === 1 && copy.delay) {
                        // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
                        _this3._delay = delay = copy.delay;
                        _this3._start += delay;
                        copy.delay = 0;
                    }
                    tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
                }
                tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
            }
            duration || _this3.duration(duration = tl.duration());
        } else _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
        if (overwrite === true && !$45c181d6c56df0f8$var$_suppressOverwrites) {
            $45c181d6c56df0f8$var$_overwritingTween = $45c181d6c56df0f8$var$_assertThisInitialized(_this3);
            $45c181d6c56df0f8$var$_globalTimeline.killTweensOf(parsedTargets);
            $45c181d6c56df0f8$var$_overwritingTween = 0;
        }
        $45c181d6c56df0f8$var$_addToTimeline(parent, $45c181d6c56df0f8$var$_assertThisInitialized(_this3), position);
        vars.reversed && _this3.reverse();
        vars.paused && _this3.paused(true);
        if (immediateRender || !duration && !keyframes && _this3._start === $45c181d6c56df0f8$var$_roundPrecise(parent._time) && $45c181d6c56df0f8$var$_isNotFalse(immediateRender) && $45c181d6c56df0f8$var$_hasNoPausedAncestors($45c181d6c56df0f8$var$_assertThisInitialized(_this3)) && parent.data !== "nested") {
            _this3._tTime = -$45c181d6c56df0f8$var$_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
            _this3.render(Math.max(0, -delay)); //in case delay is negative
        }
        scrollTrigger && $45c181d6c56df0f8$var$_scrollTrigger($45c181d6c56df0f8$var$_assertThisInitialized(_this3), scrollTrigger);
        return _this3;
    }
    var _proto3 = Tween.prototype;
    _proto3.render = function render(totalTime, suppressEvents, force) {
        var prevTime = this._time, tDur = this._tDur, dur = this._dur, tTime = totalTime > tDur - $45c181d6c56df0f8$var$_tinyNum && totalTime >= 0 ? tDur : totalTime < $45c181d6c56df0f8$var$_tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline, yoyoEase;
        if (!dur) $45c181d6c56df0f8$var$_renderZeroDurationTween(this, totalTime, suppressEvents, force);
        else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
            //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
            time = tTime;
            timeline = this.timeline;
            if (this._repeat) {
                //adjust the time for repeats and yoyos
                cycleDuration = dur + this._rDelay;
                if (this._repeat < -1 && totalTime < 0) return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
                time = $45c181d6c56df0f8$var$_roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
                if (tTime === tDur) {
                    // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
                    iteration = this._repeat;
                    time = dur;
                } else {
                    iteration = ~~(tTime / cycleDuration);
                    if (iteration && iteration === tTime / cycleDuration) {
                        time = dur;
                        iteration--;
                    }
                    time > dur && (time = dur);
                }
                isYoyo = this._yoyo && iteration & 1;
                if (isYoyo) {
                    yoyoEase = this._yEase;
                    time = dur - time;
                }
                prevIteration = $45c181d6c56df0f8$var$_animationCycle(this._tTime, cycleDuration);
                if (time === prevTime && !force && this._initted) //could be during the repeatDelay part. No need to render and fire callbacks.
                return this;
                if (iteration !== prevIteration) {
                    timeline && this._yEase && $45c181d6c56df0f8$var$_propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality
                    if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
                        this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.
                        this.render($45c181d6c56df0f8$var$_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
                    }
                }
            }
            if (!this._initted) {
                if ($45c181d6c56df0f8$var$_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
                    this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.
                    return this;
                }
                if (dur !== this._dur) // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
                return this.render(totalTime, suppressEvents, force);
            }
            this._tTime = tTime;
            this._time = time;
            if (!this._act && this._ts) {
                this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.
                this._lazy = 0;
            }
            this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
            if (this._from) this.ratio = ratio = 1 - ratio;
            if (time && !prevTime && !suppressEvents) {
                $45c181d6c56df0f8$var$_callback(this, "onStart");
                if (this._tTime !== tTime) // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
                return this;
            }
            pt = this._pt;
            while(pt){
                pt.r(ratio, pt.d);
                pt = pt._next;
            }
            timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -$45c181d6c56df0f8$var$_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);
            if (this._onUpdate && !suppressEvents) {
                totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
                $45c181d6c56df0f8$var$_callback(this, "onUpdate");
            }
            this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && $45c181d6c56df0f8$var$_callback(this, "onRepeat");
            if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
                totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
                (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && $45c181d6c56df0f8$var$_removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.
                if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
                    // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
                    $45c181d6c56df0f8$var$_callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
                    this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                }
            }
        }
        return this;
    };
    _proto3.targets = function targets() {
        return this._targets;
    };
    _proto3.invalidate = function invalidate() {
        this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
        this._ptLookup = [];
        this.timeline && this.timeline.invalidate();
        return _Animation2.prototype.invalidate.call(this);
    };
    _proto3.kill = function kill(targets, vars) {
        if (vars === void 0) vars = "all";
        if (!targets && (!vars || vars === "all")) {
            this._lazy = this._pt = 0;
            return this.parent ? $45c181d6c56df0f8$var$_interrupt(this) : this;
        }
        if (this.timeline) {
            var tDur = this.timeline.totalDuration();
            this.timeline.killTweensOf(targets, vars, $45c181d6c56df0f8$var$_overwritingTween && $45c181d6c56df0f8$var$_overwritingTween.vars.overwrite !== true)._first || $45c181d6c56df0f8$var$_interrupt(this); // if nothing is left tweening, interrupt.
            this.parent && tDur !== this.timeline.totalDuration() && $45c181d6c56df0f8$var$_setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.
            return this;
        }
        var parsedTargets = this._targets, killingTargets = targets ? $45c181d6c56df0f8$export$45b10814cc054894(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
        if ((!vars || vars === "all") && $45c181d6c56df0f8$var$_arraysMatch(parsedTargets, killingTargets)) {
            vars === "all" && (this._pt = 0);
            return $45c181d6c56df0f8$var$_interrupt(this);
        }
        overwrittenProps = this._op = this._op || [];
        if (vars !== "all") {
            //so people can pass in a comma-delimited list of property names
            if ($45c181d6c56df0f8$export$f664476fd67145ca(vars)) {
                p = {
                };
                $45c181d6c56df0f8$export$f9000b814859f126(vars, function(name) {
                    return p[name] = 1;
                });
                vars = p;
            }
            vars = $45c181d6c56df0f8$var$_addAliasesToVars(parsedTargets, vars);
        }
        i = parsedTargets.length;
        while(i--)if (~killingTargets.indexOf(parsedTargets[i])) {
            curLookup = propTweenLookup[i];
            if (vars === "all") {
                overwrittenProps[i] = vars;
                props = curLookup;
                curOverwriteProps = {
                };
            } else {
                curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {
                };
                props = vars;
            }
            for(p in props){
                pt = curLookup && curLookup[p];
                if (pt) {
                    if (!("kill" in pt.d) || pt.d.kill(p) === true) $45c181d6c56df0f8$export$cd008aa6cd8844e3(this, pt, "_pt");
                    delete curLookup[p];
                }
                if (curOverwriteProps !== "all") curOverwriteProps[p] = 1;
            }
        }
        this._initted && !this._pt && firstPT && $45c181d6c56df0f8$var$_interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
        return this;
    };
    Tween.to = function to(targets, vars) {
        return new Tween(targets, vars, arguments[2]);
    };
    Tween.from = function from(targets, vars) {
        return $45c181d6c56df0f8$var$_createTweenType(1, arguments);
    };
    Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
        return new Tween(callback, 0, {
            immediateRender: false,
            lazy: false,
            overwrite: false,
            delay: delay,
            onComplete: callback,
            onReverseComplete: callback,
            onCompleteParams: params,
            onReverseCompleteParams: params,
            callbackScope: scope
        });
    };
    Tween.fromTo = function fromTo(targets, fromVars, toVars) {
        return $45c181d6c56df0f8$var$_createTweenType(2, arguments);
    };
    Tween.set = function set(targets, vars) {
        vars.duration = 0;
        vars.repeatDelay || (vars.repeat = 0);
        return new Tween(targets, vars);
    };
    Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
        return $45c181d6c56df0f8$var$_globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween;
}($45c181d6c56df0f8$export$c35d437ae5945fcd);
$45c181d6c56df0f8$export$dc2b19673bb53610($45c181d6c56df0f8$export$208a41d6b4e37b97.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.
$45c181d6c56df0f8$export$f9000b814859f126("staggerTo,staggerFrom,staggerFromTo", function(name) {
    $45c181d6c56df0f8$export$208a41d6b4e37b97[name] = function() {
        var tl = new $45c181d6c56df0f8$export$e6a97ba2cae5bb94(), params = $45c181d6c56df0f8$var$_slice.call(arguments, 0);
        params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
        return tl[name].apply(tl, params);
    };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */ var $45c181d6c56df0f8$var$_setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
}, $45c181d6c56df0f8$var$_setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
}, $45c181d6c56df0f8$var$_setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
}, $45c181d6c56df0f8$var$_setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
}, $45c181d6c56df0f8$export$d60fbc1e0278aaf0 = function _getSetter(target, property) {
    return $45c181d6c56df0f8$var$_isFunction(target[property]) ? $45c181d6c56df0f8$var$_setterFunc : $45c181d6c56df0f8$export$a8178c063a9fd3a1(target[property]) && target.setAttribute ? $45c181d6c56df0f8$var$_setterAttribute : $45c181d6c56df0f8$var$_setterPlain;
}, $45c181d6c56df0f8$var$_renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
}, $45c181d6c56df0f8$var$_renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
}, $45c181d6c56df0f8$export$c5bc8e04394ecb2 = function _renderComplexString(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) //b = beginning string
    s = data.b;
    else if (ratio === 1 && data.e) //e = ending string
    s = data.e;
    else {
        while(pt){
            s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.
            pt = pt._next;
        }
        s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
    }
    data.set(data.t, data.p, s, data);
}, $45c181d6c56df0f8$var$_renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;
    while(pt){
        pt.r(ratio, pt.d);
        pt = pt._next;
    }
}, $45c181d6c56df0f8$var$_addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt, next;
    while(pt){
        next = pt._next;
        pt.p === property && pt.modifier(modifier, tween, target);
        pt = next;
    }
}, $45c181d6c56df0f8$var$_killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while(pt){
        next = pt._next;
        if (pt.p === property && !pt.op || pt.op === property) $45c181d6c56df0f8$export$cd008aa6cd8844e3(this, pt, "_pt");
        else if (!pt.dep) hasNonDependentRemaining = 1;
        pt = next;
    }
    return !hasNonDependentRemaining;
}, $45c181d6c56df0f8$var$_setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
}, $45c181d6c56df0f8$export$eed5824f53346d57 = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt, next, pt2, first, last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)
    while(pt){
        next = pt._next;
        pt2 = first;
        while(pt2 && pt2.pr > pt.pr)pt2 = pt2._next;
        if (pt._prev = pt2 ? pt2._prev : last) pt._prev._next = pt;
        else first = pt;
        if (pt._next = pt2) pt2._prev = pt;
        else last = pt;
        pt = next;
    }
    parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)
var $45c181d6c56df0f8$export$3a67f7f44b1e838a = /*#__PURE__*/ function() {
    function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
        this.t = target;
        this.s = start;
        this.c = change;
        this.p = prop;
        this.r = renderer || $45c181d6c56df0f8$var$_renderPlain;
        this.d = data || this;
        this.set = setter || $45c181d6c56df0f8$var$_setterPlain;
        this.pr = priority || 0;
        this._next = next;
        if (next) next._prev = this;
    }
    var _proto4 = PropTween.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
        this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)
        this.set = $45c181d6c56df0f8$var$_setterWithModifier;
        this.m = func;
        this.mt = target; //modifier target
        this.tween = tween;
    };
    return PropTween;
}(); //Initialization tasks
$45c181d6c56df0f8$export$f9000b814859f126($45c181d6c56df0f8$var$_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return $45c181d6c56df0f8$var$_reservedProps[name] = 1;
});
$45c181d6c56df0f8$var$_globals.TweenMax = $45c181d6c56df0f8$var$_globals.TweenLite = $45c181d6c56df0f8$export$208a41d6b4e37b97;
$45c181d6c56df0f8$var$_globals.TimelineLite = $45c181d6c56df0f8$var$_globals.TimelineMax = $45c181d6c56df0f8$export$e6a97ba2cae5bb94;
$45c181d6c56df0f8$var$_globalTimeline = new $45c181d6c56df0f8$export$e6a97ba2cae5bb94({
    sortChildren: false,
    defaults: $45c181d6c56df0f8$var$_defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
});
$45c181d6c56df0f8$export$4922bee768729a77.stringFilter = $45c181d6c56df0f8$export$7eb2e5eb5eeb96a4;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */ var $45c181d6c56df0f8$var$_gsap = {
    registerPlugin: function registerPlugin() {
        for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)args[_key2] = arguments[_key2];
        args.forEach(function(config) {
            return $45c181d6c56df0f8$var$_createPlugin(config);
        });
    },
    timeline: function timeline(vars) {
        return new $45c181d6c56df0f8$export$e6a97ba2cae5bb94(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
        return $45c181d6c56df0f8$var$_globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
        $45c181d6c56df0f8$export$f664476fd67145ca(target) && (target = $45c181d6c56df0f8$export$45b10814cc054894(target)[0]); //in case selector text or an array is passed in
        var getter = $45c181d6c56df0f8$export$8b9be379d2de2a39(target || {
        }).get, format = unit ? $45c181d6c56df0f8$var$_passThrough : $45c181d6c56df0f8$var$_numericIfPossible;
        unit === "native" && (unit = "");
        return !target ? target : !property ? function(property, unit, uncache) {
            return format(($45c181d6c56df0f8$export$d305d8ec5d7c26b8[property] && $45c181d6c56df0f8$export$d305d8ec5d7c26b8[property].get || getter)(target, property, unit, uncache));
        } : format(($45c181d6c56df0f8$export$d305d8ec5d7c26b8[property] && $45c181d6c56df0f8$export$d305d8ec5d7c26b8[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
        target = $45c181d6c56df0f8$export$45b10814cc054894(target);
        if (target.length > 1) {
            var setters = target.map(function(t) {
                return $45c181d6c56df0f8$export$99ee26438460406a.quickSetter(t, property, unit);
            }), l = setters.length;
            return function(value) {
                var i = l;
                while(i--)setters[i](value);
            };
        }
        target = target[0] || {
        };
        var Plugin = $45c181d6c56df0f8$export$d305d8ec5d7c26b8[property], cache = $45c181d6c56df0f8$export$8b9be379d2de2a39(target), p = cache.harness && (cache.harness.aliases || {
        })[property] || property, // in case it's an alias, like "rotate" for "rotation".
        setter = Plugin ? function(value) {
            var p = new Plugin();
            $45c181d6c56df0f8$var$_quickTween._pt = 0;
            p.init(target, unit ? value + unit : value, $45c181d6c56df0f8$var$_quickTween, 0, [
                target
            ]);
            p.render(1, p);
            $45c181d6c56df0f8$var$_quickTween._pt && $45c181d6c56df0f8$var$_renderPropTweens(1, $45c181d6c56df0f8$var$_quickTween);
        } : cache.set(target, p);
        return Plugin ? setter : function(value) {
            return setter(target, p, unit ? value + unit : value, cache, 1);
        };
    },
    isTweening: function isTweening(targets) {
        return $45c181d6c56df0f8$var$_globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
        value && value.ease && (value.ease = $45c181d6c56df0f8$var$_parseEase(value.ease, $45c181d6c56df0f8$var$_defaults.ease));
        return $45c181d6c56df0f8$var$_mergeDeep($45c181d6c56df0f8$var$_defaults, value || {
        });
    },
    config: function config(value) {
        return $45c181d6c56df0f8$var$_mergeDeep($45c181d6c56df0f8$export$4922bee768729a77, value || {
        });
    },
    registerEffect: function registerEffect(_ref3) {
        var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
        (plugins || "").split(",").forEach(function(pluginName) {
            return pluginName && !$45c181d6c56df0f8$export$d305d8ec5d7c26b8[pluginName] && !$45c181d6c56df0f8$var$_globals[pluginName] && $45c181d6c56df0f8$var$_warn(name + " effect requires " + pluginName + " plugin.");
        });
        $45c181d6c56df0f8$var$_effects[name] = function(targets, vars, tl) {
            return effect($45c181d6c56df0f8$export$45b10814cc054894(targets), $45c181d6c56df0f8$export$dc2b19673bb53610(vars || {
            }, defaults), tl);
        };
        if (extendTimeline) $45c181d6c56df0f8$export$e6a97ba2cae5bb94.prototype[name] = function(targets, vars, position) {
            return this.add($45c181d6c56df0f8$var$_effects[name](targets, $45c181d6c56df0f8$var$_isObject(vars) ? vars : (position = vars) && {
            }, this), position);
        };
    },
    registerEase: function registerEase(name, ease) {
        $45c181d6c56df0f8$var$_easeMap[name] = $45c181d6c56df0f8$var$_parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
        return arguments.length ? $45c181d6c56df0f8$var$_parseEase(ease, defaultEase) : $45c181d6c56df0f8$var$_easeMap;
    },
    getById: function getById(id) {
        return $45c181d6c56df0f8$var$_globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
        if (vars === void 0) vars = {
        };
        var tl = new $45c181d6c56df0f8$export$e6a97ba2cae5bb94(vars), child, next;
        tl.smoothChildTiming = $45c181d6c56df0f8$var$_isNotFalse(vars.smoothChildTiming);
        $45c181d6c56df0f8$var$_globalTimeline.remove(tl);
        tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).
        tl._time = tl._tTime = $45c181d6c56df0f8$var$_globalTimeline._time;
        child = $45c181d6c56df0f8$var$_globalTimeline._first;
        while(child){
            next = child._next;
            if (includeDelayedCalls || !(!child._dur && child instanceof $45c181d6c56df0f8$export$208a41d6b4e37b97 && child.vars.onComplete === child._targets[0])) $45c181d6c56df0f8$var$_addToTimeline(tl, child, child._start - child._delay);
            child = next;
        }
        $45c181d6c56df0f8$var$_addToTimeline($45c181d6c56df0f8$var$_globalTimeline, tl, 0);
        return tl;
    },
    utils: {
        wrap: $45c181d6c56df0f8$export$4997ffc0176396a6,
        wrapYoyo: $45c181d6c56df0f8$export$cfc0b067273edc55,
        distribute: $45c181d6c56df0f8$export$f02a9ddbe4480f19,
        random: $45c181d6c56df0f8$export$4385e60b38654f68,
        snap: $45c181d6c56df0f8$export$51a0620f7a28532b,
        normalize: $45c181d6c56df0f8$export$a3295358bff77e,
        getUnit: $45c181d6c56df0f8$export$65f2564e9a9b9222,
        clamp: $45c181d6c56df0f8$export$7d15b64cf5a3a4c4,
        splitColor: $45c181d6c56df0f8$export$73d6f35be992df24,
        toArray: $45c181d6c56df0f8$export$45b10814cc054894,
        selector: $45c181d6c56df0f8$export$aea217a45095ce11,
        mapRange: $45c181d6c56df0f8$export$f65a7599bbc6b121,
        pipe: $45c181d6c56df0f8$export$a4627e546088548d,
        unitize: $45c181d6c56df0f8$export$d7502930aa5492de,
        interpolate: $45c181d6c56df0f8$export$89e29e4ab65e70a9,
        shuffle: $45c181d6c56df0f8$export$448332262467e042
    },
    install: $45c181d6c56df0f8$var$_install,
    effects: $45c181d6c56df0f8$var$_effects,
    ticker: $45c181d6c56df0f8$export$762ed8fbedb691e3,
    updateRoot: $45c181d6c56df0f8$export$e6a97ba2cae5bb94.updateRoot,
    plugins: $45c181d6c56df0f8$export$d305d8ec5d7c26b8,
    globalTimeline: $45c181d6c56df0f8$var$_globalTimeline,
    core: {
        PropTween: $45c181d6c56df0f8$export$3a67f7f44b1e838a,
        globals: $45c181d6c56df0f8$var$_addGlobal,
        Tween: $45c181d6c56df0f8$export$208a41d6b4e37b97,
        Timeline: $45c181d6c56df0f8$export$e6a97ba2cae5bb94,
        Animation: $45c181d6c56df0f8$export$c35d437ae5945fcd,
        getCache: $45c181d6c56df0f8$export$8b9be379d2de2a39,
        _removeLinkedListItem: $45c181d6c56df0f8$export$cd008aa6cd8844e3,
        suppressOverwrites: function suppressOverwrites(value) {
            return $45c181d6c56df0f8$var$_suppressOverwrites = value;
        }
    }
};
$45c181d6c56df0f8$export$f9000b814859f126("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return $45c181d6c56df0f8$var$_gsap[name] = $45c181d6c56df0f8$export$208a41d6b4e37b97[name];
});
$45c181d6c56df0f8$export$762ed8fbedb691e3.add($45c181d6c56df0f8$export$e6a97ba2cae5bb94.updateRoot);
$45c181d6c56df0f8$var$_quickTween = $45c181d6c56df0f8$var$_gsap.to({
}, {
    duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------
var $45c181d6c56df0f8$var$_getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;
    while(pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop)pt = pt._next;
    return pt;
}, $45c181d6c56df0f8$var$_addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for(p in modifiers){
        i = targets.length;
        while(i--){
            pt = tween._ptLookup[i][p];
            if (pt && (pt = pt.d)) {
                if (pt._pt) // is a plugin
                pt = $45c181d6c56df0f8$var$_getPluginPropTween(pt, p);
                pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
            }
        }
    }
}, $45c181d6c56df0f8$var$_buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
        name: name,
        rawVars: 1,
        //don't pre-process function-based values or "random()" strings.
        init: function init(target, vars, tween) {
            tween._onInit = function(tween) {
                var temp, p;
                if ($45c181d6c56df0f8$export$f664476fd67145ca(vars)) {
                    temp = {
                    };
                    $45c181d6c56df0f8$export$f9000b814859f126(vars, function(name) {
                        return temp[name] = 1;
                    }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.
                    vars = temp;
                }
                if (modifier) {
                    temp = {
                    };
                    for(p in vars)temp[p] = modifier(vars[p]);
                    vars = temp;
                }
                $45c181d6c56df0f8$var$_addModifiers(tween, vars);
            };
        }
    };
}; //register core plugins
var $45c181d6c56df0f8$export$99ee26438460406a = $45c181d6c56df0f8$var$_gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
        var p, pt;
        for(p in vars){
            pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
            pt && (pt.op = p);
            this._props.push(p);
        }
    }
}, {
    name: "endArray",
    init: function init(target, value) {
        var i = value.length;
        while(i--)this.add(target, i, target[i] || 0, value[i]);
    }
}, $45c181d6c56df0f8$var$_buildModifierPlugin("roundProps", $45c181d6c56df0f8$export$dd12390e6b265a17), $45c181d6c56df0f8$var$_buildModifierPlugin("modifiers"), $45c181d6c56df0f8$var$_buildModifierPlugin("snap", $45c181d6c56df0f8$export$51a0620f7a28532b)) || $45c181d6c56df0f8$var$_gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.
$45c181d6c56df0f8$export$208a41d6b4e37b97.version = $45c181d6c56df0f8$export$e6a97ba2cae5bb94.version = $45c181d6c56df0f8$export$99ee26438460406a.version = "3.8.0";
$45c181d6c56df0f8$var$_coreReady = 1;
$45c181d6c56df0f8$var$_windowExists() && $45c181d6c56df0f8$var$_wake();
var $45c181d6c56df0f8$export$2fae1e8613537d5f = $45c181d6c56df0f8$var$_easeMap.Power0, $45c181d6c56df0f8$export$5d84ab4efbecec39 = $45c181d6c56df0f8$var$_easeMap.Power1, $45c181d6c56df0f8$export$d8c694b7490ad65d = $45c181d6c56df0f8$var$_easeMap.Power2, $45c181d6c56df0f8$export$acebdf2b184a0b6f = $45c181d6c56df0f8$var$_easeMap.Power3, $45c181d6c56df0f8$export$42e40a141003d2f0 = $45c181d6c56df0f8$var$_easeMap.Power4, $45c181d6c56df0f8$export$cff00ccf6e2392de = $45c181d6c56df0f8$var$_easeMap.Linear, $45c181d6c56df0f8$export$7005c9eb6671414d = $45c181d6c56df0f8$var$_easeMap.Quad, $45c181d6c56df0f8$export$755261d5a1567778 = $45c181d6c56df0f8$var$_easeMap.Cubic, $45c181d6c56df0f8$export$daf531446cad3d2a = $45c181d6c56df0f8$var$_easeMap.Quart, $45c181d6c56df0f8$export$4c407d38ce8ad8cc = $45c181d6c56df0f8$var$_easeMap.Quint, $45c181d6c56df0f8$export$f301627d437cff88 = $45c181d6c56df0f8$var$_easeMap.Strong, $45c181d6c56df0f8$export$56ebabebb04a9ca9 = $45c181d6c56df0f8$var$_easeMap.Elastic, $45c181d6c56df0f8$export$25e48ac541203d4a = $45c181d6c56df0f8$var$_easeMap.Back, $45c181d6c56df0f8$export$f7a11c7543d81853 = $45c181d6c56df0f8$var$_easeMap.SteppedEase, $45c181d6c56df0f8$export$d20e79fdc3899e95 = $45c181d6c56df0f8$var$_easeMap.Bounce, $45c181d6c56df0f8$export$bed2d20ad96b784c = $45c181d6c56df0f8$var$_easeMap.Sine, $45c181d6c56df0f8$export$41e9d1ff1a2fb15a = $45c181d6c56df0f8$var$_easeMap.Expo, $45c181d6c56df0f8$export$ce49a57dd865b86c = $45c181d6c56df0f8$var$_easeMap.Circ;



var $99c6849ea8f753a1$var$_win, $99c6849ea8f753a1$var$_doc, $99c6849ea8f753a1$var$_docElement, $99c6849ea8f753a1$var$_pluginInitted, $99c6849ea8f753a1$var$_tempDiv, $99c6849ea8f753a1$var$_tempDivStyler, $99c6849ea8f753a1$var$_recentSetterPlugin, $99c6849ea8f753a1$var$_windowExists = function _windowExists() {
    return typeof window !== "undefined";
}, $99c6849ea8f753a1$var$_transformProps = {
}, $99c6849ea8f753a1$var$_RAD2DEG = 180 / Math.PI, $99c6849ea8f753a1$var$_DEG2RAD = Math.PI / 180, $99c6849ea8f753a1$var$_atan2 = Math.atan2, $99c6849ea8f753a1$var$_bigNum = 100000000, $99c6849ea8f753a1$var$_capsExp = /([A-Z])/g, $99c6849ea8f753a1$var$_horizontalExp = /(?:left|right|width|margin|padding|x)/i, $99c6849ea8f753a1$var$_complexExp = /[\s,\(]\S/, $99c6849ea8f753a1$var$_propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
}, $99c6849ea8f753a1$var$_renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
}, $99c6849ea8f753a1$var$_renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
}, $99c6849ea8f753a1$var$_renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
}, //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
$99c6849ea8f753a1$var$_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
}, $99c6849ea8f753a1$var$_renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
}, $99c6849ea8f753a1$var$_renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
}, $99c6849ea8f753a1$var$_setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
}, $99c6849ea8f753a1$var$_setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
}, $99c6849ea8f753a1$var$_setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
}, $99c6849ea8f753a1$var$_setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
}, $99c6849ea8f753a1$var$_setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
}, $99c6849ea8f753a1$var$_setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
}, $99c6849ea8f753a1$var$_transformProp = "transform", $99c6849ea8f753a1$var$_transformOriginProp = $99c6849ea8f753a1$var$_transformProp + "Origin", $99c6849ea8f753a1$var$_supports3D, $99c6849ea8f753a1$export$a232bb0480ae674a = function _createElement(type, ns) {
    var e = $99c6849ea8f753a1$var$_doc.createElementNS ? $99c6849ea8f753a1$var$_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : $99c6849ea8f753a1$var$_doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.
    return e.style ? e : $99c6849ea8f753a1$var$_doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
}, $99c6849ea8f753a1$var$_getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace($99c6849ea8f753a1$var$_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, $99c6849ea8f753a1$export$8cbef5dd49a09c8b(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
}, $99c6849ea8f753a1$var$_prefixes = "O,Moz,ms,Ms,Webkit".split(","), $99c6849ea8f753a1$export$8cbef5dd49a09c8b = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || $99c6849ea8f753a1$var$_tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) return property;
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while((i--) && !($99c6849ea8f753a1$var$_prefixes[i] + property in s));
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? $99c6849ea8f753a1$var$_prefixes[i] : "") + property;
}, $99c6849ea8f753a1$var$_initCore = function _initCore() {
    if ($99c6849ea8f753a1$var$_windowExists() && window.document) {
        $99c6849ea8f753a1$var$_win = window;
        $99c6849ea8f753a1$var$_doc = $99c6849ea8f753a1$var$_win.document;
        $99c6849ea8f753a1$var$_docElement = $99c6849ea8f753a1$var$_doc.documentElement;
        $99c6849ea8f753a1$var$_tempDiv = $99c6849ea8f753a1$export$a232bb0480ae674a("div") || {
            style: {
            }
        };
        $99c6849ea8f753a1$var$_tempDivStyler = $99c6849ea8f753a1$export$a232bb0480ae674a("div");
        $99c6849ea8f753a1$var$_transformProp = $99c6849ea8f753a1$export$8cbef5dd49a09c8b($99c6849ea8f753a1$var$_transformProp);
        $99c6849ea8f753a1$var$_transformOriginProp = $99c6849ea8f753a1$var$_transformProp + "Origin";
        $99c6849ea8f753a1$var$_tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.
        $99c6849ea8f753a1$var$_supports3D = !!$99c6849ea8f753a1$export$8cbef5dd49a09c8b("perspective");
        $99c6849ea8f753a1$var$_pluginInitted = 1;
    }
}, $99c6849ea8f753a1$var$_getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = $99c6849ea8f753a1$export$a232bb0480ae674a("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
    $99c6849ea8f753a1$var$_docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox; //store the original
        this.getBBox = _getBBoxHack;
    } catch (e) {
    }
    else if (this._gsapBBox) bbox = this._gsapBBox();
    if (oldParent) {
        if (oldSibling) oldParent.insertBefore(this, oldSibling);
        else oldParent.appendChild(this);
    }
    $99c6849ea8f753a1$var$_docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
}, $99c6849ea8f753a1$var$_getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;
    while(i--){
        if (target.hasAttribute(attributesArray[i])) return target.getAttribute(attributesArray[i]);
    }
}, $99c6849ea8f753a1$export$41bc7c2d1e04f11b = function _getBBox(target) {
    var bounds;
    try {
        bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
        bounds = $99c6849ea8f753a1$var$_getBBoxHack.call(target, true);
    }
    bounds && (bounds.width || bounds.height) || target.getBBox === $99c6849ea8f753a1$var$_getBBoxHack || (bounds = $99c6849ea8f753a1$var$_getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
        x: +$99c6849ea8f753a1$var$_getAttributeFallbacks(target, [
            "x",
            "cx",
            "x1"
        ]) || 0,
        y: +$99c6849ea8f753a1$var$_getAttributeFallbacks(target, [
            "y",
            "cy",
            "y1"
        ]) || 0,
        width: 0,
        height: 0
    } : bounds;
}, $99c6849ea8f753a1$var$_isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && $99c6849ea8f753a1$export$41bc7c2d1e04f11b(e));
}, //reports if the element is an SVG on which getBBox() actually works
$99c6849ea8f753a1$var$_removeProperty = function _removeProperty(target, property) {
    if (property) {
        var style = target.style;
        if (property in $99c6849ea8f753a1$var$_transformProps && property !== $99c6849ea8f753a1$var$_transformOriginProp) property = $99c6849ea8f753a1$var$_transformProp;
        if (style.removeProperty) {
            if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
            property = "-" + property;
            style.removeProperty(property.replace($99c6849ea8f753a1$var$_capsExp, "-$1").toLowerCase());
        } else //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        style.removeAttribute(property);
    }
}, $99c6849ea8f753a1$var$_addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(plugin._pt, target, property, 0, 1, onlySetAtEnd ? $99c6849ea8f753a1$var$_renderNonTweeningValueOnlyAtEnd : $99c6849ea8f753a1$var$_renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
}, $99c6849ea8f753a1$var$_nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
}, //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
$99c6849ea8f753a1$var$_convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
    style = $99c6849ea8f753a1$var$_tempDiv.style, horizontal = $99c6849ea8f753a1$var$_horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
    if (unit === curUnit || !curValue || $99c6849ea8f753a1$var$_nonConvertibleUnits[unit] || $99c6849ea8f753a1$var$_nonConvertibleUnits[curUnit]) return curValue;
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && $99c6849ea8f753a1$var$_isSVG(target);
    if ((toPercent || curUnit === "%") && ($99c6849ea8f753a1$var$_transformProps[property] || ~property.indexOf("adius"))) {
        px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
        return $45c181d6c56df0f8$export$9c8d725d65e13f94(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) parent = (target.ownerSVGElement || {
    }).parentNode;
    if (!parent || parent === $99c6849ea8f753a1$var$_doc || !parent.appendChild) parent = $99c6849ea8f753a1$var$_doc.body;
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === $45c181d6c56df0f8$export$762ed8fbedb691e3.time) return $45c181d6c56df0f8$export$9c8d725d65e13f94(curValue / cache.width * amount);
    else {
        (toPercent || curUnit === "%") && (style.position = $99c6849ea8f753a1$var$_getComputedProperty(target, "position"));
        parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.
        parent.appendChild($99c6849ea8f753a1$var$_tempDiv);
        px = $99c6849ea8f753a1$var$_tempDiv[measureProperty];
        parent.removeChild($99c6849ea8f753a1$var$_tempDiv);
        style.position = "absolute";
        if (horizontal && toPercent) {
            cache = $45c181d6c56df0f8$export$8b9be379d2de2a39(parent);
            cache.time = $45c181d6c56df0f8$export$762ed8fbedb691e3.time;
            cache.width = parent[measureProperty];
        }
    }
    return $45c181d6c56df0f8$export$9c8d725d65e13f94(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
}, $99c6849ea8f753a1$var$_get = function _get(target, property, unit, uncache) {
    var value;
    $99c6849ea8f753a1$var$_pluginInitted || $99c6849ea8f753a1$var$_initCore();
    if (property in $99c6849ea8f753a1$var$_propertyAliases && property !== "transform") {
        property = $99c6849ea8f753a1$var$_propertyAliases[property];
        if (~property.indexOf(",")) property = property.split(",")[0];
    }
    if ($99c6849ea8f753a1$var$_transformProps[property] && property !== "transform") {
        value = $99c6849ea8f753a1$var$_parseTransform(target, uncache);
        value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : $99c6849ea8f753a1$var$_firstTwoOnly($99c6849ea8f753a1$var$_getComputedProperty(target, $99c6849ea8f753a1$var$_transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
        value = target.style[property];
        if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) value = $99c6849ea8f753a1$var$_specialProps[property] && $99c6849ea8f753a1$var$_specialProps[property](target, property, unit) || $99c6849ea8f753a1$var$_getComputedProperty(target, property) || $45c181d6c56df0f8$export$51d6bbe898aef1f9(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
    return unit && !~(value + "").trim().indexOf(" ") ? $99c6849ea8f753a1$var$_convertToUnit(target, property, value, unit) + unit : value;
}, $99c6849ea8f753a1$var$_tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    if (!start || start === "none") {
        // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
        var p = $99c6849ea8f753a1$export$8cbef5dd49a09c8b(prop, target, 1), s = p && $99c6849ea8f753a1$var$_getComputedProperty(target, p, 1);
        if (s && s !== start) {
            prop = p;
            start = s;
        } else if (prop === "borderColor") start = $99c6849ea8f753a1$var$_getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
    var pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(this._pt, target.style, prop, 0, 1, $45c181d6c56df0f8$export$c5bc8e04394ecb2), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, relative, endValues;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings
    end += "";
    if (end === "auto") {
        target.style[prop] = end;
        end = $99c6849ea8f753a1$var$_getComputedProperty(target, prop) || end;
        target.style[prop] = start;
    }
    a = [
        start,
        end
    ];
    $45c181d6c56df0f8$export$7eb2e5eb5eeb96a4(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().
    start = a[0];
    end = a[1];
    startValues = start.match($45c181d6c56df0f8$export$65c88bbd597e7b0a) || [];
    endValues = end.match($45c181d6c56df0f8$export$65c88bbd597e7b0a) || [];
    if (endValues.length) {
        while(result = $45c181d6c56df0f8$export$65c88bbd597e7b0a.exec(end)){
            endValue = result[0];
            chunk = end.substring(index, result.index);
            if (color) color = (color + 1) % 5;
            else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") color = 1;
            if (endValue !== (startValue = startValues[matchIndex++] || "")) {
                startNum = parseFloat(startValue) || 0;
                startUnit = startValue.substr((startNum + "").length);
                relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
                if (relative) endValue = endValue.substr(2);
                endNum = parseFloat(endValue);
                endUnit = endValue.substr((endNum + "").length);
                index = $45c181d6c56df0f8$export$65c88bbd597e7b0a.lastIndex - endUnit.length;
                if (!endUnit) {
                    //if something like "perspective:300" is passed in and we must add a unit to the end
                    endUnit = endUnit || $45c181d6c56df0f8$export$4922bee768729a77.units[prop] || startUnit;
                    if (index === end.length) {
                        end += endUnit;
                        pt.e += endUnit;
                    }
                }
                if (startUnit !== endUnit) startNum = $99c6849ea8f753a1$var$_convertToUnit(target, prop, startValue, endUnit) || 0;
                 //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.
                pt._pt = {
                    _next: pt._pt,
                    p: chunk || matchIndex === 1 ? chunk : ",",
                    //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
                    s: startNum,
                    c: relative ? relative * endNum : endNum - startNum,
                    m: color && color < 4 || prop === "zIndex" ? Math.round : 0
                };
            }
        }
        pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    } else pt.r = prop === "display" && end === "none" ? $99c6849ea8f753a1$var$_renderNonTweeningValueOnlyAtEnd : $99c6849ea8f753a1$var$_renderNonTweeningValue;
    $45c181d6c56df0f8$export$5a680e28b0b61bc.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.
    return pt;
}, $99c6849ea8f753a1$var$_keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
}, $99c6849ea8f753a1$var$_convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "), x = split[0], y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
        //the user provided them in the wrong order, so flip them
        value = x;
        x = y;
        y = value;
    }
    split[0] = $99c6849ea8f753a1$var$_keywordToPercent[x] || x;
    split[1] = $99c6849ea8f753a1$var$_keywordToPercent[y] || y;
    return split.join(" ");
}, $99c6849ea8f753a1$var$_renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
        var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
        if (props === "all" || props === true) {
            style.cssText = "";
            clearTransforms = 1;
        } else {
            props = props.split(",");
            i = props.length;
            while(--i > -1){
                prop = props[i];
                if ($99c6849ea8f753a1$var$_transformProps[prop]) {
                    clearTransforms = 1;
                    prop = prop === "transformOrigin" ? $99c6849ea8f753a1$var$_transformOriginProp : $99c6849ea8f753a1$var$_transformProp;
                }
                $99c6849ea8f753a1$var$_removeProperty(target, prop);
            }
        }
        if (clearTransforms) {
            $99c6849ea8f753a1$var$_removeProperty(target, $99c6849ea8f753a1$var$_transformProp);
            if (cache) {
                cache.svg && target.removeAttribute("transform");
                $99c6849ea8f753a1$var$_parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.
                cache.uncache = 1;
            }
        }
    }
}, // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
$99c6849ea8f753a1$var$_specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
        if (tween.data !== "isFromStart") {
            var pt = plugin._pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(plugin._pt, target, property, 0, 0, $99c6849ea8f753a1$var$_renderClearProps);
            pt.u = endValue;
            pt.pr = -10;
            pt.tween = tween;
            plugin._props.push(property);
            return 1;
        }
    }
}, /*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */ $99c6849ea8f753a1$var$_identity2DMatrix = [
    1,
    0,
    0,
    1,
    0,
    0
], $99c6849ea8f753a1$var$_rotationalProperties = {
}, $99c6849ea8f753a1$var$_isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
}, $99c6849ea8f753a1$var$_getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = $99c6849ea8f753a1$var$_getComputedProperty(target, $99c6849ea8f753a1$var$_transformProp);
    return $99c6849ea8f753a1$var$_isNullTransform(matrixString) ? $99c6849ea8f753a1$var$_identity2DMatrix : matrixString.substr(7).match($45c181d6c56df0f8$export$b9d44bb6523120d6).map($45c181d6c56df0f8$export$9c8d725d65e13f94);
}, $99c6849ea8f753a1$var$_getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || $45c181d6c56df0f8$export$8b9be379d2de2a39(target), style = target.style, matrix = $99c6849ea8f753a1$var$_getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
        temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.
        matrix = [
            temp.a,
            temp.b,
            temp.c,
            temp.d,
            temp.e,
            temp.f
        ];
        return matrix.join(",") === "1,0,0,1,0,0" ? $99c6849ea8f753a1$var$_identity2DMatrix : matrix;
    } else if (matrix === $99c6849ea8f753a1$var$_identity2DMatrix && !target.offsetParent && target !== $99c6849ea8f753a1$var$_docElement && !cache.svg) {
        //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
        //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
        temp = style.display;
        style.display = "block";
        parent = target.parentNode;
        if (!parent || !target.offsetParent) {
            // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
            addedToDOM = 1; //flag
            nextSibling = target.nextSibling;
            $99c6849ea8f753a1$var$_docElement.appendChild(target); //we must add it to the DOM in order to get values properly
        }
        matrix = $99c6849ea8f753a1$var$_getComputedTransformMatrixAsArray(target);
        temp ? style.display = temp : $99c6849ea8f753a1$var$_removeProperty(target, "display");
        if (addedToDOM) nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : $99c6849ea8f753a1$var$_docElement.removeChild(target);
    }
    return force2D && matrix.length > 6 ? [
        matrix[0],
        matrix[1],
        matrix[4],
        matrix[5],
        matrix[12],
        matrix[13]
    ] : matrix;
}, $99c6849ea8f753a1$var$_applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap, matrix = matrixArray || $99c6849ea8f753a1$var$_getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
        bounds = $99c6849ea8f753a1$export$41bc7c2d1e04f11b(target);
        xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
        yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== $99c6849ea8f753a1$var$_identity2DMatrix && (determinant = a * d - b * c)) {
        //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
        xOrigin = x;
        yOrigin = y;
    }
    if (smooth || smooth !== false && cache.smooth) {
        tx = xOrigin - xOriginOld;
        ty = yOrigin - yOriginOld;
        cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
        cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else cache.xOffset = cache.yOffset = 0;
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[$99c6849ea8f753a1$var$_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).
    if (pluginToAddPropTweensTo) {
        $99c6849ea8f753a1$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
        $99c6849ea8f753a1$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
        $99c6849ea8f753a1$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
        $99c6849ea8f753a1$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
}, $99c6849ea8f753a1$var$_parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new $45c181d6c56df0f8$export$cf10981d5419cad5(target);
    if ("x" in cache && !uncache && !cache.uncache) return cache;
    var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", origin = $99c6849ea8f753a1$var$_getComputedProperty(target, $99c6849ea8f753a1$var$_transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && $99c6849ea8f753a1$var$_isSVG(target));
    matrix = $99c6849ea8f753a1$var$_getMatrix(target, cache.svg);
    if (cache.svg) {
        t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin"); // if origin is 0,0 and cache.uncache is true, let the recorded data-svg-origin stay. Otherwise, whenever we set cache.uncache to true, we'd need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
        $99c6849ea8f753a1$var$_applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== $99c6849ea8f753a1$var$_identity2DMatrix) {
        a = matrix[0]; //a11
        b = matrix[1]; //a21
        c = matrix[2]; //a31
        d = matrix[3]; //a41
        x = a12 = matrix[4];
        y = a22 = matrix[5]; //2D matrix
        if (matrix.length === 6) {
            scaleX = Math.sqrt(a * a + b * b);
            scaleY = Math.sqrt(d * d + c * c);
            rotation = a || b ? $99c6849ea8f753a1$var$_atan2(b, a) * $99c6849ea8f753a1$var$_RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
            skewX = c || d ? $99c6849ea8f753a1$var$_atan2(c, d) * $99c6849ea8f753a1$var$_RAD2DEG + rotation : 0;
            skewX && (scaleY *= Math.abs(Math.cos(skewX * $99c6849ea8f753a1$var$_DEG2RAD)));
            if (cache.svg) {
                x -= xOrigin - (xOrigin * a + yOrigin * c);
                y -= yOrigin - (xOrigin * b + yOrigin * d);
            } //3D matrix
        } else {
            a32 = matrix[6];
            a42 = matrix[7];
            a13 = matrix[8];
            a23 = matrix[9];
            a33 = matrix[10];
            a43 = matrix[11];
            x = matrix[12];
            y = matrix[13];
            z = matrix[14];
            angle = $99c6849ea8f753a1$var$_atan2(a32, a33);
            rotationX = angle * $99c6849ea8f753a1$var$_RAD2DEG; //rotationX
            if (angle) {
                cos = Math.cos(-angle);
                sin = Math.sin(-angle);
                t1 = a12 * cos + a13 * sin;
                t2 = a22 * cos + a23 * sin;
                t3 = a32 * cos + a33 * sin;
                a13 = a12 * -sin + a13 * cos;
                a23 = a22 * -sin + a23 * cos;
                a33 = a32 * -sin + a33 * cos;
                a43 = a42 * -sin + a43 * cos;
                a12 = t1;
                a22 = t2;
                a32 = t3;
            } //rotationY
            angle = $99c6849ea8f753a1$var$_atan2(-c, a33);
            rotationY = angle * $99c6849ea8f753a1$var$_RAD2DEG;
            if (angle) {
                cos = Math.cos(-angle);
                sin = Math.sin(-angle);
                t1 = a * cos - a13 * sin;
                t2 = b * cos - a23 * sin;
                t3 = c * cos - a33 * sin;
                a43 = d * sin + a43 * cos;
                a = t1;
                b = t2;
                c = t3;
            } //rotationZ
            angle = $99c6849ea8f753a1$var$_atan2(b, a);
            rotation = angle * $99c6849ea8f753a1$var$_RAD2DEG;
            if (angle) {
                cos = Math.cos(angle);
                sin = Math.sin(angle);
                t1 = a * cos + b * sin;
                t2 = a12 * cos + a22 * sin;
                b = b * cos - a * sin;
                a22 = a22 * cos - a12 * sin;
                a = t1;
                a12 = t2;
            }
            if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
                //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
                rotationX = rotation = 0;
                rotationY = 180 - rotationY;
            }
            scaleX = $45c181d6c56df0f8$export$9c8d725d65e13f94(Math.sqrt(a * a + b * b + c * c));
            scaleY = $45c181d6c56df0f8$export$9c8d725d65e13f94(Math.sqrt(a22 * a22 + a32 * a32));
            angle = $99c6849ea8f753a1$var$_atan2(a12, a22);
            skewX = Math.abs(angle) > 0.0002 ? angle * $99c6849ea8f753a1$var$_RAD2DEG : 0;
            perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
        }
        if (cache.svg) {
            //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
            t1 = target.getAttribute("transform");
            cache.forceCSS = target.setAttribute("transform", "") || !$99c6849ea8f753a1$var$_isNullTransform($99c6849ea8f753a1$var$_getComputedProperty(target, $99c6849ea8f753a1$var$_transformProp));
            t1 && target.setAttribute("transform", t1);
        }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
        if (invertedScaleX) {
            scaleX *= -1;
            skewX += rotation <= 0 ? 180 : -180;
            rotation += rotation <= 0 ? 180 : -180;
        } else {
            scaleY *= -1;
            skewX += skewX <= 0 ? 180 : -180;
        }
    }
    cache.x = x - ((cache.xPercent = x && (cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = $45c181d6c56df0f8$export$9c8d725d65e13f94(scaleX);
    cache.scaleY = $45c181d6c56df0f8$export$9c8d725d65e13f94(scaleY);
    cache.rotation = $45c181d6c56df0f8$export$9c8d725d65e13f94(rotation) + deg;
    cache.rotationX = $45c181d6c56df0f8$export$9c8d725d65e13f94(rotationX) + deg;
    cache.rotationY = $45c181d6c56df0f8$export$9c8d725d65e13f94(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) style[$99c6849ea8f753a1$var$_transformOriginProp] = $99c6849ea8f753a1$var$_firstTwoOnly(origin);
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = $45c181d6c56df0f8$export$4922bee768729a77.force3D;
    cache.renderTransform = cache.svg ? $99c6849ea8f753a1$var$_renderSVGTransforms : $99c6849ea8f753a1$var$_supports3D ? $99c6849ea8f753a1$var$_renderCSSTransforms : $99c6849ea8f753a1$var$_renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
}, $99c6849ea8f753a1$var$_firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
}, //for handling transformOrigin values, stripping out the 3rd dimension
$99c6849ea8f753a1$var$_addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = $45c181d6c56df0f8$export$65f2564e9a9b9222(start);
    return $45c181d6c56df0f8$export$9c8d725d65e13f94(parseFloat(start) + parseFloat($99c6849ea8f753a1$var$_convertToUnit(target, "x", value + "px", unit))) + unit;
}, $99c6849ea8f753a1$var$_renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    $99c6849ea8f753a1$var$_renderCSSTransforms(ratio, cache);
}, $99c6849ea8f753a1$var$_zeroDeg = "0deg", $99c6849ea8f753a1$var$_zeroPx = "0px", $99c6849ea8f753a1$var$_endParenthesis = ") ", $99c6849ea8f753a1$var$_renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)
    if (zOrigin && (rotationX !== $99c6849ea8f753a1$var$_zeroDeg || rotationY !== $99c6849ea8f753a1$var$_zeroDeg)) {
        var angle = parseFloat(rotationY) * $99c6849ea8f753a1$var$_DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
        angle = parseFloat(rotationX) * $99c6849ea8f753a1$var$_DEG2RAD;
        cos = Math.cos(angle);
        x = $99c6849ea8f753a1$var$_addPxTranslate(target, x, a13 * cos * -zOrigin);
        y = $99c6849ea8f753a1$var$_addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
        z = $99c6849ea8f753a1$var$_addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== $99c6849ea8f753a1$var$_zeroPx) transforms += "perspective(" + transformPerspective + $99c6849ea8f753a1$var$_endParenthesis;
    if (xPercent || yPercent) transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    if (use3D || x !== $99c6849ea8f753a1$var$_zeroPx || y !== $99c6849ea8f753a1$var$_zeroPx || z !== $99c6849ea8f753a1$var$_zeroPx) transforms += z !== $99c6849ea8f753a1$var$_zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + $99c6849ea8f753a1$var$_endParenthesis;
    if (rotation !== $99c6849ea8f753a1$var$_zeroDeg) transforms += "rotate(" + rotation + $99c6849ea8f753a1$var$_endParenthesis;
    if (rotationY !== $99c6849ea8f753a1$var$_zeroDeg) transforms += "rotateY(" + rotationY + $99c6849ea8f753a1$var$_endParenthesis;
    if (rotationX !== $99c6849ea8f753a1$var$_zeroDeg) transforms += "rotateX(" + rotationX + $99c6849ea8f753a1$var$_endParenthesis;
    if (skewX !== $99c6849ea8f753a1$var$_zeroDeg || skewY !== $99c6849ea8f753a1$var$_zeroDeg) transforms += "skew(" + skewX + ", " + skewY + $99c6849ea8f753a1$var$_endParenthesis;
    if (scaleX !== 1 || scaleY !== 1) transforms += "scale(" + scaleX + ", " + scaleY + $99c6849ea8f753a1$var$_endParenthesis;
    target.style[$99c6849ea8f753a1$var$_transformProp] = transforms || "translate(0, 0)";
}, $99c6849ea8f753a1$var$_renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
        //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
        skewY = parseFloat(skewY);
        skewX += skewY;
        rotation += skewY;
    }
    if (rotation || skewX) {
        rotation *= $99c6849ea8f753a1$var$_DEG2RAD;
        skewX *= $99c6849ea8f753a1$var$_DEG2RAD;
        a11 = Math.cos(rotation) * scaleX;
        a21 = Math.sin(rotation) * scaleX;
        a12 = Math.sin(rotation - skewX) * -scaleY;
        a22 = Math.cos(rotation - skewX) * scaleY;
        if (skewX) {
            skewY *= $99c6849ea8f753a1$var$_DEG2RAD;
            temp = Math.tan(skewX - skewY);
            temp = Math.sqrt(1 + temp * temp);
            a12 *= temp;
            a22 *= temp;
            if (skewY) {
                temp = Math.tan(skewY);
                temp = Math.sqrt(1 + temp * temp);
                a11 *= temp;
                a21 *= temp;
            }
        }
        a11 = $45c181d6c56df0f8$export$9c8d725d65e13f94(a11);
        a21 = $45c181d6c56df0f8$export$9c8d725d65e13f94(a21);
        a12 = $45c181d6c56df0f8$export$9c8d725d65e13f94(a12);
        a22 = $45c181d6c56df0f8$export$9c8d725d65e13f94(a22);
    } else {
        a11 = scaleX;
        a22 = scaleY;
        a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
        tx = $99c6849ea8f753a1$var$_convertToUnit(target, "x", x, "px");
        ty = $99c6849ea8f753a1$var$_convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
        tx = $45c181d6c56df0f8$export$9c8d725d65e13f94(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
        ty = $45c181d6c56df0f8$export$9c8d725d65e13f94(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
        //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
        temp = target.getBBox();
        tx = $45c181d6c56df0f8$export$9c8d725d65e13f94(tx + xPercent / 100 * temp.width);
        ty = $45c181d6c56df0f8$export$9c8d725d65e13f94(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[$99c6849ea8f753a1$var$_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
}, $99c6849ea8f753a1$var$_addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
    var cap = 360, isString = $45c181d6c56df0f8$export$f664476fd67145ca(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? $99c6849ea8f753a1$var$_RAD2DEG : 1), change = relative ? endNum * relative : endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString) {
        direction = endValue.split("_")[1];
        if (direction === "short") {
            change %= cap;
            if (change !== change % (cap / 2)) change += change < 0 ? cap : -cap;
        }
        if (direction === "cw" && change < 0) change = (change + cap * $99c6849ea8f753a1$var$_bigNum) % cap - ~~(change / cap) * cap;
        else if (direction === "ccw" && change > 0) change = (change - cap * $99c6849ea8f753a1$var$_bigNum) % cap - ~~(change / cap) * cap;
    }
    plugin._pt = pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(plugin._pt, target, property, startNum, change, $99c6849ea8f753a1$var$_renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
}, $99c6849ea8f753a1$var$_assign = function _assign(target, source) {
    // Internet Explorer doesn't have Object.assign(), so we recreate it here.
    for(var p in source)target[p] = source[p];
    return target;
}, $99c6849ea8f753a1$var$_addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
    var startCache = $99c6849ea8f753a1$var$_assign({
    }, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
        startValue = target.getAttribute("transform");
        target.setAttribute("transform", "");
        style[$99c6849ea8f753a1$var$_transformProp] = transforms;
        endCache = $99c6849ea8f753a1$var$_parseTransform(target, 1);
        $99c6849ea8f753a1$var$_removeProperty(target, $99c6849ea8f753a1$var$_transformProp);
        target.setAttribute("transform", startValue);
    } else {
        startValue = getComputedStyle(target)[$99c6849ea8f753a1$var$_transformProp];
        style[$99c6849ea8f753a1$var$_transformProp] = transforms;
        endCache = $99c6849ea8f753a1$var$_parseTransform(target, 1);
        style[$99c6849ea8f753a1$var$_transformProp] = startValue;
    }
    for(p in $99c6849ea8f753a1$var$_transformProps){
        startValue = startCache[p];
        endValue = endCache[p];
        if (startValue !== endValue && exclude.indexOf(p) < 0) {
            //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
            startUnit = $45c181d6c56df0f8$export$65f2564e9a9b9222(startValue);
            endUnit = $45c181d6c56df0f8$export$65f2564e9a9b9222(endValue);
            startNum = startUnit !== endUnit ? $99c6849ea8f753a1$var$_convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
            endNum = parseFloat(endValue);
            plugin._pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(plugin._pt, endCache, p, startNum, endNum - startNum, $99c6849ea8f753a1$var$_renderCSSProp);
            plugin._pt.u = endUnit || 0;
            plugin._props.push(p);
        }
    }
    $99c6849ea8f753a1$var$_assign(endCache, startCache);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.
$45c181d6c56df0f8$export$f9000b814859f126("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [
        t,
        r,
        b,
        l
    ] : [
        t + l,
        t + r,
        b + r,
        b + l
    ]).map(function(side) {
        return index < 2 ? name + side : "border" + side + name;
    });
    $99c6849ea8f753a1$var$_specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
        var a, vars;
        if (arguments.length < 4) {
            // getter, passed target, property, and unit (from _get())
            a = props.map(function(prop) {
                return $99c6849ea8f753a1$var$_get(plugin, prop, property);
            });
            vars = a.join(" ");
            return vars.split(a[0]).length === 5 ? a[0] : vars;
        }
        a = (endValue + "").split(" ");
        vars = {
        };
        props.forEach(function(prop, i) {
            return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
        });
        plugin.init(target, vars, tween);
    };
});
var $99c6849ea8f753a1$export$855822f522f18eef = {
    name: "css",
    register: $99c6849ea8f753a1$var$_initCore,
    targetTest: function targetTest(target) {
        return target.style && target.nodeType;
    },
    init: function init(target, vars, tween, index, targets) {
        var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority;
        $99c6849ea8f753a1$var$_pluginInitted || $99c6849ea8f753a1$var$_initCore();
        for(p in vars){
            if (p === "autoRound") continue;
            endValue = vars[p];
            if ($45c181d6c56df0f8$export$d305d8ec5d7c26b8[p] && $45c181d6c56df0f8$export$5c457b74208010cf(p, vars, tween, index, target, targets)) continue;
            type = typeof endValue;
            specialProp = $99c6849ea8f753a1$var$_specialProps[p];
            if (type === "function") {
                endValue = endValue.call(tween, index, target, targets);
                type = typeof endValue;
            }
            if (type === "string" && ~endValue.indexOf("random(")) endValue = $45c181d6c56df0f8$export$d5962a97e3cde94d(endValue);
            if (specialProp) specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
            else if (p.substr(0, 2) === "--") {
                //CSS variable
                startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
                endValue += "";
                $45c181d6c56df0f8$export$dd733e62515be2bd.lastIndex = 0;
                if (!$45c181d6c56df0f8$export$dd733e62515be2bd.test(startValue)) {
                    // colors don't have units
                    startUnit = $45c181d6c56df0f8$export$65f2564e9a9b9222(startValue);
                    endUnit = $45c181d6c56df0f8$export$65f2564e9a9b9222(endValue);
                }
                endUnit ? startUnit !== endUnit && (startValue = $99c6849ea8f753a1$var$_convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
                this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
                props.push(p);
            } else if (type !== "undefined") {
                if (startAt && p in startAt) {
                    // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
                    startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
                    p in $45c181d6c56df0f8$export$4922bee768729a77.units && !$45c181d6c56df0f8$export$65f2564e9a9b9222(startValue) && (startValue += $45c181d6c56df0f8$export$4922bee768729a77.units[p]); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.
                    $45c181d6c56df0f8$export$f664476fd67145ca(startValue) && ~startValue.indexOf("random(") && (startValue = $45c181d6c56df0f8$export$d5962a97e3cde94d(startValue));
                    (startValue + "").charAt(1) === "=" && (startValue = $99c6849ea8f753a1$var$_get(target, p)); // can't work with relative values
                } else startValue = $99c6849ea8f753a1$var$_get(target, p);
                startNum = parseFloat(startValue);
                relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
                relative && (endValue = endValue.substr(2));
                endNum = parseFloat(endValue);
                if (p in $99c6849ea8f753a1$var$_propertyAliases) {
                    if (p === "autoAlpha") {
                        //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
                        if (startNum === 1 && $99c6849ea8f753a1$var$_get(target, "visibility") === "hidden" && endNum) //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
                        startNum = 0;
                        $99c6849ea8f753a1$var$_addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
                    }
                    if (p !== "scale" && p !== "transform") {
                        p = $99c6849ea8f753a1$var$_propertyAliases[p];
                        ~p.indexOf(",") && (p = p.split(",")[0]);
                    }
                }
                isTransformRelated = p in $99c6849ea8f753a1$var$_transformProps; //--- TRANSFORM-RELATED ---
                if (isTransformRelated) {
                    if (!transformPropTween) {
                        cache = target._gsap;
                        cache.renderTransform && !vars.parseTransform || $99c6849ea8f753a1$var$_parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.
                        smooth = vars.smoothOrigin !== false && cache.smooth;
                        transformPropTween = this._pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(this._pt, style, $99c6849ea8f753a1$var$_transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)
                        transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
                    }
                    if (p === "scale") {
                        this._pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(this._pt, cache, "scaleY", cache.scaleY, (relative ? relative * endNum : endNum - cache.scaleY) || 0);
                        props.push("scaleY", p);
                        p += "X";
                    } else if (p === "transformOrigin") {
                        endValue = $99c6849ea8f753a1$var$_convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.
                        if (cache.svg) $99c6849ea8f753a1$var$_applySVGOrigin(target, endValue, 0, smooth, 0, this);
                        else {
                            endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!
                            endUnit !== cache.zOrigin && $99c6849ea8f753a1$var$_addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                            $99c6849ea8f753a1$var$_addNonTweeningPT(this, style, p, $99c6849ea8f753a1$var$_firstTwoOnly(startValue), $99c6849ea8f753a1$var$_firstTwoOnly(endValue));
                        }
                        continue;
                    } else if (p === "svgOrigin") {
                        $99c6849ea8f753a1$var$_applySVGOrigin(target, endValue, 1, smooth, 0, this);
                        continue;
                    } else if (p in $99c6849ea8f753a1$var$_rotationalProperties) {
                        $99c6849ea8f753a1$var$_addRotationalPropTween(this, cache, p, startNum, endValue, relative);
                        continue;
                    } else if (p === "smoothOrigin") {
                        $99c6849ea8f753a1$var$_addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
                        continue;
                    } else if (p === "force3D") {
                        cache[p] = endValue;
                        continue;
                    } else if (p === "transform") {
                        $99c6849ea8f753a1$var$_addRawTransformPTs(this, endValue, target);
                        continue;
                    }
                } else if (!(p in style)) p = $99c6849ea8f753a1$export$8cbef5dd49a09c8b(p) || p;
                if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !$99c6849ea8f753a1$var$_complexExp.test(endValue) && p in style) {
                    startUnit = (startValue + "").substr((startNum + "").length);
                    endNum || (endNum = 0); // protect against NaN
                    endUnit = $45c181d6c56df0f8$export$65f2564e9a9b9222(endValue) || (p in $45c181d6c56df0f8$export$4922bee768729a77.units ? $45c181d6c56df0f8$export$4922bee768729a77.units[p] : startUnit);
                    startUnit !== endUnit && (startNum = $99c6849ea8f753a1$var$_convertToUnit(target, p, startValue, endUnit));
                    this._pt = new $45c181d6c56df0f8$export$3a67f7f44b1e838a(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? $99c6849ea8f753a1$var$_renderRoundedCSSProp : $99c6849ea8f753a1$var$_renderCSSProp);
                    this._pt.u = endUnit || 0;
                    if (startUnit !== endUnit && endUnit !== "%") {
                        //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
                        this._pt.b = startValue;
                        this._pt.r = $99c6849ea8f753a1$var$_renderCSSPropWithBeginning;
                    }
                } else if (!(p in style)) {
                    if (p in target) //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
                    this.add(target, p, startValue || target[p], endValue, index, targets);
                    else {
                        $45c181d6c56df0f8$export$7fb54635790b59a5(p, endValue);
                        continue;
                    }
                } else $99c6849ea8f753a1$var$_tweenComplexCSSString.call(this, target, p, startValue, endValue);
                props.push(p);
            }
        }
        hasPriority && $45c181d6c56df0f8$export$eed5824f53346d57(this);
    },
    get: $99c6849ea8f753a1$var$_get,
    aliases: $99c6849ea8f753a1$var$_propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
        //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
        var p = $99c6849ea8f753a1$var$_propertyAliases[property];
        p && p.indexOf(",") < 0 && (property = p);
        return property in $99c6849ea8f753a1$var$_transformProps && property !== $99c6849ea8f753a1$var$_transformOriginProp && (target._gsap.x || $99c6849ea8f753a1$var$_get(target, "x")) ? plugin && $99c6849ea8f753a1$var$_recentSetterPlugin === plugin ? property === "scale" ? $99c6849ea8f753a1$var$_setterScale : $99c6849ea8f753a1$var$_setterTransform : ($99c6849ea8f753a1$var$_recentSetterPlugin = plugin || {
        }, property === "scale" ? $99c6849ea8f753a1$var$_setterScaleWithRender : $99c6849ea8f753a1$var$_setterTransformWithRender) : target.style && !$45c181d6c56df0f8$export$a8178c063a9fd3a1(target.style[property]) ? $99c6849ea8f753a1$var$_setterCSSStyle : ~property.indexOf("-") ? $99c6849ea8f753a1$var$_setterCSSProp : $45c181d6c56df0f8$export$d60fbc1e0278aaf0(target, property);
    },
    core: {
        _removeProperty: $99c6849ea8f753a1$var$_removeProperty,
        _getMatrix: $99c6849ea8f753a1$var$_getMatrix
    }
};
$45c181d6c56df0f8$export$99ee26438460406a.utils.checkPrefix = $99c6849ea8f753a1$export$8cbef5dd49a09c8b;
(function(positionAndScale, rotation, others, aliases) {
    var all = $45c181d6c56df0f8$export$f9000b814859f126(positionAndScale + "," + rotation + "," + others, function(name) {
        $99c6849ea8f753a1$var$_transformProps[name] = 1;
    });
    $45c181d6c56df0f8$export$f9000b814859f126(rotation, function(name) {
        $45c181d6c56df0f8$export$4922bee768729a77.units[name] = "deg";
        $99c6849ea8f753a1$var$_rotationalProperties[name] = 1;
    });
    $99c6849ea8f753a1$var$_propertyAliases[all[13]] = positionAndScale + "," + rotation;
    $45c181d6c56df0f8$export$f9000b814859f126(aliases, function(name) {
        var split = name.split(":");
        $99c6849ea8f753a1$var$_propertyAliases[split[1]] = all[split[0]];
    });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
$45c181d6c56df0f8$export$f9000b814859f126("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    $45c181d6c56df0f8$export$4922bee768729a77.units[name] = "px";
});
$45c181d6c56df0f8$export$99ee26438460406a.registerPlugin($99c6849ea8f753a1$export$855822f522f18eef);


var $18bcf7a3a9291657$export$99ee26438460406a = $45c181d6c56df0f8$export$99ee26438460406a.registerPlugin($99c6849ea8f753a1$export$855822f522f18eef) || $45c181d6c56df0f8$export$99ee26438460406a, // to protect from tree shaking
$18bcf7a3a9291657$export$7b23975ad686bf91 = $18bcf7a3a9291657$export$99ee26438460406a.core.Tween;


class $5969f5e284a35ac8$var$Fade extends $75c38b07c38e3c07$export$2e2bcd8739ae039.Transition {
    out({ from: from , to: to , done: done  }) {
        new $18bcf7a3a9291657$export$99ee26438460406a.timeline({
            onComplete: done
        }).to(from, 0.5, {
            opacity: 0
        });
        done();
    }
    in({ from: from , to: to , done: done  }) {
        from.remove();
        console.log('eie');
        new $18bcf7a3a9291657$export$99ee26438460406a.timeline({
            onComplete: done
        }).fromTo(to, 0.5, {
            opacity: 0
        }, {
            opacity: 1
        });
    }
}
var $5969f5e284a35ac8$export$2e2bcd8739ae039 = $5969f5e284a35ac8$var$Fade;


/*!
 * perfect-scrollbar v1.5.2
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */ function $84b75b20bc1c0b9f$var$get(element) {
    return getComputedStyle(element);
}
function $84b75b20bc1c0b9f$var$set(element, obj) {
    for(var key in obj){
        var val = obj[key];
        if (typeof val === 'number') val = val + "px";
        element.style[key] = val;
    }
    return element;
}
function $84b75b20bc1c0b9f$var$div(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}
var $84b75b20bc1c0b9f$var$elMatches = typeof Element !== 'undefined' && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function $84b75b20bc1c0b9f$var$matches(element, query) {
    if (!$84b75b20bc1c0b9f$var$elMatches) throw new Error('No element matching method supported');
    return $84b75b20bc1c0b9f$var$elMatches.call(element, query);
}
function $84b75b20bc1c0b9f$var$remove(element) {
    if (element.remove) element.remove();
    else if (element.parentNode) element.parentNode.removeChild(element);
}
function $84b75b20bc1c0b9f$var$queryChildren(element, selector) {
    return Array.prototype.filter.call(element.children, function(child) {
        return $84b75b20bc1c0b9f$var$matches(child, selector);
    });
}
var $84b75b20bc1c0b9f$var$cls = {
    main: 'ps',
    rtl: 'ps__rtl',
    element: {
        thumb: function(x) {
            return "ps__thumb-" + x;
        },
        rail: function(x) {
            return "ps__rail-" + x;
        },
        consuming: 'ps__child--consume'
    },
    state: {
        focus: 'ps--focus',
        clicking: 'ps--clicking',
        active: function(x) {
            return "ps--active-" + x;
        },
        scrolling: function(x) {
            return "ps--scrolling-" + x;
        }
    }
};
/*
 * Helper methods
 */ var $84b75b20bc1c0b9f$var$scrollingClassTimeout = {
    x: null,
    y: null
};
function $84b75b20bc1c0b9f$var$addScrollingClass(i, x) {
    var classList = i.element.classList;
    var className = $84b75b20bc1c0b9f$var$cls.state.scrolling(x);
    if (classList.contains(className)) clearTimeout($84b75b20bc1c0b9f$var$scrollingClassTimeout[x]);
    else classList.add(className);
}
function $84b75b20bc1c0b9f$var$removeScrollingClass(i, x) {
    $84b75b20bc1c0b9f$var$scrollingClassTimeout[x] = setTimeout(function() {
        return i.isAlive && i.element.classList.remove($84b75b20bc1c0b9f$var$cls.state.scrolling(x));
    }, i.settings.scrollingThreshold);
}
function $84b75b20bc1c0b9f$var$setScrollingClassInstantly(i, x) {
    $84b75b20bc1c0b9f$var$addScrollingClass(i, x);
    $84b75b20bc1c0b9f$var$removeScrollingClass(i, x);
}
var $84b75b20bc1c0b9f$var$EventElement = function EventElement(element) {
    this.element = element;
    this.handlers = {
    };
};
var $84b75b20bc1c0b9f$var$prototypeAccessors = {
    isEmpty: {
        configurable: true
    }
};
$84b75b20bc1c0b9f$var$EventElement.prototype.bind = function bind(eventName, handler) {
    if (typeof this.handlers[eventName] === 'undefined') this.handlers[eventName] = [];
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
};
$84b75b20bc1c0b9f$var$EventElement.prototype.unbind = function unbind(eventName, target) {
    var this$1 = this;
    this.handlers[eventName] = this.handlers[eventName].filter(function(handler) {
        if (target && handler !== target) return true;
        this$1.element.removeEventListener(eventName, handler, false);
        return false;
    });
};
$84b75b20bc1c0b9f$var$EventElement.prototype.unbindAll = function unbindAll() {
    for(var name in this.handlers)this.unbind(name);
};
$84b75b20bc1c0b9f$var$prototypeAccessors.isEmpty.get = function() {
    var this$1 = this;
    return Object.keys(this.handlers).every(function(key) {
        return this$1.handlers[key].length === 0;
    });
};
Object.defineProperties($84b75b20bc1c0b9f$var$EventElement.prototype, $84b75b20bc1c0b9f$var$prototypeAccessors);
var $84b75b20bc1c0b9f$var$EventManager = function EventManager() {
    this.eventElements = [];
};
$84b75b20bc1c0b9f$var$EventManager.prototype.eventElement = function eventElement(element) {
    var ee = this.eventElements.filter(function(ee) {
        return ee.element === element;
    })[0];
    if (!ee) {
        ee = new $84b75b20bc1c0b9f$var$EventElement(element);
        this.eventElements.push(ee);
    }
    return ee;
};
$84b75b20bc1c0b9f$var$EventManager.prototype.bind = function bind(element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
};
$84b75b20bc1c0b9f$var$EventManager.prototype.unbind = function unbind(element, eventName, handler) {
    var ee = this.eventElement(element);
    ee.unbind(eventName, handler);
    if (ee.isEmpty) // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
};
$84b75b20bc1c0b9f$var$EventManager.prototype.unbindAll = function unbindAll() {
    this.eventElements.forEach(function(e) {
        return e.unbindAll();
    });
    this.eventElements = [];
};
$84b75b20bc1c0b9f$var$EventManager.prototype.once = function once(element, eventName, handler) {
    var ee = this.eventElement(element);
    var onceHandler = function(evt) {
        ee.unbind(eventName, onceHandler);
        handler(evt);
    };
    ee.bind(eventName, onceHandler);
};
function $84b75b20bc1c0b9f$var$createEvent(name) {
    if (typeof window.CustomEvent === 'function') return new CustomEvent(name);
    else {
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(name, false, false, undefined);
        return evt;
    }
}
function $84b75b20bc1c0b9f$var$processScrollDiff(i, axis, diff, useScrollingClass, forceFireReachEvent) {
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;
    var fields;
    if (axis === 'top') fields = [
        'contentHeight',
        'containerHeight',
        'scrollTop',
        'y',
        'up',
        'down'
    ];
    else if (axis === 'left') fields = [
        'contentWidth',
        'containerWidth',
        'scrollLeft',
        'x',
        'left',
        'right'
    ];
    else throw new Error('A proper axis should be provided');
    $84b75b20bc1c0b9f$var$processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
}
function $84b75b20bc1c0b9f$var$processScrollDiff$1(i, diff, ref, useScrollingClass, forceFireReachEvent) {
    var contentHeight = ref[0];
    var containerHeight = ref[1];
    var scrollTop = ref[2];
    var y = ref[3];
    var up = ref[4];
    var down = ref[5];
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;
    var element = i.element;
    // reset reach
    i.reach[y] = null;
    // 1 for subpixel rounding
    if (element[scrollTop] < 1) i.reach[y] = 'start';
    // 1 for subpixel rounding
    if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) i.reach[y] = 'end';
    if (diff) {
        element.dispatchEvent($84b75b20bc1c0b9f$var$createEvent("ps-scroll-" + y));
        if (diff < 0) element.dispatchEvent($84b75b20bc1c0b9f$var$createEvent("ps-scroll-" + up));
        else if (diff > 0) element.dispatchEvent($84b75b20bc1c0b9f$var$createEvent("ps-scroll-" + down));
        if (useScrollingClass) $84b75b20bc1c0b9f$var$setScrollingClassInstantly(i, y);
    }
    if (i.reach[y] && (diff || forceFireReachEvent)) element.dispatchEvent($84b75b20bc1c0b9f$var$createEvent("ps-" + y + "-reach-" + i.reach[y]));
}
function $84b75b20bc1c0b9f$var$toInt(x) {
    return parseInt(x, 10) || 0;
}
function $84b75b20bc1c0b9f$var$isEditable(el) {
    return $84b75b20bc1c0b9f$var$matches(el, 'input,[contenteditable]') || $84b75b20bc1c0b9f$var$matches(el, 'select,[contenteditable]') || $84b75b20bc1c0b9f$var$matches(el, 'textarea,[contenteditable]') || $84b75b20bc1c0b9f$var$matches(el, 'button,[contenteditable]');
}
function $84b75b20bc1c0b9f$var$outerWidth(element) {
    var styles = $84b75b20bc1c0b9f$var$get(element);
    return $84b75b20bc1c0b9f$var$toInt(styles.width) + $84b75b20bc1c0b9f$var$toInt(styles.paddingLeft) + $84b75b20bc1c0b9f$var$toInt(styles.paddingRight) + $84b75b20bc1c0b9f$var$toInt(styles.borderLeftWidth) + $84b75b20bc1c0b9f$var$toInt(styles.borderRightWidth);
}
var $84b75b20bc1c0b9f$var$env = {
    isWebKit: typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style,
    supportsTouch: typeof window !== 'undefined' && ('ontouchstart' in window || 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
    supportsIePointer: typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
    isChrome: typeof navigator !== 'undefined' && /Chrome/i.test(navigator && navigator.userAgent)
};
function $84b75b20bc1c0b9f$var$updateGeometry(i) {
    var element = i.element;
    var roundedScrollTop = Math.floor(element.scrollTop);
    var rect = element.getBoundingClientRect();
    i.containerWidth = Math.round(rect.width);
    i.containerHeight = Math.round(rect.height);
    i.contentWidth = element.scrollWidth;
    i.contentHeight = element.scrollHeight;
    if (!element.contains(i.scrollbarXRail)) {
        // clean up and append
        $84b75b20bc1c0b9f$var$queryChildren(element, $84b75b20bc1c0b9f$var$cls.element.rail('x')).forEach(function(el) {
            return $84b75b20bc1c0b9f$var$remove(el);
        });
        element.appendChild(i.scrollbarXRail);
    }
    if (!element.contains(i.scrollbarYRail)) {
        // clean up and append
        $84b75b20bc1c0b9f$var$queryChildren(element, $84b75b20bc1c0b9f$var$cls.element.rail('y')).forEach(function(el) {
            return $84b75b20bc1c0b9f$var$remove(el);
        });
        element.appendChild(i.scrollbarYRail);
    }
    if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
        i.scrollbarXActive = true;
        i.railXWidth = i.containerWidth - i.railXMarginWidth;
        i.railXRatio = i.containerWidth / i.railXWidth;
        i.scrollbarXWidth = $84b75b20bc1c0b9f$var$getThumbSize(i, $84b75b20bc1c0b9f$var$toInt(i.railXWidth * i.containerWidth / i.contentWidth));
        i.scrollbarXLeft = $84b75b20bc1c0b9f$var$toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
    } else i.scrollbarXActive = false;
    if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
        i.scrollbarYActive = true;
        i.railYHeight = i.containerHeight - i.railYMarginHeight;
        i.railYRatio = i.containerHeight / i.railYHeight;
        i.scrollbarYHeight = $84b75b20bc1c0b9f$var$getThumbSize(i, $84b75b20bc1c0b9f$var$toInt(i.railYHeight * i.containerHeight / i.contentHeight));
        i.scrollbarYTop = $84b75b20bc1c0b9f$var$toInt(roundedScrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
    } else i.scrollbarYActive = false;
    if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
    if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
    $84b75b20bc1c0b9f$var$updateCss(element, i);
    if (i.scrollbarXActive) element.classList.add($84b75b20bc1c0b9f$var$cls.state.active('x'));
    else {
        element.classList.remove($84b75b20bc1c0b9f$var$cls.state.active('x'));
        i.scrollbarXWidth = 0;
        i.scrollbarXLeft = 0;
        element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
    }
    if (i.scrollbarYActive) element.classList.add($84b75b20bc1c0b9f$var$cls.state.active('y'));
    else {
        element.classList.remove($84b75b20bc1c0b9f$var$cls.state.active('y'));
        i.scrollbarYHeight = 0;
        i.scrollbarYTop = 0;
        element.scrollTop = 0;
    }
}
function $84b75b20bc1c0b9f$var$getThumbSize(i, thumbSize) {
    if (i.settings.minScrollbarLength) thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
    if (i.settings.maxScrollbarLength) thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
    return thumbSize;
}
function $84b75b20bc1c0b9f$var$updateCss(element, i) {
    var xRailOffset = {
        width: i.railXWidth
    };
    var roundedScrollTop = Math.floor(element.scrollTop);
    if (i.isRtl) xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
    else xRailOffset.left = element.scrollLeft;
    if (i.isScrollbarXUsingBottom) xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
    else xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
    $84b75b20bc1c0b9f$var$set(i.scrollbarXRail, xRailOffset);
    var yRailOffset = {
        top: roundedScrollTop,
        height: i.railYHeight
    };
    if (i.isScrollbarYUsingRight) {
        if (i.isRtl) yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth - 9;
        else yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    } else if (i.isRtl) yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    else yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    $84b75b20bc1c0b9f$var$set(i.scrollbarYRail, yRailOffset);
    $84b75b20bc1c0b9f$var$set(i.scrollbarX, {
        left: i.scrollbarXLeft,
        width: i.scrollbarXWidth - i.railBorderXWidth
    });
    $84b75b20bc1c0b9f$var$set(i.scrollbarY, {
        top: i.scrollbarYTop,
        height: i.scrollbarYHeight - i.railBorderYWidth
    });
}
function $84b75b20bc1c0b9f$var$clickRail(i) {
    var element = i.element;
    i.event.bind(i.scrollbarY, 'mousedown', function(e) {
        return e.stopPropagation();
    });
    i.event.bind(i.scrollbarYRail, 'mousedown', function(e) {
        var positionTop = e.pageY - window.pageYOffset - i.scrollbarYRail.getBoundingClientRect().top;
        var direction = positionTop > i.scrollbarYTop ? 1 : -1;
        i.element.scrollTop += direction * i.containerHeight;
        $84b75b20bc1c0b9f$var$updateGeometry(i);
        e.stopPropagation();
    });
    i.event.bind(i.scrollbarX, 'mousedown', function(e) {
        return e.stopPropagation();
    });
    i.event.bind(i.scrollbarXRail, 'mousedown', function(e) {
        var positionLeft = e.pageX - window.pageXOffset - i.scrollbarXRail.getBoundingClientRect().left;
        var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;
        i.element.scrollLeft += direction * i.containerWidth;
        $84b75b20bc1c0b9f$var$updateGeometry(i);
        e.stopPropagation();
    });
}
function $84b75b20bc1c0b9f$var$dragThumb(i) {
    $84b75b20bc1c0b9f$var$bindMouseScrollHandler(i, [
        'containerWidth',
        'contentWidth',
        'pageX',
        'railXWidth',
        'scrollbarX',
        'scrollbarXWidth',
        'scrollLeft',
        'x',
        'scrollbarXRail'
    ]);
    $84b75b20bc1c0b9f$var$bindMouseScrollHandler(i, [
        'containerHeight',
        'contentHeight',
        'pageY',
        'railYHeight',
        'scrollbarY',
        'scrollbarYHeight',
        'scrollTop',
        'y',
        'scrollbarYRail'
    ]);
}
function $84b75b20bc1c0b9f$var$bindMouseScrollHandler(i, ref) {
    var containerHeight = ref[0];
    var contentHeight = ref[1];
    var pageY = ref[2];
    var railYHeight = ref[3];
    var scrollbarY = ref[4];
    var scrollbarYHeight = ref[5];
    var scrollTop = ref[6];
    var y = ref[7];
    var scrollbarYRail = ref[8];
    var element = i.element;
    var startingScrollTop = null;
    var startingMousePageY = null;
    var scrollBy = null;
    function mouseMoveHandler(e) {
        if (e.touches && e.touches[0]) e[pageY] = e.touches[0].pageY;
        element[scrollTop] = startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
        $84b75b20bc1c0b9f$var$addScrollingClass(i, y);
        $84b75b20bc1c0b9f$var$updateGeometry(i);
        e.stopPropagation();
        e.preventDefault();
    }
    function mouseUpHandler() {
        $84b75b20bc1c0b9f$var$removeScrollingClass(i, y);
        i[scrollbarYRail].classList.remove($84b75b20bc1c0b9f$var$cls.state.clicking);
        i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }
    function bindMoves(e, touchMode) {
        startingScrollTop = element[scrollTop];
        if (touchMode && e.touches) e[pageY] = e.touches[0].pageY;
        startingMousePageY = e[pageY];
        scrollBy = (i[contentHeight] - i[containerHeight]) / (i[railYHeight] - i[scrollbarYHeight]);
        if (!touchMode) {
            i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
            i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
            e.preventDefault();
        } else i.event.bind(i.ownerDocument, 'touchmove', mouseMoveHandler);
        i[scrollbarYRail].classList.add($84b75b20bc1c0b9f$var$cls.state.clicking);
        e.stopPropagation();
    }
    i.event.bind(i[scrollbarY], 'mousedown', function(e) {
        bindMoves(e);
    });
    i.event.bind(i[scrollbarY], 'touchstart', function(e) {
        bindMoves(e, true);
    });
}
function $84b75b20bc1c0b9f$var$keyboard(i) {
    var element = i.element;
    var elementHovered = function() {
        return $84b75b20bc1c0b9f$var$matches(element, ':hover');
    };
    var scrollbarFocused = function() {
        return $84b75b20bc1c0b9f$var$matches(i.scrollbarX, ':focus') || $84b75b20bc1c0b9f$var$matches(i.scrollbarY, ':focus');
    };
    function shouldPreventDefault(deltaX, deltaY) {
        var scrollTop = Math.floor(element.scrollTop);
        if (deltaX === 0) {
            if (!i.scrollbarYActive) return false;
            if (scrollTop === 0 && deltaY > 0 || scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0) return !i.settings.wheelPropagation;
        }
        var scrollLeft = element.scrollLeft;
        if (deltaY === 0) {
            if (!i.scrollbarXActive) return false;
            if (scrollLeft === 0 && deltaX < 0 || scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0) return !i.settings.wheelPropagation;
        }
        return true;
    }
    i.event.bind(i.ownerDocument, 'keydown', function(e) {
        if (e.isDefaultPrevented && e.isDefaultPrevented() || e.defaultPrevented) return;
        if (!elementHovered() && !scrollbarFocused()) return;
        var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
        if (activeElement) {
            if (activeElement.tagName === 'IFRAME') activeElement = activeElement.contentDocument.activeElement;
            else // go deeper if element is a webcomponent
            while(activeElement.shadowRoot)activeElement = activeElement.shadowRoot.activeElement;
            if ($84b75b20bc1c0b9f$var$isEditable(activeElement)) return;
        }
        var deltaX = 0;
        var deltaY = 0;
        switch(e.which){
            case 37:
                if (e.metaKey) deltaX = -i.contentWidth;
                else if (e.altKey) deltaX = -i.containerWidth;
                else deltaX = -30;
                break;
            case 38:
                if (e.metaKey) deltaY = i.contentHeight;
                else if (e.altKey) deltaY = i.containerHeight;
                else deltaY = 30;
                break;
            case 39:
                if (e.metaKey) deltaX = i.contentWidth;
                else if (e.altKey) deltaX = i.containerWidth;
                else deltaX = 30;
                break;
            case 40:
                if (e.metaKey) deltaY = -i.contentHeight;
                else if (e.altKey) deltaY = -i.containerHeight;
                else deltaY = -30;
                break;
            case 32:
                if (e.shiftKey) deltaY = i.containerHeight;
                else deltaY = -i.containerHeight;
                break;
            case 33:
                deltaY = i.containerHeight;
                break;
            case 34:
                deltaY = -i.containerHeight;
                break;
            case 36:
                deltaY = i.contentHeight;
                break;
            case 35:
                deltaY = -i.contentHeight;
                break;
            default:
                return;
        }
        if (i.settings.suppressScrollX && deltaX !== 0) return;
        if (i.settings.suppressScrollY && deltaY !== 0) return;
        element.scrollTop -= deltaY;
        element.scrollLeft += deltaX;
        $84b75b20bc1c0b9f$var$updateGeometry(i);
        if (shouldPreventDefault(deltaX, deltaY)) e.preventDefault();
    });
}
function $84b75b20bc1c0b9f$var$wheel(i) {
    var element = i.element;
    function shouldPreventDefault(deltaX, deltaY) {
        var roundedScrollTop = Math.floor(element.scrollTop);
        var isTop = element.scrollTop === 0;
        var isBottom = roundedScrollTop + element.offsetHeight === element.scrollHeight;
        var isLeft = element.scrollLeft === 0;
        var isRight = element.scrollLeft + element.offsetWidth === element.scrollWidth;
        var hitsBound;
        // pick axis with primary direction
        if (Math.abs(deltaY) > Math.abs(deltaX)) hitsBound = isTop || isBottom;
        else hitsBound = isLeft || isRight;
        return hitsBound ? !i.settings.wheelPropagation : true;
    }
    function getDeltaFromEvent(e) {
        var deltaX = e.deltaX;
        var deltaY = -1 * e.deltaY;
        if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
            // OS X Safari
            deltaX = -1 * e.wheelDeltaX / 6;
            deltaY = e.wheelDeltaY / 6;
        }
        if (e.deltaMode && e.deltaMode === 1) {
            // Firefox in deltaMode 1: Line scrolling
            deltaX *= 10;
            deltaY *= 10;
        }
        if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */ ) {
            // IE in some mouse drivers
            deltaX = 0;
            deltaY = e.wheelDelta;
        }
        if (e.shiftKey) // reverse axis with shift key
        return [
            -deltaY,
            -deltaX
        ];
        return [
            deltaX,
            deltaY
        ];
    }
    function shouldBeConsumedByChild(target, deltaX, deltaY) {
        // FIXME: this is a workaround for <select> issue in FF and IE #571
        if (!$84b75b20bc1c0b9f$var$env.isWebKit && element.querySelector('select:focus')) return true;
        if (!element.contains(target)) return false;
        var cursor = target;
        while(cursor && cursor !== element){
            if (cursor.classList.contains($84b75b20bc1c0b9f$var$cls.element.consuming)) return true;
            var style = $84b75b20bc1c0b9f$var$get(cursor);
            // if deltaY && vertical scrollable
            if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
                var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
                if (maxScrollTop > 0) {
                    if (cursor.scrollTop > 0 && deltaY < 0 || cursor.scrollTop < maxScrollTop && deltaY > 0) return true;
                }
            }
            // if deltaX && horizontal scrollable
            if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
                var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
                if (maxScrollLeft > 0) {
                    if (cursor.scrollLeft > 0 && deltaX < 0 || cursor.scrollLeft < maxScrollLeft && deltaX > 0) return true;
                }
            }
            cursor = cursor.parentNode;
        }
        return false;
    }
    function mousewheelHandler(e) {
        var ref = getDeltaFromEvent(e);
        var deltaX = ref[0];
        var deltaY = ref[1];
        if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) return;
        var shouldPrevent = false;
        if (!i.settings.useBothWheelAxes) {
            // deltaX will only be used for horizontal scrolling and deltaY will
            // only be used for vertical scrolling - this is the default
            element.scrollTop -= deltaY * i.settings.wheelSpeed;
            element.scrollLeft += deltaX * i.settings.wheelSpeed;
        } else if (i.scrollbarYActive && !i.scrollbarXActive) {
            // only vertical scrollbar is active and useBothWheelAxes option is
            // active, so let's scroll vertical bar using both mouse wheel axes
            if (deltaY) element.scrollTop -= deltaY * i.settings.wheelSpeed;
            else element.scrollTop += deltaX * i.settings.wheelSpeed;
            shouldPrevent = true;
        } else if (i.scrollbarXActive && !i.scrollbarYActive) {
            // useBothWheelAxes and only horizontal bar is active, so use both
            // wheel axes for horizontal bar
            if (deltaX) element.scrollLeft += deltaX * i.settings.wheelSpeed;
            else element.scrollLeft -= deltaY * i.settings.wheelSpeed;
            shouldPrevent = true;
        }
        $84b75b20bc1c0b9f$var$updateGeometry(i);
        shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
        if (shouldPrevent && !e.ctrlKey) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    if (typeof window.onwheel !== 'undefined') i.event.bind(element, 'wheel', mousewheelHandler);
    else if (typeof window.onmousewheel !== 'undefined') i.event.bind(element, 'mousewheel', mousewheelHandler);
}
function $84b75b20bc1c0b9f$var$touch(i) {
    if (!$84b75b20bc1c0b9f$var$env.supportsTouch && !$84b75b20bc1c0b9f$var$env.supportsIePointer) return;
    var element = i.element;
    function shouldPrevent(deltaX, deltaY) {
        var scrollTop = Math.floor(element.scrollTop);
        var scrollLeft = element.scrollLeft;
        var magnitudeX = Math.abs(deltaX);
        var magnitudeY = Math.abs(deltaY);
        if (magnitudeY > magnitudeX) {
            // user is perhaps trying to swipe up/down the page
            if (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight || deltaY > 0 && scrollTop === 0) // set prevent for mobile Chrome refresh
            return window.scrollY === 0 && deltaY > 0 && $84b75b20bc1c0b9f$var$env.isChrome;
        } else if (magnitudeX > magnitudeY) {
            // user is perhaps trying to swipe left/right across the page
            if (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth || deltaX > 0 && scrollLeft === 0) return true;
        }
        return true;
    }
    function applyTouchMove(differenceX, differenceY) {
        element.scrollTop -= differenceY;
        element.scrollLeft -= differenceX;
        $84b75b20bc1c0b9f$var$updateGeometry(i);
    }
    var startOffset = {
    };
    var startTime = 0;
    var speed = {
    };
    var easingLoop = null;
    function getTouch(e) {
        if (e.targetTouches) return e.targetTouches[0];
        else // Maybe IE pointer
        return e;
    }
    function shouldHandle(e) {
        if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) return false;
        if (e.targetTouches && e.targetTouches.length === 1) return true;
        if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) return true;
        return false;
    }
    function touchStart(e) {
        if (!shouldHandle(e)) return;
        var touch = getTouch(e);
        startOffset.pageX = touch.pageX;
        startOffset.pageY = touch.pageY;
        startTime = new Date().getTime();
        if (easingLoop !== null) clearInterval(easingLoop);
    }
    function shouldBeConsumedByChild(target, deltaX, deltaY) {
        if (!element.contains(target)) return false;
        var cursor = target;
        while(cursor && cursor !== element){
            if (cursor.classList.contains($84b75b20bc1c0b9f$var$cls.element.consuming)) return true;
            var style = $84b75b20bc1c0b9f$var$get(cursor);
            // if deltaY && vertical scrollable
            if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
                var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
                if (maxScrollTop > 0) {
                    if (cursor.scrollTop > 0 && deltaY < 0 || cursor.scrollTop < maxScrollTop && deltaY > 0) return true;
                }
            }
            // if deltaX && horizontal scrollable
            if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
                var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
                if (maxScrollLeft > 0) {
                    if (cursor.scrollLeft > 0 && deltaX < 0 || cursor.scrollLeft < maxScrollLeft && deltaX > 0) return true;
                }
            }
            cursor = cursor.parentNode;
        }
        return false;
    }
    function touchMove(e) {
        if (shouldHandle(e)) {
            var touch = getTouch(e);
            var currentOffset = {
                pageX: touch.pageX,
                pageY: touch.pageY
            };
            var differenceX = currentOffset.pageX - startOffset.pageX;
            var differenceY = currentOffset.pageY - startOffset.pageY;
            if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) return;
            applyTouchMove(differenceX, differenceY);
            startOffset = currentOffset;
            var currentTime = new Date().getTime();
            var timeGap = currentTime - startTime;
            if (timeGap > 0) {
                speed.x = differenceX / timeGap;
                speed.y = differenceY / timeGap;
                startTime = currentTime;
            }
            if (shouldPrevent(differenceX, differenceY)) e.preventDefault();
        }
    }
    function touchEnd() {
        if (i.settings.swipeEasing) {
            clearInterval(easingLoop);
            easingLoop = setInterval(function() {
                if (i.isInitialized) {
                    clearInterval(easingLoop);
                    return;
                }
                if (!speed.x && !speed.y) {
                    clearInterval(easingLoop);
                    return;
                }
                if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
                    clearInterval(easingLoop);
                    return;
                }
                if (!i.element) {
                    clearInterval(easingLoop);
                    return;
                }
                applyTouchMove(speed.x * 30, speed.y * 30);
                speed.x *= 0.8;
                speed.y *= 0.8;
            }, 10);
        }
    }
    if ($84b75b20bc1c0b9f$var$env.supportsTouch) {
        i.event.bind(element, 'touchstart', touchStart);
        i.event.bind(element, 'touchmove', touchMove);
        i.event.bind(element, 'touchend', touchEnd);
    } else if ($84b75b20bc1c0b9f$var$env.supportsIePointer) {
        if (window.PointerEvent) {
            i.event.bind(element, 'pointerdown', touchStart);
            i.event.bind(element, 'pointermove', touchMove);
            i.event.bind(element, 'pointerup', touchEnd);
        } else if (window.MSPointerEvent) {
            i.event.bind(element, 'MSPointerDown', touchStart);
            i.event.bind(element, 'MSPointerMove', touchMove);
            i.event.bind(element, 'MSPointerUp', touchEnd);
        }
    }
}
var $84b75b20bc1c0b9f$var$defaultSettings = function() {
    return {
        handlers: [
            'click-rail',
            'drag-thumb',
            'keyboard',
            'wheel',
            'touch'
        ],
        maxScrollbarLength: null,
        minScrollbarLength: null,
        scrollingThreshold: 1000,
        scrollXMarginOffset: 0,
        scrollYMarginOffset: 0,
        suppressScrollX: false,
        suppressScrollY: false,
        swipeEasing: true,
        useBothWheelAxes: false,
        wheelPropagation: true,
        wheelSpeed: 1
    };
};
var $84b75b20bc1c0b9f$var$handlers = {
    'click-rail': $84b75b20bc1c0b9f$var$clickRail,
    'drag-thumb': $84b75b20bc1c0b9f$var$dragThumb,
    keyboard: $84b75b20bc1c0b9f$var$keyboard,
    wheel: $84b75b20bc1c0b9f$var$wheel,
    touch: $84b75b20bc1c0b9f$var$touch
};
var $84b75b20bc1c0b9f$var$PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
    var this$1 = this;
    if (userSettings === void 0) userSettings = {
    };
    if (typeof element === 'string') element = document.querySelector(element);
    if (!element || !element.nodeName) throw new Error('no element is specified to initialize PerfectScrollbar');
    this.element = element;
    element.classList.add($84b75b20bc1c0b9f$var$cls.main);
    this.settings = $84b75b20bc1c0b9f$var$defaultSettings();
    for(var key in userSettings)this.settings[key] = userSettings[key];
    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;
    var focus = function() {
        return element.classList.add($84b75b20bc1c0b9f$var$cls.state.focus);
    };
    var blur = function() {
        return element.classList.remove($84b75b20bc1c0b9f$var$cls.state.focus);
    };
    this.isRtl = $84b75b20bc1c0b9f$var$get(element).direction === 'rtl';
    if (this.isRtl === true) element.classList.add($84b75b20bc1c0b9f$var$cls.rtl);
    this.isNegativeScroll = (function() {
        var originalScrollLeft = element.scrollLeft;
        var result = null;
        element.scrollLeft = -1;
        result = element.scrollLeft < 0;
        element.scrollLeft = originalScrollLeft;
        return result;
    })();
    this.negativeScrollAdjustment = this.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
    this.event = new $84b75b20bc1c0b9f$var$EventManager();
    this.ownerDocument = element.ownerDocument || document;
    this.scrollbarXRail = $84b75b20bc1c0b9f$var$div($84b75b20bc1c0b9f$var$cls.element.rail('x'));
    element.appendChild(this.scrollbarXRail);
    this.scrollbarX = $84b75b20bc1c0b9f$var$div($84b75b20bc1c0b9f$var$cls.element.thumb('x'));
    this.scrollbarXRail.appendChild(this.scrollbarX);
    this.scrollbarX.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarX, 'focus', focus);
    this.event.bind(this.scrollbarX, 'blur', blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    var railXStyle = $84b75b20bc1c0b9f$var$get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
        this.isScrollbarXUsingBottom = false;
        this.scrollbarXTop = $84b75b20bc1c0b9f$var$toInt(railXStyle.top);
    } else this.isScrollbarXUsingBottom = true;
    this.railBorderXWidth = $84b75b20bc1c0b9f$var$toInt(railXStyle.borderLeftWidth) + $84b75b20bc1c0b9f$var$toInt(railXStyle.borderRightWidth);
    // Set rail to display:block to calculate margins
    $84b75b20bc1c0b9f$var$set(this.scrollbarXRail, {
        display: 'block'
    });
    this.railXMarginWidth = $84b75b20bc1c0b9f$var$toInt(railXStyle.marginLeft) + $84b75b20bc1c0b9f$var$toInt(railXStyle.marginRight);
    $84b75b20bc1c0b9f$var$set(this.scrollbarXRail, {
        display: ''
    });
    this.railXWidth = null;
    this.railXRatio = null;
    this.scrollbarYRail = $84b75b20bc1c0b9f$var$div($84b75b20bc1c0b9f$var$cls.element.rail('y'));
    element.appendChild(this.scrollbarYRail);
    this.scrollbarY = $84b75b20bc1c0b9f$var$div($84b75b20bc1c0b9f$var$cls.element.thumb('y'));
    this.scrollbarYRail.appendChild(this.scrollbarY);
    this.scrollbarY.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarY, 'focus', focus);
    this.event.bind(this.scrollbarY, 'blur', blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    var railYStyle = $84b75b20bc1c0b9f$var$get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
        this.isScrollbarYUsingRight = false;
        this.scrollbarYLeft = $84b75b20bc1c0b9f$var$toInt(railYStyle.left);
    } else this.isScrollbarYUsingRight = true;
    this.scrollbarYOuterWidth = this.isRtl ? $84b75b20bc1c0b9f$var$outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth = $84b75b20bc1c0b9f$var$toInt(railYStyle.borderTopWidth) + $84b75b20bc1c0b9f$var$toInt(railYStyle.borderBottomWidth);
    $84b75b20bc1c0b9f$var$set(this.scrollbarYRail, {
        display: 'block'
    });
    this.railYMarginHeight = $84b75b20bc1c0b9f$var$toInt(railYStyle.marginTop) + $84b75b20bc1c0b9f$var$toInt(railYStyle.marginBottom);
    $84b75b20bc1c0b9f$var$set(this.scrollbarYRail, {
        display: ''
    });
    this.railYHeight = null;
    this.railYRatio = null;
    this.reach = {
        x: element.scrollLeft <= 0 ? 'start' : element.scrollLeft >= this.contentWidth - this.containerWidth ? 'end' : null,
        y: element.scrollTop <= 0 ? 'start' : element.scrollTop >= this.contentHeight - this.containerHeight ? 'end' : null
    };
    this.isAlive = true;
    this.settings.handlers.forEach(function(handlerName) {
        return $84b75b20bc1c0b9f$var$handlers[handlerName](this$1);
    });
    this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
    this.lastScrollLeft = element.scrollLeft; // for onScroll only
    this.event.bind(this.element, 'scroll', function(e) {
        return this$1.onScroll(e);
    });
    $84b75b20bc1c0b9f$var$updateGeometry(this);
};
$84b75b20bc1c0b9f$var$PerfectScrollbar.prototype.update = function update() {
    if (!this.isAlive) return;
    // Recalcuate negative scrollLeft adjustment
    this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0;
    // Recalculate rail margins
    $84b75b20bc1c0b9f$var$set(this.scrollbarXRail, {
        display: 'block'
    });
    $84b75b20bc1c0b9f$var$set(this.scrollbarYRail, {
        display: 'block'
    });
    this.railXMarginWidth = $84b75b20bc1c0b9f$var$toInt($84b75b20bc1c0b9f$var$get(this.scrollbarXRail).marginLeft) + $84b75b20bc1c0b9f$var$toInt($84b75b20bc1c0b9f$var$get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight = $84b75b20bc1c0b9f$var$toInt($84b75b20bc1c0b9f$var$get(this.scrollbarYRail).marginTop) + $84b75b20bc1c0b9f$var$toInt($84b75b20bc1c0b9f$var$get(this.scrollbarYRail).marginBottom);
    // Hide scrollbars not to affect scrollWidth and scrollHeight
    $84b75b20bc1c0b9f$var$set(this.scrollbarXRail, {
        display: 'none'
    });
    $84b75b20bc1c0b9f$var$set(this.scrollbarYRail, {
        display: 'none'
    });
    $84b75b20bc1c0b9f$var$updateGeometry(this);
    $84b75b20bc1c0b9f$var$processScrollDiff(this, 'top', 0, false, true);
    $84b75b20bc1c0b9f$var$processScrollDiff(this, 'left', 0, false, true);
    $84b75b20bc1c0b9f$var$set(this.scrollbarXRail, {
        display: ''
    });
    $84b75b20bc1c0b9f$var$set(this.scrollbarYRail, {
        display: ''
    });
};
$84b75b20bc1c0b9f$var$PerfectScrollbar.prototype.onScroll = function onScroll(e) {
    if (!this.isAlive) return;
    $84b75b20bc1c0b9f$var$updateGeometry(this);
    $84b75b20bc1c0b9f$var$processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
    $84b75b20bc1c0b9f$var$processScrollDiff(this, 'left', this.element.scrollLeft - this.lastScrollLeft);
    this.lastScrollTop = Math.floor(this.element.scrollTop);
    this.lastScrollLeft = this.element.scrollLeft;
};
$84b75b20bc1c0b9f$var$PerfectScrollbar.prototype.destroy = function destroy() {
    if (!this.isAlive) return;
    this.event.unbindAll();
    $84b75b20bc1c0b9f$var$remove(this.scrollbarX);
    $84b75b20bc1c0b9f$var$remove(this.scrollbarY);
    $84b75b20bc1c0b9f$var$remove(this.scrollbarXRail);
    $84b75b20bc1c0b9f$var$remove(this.scrollbarYRail);
    this.removePsClasses();
    // unset elements
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;
    this.isAlive = false;
};
$84b75b20bc1c0b9f$var$PerfectScrollbar.prototype.removePsClasses = function removePsClasses() {
    this.element.className = this.element.className.split(' ').filter(function(name) {
        return !name.match(/^ps([-_].+|)$/);
    }).join(' ');
};
var $84b75b20bc1c0b9f$export$2e2bcd8739ae039 = $84b75b20bc1c0b9f$var$PerfectScrollbar;


const $ac66c4955c1a4bcf$var$H = new $75c38b07c38e3c07$export$2e2bcd8739ae039.Core({
    transitions: {
        default: $5969f5e284a35ac8$export$2e2bcd8739ae039
    }
});
/* horizontal scrolling */ const $ac66c4955c1a4bcf$var$el = document.querySelector('#main-content-wrapper');
$ac66c4955c1a4bcf$var$el.addEventListener("wheel", (evt)=>{
    evt.preventDefault();
    $ac66c4955c1a4bcf$var$el.scrollLeft += evt.deltaY;
}); /* scrollbar */  // const ps = new PerfectScrollbar(el);


