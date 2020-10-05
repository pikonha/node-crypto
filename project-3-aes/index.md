1. Abra o projeto2CodigoLivro e teste o seu funcionamento. Responda:

1.1. Qual algoritmo é usado no código? Em qual modo?

Usa-se algoritmo AES no modo CBC

1.2. Explique o que faz o método generateKey da classe KeyGenerator

https://docs.oracle.com/javase/7/docs/api/javax/crypto/KeyGenerator.html.
A classe KeyGenerator fornece a funcionalidade de um gerador de chave secreta(simétrica). Os geradores de chave são construídos a partir da instancia desta classe. Com a instancia de objeto, conseguimos chamar o método generateKey para gerar a chave secreta.

1.3. Explique como são usados os métodos init, update e doFinal para cifrar e para decifrar os dados
nesse código. Leia a documentação e entenda bem o funcionamento desses métodos.

método init
Chamamos o método init para inicializar o objeto Cipher passando como parametros o modo de operação da cifra junto com uma key. Opcionalmente também, podemos transmitir uma fonte de aleatóriedade. Por padrão é usado uma implementação SecureRandom do provedor instalado de maior prioridade.
No caso do exemplo, Cipher.ENCRYPT_MODE, inicia o objeto cipher no modo de criptografia.
O aesKey é a chave
E o ivSpec é o nosso IV

update
Após ter o objetivo cipher criado, precisamos passar para ele quais são os parametros para nossa informação ser criptografada.
No caso do exemplo 'int ctLength = cipher.update(iv, 0, iv.length, cipherText, 0);'
Ele atualiza a cifra com os parametros iv, 0, iv.length, cipherText, 0.

doFinal
Depois de inicializar o objeto Cipher, chamamos o método doFinal para executar a operação de criptografia ou descriptografia. Este método retorna uma matriz de bytes que contém a mensagem criptografada ou descriptografada.
O método doFinal também redefine o objeto cipher para o estado em que estava quando inicializado anteriormente por meio de uma chamada ao método init, disponibilizando o objeto cipher para criptografar ou descriptografar mensagens adicionais.
