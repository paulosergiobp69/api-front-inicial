<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Ordem de Compra -  id:{{h100.H100_Id}}</a>
      </div>
    </nav>

    <div class="container">

      <form @submit.prevent="salvar">

         <section v-if="errored">
              <p>Pedimos desculpas, não estamos conseguindo recuperar as informações no momento. Por favor, tente novamente mais tarde.</p>
<!--              <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
              <ul>
                <li v-for="(erro,index) of errors" :key="index">
                  Campo: <b>{{ erro }}</b> 
                </li>
              </ul>       
              -->
          </section>

          <label>Produto</label>
          <input type="text" placeholder="Produto" v-model="h100.H100_D009_Id">
          <label>Item O.C.</label>
          <input type="text" placeholder="Item O.C." v-model="h100.H100_T012_Id">
          <label>Quantidade</label>
          <input type="text" placeholder="QTD" v-model="h100.H100_Quantidade">
          <label>Valor</label>
          <input type="text" placeholder="Valor" v-model="h100.H100_Valor_Unitario">
          <label>Usuario</label>
          <input type="text" placeholder="Usuario" v-model="h100.H100_C007_Id">
          <label>Status</label>
          <input type="text" placeholder="Status" v-model="h100.H100_Status">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>PRODUTO</th>
            <th>ITEM OC</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>USUARIO</th>
            <th>STATUS</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

            <tr v-for="h100 of h100s.data" :key="h100.H100_Id">

            <td>{{h100.H100_D009_Id}}</td>
            <td>{{h100.H100_T012_Id}}</td>
            <td>{{h100.H100_Quantidade}}</td>
            <td>{{h100.H100_Valor_Unitario}}</td>
            <td>{{h100.H100_C007_Id}}</td>
            <td>{{h100.H100_Status}}</td>
            <td>
              <button @click="editar(h100)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="excluir(h100.H100_Id)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>
<script>
import Cabecalho from './services/h100'
export default {

  data(){
      return {
          errors: [],
          errored: false,
          loading: true,
          message_error: 'Pedimos desculpas, não estamos conseguindo recuperar as informações no momento. Por favor, tente novamente mais tarde.',
          h100: {
            H100_Id:'',
            H100_D009_Id:'',
            H100_T012_Id:'',
            H100_Quantidade:'',
            H100_Valor_Unitario:'',
            H100_C007_Id:'',
            H100_Status:''
          },
          h100s: [],
          credentials:{
            email:'paulosergiobp@gmail.com',
            password: '280772',
          },
          token: ''          
      }
  },
  mounted(){
    this.listar()
  },

  methods:{

    listar(){
      if(!this.token){
          Cabecalho.login(this.credentials).then(resposta => {
            if(resposta.data.token){
              this.token = resposta.data.token
              Cabecalho.listar(this.token).then(resposta => {
                  this.h100s = resposta.data
              })
              .catch(error => {
                  //this.errors = error
                  console.log(error)
                  this.errored = true
              })

            }
          })
          .catch(error => {
              this.errors = error.response.data.errors
              this.errored = true
          })
      }else{
              Cabecalho.listar(this.token).then(resposta => {
                  this.h100s = resposta.data
              })
              .catch(error => {
                  this.errors = error
                  this.errored = true
              })

      }
    },

    salvar(){
      if(!this.h100.H100_Id){
          Cabecalho.salvar(this.h100).then(resposta => {
            this.h100s  = resposta.data
            alert('Salvo com sucesso!')
            this.h100 = {}
            this.errored = false
            this.errors = []
            this.listar()
          })
          .catch(error => {
            this.errors = error.response.data.errors
            this.errored = true
          })
      }else{
          Cabecalho.atualizar(this.h100).then(resposta => {
            alert('Atualizado com sucesso!')
            this.h100s  = resposta.data.data
            this.h100 = {}
            this.errored = false
            this.errors = []
            this.listar()
          })
          .catch(error => {
            this.errors = error.response.data.errors
            this.errored = true
          })
      }

    },

    editar(h100){
      this.h100 = h100
    },

    excluir(h100){
      if(confirm('Deseja excluir a O.C.?')){
          Cabecalho.apagar(h100).then(resposta => {
            this.h100s  = resposta.data
            this.listar(),
            this.errors = []
          }).catch(e => {
            this.errors = e.response.data.errors
          })
      }
    }


  }
  


}


</script>

<style>

</style>
