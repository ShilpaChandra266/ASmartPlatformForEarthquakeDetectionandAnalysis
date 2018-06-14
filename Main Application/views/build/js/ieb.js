function debug(e) {
    globals.dbg && "undefined" != typeof console && console.log(e)
}

function showMsg(e, l, t) {
    debug(e);
    var a = "undefined" == typeof t || void 0 === t || 0 >= t ? !1 : !0;
    "undefined" != typeof msgTimeout && window.clearTimeout(msgTimeout), globals.msgElem = document.getElementById("message"), globals.msgElem.style.backgroundColor = l ? "red" : "indigo", globals.msgElem.style.display = "inline", globals.msgElem.innerHTML = e, globals.msgElem.style.visibility = "visible", a && window.setTimeout(hideMsg, 1e3 * t)
}

function showErr(e, l) {
    ("undefined" == typeof l || void 0 === l) && (l = 0), showMsg(e, !0, l)
}

function hideMsg() {
    "undefined" != typeof msgTimeout && window.clearTimeout(msgTimeout), e("message").innerHTML = "", e("message").style.visibility = "hidden"
}

function e(e) {
    return document.getElementById(e)
}

function roundNumber(e, l) {
    return Math.round(e * Math.pow(10, l)) / Math.pow(10, l)
}

function getWindowHeight() {
    return window.self && self.innerHeight ? self.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : 0
}

function getWindowWidth() {
    return window.self && self.innerWidth ? self.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : 0
}

function setSelBox(e) {
    stopAnimation();
    if (debug("setSelBox: running: loading: " + globals.loading + ", mapReady: " + e), !globals.loading && !e) return showErr("Oops. Attempt to refresh when map not ready.", 3), !1;
    debug("setting selBox using....");
    var l = null,
        t = null,
        a = null,
        o = null,
        n = null,
        s = null,
        i = null;
    if (globals.loading ? globals.usingUrlParams ? (debug("..URL params."), l = parseFloat(globals.urlParams.maxlat), t = parseFloat(globals.urlParams.minlat), a = parseFloat(globals.urlParams.minlon), o = parseFloat(globals.urlParams.maxlon), globals.dzSelBoxLocked && (debug("..and creating dzBounds due to sbl param."), globals.dzBounds = new google.maps.LatLngBounds(new google.maps.LatLng(t, a), new google.maps.LatLng(l, o)))) : (debug("..initial URL defaults."), l = parseFloat(globals.urlDefaults.maxlat), t = parseFloat(globals.urlDefaults.minlat), a = parseFloat(globals.urlDefaults.minlon), o = parseFloat(globals.urlDefaults.maxlon)) : e && (globals.dzSelBoxLocked ? (debug("..drag zoom box."), n = globals.dzBounds) : (debug("..current map bounds."), n = globals.map.getBounds()), s = n.getSouthWest(), i = n.getNorthEast(), a = parseFloat(s.lng()), o = parseFloat(i.lng()), t = parseFloat(s.lat()), l = parseFloat(i.lat())), debug("lons, lats: " + a + "," + o + ",  " + t + "," + l), null == l) return showErr("Oops. Logic error in refresh.", 3), !1;
    Math.abs(l - t) < .1 && (89.8 > l && (l += .01), t > -89.8 && (t += .01)), Math.abs(o - a) < .1 && (179.8 > o && (o += .01), a > -179.8 && (a += .01));
    var r, g = globals.map.getZoom();
    return void 0 !== g ? (r = globals.dzSelBoxLocked ? globals.dzBounds.toSpan().lat() < 1 || globals.dzBounds.toSpan().lng() < 1 ? 8 : globals.dzBounds.toSpan().lat() < 2 || globals.dzBounds.toSpan().lng() < 2 ? 5 : 3 : g > 8 ? 4 : 2, debug("zm of " + g + ", or small dzBounds, means lat/lon precision of " + r)) : (r = 3, debug("undefined zm? means lat/lon precision of " + r)), a = a.toFixed(r), o = o.toFixed(r), t = t.toFixed(r), l = l.toFixed(r), debug("post tweak lons, lats: " + a + "," + o + ",  " + t + "," + l), globals.maxlat = l, globals.minlat = t, globals.maxlon = o, globals.minlon = a, globals.selBoxNE = new google.maps.LatLng(l, o), globals.selBoxNW = new google.maps.LatLng(l, a), globals.selBoxSW = new google.maps.LatLng(t, a), globals.selBoxSE = new google.maps.LatLng(t, o), setLatLonInfo(a, o, t, l), debug("setSelBox finished w/success:\nminlat: " + globals.minlat + "\nmaxlat: " + globals.maxlat + "\nminlon: " + globals.minlon + "\nmaxlon: " + globals.maxlon), !0
}

function globalsToCommonArgs() {
    var e = "";
    return null !== globals.starttime && globals.starttime.length > 0 && (e += "&starttime=" + globals.starttime), null !== globals.endtime && globals.endtime.length > 0 && (e += "&endtime=" + globals.endtime), null !== globals.minmag && (e += "&minmag=" + globals.minmag), null !== globals.maxmag && (e += "&maxmag=" + globals.maxmag), null !== globals.mindepth && (e += "&mindepth=" + globals.mindepth), null !== globals.maxdepth && (e += "&maxdepth=" + globals.maxdepth), null !== globals.orderby && (e += "&orderby=" + globals.orderby), e += null !== globals.limit ? "&limit=" + globals.limit : "&limit=200", e += "&maxlat=" + globals.maxlat + "&minlat=" + globals.minlat + "&maxlon=" + globals.maxlon + "&minlon=" + globals.minlon
}

function globalsToEvtFilter() {
    debug("globalsToEvtFilter: running, using...");
    var l;
    globals.usingUrlParams ? (l = globals.urlParams, debug("..URL params.")) : globals.usingUrlDefaults ? (l = globals.urlDefaults, debug("..URL defaults.")) : (debug("error: not using URL defaults? should be."), l = globals.urlDefaults);
    var t = null,
        a = null,
        o = null,
        n = null,
        s = null,
        i = null,
        r = null,
        g = null,
        d = null,
        m = null;
    if (t = window.document.evtFilterForm.start_checkbox, t.checked = !0, a = window.document.evtFilterForm.start_text, "" != l.starttime) {
        if (t.checked = globals.usingUrlDefaults ? !0 : !1, m = l.starttime, a.value = m, d = getDateString(m), !d) return alert("Bad Date: \n" + m + "\n\nformat: yyyy-mm-dd\nexample: 1980-05-18"), a.focus(), !1;
        o = m
    }
    if (t = window.document.evtFilterForm.end_checkbox, t.checked = !0, a = window.document.evtFilterForm.end_text, "" != l.endtime) {
        if (t.checked = globals.usingUrlDefaults ? !0 : !1, m = l.endtime, a.value = m, d = getDateString(m), !d) return alert("Bad Date: \n" + m + "\n\nformat: yyyy-mm-dd\nexample: 1980-05-18"), a.focus(), !1;
        n = m
    }
    if (console.log("globalsToEvtFilter: endtime: " + n), t = window.document.evtFilterForm.mag_all_checkbox, t.checked = !0, "" != l.minmag) {
        if (t.checked = globals.usingUrlDefaults ? !0 : !1, a = window.document.evtFilterForm.mag_min_text, m = l.minmag, a.value = m, !globals.numberRegExp.test(m)) return alert("Invalid Magnitude: " + m + "\n\nMust be a number"), a.focus(), !1;
        var b = m;
        if (a = window.document.evtFilterForm.mag_max_text, m = l.maxmag, a.value = m, !globals.numberRegExp.test(m)) return alert("Invalid Magnitude: " + m + "\n\nMust be a number"), a.focus(), !1;
        var u = m,
            c = parseFloat(b),
            p = parseFloat(u);
        if (c > p) return alert("Invalid magnitude range: " + c + " to " + p), a.focus(), !1;
        s = "" + c, i = "" + p
    }
    if (t = window.document.evtFilterForm.depth_all_checkbox, t.checked = !0, "" != l.mindepth) {
        if (t.checked = globals.usingUrlDefaults ? !0 : !1, a = window.document.evtFilterForm.depth_min_text, m = l.mindepth, a.value = m, !globals.numberRegExp.test(m)) return alert("Invalid Depth: " + m + "\n\nMust be a number"), a.focus(), !1;
        var b = m;
        if (a = window.document.evtFilterForm.depth_max_text, m = l.maxdepth, a.value = m, !globals.numberRegExp.test(m)) return alert("Invalid Depth: " + m + "\n\nMust be a number"), a.focus(), !1;
        var u = m,
            h = parseFloat(b),
            v = parseFloat(u);
        if (h > v) return alert("Invalid depth range: " + h + " to " + v), a.focus(), !1;
        r = "" + h, g = "" + v
    }
    var y = window.document.evtFilterForm.orderby_selector;
    "time-desc" == l.orderby ? y.selectedIndex = 0 : y.selectedIndex = 1;
    var f = e("m" + l.limit);
    return null !== f ? f.selected = !0 : (f = e("m" + globals.urlDefaults.limit), f.selected = !0, l.limit = globals.urlDefaults.limit), globals.starttime = o, globals.endtime = n, globals.minmag = s, globals.maxmag = i, globals.mindepth = r, globals.maxdepth = g, globals.orderby = l.orderby, globals.limit = l.limit, globals.evSignature = evtFilterSignature(), !0
}

