import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {CARDS_ROUTE} from "../utils/consts";
import {AllRoutes} from "../utils/routes";

const AppRouter = () => {

    return   <Switch>
                {AllRoutes.map(({path, Component}) =>
                    <Route path={path} component={Component}  key={path} />
                )}
                <Redirect to={CARDS_ROUTE}/>
            </Switch>

}

export default AppRouter;