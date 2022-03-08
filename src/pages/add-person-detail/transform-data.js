export const transformData = (data) => {
  const transformedData = {
    createdDate: new Date(),
    birthCity: data.birthCity,
    birthCountryCd: data.birthCountryCd,
    birthStateCd: data.birthStateCd,
    dob: data.dob,
    ethnicity: data.ethnicity,
    eyeColorCd: data.eyeColorCd,
    fatherName: data.fatherName,
    hairColorCd: data.hairColorCd,
    motherName: data.motherName,
    statusCd: data.statusCd,
    personNames: [
      {
        createdDate: new Date(),
        beginDate: data.beginDate,
        endDate: data.endDate,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        statusCd: "ACT",
      },
    ],
  };
  return transformedData;
};
