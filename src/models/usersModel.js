const  axios=  require("axios");
const bcrypt = require('bcrypt-node');

module.exports =  {
      checkUser: async function ajaxSearchAxios(email ,callback){
        var searchResults =[] ;
        var $email = email      
        const result = await axios({
                    method: "POST",
                    headers: { "Content-Type": "application/json", "x-hasura-admin-secret":"CODERCONSULTING"},
                    url: "https://known-bass-99.hasura.app/v1/graphql",
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
                        variables: { email : $email } 
                    },
                    responseType: 'json',
                }).then(
                   res =>{
                    
                    for(var  data in res.data.data){
                      for(var result in res.data.data[data]){
                        searchResults.push(res.data.data[data][result])    
                    };  
                  };
                       
                        if(searchResults[0] == undefined){
                          return callback(new Error('User not Found'))
                         
                        
                      }else{
                        return callback(null ,searchResults)
                      }
                      
                    
                       
                   }).catch(err => console.error(err))
               
            },
        findById:  async function ajaxSearchAxios(id ,callback){
          var searchResults =[] ;
          var $id = id      
          const result = await axios({
                      method: "POST",
                      headers: { "Content-Type": "application/json", "x-hasura-admin-secret":"CODERCONSULTING"},
                      url: "https://known-bass-99.hasura.app/v1/graphql",
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
                          variables: { id : $id } 
                      },
                      responseType: 'json',
                  }).then(
                     res =>{
                      
                      for(var  data in res.data.data){
                        for(var result in res.data.data[data]){
                          searchResults.push(res.data.data[data][result])    
                      };  
                    };
                         
                          if(searchResults[0] == undefined){
                            return callback(new Error('User Not Found'))
                           
                          
                        }else{
                          return callback(null ,searchResults)
                        }
                        
                      
                         
                     }).catch(err => console.error(err))
                 

            },
        compare : function(candidatePassword ,hashedPassword ,callback){
                  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
                    if (err) {return callback(err);}
                    callback(null, isMatch);
                });
        },  
                      
  }