import React from "react";
import { push } from "redux-first-history";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "&store/store";
import { PrimaryButton } from "&styled/button/button.component";

type ReduxProps = ConnectedProps<typeof connector>;

const LandingComponent = ({ push }: ReduxProps) => {
  return (
    <>
      <h1>Landing</h1>
      <h3>This page is for non-authenticated users</h3>
      <PrimaryButton
        block={false}
        onClick={() => {
          push("/login");
        }}
      >
        Log in
      </PrimaryButton>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
});

const mapDispatchToProps = {
  push,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const LandingComponentRedux = connector(LandingComponent);

export { LandingComponentRedux as LandingComponent };
