const Category = require("../models/category.model");
const PriceOption = require("../models/price.model");
const Service = require("../models/service.model");

exports.addCategory = async (req, res, next) => {
  const { categoryName } = req.body;
  try {
    const category = await Category.create({ categoryName });
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

exports.removeCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { services } = await Category.findById(id).populate("services");
    if (services.length >= 0) {
      next({ status: 404, message: "Cannot delete category is not empty" });
    } else if (services.length === 0) {
      await Category.findByIdAndDelete(id);
      response.status(200).json("Service deleted successfully");
    }
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const { categoryName } = req.body;
  try {
    const categoryNew = await Category.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );
    res.status(200).json(categoryNew);
  } catch (err) {
    next(err);
  }
};

exports.addService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newService = await Service.create({ ...req.body, categoryId: id });
    res.status(201).json(newService);
  } catch (err) {
    next(err);
  }
};

exports.getAllServices = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { services } = await Category.findById(id).populate("services");
    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
};

exports.removeService = async (req, res, next) => {
  try {
    const { categoryId, serviceId } = req.params;

    const service = await Service.findById(serviceId).populate("categoryId");

    if (service.categoryId.id === categoryId) {
      const categoryDeleted = await Service.findByIdAndDelete(serviceId);
      const priceOptionsDeleteId = categoryDeleted.PriceOptions;
      const deletePriceOptions = await PriceOption.deleteMany({
        _id: { $in: priceOptionsDeleteId },
      });
      res.status(200).json(categoryDeleted);
    } else {
      next({ status: 403, message: "Not allowed to delete service" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const { categoryId, serviceId } = req.params;
    const { PriceOptions, serviceName, Type } = req.body;

    const service = await Service.findById(serviceId).populate("categoryId");

    if (service.categoryId.id === categoryId) {
      if (PriceOptions?.length > 0) {
        for (let i = 0; i < PriceOptions.length; i++) {
          const addPriceOptions = await PriceOption.create({
            ...PriceOptions[i],
            serviceId: serviceId,
          });
          service.PriceOptions.push(addPriceOptions._id);
        }
      }
      let newService;
      if (service.PriceOptions.length > 0) {
        newService = await Service.findByIdAndUpdate(serviceId, {
          serviceName,
          Type,
          PriceOptions: service.PriceOptions,
        });
        console.log(newService);
      } else {
        newService = await Service.findByIdAndUpdate(serviceId, {
          serviceName,
          Type,
        });
      }

      res.status(200).json(newService);
    } else {
      next({ status: 403, message: "Not allowed to Update service" });
    }
  } catch (error) {
    next(error);
  }
};

exports.priceOptionsDelete = async (req, res, next) => {
  const { categoryId, serviceId, priceOptionsId } = req.params;
  try {
    const service = await Service.findById(serviceId)
      .populate("categoryId")
      .populate("PriceOptions");

    if (service.categoryId.id === categoryId) {
      const deletePriceOptions = await PriceOption.findByIdAndDelete(
        priceOptionsId
      );
      const newService = service.PriceOptions.filter(
        (price) => price.id !== priceOptionsId
      );
      service.PriceOptions = newService;
      await service.save();
      res.status(200).json(deletePriceOptions);
    } else {
      next({ status: 403, message: "Not allowed to Update service" });
    }
  } catch (error) {
    next(error);
  }
};
