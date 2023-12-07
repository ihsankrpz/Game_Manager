const divEnsea = document.querySelector(".div-ensea")

// Charger les jeux à partir du fichier JSON
fetch('games.json')
    .then(response => response.json())
    .then(data => {
        // Utiliser les données chargées dans listGames
        const listGames = data;

        listGames.forEach((game,index) => {
            divEnsea.innerHTML += `
                            <div class="col">
                                <article class="card shadow-sm">
                                    <img src="${game.imageUrl}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${game.title}</h5>
                                        <p class="card-text">Year: ${game.year}</p>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-dark view" data-bs-toggle="modal" data-bs-target="#editModal" data-index="${index}">View</button>
                                            <button type="button" class="btn btn-sm btn-outline-dark edit" data-bs-toggle="modal" data-bs-target="#editModal" data-index="${index}">Edit</button>
                                        </div>
                                    </div>
                                </article>
                            </div>` 
        })
        
        //rattraper le bouton avec une classe view
        const btnViewArray = document.querySelectorAll('.view')
        const btnEditArray = document.querySelectorAll('.edit')
        const modalTitle = document.querySelector('#exampleModalLabel')
        const modalBody = document.querySelector('.modal-body')
        const modalFooter = document.querySelector('.modal-footer')
        
        const catchView = (i) => {
            modalTitle.textContent = listGames[i].title
            modalBody.innerHTML = `<img src="${listGames[i].imageUrl}" class="img-fluid">`
            modalBody.innerHTML += `<p class="mt-2"> Year: ${listGames[i].year} </p>`
            modalFooter.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Close</button>
                `
        }
        
        const catchEdit = (i) => {
            modalTitle.textContent = "Edit Card"
            modalBody.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Edit Title</label>
                    <input type="text" class="form-control" id="title" aria-describedby="title" value="${listGames[i].title}">
                </div>
                <div class="mb-3">
                    <label for="year" class="form-label">Edit Year</label>
                    <input type="number" class="form-control" id="year" aria-describedby="year" value="${listGames[i].year}">
                </div>
                <div class="mb-3">
                    <label for="url" class="form-label">Edit Title</label>
                    <input type="text" class="form-control" id="url" aria-describedby="url" value="${listGames[i].imageUrl}">
                    <img src="${listGames[i].imageUrl}" class="img-thumbnail w-75" alt="...">
                </div>
            </form> `
            modalFooter.innerHTML = `
                <button type="submit" class="btn btn-primary submitBtn" data-bs-dismiss="modal">Save Changes</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                `
        }
        
        //rajouter écouter un element view
        btnViewArray.forEach((btn1, index) => {
            btn1.addEventListener('click', () => catchView(index))
        })
        
        btnEditArray.forEach((btn2, index) => {
            btn2.addEventListener('click', () => catchEdit(index))
        })
        
        btnEditArray.forEach((btn3, index) => {
            btn3.addEventListener('click', () => {
                catchEdit(index)
                const submitBtn = document.querySelector(".submitBtn")
        
                /*  submit btn click  */
                submitBtn.addEventListener("click", () => {
                    const formTitle = document.querySelector("form").title.value
                    const formYear = document.querySelector("form").year.value
                    const formImageUrl = document.querySelector("form").url.value
        
                    /*  form validation */
                    // emptinness
                    if (formTitle === "" || formYear === "" || formImageUrl === "") {
                        alert("Values cannot be empty!")
                        return
                    }
        
                    const alphanumericRegex = /^[a-zA-Z0-9/.:-_ 'éùçà(),-=?&%]+$/
                    /* alphanumeric test */
                    if (
                        !alphanumericRegex.test(formTitle) ||
                        !alphanumericRegex.test(formYear) ||
                        !alphanumericRegex.test(formImageUrl))
                    {
                        alert("No weird characters !!")
                        return
                    }
        
                    listGames[index].title = formTitle
                    listGames[index].year = formYear
                    listGames[index].imageUrl = formImageUrl
        
                    /*  select card  */
                    document.querySelectorAll(".card-title")[index].innerHTML = listGames[index].title
                    document.querySelectorAll(".card-text")[index].innerHTML = `Year: ${listGames[index].year}`
                    document.querySelectorAll(".card-img-top")[index].src = listGames[index].imageUrl
                });
            })
        })

    })
    .catch(error => console.error('Erreur lors du chargement des jeux:', error));


