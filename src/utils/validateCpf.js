import cpf from "cpf";

export const validateCpf = (cpfValue) => {
  const cleanCpf = cpfValue.replace(/[^\d]+/g, "");
  return { isValid: cpf.isValid(cleanCpf), cleanCpf };
};