function evtFilterToGlobals() {
    debug("evtFilterToGlobals: running");
    var e, l, t = null,
        a = null,
        o = null,
        n = null,
        s = null,
        i = null,
        r = null,
        g = null;
    if (e = window.document.evtFilterForm.start_checkbox, l = window.document.evtFilterForm.start_text, e.checked) t = null;
    else {
        if (g = l.value, r = getDateString(g), !r) return alert("Bad Date: \n" + g + "\n\nformat: yyyy-mm-dd\nexample: 1980-05-18"), l.focus(), !1;
        t = g
    }
    if (e = window.document.evtFilterForm.end_checkbox, l = window.document.evtFilterForm.end_text, e.checked) a = null;
    else {
        if (g = l.value, r = getDateString(g), !r) return alert("Bad Date: \n" + g + "\n\nformat: yyyy-mm-dd\nexample: 1980-05-18"), l.focus(), !1;
        a = g
    }
    if (console.log("evtFilterToGlobals: endtime: " + a), e = window.document.evtFilterForm.mag_all_checkbox, !e.checked) {
        if (l = window.document.evtFilterForm.mag_min_text, g = l.value, !globals.numberRegExp.test(g)) return alert("Invalid Magnitude: " + g + "\n\nMust be a number"), l.focus(), !1;
        var d = g;
        if (l = window.document.evtFilterForm.mag_max_text, g = l.value, !globals.numberRegExp.test(g)) return alert("Invalid Magnitude: " + g + "\n\nMust be a number"), l.focus(), !1;
        var m = g,
            b = parseFloat(d),
            u = parseFloat(m);
        if (b > u) return alert("Invalid magnitude range: " + b + " to " + u), l.focus(), !1;
        o = "" + b, n = "" + u
    }
    if (e = window.document.evtFilterForm.depth_all_checkbox, !e.checked) {
        if (l = window.document.evtFilterForm.depth_min_text, g = l.value, !globals.numberRegExp.test(g)) return alert("Invalid Depth: " + g + "\n\nMust be a number"), l.focus(), !1;
        var d = g;
        if (l = window.document.evtFilterForm.depth_max_text, g = l.value, !globals.numberRegExp.test(g)) return alert("Invalid Depth: " + g + "\n\nMust be a number"), l.focus(), !1;
        var m = g,
            c = parseFloat(d),
            p = parseFloat(m);
        if (c > p) return alert("Invalid depth range: " + c + " to " + p), l.focus(), !1;
        s = "" + c, i = "" + p
    }
    var h = window.document.evtFilterForm.orderby_selector,
        v = h.selectedIndex,
        y = window.document.evtFilterForm.max_display_selector,
        f = y.selectedIndex;
    return null !== t ? globals.starttime = t : globals.starttime = globals.urlDefaults.starttime, null !== a ? globals.endtime = a : globals.endtime = globals.urlDefaults.endtime, globals.minmag = o, globals.maxmag = n, globals.mindepth = s, globals.maxdepth = i, globals.orderby = h.options[v].value, globals.limit = y.options[f].value, !0
}

function evtFilterSignature() {
    var e, l, t = "",
        a = "from ";
    e = window.document.evtFilterForm.start_checkbox, l = window.document.evtFilterForm.start_text, e.checked ? (t += "earliest", a += "the earliest") : (t += l.value, a += l.value), t += "-", e = window.document.evtFilterForm.end_checkbox, l = window.document.evtFilterForm.end_text, e.checked ? (t += "latest", a += " to the latest available, ") : (t += l.value, a += " to " + l.value + ", "), t += "-", e = window.document.evtFilterForm.mag_all_checkbox, e.checked ? (t += "allmags", a += "all mags") : (t += window.document.evtFilterForm.mag_min_text.value, t += "-", a += "with magnitudes from " + window.document.evtFilterForm.mag_min_text.value, t += window.document.evtFilterForm.mag_max_text.value, a += " to " + window.document.evtFilterForm.mag_max_text.value), t += "-", a += ", ", e = window.document.evtFilterForm.depth_all_checkbox, e.checked ? (t += "alldepths", a += "all depths") : (t += window.document.evtFilterForm.depth_min_text.value, t += "-", a += "depths from " + window.document.evtFilterForm.depth_min_text.value, t += window.document.evtFilterForm.depth_max_text.value, a += " to " + window.document.evtFilterForm.depth_max_text.value + " km"), t += "-", a += ", ";
    var o = window.document.evtFilterForm.orderby_selector,
        n = o.selectedIndex;
    t += o.options[n].value, a += "time-desc" == globals.orderby ? "with priority for most recent" : "with priority for size", t += "-";
    var s = window.document.evtFilterForm.max_display_selector,
        i = s.selectedIndex;
    return t += s.options[i].value, a += ", and limited to " + s.options[i].value + ".", globals.evFilterAsString = a, t
}

function eventsNumberWarning() {
    var l = e("eventsNumberWarning"),
        t = window.document.evtFilterForm.max_display_selector,
        a = t.selectedIndex,
        o = t.options[a].value,
        n = parseInt(o);
    n > 4e3 || globals.IS_IE && n > 2e3 ? l.style.display = "block" : l.style.display = "none"
}

function toggleDiv(e) {
    var l, t;
    document.getElementById ? l = document.getElementById(e) : document.all ? l = document.all[e] : document.layers && (l = document.layers[e]), t = l.style, "" === t.display && void 0 !== l.offsetWidth && void 0 !== l.offsetHeight && (t.display = 0 !== l.offsetWidth && 0 !== l.offsetHeight ? "block" : "none"), t.display = "" === t.display || "block" === t.display ? "none" : "block"
}

function togglePlates(l) {
    "undefined" == typeof l ? globals.platesVisible = !globals.platesVisible : globals.platesVisible = l;
    var t = e("platesLegend");
    if (globals.platesVisible)
        if (getWindowHeight() > 500 && (t.style.visibility = "visible"), null === globals.platesLayer) {
            debug("adding plates overlay");
            var a;
            a = {
                preserveViewport: !0,
                clickable: !1,
                url: "http://ds.iris.edu/ieb/data/plate_boundaries_no_legends.kml"
            }, globals.platesLayer = new google.maps.KmlLayer(a), globals.platesLayer.setMap(globals.map)
        } else debug("plates are already visible");
    else t.style.visibility = "hidden", null !== globals.platesLayer && (debug("removing plates"), globals.platesLayer.setMap(null), globals.platesLayer = null);
    "undefined" != typeof l && (l ? e("plates_display_selector").selectedIndex = 0 : e("plates_display_selector").selectedIndex = 1), globals.loading || appendIEBArgs(null)
}

function applyBtnClicked() {
    stopAnimation();
    globals.loading = !1, evtFilterToGlobals() && (globals.evSignature = evtFilterSignature(), globals.refresh(!1))
}

