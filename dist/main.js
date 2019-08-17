! function (e) {
    var t = {};

    function n(c) {
        if (t[c]) return t[c].exports;
        var o = t[c] = {
            i: c,
            l: !1,
            exports: {}
        };
        return e[c].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, c) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: c
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var c = Object.create(null);
        if (n.r(c), Object.defineProperty(c, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(c, o, function (t) {
                return e[t]
            }.bind(null, o));
        return c
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function (e, t, n) {
    "use strict";

    function c() {
        const e = document.querySelectorAll(".goods .card"),
            t = document.getElementById("discount-checkbox");
        t.addEventListener("click", c);
        const n = document.getElementById("min"),
            o = document.getElementById("max"),
            r = document.querySelector(".catalog-list li.active");
        e.forEach(e => {
            const c = e.querySelector(".card-price"),
                l = parseFloat(c.textContent),
                a = e.querySelector(".card-sale");
            e.parentNode.style.display = "", n.value && l < n.value || o.value && l > o.value ? e.parentNode.style.display = "none" : t.checked && !a ? e.parentNode.style.display = "none" : r && e.dataset.category !== r.textContent && (e.parentNode.style.display = "none")
        })
    }
    n.r(t), async function () {
        ! function (e) {
            const t = document.querySelector(".goods");
            e.goods.forEach(e => {
                const n = document.createElement("div");
                n.className = "col-12 col-md-6 col-lg-4 col-xl-3", n.innerHTML = `\n        <div class="card" data-category="${e.category}">\n            ${e.sale?'<div class="card-sale">🔥Hot Sale🔥</div>':""}\n            <div class="card-img-wrapper">\n                <span class="card-img-top"\n                    style="background-image: url('${e.img}')"></span>\n            </div>\n            <div class="card-body justify-content-between">\n                <div class="card-price" style="${e.sale?"color:red":""}">\n                    ${e.price} ₽</div>\n                <h5 class="card-title">${e.title}</h5>\n                <button class="btn btn-primary">В корзину</button>\n            </div>\n        </div>\n        `, t.appendChild(n)
            })
        }(await async function () {
            const e = await fetch("../db/db.json");
            return await e.json()
        }()),
        function () {
            const e = document.querySelectorAll(".goods .card"),
                t = document.querySelector(".catalog"),
                n = document.querySelector(".catalog-list"),
                o = document.querySelector(".catalog-button"),
                r = new Set,
                l = document.querySelector(".filter-title h5");
            e.forEach(e => {
                r.add(e.dataset.category)
            }), r.add("ВСЕ"), r.forEach(e => {
                const t = document.createElement("li");
                t.textContent = e, n.appendChild(t)
            });
            const a = n.querySelectorAll("li");
            o.addEventListener("click", e => {
                t.style.display ? t.style.display = "" : t.style.display = "block", "LI" === e.target.tagname && (a.forEach(t => {
                    t === e.target ? t.classList.add("active") : t.classList.remove("active")
                }), l.textContent = e.target.textContent, c())
            })
        }(), document.querySelectorAll(".filter-check_checkbox").forEach(e => {
                e.addEventListener("change", function () {
                    this.checked ? this.nextElementSibling.classList.add("checked") : this.nextElementSibling.classList.remove("checked")
                })
            }),
            function () {
                const e = document.getElementById("cart"),
                    t = document.querySelector(".cart"),
                    n = document.querySelector(".cart-close");
                e.addEventListener("click", () => {
                    t.style.display = "flex", document.body.style.overflow = "hidden"
                }), n.addEventListener("click", () => {
                    t.style.display = "none", document.body.style.overflow = ""
                })
            }(),
            function () {
                const e = document.querySelectorAll(".goods .card"),
                    t = document.querySelector(".cart-wrapper"),
                    n = document.getElementById("cart-empty"),
                    c = document.querySelector(".counter");

                function o() {
                    const e = t.querySelectorAll(".card"),
                        o = t.querySelectorAll(".card-price"),
                        r = document.querySelector(".cart-total span");
                    c.textContent = e.length;
                    let l = 0;
                    o.forEach(e => {
                        let t = parseFloat(e.textContent);
                        l += t
                    }), r.textContent = l, 0 !== e.length ? n.remove() : t.appendChild(n)
                }
                e.forEach(e => {
                    e.querySelector("button").addEventListener("click", () => {
                        const n = e.cloneNode(!0);
                        t.appendChild(n), o();
                        const c = n.querySelector(".btn");
                        c.textContent = "Удалить из корзины", c.addEventListener("click", () => {
                            n.remove(), o()
                        })
                    })
                })
            }(),
            function () {
                const e = document.querySelectorAll(".goods .card"),
                    t = document.getElementById("discount-checkbox");
                t.addEventListener("click", c);
                const n = document.getElementById("min"),
                    o = document.getElementById("max");
                n.addEventListener("change", c), o.addEventListener("change", c);
                const r = document.querySelector(".search-wrapper_input");
                document.querySelector(".search-btn").addEventListener("click", () => {
                    const t = new RegExp(r.value.trim(), "i");
                    console.log("searchText: ", t), e.forEach(e => {
                        const n = e.querySelector(".card-title");
                        t.test(n.textContent) ? e.parentNode.style.display = "" : e.parentNode.style.display = "none"
                    }), r.value = ""
                })
            }()
    }()
}]);