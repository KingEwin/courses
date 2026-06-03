export async function addCards(formData: FormData) {
    const formDataEntries = Object.fromEntries(formData.entries());
    const newCard = {
        id: Date.now(),
        ...formDataEntries,
    };
    return newCard;
}