function gotoArea() {
    var e = document.getElementById("area_display_selector"),
        l = e.selectedIndex,
        t = e.options[l].value;
    debug(t);
    var a = globals.baseUrl + "&limit=1000&orderby=time-desc&";
    switch (t) {
        case "Ring of Fire":
            a += "maxlat=14&minlat=-33&maxlon=-155&minlon=93&name=Ring%20of%20Fire&sbl=1&pbl=1&caller=self";
            break;
        case "Polynesia":
            a += "maxlat=14&minlat=-33&maxlon=-155&minlon=93&name=Polynesia&sbl=1&pbl=1&caller=self";
            break;
        case "FijiTonga":
            a += "maxlat=-12.1&minlat=-32.2&maxlon=-164.8&minlon=170.5&name=Fiji%20Tonga%20Region&sbl=1&pbl=1&caller=self";
            break;
        case "Cascadia":
            a += "maxlat=51&minlat=38&maxlon=-118&minlon=-128&name=Cascadia&sbl=1&pbl=1&caller=self";
            break;
        case "Aleutians":
            a += "maxlat=57&minlat=48&maxlon=-156&minlon=168&name=Aleutian%20Islands&sbl=1&pbl=1&caller=self";
            break;
        case "Japan":
            a += "maxlat=56&minlat=22&maxlon=159&minlon=127&name=Japan%20Region&sbl=1&pbl=1&caller=self";
            break;
        case "EMed":
            a += "maxlat=48.22&minlat=31.58&maxlon=45.88&minlon=7.56&name=E.%20Mediterranean&sbl=1&pbl=1&caller=self";
            break;
        case "EAfrRift":
            a += "maxlat=26.59&minlat=-20.63&maxlon=51.50&minlon=23.12&name=E.%20African%20Rift&sbl=1&pbl=1&caller=self";
            break;
        case "SEAsia":
            a += "maxlat=37.72&minlat=9.80&maxlon=107.58&minlon=64.51&name=S.E.%20Asia%20Region&sbl=1&pbl=1&caller=self";
            break;
        case "CentAmer":
            a += "maxlat=28.77&minlat=4.92&maxlon=-53.44&minlon=-118.48&name=Central%20America&sbl=1&pbl=1&caller=self";
            break;
        case "CentSAmer":
            a += "maxlat=-0.014&minlat=-39.910&maxlon=-57.656&minlon=-89.283&name=Central%20South America&sbl=1&pbl=1&caller=self";
            break;
        case "AfrHorn":
            a += "maxlat=21.17&minlat=0&maxlon=59&minlon=37&name=Horn%20of%20Africa&sbl=1&pbl=1&caller=self";
            break;
        case "2004Tsunami":
            a += "orderby=mag-desc&li=1000&maxlat=11.931&minlat=1.538&maxlon=98.130&minlon=88.924&starttime=2004-12-26&endtime=2004-12-28&sbl=1&pbl=1&caller=self&name=2004%20Asian%20Tsunami%20Quake%20and%20Aftershocks";
            break;
        case "DeepItaly":
            a += "mindepth=100&maxdepth=900&orderby=mag-desc&maxlat=41.36&minlat=36.53&maxlon=18.25&minlon=11.56&sbl=1&pbl=1&caller=self&name=Deep%20Quakes%20Under%20Italy";
            break;
        case "Romania":
            a += "maxlat=46.619&minlat=44.497&maxlon=28.081&minlon=24.874&sbl=1&pbl=0&caller=self&name=Mystery%20Under%20Romania";
            break;
        case "ManSwarm":
            a += "maxlat=53.5396&minlat=53.4432&maxlon=-1.9885&minlon=-2.3112&sbl=1&pbl=1&name=2002%20Swarm%20Oct-Nov%20Manchester%20UK";
            break;
        case "DeepWorld":
            a += "mindepth=330&maxdepth=900&orderby=mag-desc&maxlat=90.0&minlat=-90.0&maxlon=180.0&minlon=-180.0&name=Where%20the%20Deepest%20Quakes%20Are"
    }
    window.location.href = a
}

function toggleCheckBoxes() {
    var e, l, t, a = "#000000",
        o = "#666666";
    debug("toggleCheckBoxes: running"), e = document.getElementById("start_checkbox"), l = document.getElementById("start_checkbox_label"), t = document.getElementById("start_text"), t.disabled = e.checked, l.style.color = e.checked ? a : o, t.disabled ? (datePickerController.disable("start_text"), t.value = "yyyy-mm-dd") : datePickerController.enable("start_text"), e = document.getElementById("end_checkbox"), l = document.getElementById("end_checkbox_label"), t = document.getElementById("end_text"), t.disabled = e.checked, l.style.color = e.checked ? a : o, t.disabled ? (datePickerController.disable("end_text"), t.value = "yyyy-mm-dd") : datePickerController.enable("end_text"), e = document.getElementById("mag_all_checkbox"), l = document.getElementById("mag_all_checkbox_label"), t = document.getElementById("mag_min_text"), t.disabled = e.checked, t = document.getElementById("mag_max_text"), t.disabled = e.checked, l.style.color = e.checked ? a : o, e = document.getElementById("depth_all_checkbox"), l = document.getElementById("depth_all_checkbox_label"), t = document.getElementById("depth_min_text"), t.disabled = e.checked, t = document.getElementById("depth_max_text"), t.disabled = e.checked, l.style.color = e.checked ? a : o
}

function greyMapIfEvtFltChanged() {
    if (!globals.busy) {
        var e = evtFilterSignature();
        e == globals.evSignature ? (document.getElementById("greyMapDiv").style.visibility = "hidden", document.getElementById("apply_button").style.backgroundColor = "#FFFFFF", document.getElementById("status").innerText = "", document.getElementById("status").style.visibility = "hidden") : (document.getElementById("greyMapDiv").style.visibility = "visible", document.getElementById("apply_button").style.backgroundColor = "#FF9900", document.getElementById("status").innerHTML = "Press Apply button for options changes to take effect.", document.getElementById("status").style.visibility = "visible")
    }
}

function Magnitude(e) {
    this.magnitude = e, this.inRange = function(l) {
        var t = e - .5,
            a = e + .5;
        return 1 == e ? t = 0 : 9 == e && (a = 10), l >= t && a >= l
    }
}

function DepthRange(e, l) {
    this.depth0 = e, this.depth1 = l, this.name = "" + e + "_" + l, this.inRange = function(t) {
        return t >= e && l >= t
    }
}

function markerImageFactory(e, l, t) {
    var a = new google.maps.MarkerImage;
    return a.url = e, a.size = new google.maps.Size(l, t), a.anchor = new google.maps.Point(l / 2, t / 2), a
}

function setLatLonInfo(e, l, t, a) {
    var o = document.getElementById("latlon_info"),
        n = "&nbsp;",
        s = "<br/>";
    o.innerHTML = "Selected Lat/Lon Range:" + s + a + s + e + n + n + n + n + n + n + l + s + t
}

function DepthMagIconFactory(e, l) {
    var t = e.magnitude;
    this.magnitude = e, this.depthRange = l;
    var a = "icons/mag" + t + "_" + l.depth0 + "_" + l.depth1 + ".png";
    this.file = a;
    var o = 20,
        n = 20;
    9 == t ? (o = 20, n = 20) : 8 == t ? (o = 18, n = 18) : 7 == t ? (o = 16, n = 16) : 6 == t ? (o = 13, n = 14) : 5 == t ? (o = 12, n = 12) : 4 == t ? (o = 10, n = 10) : 3 == t ? (o = 7, n = 8) : 2 == t ? (o = 5, n = 4) : (o = 2, n = 2), this.icon = markerImageFactory(a, o, n), this.inRange = function(t, a) {
        return e.inRange(t) && l.inRange(a)
    }
}

function handleResize() {
    debug("handleResize running");
    for (var l = 0, t = document.getElementById("mapDiv"); null != t; t = t.offsetParent) l += t.offsetTop;
    var a = getWindowHeight(),
        o = a - l - 10;
    o >= 0 && (document.getElementById("mapDiv").style.height = o + "px", document.getElementById("sidebar").style.height = o + "px", document.getElementById("greyMapDiv").style.height = o + "px");
    var n = e("sidebar"),
        s = getWindowWidth();
    "visible" == n.style.visibility || "" == n.style.visibility ? (e("mapDiv").style.width = s - 230 + "px", e("greyMapDiv").style.width = e("mapDiv").style.width) : (e("mapDiv").style.width = s - 10 + "px", e("greyMapDiv").style.width = e("mapDiv").style.width), 525 >= a ? (e("depthscale").style.visibility = "hidden", e("magscale").style.visibility = "hidden", globals.platesVisible && (e("platesLegend").style.visibility = "hidden"), e("latlon_info").style.visibility = "hidden") : (e("depthscale").style.visibility = "visible", e("magscale").style.visibility = "visible", globals.platesVisible && (e("platesLegend").style.visibility = "visible"), e("latlon_info").style.visibility = "inherit");
    var i = e("title");
    550 >= s || s < i.getBoundingClientRect().width + 270 ? i.style.visibility = "hidden" : i.style.visibility = "visible"
}

function gup(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var l = "[\\?&]" + e + "=([^&#]*)",
        t = new RegExp(l),
        a = t.exec(decodeURIComponent(window.location.href));
    return null === a || "undefined" === a[1] ? "" : a[1]
}

