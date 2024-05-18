## Trabalhando com streams em serviços HTTP.

#### Como rodas o codigo:
 - Em breve

<br />

--------------

<details>
  <summary>Tipos fundamentais de streams no Node:</summary>
  
  ### **Tipos fundamentais de streams no Node.**

  **Readable**: São abstrações de uma origem de dados. Pode ser um arquivo, uma request, em geral qualquer lugar que pode prover dados que podem ser consumidos. Um exemplo clássico e bem visível é o método fs.createReadStream do pacote fs do Node, que permite que leiamos o conteúdo de um arquivo a partir da sua stream. Neste caso, a fonte abstraída é o arquivo.

  **Writable**: Assim como as Readable, são abstrações para destinos de dados onde podemos enviar informações ou escrever algo. Pode ser um arquivo, uma resposta HTTP, entre outros. Da mesma forma, o modelo mais visível é o fs.createWriteStream, que permite que escrevamos em um arquivo apenas enviando dados para essa stream.

  **Duplex**: São streams que, ao mesmo tempo, são Writable e Readable. O exemplo mais comum são os sockets TCP, muito utilizados com socket.io, que permitem a escrita de informações ao mesmo tempo que a leitura também é permitida.

  **Transform**: é basicamente streams do tipo Duplex que, em geral, são utilizadas para modificar os dados trafegados por elas. Por exemplo, podemos utilizar uma stream que recebe uma String em letra minúscula, converter toda ela para maiúsculo e escrever em outra stream. Um exemplo desse modelo são Buffers e zlib.createGzip, que comprimem o dado usando o formato gzip.

</details>


<details>
  <summary>Stream de escrita e transformação:</summary>
  
  ### **Qual a diferença entre Writable e Transform Stream?**

  A primeira e principal diferença é que a WriteableStream não consegue enviar dados para outra Stream, ela só **RECEBE** dados e faz algo com esses dados.

  Imagine a seguinte situação:

  Você está criando um script de processamento de áudio, a ideia é ler um arquivo de áudio, normalizar o volume do áudio, ou seja, cuidar para não ficar nem muito alto, nem muito baixo e, após a normalização, salvar novamente em um arquivo do sistema.

  Utilizando o conceito de Streams logo nos vem a cabeça poder ler/escrever esse arquivo no sistema utilizando Streams, dessa forma evitamos que o arquivo fique salvo em memória poupando recursos.

  Se usarmos o `fs.createReadStream` para ler o conteúdo do arquivo, estamos criando uma Stream de leitura, ou seja, podemos ler os dados gradualmente e enviar para alguma outra Stream.

  Se enviarmos esses dados para uma Stream de escrita (`WriteableStream`), essa poderá receber os dados aos poucos, normalizar o áudio normalmente, mas não conseguirá enviar os pedacinhos do áudio normalizado para outra Stream porque uma `WriteableStream` sempre é um ponto final, não consigo encaminhar nada dali para frente.

  Se eu usar uma `TransformStream`, posso também ler a Stream de leitura do arquivo de áudio, normalizar o volume e reencaminhar os dados processados para fora dessa Stream, para então usar um `fs.createWriteStream` para escrever o arquivo em disco com o áudio normalizado.
</details>

<details>
  <summary>O que faz o método pipe:</summary>
</details>

<details>
  <summary>O que é um Buffer:</summary>
  o buffer é uma representação de um espaço na memória do computador e ele é usado transitar dados de uma maneira rápida.

  O Node utiliza os buffers na leitura e escrita de stream pois é uma das maneiras de salvar e ler dado damemoria do computador de forma performatica, tudo issopor que o buffer guarda na memoria os dados em binario.
  
</details>

<details>
  <summary>usando Await dentro de uma Stream:</summary>

  ### **usando Await dentro de uma Stream**

  No exemplo usamos o ```for await``` ele irá garantir que nossa applicação execute a lógica apenas quando finalizar a leitura da stream.
  
  Basicamente o ```await``` dentro de uma Stream serve para aguarda cada pedaço/chunk da nossa stream seja carregado antes de carregar o proximo até que tenhamos terminado deler por completo a stream.
</details>
