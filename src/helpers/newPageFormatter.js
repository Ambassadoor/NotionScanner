export const newPageFormatter = (properties, dbid) => {
  const {
    casNumber,
    company,
    dateReceived,
    density = null,
    groupNumber,
    initialWeight,
    maxVolumeMass,
    name,
    productNumber,
    unitOfMeasurement,
  } = properties;
  const databaseId = dbid
  const pageObject = {
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      "CAS Number": {
        rich_text: [
          {
            text: {
              content: casNumber,
            },
          },
        ],
      },
      Company: {
        rich_text: [
          {
            text: {
              content: company,
            },
          },
        ],
      },
      "Current Weight": {
        number: parseFloat(maxVolumeMass),
      },
      "Date Received": {
        date: {
          start: dateReceived, // Should be in YYYY-MM-DD format
        },
      },
      "Group #": {
        select: {
          name: groupNumber,
        },
      },
      "Initial Weight (g)": {
        number: parseFloat(initialWeight),
      },
      "Max Volume/Mass": {
        number: parseFloat(maxVolumeMass),
      },
      "Product #": {
        rich_text: [
          {
            text: {
              content: productNumber,
            },
          },
        ],
      },
      "Unit of Measurement": {
        select: {
          name: unitOfMeasurement,
        },
      },
    },
  };

  // Add density only if provided
  if (density !== null && density !== undefined) {
    pageObject.properties["Density/Specific Gravity (g/mL)"] = {
      number: parseFloat(density),
    };
  }

  return pageObject;
};
