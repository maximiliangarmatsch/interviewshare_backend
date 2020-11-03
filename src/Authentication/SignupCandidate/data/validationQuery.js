export default `
query ($email :String!){
      email:Candidate(where: {email: {_eq: $email}}) {
        id
      }
      

}
    
`