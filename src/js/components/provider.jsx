import React from "react"
import PropTypes from "prop-types"

export class Provider extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
    }

    constructor(...params) {
        super(...params)
    }

    componentWillMount() {
        const { store } = this.props
        this._unsub = store.listen( (s) => {
            this.forceUpdate()
        })
    }
    
    componentWillReceiveProps(newProps) {
        const { store } = this.props
        store.onNewProps && store.onNewProps(newProps)
    }

    componentWillUnmount() {
        this._unsub && this._unsub()
    }

    render() {
        const { store, children, transform, ...other } = this.props
        const transformed = transform ? transform( store.state) :  store.state
        const onlyChild = React.Children.only(children)
        return React.cloneElement(onlyChild, { ...transformed, ...other})
    }
}
