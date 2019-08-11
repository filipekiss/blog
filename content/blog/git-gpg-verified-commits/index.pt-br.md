---
title: Assinando commits no Git
spoiler:
    Um guia simples de como criar a usar uma chave GPG pra assinar commits no
    git - E como associar a chave com a sua conta no GitHub.
date: 2019-08-11
published: true
---

Eu já assino todo meus commits há algum tempo -
[mesmo que eu seja o único no projeto](https://github.com/filipekiss/dotfiles/commits/master)
— e eu sempre me enrolo na hora de explicar como configurar o git e o GitHub pra
funcionar com chaves GPG. Não é um processo complicado, mas é uma série de
pequenos passos e é difícil lembrar de todos na ordem correta de uma só vez. Já
que eu precisei gerar uma nova chave pra usar no trabalho, eu decidi escrever
esse artigo pra que eu possa usar de referência caso eu tenha alguma dúvida e
precise fazer isso de novo. Esse artigo também vai servir de referência pra um
artigo ensinando a usar múltiplas chaves GPG (uma pessoal e uma pro trabalho,
por exemplo) que eu escreverei em breve.

> ###### Aviso
>
> Eu vou focar na parte do git — estou presumindo que você já tenha o gnupg
> instalado e configurado. Para referência, aqui estão as versões que eu utilizo
> na data de publicação desse artigo:
>
> ```
> git --version
> git version 2.22.0
>
> gpg --version
> gpg (GnuPG) 2.2.16
> libgcrypt 1.8.4
> ```

#### Gerando uma nova chave

É bem simples gerar uma chave nova. Basta rodar o comando abaixo e seguir os
_prompts_ que aparecem na tela. Eu coloquei uma pequena explicação de cada passo
abaixo.

```sh
gpg --full-generate-key
```

A primeira opção é o tipo da chave. Basta usar **RSA**, que é o formato padrão.

A próxima opção é o quão longa você quer que sua chave seja. O nome dessa
propriedade é
[entropia](https://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength)
e basicamente significa o _quão imprevisível a sua chave é_. Por padrão, o
tamanho da entropia é 2048. Você pode ir até 4096 e número maiores significam
chaves mais difíceis de serem quebradas. Se você estiver feliz com 2048, é só
apertar `enter`.

A terceira opção é pra você decidir por quanto tempo sua chave será válida.
[É uma boa prática](https://riseup.net/en/security/message-security/openpgp/best-practices#use-an-expiration-date-less-than-two-years)
fazer com que suas chaves expirem em menos de dois anos. Não se preocupe, você
pode "renovar" uma chave **mesmo depois da sua data de expiração**. Eu
normalmente coloco as minhas chaves pra expirar a cada 6 meses. Uma pergunta
confirmando a data de expiração (or se você realmente quer que a chave não
expire) vai aparecer. Aperte `y` e depois `enter`.

> Se você definir uma data de expiração, coloque um lembrete no seu calendário
> alguns dias antes da chave expirar. Você não quer fazer as coisas com pressa
> quando se trata das suas chaves

Agora preencha seus detalhes — Nome, endereço de email e quem sabe até um
comentário pra te ajudar a identificar essa chave no futuro — e, depois de tudo
definido, basta pressionar **O** para _Okay_

Agora adicione uma senha pra sua chave. Certifique-se de que você vai lembrar
dessa senha (ou utilize um gerenciador de senhas). Confirme sua senha e sua
chave será gerada.

Para confirmar que a chave foi gerada corretamente, rode o seguinte comando

```sh
gpg --list-secret-keys --keyid-format long
```

Você vai ver a saída do comando algo como o texto abaixo:

```
/Users/filipe/.gnupg/pubring.kbx
--------------------------------
sec   rsa2048/A5A675575744B557 2019-07-23 [SC] [expires: 2020-07-24]
BE067D6014DA532143BEE0FCA5A675575744B557
uid                 [ultimate] Test Key <test@key.com>
ssb   rsa2048/A94CC8A32216CCEE 2019-07-23 [E] [expires: 2020-07-24]
```

Como você pode ver, logo antes do nome tem um `[ultimate]`. Já que a chave
acabou de ser criada, ela é definida com o maior nível de confiança.

Da saída desse comando, você precisa pegar o identificador da chave pra que a
gente possa falar pro git qual chave utilizar quando estiver assinando commits.

A primeira linha da chave (terceira linha no exemplo acima, logo abaixo dos
traços), a que diz `sec rsa2048…`, é a linha que nós estamos interessados. Você
vai precisar de tudo depois da `/` até o próximo espaço em branco. No exemplo
acima, isso seria `A5A675575744B557`. Essa ID será necessária pra duas coisas. A
primeira é dizer ao git qual chave utilizar. A segunda é exportar a chave pra
que possamos colocar no GitHub.

#### Configurando o git pra assinar seus commits

Agora que já temos a chave, vamos configurar o git pra que ele saiba qual chave
utilizar pra assinar todos os nossos commits daqui pra frente. Guardou bem a ID
da chave? Ótimo! Vamos lá:

```sh
git config user.signingkey A5A675575744B557
```

**Não esqueça de substituir a ID acima pela ID que você pegou anteriormente**

Se tudo foi feito corretamente, da próxima vez que você fizer um `git commit`, o
git vai te pedir a senha da sua chave pra fazer a assinatura.

![Pinentry requesting the key password](./pinentry.png)

#### Adicionando a chave a sua conta do GitHub

Vá até a sua página de configurações do GitHub e clique em
[SSH and GPG keys](https://GitHub.com/settings/keys). Em seguida, clique no
botão `New GPG key`. Clicando nesse botão você deve ser redirecionado para
[a página onde você pode adicionar uma chave nova](https://GitHub.com/settings/gpg/new)

Volte ao terminal e exporte a sua chave pública (assim como chaves SSH, o GitHub
só precisa da sua chave pública, nunca da privada) — não esqueça de mudar a ID
do comando abaixo pela ID que você pegou no último comando:

```sh
gpg --armor --export A5A675575744B557
```

Todo o texto que esse comando gerar deverá ser copiado e colado no GitHub.

Se tudo deu certo e você já fez push de um commit assinado com essa chave, você
já deve ter uma bela insígnia "Verified" :)

![GitHub Commit with the Verified Badge](./verified-commit.png)

Em breve eu vou escrever uma sequência desse artigo, explicando como eu faço pra
gerenciar uma chave pra uso pessoal e uma pra uso nos repositórios do trabalho e
como você pode configurar algo similar.