function getUrlParams() {
    var e = gup("minlat"),
        l = gup("maxlat"),
        t = gup("minlon"),
        a = gup("maxlon"),
        o = gup("starttime"),
        n = gup("endtime"),
        s = gup("minmag"),
        i = gup("maxmag"),
        r = gup("mindepth"),
        g = gup("maxdepth"),
        d = gup("orderby"),
        m = gup("limit"),
        b = gup("name").substr(0, 80),
        u = gup("sbl"),
        c = gup("pbl"),
        p = gup("zm"),
        h = gup("mt"),
        v = gup("audience"),
        y = gup("caller"),
        f = gup("dbg"),
        w = gup("evid");
    if ("IRIS" == b.substr(0, 4) && (b = "", u = "", e = -80, l = 80, t = -179, a = 179), "" != e && "" != l && "" != t && "" != a && "undefined" != e && "undefined" != l && "undefined" != t && "undefined" != a) {
        switch (globals.usingUrlParams = !0, globals.usingUrlDefaults = !1, "1" === u && (globals.dzSelBoxLocked = !0), "1" === c && (globals.platesVisible = !0), "" !== b.trim() && (globals.name = b.trim().substr(0, 70)), "" !== v.trim() && (globals.audience = v.trim()), "1" === f && (globals.dbg = !0), "" !== y && (globals.caller = y), "" !== w && (globals.evid = w), h) {
            case "sat":
                globals.mt = google.maps.MapTypeId.SATELLITE;
                break;
            case "ter":
                globals.mt = google.maps.MapTypeId.TERRAIN;
                break;
            case "hyb":
                globals.mt = google.maps.MapTypeId.HYBRID;
                break;
            case "roa":
                globals.mt = google.maps.MapTypeId.ROADMAP;
                break;
            default:
                debug("oops, invalid map type parameter of mt=" + h)
        }
        if ("" !== p) {
            var x = parseInt(p);
            isNaN(x) || x >= 1 && 13 >= x && (globals.zm = x)
        }
        return e = validLatLonStr("minlat", "lat", e, "-90."), l = validLatLonStr("maxlat", "lat", l, "90."), t = validLatLonStr("minlon", "lon", t, "-180."), a = validLatLonStr("maxlon", "lon", a, "180."), parseFloat(e) >= parseFloat(l) && (alert("Warning: invalid latitude range. Ignored."), e = "-90.", l = "90."), {
            minlat: e,
            maxlat: l,
            minlon: t,
            maxlon: a,
            starttime: o,
            endtime: n,
            maxmag: i,
            minmag: s,
            maxdepth: g,
            mindepth: r,
            orderby: d,
            limit: m
        }
    }
    return debug("warning: URL lacking valid lat lon box, using defaults instead"), globals.usingUrlParams = !1, globals.usingUrlDefaults = !0, {}
}

