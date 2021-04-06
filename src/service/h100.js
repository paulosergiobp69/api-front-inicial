import { http } from './config'

export default{

    listar:() => {
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
        return http.put('H100/'+H100.H100_Id,H100)
    },


    apagar:(H100) => {
        return http.delete('H100/'+H100)
    }

}