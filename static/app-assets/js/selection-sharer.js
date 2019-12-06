/* @author: Xavier Damman (@xdamman) - http://github.com/xdamman/selection-sharer - @license: MIT */
!
function(a) {
    var b = function(b) {
        var c = this;
        b = b || {},
        "string" == typeof b && (b = {
            elements: b
        }),
        this.sel = null,
        this.textSelection = "",
        this.htmlSelection = "",
        this.appId = a('meta[property="fb:app_id"]').attr("content") || a('meta[property="fb:app_id"]').attr("value"),
        this.url2share = a('meta[property="og:url"]').attr("content") || a('meta[property="og:url"]').attr("value") || window.location.href,
        this.getSelectionText = function(a) {
            var b = "",
            d = "";
            if (a = a || window.getSelection(), a.rangeCount) {
                for (var e = document.createElement("div"), f = 0, g = a.rangeCount; g > f; ++f) e.appendChild(a.getRangeAt(f).cloneContents());
                d = e.textContent,
                b = e.innerHTML
            }
            return c.textSelection = d,
            c.htmlSelection = b || d,
            d
        },
        this.selectionDirection = function(a) {
            var b = a || window.getSelection(),
            c = document.createRange();
            if (!b.anchorNode) return 0;
            c.setStart(b.anchorNode, b.anchorOffset),
            c.setEnd(b.focusNode, b.focusOffset);
            var d = c.collapsed ? "backward": "forward";
            return c.detach(),
            d
        },
        this.showPopunder = function() {
            c.popunder = c.popunder || document.getElementById("selectionSharerPopunder");
            var a = window.getSelection(),
            b = c.getSelectionText(a);
            if (a.isCollapsed || b.length < 10 || !b.match(/ /)) return c.hidePopunder();
            if (c.popunder.classList.contains("fixed")) return c.popunder.style.bottom = 0,
            c.popunder.style.bottom;
            var d = a.getRangeAt(0),
            e = d.endContainer.parentNode;
            if (c.popunder.classList.contains("show")) {
                if (Math.ceil(c.popunder.getBoundingClientRect().top) == Math.ceil(e.getBoundingClientRect().bottom)) return;
                return c.hidePopunder(c.showPopunder)
            }
            if (e.nextElementSibling) c.pushSiblings(e);
            else {
                c.placeholder || (c.placeholder = document.createElement("div"), c.placeholder.className = "selectionSharerPlaceholder");
                var f = window.getComputedStyle(e).marginBottom;
                c.placeholder.style.height = f,
                c.placeholder.style.marginBottom = -2 * parseInt(f, 10) + "px",
                e.parentNode.insertBefore(c.placeholder)
            }
            var g = window.pageYOffset + e.getBoundingClientRect().bottom;
            c.popunder.style.top = Math.ceil(g) + "px",
            setTimeout(function() {
                c.placeholder && c.placeholder.classList.add("show"),
                c.popunder.classList.add("show")
            },
            0)
        },
        this.pushSiblings = function(a) {
            for (; a = a.nextElementSibling;) a.classList.add("selectionSharer"),
            a.classList.add("moveDown")
        },
        this.hidePopunder = function(a) {
            if (a = a ||
            function() {},
            "fixed" == c.popunder) return c.popunder.style.bottom = "-50px",
            a();
            c.popunder.classList.remove("show"),
            c.placeholder && c.placeholder.classList.remove("show");
            for (var b = document.getElementsByClassName("moveDown"); el = b[0];) el.classList.remove("moveDown");
            setTimeout(function() {
                c.placeholder && document.body.insertBefore(c.placeholder),
                a()
            },
            600)
        },
        this.show = function(a) {
            setTimeout(function() {
                var b = window.getSelection(),
                d = c.getSelectionText(b);
                if (!b.isCollapsed && d && d.length > 10 && d.match(/ /)) {
                    var e = b.getRangeAt(0),
                    f = e.getBoundingClientRect().top - 5,
                    g = f + c.getPosition().y - c.$popover.height(),
                    h = 0;
                    if (a) h = a.pageX;
                    else {
                        var i = b.anchorNode.parentNode;
                        h += i.offsetWidth / 2;
                        do h += i.offsetLeft;
                        while (i = i.offsetParent)
                    }
                    switch (c.selectionDirection(b)) {
                    case "forward":
                        h -= c.$popover.width();
                        break;
                    case "backward":
                        h += c.$popover.width();
                        break;
                    default:
                        return
                    }
                    c.$popover.removeClass("anim").css("top", g + 10).css("left", h).show(),
                    setTimeout(function() {
                        c.$popover.addClass("anim").css("top", g)
                    },
                    0)
                }
            },
            10)
        },
        this.hide = function(a) {
            c.$popover.hide()
        },
        this.smart_truncate = function(a, b) {
            if (!a || !a.length) return a;
            var c = a.length > b,
            d = c ? a.substr(0, b - 1) : a;
            return d = c ? d.substr(0, d.lastIndexOf(" ")) : d,
            c ? d + "...": d
        },
        this.getRelatedTwitterAccounts = function() {
            var b = [],
            c = a('meta[name="twitter:creator"]').attr("content") || a('meta[name="twitter:creator"]').attr("value");
            c && b.push(c);
            for (var d = document.getElementsByTagName("a"), e = 0, f = d.length; f > e; e++) if (d[e].attributes.href && "string" == typeof d[e].attributes.href.value) {
                var g = d[e].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i);
                g && g.length > 1 && -1 == ["widgets", "intent"].indexOf(g[1]) && b.push(g[1])
            }
            return b.length > 0 ? b.join(",") : ""
        },
        this.shareTwitter = function(a) {
            a.preventDefault();
            var b = "“" + c.smart_truncate(c.textSelection.trim(), 114) + "”",
            d = "http://twitter.com/intent/tweet?text=" + encodeURIComponent(b) + "&related=" + c.getRelatedTwitterAccounts() + "&url=" + encodeURIComponent(c.url2share);
            c.viaTwitterAccount && b.length < 114 - c.viaTwitterAccount.length && (d += "&via=" + c.viaTwitterAccount);
            var e = 640,
            f = 440,
            g = screen.width / 2 - e / 2,
            h = screen.height / 2 - f / 2 - 100;
            return window.open(d, "share_twitter", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + e + ", height=" + f + ", top=" + h + ", left=" + g),
            c.hide(),
            !1
        },
        this.shareFacebook = function(a) {
            a.preventDefault();
            var b = c.htmlSelection.replace(/<p[^>]*>/gi, "\n").replace(/<\/p>|  /gi, "").trim(),
            d = "https://www.facebook.com/dialog/feed?app_id=" + c.appId + "&display=popup&caption=" + encodeURIComponent(b) + "&link=" + encodeURIComponent(c.url2share) + "&href=" + encodeURIComponent(c.url2share) + "&redirect_uri=" + encodeURIComponent(c.url2share),
            e = 640,
            f = 440,
            g = screen.width / 2 - e / 2,
            h = screen.height / 2 - f / 2 - 100;
            window.open(d, "share_facebook", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + e + ", height=" + f + ", top=" + h + ", left=" + g)
        },
        this.shareEmail = function(b) {
            var d = c.textSelection.replace(/<p[^>]*>/gi, "\n").replace(/<\/p>|  /gi, "").trim(),
            e = {};
            return e.subject = encodeURIComponent("Quote from " + document.title),
            e.body = encodeURIComponent("“" + d + "”") + "%0D%0A%0D%0AFrom: " + encodeURIComponent(document.title) + "%0D%0A" + encodeURIComponent(window.location.href),
            a(b.target).attr("href", "mailto:?subject=" + e.subject + "&body=" + e.body),
            c.hide(b),
            !0
        },
        this.render = function() {
            var b = '<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">  <div id="selectionSharerPopover-inner">    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>      <li><a class="action email" href="" title="Share this selection by email"><svg width="20" height="20"><path stroke="%23FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div>  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div></div>',
            d = '<div id="selectionSharerPopunder" class="selectionSharer">  <div id="selectionSharerPopunder-inner">    <label>Share this selection</label>    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>      <li><a class="action email" href="" title="Share this selection by email"><svg width="20" height="20"><path stroke="%23FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div></div>';
            c.$popover = a(b),
            c.$popover.find("a.tweet").on("click",
            function(a) {
                c.shareTwitter(a)
            }),
            c.$popover.find("a.facebook").on("click",
            function(a) {
                c.shareFacebook(a)
            }),
            c.$popover.find("a.email").on("click",
            function(a) {
                c.shareEmail(a)
            }),
            a("body").append(c.$popover),
            c.$popunder = a(d),
            c.$popunder.find("a.tweet").on("click",
            function(a) {
                c.shareTwitter(a)
            }),
            c.$popunder.find("a.facebook").on("click",
            function(a) {
                c.shareFacebook(a)
            }),
            c.$popunder.find("a.email").on("click",
            function(a) {
                c.shareEmail(a)
            }),
            a("body").append(c.$popunder),
            c.appId && c.url2share && a(".selectionSharer a.facebook").css("display", "inline-block")
        },
        this.setElements = function(b) {
            "string" == typeof b && (b = a(b)),
            c.$elements = b instanceof a ? b: a(b),
            c.$elements.on({
                mouseup: function(a) {
                    c.show(a)
                },
                mousedown: function(a) {
                    c.hide(a)
                },
                touchstart: function(a) {
                    c.isMobile = !0
                }
            }).addClass("selectionShareable"),
            document.onselectionchange = c.selectionChanged
        },
        this.selectionChanged = function(a) {
            c.isMobile && (c.lastSelectionChanged && clearTimeout(c.lastSelectionChanged), c.lastSelectionChanged = setTimeout(function() {
                c.showPopunder(a)
            },
            300))
        },
        this.getPosition = function() {
            var a = void 0 !== window.pageXOffset,
            b = "CSS1Compat" === (document.compatMode || ""),
            c = a ? window.pageXOffset: b ? document.documentElement.scrollLeft: document.body.scrollLeft,
            d = a ? window.pageYOffset: b ? document.documentElement.scrollTop: document.body.scrollTop;
            return {
                x: c,
                y: d
            }
        },
        this.render(),
        b.elements && this.setElements(b.elements)
    };
    a.fn.selectionSharer = function() {
        var a = new b;
        return a.setElements(this),
        this
    },
    "function" == typeof define ? define(function() {
        return b.load = function(a, c, d, e) {
            var f = new b;
            f.setElements("p"),
            d()
        },
        b
    }) : "object" == typeof module && module.exports ? module.exports = b: window.SelectionSharer = b
} (jQuery);