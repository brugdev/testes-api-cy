/// <reference types="cypress" />
import contrato from '../contracts/usuario.contract'
import { faker } from '@faker-js/faker';


describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {//antes de eexecutar o teste faca isso
          cy.token('brunoteste2@gmail.com', 'teste').then(tkn => { token = tkn })//chamada do comando personalizado que criei e coloquei em commands com os parametros
     });

     it('Deve validar contrato de usuários', () => {//*******************************ok
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })

     });

     it('Deve listar usuários cadastrados', () => {//****************************ok
          cy.request({
               method: "GET",
               url: "usuarios"
          }).then((response) => {
               cy.log(response.body.quantidade, "Usuarios cadastrados")//
          })


     });

     it('Deve cadastrar um usuário com sucesso', () => {//******************************ok
          cy.novoUsuario('Fulano Teste', 'fulanoteste@gmail.com', 'teste@123', 'true')
               .then((response) => {
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')

               })
     });

     it('Deve validar um usuário com email inválido', () => {//************************ok
          cy.novoUsuario('Gabriel Sousa', 'gabrielteste123gmail.com', 'teste@123', 'true')
               .then((response) => {
                    expect(response.status).to.equal(400)//retorno status code

               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {// *********************ok
          let nomefake = faker.person.fullName()
          let emailfake = faker.internet.email()
          let senhafake = faker.internet.password()
          cy.novoUsuario(nomefake, emailfake, senhafake, 'true')
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,//preencendo a url com o id da variavel para poder editar
                         headers: { authorization: token },
                         body:
                         {
                              "nome": nomefake,
                              "email": emailfake,
                              "password": senhafake,
                              "administrador": "true"

                         }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro alterado com sucesso')// validando a mensagem final
                    })

               });
     })    

     it('Deve deletar um usuário previamente cadastrado', () => {
               let nomefake = faker.person.fullName()
               let emailfake = faker.internet.email()
               let senhafake = faker.internet.password()
               cy.novoUsuario(nomefake, emailfake, senhafake, 'true')
                    .then(response => {
                         let id = response.body._id
                         cy.request({
                              method: 'DELETE',
                              url: `usuarios/${id}`,//preencendo a url com o id da variavel para poder editar
                              headers: { authorization: token },
                         }).then(response => {
                              expect(response.status).to.equal(200)//retorno status code
                         })

                    });
               });
     })          

          
     


