#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/produtos-front"
BACKEND_PROJECT="$ROOT_DIR/backend/MinhaPrimeiraApi.csproj"

for command in dotnet node npm; do
	if ! command -v "$command" >/dev/null 2>&1; then
		printf 'Erro: comando obrigatorio nao encontrado: %s\n' "$command" >&2
		exit 1
	fi
done

DOTNET_VERSION="$(dotnet --version)"
if [[ "$DOTNET_VERSION" != 10.* ]]; then
	printf 'Erro: este projeto requer o .NET SDK 10; versao ativa: %s\n' "$DOTNET_VERSION" >&2
	exit 1
fi

if ! node -e '
const [major, minor, patch] = process.versions.node.split(".").map(Number);
const supported =
	(major === 22 && (minor > 22 || (minor === 22 && patch >= 3))) ||
	(major === 24 && minor >= 15) ||
	major >= 26;
if (!supported) {
	console.error(`Angular requer Node.js 22.22.3+, 24.15+ ou 26+; versao ativa: ${process.versions.node}`);
	process.exit(1);
}
'; then
	exit 1
fi

printf 'Restaurando pacotes do backend...\n'
dotnet restore "$BACKEND_PROJECT"

printf 'Restaurando ferramenta local dotnet-ef...\n'
dotnet tool restore --tool-manifest "$ROOT_DIR/.config/dotnet-tools.json"

printf 'Aplicando migracoes ao banco SQLite...\n'
(
	cd "$ROOT_DIR/backend"
	dotnet ef database update --project "$BACKEND_PROJECT" --startup-project "$BACKEND_PROJECT"
)

printf 'Instalando dependencias do frontend...\n'
npm ci --prefix "$FRONTEND_DIR"

printf '\nSetup concluido. Consulte README.md para iniciar a API e o frontend.\n'