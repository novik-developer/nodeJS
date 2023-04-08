document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }
    if (event.target.dataset.type === "update") {
        const title = prompt(
            `Изменить данные:${event.target.closest("li").innerText}`
        );
        if (title) {
            const id = event.target.dataset.id;
            update(id, { title: title }).then(() => {
                // event.target.closest("li").firstElementChild.innerHTML = title;
                event.target.closest("li").innerHTML = `${title}
                <div>
                    <button class="btn btn-primary" data-type="update" data-id=id>Редактировать</button>
                    <button class="btn btn-danger" data-type="remove" data-id=id>&times;</button> 
                </div>`;
            });
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE",
    });
}

async function update(id, title) {
    await fetch(`/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(title),
    });
}
