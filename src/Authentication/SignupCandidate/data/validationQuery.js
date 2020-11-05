module.exports = (`
query ($email :String!){
      email:Candidate(where: {email: {_eq: $email}}) {
        id
      }
      

}  
`)
