Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })

Cypress.Commands.add('cadastrarUsuario', (token, nome, email, senha, administrador)=>{
    cy.request({
        method: 'POST',
        url: 'usuarios',
        headers: {
            authorization: token
        },
        body:{
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": administrador
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('editarUser', (token, id, nome, email, senha, administrador) =>{
    cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        headers: {
            authorization: token
        },
        body:{
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": administrador
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deletarUser', (token, id) => {
    cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
        headers:{
            authorization: token
        }
    })
})