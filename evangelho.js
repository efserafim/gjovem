document.addEventListener('DOMContentLoaded', async () => {
    console.log('Script evangelho.js carregado com sucesso!');

    async function carregarLiturgia() {
        try {
            // Fazendo a requisição para a API
            const response = await fetch('https://liturgia.up.railway.app/v2/');
            if (!response.ok) {
                throw new Error('Erro na requisição da API');
            }

            const data = await response.json();
            console.log('Dados recebidos da API:', data); // Log detalhado dos dados recebidos

            // Extraindo os dados da API
            const dataLiturgia = data.data || 'Não disponível';
            const cor = data.cor || 'Não disponível';
            const diaSemana = (data.diaSemana || '').trim(); // Normaliza o dia da semana
            const antifonas = data.antifonas || {}; // Antífonas (entrada e comunhão)
            const oracoes = data.oracoes || {}; // Orações (abertura, ofertório, comunhão, coleta)
            const primeiraLeitura = data.leituras?.primeiraLeitura?.[0] || {};
            const segundaLeitura = data.leituras?.segundaLeitura?.[0] || null; // Pode ser null se não houver
            const salmo = data.leituras?.salmo?.[0] || {};
            const evangelho = data.leituras?.evangelho?.[0] || {};

            // Atualizando o conteúdo da página
            const container = document.getElementById('evangelho-container');
            if (!container) {
                console.error('Erro: O elemento #evangelho-container não foi encontrado no DOM.');
                return;
            }

            // Formatando o salmo responsorial
            const formatarSalmo = (salmo) => {
                // Refrão fixo caso a API não retorne o texto
                const refrão = salmo.refrão || 'Provai e vede quão suave é o Senhor!';
                
                // Quebra o texto em linhas se disponível, removendo travessões extras
                const versos = salmo.texto
                    ? salmo.texto.split('\n').map(linha => linha.trim().replace(/^—\s*/, '')).join('<br>')
                    : 'Texto não disponível';
                
                return `
                    <div class="leitura">
                        <h3>Salmo Responsorial</h3>
                        <p><strong>Referência:</strong> ${salmo.referencia || 'Não disponível'}</p>
                        <p>— <strong>${refrão}</strong></p>
                        <p>— <strong>${refrão}</strong></p>
                        ${versos.split('<br>').map(linha => `<p>— ${linha}</p>`).join('')}
                    </div>
                `;
            };

            container.innerHTML = `
                <h2 class="section-title">Liturgia do Dia</h2>
                <p><strong>Data:</strong> ${dataLiturgia}</p>
                <p><strong>Cor Litúrgica:</strong> ${cor}</p>
                
                <h2 class="section-title">Antífonas</h2>
                <p><strong>Entrada:</strong> ${antifonas.entrada || 'Não disponível'}</p>

                <p><strong>Oração Coleta:</strong> ${oracoes.coleta || 'Não disponível'}</p>
                
                <h2 class="section-title">Liturgia da Palavra</h2>
                
                <!-- Primeira Leitura -->
                <div class="leitura">
                    <h3>Primeira Leitura</h3>
                    <p><strong>Referência:</strong> ${primeiraLeitura.referencia || 'Não disponível'}</p>
                    <p>${primeiraLeitura.texto || 'Texto não disponível'}</p>
                </div>
                
                <!-- Salmo Responsorial -->
                ${formatarSalmo(salmo)}

                <!-- Segunda Leitura (aparece apenas se houver dados) -->
                ${
                    segundaLeitura
                        ? `
                        <div class="leitura">
                            <h3>Segunda Leitura</h3>
                            <p><strong>Referência:</strong> ${segundaLeitura.referencia || 'Não disponível'}</p>
                            <p>${segundaLeitura.texto || 'Texto não disponível'}</p>
                        </div>
                    `
                        : ''
                }

                <!-- Evangelho -->
                <div class="leitura">
                    <h3>Evangelho</h3>
                    <p><strong>Referência:</strong> ${evangelho.referencia || 'Não disponível'}</p>
                    <p>${evangelho.texto || 'Texto não disponível'}</p>
                </div>
                
                <!-- Orações -->
                <h2 class="section-title">Orações</h2>
                <p><strong>Oração da Comunhão:</strong> ${oracoes.comunhao || 'Não disponível'}</p>
                
                <!-- Antífona de Comunhão -->
                <h2 class="section-title">Antífona de Comunhão</h2>
                <p>${antifonas.comunhao || 'Não disponível'}</p>
            `;
        } catch (error) {
            console.error('Erro ao carregar a liturgia:', error);

            const container = document.getElementById('evangelho-container');
            if (container) {
                container.innerHTML = `
                    <p>Erro ao carregar a liturgia do dia. Tente novamente mais tarde.</p>
                `;
            }
        }
    }

    // Chama a função para carregar a liturgia
    carregarLiturgia();
});
