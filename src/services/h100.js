import { http } from './config'
//import axios from 'axios'

export default{

    login:(User) => {
//        http.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
//        http.defaults.headers.common['Content-Type'] = "application/json"
//        http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest"
        return http.post('login',User)
    },

    listar:(Token) => {
        http.defaults.headers.common['Access-Control-Allow-Origin'] = "http://192.168.10.126:8080"
        http.defaults.headers.common['Cache-Control'] = "no-cache"
        http.defaults.headers.common['accept'] = "*/*"
        http.defaults.headers.common['Content-Type'] = "application/json"
        http.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest"
        http.defaults.headers.common['Authorization'] = Token ? "Bearer "+ Token : ""
        return http.get('H100')
    },

    salvar:(H100) => {
        /*
        const article = { title: "Vue POST Request Example" };        
        const headers = { 
            "Authorization": "Bearer my-token",
            "My-Custom-Header": "foobar"
        };        
        */

 //       axios.post("https://reqres.in/api/articles", article, { headers })
 //       .then(response => this.articleId = response.data.id);

        return http.post('H100',H100)
    
//        return http.post('H100',H100)
    },

    atualizar:(H100) => {
//        return http.put('H100/'+H100.H100_Id,H100,{ headers })        
        return http.put('H100/'+H100.H100_Id,H100)
    },


    apagar:(H100) => {
        return http.delete('H100/'+H100)
    }

}