function updGooglePlus(e) {
    window.open("https://plus.google.com/share?url=" + e, "_blank", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")
}

function updSocialLinks() {
    var e = "",
        l = encodeURIComponent(document.title);
    if ("" != globals.shortUrl) {
        var t = "http://twitter.com/home?status=" + l + " " + globals.shortUrl;
        e = e + "<span style='display:inline'>Share map:</span><a href='http://facebook.com/sharer.php?u=" + globals.shortUrl + "&t=" + l + "' target='_blank'><img style='vertical-align:middle;' src='social/facebook.png' border='0' class='png tip' title='Facebook: Post on your wall!'alt='Facebook' /></a>", e = e + '<a href="' + t + '" target="_blank"><img style="vertical-align:middle;" src="social/twitter.png" border="0" class="png tip" title="Tweet this!" alt="Twitter" /></a>', e += "  <a  href='javascript:updGooglePlus(globals.shortUrl);' ><img style='vertical-align:middle;' width='28' height='28' class='png tip'  src='https://www.gstatic.com/images/icons/gplus-32.png' border='0' style='margin-bottom: 3px;'title='Share on Google+' alt='Share on Google+'/></a>"
    } else e = "<p>Cannot share right now.</p>";
    document.getElementById("socialLinks").innerHTML = e
}

function doNothing() {}

function downloadUrl(l, t) {
    debug("downloadUrl running");
    var a = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
    a.onreadystatechange = function() {
    	
        4 == a.readyState && (debug("doing callback"), a.onreadystatechange = doNothing, t(a, a.status), debug("finished callback"))
    }, hideMsg(), globals.limit < 5e3 ? showMsg("Busy...", !1, 0) : showMsg("Busy...     NOTE: Allow more time for large numbers of quakes.", !1, 0), e("status").style.visibility = "visible", globals.limit < 5e3 ? e("status").innerHTML = "Loading..." : e("status").innerHTML = "Loading... Large number of quakes takes longer.", debug("GET " + l), a.open("GET", l, !0), a.send(null), debug("leaving downloadUrl")
}

function validLatLonStr(e, l, t, a) {
    if (isNaN(parseFloat(t)) && isNaN(parseInt(t))) return showMsg("Warning: " + e + " of " + t + " is not a valid number. Using " + a, !1, 3), a;
    var o = parseFloat(t);
    if ("lat" === l) {
        if (o > 90 || -90 > o) return showMsg("Warning: " + e + " of " + t + " is not a valid latitude. Using " + a, !1, 3), a
    } else {
        if ("lon" !== l) return alert("validLatLonStr: logic error"), a;
        if (o > 180 || -180 > o) return showMsg("Warning: " + e + " of " + t + " is not a valid longitude. Using " + a, !1, 3), a
    }
    return t
}

function initGlobals() {
    debug("initGlobals running"), globals.map = null, globals.mapBounds = null, globals.mapZoom = null, globals.mapCenter = null, globals.detectWrapOverlay = null, globals.resetBounds = null, globals.dzSelBoxLocked = !1, globals.dzBounds = null, globals.dzZoom = null, globals.selBoxNE = null, globals.selBoxSE = null, globals.selBoxNW = null, globals.selBoxSW = null, globals.dz = null, globals.dzRect = null, globals.dzControlsDiv = null, globals.mouselatlon = null, globals.doneRefresh = !1, globals.intervals = [], globals.usingUrlParams = !1, globals.urlParams = {}, globals.usingUrlDefaults = !0, globals.urlDefaults = {
        minlat: "32",
        maxlat: "39",
        minlon: "-127",
        maxlon: "114",
        orderby: "time-desc",
        limit: "1000",
        starttime: "1970-01-01",
        endtime: "2025-01-01",
        mindepth: "0",
        maxdepth: "900",
        minmag: "0",
        maxmag: "10"
    }, globals.starttime = null, globals.endtime = null, globals.orderby = null, globals.minmag = null, globals.maxmag = null, globals.mindepth = null, globals.maxdepth = null, globals.platesVisible = !1, globals.maxlat = null, globals.maxlon = null, globals.minlat = null, globals.maxlat = null, globals.limit = null, globals.name = "", globals.audience = "", globals.caller = "", globals.zm = 2, globals.mt = google.maps.MapTypeId.TERRAIN, globals.evid = "", globals.dbg = !1, globals.evidCirc = null, globals.platesLayer = null, globals.heatLayer = null, globals.origUrl ="http://ds.iris.edu/ieb/index.html?" , globals.urlHost = globals.origUrl.host, "" !== globals.origUrl.port && "80" !== globals.origUrl.port && "0" !== globals.origUrl.port ? globals.hostAndPort = globals.origUrl.host + ":" + globals.origUrl.port : globals.hostAndPort = globals.origUrl.host, globals.baseUrl = "http://ds.iris.edu/ieb/index.html?format=text&nodata=404", globals.curUrl = "", globals.curArgs = "", globals.shortUrl = "", globals.evSignature = evtFilterSignature(), globals.evFilterAsString = "", globals.numberRegExp = new RegExp("^\\s*[-]??\\d{1,5}([.]\\d{0,5})??\\s*$"), globals.busy = !1, globals.loading = !0, globals.icons = [], globals.infoW = null, globals.markers = [], globals.quakes = [], globals.numberEventsAvailable = 0, globals.numberEventsReturned = 0, globals.invalid_ev_cnt = 0, globals.evidLatLng = null, globals.USER_AGENT = navigator.userAgent.toLowerCase(), globals.IS_OPERA = -1 != globals.USER_AGENT.indexOf("opera"), globals.IS_FIREFOX = -1 != globals.USER_AGENT.indexOf("firefox") || -1 != globals.USER_AGENT.indexOf("minefield"), globals.IS_CHROME = -1 != globals.USER_AGENT.indexOf("chrom"), globals.IS_SAFARI = -1 != globals.USER_AGENT.indexOf("safari") && !globals.IS_CHROME, globals.IS_IE = -1 != globals.USER_AGENT.indexOf("msie"), globals.IS_MAC = -1 != globals.USER_AGENT.indexOf("os x") || -1 != globals.USER_AGENT.indexOf("macintosh"), globals.IS_PC = -1 != globals.USER_AGENT.indexOf("windows"), debug("initGlobals: defining refresh() "), globals.refresh = function(e) {
        if (debug("refresh running: loading, isNewSelBox: " + globals.loading + ", " + e), globals.busy) return void debug("refresh: can't fetch, I'm busy");
        globals.loading || logMapDetails(), e && setSelBox(e);
        var l = null,
            t = null;
        try {
            debug("refresh: now busy fetching data..."), globals.busy = !0;
            t = globalsToCommonArgs(), l = "http://ds.iris.edu/ieb/ws/event/1/query/?format=text&nodata=404", l += t, debug("getting events with:\n" + l), downloadUrl(l, function(e, a) {
                if (debug("wsUrl callback running"), hideMarkers(), destroyMarkers(), globals.markers = [], globals.quakes = [], globals.numberEventsAvailable = 0, globals.numberEventsReturned = 0, globals.invalid_ev_cnt = 0, 200 !== a && 0 !== a) return debug("warning: no events returned, response code: " + a), globals.busy = !1, 404 === a ? showMsg("No matching events found. Change the Options and try again.", !1, 7) : showErr("Error getting events: " + e.statusText, 0), setNVis(), updDownloads(), void updSocialLinks();
                var o;
                o = "undefined" != typeof e && "undefined" != typeof e.responseText ? e.responseText : "";
                var n = o.trim();
                if (debug("evLines is type: " + typeof n), n = n.split("\n"), n.length < 1 && 200 === a) return debug("Logic error. No events returned but normal 200 response."), void showErr("Logic error. No events returned but normal 200 response.", 0);
                globals.numberEventsAvailable = 0;
                var s = n.shift();
                if ("string" == typeof s) {
                    var i = s.trim().split("=");
                    "undefined" != typeof i && 2 === i.length && (globals.numberEventsAvailable = parseInt(i[1]))
                }
                globals.numberEventsReturned = n.length, debug("num events avail: " + globals.numberEventsAvailable), debug("num events: " + n.length), globals.numberEventsReturned < 5 && debug("warning: < 5 events returned, proceeding anyway"), n = n.reverse();
                var r, g = 0,
                    d = null;
                globals.evidLatLng = null;
                for (var m = 0; m < n.length; m++) r = n[m].trim().split("|"), d = createMarker(r, m, g), null !== d ? (globals.markers[g] = d, g++) : globals.invalid_ev_cnt++;
                if (null === globals.evidLatLng && null !== globals.evidCirc && (globals.evidCirc.setMap(null), globals.evidLatLng = null, globals.evidCirc = null), setNVis(), globals.platesVisible && togglePlates(!0), appendIEBArgs(t), updDownloads(l), updSocialLinks(), debug("adding day/night overlay"), document.getElementById("status").style.visibility = "hidden", globals.busy = !1, globals.doneRefresh = !0, hideMsg(), ("evpage" === globals.caller || "smevlnk" === globals.caller || "spanevlnk" === globals.caller || "spanlnk" === globals.caller) && "" !== globals.evid && null !== globals.evidLatLng && null === globals.evidCirc) {
                    var b = {
                        strokeColor: "#FFFFFF",
                        strokeOpacity: 1,
                        strokeWeight: 3,
                        fillColor: "#0000FF",
                        fillOpacity: .4,
                        map: globals.map,
                        center: globals.evidLatLng,
                        radius: 1e4,
                        zIndex: 5e5
                    };
                    console.log(globals.caller), globals.evidCirc = new google.maps.Circle(b), "evpage" === globals.caller || "smevlnk" === globals.caller ? google.maps.event.addListener(globals.evidCirc, "click", function() {
                        showMsg("The quake is at the center of the blue-filled, white circle.", !1, 6)
                    }) : google.maps.event.addListener(globals.evidCirc, "click", function() {
                        showMsg("El terremoto se encuentra en el centro del c&iacute;rculo azul.", !1, 6)
                    })
                }
            })
        } catch (a) {
            globals.busy = !1, document.getElementById("eventsDisplayed").innerHTML = "" + a, debug("error: " + a)
        }
        debug("refresh finished")
    }, debug("initGlobals finished")
}

function appendIEBArgs(e) {
    debug("appendIEBArgs: running");
    var l = "";
    switch (null === e ? (debug("initting to WS args from globals (refresh was busy)"), l = globalsToCommonArgs()) : l = e, debug("will append args to: " + l), document.getElementById("curURL").style.visibility = "hidden", globals.dzSelBoxLocked && (l += "&sbl=1"), globals.platesVisible && (l += "&pbl=1"), "" !== globals.audience && (l += "&audience=" + globals.audience), "" !== globals.caller && (l += "&caller=" + globals.caller), "" !== globals.evid && (l += "&evid=" + globals.evid), globals.dbg && (l += "&dbg=1"), "" !== globals.name && l.length < 250 && (l += "&name=" + encodeURIComponent(globals.name)), l += "&zm=" + globals.map.getZoom(), globals.map.getMapTypeId()) {
        case google.maps.MapTypeId.TERRAIN:
            l += "&mt=ter";
            break;
        case google.maps.MapTypeId.HYBRID:
            l += "&mt=hyb";
            break;
        case google.maps.MapTypeId.SATELLITE:
            l += "&mt=sat";
            break;
        case google.maps.MapTypeId.ROADMAP:
            l += "&mt=roa";
            break;
        default:
            l += "&mt=ter"
    }
    globals.curArgs = l, globals.curUrl = globals.baseUrl + l, "function" == typeof window.history.replaceState ? window.history.replaceState({}, "update bookmark", globals.curUrl) : showMsg("This browser cannot update the URL...", !1, 1), makeURLShortenRequest()
}

function makeURLShortenRequest() {
    debug("makeURLShortenRequest running"), downloadUrl("urls/create.php?url=" + encodeURIComponent(window.location.href), gotShortUrl)
}

function gotShortUrl(e) {
    var l = e.responseText;
    globals.shortUrl = l, updSocialLinks(), hideMsg()
}

function updSpans(e) {
    globals.latSpan = e.toSpan().lat(), globals.lonSpan = e.toSpan().lng()
}

function load() {
    function l() {
        var l = e("depthscale"),
            t = e("magscale"),
            a = e("platesLegend"),
            o = e("controls_text"),
            n = e("sidebar"),
            s = e("latlon_info"),
            i = getWindowWidth();
        "visible" == n.style.visibility || "" == n.style.visibility ? (n.style.visibility = "hidden", n.style.display = "none", l.style.visibility = "hidden", t.style.visibility = "hidden", s.style.visibility = "hidden", globals.platesVisible && (a.style.visibility = "hidden"), e("mapDiv").style.width = i + "px", e("greyMapDiv").style.width = e("mapDiv").style.width, o.innerHTML = "< Options") : (n.style.visibility = "visible", n.style.display = "block", l.style.visibility = "visible", t.style.visibility = "visible", s.style.visibility = "visible", globals.platesVisible && (a.style.visibility = "visible"), e("mapDiv").style.width = i - 230 + "px", e("greyMapDiv").style.width = e("mapDiv").style.width, o.innerHTML = "Options >"), window.dispatchEvent(new Event("resize")), globals.dzSelBoxLocked && zoomToRegion()
    }
    debug("---- begin load"), "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), document.getElementsByName("evtFilterForm")[0].reset(), initGlobals(), globals.urlParams = getUrlParams(), globalsToEvtFilter(), toggleCheckBoxes(), handleResize();
    var t = {
        zoom: globals.zm,
        zoomControl: !0,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        scaleControl: !0,
        streetViewControl: !1,
        overviewMapControl: !1,
        panControl: !1,
        rotateControl: !1,
        scrollwheel: !1,
        minZoom: 1,
        maxZoom: 13,
        mapTypeControl: !0,
        mapTypeId: globals.mt,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP],
            style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        }
    };
    globals.map = new google.maps.Map(e("mapDiv"), t), globals.usingUrlParams && "" !== globals.name ? resetTitle(globals.name) : resetTitle(), setSelBox(!1), debug("centering map");
    var a = globals.selBoxNW.lng(),
        o = globals.selBoxNE.lng(),
        n = globals.selBoxNW.lat(),
        s = globals.selBoxSW.lat();
    a > o && (o += 360), globals.map.setCenter(new google.maps.LatLng((n + s) / 2, (a + o) / 2)), globals.map.setZoom(globals.map.fitBounds(new google.maps.LatLngBounds(globals.selBoxSW, globals.selBoxNE))),
        google.maps.event.addListener(globals.map, "click", function(e) {
            null !== globals.infoW && (globals.infoW.close(), globals.infoW = null)
        }), addWorldControl();
    var i = [];
    i.push(new DepthRange(0, 33)), i.push(new DepthRange(33, 70)), i.push(new DepthRange(70, 150)), i.push(new DepthRange(150, 300)), i.push(new DepthRange(300, 500)), i.push(new DepthRange(500, 800));
    var r = [];
    r.push(new Magnitude(9)), r.push(new Magnitude(8)), r.push(new Magnitude(7)), r.push(new Magnitude(6)), r.push(new Magnitude(5)), r.push(new Magnitude(4)), r.push(new Magnitude(3)), r.push(new Magnitude(2)), r.push(new Magnitude(1));
    for (var g = 0; g < r.length; g++)
        for (var d = 0; d < i.length; d++) {
            var m = new DepthMagIconFactory(r[g], i[d]);
            globals.icons.push(m)
        }
    google.maps.event.addListener(globals.map, "idle", function() {
        globals.mapBounds = globals.map.getBounds(), globals.mapZoom = globals.map.getZoom(), globals.mapCenter = globals.map.getCenter();
        var e = setNVis();
        globals.dzSelBoxLocked ? (globals.doneRefresh || globals.refresh(!1), globals.markers.length > 0 && (!globals.mapBounds.intersects(globals.dzBounds) || 0 == e) ? showMsg("To return to selected earthquakes, click Zoom to Region or zoom out. ", !1, 0) : hideMsg()) : (globals.markers.length > 0 && 0 == e ? showMsg("To find earthquakes zoom out, or change Options and press Apply. ", !1, 0) : hideMsg(), null === globals.infoW && globals.refresh(!0))
    }), globals.mouselatlon = document.getElementById("mouselatlng"), google.maps.event.addListener(globals.map, "mousemove", function(e) {
        var l = "Cursor: " + e.latLng.lat().toFixed(1) + ", " + e.latLng.lng().toFixed(1);
        globals.mouselatlon.innerHTML = l
    }), google.maps.event.addListener(globals.map, "mouseout", function(e) {
        document.getElementById("mouselatlng").innerHTML = ""
    }), window.setTimeout(function() {
        globals.resetBounds = globals.mapBounds, showSelBoxControls(), globals.dzSelBoxLocked ? showSelBoxRect() : (document.getElementById("dzSelBoxDeselect").style.display = "none", document.getElementById("dzSelBoxDeselect").style.visibility = "hidden", document.getElementById("dzSelBoxZoomTo").style.display = "none", document.getElementById("dzSelBoxZoomTo").style.visibility = "hidden"), "" !== globals.evid && null !== globals.evidLatLng && null !== globals.evidCirc && ("spanevlnk" === globals.caller || "spanlnk" === globals.caller ? showMsg("El terremoto se encuentra en el centro del c&iacute;rculo azul.", !1, 6) : showMsg("The quake is at the center of the blue-filled, white circle.", !1, 6))
    }, 2500), globals.usingUrlParams = !1;
    for (var g = 0; g < globals.intervals.length; g++) window.clearInterval(globals.intervals[g]);
    if (globals.intervals = [], globals.intervals.push(window.setInterval("greyMapIfEvtFltChanged()", 1500)), e("irisIcon").ondragstart = function() {
            return !1
        }, e("iebLogo").ondragstart = function() {
            return !1
        }, e("title").onclick = getAndSetName, e("controls_text").onclick = l, globals.IS_IE && "self" !== globals.caller ? alert("IEB works best with Chrome, Firefox or Opera Next.\nInternet Explorer may be unresponsive\nor not work quite right.") : globals.IS_MAC && !(globals.IS_FIREFOX || globals.IS_CHROME || globals.IS_SAFARI || globals.IS_OPERA) & "self" !== globals.caller && alert("IEB works best with Safari, Chrome, Firefox or Opera Next."), "epo" === globals.audience) {
        var b = e("max_display_selector"),
            u = document.createElement("OPTION");
        u.id = "m10000", u.setAttribute("value", "10000"), u.innerHTML = "10000", b.appendChild(u), u = document.createElement("OPTION"), u.id = "m20000", u.setAttribute("value", "20000"), u.innerHTML = "20000", b.appendChild(u)
    }
    initializeTools(globals.map), globals.loading = !1, debug("---- end load")
}

