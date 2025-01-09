//	•	A req (requisição HTTP) é um stream, ou seja, os dados enviados no corpo da requisição 
//	(como em uma requisição POST) podem chegar em pedaços chamados chunks.

//	•	O for await é usado para iterar assíncronamente sobre os chunks da requisição, 
//	e os chunks que são armazenados no array buffers.

// 	•	Buffer.concat(buffers): Combina todos os pedaços de dados (buffers) em um único buffer.
//	•	.toString(): Converte o buffer combinado em uma string.
//	•	JSON.parse: Tenta transformar a string em um objeto JavaScript, assumindo que ela esteja no formato JSON.

export async function json(req, res) {
    const buffers = []
  
    for await (const chunk of req) {
      buffers.push(chunk)
    }
  
    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
      req.body = null
    }
  
    res.setHeader('Content-type', 'application/json')
  }

//  Fluxo Completo
//  1.	Os dados do corpo da requisição são lidos e armazenados em chunks.
//  2.	Esses dados são combinados em uma única string.
//  3.	A string é convertida em um objeto JavaScript (se for JSON válido) e armazenada em req.body.
//  4.	O cabeçalho da resposta é ajustado para indicar que o conteúdo será JSON.