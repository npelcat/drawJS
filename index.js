//1.Identifier le canvas
const canvas = document.getElementById("art");

//2.Lui donner le contexte :
const ctx = canvas.getContext("2d");

//4.Créer une fonction pour récupérer la position de la souris par rapport au canvas (dans une fonction car on en aura besoin dans plusieurs évènements) :
function getMousePos(e) {
    //".getBoundingClientRect()" : Permet de récupérer les dimensions du rectangle de canvas :
    const rect = canvas.getBoundingClientRect();
    //Retourne-moi un tableau avec position x et position y :
    //Emplacement de la souris = clientX et clientY
    //Soustraire la position du canvas = left & top (ici 8px du bord) :
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
};

//7. Créer une fonction qui dessine au mouvement de la souris :
function mouseMove(e) {
    //Je te passe aussi la position de la souris :
    const mousePos = getMousePos(e);
    //Fais moi une ligne :
    ctx.lineTo(mousePos.x, mousePos.y);
    //Dessine cette ligne :
    ctx.stroke();
    //Lui donner une couleur
    //NOTE : la couleur peut-être un paramètre que l'utilisateur peut changer en cliquant sur des inputs (on récupère la valeur de l'input et on le passe dans une variable(ex:color) à ctx.strokeStyle.
    ctx.strokeStyle = "salmon";
    //Même chose pour le style de largeur du trait : possibilité de mettre un input de type range, et récupérer la valeur dans une variable (ex:lineWeight) pour créer un trait + ou - gros.
    //Ici, le chiffre est en px.
    ctx.lineWidth = 5;
};

//3.Ajouter un évènement au canvas quand on appuie sur la souris :
//On récupère l'évènement (e)
canvas.addEventListener("mousedown", (e) => {
    //Ne pas oublier d'éviter le comportement par défault : drag & drop (emporter des choses avec la souris) :
    e.preventDefault();
    
    //5.Dans cet évènement, dire au canvas de préparer un chemin, et de suivre les coordonnées de la souris :
    //Obtenir l'objet "emplacement de la souris" [x,y] et le mettre dans une variable :
    const mousePos = getMousePos(e);
    //Tu commences à dessiner quelque chose :
    ctx.beginPath();
    //Donner des valeurs dynamiques à x et y dans la méthode .moveTo grâce à notre variable déclarée ci-dessus :   
    ctx.moveTo (mousePos.x, mousePos.y);

    //6.Ajouter un event A L'INTERIEUR du premier (mousedown), afin que le chemin ne se trace que quand ces deux conditions sont réunies :
    //Au mouvement de la souris (mousemove) je veux que tu me joues la fonction mouseMove (qui dessine une ligne) :
    canvas.addEventListener("mousemove", mouseMove);

    //8.Enlever la fonction "mouveMove" (dessine) lorsqu'on relâche la souris :
    canvas.addEventListener("mouseup", () => {
        canvas.removeEventListener("mousemove", mouseMove);
    });
});

//9.Ajouter un évènement au bouton pour tout remettre à zéro (ID déjà connu donc pas besoin de le mettre dans une variable) :
reset.addEventListener("click", () => {
    //Utiliser le ".clearRect" et lui donner la dimension totale du canvas (0 pour x et y, puis aller chercher la largeur et la hauteur de façon dynamique) : 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});