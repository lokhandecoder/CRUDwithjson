const genderOptions = [
    "male",
    "female",
    "Transgender",
    "Rather not say",
    "other",
  ];

  const calculateAge = (dob: string): number => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const todayMonth = today.getMonth();
    const birthDateMonth = birthDate.getMonth();
  
    if (
      todayMonth < birthDateMonth ||
      (todayMonth === birthDateMonth && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  
    return age;
  };


  export {genderOptions, calculateAge}