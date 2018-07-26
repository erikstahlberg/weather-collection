import "babel-polyfill"
import moment from "moment-timezone"
import React from "react"
import { render } from "react-dom"
import { SiteRoot } from "./router.jsx"
import { BrowserRouter } from "react-router-dom"
import "../css/app.less"

moment.tz.setDefault("Europe/Stockholm")
const domNode = document.getElementById("root")
domNode.classList.add("loaded")

const loadingCurtain = document.getElementById("curtain")
loadingCurtain.classList.add("loaded")

const preload = document.getElementById("preload")

const smhiREST = fetch("https://opendata-download-ocobs.smhi.se/api/version/latest/parameter/4.json")
.then((result) => {
	console.log("REST", result.station)
})

setTimeout(() => {
	loadingCurtain.remove()
	preload.remove()
}, 1000)

render(
	<BrowserRouter>
		<SiteRoot />
	</BrowserRouter>
, domNode)
