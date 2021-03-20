module.exports =  {

  formattedCPF: async (cpf) => {
  const cpfToFormat = cpf.replace(/[\s.-]*/gim, '');
  return cpfToFormat;
},

};