function getAndSetName() {
    globals.dzSelBoxLocked && zoomToRegion();
    var e = "",
        l = "" !== globals.name ? globals.name : "";
    e = "" !== globals.name ? "Enter a new name for this view,\nor enter nothing to remove current one." : "Enter a name for this view.";
    var t = window.prompt(e, l);
    null !== t && (t = t.trim(), t = t.replace("&", "and"), "" === t ? resetTitle() : resetTitle(t), appendIEBArgs(null))
}

function getIcon(e, l) {
    for (var t = 0; t < globals.icons.length; t++)
        if (globals.icons[t].inRange(e, l)) return globals.icons[t].icon;
    return debug("OOPS: no icon for mag,depth: " + e + "," + l), null
}

function zoomToRegion() {
    setSelBox(!0), globals.map.fitBounds(globals.dzBounds), globals.map.panBy(-40, 0)
}

function resetTitle(l) {
    var t = "IRIS Earthquake Browser";
    ("spanevlnk" == globals.caller || "spanlnk" == globals.caller) && (t = "Navegador de Terremotos", document.getElementById("usage").innerHTML = '<a class="links" style="text-align:left;position:relative;top:-20px;border:2px solid red;font-size:0.9em;padding:0px;" href="help/index.es.html" target="iebHelp">Ayuda<br>en esp.</a>');
    var a = e("title");
    if ("undefined" == typeof l || "" === l.trim()) globals.name = "", a.innerHTML = t, document.title = t;
    else {
        globals.name = l.trim();
        var o = globals.name,
            o = globals.name;
        o = o.length > 35 ? "<span style='font-size: 0.4em;'>" + o + "</span>" : o.length > 25 ? "<span style='font-size: 0.6em;'>" + o + "</span>" : o.length > 20 ? "<span style='font-size: 0.8em;'>" + o + "</span>" : "sm" == globals.caller ? "<span style='font-size: 0.8em;'>" + o + "</span>" : "<span>" + o + "</span>", a.innerHTML = t + " - " + o, document.title = t + " - " + globals.name.substr(0, 45)
    }
}

function resetMapBounds(e) {
    stopAnimation();
    e ? globals.map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(-90, -180), new google.maps.LatLng(90, 180))) : globals.map.fitBounds(globals.resetBounds), resetTitle()
}

function dzSelBoxUnlock() {
    stopAnimation();
    deleteTheShape(), globals.dzSelBoxLocked = !1, globals.dzRect.setMap(null), document.getElementById("dzSelBoxDeselect").style.display = "none", document.getElementById("dzSelBoxDeselect").style.visibility = "hidden", document.getElementById("dzSelBoxZoomTo").style.display = "none", document.getElementById("dzSelBoxZoomTo").style.visibility = "hidden", resetTitle(), globals.mapBounds.intersects(globals.dzBounds) || resetMapBounds(), globals.loading = !1, globals.refresh(!0)
}

function newRegion() {
    globals.dzRect, showMsg("Drag across region or use ESC key to cancel...", !1, 6), drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE)
}

function showSelBoxControls() {
    if (null === globals.dzControlsDiv) {
        var e = document.createElement("DIV");
        e.id = "dzControlsDiv";
        var l = document.createElement("A");
        l.id = "dzSelBoxSelect", l.className = "dzSelBoxLinks notselectable", l.innerHTML = "Select New Region", l.setAttribute("href", "javascript:newRegion();"), l.setAttribute("title", "Press, then drag across map to select (and lock) a region.");
        var t = document.createElement("A");
        t.id = "dzSelBoxDeselect", t.className = "dzSelBoxLinks notselectable", t.innerHTML = "Deselect Region", t.setAttribute("href", "javascript:dzSelBoxUnlock();"), t.setAttribute("title", "Press to deselect and unlock the region.");
        var a = document.createElement("A");
        a.id = "dzSelBoxZoomTo", a.className = "dzSelBoxLinks notselectable", a.setAttribute("href", "javascript:zoomToRegion();"), a.setAttribute("title", "Press to zoom to and center the region."), a.innerHTML = "Zoom to Region", e.appendChild(l), e.appendChild(t), e.appendChild(a), globals.map.controls[google.maps.ControlPosition.LEFT].push(e), globals.dzControlsDiv = e
    }
    null !== document.getElementById("dzSelBoxDeselect") && (document.getElementById("dzSelBoxDeselect").style.visibility = "visible", document.getElementById("dzSelBoxDeselect").style.display = "block", document.getElementById("dzSelBoxZoomTo").style.visibility = "visible", document.getElementById("dzSelBoxZoomTo").style.display = "block")
}

