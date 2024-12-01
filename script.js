document.getElementById('addPlayer').addEventListener('click', () => {
    const playerSection = document.getElementById('playerSection');
    const newPlayerDiv = document.createElement('div');
    newPlayerDiv.classList.add('player');
    newPlayerDiv.innerHTML = `
        <input type="text" name="playerName" placeholder="Nom du joueur" required>
        <button type="button" onclick="removePlayer(this)">Supprimer</button>
    `;
    playerSection.appendChild(newPlayerDiv);
});

function removePlayer(button) {
    button.parentElement.remove();
}

document.getElementById('exportExcel').addEventListener('click', () => {
    const clubName = document.getElementById('clubName').value;
    const coachName = document.getElementById('coachName').value;
    const exercise = document.getElementById('exercise').value;
    const players = Array.from(document.getElementsByName('playerName')).map(input => input.value);

    if (!clubName || !coachName || players.length === 0 || !exercise) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const data = [
        ['Nom du Club', clubName],
        ['Nom de l\'Entraîneur', coachName],
        ['Exercice', exercise],
        ['Joueurs', ...players]
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Séance');
    XLSX.writeFile(wb, `${clubName}_Séance.xlsx`);
});
