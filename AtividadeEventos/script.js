// Grupo: Kauã Reis, Marlon Daniel, Enzo Frade e Mateus de Oliveira

// ============================================================
// ARRAY DE CURSOS (objetos com título, descrição, categoria, preço)
// ============================================================

const cursos = [
  {
    id: 'direito-civil',
    titulo: 'Direito Civil Avançado',
    descricao: 'Aprofundamento em obrigações, contratos e responsabilidade civil com casos práticos do cotidiano jurídico.',
    categoria: 'direito',
    preco: 99
  },
  {
    id: 'direito-penal',
    titulo: 'Direito Penal',
    descricao: 'Estudo completo da teoria do crime, penas e legislação penal especial com foco em questões de concurso.',
    categoria: 'direito',
    preco: 89
  },
  {
    id: 'constitucional',
    titulo: 'Direito Constitucional',
    descricao: 'Princípios fundamentais, direitos e garantias, organização do Estado e controle de constitucionalidade.',
    categoria: 'direito',
    preco: 119
  },
  {
    id: 'tecnicas-estudo',
    titulo: 'Técnicas de Estudo',
    descricao: 'Aprenda métodos como mapas mentais, Feynman e repetição espaçada para memorizar conteúdo com eficiência.',
    categoria: 'produtividade',
    preco: 79
  },
  {
    id: 'gestao-tempo',
    titulo: 'Gestão do Tempo',
    descricao: 'Organize sua rotina de estudos com planejamento semanal, metas SMART e controle de produtividade.',
    categoria: 'produtividade',
    preco: 69
  },
  {
    id: 'front-end',
    titulo: 'Desenvolvimento Front-End',
    descricao: 'HTML, CSS e JavaScript do zero ao avançado com projetos práticos e responsividade.',
    categoria: 'tecnologia',
    preco: 149
  }
];

// ============================================================
// ESTADO DA APLICAÇÃO
// ============================================================

let cursosConcluidos = [];

// ============================================================
// SELETORES (getElementById e querySelector)
// ============================================================

const gradeCursos       = document.getElementById('gradeCursos');
const campoBusca        = document.getElementById('campoBusca');
const filtroCategoria   = document.getElementById('filtroCategoria');
const contadorConcluidos = document.getElementById('contadorConcluidos');
const totalCursosEl     = document.getElementById('totalCursos');

const formInscricao  = document.getElementById('formInscricao');
const nomeInscricao  = document.getElementById('nomeInscricao');
const emailInscricao = document.getElementById('emailInscricao');
const cursoInscricao = document.getElementById('cursoInscricao');
const msgInscricao   = document.getElementById('msgInscricao');

const formDashboard = document.getElementById('formDashboard');
const msgDashboard  = document.getElementById('msgDashboard');

const formPomodoro = document.getElementById('formPomodoro');
const msgPomodoro  = document.getElementById('msgPomodoro');

// ============================================================
// REQUISITO 1: renderizar cursos com map() e innerHTML
// ============================================================

