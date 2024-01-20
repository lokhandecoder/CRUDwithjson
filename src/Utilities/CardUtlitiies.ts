import { useEffect, useState } from "react";
import { CelebrityData } from "../Model/Character";
import characterDataJson from "../Resources/Assets/celebrities.json";
import { calculateAge } from "../Model/Function";

export const CardUtlitiies = (searchTerm: any) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState<number | null>(
    null
  );

  const [editMode, setEditMode] = useState<number | null>(null);
  const [celebrity, setCelebrity] = useState<CelebrityData[]>([]);
  const [errors, setErrors] = useState<
    { country: string; description: string }[]
  >([]);

  const [fieldValues, setFieldValues] = useState<CelebrityData[]>([]);

  useEffect(() => {
    setCelebrity(characterDataJson);
    setFieldValues(characterDataJson);
  }, []);

  const handleFieldChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    if (fieldName === "country") {
      if (/^[A-Za-z ]*$/.test(value) || value === "") {
        setFieldValues((prevValues) => {
          const updatedValues = [...prevValues];
          updatedValues[index] = {
            ...updatedValues[index],
            [fieldName]: value,
          };
          return updatedValues;
        });
        setErrors((prevErrors) => {
          const updatedErrors = [...prevErrors];
          updatedErrors[index] = { country: "", description: "" };
          return updatedErrors;
        });
      }
    } else {
      setFieldValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = {
          ...updatedValues[index],
          [fieldName]: value,
        };
        return updatedValues;
      });
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors];
        updatedErrors[index] = { country: "", description: "" };
        return updatedErrors;
      });
    }
  };
  const handleSave = (index: number) => {
    const newErrors = [];
    if (!fieldValues[index]?.country) {
      newErrors[index] = {
        country: "Country cannot be empty",
        description: "",
      };
    }
    if (!fieldValues[index]?.description) {
      newErrors[index] = {
        ...newErrors[index],
        description: "Description cannot be empty",
      };
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setCelebrity((prevCelebrities) => {
      const updatedCelebrities = [...prevCelebrities];
      updatedCelebrities[index] = {
        ...fieldValues[index],
      };
      return updatedCelebrities;
    });

    setEditMode(null);
  };
  const handleDeleteConfirmationOpen = (index: number) => {
    setItemToDeleteIndex(index);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setItemToDeleteIndex(null);
    setDeleteConfirmationOpen(false);
  };
  const filteredCelebrity = celebrity.filter((character) =>
    `${character.first} ${character.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const handleDelete = (index: number) => {
    setCelebrity((prevCelebrities) => {
      const updatedCelebrities = [...prevCelebrities];
      updatedCelebrities.splice(index, 1);
      return updatedCelebrities;
    });
  };
  const handleCancel = (index: number) => {
    setFieldValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        ...celebrity[index],
      };
      return updatedValues;
    });
    setEditMode(null);
  };
  const handleEdit = (index: number) => {
    const userAge = calculateAge(fieldValues[index]?.dob || "");
    const isAdult = userAge >= 18;

    if (isAdult) {
      setEditMode(index);
    } else {
      alert("You must be an adult to edit this information.");
    }
  };

  return {
    filteredCelebrity,
    editMode,
    fieldValues,
    handleFieldChange,
    errors,
    handleCancel,
    handleSave,
    handleEdit,
    setDeleteConfirmationOpen,
    setItemToDeleteIndex,
    deleteConfirmationOpen,
    handleDeleteConfirmationClose,
    itemToDeleteIndex,
    handleDelete,
  };
};
