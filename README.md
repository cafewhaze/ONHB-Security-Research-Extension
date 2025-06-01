# ONHB Security Research Extension

## Descrição

Esta extensão foi criada como uma **prova de conceito (PoC)** para demonstrar como aplicações web podem ser suscetíveis à interceptação de dados se não implementarem boas práticas de segurança. Com o intuito de analisar e compreender potenciais vulnerabilidades em ambientes controlados e com **consentimento explícito**.

---

## ⚠️ AVISO IMPORTANTE

Este código **não deve ser usado para fins maliciosos**.  
Capturar ou manipular dados de terceiros sem permissão **é crime**.  

Esta extensão serve **exclusivamente para fins educacionais e de pesquisa em segurança da informação**.  

**Use de maneira responsável!**  
Antes de testar este ou qualquer outro software de segurança, **obtenha sempre a autorização expressa do proprietário do sistema**.

**O autor não se responsabiliza por quaisquer danos, prejuízos ou consequências resultantes do uso indevido ou ilegítimo deste software.**

---

## 📦 Recursos da extensão

- Interceptação de eventos em campos de login.
- Coleta e análise de dados inseridos.
- Prova de conceito sobre vulnerabilidades comuns em páginas web.
- Código comentado e estruturado para fins didáticos.

---

## 🚀 Como instalar e usar

1. **Clone ou baixe** este repositório no seu computador:  
   - Clique em **"Code"** e depois em **"Download ZIP"**, ou use:  
   ```bash
   git clone https://github.com/cafewhaze/ONHB-Security-Research-Extension.git
2. Abra a pasta onde o projeto foi baixado e localize a pasta:
   **`extension/`**
   
3. Abra o navegador (Chrome, Brave ou compatíveis) e acesse:
   ```
   chrome://extensions/
   ```
4. Ative o **"Modo de desenvolvedor"** no canto superior direito.

5. Clique em **"Carregar sem compactação"** ou **"Load unpacked"**.

6. Selecione a pasta **`ONHB-Security-Research-Extension/extension/`**.

7. A extensão será adicionada e ficará ativa.

---

## ⚙️ Configuração necessária

* Localize o arquivo **`ONHB-Security-Research-Extension/backend/server.js`** na pasta da extensão.
* **Modifique o arquivo `server.js`** para inserir as configurações corretas do seu banco de dados ou servidor de coleta de dados.

Por padrão, esta extensão está configurada para funcionar com um **servidor Node.js** e um **banco de dados MongoDB**.

No entanto, você pode **adaptar facilmente** o código para enviar os dados para outros tipos de bancos de dados ou APIs, utilizando a tecnologia que preferir (como **MySQL, Firebase, PostgreSQL** ou outro).

**⚠️ Importante:**
Não utilize servidores públicos ou de terceiros sem a devida autorização.
Certifique-se de que o ambiente de testes está **controlado e seguro**.

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License** — consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

Este software é fornecido **"no estado em que se encontra"**, **sem garantias** ou responsabilidades pelo uso indevido.

---
