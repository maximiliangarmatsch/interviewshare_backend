const  axios=  require("axios");

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
                        return callback(searchResults)
                      }
                      
                    
                       
                   }).catch(err => console.error(err))
               
            }

    }  
                      
    