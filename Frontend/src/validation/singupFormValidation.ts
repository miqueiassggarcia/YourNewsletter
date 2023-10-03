export function validateApelido(apelido: string):string {
  if(apelido.length < 3) {
    return "Apelido precisa conter ao menos 3 caracteres"
  } else if(apelido.length > 20) {
    return "Apelido precisa conter menos de 30 caracteres"
  } else if(
    /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(apelido)
    ) {
    return "Apelido não pode ter caracteres especiais"
  } else {
    return ""
  }
}

export function validateName(name: string):string {
  if(name.length < 3) {
    return "Nome precisa conter ao menos 3 caracteres"
  } else if(name.length > 30) {
    return "Nome precisa conter menos de 30 caracteres"
  } else {
    return ""
  }
}

export function validateLastName(lastName: string):string {
  if(lastName.length < 3) {
    return "Sobrenome precisa conter ao menos 3 caracteres"
  } else if(lastName.length > 30) {
    return "Sobrenome precisa conter menos de 30 caracteres"
  } else {
    return ""
  }
}

export function validateEmail(email: string):string {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(!emailPattern.test(email)) {
    return "Formato de email inválido"
  } else {
    return ""
  }
}

export function validatePassword(password: string): string {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);

  if(!hasNumber) {
    return "A senha precisa conter pelo menos 1 número"
  } else if(!hasUppercase) {
    return "A senha precisa conter pelo menos uma letra maiúscula"
  } else if(!hasLowercase) {
    return "A senha precisa conter pelo menos uma letra minúscula"
  } else if(!hasSpecialChar) {
    return "A senha precisa conter pelo menos um caractere especial"
  } else if(password.length < 8) {
    return "A senha precisa conter pelo menos 8 caracteres"
  } else {
    return ""
  }
}