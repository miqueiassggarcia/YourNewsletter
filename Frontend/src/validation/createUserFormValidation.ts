export function validateNewsletterName(nome: string):string {
  if(nome.length < 3) {
    return "Nome precisa conter ao menos 3 caracteres"
  } else if(nome.length > 30) {
    return "Nome precisa conter menos de 30 caracteres"
  } else {
    return ""
  }
}

export function validateNewsletterDescription(description: string):string {
  if(description.length < 5) {
    return "Nome precisa conter ao menos 5 caracteres"
  } else if(description.length > 200) {
    return "Nome precisa conter menos de 200 caracteres"
  } else {
    return ""
  }
}