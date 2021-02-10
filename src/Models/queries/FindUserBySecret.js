module.exports = (`
query ($secret :uuid!){
      secret:isa_User(where: {secret: {_eq: $secret}}) {
        id
      }
}`)
