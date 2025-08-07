const toPascalCase = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const toCamelCase = (str) => {
  return str
    .split("-")
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

const parseAttributes = (attributeString) => {
  const fields = attributeString.split(",").map((attr) => {
    const [key, type] = attr.split(":");
    return { key, type };
  });
  return fields;
};

const joiTypeMap = {
  string: "Joi.string().trim()",
  number: "Joi.number()",
  boolean: "Joi.boolean()",
  date: "Joi.date()",
};

const convertToJoiSchema = (fields) => {
  return fields
    .map(({ key, type }) => {
      const joi = joiTypeMap[type] || "Joi.any()";
      return `    ${key}: ${joi}.required(),`;
    })
    .join("\n");
};

module.exports = {
  toPascalCase,
  toCamelCase,
  parseAttributes,
  convertToJoiSchema,
};
