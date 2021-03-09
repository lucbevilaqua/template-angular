# Template Angular 8.2 e Bootstrap 4.3
Esse projeto é um template para novos projetos Angular, onde a proposta visual foi baseada no framework Bootstrap.

## Dependências
* [Angular 8](https://v8.angular.io/docs) -  Framework para construção da interface
* [Bootstrap 4](https://getbootstrap.com.br/docs/4.1/getting-started/introduction/) - Framework responsivo
* [Ng-bootstrap](https://ng-bootstrap.github.io/) - Componentes Bootstrap prontos para uso no Angular
* [NgRx](https://ngrx.io/docs) - Framework para construção de aplicações reativas

## Instalação
Execute o comando 
```
npm install
```
para instalar as dependências, e 
```
ng serve
```
para executar o projeto. Navegue até `http://localhost:4200/`. O site é automaticamente atualizado quando os arquivos do projeto são alterados.

## Deploy
Executar o comando
```
ng build --prod
```
Esse comando irá gerar uma pasta `/dist`, a qual terá o projeto compilado, pronto para executar deploy para servidores IIS, Apache, nginx, etc.

## Guia de desenvolvimento
O projeto template conta com 3 módulos
* auth
* home
* shared

### Módulo auth
Onde estão localizadas as implementações de autenticação da aplicação, atualmente funcionando com o AD da luxfacta através dos serviços do portal.
Esse módulo conta com uma página genérica de login, implementação do guard das rotas, e todo o fluxo de autenticação desenvolvido no fluxo do NGRX (Actions, Effects e Reducers).

### Módulo home
Módulo contendo apenas a página `home`, a qual o usuário é redirecionado após login.

### Módulo shared
Esse é o modulo compartilhado do projeto, é nele que se encontram componentes, diretivas, serviços, entre outros, que são de uso comum entre os módulos. Como exemplo, hoje temos nesse módulo componentes de Loading, Alerta e Confirmação que são comuns entre o sistema todo.

#### Permissionamento
Para que seja possível controlar permissões na aplicação, foram implementados um Guard e uma Service de controle de acesso. Para que seja possivel utilizar esse controle de permissões, é necessário que se tenha no JWT um array com os IDs das permissões que o usuário tem acesso. Feito isso, deve-se mapear no `permission.enum` todas as permissões existentes no sistema.
Tendo isso mapeado, podemos fazer controle de permissões de 2 maneiras:
```
Proteção de rotas
Exibição de elementos em tela
```
Para proteger uma rota, deve-se incluir o guard de permissões na rota, e informar quais permissões o usuário deve ter para acessar aquela rota, conforme exemplo abaixo:
```
const routes: Routes = [
	{
		path: 'rotaProtegida',
		component: ScreenComponent
		canActivate: [PermissionGuard],
		data: {
			permissions: [ Permission.ConsultarMateriais ] 
		}
	}
]
```
Para proteger a exibição de um elemento em tela, deve-se utilizar uma das 2 diretivas a seguir, conforme exemplo:
```
<div *hasPermission="[Permissions.RecebimentoMaterialNotaEPedido]">
	Diretiva utilizada para exibir o elemento caso tenha TODAS as permissões do Array
</div>
<div *hasAnyPermission="[Permissions.RecebimentoMaterialNotaEPedido]">
	Diretiva utilizada para exibir o elemento caso tenha AO MENOS UMA permissão do Array
</div>
```
