const axios = require('axios');
const bcrypt = require('bcrypt-node');

module.exports = {
    checkUser: async function ajaxSearchAxios(email, callback) {
        const searchResults = [];
        const $email = email;
        const result = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' },
            url: 'https://known-bass-99.hasura.app/v1/graphql',
            data: {
                query: `
                        query ($email :String ){
                            Employer(where: {email: {_eq: $email}}) {
                              id
                              password
                              
                            }
                            Candidate(where: {email: {_eq: $email}}) {
                              id
                              password
                              
                            }
                          }
                            
                        `,
                variables: { email: $email }
            },
            responseType: 'json'
        }).then(
            res => {
                for (const data in res.data.data) {
                    for (const result in res.data.data[data]) {
                        searchResults.push(res.data.data[data][result]);
                    }
                }

                if (searchResults[0] == undefined) {
                    return callback(new Error('User not Found'));
                }
                return callback(null, searchResults);
            }
        ).catch(err => callback(new Error('Unable to connect to services ,Internet Down')));
    },
    findById: async function ajaxSearchAxios(id, callback) {
        const searchResults = [];
        const $id = id;
        const result = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' },
            url: 'https://known-bass-99.hasura.app/v1/graphql',
            data: {
                query: `
                          query ($id :uuid ){
                              Employer(where: {id: {_eq: $id}}) {
                                email
                                password
                                
                              }
                              Candidate(where: {id: {_eq: $id}}) {
                                email
                                password
                                
                              }
                            }
                              
                          `,
                variables: { id: $id }
            },
            responseType: 'json'
        }).then(
            res => {
                for (const data in res.data.data) {
                    for (const result in res.data.data[data]) {
                        searchResults.push(res.data.data[data][result]);
                    }
                }

                if (searchResults[0] == undefined) {
                    return callback(new Error('User Not Found'));
                }
                return callback(null, searchResults);
            }
        ).catch(err => callback(err, null));
    },
    userValidation: async function ajaxSearchAxios(email, name, vat, callback) {
        const result = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' },
            url: 'https://known-bass-99.hasura.app/v1/graphql',
            data: {
                query: `
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
                                  
                              `,
                variables: {
                    email,
                    name,
                    vat
                }
            },
            responseType: 'json'
        }).then(
            res => {
                let count = 0;
                let valid = false;
                for (const data in res.data.data) {
                    if (res.data.data[data][0] == null) {
                        valid = true;
                        count += 1;
                    } else {
                        valid = false;
                    }
                }

                return callback(null, valid, count);
            }
        ).catch(err => callback(err, null));
    },
    fetchById: async function ajaxSearchAxios(id, callback) {
        const searchResults = [];
        const $id = id;
        const result = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' },
            url: 'https://known-bass-99.hasura.app/v1/graphql',
            data: {
                query: `
                              query ($id :uuid ){
                                  Employer(where: {id: {_eq: $id}}) {
                                    name,
                                    email,
                                    vat,
                                    password
                                    
                                  }
                                  Candidate(where: {id: {_eq: $id}}) {
                                   name,
                                    email,
                                    vat,
                                    password
                                  }
                                }
                                  
                              `,
                variables: { id: $id }
            },
            responseType: 'json'
        }).then(
            res => {
                for (const data in res.data.data) {
                    for (const result in res.data.data[data]) {
                        searchResults.push(res.data.data[data][result]);
                    }
                }

                if (searchResults[0] == undefined) {
                    return callback(new Error('User Not Found'));
                }
                return callback(null, searchResults);
            }
        ).catch(err => callback(err, null));
    },
    employerInsert: async function ajaxSearchAxios(email, password, name, address, countryId, city, vat, callback) {
        const result = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'CODERCONSULTING' },
            url: 'https://known-bass-99.hasura.app/v1/graphql',
            data: {
                query: `
                                    mutation Insert_Employer(
                                     
                                      $email: String!
                                      $password: String!
                                      $name: String!
                                      $address: String!
                                      $countryId: uuid!
                                      $city: String!
                                      $vat: String
                                  ) {
                                      insert_Employer(
                                          objects: {
                                              
                                              email: $email
                                              password: $password
                                              name: $name
                                              address: $address
                                              countryId: $countryId
                                              vat: $vat
                                              city: $city
                                          }
                                      ) {
                                          returning {
                                              name
                                              id
                                          }
                                      }
                                  }
                                  
                                      
                                  `,
                variables: {
                    email,
                    password,
                    name,
                    address,
                    countryId,
                    vat,
                    city
                }
            },
            responseType: 'json'
        }).then(
            res => callback(null, res.data.data.insert_Employer.returning[0])
        ).catch(err => callback(err, null));
    },
    compare(candidatePassword, hashedPassword, callback) {
        bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
            if (err) { return callback(err, null); }
            return callback(null, isMatch);
        });
    },
    encrypt(password, callback) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) { return next(err); }
            // Here provide the password value //
            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) { return next(err); }
                // Assign the Password the value of hash
                if (hash) {
                    return callback(hash);
                }
                next();
            });
        });
    }

};
