const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Model } = require("mongoose");
const APIFeatures = require("../utils/apiFeatures");

///////////////// CREATE ////////////////
exports.createOne = (Model, popOptions) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.create(request.body);

    if (!doc) {
      return next(new AppError("No document created", 404));
    }

    response.status(201).json({
      status: "success",
      data: await doc.populate(popOptions),
    });
  });

///////////////// READ ////////////////
exports.getOne = (Model, popOptions) =>
  catchAsync(async (request, response, next) => {
    let query = Model.findOne(request.params);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    response.status(200).json({
      status: "Success",
      data: doc,
    });
  });

exports.getAll = (Model, filterObject, popOptions) =>
  catchAsync(async (request, response, next) => {
    const features = new APIFeatures(Model.find(filterObject), request.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query.populate(popOptions);

    response.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

///////////////// UPDATE ////////////////
exports.updateOne = (Model, popOptions) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndUpdate(request.params, request.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    response.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

///////////////// DELETE ////////////////
exports.deleteOne = (Model) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndDelete(request.params);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    let images = [];

    //get cover picture name
    if (doc.coverPicture) {
      images = [...images, doc.coverPicture];
    }
    //get pictures name
    if (doc.pictures) {
      images = [...images, ...doc.pictures];
    }

    //delete pictures
    for (image of images) {
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "img",
        "signalements",
        image
      );
      deleteFile(filePath);
    }

    response.status(200).json({
      status: "success",
    });
  });
