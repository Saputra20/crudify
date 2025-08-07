const path = require("path");
const fs = require("fs");
const logger = require("../core/logger");
const {
  convertToJoiSchema,
  parseAttributes,
  toCamelCase,
  toPascalCase,
} = require("../core/utils");

const getFilePath = (module, type) => {
  return path.join(__dirname, `../template/${type}/${module}.js`);
};

const generateController = (fullPath, modelName, type = "crud") => {
  const name = modelName.toLowerCase();
  const capitalizedName = toCamelCase(name);

  const targetDir = path.join(process.cwd(), "src/application", fullPath);

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const controllerTemplate = fs.readFileSync(
    getFilePath("controller", type),
    "utf-8"
  );
  const controllerContent = controllerTemplate
    .replace(/__name__/g, name)
    .replace(/__Name__/g, capitalizedName);
  fs.writeFileSync(
    path.join(targetDir, `${name}.controller.js`),
    controllerContent
  );
  logger.info(`${targetDir}/${name}.controller.js generated`);
};

const generateService = (fullPath, modelName, type = "crud") => {
  const name = modelName.toLowerCase();
  const capitalizedName = toPascalCase(name);

  const targetDir = path.join(process.cwd(), "src/application", fullPath);

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const serviceTemplate = fs.readFileSync(
    getFilePath("service", type),
    "utf-8"
  );
  const serviceContent = serviceTemplate.replace(/__Name__/g, capitalizedName);
  fs.writeFileSync(path.join(targetDir, `${name}.service.js`), serviceContent);
  logger.info(`${targetDir}/${name}.service.js generated`);
};

const generateRoute = (fullPath, modelName, type = "crud") => {
  const name = modelName.toLowerCase();
  const capitalizedName = toCamelCase(name);

  const targetDir = path.join(process.cwd(), "src/application", fullPath);

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const routeTemplate = fs.readFileSync(getFilePath("route", type), "utf-8");
  const routeContent = routeTemplate
    .replace(/__name__/g, name)
    .replace(/__Name__/g, capitalizedName);
  fs.writeFileSync(path.join(targetDir, `${name}.route.js`), routeContent);
  logger.info(`${targetDir}/${name}.route.js generated`);
};

const generateValidation = (fullPath, modelName, attributes, type = "crud") => {
  const name = modelName.toLowerCase();
  const capitalizedName = toPascalCase(name);

  const fields = parseAttributes(attributes);
  const joiFields = convertToJoiSchema(fields);

  const targetDir = path.join(process.cwd(), "src/application", fullPath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const validationTemplate = fs.readFileSync(
    getFilePath("validation", type),
    "utf-8"
  );
  const validationContent = validationTemplate
    .replace(/__name__/g, name)
    .replace(/__Name__/g, capitalizedName)
    .replace("__joi_fields__", joiFields);

  fs.writeFileSync(
    path.join(targetDir, `${name}.validation.js`),
    validationContent
  );
  logger.info(`${targetDir}/${modelName}.validation.js generated`);
};

const generateCRUD = (fullPath, modelName, attributes) => {
  generateController(fullPath, modelName);
  generateService(fullPath, modelName);
  generateRoute(fullPath, modelName);
  generateValidation(fullPath, modelName, attributes);
  return true;
};

const generator = (baseName, options) => {
  try {
    const { attributes, controller, service, route, validation } = options;
    const nameParts = baseName.split("/");
    const name = nameParts[nameParts.length - 1].toLowerCase();
    const fullPath = name.toLowerCase();
    let isCRUD = true;

    if (controller) {
      isCRUD = false;

      generateController(fullPath, name, "blank");
    }

    if (service) {
      isCRUD = false;

      generateService(fullPath, name, "blank");
    }

    if (route) {
      isCRUD = false;

      generateRoute(fullPath, name, "blank");
    }

    if (validation) {
      if (!attributes) {
        logger.fail("Failed to create crud need attributes");
        logger.info("Example: --attributes name:string,email:string");
        return;
      }

      isCRUD = false;
      generateValidation(fullPath, name, attributes, "blank");
    }

    if (isCRUD) {
      if (!attributes) {
        logger.fail("Failed to create crud need attributes");
        logger.info("Example: --attributes name:string,email:string");
        return;
      }

      generateCRUD(fullPath, name, attributes);
    }

    logger.succeed(`Successfully generated files!`);
  } catch (error) {
    logger.fail(`Failed to generate files: ${error.message}`);
  }
};

module.exports = generator;
