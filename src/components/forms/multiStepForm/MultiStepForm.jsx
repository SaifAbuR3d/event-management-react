import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import FormNavigation from "./FormNavigation";
import Stepper from "@mui/material/Stepper";
import { Step, StepLabel } from "@mui/material";

export default function MultiStepForm({ children, initialValues, onSubmit }) {
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
    /*The condition if (step.props.onSubmit)
     checks if there's a submit handler function (onSubmit) provided as a prop to the current step component.
If such a function exists (if condition evaluates to true),
 it calls this function passing the values as an argument.
  The values likely represent the form values collected in the current step. */
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({}); // reset the Touched obj  as we navigate from page to page
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
          <Stepper activeStep={stepNumber} sx={{ mb: 3 }}>
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
