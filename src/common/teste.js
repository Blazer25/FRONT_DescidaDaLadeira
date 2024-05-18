import axios from 'axios'

const url = "http://localhost:3000/equipe";
const headers = {
  Authorization:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTE4ZjU3MGVlZWUwNGUyNTk5OTg3OCIsImlhdCI6MTcxNTkxODc3NCwiZXhwIjoxNzE1OTYxOTc0fQ.gFl6x9mAH7h6D1SD15BQk6z-Socre5mISwqXQihUuR4",
  "Content-Type": "application/json",
  "User-Agent": "insomnia/8.6.1",
};

const equipes = [
  {
    nome: "M&M'S",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Gabriel de Angelo Passos", RA: "1630992413013" },
      { nome: "Giovana Garcia Guerreiro", RA: "1630992413030" },
      { nome: "Laura Apoliana de Carvalho", RA: "1630992413039" },
      { nome: "Marcelo Augusto Bernadi", RA: "1630992413047" },
      { nome: "Pedro Henrique Corassa Sobroza", RA: "1630992413019" },
    ],
  },
  {
    nome: "PCM 2.0",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Vinícius Eduardo Silva Costa", RA: "163099241343" },
      { nome: "Vitor Menandro Aguiar", RA: "1630992413018" },
      { nome: "Marco Túlio de Pietro", RA: "1630992413007" },
      { nome: "Kevin Goularte", RA: "1630992413027" },
      { nome: "Kauã de Campos Buenos", RA: "1630992413031" },
    ],
  },
  {
    nome: "GUERRILHA",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Gabriel Henrique da Costa Ferné", RA: "1631002221014" },
      { nome: "João Paulo Alesbão", RA: "1631002221019" },
      { nome: "Ariana Aparecida Caetano", RA: "1631002221005" },
      { nome: "Vitória Cristina de Souza Pereira", RA: "1631002111006" },
      { nome: "Milena Aparecida Costa Silva", RA: "1631002221013" },
    ],
  },
  {
    nome: "RELÂMPAGO MARQUINHOS",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "João Guilherme de Godoi Souza", RA: "1630792222028" },
      { nome: "Júlio Cesar Oliveira Guedes", RA: "1630792222014" },
      { nome: "Guilherme Augusto Martins de Sousa Porto", RA: "1630792222022" },
      { nome: "Matheus Igor Percebom Aio", RA: "1630792222019" },
      { nome: "Paulo Augusto Alvarenga", RA: "1630792012026" },
    ],
  },
  {
    nome: "LOUCOS DA LADEIRA",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Leandro Ricardo de Campos", RA: "1631002121017" },
      { nome: "Carlos Rogerio Oliveira", RA: "1631002121037" },
      { nome: "Marcelo Benatti", RA: "1631002121025" },
      { nome: "Vitor Bohemio Flores", RA: "1631002121044" },
      { nome: "Bryan Kasperski", RA: "1631002121035" },
    ],
  },
  {
    nome: "ROLI WHEELS",
    quantidadeIntegrantes: 3,
    integrantes: [
      { nome: "Nichollas Vinicius Pereira", RA: "1630992323020" },
      { nome: "Marcelo Pedro da Silva", RA: "1630992323039" },
      { nome: "Ryan de Andrade Mendonça", RA: "1630992323003" },
    ],
  },
  {
    nome: "ÁGUIAS DO DECLIVE",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Marcelo Carvalho Filho", RA: "1630992413010" },
      { nome: "Brunno dos Santos Oliveira Lima", RA: "1630992413026" },
      { nome: "Wesley Rafael Ciachi", RA: "1630992413008" },
      { nome: "Aline Maria de Freitas Souza", RA: "1630992413050" },
      { nome: "Pedro Henrique da Silva Pedroso", RA: "1630992413020" },
    ],
  },
  {
    nome: "SUICIDAS DO ASFALTO",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Nicolas Francisco Canduço", RA: "1630992413021" },
      { nome: "Leonardo Elias Ferreira", RA: "1630992413009" },
      { nome: "Roberto Martins de Oliveira", RA: "1630992323002" },
      { nome: "Felipe Daniel Bento", RA: "1630992413023" },
      { nome: "Gustavo Leandro de Oliveira Misael", RA: "1630992413037" },
    ],
  },
  {
    nome: "CAVEIRAO",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Manoel Diego Morais Bernardino", RA: "1630992323001" },
      { nome: "Joel Cristiano Lima da Silva", RA: "1630992113038" },
      { nome: "Unicelso Goulart Ferreira", RA: "1630992123029" },
      { nome: "Alexssandro Liel Júnior", RA: "1630992113022" },
      { nome: "Odinei Aparecido Cavenaghi Junior", RA: "1630991923026" },
    ],
  },
  {
    nome: "KAMIKAZES",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Rogério Pelegrini Alves", RA: "1630992223018" },
      { nome: "Pedro Andrade", RA: "1630992223005" },
      { nome: "Kaique Marcelino", RA: "1630992223007" },
      { nome: "Julio César Galbes", RA: "1630992223014" },
      { nome: "Samuel Delgado", RA: "1630992223042" },
    ],
  },
  {
    nome: "LCR",
    quantidadeIntegrantes: 4,
    integrantes: [
      { nome: "Thiago Henrique Fressatto", RA: "1630992323035" },
      { nome: "Riquelme de Freitas da Silva", RA: "1630992323029" },
      { nome: "Altieris Geraldo Pinto da Silva", RA: "1630992323011" },
      { nome: "César Augusto Oliveira Mochizuki", RA: "1630992323016" },
    ],
  },
  {
    nome: "OS FLINTSTONES",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Matheus de Mello Paixão", RA: "1630992413028" },
      { nome: "Cristiam Almeida Silva", RA: "1630992413004" },
      { nome: "Victor Gabriel dos Santos", RA: "1630992413015" },
      { nome: "João Batista dos Santos Alencar", RA: "1630992413034" },
      { nome: "Gustavo Lopes dos Santos", RA: "1630992413044" },
    ],
  },
  {
    nome: "É O FIM",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Giovanny Oliveira Ferreira", RA: "1630992313004" },
      { nome: "Felipe Rodrigues Silva", RA: "1630992313008" },
      { nome: "Ricardo Henrique Lima de Souza", RA: "1630992313018" },
      { nome: "Luis Kleber de Arruda", RA: "1630992313002" },
      { nome: "Phelipe Dias Aranha", RA: "1630992313027" },
    ],
  },
  {
    nome: "MAFIA ITALIANA",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Ronaldo Felix da Silva", RA: "1630792222026" },
      { nome: "Stefano Calabrese", RA: "1630792222029" },
      { nome: "José Felipe da Silva", RA: "1630792112001" },
      { nome: "Lucas Eduardo Marianno", RA: "1630792212019" },
      { nome: "Julia Cristina Mulley", RA: "1630792212034" },
    ],
  },
  {
    nome: "DESTROYER",
    quantidadeIntegrantes: 2,
    integrantes: [
      { nome: "Júlia Vitória Pierina", RA: "1630642217006" },
      { nome: "Vitor Augusto Ternero Rodrigues", RA: "1630992413025" },
    ],
  },
  {
    nome: "TOP GEAR",
    quantidadeIntegrantes: 4,
    integrantes: [
      { nome: "Maycon Abner de Assis", RA: "1630992213022" },
      { nome: "Fernando Belani", RA: "1630992213005" },
      { nome: "João Pedro Lino de Lima", RA: "1630992313036" },
      { nome: "Renan Gabriel de Godoy", RA: "1630992213025" },
    ],
  },
  {
    nome: "VELOCIDADE MÍNIMA",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Carlos Eduardo dos Santos Oliveira", RA: "1630992313023" },
      { nome: "Nicole Eduarda Pelechati", RA: "1630992313041" },
      { nome: "Matheus Felipe Casagrande", RA: "1630992313003" },
      { nome: "Ronan Antônio Junhi", RA: "1630992313022" },
      { nome: "Jean Cavalheri de Pier", RA: "1630992313030" },
    ],
  },
  {
    nome: "FOGUETÃO",
    quantidadeIntegrantes: 4,
    integrantes: [
      { nome: "Tiago Braz da Silva", RA: "1630992313029" },
      { nome: "Guilherme Domingues de Lima", RA: "1630992213008" },
      { nome: "Leonardo Henrique Cabrera Gomes", RA: "1630992213019" },
      { nome: "Vitor Hugo de Lima Choqueta", RA: "1630992213039" },
    ],
  },
  {
    nome: "MACH10",
    quantidadeIntegrantes: 3,
    integrantes: [
      { nome: "Paulo Henrique de Carvalho Camilo", RA: "1630992213028" },
      { nome: "Rogério da Cruz Alves", RA: "1630992213027" },
      { nome: "Ramon Guilherme de Paula", RA: "1630992213045" },
    ],
  },
  {
    nome: "SENNA 1",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Isaac Luis Falcão Santana", RA: "1630992323028" },
      { nome: "Walter Luis Vicente Amanso", RA: "1630992323025" },
      { nome: "João Felipe Coutinho Pinheiro Gomes", RA: "1630992323012" },
      { nome: "João Marcos da Silveira Souza", RA: "1630992323017" },
      { nome: "João Vitor Polidoro", RA: "1630992323005" },
    ],
  },
  {
    nome: "KATCHAU",
    quantidadeIntegrantes: 4,
    integrantes: [
      { nome: "Athos de Carvalho", RA: "1630992413038" },
      { nome: "Cauã Lucatelli", RA: "1630992413006" },
      { nome: "Leonardo Tobias Cezário", RA: "1630992413046" },
      { nome: "Pedro Gabriel Evangelista da Silva", RA: "1640992413014" },
    ],
  },
  {
    nome: "OS AFOITOS",
    quantidadeIntegrantes: 4,
    integrantes: [
      { nome: "Ezequias Aparecido Tintino", RA: "1630992023007" },
      { nome: "Igor Gabriel Domingos", RA: "1630992413024" },
      { nome: "Victor Ribeiro de Aquino", RA: "1630992023040" },
      { nome: "Arthur de Souza Seixas", RA: "1630992023018" },
    ],
  },
  {
    nome: "SENNA 2",
    quantidadeIntegrantes: 5,
    integrantes: [
      { nome: "Alan Henrique Gonçalves", RA: "1630792222002" },
      { nome: "Yla Vitoria Alvim do Nascimento", RA: "1630792222021" },
      { nome: "Carlos Alberto Gomes de Brito", RA: "1630992413002" },
      { nome: "Edilson Cardoso da Silva", RA: "1630792222015" },
      { nome: "Matheus de Campos Lima", RA: "1630792222017" },
    ],
  },
  {
    nome: "TRINCA ASFALTO",
    quantidadeIntegrantes: 3,
    integrantes: [
      { nome: "Marcelo Beccaria", RA: "1630992313024" },
      { nome: "Ana Laura Bernardino", RA: "1630992313026" },
      { nome: "Wellington José da Silva", RA: "1630992313017" },
    ],
  },
];

equipes.forEach(async (equipe) => {
  try {
    const response = await axios.post(url, equipe, { headers });
    console.log(`Equipe ${equipe.nome} enviada com sucesso: `, response.data);
  } catch (error) {
    console.error(
      `Erro ao enviar equipe ${equipe.nome}: `,
      error.response ? error.response.data : error.message
    );
  }
});