function createMarker(e, l, t) {
    if ("object" != typeof e || 14 !== e.length) return debug(e[0]), null;
    var a = e[1],
        o = a.split("T"),
        n = o[0],
        s = o[1],
        i = e[0],
        r = parseInt(i),
        g = e[2],
        d = parseFloat(g),
        m = e[3],
        b = parseFloat(m),
        u = e[5],
        c = parseFloat(u),
        p = e[11],
        h = parseFloat(p),
        v = e[13];
    if (i.length > 0 && isNaN(r) && (debug('warning: evid of "' + i + '" not valid number'), i = "", globals.evid = ""), isNaN(d) || isNaN(b) || isNaN(h) || isNaN(c)) return debug("invalid mag, depth, lat or lon: " + p + ", " + u + ", " + g + ", " + m), null;
    var y = new google.maps.LatLng(g, m),
        f = c;
    u > 800 ? f = 800 : 0 > u && (f = 0);
    var w = h;
    1 > p ? w = 1 : p > 9 && (w = 9);
    var x = getIcon(w, f),
        k = new Quake(i, n, s, d, b, c, h, v, t);
    globals.quakes[t] = k;
    var E = new google.maps.Marker({
        position: y,
        map: globals.map,
        icon: x,
        flat: !0,
        optimized: !0,
        title: k.toString(),
        zIndex: t
    });
    return "" !== globals.evid && i == globals.evid && (globals.evidLatLng = y), google.maps.event.addListener(E, "click", showInfoWindow), E
}

function hiLiteMarker(e, l) {
    globals.markers[e].setAnimation(google.maps.Animation.BOUNCE), l.bgColor = "orange"
}

function unHiLiteMarker(e, l) {
    globals.markers[e].setAnimation(null), l.bgColor = "white"
}

function zoomToMarker(e) {
    var l = globals.markers[e].getPosition(),
        t = l.lat(),
        a = l.lng();
    globals.map.setCenter(new google.maps.LatLng(t, a)), globals.map.setZoom(8), debug("zoomToMarker ran")
}

function zoomToMarkers(e, l) {
    debug("zoomToMarkers: running");
    for (var t, a, o = getNClosestMarkerDists(e, l), n = globals.markers[e].getPosition(), s = new google.maps.LatLngBounds(n, n), i = 0; i < o.length; i++) n = globals.markers[o[i].z].getPosition(), t = n.lat(), a = n.lng(), s.extend(new google.maps.LatLng(t, a));
    globals.map.fitBounds(s)
}

function getNClosestMarkerDists(e, l) {
    for (var t = globals.markers[e].getPosition(), a = new Array(globals.markers.length), o = 0; o < globals.markers.length; o++) a[o] = {
        z: globals.markers[o].zIndex,
        dist: google.maps.geometry.spherical.computeDistanceBetween(t, globals.markers[o].getPosition()) / 1e3
    };
    return a.sort(function(e, l) {
        return e.dist - l.dist
    }), a.slice(0, l)
}

function showInfoWindow(e) {
    var l, t, a, o, n, s = 10;
    if (n = this.zIndex, !(google && google.maps && google.maps.geometry && google.maps.geometry.spherical)) return void showMsg("Hold on a sec, still loading...", !1, 1);
    for (var i = getNClosestMarkerDists(n, s), r = [], g = 0; g < i.length; g++) r.push({
        quake: globals.quakes[i[g].z],
        d: i[g].dist
    });
    if (0 !== r.length) {
        var d = "<div id='nearbyEventsWindow'><table border='1'><thead><tr><td>&nbsp;Mag&nbsp;</td><td>&nbsp;Depth<br>&nbsp;km</td><td>&nbsp;Day&nbsp;</td><td>&nbsp;Time<br>&nbsp;UTC</td><td>&nbsp;Lat</td><td>&nbsp;Lon</td><td>&nbsp;Dist<br>&nbsp;km</td>";
        "epo" === globals.audience && (d += "<td>&nbsp;Explore&nbsp;</td>"), d += "</tr></thead><tbody id='nearEvtsTableBody'>\n";
        for (var m = "http://www.iris.washington.edu/seismon/eventlist/showProductsBeta.phtml?", b = "", u = 0; u < r.length && !(u >= s); u++) l = r[u].quake, t = Math.floor(r[u].d), a = n === l.zIndex ? !0 : !1, o = "", a && (o = " style='color: navy;  background-color: lightgrey;'"), l.valid || (o = " style='color: navy;  background-color: lightred;'"), b = m + "eid=" + l.evid + "&day=" + l.day + " " + l.time + "&lon=" + roundNumber(l.lng, 2) + "&lat=" + roundNumber(l.lat, 2) + "&mag=" + l.mag + "&rgn=" + l.rgn, d += "<tr" + o + " onmouseover = 'javascript:hiLiteMarker(" + l.zIndex + ", this);'  onmouseout = 'javascript:unHiLiteMarker(" + l.zIndex + ", this);' ><td>&nbsp;" + l.mag + "&nbsp;</td><td>&nbsp;" + l.depth + "&nbsp;</td><td>&nbsp;" + l.day + "&nbsp;</td><td>&nbsp;" + l.time + "&nbsp;</td><td>&nbsp;" + roundNumber(l.lat, 2) + "&nbsp;</td><td>&nbsp;" + roundNumber(l.lng, 2) + "&nbsp;</td><td class='right'>&nbsp;" + t + "&nbsp;</td>", "epo" === globals.audience && (d += "<td>&nbsp; <a href=\"javascript:window.open('" + b + "', 'prodsWin');\">here</a>&nbsp;</td>"), d += "</tr>\n";
        var c = "epo" === globals.audience ? 8 : 7;
        d += s > u ? "<tr><td style='text-align:left;' colspan='" + c + "'>Closest " + s + " (of " + r.length + ") quakes shown." : "<tr><td style='text-align:left;' colspan='" + c + "'>Closest " + r.length + " quakes shown.", d += "&nbsp;&nbsp;<button type='button' id='zbtn' onclick='javascript:zoomToMarkers(" + n + "," + s + ");'>Zoom to this vicinity</button>", d += "</td></tr></tbody>", d += "</table>", d += "</div>", null !== globals.infoW && (globals.infoW.close(), globals.infoW = null), globals.infoW = new google.maps.InfoWindow, globals.infoW.setContent(d), globals.infoW.open(globals.map, this), google.maps.event.addListener(globals.infoW, "closeclick", function() {
            globals.infoW = null
        })
    }
}

function hideMarkers() {
    for (var e = 0; e < globals.markers.length; e++) globals.markers[e].setVisible(!1)
}

function destroyMarkers() {
    for (var e = 0; e < globals.markers.length; e++) globals.markers[e].setMap(null)
}

function showMarkers() {
    for (var e = 0; e < globals.markers.length; e++) globals.markers[e].setVisible(!0)
}

function showNextMarker() { //curM>0&&globals.markers[curM-1].setVisible(!1),

    globals.markers[curM].setVisible(!0), showTitle ? mc.innerText = "#" + (curM + 1) + ": " + globals.markers[curM].title : mc.innerText = "#" + (curM + 1), curM++, curM > globals.markers.length - 1 && stopAnimation()
}

function animateMarkers() {
    mc = e("mcount"), mc.style.visibility = "visible", hideMarkers(), intvId = self.setInterval("showNextMarker()", intvTimeMs)
}

function stopAnimation() {
    intvId = window.clearInterval(intvId), curM = 0, showMarkers()
}

function showSelBoxRect() {
    null !== globals.dzRect && globals.dzRect.setMap(null), globals.dzRect = new google.maps.Rectangle({
        bounds: globals.dzBounds,
        editable: !1,
        clickable: !1,
        draggable: !1,
        map: globals.map,
        strokeWeight: 2,
        strokeColor: "blue",
        fillOpacity: .1
    })
}

function getNearbyQuakes(e, l) {
    for (var t, a, o, n, s = e.latLng.lat(), i = e.latLng.lng(), r = [], g = 0, d = 0; d < globals.quakes.length; d++) {
        o = globals.quakes[d].lat, n = globals.quakes[d].lng;
        0 > n && i > 0 && (n += 360), t = Math.abs(o - s), a = Math.abs(n - i), l >= t && l >= a && (r[g++] = globals.quakes[d])
    }
    return debug("getNearbyQuakes: N quakes: " + g), r
}

function MyMapOverlay() {}

function mapWraps() {
    null !== globals.detectWrapOverlay && globals.detectWrapOverlay.setMap(null), globals.detectWrapOverlay = new MyMapOverlay, globals.detectWrapOverlay.setMap(globals.map);
    var e = globals.detectWrapOverlay.getProjection(),
        l = document.getElementById("mapDiv"),
        t = l.clientWidth,
        a = 0;
    e && (a = e.getWorldWidth());
    var o = !1;
    return a > 0 && t > a && (o = !0), o
}

