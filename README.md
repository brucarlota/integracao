# Meus Produtos

Aplicacao de cadastro e gerenciamento de produtos, com API ASP.NET Core, banco SQLite e frontend Angular.

## Requisitos

- .NET SDK 10
- Node.js 22.22.3 ou superior na linha 22, 24.15 ou superior na linha 24, ou 26+
- npm 8 ou superior

O script tambem precisa de acesso a internet para restaurar pacotes NuGet e npm na primeira execucao.

## Preparar o ambiente

Na raiz do repositorio, execute:

```sh
./setup.sh
```

O script valida as versoes, restaura os pacotes do backend, restaura a ferramenta local `dotnet-ef`, aplica as migracoes ao banco SQLite e instala as dependencias do frontend com `npm ci`. Pode ser executado novamente quando necessario; as migracoes aplicadas nao sao repetidas e os dados existentes nao sao apagados.

### Instalacao manual

Se nao conseguir executar o script, rode os comandos abaixo na raiz do repositorio:

```sh
dotnet restore backend/MinhaPrimeiraApi.csproj
dotnet tool restore --tool-manifest .config/dotnet-tools.json
```

Depois, aplique as migracoes do banco a partir da pasta `backend`:

```sh
cd backend
dotnet ef database update --project MinhaPrimeiraApi.csproj --startup-project MinhaPrimeiraApi.csproj
cd ..
```

Por fim, instale as dependencias do frontend:

```sh
npm ci --prefix produtos-front
```

O comando `dotnet ef database update` cria o banco e aplica as migracoes pendentes. Se o banco ja estiver atualizado, nao e necessario executa-lo novamente.

## Executar

Inicie a API em um terminal:

```sh
cd backend
dotnet run --launch-profile http
```

A API fica em `http://localhost:5200`; a documentacao Swagger fica em `http://localhost:5200/swagger`.

Em outro terminal, inicie o frontend:

```sh
cd produtos-front
npm start
```

Abra `http://localhost:4200` no navegador. Mantenha os dois processos ativos enquanto usa a aplicacao.

## Testar e compilar

Frontend:

```sh
cd produtos-front
npm test -- --watch=false
npm run build
```

Backend:

```sh
cd backend
dotnet build
```
