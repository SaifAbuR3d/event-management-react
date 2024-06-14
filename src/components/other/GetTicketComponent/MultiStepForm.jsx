import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import FormNavigation from "./TicketFormNavigation";
import Stepper from "@mui/material/Stepper";
import { Step, StepLabel } from "@mui/material";

export default function MultiStepForm({
  children,
  initialValues,
  onSubmit,
  totalAmount,
  order,
  fromGetTicket,
  clearOrder,
  submitPending,
}) {
  const [stepNumber, setStepNumber] = useState(0);
  const [snapShot, setSnapShot] = useState(initialValues);
  const steps = React.Children.toArray(children); //FormStepComponent

  const step = steps[stepNumber];
  const totalSteps = steps.length;

  const next = (values) => {
    setSnapShot(values);
    setStepNumber(stepNumber + 1);
  };

  const previous = (values) => {
    setSnapShot(values);
    setStepNumber(stepNumber - 1);
  };

  const isLastStep = stepNumber === totalSteps - 1;
  const isPenultimateStep = stepNumber === totalSteps - 2;

  const handelSubmit = async (values, actions) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };
  return (
    <Formik
      initialValues={snapShot}
      onSubmit={handelSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form autoComplete={"off"}>
          {!fromGetTicket && (
            <Stepper activeStep={stepNumber} alternativeLabel sx={{ mb: 2 }}>
              {steps.map((currentStep) => {
                const label = currentStep.props.stepName;
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          )}
          {step}
          {fromGetTicket && (
            <FormNavigation
              submitPending={submitPending}
              clearOrder={clearOrder}
              order={order}
              totalAmount={totalAmount}
              isLastStep={isLastStep}
              isPenultimateStep={isPenultimateStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
          )}
        </Form>
      )}
    </Formik>
  );
}

export const FormStep = ({ stepName = "", children }) => children;
