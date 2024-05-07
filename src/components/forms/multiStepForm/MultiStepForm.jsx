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
                // targets the icons in the steps
                width: "30px",
                height: "30px",
                "& .MuiSvgIcon-root": {
                  // targets the SVG icon itself
                  fontSize: "15px", // increase the icon size
                },
              },
              "& .MuiStepLabel-label": {
                // targets the step labels
                fontSize: "20px", // increase label font size
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
          />
        </Form>
      )}
    </Formik>
  );
}

export const FormStep = ({ stepName = "", children }) => children; // FormStepComponent to display {step}

MultiStepForm.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a React node
  initialValues: PropTypes.object.isRequired, // Ensure initialValues is an object
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a function
};

FormStep.prototype = {
  stepName: PropTypes.string.isRequired, // Ensure stepName is a string
  children: PropTypes.node.isRequired, // Ensure children is a React node
};
