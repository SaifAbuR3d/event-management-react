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

const tomorrow = dayjs()
  .add(1, "day")
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);

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
      tomorrow,
      "Please set the start date to at least one day ahead of today."
    ),

  endDate: yup
    .date()
    .required("End date is required")
    .typeError("Invalid date")
    .min(
      tomorrow,
      "Please set the start date to at least one day ahead of today."
    )
    .min(yup.ref("startDate"), "End date must be before start date"),

  startTime: yup
    .date()
    .required("Start time is required")
    .typeError("Invalid date")
    .when(["startDate", "endDate"], {
      is: (startDate, endDate) => !!startDate && !!endDate,
      then: () =>
        yup
          .date()
          .test(
            "is-after-start-time-e",
            "Start time must be after 24 hours",
            function (value) {
              const { startDate, endDate } = this.parent;

              if (!value) {
                return true;
              }

              const startDateString = startDate.toISOString().split("T")[0];
              const endDateString = endDate.toISOString().split("T")[0];

              if (
                startDateString === endDateString &&
                dayjs(startDate).get("day") == tomorrow.get("day")
              ) {
                return dayjs(value)
                  .add(1, "day")
                  .isAfter(dayjs().add(1, "day"));
              }
              return true;
            }
          ),
      otherwise: () => yup.date(),
    }),
  endTime: yup
    .date()
    .required("End time is required")
    .typeError("Invalid time")
    .when(["startDate", "endDate", "startTime"], {
      is: (startDate, endDate, startTime) =>
        !!startDate && !!endDate && !!startTime,
      then: () =>
        yup
          .date()
          .test(
            "is-after-start-time",
            "End time must be after start time on the same day, or equal/greater on different days.",
            function (endTime) {
              const { startDate, endDate, startTime } = this.parent;

              if (!endTime || !startTime) {
                return true;
              }

              const startDateString = startDate.toISOString().split("T")[0];
              const endDateString = endDate.toISOString().split("T")[0];
              const startTimeString = startTime.toISOString();
              const endTimeString = endTime.toISOString();

              if (startDateString === endDateString) {
                return new Date(endTimeString) > new Date(startTimeString);
              }
              return true;
            }
          ),
      otherwise: () => yup.date(),
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
          .required("End Sale date is required")
          .min(
            dayjs().subtract(1, "day"),
            "End Sale date must be in the future"
          )
          .min(yup.ref("startSale"), "End Sale date must be after start sale"),
        startSaleTime: yup
          .date()
          .typeError("invalid time")
          .required("Time is required"),
        endSaleTime: yup
          .date()
          .typeError("invalid time")
          .required("Time is required"),
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
