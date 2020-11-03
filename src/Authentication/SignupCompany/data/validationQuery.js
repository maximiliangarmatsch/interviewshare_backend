export default `
query ($email :String! ,$name :String!, $vat :String ){
      email:Employer(where: {email: {_eq: $email}}) {
        id
      }
      name:Employer(where: {name: {_eq: $name}}) {
        id
      }
      vat:Employer(where: {vat: {_eq: $vat}}) {
        id  
      }

}
    
`