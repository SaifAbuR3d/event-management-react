import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import FormNavigation from "./FormNavigation";
import Stepper from "@mui/material/Stepper";
import { Step, StepLabel } from "@mui/material";

export default function MultiStepForm({
  children,
  initialValues,
  onSubmit,
  isPending,
}) {
  const [stepNumber, setStepNumber] = useState(0);
  const [snapShot, setSnapShot] = useState(initialValues);
  const steps = React.Children.toArray(children);

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
        <Form autoComplete={"off"} encType="multipart/form-data">
          <Stepper
            activeStep={stepNumber}
            sx={{
              "& .MuiStepIcon-root": {
                width: "30px",
                height: "30px",
                "& .MuiSvgIcon-root": {
                  fontSize: "15px",
                },
              },
              "& .MuiStepLabel-label": {
                fontSize: "20px",
              },
              width: "100%",
              mb: 3,
            }}
          >
            {steps.map((currentStep) => {
              const label = currentStep.props.stepName;
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {step}
          <FormNavigation
            isLastStep={isLastStep}
            hasPrevious={stepNumber > 0}
            onBackClick={() => previous(formik.values)}
            isPending={isPending}
            errors={formik.errors}
          />
        </Form>
      )}
    </Formik>
  );
}

export const FormStep = ({ stepName = "", children }) => children;

MultiStepForm.propTypes = {
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

FormStep.prototype = {
  stepName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
