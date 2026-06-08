---
title: Básico do Pixel Composer
order: 2
---
[Pixel Composer](https://pixel-composer.com) é uma ferramenta de arte 2D e 3D usada no pacote para criar várias texturas animadas, incluindo o novo logotipo! Como não há muita documentação disponível online, estou criando este artigo para compartilhar o que sei.

<h1 align="center">  Básicos </h1>
<p align="center"> Vamos detalhar os elementos. </p>
<p align="center">
  <img width="1440" height="720" alt="full" src="https://github.com/user-attachments/assets/14cbcb75-e44b-4e5b-80ef-9c8ee8ed6472" />
</p>

<h2 align="center"> A) Janela de Pré-visualização </h2>
<p align="center"> 
A janela de pré-visualização é usada para mostrar qual nó está sendo visualizado no momento. Você pode abrir a pré-visualização de um nó dando um duplo clique no nó, ou clicando com o botão direito e selecionando "send to preview". A janela de pré-visualização também é onde você desenhará se usar a ferramenta "canvas".
</p>

<p align="center">
  <img width="420" height="740" alt="preview" src="https://github.com/user-attachments/assets/a52b6048-b9d3-4757-be48-24b7b98211ab" />
</p>

**1\) Tiling**
> O principal a notar é que você pode visualizar o tiling ativando a opção de tiling.

<h2 align="center"> B) Espaço de Trabalho </h2>
<p align="center"> 
O espaço de trabalho é onde você conectará nós para produzir uma imagem. Você pode adicionar nós clicando com o botão direito no espaço vazio e selecionando o nó desejado. Há muitos nós disponíveis, mas vamos nos restringir ao básico para imagens 2D.
</p>

<p align="center">
  <img width="1440" height="190" alt="basics" src="https://github.com/user-attachments/assets/50d08602-4ef3-4f03-97f8-ae4d2c7c08ba" />
</p>

**1\) Noise**
> Padrões de noise são seus melhores aliados para criar texturas procedurais. Alguns fazem tile de forma contínua enquanto outros não, e alguns podem ser animados para ciclos em loop enquanto outros não. Experimente diferentes padrões de noise até encontrar o que procura.

**2\) Transform**
> O nó Transform permite realizar transformações básicas, como translação, escala, rotação, etc.

**3\) Colorize**
> O nó Colorize é usado para manipular cor; você pode usar um gradiente ou uma paleta para recolorir seus nós.

**4\) Composite**
> O nó Composite funciona como camadas no Photoshop ou em outros programas de arte.

**5\) Color Adjust**
> O nó Color Adjust permite realizar todos os tipos de ajustes básicos de imagem, como opacidade, matiz, saturação, contraste, etc.

**6\) Render Spritesheet**
> O nó Render Spritesheet organiza todos os quadros da sua linha do tempo em uma única imagem. Você pode controlar a ordem de empilhamento no painel do nó.

**7\) Export**
> O nó Export pega o nó de entrada e o converte para um tipo de arquivo a ser salvo no seu PC.

<h2 align="center"> C) Painel de Nós </h2>
<p align="center"> 
O painel de nós é onde você passará a maior parte do tempo ajustando as configurações de cada um dos seus nós.
</p>

<p align="center">
<img width="480" height="872" alt="tools" src="https://github.com/user-attachments/assets/678684fd-d345-4cba-8f50-a9e37a78955d" />
</p>

**1\) Animação**
> O botão com aparência de cronômetro é usado para habilitar a animação da configuração atual na linha do tempo.

**2\) Visibilidade**
> O botão com aparência de olho impedirá que a configuração atual seja exibida na pré-visualização.

**3\) Mapeamento**
> O botão com aparência de dado alterna o mapeamento da configuração atual, permitindo que você altere seus valores com nós.

<h2 align="center"> D) Linha do Tempo </h2>
<p align="center"> 
A linha do tempo controla sua animação com o uso de keyframes. Você pode reproduzir a linha do tempo pressionando a tecla espaço. A linha do tempo precisa ser reproduzida para que alguns nós funcionem — como o "Render Spritesheet".
</p>

<p align="center">
<img width="1440" height="220" alt="timeline" src="https://github.com/user-attachments/assets/0de1a039-c9bf-4f56-9350-61c872a7f972" />
</p>

**1\) Configurações**
> Algo importante a saber é que você controlará o comprimento da linha do tempo e a taxa de quadros no menu de configurações no canto inferior direito. Observe que a taxa de quadros não será aplicada à sua exportação, apenas à pré-visualização. Você controla a taxa de quadros da exportação no painel do nó Export.

> ### TODO: 
> Substituir arquivos de imagem por links.