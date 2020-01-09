import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
    return import("./containers/Checkout/Checkout")
});

const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth")
});

const Orders = React.lazy(() => {
    return import("./containers/Orders/Orders")
});

class App extends Component {
    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render () {
        let routes = (
            <Switch>
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" render={(props) => <Checkout {...props} />} />
                    <Route path="/orders" render={(props) => <Orders {...props} />} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" render={(props) => <Checkout {...props} />} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    <Suspense fallback={<p>Loading...</p>}>
                        {routes}
                    </Suspense>
                </Layout>
            </div>
        );
    }
}

const mapStateToProp = state => ({
    isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = (dispatch) => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(App));
