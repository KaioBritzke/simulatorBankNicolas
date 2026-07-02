# Simulador de Financiamento de Veículo

Site estático para simular financiamento de um veículo em um único passo.

## Funcionalidades

- Campo para valor total da venda do veículo (?)
- Campo para entrada opcional (?)
- Campo para taxa de juros (%)
- Campo para número de parcelas
- Exibe:
  - valor total
  - entrada
  - valor financiado
  - juros totais
  - valor da parcela
  - total com juros

## Como testar localmente

### Opção 1: Usando Python

1. Abra o terminal na pasta do projeto:
   ```bash
   cd /home/kbritzke/Documentos/simulatorBankNicolas
   ```
2. Inicie um servidor local com Python 3:
   ```bash
   python3 -m http.server 8000
   ```
3. Abra no navegador:
   ```text
   http://localhost:8000
   ```

### Opção 2: Usando outro servidor estático

Se preferir, use qualquer servidor estático de sua preferência, como `live-server`, `http-server` ou uma extensão de servidor local do VS Code.

## Arquivos

- `index.html` ? layout e formulário
- `styles.css` ? estilos visuais
- `script.js` ? lógica de cálculo
- `README.md` ? instruções de uso

## Conectar ao GitHub

Siga estes passos para enviar o projeto a um repositório remoto no GitHub:

1. No GitHub, crie um novo repositório (vazio) e copie a URL (SSH ou HTTPS).
2. No terminal, entre na pasta do projeto:
   ```bash
   cd /home/kbritzke/Documentos/simulatorBankNicolas
   ```
3. Opção A ? script auxiliar (recomendado):
   ```bash
   chmod +x git-setup.sh
   ./git-setup.sh <git-remote-url>
   ```
   Isso inicializa o repositório, cria o commit inicial, define `origin` e faz push para a branch `main`.

4. Opção B ? comandos manuais:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <git-remote-url>
   git push -u origin main
   ```

5. Para clonar e puxar as alterações em outra máquina:
   ```bash
   git clone <git-remote-url>
   cd <repo-name>
   git pull
   ```

6. Observações:
   - Configure suas credenciais SSH/HTTPS no GitHub para permitir push/pull.
   - Se você usa autenticação por token com HTTPS, substitua sua senha pelo token ao efetuar push.
   - O script `git-setup.sh` tenta fazer um commit inicial; se já houver commits, ele apenas atribui o remote e faz push.

## Suporte
Se preferir, posso abrir um PR com os arquivos criados (`.gitignore`, `git-setup.sh`) ou ajustar as instruções para um fluxo específico.
