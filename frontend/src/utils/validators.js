
export function formatarCPF(valor) {

  valor = valor.replace(/\D/g, "");

  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return valor;

}

export function formatarTelefone(valor) {

  valor = valor.replace(/\D/g, "");

  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");

  valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

  return valor;

}

export function formatarCEP(valor) {

  valor = valor.replace(/\D/g, "");

  valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

  return valor;

}

export function validarNome(valor) {

  return valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

}

export function emailValido(email) {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

}

export function cpfValido(cpf) {

  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;

  for (let i = 0; i < 9; i++)
    soma += parseInt(cpf.charAt(i)) * (10 - i);

  let resto = 11 - (soma % 11);

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;

  for (let i = 0; i < 10; i++)
    soma += parseInt(cpf.charAt(i)) * (11 - i);

  resto = 11 - (soma % 11);

  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.charAt(10));

}

export function telefoneValido(telefone) {

  telefone = telefone.replace(/\D/g, "");

  return telefone.length >= 10 && telefone.length <= 11;

}

export function valorValido(valor) {

  return !isNaN(valor) && Number(valor) > 0;

}


export function cepValido(cep) {

  cep = cep.replace(/\D/g, "");

  return cep.length === 8;

}


export function numeroValido(numero) {

  return numero !== "" && !isNaN(numero);

}


export function campoTextoValido(texto) {

  return texto && texto.trim().length > 2;

}


// Cidade ou bairro válido
export function localValido(valor) {

  return /^[a-zA-ZÀ-ÿ\s]+$/.test(valor);

}


export function somenteNumeros(valor) {

  return valor.replace(/\D/g, "");

}


export function limitarTexto(valor, limite) {

  return valor.substring(0, limite);

}