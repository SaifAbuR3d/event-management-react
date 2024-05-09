import dayjs from "dayjs";
import * as yup from "yup";

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

export const validationSchemaStepOne = yup.object({
  name: yup
    .string()
    .required("Title required")
    .min(3, "Title must be between 3 and 7000 characters"),

  description: yup
    .string()
    .required("Description required")
    .min(3, "Title must be between 3 and 7000 characters"),

  Thumbnail: yup
    .mixed()
    .required("File Required")
    .test("is-valid-type", "Not a valid image type", function (value) {
      return isValidFileType(value && value.name.toLowerCase(), "image");
    }),

  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Invalid date")
    .min(
      dayjs().add(1, "day"),
      "Please set the start date to at least one day ahead of today."
    ),

  endDate: yup
    .date()
    .required("End date is required")
    .typeError("Invalid date")
    .min(
      dayjs().add(1, "day"),
      "Please set the start date to at least one day ahead of today."
    )
    .min(yup.ref("startDate"), "End date must be before start date"),

  startTime: yup
    .date()
    .typeError("Invalid date")
    .required("Start time is required"),
  endTime: yup
    .date()
    .typeError("Invalid date")
    .required("End time is required")
    .when("startTime", (startTime, schema) => {
      return (
        startTime &&
        schema.test({
          name: "afterStart",
          exclusive: true,
          test: function (endTime) {
            const { startTime } = this.parent;
            if (!startTime || !endTime) return true;
            return endTime > startTime;
          },
          message: "End time must be after start time and not equal to it",
        })
      );
    }),
  categoryId: yup.number().required(" category type is required"),

  isOnline: yup.boolean().required(),

  street: yup.string().when(["isOnline"], {
    is: false,
    then: () => yup.string().required("Street is required"),
    otherwise: () => yup.string().optional(),
  }),
});

export const validationSchemaStepTwo = yup.object({
  tickets: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .required("Name is required")
          .min(3, "ticket name must be at least 3 characters"),

        price: yup.string().required("Price is required"),

        quantity: yup
          .number()
          .required("Quantity is required")
          .typeError("Quantity must be a number"),

        startSale: yup
          .date()
          .typeError("Invalid date")
          .required("Start Sale Date is required")
          .min(
            dayjs().subtract(1, "day"),
            "Start Sale date must be in the future"
          ),

        endSale: yup
          .date()
          .typeError("Invalid date")
          .required("end Sale date is required")
          .min(
            dayjs().subtract(1, "day"),
            "End Sale date must be in the future"
          )
          .min(yup.ref("startSale"), "end Sale date must be after start date"),

        startSaleTime: yup
          .date()
          .typeError("invalid time")
          .required("time is required"),

        endSaleTime: yup
          .date()
          .typeError("invalid time")
          .required("time is required"),
      })
    )
    .test(
      "at-least-one-ticket",
      "At least one ticket is required",
      function (value) {
        return value.length > 0;
      }
    ),
});

export const validationSchemaStepThree = yup.object().shape(
  {
    isManaged: yup.boolean(),
    allowedGender: yup.string(),
    minAge: yup.number().when(["maxAge"], {
      is: (maxAge) => !!maxAge,
      then: () =>
        yup
          .number()
          .required("Min Age is required")
          .min(18, "min age must be more than 18"),
    }),
    maxAge: yup.number().when(["minAge"], {
      is: (minAge) => !!minAge,
      then: () =>
        yup
          .number()
          .required("Max Age is required")
          .moreThan(yup.ref("minAge"), "Max age must be more than min Date"),
    }),
  },
  ["maxAge", "minAge"]
);
