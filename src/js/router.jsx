"use strict"

import React from "react"
import PropTypes from "prop-types"
import {
	Router, Route, hashHistory,
	IndexRoute, browserHistory,
	IndexRedirect,
	Redirect,
	Switch,
	withRouter,
} from "react-router"

import { BrowserRouter } from "react-router-dom"
import { PropsRoute } from "./components/propsRoute.jsx"
import { navigateToAction } from "./actions/navigateToAction.jsx"
import { Provider } from "./components/provider.jsx"
import { Overview } from "./views/overview.jsx"

@withRouter
export class SiteRoot extends React.Component {
	constructor(...params) {
		super(...params)
	}

	componentWillMount() {
		const { history } = this.props
		this._unsub = navigateToAction.listen( (to) => {
			history.push(to)
		})
	}

	componentWillUnmount() {
		this._unsub && this._unsub()
	}

	render() {
		const { ...other } = this.props
		return (
			<div>
				<Switch>
					<PropsRoute
						path="/"
						{...other}
						component={Overview}
					/>
				</Switch>
			</div>
		)
	}
}