function renderizarCursos(lista) {
  if (lista.length === 0) {
    gradeCursos.innerHTML = '<p class="sem-cursos">Nenhum curso encontrado.</p>';
    return;
  }

  gradeCursos.innerHTML = lista.map(curso => {
    const concluido = cursosConcluidos.includes(curso.id);
    return `
      <div class="card-curso ${concluido ? 'concluido' : ''}" data-id="${curso.id}">
        <p class="card-titulo">${curso.titulo}</p>
        <span class="card-categoria">${curso.categoria}</span>
        <p class="card-preco">R$ ${curso.preco.toFixed(2).replace('.', ',')}</p>
        <p class="card-descricao oculto">${curso.descricao}</p>
        <div class="botoes-card">
          <button class="btn-detalhes" data-id="${curso.id}">Ver detalhes</button>
          <button class="btn-concluir" data-id="${curso.id}" ${concluido ? 'disabled' : ''}>
            ${concluido ? 'Concluído ✓' : 'Marcar como concluído'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  registrarEventosCards();
}

// ============================================================
// FUNCIONALIDADE 1: botão de detalhes (click)
// FUNCIONALIDADE 4: destaque com mouse (mouseover / mouseout)
// FUNCIONALIDADE 5: progresso (click no btn-concluir)
// ============================================================

function registrarEventosCards() {
  const cards = document.querySelectorAll('.card-curso');

  cards.forEach(card => {
    const btnDetalhes = card.querySelector('.btn-detalhes');
    const btnConcluir = card.querySelector('.btn-concluir');
    const descricao   = card.querySelector('.card-descricao');

    // Funcionalidade 1 — mostrar/ocultar descrição ao clicar em "Ver detalhes"
    btnDetalhes.addEventListener('click', () => {
      descricao.classList.toggle('oculto');
      card.classList.toggle('ativo');

      if (descricao.classList.contains('oculto')) {
        btnDetalhes.textContent = 'Ver detalhes';
      } else {
        btnDetalhes.textContent = 'Ocultar detalhes';
      }
    });

    // Funcionalidade 5 — marcar curso como concluído
    btnConcluir.addEventListener('click', () => {
      const id = btnConcluir.dataset.id;

      if (!cursosConcluidos.includes(id)) {
        cursosConcluidos.push(id);
      }

      btnConcluir.textContent = 'Concluído ✓';
      btnConcluir.disabled = true;
      card.classList.add('concluido');

      contadorConcluidos.textContent = cursosConcluidos.length;
    });

    // Funcionalidade 4 — destaque visual ao passar o mouse
    card.addEventListener('mouseover', () => {
      card.classList.add('destaque');
    });

    card.addEventListener('mouseout', () => {
      card.classList.remove('destaque');
    });
  });
}

// ============================================================
// FUNCIONALIDADE 2: busca por texto (input)
// FUNCIONALIDADE 3: filtro por categoria (change)
// ============================================================

function filtrarCursos() {
  const texto     = campoBusca ? campoBusca.value.toLowerCase() : '';
  const categoria = filtroCategoria ? filtroCategoria.value : 'todos';

  const filtrados = cursos.filter(curso => {
    const matchTexto = curso.titulo.toLowerCase().includes(texto)
                    || curso.descricao.toLowerCase().includes(texto)
                    || curso.categoria.toLowerCase().includes(texto);
    const matchCategoria = categoria === 'todos' || curso.categoria === categoria;
    return matchTexto && matchCategoria;
  });

  renderizarCursos(filtrados);
}

if (campoBusca) {
  campoBusca.addEventListener('input', filtrarCursos);
}

if (filtroCategoria) {
  filtroCategoria.addEventListener('change', filtrarCursos);
}

// ============================================================
// FUNCIONALIDADE 6: formulário de inscrição com validação (submit)
// ============================================================

if (formInscricao) {
  formInscricao.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (nomeInscricao.value.trim() === '' || emailInscricao.value.trim() === '') {
      msgInscricao.textContent = 'Preencha nome e e-mail antes de se inscrever.';
      msgInscricao.className = 'mensagem-form mensagem-erro';
    } else {
      msgInscricao.textContent = `Inscrição realizada com sucesso! Bem-vindo(a), ${nomeInscricao.value.trim()}.`;
      msgInscricao.className = 'mensagem-form mensagem-sucesso';
      formInscricao.reset();
    }
  });
}

// ============================================================
// FORMULÁRIO DO DASHBOARD (submit)
// ============================================================

if (formDashboard) {
  formDashboard.addEventListener('submit', (evento) => {
    evento.preventDefault();
    msgDashboard.textContent = 'Progresso salvo com sucesso!';
    msgDashboard.className = 'mensagem-form mensagem-sucesso';
  });
}

// ============================================================
// FORMULÁRIO POMODORO (submit)
// ============================================================

if (formPomodoro) {
  formPomodoro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const materia  = document.getElementById('materia');
    const duracao  = document.getElementById('duracao');
    const ciclos   = document.getElementById('ciclos');
    const data     = document.getElementById('data');

    if (!materia.value || !duracao.value || !ciclos.value || !data.value) {
      msgPomodoro.textContent = 'Preencha todos os campos obrigatórios.';
      msgPomodoro.className = 'mensagem-form mensagem-erro';
    } else {
      msgPomodoro.textContent = `Sessão de "${materia.value}" registrada com sucesso!`;
      msgPomodoro.className = 'mensagem-form mensagem-sucesso';
      formPomodoro.reset();
    }
  });
}

// ============================================================
// FUNCIONALIDADE 7: foco nos campos (focus / blur)
// Aplica a todos os inputs da página
// ============================================================

document.querySelectorAll('input').forEach(campo => {
  campo.addEventListener('focus', () => {
    campo.classList.add('campo-ativo');
  });

  campo.addEventListener('blur', () => {
    campo.classList.remove('campo-ativo');
  });
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================

if (gradeCursos) {
  if (totalCursosEl) {
    totalCursosEl.textContent = cursos.length;
  }
  renderizarCursos(cursos);
}
