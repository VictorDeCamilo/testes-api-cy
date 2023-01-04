/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

     let token

     before(() => {
          cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
     });

    it('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(res=>{
          return contrato.usersSchema.validateAsync(res.body)
     })
    });

    it('Deve listar usuários cadastrados', () => {
     cy.request('usuarios').then(res=>{
          expect(res.status).to.eq(200)
          expect(res.body).to.not.be.empty
          expect(res.body.quantidade).to.be.greaterThan(0)
          expect(res.body.usuarios).to.have.length(res.body.quantidade)
     })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
     let email = Math.floor(Math.random() * 200 + 1) + '@teste.com'

     cy.cadastrarUsuario(token, 'Teste', email, 'teste', 'true').then(res=>{
          expect(res.status).to.eq(201)
          expect(res.body.message).to.eq('Cadastro realizado com sucesso')
          expect(res.body._id).to.not.be.null
     })
    });

    it('Deve validar um usuário com email inválido', () => {
     let email = Math.floor(Math.random() * 200 + 1) + '@teste.com'

     cy.cadastrarUsuario(token, 'Teste', email, 'teste', 'true').then(res=>{
          expect(res.status).to.eq(201)
          expect(res.body.message).to.eq('Cadastro realizado com sucesso')
          expect(res.body._id).to.not.be.null
          cy.cadastrarUsuario(token,'Teste', email, 'teste', 'true').then(res2=>{
               expect(res2.status).to.eq(400)
               expect(res2.body.message).to.eq('Este email já está sendo usado')
          })
     })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     let email = Math.floor(Math.random() * 200 + 1) + '@teste.com'
     let email2 = Math.floor(Math.random() * 200 + 1) + '@teste.com'

     cy.cadastrarUsuario(token, 'Teste', email, 'teste', 'true').then(res=>{
          expect(res.status).to.eq(201)
          expect(res.body.message).to.eq('Cadastro realizado com sucesso')
          expect(res.body._id).to.not.be.null
          cy.editarUser(token, res.body._id, 'Teste', email2, 'teste', 'true').then(res2=>{
               expect(res2.status).to.eq(200)
               expect(res2.body.message).to.eq('Registro alterado com sucesso')
          })
     })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     let email = Math.floor(Math.random() * 200 + 1) + '@teste.com'

     cy.cadastrarUsuario(token, 'Teste', email, 'teste', 'true').then(res=>{
          expect(res.status).to.eq(201)
          expect(res.body.message).to.eq('Cadastro realizado com sucesso')
          expect(res.body._id).to.not.be.null
          cy.deletarUser(token, res.body._id).then(res2=>{
               expect(res2.status).to.eq(200)
               expect(res2.body.message).to.eq('Registro excluído com sucesso')
          })
     })
    });
});