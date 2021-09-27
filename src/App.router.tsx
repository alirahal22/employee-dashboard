import React from "react";
import { Result } from "antd";
import { Router, Route, Switch, Redirect } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";

import { history, RootState } from "&store/store";
import { ProtectedRoute } from "&route/protectedRoute";
import { PrimaryButton } from "&styled/button/button.component";
import { LoginComponent } from "&features/login/login.component";

import { DepartmentsComponent } from "&features/departments/departments.component";
import { AccountComponent } from "&features/account/account.component";
import { BranchesComponent } from "&features/branches/branches.component";
import { EmployeesComponent } from "&features/employees/employees.component";

type ReduxProps = ConnectedProps<typeof connector>;

const AppRouter = (props: ReduxProps) => {
  const { isAuthenticated } = props;
  const { t } = useTranslation(["app"]);

  return (
    <Router history={history}>
      {/* App main routing switch */}
      <Switch>
        <ProtectedRoute
          exact
          path="/login"
          component={LoginComponent}
          validator={!isAuthenticated}
          fallBack="/"
        />

        <ProtectedRoute
          exact
          path="/"
          component={DepartmentsComponent}
          validator={isAuthenticated}
          fallBack="/login"
        />

        <ProtectedRoute
          exact
          path="/branches"
          component={BranchesComponent}
          validator={isAuthenticated}
          fallBack="/login"
        />

        <ProtectedRoute
          exact
          path="/employees"
          component={EmployeesComponent}
          validator={isAuthenticated}
          fallBack="/login"
        />

        <ProtectedRoute
          exact
          path="/account"
          component={AccountComponent}
          validator={isAuthenticated}
          fallBack="/login"
        />

        <Route
          path="/404"
          render={() => (
            <Result
              status="404"
              title="404"
              subTitle={t("common:_404")}
              extra={
                <PrimaryButton block={false} onClick={() => history.push("/")}>
                  {t("common:BACK")}
                </PrimaryButton>
              }
            />
          )}
        />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.login.isLoggedIn,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRouteRedux = connector(AppRouter);

export { AppRouteRedux as AppRouter };