function logMapDetails() {
    var e, l = globals.map.getBounds(),
        t = globals.map.getCenter(),
        a = l.getNorthEast().lng().toFixed(3),
        o = l.getSouthWest().lng().toFixed(3),
        n = l.getNorthEast().lat().toFixed(3),
        s = l.getSouthWest().lat().toFixed(3),
        i = l.toSpan(),
        r = i.lng().toFixed(4),
        g = i.lat().toFixed(4),
        d = mapWraps();
    e = d ? !0 : o > 0 && 0 > a ? !0 : !1;
    var m = ((l.getNorthEast().lng() + 360 + l.getSouthWest().lng()) / 2).toFixed(2);
    m > 180 && (m -= 360);
    var b = "sw=(" + s + "," + o + ") ne=(" + n + "," + a + ") dimensions=" + (l.getNorthEast().lat() - l.getSouthWest().lat()).toFixed(2) + "x" + (l.getNorthEast().lng() + 360 - l.getSouthWest().lng()).toFixed(2) + " bounds-center=(" + ((l.getNorthEast().lat() + l.getSouthWest().lat()) / 2).toFixed(2) + "," + m + ") getCenter=(" + t.lat().toFixed(2) + "," + t.lng().toFixed(2) + ")";
    b += ", wrapping=" + d, b += ", date line=" + e, b += ", deg span=(" + g + "x" + r + ")", debug(b)
}

function addWorldControl() {
    var e = document.createElement("DIV");
    e.id = "worldControlDiv";
    var l = document.createElement("IMG");
    l.id = "worldIconImg", l.setAttribute("src", "imgs/world.32x32.png"), l.setAttribute("width", "16px"), l.setAttribute("height", "16px"), l.style.background = "white", l.style.marginLeft = "9px", l.style.border = "2px", l.style.borderColor = "silver", l.style.borderStyle = "none outset outset none", l.title = "Zoom out to world", google.maps.event.addDomListener(l, "click", function() {
        resetMapBounds(!0)
    }), e.appendChild(l), globals.map.controls[google.maps.ControlPosition.LEFT].push(e)
}

function setNVis() {
    var e = 0,
        l = document.getElementById("eventsVisible"),
        t = document.getElementById("eventsDisplayed");
    if (t.innerHTML = "Earthquake Count:<br>" + globals.numberEventsReturned + " of " + globals.numberEventsAvailable, null !== globals.mapBounds)
        for (var a = 0; a < globals.markers.length; a++) globals.mapBounds.contains(globals.markers[a].getPosition()) && e++;
    l.contentEditable = "true", l.innerHTML = "(" + e + " visible)";
    var o = document.getElementById("invalidEvents");
    return globals.invalid_ev_cnt > 0 ? (o.style.display = "inline", o.style.visibility = "visible", o.innerHTML = "(" + globals.invalid_ev_cnt + " of " + globals.numberEventsReturned + " were invalid)") : (o.style.display = "none", o.style.visibility = "hidden"), e
}

function showPHTMLTable() {
    debug("showPHTMLTable: running");
    var e = "IEB export: " + globals.quakes.length + " earthquakes as a sortable table.",
        l = globals.evFilterAsString,
        t = "" !== globals.name ? "&rgn=" + encodeURIComponent(globals.name.substr(0, 50)) : "",
        a = shortenUrl("evtable.phtml?caller=IEB" + globals.curArgs + t + "&title=" + encodeURIComponent(e) + "&stitle=" + encodeURIComponent(l));
    debug("after shortening url is: " + a);
    var o = window.open(a, "tableWindow", tableWindowFeatures);
    o.focus()
}

function updDownloads() {
    updSpans(globals.dzSelBoxLocked ? globals.dzBounds : globals.mapBounds);
    var l;
    l = globals.latSpan < 1 && globals.lonSpan < 1 ? "&sz=tiny" : globals.latSpan < 5 && globals.lonSpan < 5 ? "&sz=small" : globals.latSpan < 30 || globals.lonSpan < 30 ? "&sz=med" : globals.latSpan < 50 || globals.lonSpan < 50 ? "&sz=large" : globals.latSpan < 90 || globals.lonSpan < 180 ? "&sz=huge" : globals.latSpan >= 90 || globals.lonSpan >= 180 ? "&sz=enormous" : "";
    for (var t = (shortenUrl("/3dv_dev/index.html?caller=IEB" + globals.curArgs + l), shortenUrl("/3dv/index.html?caller=IEB" + globals.curArgs + l)), a = e("downloads"); a.hasChildNodes();) a.removeChild(a.lastChild);
    if (a.innerHTML = "Open:", globals.numberEventsReturned <= 5) {
        var o = document.createElement("SPAN");
        return o.className = "small_italics", o.innerHTML = " (need more events)", void a.appendChild(o)
    }
    var n = document.createElement("A");
    n.className = "links", n.setAttribute("href", "javascript:showPHTMLTable();"), n.setAttribute("title", "View as table and download as Excel or NetCDF files"), n.innerHTML = "Other formats", a.appendChild(n), n = document.createElement("A"), n.className = "links", n.setAttribute("href", t), n.setAttribute("target", "_blank"), n.id = "threedv", n.setAttribute("title", "Rotate and zoom current earthquakes in a 3D viewer"), n.innerHTML = "3D View", a.appendChild(n)
}

function shortenUrl(e) {
    var l = e.replace("starttime", "st");
    return l = l.replace("endtime", "et"), l = l.replace("orderby", "ob"), l = l.replace("limit", "li"), l = l.replace("maxlat", "xla"), l = l.replace("maxlon", "xlo"), l = l.replace("minlat", "nla"), l = l.replace("minlon", "nlo"), l = l.replace("minmag", "nma"), l = l.replace("maxmag", "xma"), l = l.replace("mindepth", "nde"), l = l.replace("maxdepth", "xde")
}

function addHeatLayer() {
    var e, l;
    l = [];
    for (var t = 0; t < globals.markers.length; t++) l.push(globals.markers[t].position);
    e = new google.maps.MVCArray(l), globals.heatLayer = new google.maps.visualization.HeatmapLayer({
        data: e
    }), globals.heatLayer.setMap(globals.map)
}

function toggleHeatmap() {
    globals.heatLayer.setMap(globals.heatLayer.getMap() ? null : globals.map)
}

function changeGradient() {
    var e = ["rgba(0, 255, 255, 0)", "rgba(0, 255, 255, 1)", "rgba(0, 191, 255, 1)", "rgba(0, 127, 255, 1)", "rgba(0, 63, 255, 1)", "rgba(0, 0, 255, 1)", "rgba(0, 0, 223, 1)", "rgba(0, 0, 191, 1)", "rgba(0, 0, 159, 1)", "rgba(0, 0, 127, 1)", "rgba(63, 0, 91, 1)", "rgba(127, 0, 63, 1)", "rgba(191, 0, 31, 1)", "rgba(255, 0, 0, 1)"];
    globals.heatLayer.setOptions({
        gradient: globals.heatLayer.get("gradient") ? null : e
    })
}

function changeRadius() {
    globals.heatLayer.setOptions({
        radius: globals.heatLayer.get("radius") ? null : 20
    })
}

function changeOpacity() {
    globals.heatLayer.setOptions({
        opacity: globals.heatLayer.get("opacity") ? null : .2
    })
}

function updateSelectBox(e) {
    return debug("selection drag ended: " + e), e.isEmpty() ? (debug("empty bounds from KeyDragZoom"), void showErr("Selection was empty. If this persists, close the window and reopen fresh.", 3)) : (updSpans(e), globals.latSpan <= 0 || globals.lonSpan <= 0 ? (debug("Safari BUG: zero sized bounds span from (corrupted?) KeyDragZoom"), void showErr("IEB may be corrupted. If this persists, close and reopen the window or browser.", 8)) : globals.latSpan < .03 || globals.lonSpan < .05 ? void showErr("Selection size of (lat, lng)=(" + globals.latSpan.toPrecision(4) + ",  " + globals.lonSpan.toPrecision(3) + ") is too small. Try again.", 3) : (globals.dzSelBoxLocked = !0, globals.dzBounds = e, globals.dzZoom = globals.map.getZoom(), showSelBoxRect(), showSelBoxControls(), globals.mapBounds = globals.map.getBounds(), globals.map.mapZoom = globals.map.getZoom(), globals.map.mapCenter = globals.map.getCenter(), resetTitle(), globals.loading = !1, void globals.refresh(!0)))
}
var msgTimeout, parseXml;
if ("undefined" != typeof window.DOMParser) parseXml = function(e) {
    return (new window.DOMParser).parseFromString(e, "text/xml")
};
else {
    if ("undefined" == typeof window.ActiveXObject || !new window.ActiveXObject("Microsoft.XMLDOM")) throw showErr("error: no XML parser found.", 0), new Error("No XML parser found");
    parseXml = function(e) {
        var l = new window.ActiveXObject("Microsoft.XMLDOM");
        return l.async = "false", l.loadXML(e), l
    }
}
var globals = {},
    curM = 0,
    intvId = 0,
    mc, showTitle = !1,
    intvTimeMs = 30;
MyMapOverlay.prototype = new google.maps.OverlayView, MyMapOverlay.prototype.onAdd = function() {}, MyMapOverlay.prototype.draw = function() {}, MyMapOverlay.prototype.onRemove = function() {};
var tableWindow, tableWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";