document.addEventListener('DOMContentLoaded', () => {
    let characterIndex = 0;
    const characters = document.querySelectorAll('.character');
    const charImg = document.querySelector('.char-img');
    const characterContainer = document.querySelector('.character-container');
    const characterNameTitle = document.querySelector('.name-selected h1');
    const characterNameP = document.querySelector('.character-container p');
    const darkOverlay = document.querySelector('.dark-overlay');

    updateSelection(characters); // Atualiza a seleção dos personagens ao iniciar a página

    document.addEventListener('keydown', (e) => {        
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            const totalRows = 6;
            const totalCharacters = characters.length;

            switch (e.key) {
                case 'ArrowUp':
                    if (characterIndex % totalRows === 0) { // Atualiza o index para o último personagem da coluna
                        characterIndex += totalRows - 1;
                    } else { // Atualiza o index para o personagem logo acima
                        characterIndex -= 1;
                    }
                    break;
                    
                case 'ArrowDown':
                    if ((characterIndex + 1) % totalRows === 0) { // Atualiza o index para o primeiro personagem da coluna
                        characterIndex -= totalRows - 1;
                    } else { // Atualiza o index para o personagem logo abaixo
                        characterIndex += 1;
                    }
                    break;                        
    
                case 'ArrowLeft':
                    if (characterIndex >= totalRows) { // Atualiza o index para o personagem logo a esquerda
                        characterIndex -= totalRows;
                    } else if (characterIndex === 0) { // Atualiza o index para o último da lista
                        characterIndex = (totalCharacters - 1);
                    } else { // Atualiza o index para o último personagem da linha anterior
                        characterIndex += (totalCharacters - totalRows - 1);
                    }
                    break;
    
                case 'ArrowRight':
                    if (characterIndex + totalRows < totalCharacters) { // Atualiza o index para o personagem logo a direita
                        characterIndex += totalRows;
                    } else if (characterIndex === (totalCharacters - 1)) { // Atualiza o index para o primeiro da lista
                        characterIndex = 0;
                    } else { // Atualiza o index para o primeiro personagem da linha seguinte
                        characterIndex -= (totalCharacters - totalRows - 1);
                    }
                    break;
            }
    
            updateSelection(); // Atualiza a seleção dos personagens sempre que uma das teclas for pressionada
        }
        

        // Dinamismo na página index ao pressionar as teclas Espaço ou Enter
        if ((window.location.endsWith('/') || window.location.pathname.includes('index')) && (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter')) {
            const logo = document.querySelector('.logo');
            logo.classList.add('grow');

            const pressStart = document.querySelector('.press-start');
            pressStart.style.display = 'none';

            darkOverlay.classList.add('active');

            setTimeout(() => {
                window.location.href = 'select.html';
            }, 900);
        }

        // Dinamismo na página select
        if ((window.location.pathname.includes('select'))) {
            if (e.key === 'o' || e.key === 'O') {
                window.location.href = 'index.html'; // Voltar para index ao pressionar a letra "O" do teclado
            }

            if (e.key === 'x' || e.key === 'X' || e.key === 'Enter') {
                const titleSelected = document.querySelector('.title-selected');
                const nameSelected = document.querySelector('.name-selected');

                const title = document.querySelector('.title');
                title.classList.add('hide');

                const characterList = document.querySelector('.characters-list');
                characterList.style.display = 'none';

                const options = document.querySelector('.options');
                options.classList.add('hide');

                characterNameP.style.display = 'none';

                setTimeout(() => {
                    titleSelected.style.display = 'flex';
                    nameSelected.style.display = 'flex';
                }, 500);

                setTimeout(() => {
                    titleSelected.style.display = 'none';
                    nameSelected.style.display = 'none';
                    characterContainer.classList.add('zoom');
                }, 2800);

                setTimeout(() => {
                    darkOverlay.style.transition = 'opacity 0.2s ease';
                    darkOverlay.classList.add('active');
                }, 2800);

                setTimeout(() => {
                    window.location.href = 'start.html'; // Navegar para a tela start ao final das mudanças
                }, 3050);
            }
        }

        // Voltar para a página select ao pressionar a letra "O" do teclado
        if ((window.location.pathname.includes('start'))) {
            if (e.key === 'o' || e.key === 'O') {
                window.location.href = 'select.html';
            }
        }
    });

    // Dinamismo na página start
    if ((window.location.pathname.includes('start'))) {
        const p1 = document.getElementById('p1');
        const p2 = document.getElementById('p2');
        const p3 = document.getElementById('p3');

        setTimeout(() => {
            p1.style.display = 'none';
            p2.style.display = 'block';
        }, 1600);

        setTimeout(() => {            
            p2.style.display = 'none';
            p3.style.display = 'block';
        }, 3400);

        setTimeout(() => {
            const darkOverlayTop = document.querySelector('.dark-overlay-top');
            const darkOverlayBottom = document.querySelector('.dark-overlay-bottom');
            darkOverlayBottom.classList.add('active');
            darkOverlayTop.classList.add('active');
        }, 4500);
    }

    function showCharImg(index) {
        charImg.style.transform = 'scale(0.8)';
        charImg.style.opacity = '0';
        characterNameP.style.display = 'none';
        // Atualiza o nome de cada personagem
        const characterName = characters[index].querySelector('img').getAttribute('data-name');
        characterNameP.textContent = characterName;
        characterNameTitle.textContent = characterName; // Nome que aparece ao selecionar, antes de passar para a próxima página

        setTimeout(() => {
            const charSrc = characters[index].querySelector('img').getAttribute('data-image');
            charImg.src = charSrc;

            charImg.style.transform = 'scale(1)';
            charImg.style.opacity = '1';
            characterNameP.style.display = 'block';
        }, 100);
    }

    // Função para atualizar o nome e a imagem principal para cada personagem
    function updateSelection() {
        characters.forEach((char, index) => {
            char.classList.remove('selected'); // Remove estilo do personagem anterior
            if (index === characterIndex) {
                char.classList.add('selected'); // Adiciona estilo no personagem atual
                showCharImg(index); // Chama a função de mostrar personagem atual
            }
        });
    }
});

