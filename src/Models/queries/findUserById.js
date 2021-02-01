module.exports = (`
    query ($id :uuid ){
        isa_User(where: {id: {_eq: $id}}) {
            email
            password
            }
}`)
